"use client";

import { useState } from "react";
import { ServiceIcon } from "@/components/ServiceIcons";
import { SERVICES } from "@/lib/services-data";

/**
 * Services hero visual: every discipline orbiting one core team.
 *
 * Signals flow out from the centre to each service, a slow outer ring keeps it
 * alive, and each service is a real link that jumps to its section below.
 * Hovering one lights its path. Motion stops for reduced-motion visitors.
 */

const R = 39; // orbit radius, % of the box
const VB = 100;

function point(i: number, total: number) {
  const a = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
}

export function ServiceOrbit({ className = "" }: { className?: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const n = SERVICES.length;

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[540px] ${className}`}>
      {/* Rings, spokes and signals */}
      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
          </radialGradient>
          <filter id="orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="50" cy="50" r="22" fill="url(#orbit-core)" />

        {/* slow outer ring */}
        <g className="orbit-spin" style={{ transformOrigin: "50px 50px" }}>
          <circle
            cx="50"
            cy="50"
            r={R + 7}
            fill="none"
            style={{ stroke: "var(--color-border)" }}
            strokeWidth="0.25"
            strokeDasharray="0.6 1.8"
          />
        </g>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          style={{ stroke: "var(--color-border)" }}
          strokeWidth="0.25"
        />
        <circle
          cx="50"
          cy="50"
          r={R / 2}
          fill="none"
          style={{ stroke: "var(--color-border)" }}
          strokeWidth="0.2"
          strokeDasharray="0.5 1.2"
        />

        {SERVICES.map((s, i) => {
          const p = point(i, n);
          const active = hover === s.slug;
          const d = `M 50 50 L ${p.x} ${p.y}`;
          const dur = 2.4 + (i % 3) * 0.5;
          return (
            <g key={s.slug}>
              <path
                d={d}
                fill="none"
                style={{
                  stroke: active ? "var(--color-primary)" : "var(--color-border)",
                  transition: "stroke 0.25s ease",
                }}
                strokeWidth={active ? 0.45 : 0.25}
              />
              <circle
                r={active ? 1.1 : 0.75}
                className="orbit-signal"
                filter="url(#orbit-glow)"
                style={{ fill: "var(--color-primary)" }}
              >
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${(i * 0.43) % dur}s`}
                  repeatCount="indefinite"
                  path={d}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.8;1"
                  dur={`${dur}s`}
                  begin={`${(i * 0.43) % dur}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-background/80 shadow-glow backdrop-blur-md md:h-24 md:w-24">
          {/* The brand mark inline, so its ink follows the site theme */}
          <svg
            viewBox="0 0 256 256"
            className="h-10 w-10 text-foreground md:h-12 md:w-12"
            fill="none"
            aria-hidden
          >
            <g strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="currentColor" d="M64,196 L64,108 C64,80 128,80 128,108 L128,196" />
              <path
                stroke="#15C0E0"
                d="M150,116 C150,86 214,86 213,120 C212,150 156,184 148,200 L216,200"
              />
            </g>
            <circle cx="50" cy="196" r="11" fill="#15C0E0" />
          </svg>
        </div>
        <span className="mt-2.5 whitespace-nowrap text-xs font-medium text-muted-foreground">
          One senior team
        </span>
      </div>

      {/* Services on the orbit */}
      {SERVICES.map((s, i) => {
        const p = point(i, n);
        const active = hover === s.slug;
        return (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            onMouseEnter={() => setHover(s.slug)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(s.slug)}
            onBlur={() => setHover(null)}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={`${s.title} — jump to details`}
          >
            <span
              className={`flex items-center justify-center rounded-2xl border bg-background/85 p-1.5 backdrop-blur-md transition-all duration-300 ${
                active
                  ? "scale-110 border-primary/60 shadow-glow"
                  : "border-border group-hover:border-primary/40"
              }`}
            >
              <ServiceIcon slug={s.slug} size={52} eager />
            </span>
            <span
              className={`mt-2 max-w-[120px] text-center text-[11px] font-medium leading-tight transition-colors md:text-xs ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {s.title}
            </span>
          </a>
        );
      })}
    </div>
  );
}
