/**
 * Generates public/og.png (1200×630) — the social preview card used by
 * LinkedIn, X, WhatsApp, Slack and iMessage.
 *
 * Run after changing the brand or tagline:  node scripts/og-image.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const LOGO = readFileSync("public/logo.svg", "utf8");
// Pull just the drawing out of logo.svg so it can be re-placed on the card.
const logoInner = LOGO.replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  // resvg does not apply CSS media queries; ink the wordmark for the dark card.
  .replace(/<style>[\s\S]*?<\/style>/g, "")
  .replace(/stroke="currentColor"/g, 'stroke="#f0f4ff"');
const logoViewBox = (LOGO.match(/viewBox="([^"]+)"/) || [, "0 0 452 140"])[1];
const logoWidth = Number(logoViewBox.split(/\s+/)[2]) || 452;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#071925"/>
      <stop offset="0.55" stop-color="#0a2233"/>
      <stop offset="1" stop-color="#05121b"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#22d3ee" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#67e8f9"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0v56" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1030" cy="120" r="420" fill="url(#glow1)"/>
  <circle cx="180" cy="610" r="340" fill="url(#glow2)"/>

  <!-- brand — resvg ignores x/y on a nested <svg>, so place it with a transform -->
  <g transform="translate(84 76) scale(${(300 / logoWidth).toFixed(4)})">${logoInner}</g>

  <!-- headline -->
  <text x="84" y="316" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="74" font-weight="700" fill="#f8fafc" letter-spacing="-2">AI and engineering</text>
  <text x="84" y="404" font-family="Space Grotesk, Segoe UI, Arial, sans-serif" font-size="74" font-weight="700" fill="url(#accent)" letter-spacing="-2">that turns into revenue.</text>

  <!-- proof row -->
  <g font-family="JetBrains Mono, Consolas, monospace" font-size="21" fill="#94a3b8">
    <circle cx="92" cy="480" r="5" fill="#22d3ee"/>
    <text x="112" y="488">AI agents</text>
    <circle cx="272" cy="480" r="5" fill="#22d3ee"/>
    <text x="292" y="488">LLM &amp; NLP</text>
    <circle cx="470" cy="480" r="5" fill="#22d3ee"/>
    <text x="490" y="488">Full-stack</text>
    <circle cx="656" cy="480" r="5" fill="#22d3ee"/>
    <text x="676" y="488">DevOps</text>
    <circle cx="820" cy="480" r="5" fill="#22d3ee"/>
    <text x="840" y="488">Cloud &amp; IT</text>
  </g>

  <rect x="84" y="534" width="128" height="4" rx="2" fill="url(#accent)"/>
  <text x="84" y="588" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="25" fill="#cbd5e1">nova2labs.com</text>
  <text x="1116" y="588" text-anchor="end" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="25" fill="#94a3b8">Fixed scope · Senior engineers · Worldwide</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: true },
})
  .render()
  .asPng();

writeFileSync("public/og.png", png);
console.log(`public/og.png written — ${(png.length / 1024).toFixed(0)} KB`);
