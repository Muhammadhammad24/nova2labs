import { createFileRoute } from "@tanstack/react-router";
import process from "node:process";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/**
 * Server-side lead delivery over the company's own SMTP mailbox.
 *
 * This is the primary path: enquiries go straight from the site to the business
 * inbox with no third-party relay in between. If SMTP is not configured (local
 * dev, or before the mailbox password is set in the host's env), the route
 * answers 501 and the client falls back to the hosted relay — so the form is
 * never dead.
 *
 * Env vars are read per request: on serverless hosts they bind at request time,
 * not at module load.
 */

type Lead = {
  name?: string;
  email?: string;
  company?: string;
  topic?: string;
  budget?: string;
  message?: string;
  source?: string;
  subject?: string;
  botcheck?: string;
};

const MAX = { name: 120, email: 200, company: 160, topic: 120, budget: 60, message: 6000 };

function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: port === 465,
    auth: { user, pass },
    to: process.env.LEAD_TO ?? CONTACT_EMAIL,
    from: process.env.SMTP_FROM ?? user,
  };
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const smtp = readSmtpConfig();
        // Not configured yet — tell the client to use its fallback.
        if (!smtp) return json({ ok: false, reason: "smtp-not-configured" }, 501);

        let lead: Lead;
        try {
          lead = (await request.json()) as Lead;
        } catch {
          return json({ ok: false, error: "Malformed request." }, 400);
        }

        // Honeypot: only bots fill this.
        if (clean(lead.botcheck, 10)) return json({ ok: true }, 200);

        const name = clean(lead.name, MAX.name);
        const email = clean(lead.email, MAX.email);
        const message = clean(lead.message, MAX.message);

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          return json({ ok: false, error: "Please enter a valid email address." }, 422);
        }
        if (!message) {
          return json({ ok: false, error: "Please describe your project." }, 422);
        }

        const rows: [string, string][] = [
          ["Name", name],
          ["Email", email],
          ["Company", clean(lead.company, MAX.company)],
          ["Service", clean(lead.topic, MAX.topic)],
          ["Budget", clean(lead.budget, MAX.budget)],
          ["Source", clean(lead.source, 80)],
        ].filter(([, v]) => v) as [string, string][];

        const subject = clean(lead.subject, 160) || `New project enquiry — ${SITE_NAME}`;
        const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Project brief:", message].join(
          "\n",
        );

        const esc = (v: string) =>
          v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
  <h2 style="margin:0 0 16px;font-size:18px">${esc(subject)}</h2>
  <table style="border-collapse:collapse;margin-bottom:20px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#64748b">${esc(k)}</td><td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
      )
      .join("")}
  </table>
  <div style="padding:16px;background:#f1f5f9;border-radius:8px;white-space:pre-wrap">${esc(message)}</div>
  <p style="margin-top:20px;color:#64748b;font-size:13px">Reply directly to this email to reach the sender.</p>
</div>`;

        try {
          // Imported here so the SMTP client never reaches the browser bundle.
          const { createTransport } = await import("nodemailer");
          const transporter = createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            auth: smtp.auth,
          });

          await transporter.sendMail({
            from: `"${SITE_NAME} website" <${smtp.from}>`,
            to: smtp.to,
            replyTo: name ? `"${name}" <${email}>` : email,
            subject,
            text,
            html,
          });

          return json({ ok: true }, 200);
        } catch (err) {
          console.error("[lead] SMTP delivery failed:", err);
          return json({ ok: false, reason: "smtp-failed" }, 502);
        }
      },
    },
  },
});
