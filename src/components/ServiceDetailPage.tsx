import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Photo } from "@/components/Photo";
import { ServiceIcon } from "@/components/ServiceIcons";
import { ServicesNavCard } from "@/components/ServicesNavCard";
import type { ServiceDetail } from "@/lib/services-data";
import { getNextService } from "@/lib/services-data";
import { workForService } from "@/lib/work-data";
import { CONTACT_EMAIL } from "@/lib/site";
import { servicePhoto } from "@/lib/images";

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const next = getNextService(service.slug);
  const proof = workForService(service.slug);

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
        <div className="hero-blob-1 right-[-50px] top-[-200px]" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-28 md:pt-36">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> All services
          </Link>

          <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <div className="icon-stage h-[136px] w-[136px] shrink-0">
              <ServiceIcon slug={service.slug} size={112} eager />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground md:text-xl">{service.tagline}</p>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {service.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {service.points.map((p) => (
              <span key={p} className="badge-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Photo
            photo={servicePhoto(service.slug)}
            ratio="21/9"
            sizes="(min-width: 1024px) 960px, 100vw"
            eager
            className="rounded-3xl border border-border"
          />
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <div className="md:sticky md:top-24 md:self-start">
              <span className="badge-primary mb-4 inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Deliverables
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                What you get
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Every item shipped, tested, and documented before handover.
              </p>

              {/* Jump to any other service without going back */}
              <ServicesNavCard
                mode="link"
                current={service.slug}
                className="mt-8 hidden md:block"
              />
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/30"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{d}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border bg-surface/40 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
            <div className="md:sticky md:top-32 md:self-start">
              <span className="badge-primary mb-4 inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Process
              </span>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                How we work
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A clear, repeatable process — so you always know where things stand.
              </p>
            </div>
            <ol className="relative space-y-4">
              <div className="absolute bottom-0 left-[22px] top-0 w-px bg-border" aria-hidden />
              {service.process.map((p, i) => (
                <motion.li
                  key={p.step}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="relative flex gap-5 pl-14"
                >
                  <div className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-background font-mono text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 rounded-xl border border-border bg-background px-5 py-4">
                    <h3 className="font-display text-base font-semibold">{p.step}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* STACK + OUTCOMES */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-7">
              <span className="badge-primary mb-5 inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Tech stack
              </span>
              <h3 className="mb-5 font-display text-xl font-bold">Tools we reach for</h3>
              <div className="flex flex-wrap gap-2">
                {service.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-7">
              <span className="badge-primary mb-5 inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Outcomes
              </span>
              <h3 className="mb-5 font-display text-xl font-bold">What changes for you</h3>
              <ul className="space-y-3.5">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF — real systems for this service */}
      {proof.length > 0 && (
        <section className="border-t border-border bg-surface/40 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="badge-primary mb-4 inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Proof
                </span>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {proof.length === 1 ? "A system" : `${proof.length} systems`} we built in this
                  area
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Systems we designed, built and operated — not case-study fiction.
                </p>
              </div>
              <Link
                to="/work"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                All work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {proof.map((w, i) => (
                <motion.div
                  key={w.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: Math.min(i, 4) * 0.06 }}
                  className="card-lift group flex flex-col rounded-2xl border border-border bg-background p-6"
                >
                  <Link to="/work/$slug" params={{ slug: w.slug }} className="flex flex-1 flex-col">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                        {w.context}
                      </span>
                      {w.metric && (
                        <span className="stat-number text-xl font-bold text-gradient">
                          {w.metric.value}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-sm font-bold leading-snug">{w.title}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {w.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {w.stack.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border py-24">
        <div className="absolute inset-0 bg-hero" aria-hidden />
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-elegant backdrop-blur-xl">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="grid gap-8 p-9 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
              <div>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Ready to scope your{" "}
                  <span className="text-gradient">{service.title.toLowerCase()}</span> project?
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                  Send a two-line brief and you'll get a clear plan, a fixed price for your scope,
                  and the engineer who would lead it — within 24 hours, free.
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {["No obligation", "NDA on request", "Fixed-scope quote"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to="/contact"
                  search={{ service: service.slug }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
                >
                  Get a free quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-7 py-4 text-sm font-semibold transition-all hover:border-primary/50"
                >
                  Email us instead
                </a>
                <p className="mt-1 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Average reply: under 6 hours
                </p>
              </div>
            </div>
          </div>

          {/* Quiet next-service link — no repeated service grid */}
          <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> All services
            </Link>
            <Link
              to="/services/$slug"
              params={{ slug: next.slug }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span className="text-xs font-medium text-muted-foreground">Next</span>
              {next.title}
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
