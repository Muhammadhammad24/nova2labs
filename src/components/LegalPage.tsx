import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CONTACT_EMAIL } from "@/lib/site";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

/** Shared shell for the privacy policy and terms pages. */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-6 pb-14 pt-24 md:pt-32">
          <div className="badge-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Legal
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">{intro}</p>
          <p className="mt-4 text-sm text-muted-foreground/80">Last updated {updated}</p>
        </div>
      </section>

      <section className="border-y border-border py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((s, i) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight">
                <span className="mr-3 font-mono text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-surface p-7">
            <h2 className="font-display text-lg font-bold">Questions about this page?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and a human will answer — usually the same day.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
