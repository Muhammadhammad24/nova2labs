/**
 * Single source of truth for brand, contact and SEO metadata.
 *
 * Change the domain or email here once and it propagates to canonical tags,
 * Open Graph previews, the sitemap, robots.txt and JSON-LD structured data.
 */

/** Absolute site origin, no trailing slash. Override per environment with VITE_SITE_URL. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://www.nova2labs.com").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "nova2labs";
export const SITE_TAGLINE = "AI & Engineering Agency";

/** Shown to visitors and used for mailto links. */
export const CONTACT_EMAIL = "contact@nova2labs.com";

/** Empty = hidden everywhere. Set a business number here to show it. */
export const CONTACT_PHONE = "";

/** Remote-first: no street address is published. */
export const LOCATION = { serves: "Worldwide" };

/** Public profiles. Add a business handle here and the footer picks it up. */
export const SOCIAL: { github?: string; linkedin?: string; twitter?: string } = {};

/** 1200×630 social preview card. */
export const OG_IMAGE = `${SITE_URL}/og.png`;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Builds the meta + link tags every page needs: canonical URL, Open Graph and
 * Twitter cards. Without these, links shared on LinkedIn/WhatsApp render blank
 * and search engines can pick the wrong URL as canonical.
 */
export function seo({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },

      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} — ${SITE_TAGLINE}` },
      { property: "og:locale", content: "en" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Organization + website graph, rendered once in the root route. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description:
          "Engineering studio building production AI agents, LLM systems, full-stack products, DevOps platforms, networks and IT infrastructure.",
        url: SITE_URL,
        email: CONTACT_EMAIL,
        ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
        image: OG_IMAGE,
        logo: `${SITE_URL}/logo.svg`,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Urdu"],
        ...(Object.values(SOCIAL).filter(Boolean).length
          ? { sameAs: Object.values(SOCIAL).filter(Boolean) }
          : {}),
        knowsAbout: [
          "AI agents",
          "Large language models",
          "Retrieval-augmented generation",
          "Full-stack engineering",
          "DevOps",
          "DevSecOps",
          "Kubernetes",
          "Computer networking",
          "IT infrastructure",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

/** Per-service structured data so each service page can surface on its own. */
export function serviceJsonLd(service: {
  slug: string;
  title: string;
  tagline: string;
  body: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    alternateName: service.tagline,
    description: service.body,
    serviceType: service.title,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    potentialAction: {
      "@type": "ContactAction",
      target: absoluteUrl(`/contact?service=${service.slug}`),
      name: "Request a quote",
    },
  };
}

/** FAQ structured data — eligible for expandable answers in Google results. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}
