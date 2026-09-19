/**
 * The hero's signature visual: a live architecture of the full stack.
 *
 * Five layers, from the interface a customer touches down to the network it
 * runs on, with requests travelling through them in real time. It says what
 * nova2labs does in one glance: every layer, one team.
 *
 * Pure SVG + SMIL, so it renders on the server, stays crisp at any size and
 * costs no JavaScript. Motion is dropped for visitors who prefer less of it.
 */

type Node = { id: string; label: string; x: number };
type Layer = { name: string; y: number; nodes: Node[] };

const W = 1200;
const NODE_W = 150;
const NODE_H = 42;

const LAYERS: Layer[] = [
  {
    name: "Experience",
    y: 40,
    nodes: [
      { id: "web", label: "Web platform", x: 250 },
      { id: "mobile", label: "Mobile app", x: 480 },
      { id: "console", label: "Admin console", x: 710 },
      { id: "brand", label: "Design system", x: 940 },
    ],
  },
  {
    name: "Intelligence",
    y: 140,
    nodes: [
      { id: "agent", label: "Support agent", x: 330 },
      { id: "docai", label: "Document AI", x: 600 },
      { id: "evals", label: "Eval harness", x: 870 },
    ],
  },
  {
    name: "Services",
    y: 240,
    nodes: [
      { id: "gateway", label: "API gateway", x: 330 },
      { id: "flows", label: "Workflows", x: 600 },
      { id: "auth", label: "Identity & SSO", x: 870 },
    ],
  },
  {
    name: "Data",
    y: 340,
    nodes: [
      { id: "pg", label: "PostgreSQL", x: 330 },
      { id: "vector", label: "Vector index", x: 600 },
      { id: "stream", label: "Event stream", x: 870 },
    ],
  },
  {
    name: "Infrastructure",
    y: 440,
    nodes: [
      { id: "k8s", label: "Kubernetes", x: 250 },
      { id: "net", label: "Zero-trust network", x: 480 },
      { id: "endpoints", label: "Managed endpoints", x: 710 },
      { id: "backup", label: "Backup & DR", x: 940 },
    ],
  },
];

/** Which nodes talk to which — the paths requests flow along. */
const LINKS: [string, string][] = [
  ["web", "agent"],
  ["web", "gateway"],
  ["mobile", "docai"],
  ["console", "evals"],
  ["console", "auth"],
  ["brand", "evals"],
  ["agent", "gateway"],
  ["docai", "flows"],
  ["evals", "auth"],
  ["gateway", "pg"],
  ["flows", "vector"],
  ["flows", "stream"],
  ["auth", "stream"],
  ["pg", "k8s"],
  ["pg", "backup"],
  ["vector", "net"],
  ["stream", "endpoints"],
  ["stream", "k8s"],
];

const pos = new Map<string, { x: number; y: number }>();
for (const l of LAYERS) for (const n of l.nodes) pos.set(n.id, { x: n.x, y: l.y });

function linkPath(a: string, b: string) {
  const p = pos.get(a)!;
  const q = pos.get(b)!;
  const x1 = p.x + NODE_W / 2;
  const y1 = p.y + NODE_H;
  const x2 = q.x + NODE_W / 2;
  const y2 = q.y;
  const mid = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
}

export function StackVisual({ className = "" }: { className?: string }) {
  const H = 500;

  return (
    <div className={`relative ${className}`}>
      {/* Phones: the diagram would shrink to illegible text, so show the same
          layers as a compact stack instead. */}
      <ol className="space-y-3 md:hidden" aria-label="The layers we build and run">
        {LAYERS.map((l) => (
          <li key={l.name} className="rounded-2xl border border-border bg-background/60 p-4">
            <p className="mb-2.5 text-xs font-medium text-muted-foreground">{l.name}</p>
            <div className="flex flex-wrap gap-1.5">
              {l.nodes.map((n) => (
                <span
                  key={n.id}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {n.label}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Live architecture diagram: interface, intelligence, services, data and infrastructure layers, with requests flowing between them"
        className="stack-visual hidden h-auto w-full overflow-visible md:block"
      >
        <defs>
          <filter id="sv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="sv-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="0.12" stopColor="white" stopOpacity="1" />
            <stop offset="0.88" stopColor="white" stopOpacity="1" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="sv-mask">
            <rect width={W} height={H} fill="url(#sv-fade)" />
          </mask>
        </defs>

        {/* Layer rails and names */}
        {LAYERS.map((l) => (
          <g key={l.name}>
            <line
              x1="0"
              x2={W}
              y1={l.y + NODE_H / 2}
              y2={l.y + NODE_H / 2}
              style={{ stroke: "var(--color-border)" }}
              strokeDasharray="2 6"
              mask="url(#sv-mask)"
            />
            <text
              x="0"
              y={l.y + NODE_H / 2 + 4}
              style={{ fill: "var(--color-muted-foreground)" }}
              fontSize="13"
              fontWeight="500"
              className="font-sans"
            >
              {l.name}
            </text>
          </g>
        ))}

        {/* Connections */}
        {LINKS.map(([a, b]) => (
          <path
            key={`${a}-${b}`}
            d={linkPath(a, b)}
            fill="none"
            style={{ stroke: "var(--color-border)" }}
            strokeWidth="1.25"
          />
        ))}

        {/* Requests flowing through the stack */}
        <g className="stack-packets" filter="url(#sv-glow)">
          {LINKS.map(([a, b], i) => {
            const d = linkPath(a, b);
            const dur = 2.6 + (i % 5) * 0.45;
            const begin = (i * 0.37) % dur;
            return (
              <circle key={`p-${a}-${b}`} r="3.2" style={{ fill: "var(--color-primary)" }}>
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                  path={d}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.2 1"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.85;1"
                  dur={`${dur}s`}
                  begin={`${begin}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>

        {/* Nodes */}
        {LAYERS.map((l, li) =>
          l.nodes.map((n, ni) => (
            <g key={n.id} transform={`translate(${n.x} ${l.y})`}>
              <rect
                width={NODE_W}
                height={NODE_H}
                rx="10"
                style={{ fill: "var(--color-surface)", stroke: "var(--color-border)" }}
                strokeWidth="1"
              />
              {/* status light — pulses gently, staggered across the grid */}
              <circle
                cx="16"
                cy={NODE_H / 2}
                r="3.5"
                style={{ fill: "var(--color-primary)" }}
                className="stack-status"
              >
                <animate
                  attributeName="opacity"
                  values="0.35;1;0.35"
                  dur="2.8s"
                  begin={`${(li * 0.4 + ni * 0.55) % 2.8}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x="30"
                y={NODE_H / 2 + 4.5}
                fontSize="13.5"
                fontWeight="500"
                style={{ fill: "var(--color-foreground)" }}
                className="font-sans"
              >
                {n.label}
              </text>
            </g>
          )),
        )}
      </svg>
    </div>
  );
}
