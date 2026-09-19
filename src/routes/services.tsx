import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { ServiceIcon } from "@/components/ServiceIcons";
import { SERVICES } from "@/lib/services-data";
import { seo } from "@/lib/site";
import { ServicesNavCard } from "@/components/ServicesNavCard";
import { Photo } from "@/components/Photo";
import { servicePhoto } from "@/lib/images";
import { ServiceOrbit } from "@/components/ServiceOrbit";
import { HeroBackdrop } from "@/components/HeroBackdrop";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Services — AI, Software, DevOps & Infrastructure | nova2labs",
      description:
        "Seven engineering services delivered end-to-end: AI agents, LLM & NLP, full-stack engineering, DevOps & DevSecOps, networking, IT infrastructure and brand & product design. Every engagement fixed-scope and fixed-price.",
      path: "/services",
    }),
  component: Services,
});

const ease = [0.22, 1, 0.36, 1] as const;

const guarantees = [
  {
    icon: Zap,
    title: "Working prototype in week 1",
    body: "Not after months of planning. You see real software immediately.",
  },
  {
    icon: CheckCircle2,
    title: "Fixed price, no surprises",
    body: "Scope agreed upfront. What we quote is what you pay.",
  },
  {
    icon: ShieldCheck,
    title: "Security built in, not bolted on",
    body: "DevSecOps practice from line one, on every project.",
  },
  {
    icon: Clock,
    title: "24-hour response guarantee",
    body: "Every serious inquiry gets a reply within one business day.",
  },
  {
    icon: MessageSquare,
    title: "Direct engineer access",
    body: "Talk to the person building your product, always.",
  },
  {
    icon: Sparkles,
    title: "100% IP ownership at handover",
    body: "Source code, docs and infrastructure, fully yours.",
  },
];

const tiers = [
  {
    range: "Focused scope",
    label: "One feature, integration or brand system",
    detail:
      "A single agent, pipeline, design system, migration or integration with a clear boundary.",
  },
  {
    range: "Product build",
    label: "Full product or MVP",
    detail: "End-to-end delivery: data model, API, UI, auth, CI and launch.",
  },
  {
    range: "Platform",
    label: "Enterprise platform or AI system",
    detail: "Multi-service platforms, agent fleets, Kubernetes and compliance work.",
  },
  {
    range: "Retainer",
    label: "Ongoing partnership",
    detail: "Monthly capacity for maintenance, monitoring and continuous delivery.",
  },
];

function Services() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-24 md:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <div className="badge-primary mb-8">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Services
              </div>
              <h1 className="text-balance font-display text-[clamp(2.4rem,4.4vw,4.1rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                Seven disciplines.
                <br />
                <span className="text-primary">One senior team.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Take one service or hand over the whole stack. Every engagement is scoped and priced
                up front, and the engineers who scope it are the ones who build it.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#ai-agents"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/8"
                >
                  Explore services
                </a>
              </div>

              {/* Phones get the plain jump list; the orbit is the index on larger screens */}
              <nav className="mt-10 flex flex-wrap gap-2 lg:hidden" aria-label="Jump to a service">
                {SERVICES.map((s) => (
                  <a
                    key={s.slug}
                    href={`#${s.slug}`}
                    className="rounded-full border border-border bg-surface/80 px-4 py-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-foreground"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease }}
              className="hidden sm:block"
            >
              <ServiceOrbit />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICE ROWS with a sticky index card alongside */}
      <section className="border-y border-border py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
            {/* Sticky index: click a service to jump straight to it */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ServicesNavCard mode="anchor" />
              </div>
            </aside>

            <div className="space-y-6">
              {SERVICES.map((s, i) => (
                <motion.article
                  key={s.slug}
                  id={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease }}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-surface"
                >
                  <Photo
                    photo={servicePhoto(s.slug)}
                    ratio="21/9"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    tint="soft"
                    eager={i < 2}
                    className="max-h-[220px] border-b border-border"
                  />
                  <div className="p-7 md:p-9">
                    <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                      <div className="icon-stage h-[132px] w-[132px] shrink-0 md:h-[152px] md:w-[152px]">
                        <ServiceIcon slug={s.slug} size={124} eager={i < 2} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-xs text-muted-foreground/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                            {s.title}
                          </h2>
                        </div>
                        <p className="mt-2.5 font-medium text-primary">{s.tagline}</p>
                        <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
                      </div>
                    </div>

                    <div className="mt-7 grid gap-7 border-t border-border pt-7 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-3 text-xs font-medium text-muted-foreground">
                          What's included
                        </h3>
                        <ul className="space-y-2">
                          {s.points.map((p) => (
                            <li
                              key={p}
                              className="flex items-start gap-2.5 text-sm text-foreground/90"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="mb-3 text-xs font-medium text-muted-foreground">
                          Typical outcome
                        </h3>
                        <ul className="space-y-2">
                          {s.outcomes.slice(0, 3).map((o) => (
                            <li
                              key={o}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition-all hover:border-primary/50"
                      >
                        Full breakdown
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        to="/contact"
                        search={{ service: s.slug }}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
                      >
                        Get a quote
                      </Link>
                      <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                        {s.stack.slice(0, 4).join(" \u00b7 ")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="badge-primary mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Pricing
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              How pricing works
            </h2>
            <p className="mt-4 text-muted-foreground">
              No hourly billing surprises. You approve a fixed price before we write a single line
              of code.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-lift flex flex-col rounded-2xl border border-border bg-surface p-7"
              >
                <div className="font-display text-xl font-bold text-foreground">{t.range}</div>
                <div className="mt-2 text-xs font-medium text-primary">{t.label}</div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
            >
              Get a free estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-sm text-muted-foreground">
              Fixed quote within 48 hours of our call.
            </span>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="border-b border-border bg-surface/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="badge-primary mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our guarantees
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Included in every engagement
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guarantees.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                className="flex gap-5 rounded-2xl border border-border bg-background p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <g.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1.5 font-display text-sm font-bold">{g.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{g.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 bg-hero" aria-hidden />
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="hero-blob-2 left-[-50px] top-[-100px]" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              Not sure where
              <br />
              <span className="text-gradient">to start?</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground">
              Send a two-line brief. You get the approach we would take and an honest estimate.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.03]"
              >
                Start the conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-surface"
              >
                See our work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
