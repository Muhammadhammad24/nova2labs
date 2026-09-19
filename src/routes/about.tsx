import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  Globe2,
  Rocket,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Photo } from "@/components/Photo";
import { SERVICES } from "@/lib/services-data";
import { WORK } from "@/lib/work-data";
import { PRACTICES, CERTIFICATIONS } from "@/lib/practices";
import { seo } from "@/lib/site";
import { PAGE_PHOTOS } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About nova2labs — Senior-Led Engineering Studio",
      description:
        "How nova2labs works: senior-led delivery, fixed-price scopes, proven technology and full IP handover, for businesses that need engineering done right the first time.",
      path: "/about",
    }),
  component: About,
});

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "7", label: "Engineering domains" },
  { value: "< 24h", label: "Reply guaranteed" },
  { value: "Senior", label: "Only hands on your code" },
  { value: "100%", label: "IP yours on handover" },
];

const values = [
  {
    icon: Award,
    title: "Excellence without compromise",
    body: "We hold every deliverable to the same standard we'd want for ourselves. If it's not production-ready, it doesn't ship.",
  },
  {
    icon: ShieldCheck,
    title: "Security is culture",
    body: "Threat modeling, zero-trust defaults, and DevSecOps practices aren't extras, they're in every project from line one.",
  },
  {
    icon: BrainCircuit,
    title: "AI-native thinking",
    body: "We don't retrofit AI into old architectures. We design systems where intelligent automation is a first-class citizen from day one.",
  },
  {
    icon: Users,
    title: "Direct access, always",
    body: "No account managers, no handoffs, no layers. You communicate directly with the engineers building your product.",
  },
  {
    icon: Rocket,
    title: "Bias toward shipping",
    body: "We move fast without breaking things. Working software in the first week, not after months of planning documents.",
  },
  {
    icon: Globe2,
    title: "Global perspective",
    body: "We work async-first across time zones, with overlap hours agreed upfront, distance has never been the hard part of shipping software.",
  },
];

const tools = [...new Set(SERVICES.flatMap((s) => s.stack))];

const engagement = [
  {
    label: "Week 0",
    title: "Discovery call & written scope",
    body: "A 30-minute call, then a written proposal: deliverables, assumptions, timeline and a fixed price. No obligation to continue.",
  },
  {
    label: "Week 1",
    title: "Foundations & first working slice",
    body: "Repo, environments and CI set up, then the thinnest end-to-end slice of real functionality, something you can click, not a slide.",
  },
  {
    label: "Weekly",
    title: "Demo, feedback, adjust",
    body: "Every week you see working software and decide what matters next. Scope changes are priced in writing before they're built.",
  },
  {
    label: "Hardening",
    title: "Tests, security & observability",
    body: "Evals or test coverage where it counts, dependency and security scanning, logging and dashboards, before anything touches production.",
  },
  {
    label: "Launch",
    title: "Go live with a rollback path",
    body: "Staged rollout, monitoring in place and a documented way back if anything misbehaves.",
  },
  {
    label: "After",
    title: "Handover & 30 days of support",
    body: "Source code, infrastructure, credentials and runbooks transferred to you, plus a month of free support. A retainer is optional, never assumed.",
  },
];

function About() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <HeroBackdrop />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-4xl"
          >
            <div className="badge-primary mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              About nova2labs
            </div>
            <h1 className="text-balance font-display text-[clamp(2.5rem,5.6vw,4.9rem)] font-semibold leading-[1] tracking-[-0.045em]">
              Engineering you can
              <br />
              <span className="text-gradient">rely on</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              nova2labs is a senior-led engineering studio. We take on AI systems, software
              platforms and cloud infrastructure, and deliver them production-ready, documented and
              fully owned by you.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Work with us{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/8"
              >
                See our work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col items-center justify-center bg-surface px-6 py-10 text-center"
              >
                <span className="stat-number text-4xl font-bold text-foreground md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 text-xs font-medium text-muted-foreground">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-b border-border py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="badge-primary mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Our mission
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                Serious engineering,
                <br />
                <span className="text-gradient">without the overhead</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Engineering of this standard used to require a hundred-person department. It no
                longer does.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                nova2labs brings the same engineering standards used inside large technology
                organisations, typed contracts, tested code, infrastructure as code, security in the
                pipeline, to teams that need results without a 100-person department.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We're deliberately small and senior: the people who scope your project are the
                people who build it. That's why nothing gets lost in translation, and why we'd
                rather turn work down than over-promise on it.
              </p>
            </div>

            <div className="space-y-4">
              <Photo
                photo={PAGE_PHOTOS.aboutMission}
                ratio="16/9"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="rounded-3xl border border-border"
              />
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Target,
                    title: "Outcome-focused",
                    body: "We measure success by the impact on your business, not lines of code or hours logged.",
                  },
                  {
                    icon: Zap,
                    title: "Speed without chaos",
                    body: "Prototype in days, production in weeks. We move with urgency because we know time costs money.",
                  },
                  {
                    icon: Award,
                    title: "Senior-only work",
                    body: "Senior hands only. No juniors learning the basics on your budget and your timeline.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Zero handoffs",
                    body: "The engineer you talk to is the engineer building your product. No layers, no surprises.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="rounded-2xl border border-border bg-surface p-5"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1.5 font-display text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section
        id="team"
        className="scroll-mt-20 border-b border-border bg-surface/40 py-28 md:py-36"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="badge-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Capabilities
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Two practices that
              <br />
              <span className="text-gradient">cover the whole stack.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Deliberately small and senior. One practice builds the AI systems and products, the
              other runs the infrastructure and security underneath them, and they ship together.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {PRACTICES.map((pr, i) => (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background"
              >
                <div className="h-1 w-full bg-gradient-primary" />
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-xl font-bold">{pr.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{pr.summary}</p>

                  <div className="mt-7">
                    <h4 className="mb-3 text-xs font-medium text-muted-foreground">
                      Owns in an engagement
                    </h4>
                    <ul className="space-y-2">
                      {pr.owns.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-sm text-foreground/90">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex-1">
                    <h4 className="mb-3 text-xs font-medium text-muted-foreground">Works with</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pr.skills.map((sk) => (
                        <span
                          key={sk}
                          className="rounded-md border border-border bg-surface px-2 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-border bg-background p-8 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div>
              <h3 className="font-display text-lg font-bold">Certified where it counts</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Formal training behind the practice, plus {WORK.length} documented systems in
                production, research and open source.
              </p>
              <Link
                to="/work"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
              >
                Browse the work <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {CERTIFICATIONS.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-xs leading-relaxed text-muted-foreground"
                >
                  <Award className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-border py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="badge-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our principles
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              What we stand for
            </h2>
            <p className="mt-4 text-muted-foreground">
              These aren't just words on a wall. They're the operating principles behind every
              decision we make.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="card-lift spotlight rounded-2xl border border-border bg-surface p-7"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="border-b border-border bg-surface/40 py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="badge-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Technology
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              The tools we work with
            </h2>
            <p className="mt-4 text-muted-foreground">
              We choose proven, well-documented technology your team can hire for and maintain.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5">
            {tools.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(i, 18) * 0.02 }}
                className="rounded-xl border border-border bg-background px-4 py-2.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {t}
              </motion.span>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Want the detail per discipline?{" "}
            <Link
              to="/services"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              See what each service includes
            </Link>
          </p>
        </div>
      </section>

      {/* HOW AN ENGAGEMENT RUNS */}
      <section className="border-b border-border py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.8fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <div className="badge-primary mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                How we work
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                How an engagement
                <br />
                <span className="text-gradient">actually runs</span>
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                This is exactly how an engagement runs, from the first call to the day the code is
                yours. Same process whether it's a two-week integration or a six-month platform.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Start at week 0 <ArrowRight className="h-4 w-4" />
              </Link>

              <Photo
                photo={PAGE_PHOTOS.aboutEngagement}
                ratio="4/3"
                sizes="(min-width: 1024px) 380px, 100vw"
                className="mt-8 hidden rounded-3xl border border-border lg:block"
              />
            </div>

            <div className="relative">
              <div className="absolute bottom-0 left-[22px] top-0 w-px bg-border" aria-hidden />
              <div className="space-y-6">
                {engagement.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06 }}
                    className="relative flex gap-6 pl-14"
                  >
                    <div className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <span className="font-mono text-[10px] font-bold text-primary">{i + 1}</span>
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-surface px-6 py-5">
                      <span className="text-[11px] font-medium text-primary">{m.label}</span>
                      <h3 className="mt-1 font-display text-base font-semibold">{m.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-36">
        <div className="absolute inset-0 bg-hero" aria-hidden />
        <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
        <div className="hero-blob-1 right-[10%] top-[-150px]" aria-hidden />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
              Ready to start?
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground">
              Tell us what you are building and we will tell you how we would approach it.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03]"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/80 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-surface"
              >
                See our services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
