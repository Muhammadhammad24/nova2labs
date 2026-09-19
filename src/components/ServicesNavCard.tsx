"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ServiceIcons";
import { SERVICES } from "@/lib/services-data";
import type { ServiceSlug } from "@/components/ServiceIcons";

/**
 * Compact sticky index of every service.
 *
 * Two modes:
 *  - "anchor" (services overview): jumps to that service's row on the page and
 *    highlights whichever row you're currently looking at.
 *  - "link" (service detail pages): navigates straight to that service's page,
 *    with the one you're on marked as current.
 */
export function ServicesNavCard({
  mode,
  current,
  className = "",
}: {
  mode: "anchor" | "link";
  /** The service being viewed, highlighted in "link" mode. */
  current?: ServiceSlug;
  className?: string;
}) {
  const active = useActiveSection(mode === "anchor") ?? current;

  return (
    <nav
      aria-label="All services"
      className={`rounded-2xl border border-border bg-surface p-4 ${className}`}
    >
      <p className="mb-3 px-2 text-xs font-medium text-muted-foreground">All services</p>

      <ul className="space-y-0.5">
        {SERVICES.map((s) => {
          const isActive = active === s.slug;
          const inner = (
            <>
              <ServiceIcon slug={s.slug} size={22} className="shrink-0" />
              <span className="min-w-0 flex-1 truncate">{s.title}</span>
              {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
            </>
          );

          const base =
            "flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium transition-colors";
          const state = isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground";

          return (
            <li key={s.slug}>
              {mode === "anchor" ? (
                <a
                  href={`#${s.slug}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`${base} ${state}`}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  aria-current={isActive ? "page" : undefined}
                  className={`${base} ${state}`}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <Link
        to="/contact"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-primary px-3 py-2.5 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Get a quote <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </nav>
  );
}

/** Tracks which service row is in view so the card can highlight it. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sections = SERVICES.map((s) => document.getElementById(s.slug)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMost) setActive(topMost.target.id);
      },
      // Treat the upper third of the viewport as "what you're reading".
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
