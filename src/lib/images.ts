/**
 * Visuals used across the site.
 *
 * Every "photo" slot renders generated, on-brand artwork (see Artwork.tsx):
 * a living diagram of the discipline itself, drawn in the site's colours.
 * `seed` makes each placement a different drawing of the same motif.
 */
import type { Motif } from "@/components/Artwork";

export type Photo = { motif: Motif; alt: string; seed: string };

const art = (motif: Motif, alt: string, seed: string): Photo => ({ motif, alt, seed });

/* ── Services ─────────────────────────────────────────────────────────────── */
export const SERVICE_PHOTOS: Record<string, Photo> = {
  "ai-agents": art("agents", "An agent calling tools in a plan, act, observe loop", "svc-ai"),
  "llm-nlp": art("llm", "A document being turned into validated, structured fields", "svc-llm"),
  "full-stack": art("stack", "A product dashboard with live metrics and a trend chart", "svc-fs"),
  devops: art(
    "pipeline",
    "A delivery pipeline running build, test, scan, sign and deploy",
    "svc-devops",
  ),
  networking: art("mesh", "A segmented network mesh behind a zero-trust gateway", "svc-net"),
  "it-infrastructure": art(
    "rack",
    "Compute, storage and network racks with live status lights",
    "svc-it",
  ),
  "graphic-design": art(
    "design",
    "A logo construction grid with a bezier curve and colour swatches",
    "svc-design",
  ),
};

/* ── Work, by discipline ──────────────────────────────────────────────────── */
const CATEGORY_MOTIF: Record<string, Motif> = {
  "AI Agents": "agents",
  "LLM & NLP": "llm",
  "Full-Stack": "stack",
  "DevOps & Cloud": "pipeline",
  "IT Infrastructure": "rack",
  "Networking & Security": "mesh",
  "Brand & Design": "design",
};

/* ── Pages ────────────────────────────────────────────────────────────────── */
export const PAGE_PHOTOS = {
  homeBand: art("rack", "Racks of infrastructure running with live status lights", "home-band"),
  aboutMission: art("mesh", "A network of connected systems run by one team", "about-mission"),
  aboutEngagement: art("pipeline", "Work moving from build to production", "about-engagement"),
  contact: art("connect", "A brief travelling to nova2labs and a plan coming back", "contact"),
  workHero: art("mesh", "A network of shipped systems", "work-hero"),
  practiceAi: art("agents", "An AI agent orchestrating tools", "practice-ai"),
  practiceInfra: art("rack", "Infrastructure racks with live status lights", "practice-infra"),
} satisfies Record<string, Photo>;

export const workPhoto = (slug: string, category: string): Photo =>
  art(CATEGORY_MOTIF[category] ?? "mesh", `Illustration for ${slug.replace(/-/g, " ")}`, slug);

export const servicePhoto = (slug: string): Photo => SERVICE_PHOTOS[slug] ?? PAGE_PHOTOS.homeBand;
