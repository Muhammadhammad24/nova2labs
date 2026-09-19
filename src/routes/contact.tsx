import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Photo } from "@/components/Photo";
import { SERVICES } from "@/lib/services-data";
import { buildMailto, submitLead } from "@/lib/lead";
import { CONTACT_EMAIL, LOCATION, seo } from "@/lib/site";
import { PAGE_PHOTOS } from "@/lib/images";
import type { ServiceSlug } from "@/components/ServiceIcons";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact nova2labs — Free Project Plan in 24 Hours",
      description:
        "Send a short brief and get a clear plan, an honest fixed-price estimate and the engineer who would lead the work, within 24 hours, free and with no obligation.",
      path: "/contact",
    }),
  validateSearch: (search: Record<string, unknown>): { service?: ServiceSlug } => {
    const raw = typeof search.service === "string" ? search.service : undefined;
    const match = SERVICES.find((s) => s.slug === raw);
    return match ? { service: match.slug } : {};
  },
  component: Contact,
});

const NOT_SURE = "Not sure yet";
const topics = [...SERVICES.map((s) => s.title), "Consulting & Strategy", NOT_SURE];

type State = "idle" | "sending" | "success" | "error";

function Contact() {
  const { service } = Route.useSearch();
  const preselected = SERVICES.find((s) => s.slug === service)?.title ?? NOT_SURE;
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fallbackHref, setFallbackHref] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const topic = String(formData.get("topic") ?? "").trim();

    const result = await submitLead(formData, {
      source: `contact page${service ? ` · ${service}` : ""}`,
      subject: topic
        ? `New project enquiry: ${topic} (nova2labs.com)`
        : "New project enquiry from nova2labs.com",
    });

    if (result.ok) {
      setState("success");
      setFallbackHref("");
      form.reset();
    } else {
      setErrorMsg(result.error);
      // Same details, one click, straight into their mail client.
      setFallbackHref(
        buildMailto(formData, {
          subject: topic
            ? `Project enquiry: ${topic} (nova2labs.com)`
            : "Project enquiry from nova2labs.com",
        }),
      );
      setState("error");
    }
  };

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroBackdrop />

        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="badge-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Let's talk
            </div>
            <h1 className="text-balance font-display text-[clamp(2.5rem,5.6vw,4.9rem)] font-semibold leading-[1] tracking-[-0.045em]">
              Tell us what you are
              <br />
              <span className="text-gradient">building next</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              One short brief is enough. Within 24 hours you get a written plan, a fixed-price
              estimate and the name of the engineer who would lead the work.
            </p>
            {preselected !== NOT_SURE && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-sm text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Enquiry about <strong className="font-semibold">{preselected}</strong>
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-b border-border bg-surface/60">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: Clock, label: "< 24h response" },
              { icon: CheckCircle2, label: "No commitment required" },
              { icon: Zap, label: "Senior engineers only" },
              { icon: MessageSquare, label: "Any project size welcome" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-start">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 lg:sticky lg:top-32"
            >
              <div>
                <h2 className="font-display text-2xl font-bold">Get in touch</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Prefer email? Write to us directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-elegant"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Email</div>
                  <div className="mt-0.5 break-all font-mono text-xs text-muted-foreground">
                    {CONTACT_EMAIL}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Remote · {LOCATION.serves}</div>
                  <div className="mt-0.5 font-mono text-xs text-muted-foreground">
                    Working across all time zones
                  </div>
                </div>
              </div>

              <Photo
                photo={PAGE_PHOTOS.contact}
                ratio="16/9"
                sizes="(min-width: 1024px) 380px, 100vw"
                className="rounded-2xl border border-border"
              />

              <div className="rounded-2xl border border-border bg-surface p-6">
                <p className="mb-4 text-xs font-medium text-primary">What happens next</p>
                <ol className="space-y-4">
                  {[
                    "You submit this form",
                    "We review & reply within 24 hours",
                    "30-min discovery call",
                    "Clear proposal, you decide",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center rounded-3xl border border-border bg-surface px-10 py-20 text-center shadow-elegant"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-bold">Message received!</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out to nova2labs. We've received your message and will
                    get back to you within{" "}
                    <strong className="text-foreground">one business day</strong>.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Can't wait? Email us at{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-8 rounded-xl border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-border bg-surface p-8 shadow-elegant md:p-10"
                >
                  <h3 className="mb-7 font-display text-xl font-bold">Project brief</h3>

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField label="Full name" name="name" required placeholder="Jane Smith" />
                    <FormField
                      label="Work email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <FormField
                      label="Company"
                      name="company"
                      placeholder="Your company (optional)"
                    />
                    <div>
                      <label className="mb-2 block text-xs font-medium text-muted-foreground">
                        Service needed
                      </label>
                      <select
                        name="topic"
                        defaultValue={preselected}
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        {topics.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-xs font-medium text-muted-foreground">
                      Project brief <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="What you are building, your timeline, and what you need from us."
                      className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-xs font-medium text-muted-foreground">
                      Budget guidance
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {["Not decided yet", "Focused scope", "Full product", "Enterprise"].map(
                        (b) => (
                          <label
                            key={b}
                            className="flex cursor-pointer items-center justify-center rounded-xl border border-border bg-background px-3 py-2.5 text-xs font-medium text-muted-foreground transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/8 has-[:checked]:text-primary"
                          >
                            <input type="radio" name="budget" value={b} className="sr-only" />
                            {b}
                          </label>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Honeypot: bots fill hidden fields, humans never see it. */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    tabIndex={-1}
                    aria-hidden
                    autoComplete="off"
                  />

                  {state === "error" && (
                    <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/8 px-4 py-3">
                      <p className="text-sm text-destructive">{errorMsg}</p>
                      {fallbackHref && (
                        <a
                          href={fallbackHref}
                          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/50"
                        >
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          Send it by email instead (everything is prefilled)
                        </a>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    We never share your data. You'll hear from us within 24 hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Looking to explore our work first?{" "}
            <Link
              to="/work"
              className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline"
            >
              See what we've built <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
