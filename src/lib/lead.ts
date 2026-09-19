/**
 * Lead delivery — every enquiry on the site goes through here.
 *
 * One code path for the contact page and the chat widget, so a lead can never
 * silently vanish: the caller always gets a real success/failure back from the
 * email provider instead of an optimistic "thanks!".
 *
 * Delivery order:
 *   1. POST /api/lead — our own SMTP mailbox, no third party involved.
 *   2. Web3Forms relay — used only when SMTP is not configured or errors.
 *   3. buildMailto() — the UI offers a prefilled email as a last resort.
 *
 * The Web3Forms access key is public by design (it only permits submissions to
 * the owner's inbox), so it is safe in the client bundle. Override it with
 * VITE_WEB3FORMS_KEY.
 */

import { CONTACT_EMAIL } from "@/lib/site";

export const WEB3FORMS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_KEY ?? "eb465c6e-c4c2-415e-832c-a29d9c2d3377";

const ENDPOINT = "https://api.web3forms.com/submit";

export type LeadResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = `We couldn't send that. Please email us directly at ${CONTACT_EMAIL} — we read every message.`;

/**
 * Posts a lead and resolves only once the provider has accepted it.
 *
 * `fields` may be a FormData (contact page) or a plain object (chat widget).
 * `meta.source` labels where the lead came from so enquiries are triageable,
 * and `replyto` is set from the sender's email so hitting Reply reaches them.
 */
export async function submitLead(
  fields: FormData | Record<string, string | undefined>,
  meta: { source: string; subject?: string },
): Promise<LeadResult> {
  const data = fields instanceof FormData ? fields : objectToFormData(fields);

  data.set("access_key", WEB3FORMS_KEY);
  data.set("subject", meta.subject ?? `New enquiry — nova2labs.com (${meta.source})`);
  data.set("source", meta.source);

  const name = str(data.get("name"));
  const email = str(data.get("email"));
  if (name) data.set("from_name", name);
  // Makes "Reply" in the inbox go straight back to the prospect.
  if (email) data.set("replyto", email);

  // 1. Our own mailbox first.
  const own = await sendViaOwnMailbox(data, meta);
  if (own) return own;

  // 2. Hosted relay fallback.
  try {
    const res = await fetch(ENDPOINT, { method: "POST", body: data });
    const json = (await res.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (res.ok && json?.success) return { ok: true };
    return { ok: false, error: json?.message || GENERIC_ERROR };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

/**
 * Posts the lead to our SMTP-backed route.
 *
 * Returns null when the route is unavailable or SMTP isn't configured, which
 * means "keep going" — the caller then tries the hosted relay.
 */
async function sendViaOwnMailbox(
  data: FormData,
  meta: { source: string; subject?: string },
): Promise<LeadResult | null> {
  const payload: Record<string, string> = { source: meta.source };
  for (const key of ["name", "email", "company", "topic", "budget", "message", "botcheck"]) {
    const v = data.get(key);
    if (typeof v === "string" && v.trim()) payload[key] = v.trim();
  }
  if (meta.subject) payload.subject = meta.subject;

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { ok: true };

    // 501 = SMTP not configured, 502 = SMTP errored: fall through to the relay.
    if (res.status === 501 || res.status === 502) return null;

    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    if (res.status === 422 && body?.error) return { ok: false, error: body.error };
    return null;
  } catch {
    return null;
  }
}

function objectToFormData(obj: Record<string, string | undefined>) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(obj)) {
    if (v != null && v !== "") fd.set(k, v);
  }
  return fd;
}

function str(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Builds a prefilled mailto: link from the same fields.
 *
 * Shown whenever the relay fails so a visitor can still reach us in one click —
 * an enquiry should never depend on a third-party service staying up.
 */
export function buildMailto(
  fields: FormData | Record<string, string | undefined>,
  meta: { subject?: string } = {},
): string {
  const get = (k: string) => {
    if (fields instanceof FormData) {
      const v = fields.get(k);
      return typeof v === "string" ? v.trim() : "";
    }
    return (fields[k] ?? "").trim();
  };

  const lines = [
    ["Name", get("name")],
    ["Email", get("email")],
    ["Company", get("company")],
    ["Service", get("topic")],
    ["Budget", get("budget")],
  ]
    .filter(([, v]) => v)
    .map(([label, v]) => `${label}: ${v}`);

  const message = get("message");
  if (message) lines.push("", "Project brief:", message);

  const subject = meta.subject ?? "Project enquiry — nova2labs.com";
  const body = lines.join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
