import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Photo } from "@/components/Photo";
import { ServiceIcon } from "@/components/ServiceIcons";
import { getWork, getNextWork, WORK } from "@/lib/work-data";
import { getService } from "@/lib/services-data";
import { workPhoto } from "@/lib/images";
import { breadcrumbJsonLd, seo, SITE_NAME, absoluteUrl } from "@/lib/site";

export const Route = createFileRoute("/work_/$slug")({
  loader: ({ params }) => {
    const item = getWork(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const w = loaderData?.item;
    if (!w) return { meta: [{ title: `Work — ${SITE_NAME}` }] };

    const base = seo({
      title: `${w.title} | ${SITE_NAME}`,
      description: w.summary,
      path: `/work/${w.slug}`,
      type: "article",
    });

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: w.title,
            abstract: w.summary,
            description: w.problem,
            url: absoluteUrl(`/work/${w.slug}`),
            dateCreated: w.year,
            keywords: w.stack.join(", "),
            about: w.category,
            creator: { "@id": `${absoluteUrl("/")}#organization` },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
              { name: w.title, path: `/work/${w.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Project not found</h1>
      <p className="mt-3 text-muted-foreground">
        It may have been renamed. Browse everything we've documented instead.
      </p>
      <Link
        to="/work"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold"
      >
        All work <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  ),
  component: WorkDetail,
});

const ease = [0.22, 1, 0.36, 1] as const;

function WorkDetail() {
  const { item: w } = Route.useLoaderData();
  const next = getNextWork(w.slug);
  const service = getService(w.service);
  const related = WORK.filter((x) => x.slug !== w.slug && x.category === w.category).slice(0, 2);

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-25" aria-hidden />
        <div className="hero-blob-1 right-[-50px] top-[-200px]" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 md:pt-32">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> All work
          </Link>

          <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <div className="icon-stage h-[124px] w-[124px] shrink-0">
              <ServiceIcon slug={w.service} size={100} eager />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {w.category}
                </span>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground">
                  {w.context}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/70">{w.year}</span>
              </div>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
                {w.title}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {w.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
            >
              Scope something similar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3.5 text-xs text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              Code walkthrough available on request
            </span>
          </div>
        </div>
      </section>

      {/* PHOTO */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Photo
            photo={workPhoto(w.slug, w.category)}
            ratio="21/9"
            sizes="(min-width: 1024px) 960px, 100vw"
            eager
            className="rounded-3xl border border-border"
          />
        </div>
      </section>

      {/* ── DETAIL ───────────────────────────────────────────── */}
      <section className="border-y border-border py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight">The problem</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{w.problem}</p>

            <h2 className="mt-12 font-display text-xl font-bold tracking-tight">What we built</h2>
            <ul className="mt-5 space-y-3">
              {w.built.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(i, 5) * 0.05, ease }}
                  className="flex gap-4 rounded-xl border border-border bg-surface p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            {w.metric && (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="stat-number text-4xl font-bold text-gradient">{w.metric.value}</div>
                <p className="mt-1.5 text-sm font-medium text-foreground">{w.metric.label}</p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="mb-4 text-xs font-medium text-muted-foreground">Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {w.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {service && (
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="mb-3 text-xs font-medium text-muted-foreground">Related service</h3>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group flex items-center gap-3"
                >
                  <ServiceIcon slug={service.slug} size={36} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{service.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {service.tagline}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ── CTA + NEXT ───────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 bg-hero" aria-hidden />
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/90 shadow-elegant backdrop-blur-xl">
            <div className="h-1 w-full bg-gradient-primary" />
            <div className="grid gap-8 p-9 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  Need something like this?
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  We'll tell you honestly whether your case is a two-week build or a three-month one
                  — and what it would cost — before you commit to anything.
                </p>
              </div>
              <Link
                to="/contact"
                search={service ? { service: service.slug } : {}}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="mb-5 text-xs font-medium text-muted-foreground">
                More in {w.category}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/work/$slug"
                    params={{ slug: r.slug }}
                    className="card-lift group rounded-2xl border border-border bg-surface p-5"
                  >
                    <div className="flex items-start gap-4">
                      <Photo
                        photo={workPhoto(r.slug, r.category)}
                        ratio="1/1"
                        sizes="72px"
                        className="h-16 w-16 shrink-0 rounded-xl border border-border"
                      />
                      <div className="min-w-0">
                        <h4 className="font-display text-sm font-semibold leading-snug">
                          {r.title}
                        </h4>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {r.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> All work
            </Link>
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span className="text-xs font-medium text-muted-foreground">Next</span>
              <span className="max-w-[240px] truncate">{next.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
