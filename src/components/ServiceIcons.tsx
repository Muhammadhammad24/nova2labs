import type { CSSProperties } from "react";

export type ServiceSlug =
  | "ai-agents"
  | "llm-nlp"
  | "full-stack"
  | "devops"
  | "networking"
  | "it-infrastructure"
  | "graphic-design";

/**
 * One 3D service icon from /public/icons/services, drawn for the active theme.
 */

export function ServiceIcon({
  slug,
  size = 64,
  className = "",
  style,
  eager = false,
}: {
  slug: ServiceSlug | string;
  size?: number;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
}) {
  // Each icon ships a light-mode sibling: softer cast shadow, faint halo and
  // edges that still read against white. Only the active theme's file is shown.
  const shared = {
    width: size,
    height: size,
    alt: "",
    draggable: false,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    style: { width: size, height: size, ...style },
  };

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <img
        {...shared}
        src={`/icons/services/${slug}-light.svg`}
        className="block select-none object-contain dark:hidden"
      />
      <img
        {...shared}
        src={`/icons/services/${slug}.svg`}
        className="hidden select-none object-contain dark:block"
      />
    </span>
  );
}
