import { useId } from "react";

/**
 * Generative, on-brand artwork that replaces stock photography.
 *
 * Every discipline gets its own living diagram of the work itself — an agent
 * loop, a document turning into structured data, a deploy pipeline, a mesh
 * network, a server rack — drawn in the site's own colours so it themes with
 * light and dark mode. Each piece is seeded, so fifteen project cards are
 * fifteen different drawings, and it is deterministic, so server and client
 * render identically.
 *
 * The canvas is 800×450 and uses `slice`, so it crops like object-cover. Key
 * content stays inside the centre safe zone so 21:9, 16:9 and 1:1 all work.
 */

export type Motif =
  | "agents"
  | "llm"
  | "stack"
  | "pipeline"
  | "mesh"
  | "rack"
  | "design"
  | "connect";

const W = 800;
const H = 450;

const C = {
  primary: "var(--color-primary)",
  border: "var(--color-border)",
  fg: "var(--color-foreground)",
  muted: "var(--color-muted-foreground)",
  surface: "var(--color-surface)",
  bg: "var(--color-background)",
  violet: "oklch(0.7 0.15 292)",
};

/* ── deterministic randomness ─────────────────────────────────────────────── */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: string) {
  let a = hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const pick = <T,>(r: () => number, arr: T[]) => arr[Math.floor(r() * arr.length)];
function shuffle<T>(r: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── primitives ───────────────────────────────────────────────────────────── */
function Chip({
  x,
  y,
  label,
  w,
  accent = false,
}: {
  x: number;
  y: number;
  label: string;
  w?: number;
  accent?: boolean;
}) {
  const width = w ?? Math.max(64, label.length * 7.4 + 34);
  return (
    <g transform={`translate(${x - width / 2} ${y - 15})`}>
      <rect
        width={width}
        height="30"
        rx="9"
        style={{
          fill: C.surface,
          stroke: accent ? C.primary : C.border,
          strokeOpacity: accent ? 0.7 : 1,
        }}
      />
      <circle cx="14" cy="15" r="3.2" style={{ fill: accent ? C.primary : C.muted }} />
      <text
        x="24"
        y="19.5"
        fontSize="12.5"
        fontWeight="500"
        className="font-sans"
        style={{ fill: C.fg }}
      >
        {label}
      </text>
    </g>
  );
}

function Packet({
  path,
  dur,
  begin,
  r = 3.4,
  color = C.primary,
}: {
  path: string;
  dur: number;
  begin: number;
  r?: number;
  color?: string;
}) {
  return (
    <circle r={r} className="art-motion" style={{ fill: color }}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.12;0.85;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

const curve = (x1: number, y1: number, x2: number, y2: number, bend = 0.35) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * bend * 0.3;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
};

/* ── motifs ───────────────────────────────────────────────────────────────── */
function Agents({ r }: { r: () => number }) {
  const cx = 400;
  const cy = 225;
  const tools = shuffle(r, [
    "Search",
    "CRM",
    "Database",
    "Email",
    "Tickets",
    "Calendar",
    "Billing",
  ]).slice(0, 4);
  const spots = [
    [238, 110],
    [562, 110],
    [238, 340],
    [562, 340],
  ];
  const ring = `M ${cx} ${cy - 105} a 105 105 0 1 1 -0.01 0`;
  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r="105"
        fill="none"
        style={{ stroke: C.border }}
        strokeDasharray="3 7"
      />
      <circle
        cx={cx}
        cy={cy}
        r="62"
        fill="none"
        style={{ stroke: C.primary, strokeOpacity: 0.25 }}
      />
      {spots.map(([x, y], i) => {
        const d = curve(cx, cy, x, y, 0.2);
        return (
          <g key={i}>
            <path d={d} fill="none" style={{ stroke: C.border }} strokeWidth="1.3" />
            <Packet path={d} dur={2.2 + r() * 1.4} begin={r() * 2} />
            <Chip x={x} y={y} label={tools[i]} />
          </g>
        );
      })}
      {["Plan", "Act", "Observe"].map((l, i) => {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={l} transform={`translate(${cx + 105 * Math.cos(a)} ${cy + 105 * Math.sin(a)})`}>
            <rect
              x="-30"
              y="-11"
              width="60"
              height="22"
              rx="11"
              style={{ fill: C.bg, stroke: C.border }}
            />
            <text
              textAnchor="middle"
              y="4.5"
              fontSize="11"
              fontWeight="500"
              className="font-sans"
              style={{ fill: C.muted }}
            >
              {l}
            </text>
          </g>
        );
      })}
      <Packet path={ring} dur={5.5} begin={0} r={4.2} color={C.violet} />
      <g transform={`translate(${cx - 44} ${cy - 44})`}>
        <rect
          width="88"
          height="88"
          rx="24"
          style={{ fill: C.surface, stroke: C.primary }}
          strokeWidth="1.4"
        />
        <circle cx="44" cy="40" r="15" style={{ fill: C.primary, fillOpacity: 0.18 }} />
        <circle cx="44" cy="40" r="7" style={{ fill: C.primary }} className="art-motion">
          <animate attributeName="r" values="6;8.5;6" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text
          x="44"
          y="74"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          className="font-sans"
          style={{ fill: C.fg }}
        >
          Agent
        </text>
      </g>
    </>
  );
}

function Llm({ r }: { r: () => number }) {
  const fields = shuffle(r, [
    ["Party", "Acme GmbH"],
    ["Amount", "€48,200"],
    ["Due date", "30 Nov"],
    ["Risk", "Low"],
    ["Clause", "§ 7.2"],
    ["Invoice", "INV-2291"],
    ["Currency", "EUR"],
  ]).slice(0, 4);
  const lines = Array.from({ length: 9 }, () => 60 + r() * 70);
  return (
    <>
      {/* source document */}
      <g transform="translate(190 88)">
        <rect width="170" height="274" rx="16" style={{ fill: C.surface, stroke: C.border }} />
        <rect
          x="18"
          y="20"
          width="70"
          height="9"
          rx="4.5"
          style={{ fill: C.fg, fillOpacity: 0.55 }}
        />
        {lines.map((w, i) => (
          <rect
            key={i}
            x="18"
            y={48 + i * 22}
            width={w}
            height="7"
            rx="3.5"
            style={{ fill: C.muted, fillOpacity: 0.35 }}
          />
        ))}
        {[1, 4, 7].map((i) => (
          <rect
            key={i}
            x="18"
            y={46 + i * 22}
            width={lines[i] * 0.6}
            height="11"
            rx="3"
            style={{ fill: C.primary, fillOpacity: 0.22 }}
          />
        ))}
      </g>
      {/* structured output */}
      <g transform="translate(440 108)">
        <rect
          width="170"
          height="234"
          rx="16"
          style={{ fill: C.surface, stroke: C.primary, strokeOpacity: 0.55 }}
        />
        <text
          x="18"
          y="30"
          fontSize="11"
          fontWeight="600"
          className="font-sans"
          style={{ fill: C.muted }}
        >
          {"{ extracted }"}
        </text>
        {fields.map(([k, v], i) => (
          <g key={k} transform={`translate(18 ${50 + i * 44})`}>
            <text y="12" fontSize="10.5" className="font-sans" style={{ fill: C.muted }}>
              {k}
            </text>
            <rect
              y="18"
              width="134"
              height="18"
              rx="6"
              style={{ fill: C.primary, fillOpacity: 0.14 }}
            />
            <text
              x="8"
              y="31"
              fontSize="11.5"
              fontWeight="600"
              className="font-sans"
              style={{ fill: C.fg }}
            >
              {v}
            </text>
          </g>
        ))}
      </g>
      {[0, 1, 2, 3].map((i) => {
        const y1 = 150 + i * 66;
        const y2 = 170 + i * 44;
        const d = `M 362 ${y1} C 400 ${y1}, 400 ${y2}, 438 ${y2}`;
        return (
          <g key={i}>
            <path d={d} fill="none" style={{ stroke: C.border }} />
            <Packet path={d} dur={1.8 + r()} begin={r() * 1.5} r={3} />
          </g>
        );
      })}
    </>
  );
}

function Stack({ r }: { r: () => number }) {
  const bars = Array.from({ length: 7 }, () => 20 + r() * 60);
  const pts = bars.map((b, i) => `${124 + i * 45},${262 - b}`).join(" ");
  return (
    <g transform="translate(190 80)">
      <rect width="420" height="290" rx="18" style={{ fill: C.surface, stroke: C.border }} />
      <rect width="420" height="34" rx="18" style={{ fill: C.bg }} />
      <rect y="18" width="420" height="16" style={{ fill: C.bg }} />
      {[18, 32, 46].map((x) => (
        <circle key={x} cx={x} cy="17" r="4" style={{ fill: C.muted, fillOpacity: 0.45 }} />
      ))}
      <rect x="140" y="10" width="140" height="14" rx="7" style={{ fill: C.surface }} />
      {/* sidebar */}
      <rect x="14" y="48" width="84" height="228" rx="10" style={{ fill: C.bg }} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="26"
          y={64 + i * 26}
          width={i === 1 ? 60 : 48}
          height="8"
          rx="4"
          style={{ fill: i === 1 ? C.primary : C.muted, fillOpacity: i === 1 ? 0.8 : 0.3 }}
        />
      ))}
      {/* cards */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${112 + i * 100} 48)`}>
          <rect width="90" height="62" rx="10" style={{ fill: C.bg, stroke: C.border }} />
          <rect
            x="12"
            y="14"
            width="40"
            height="7"
            rx="3.5"
            style={{ fill: C.muted, fillOpacity: 0.35 }}
          />
          <text
            x="12"
            y="46"
            fontSize="17"
            fontWeight="700"
            className="font-sans"
            style={{ fill: i === 0 ? C.primary : C.fg }}
          >
            {pick(r, ["98%", "1.2k", "140ms", "4.9", "24h", "3.1×"])}
          </text>
        </g>
      ))}
      {/* chart */}
      <rect
        x="112"
        y="124"
        width="294"
        height="152"
        rx="10"
        style={{ fill: C.bg, stroke: C.border }}
      />
      <polyline
        points={pts}
        fill="none"
        style={{ stroke: C.primary }}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
        className="art-motion"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="600;0;0"
          keyTimes="0;0.6;1"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </polyline>
    </g>
  );
}

function Pipeline({ r }: { r: () => number }) {
  const stages = ["Build", "Test", "Scan", "Sign", "Deploy"];
  const xs = stages.map((_, i) => 210 + i * 95);
  const y = 225;
  const track = `M ${xs[0]} ${y} L ${xs[4]} ${y}`;
  const dur = 5;
  return (
    <>
      <path
        d="M 400 225 C 330 150, 230 150, 230 225 C 230 300, 330 300, 400 225 C 470 150, 570 150, 570 225 C 570 300, 470 300, 400 225"
        fill="none"
        style={{ stroke: C.primary, strokeOpacity: 0.12 }}
        strokeWidth="18"
      />
      <path d={track} style={{ stroke: C.border }} strokeWidth="2" />
      {xs.map((x, i) => (
        <g key={stages[i]}>
          <circle
            cx={x}
            cy={y}
            r="17"
            style={{ fill: C.surface, stroke: C.border }}
            strokeWidth="1.5"
          />
          <circle
            cx={x}
            cy={y}
            r="17"
            fill="none"
            style={{ stroke: C.primary }}
            strokeWidth="2"
            opacity="0"
            className="art-motion"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;0;0"
              keyTimes={`0;${Math.max(0, i / 4 - 0.06)};${i / 4};${Math.min(1, i / 4 + 0.12)};1`}
              dur={`${dur}s`}
              repeatCount="indefinite"
            />
          </circle>
          <path
            d={`M ${x - 6} ${y} l 4 4 l 8 -9`}
            fill="none"
            style={{ stroke: C.primary }}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={x}
            y={y + 40}
            textAnchor="middle"
            fontSize="12"
            fontWeight="500"
            className="font-sans"
            style={{ fill: C.muted }}
          >
            {stages[i]}
          </text>
        </g>
      ))}
      <circle r="6" className="art-motion" style={{ fill: C.primary }}>
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={track} />
      </circle>
      <Chip x={400} y={112} label={`commit ${Math.floor(r() * 0xfffff).toString(16)}`} />
      <Chip x={400} y={340} label="Live in production" accent />
    </>
  );
}

function Mesh({ r }: { r: () => number }) {
  const nodes = Array.from({ length: 9 }, (_, i) => ({
    x: 210 + (i % 3) * 190 + (r() - 0.5) * 70,
    y: 95 + Math.floor(i / 3) * 130 + (r() - 0.5) * 50,
  }));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2);
    near.forEach(({ j }) => {
      if (!edges.some(([p, q]) => (p === i && q === j) || (p === j && q === i))) edges.push([i, j]);
    });
  });
  const gw = 4;
  return (
    <>
      {edges.map(([a, b], k) => {
        const d = `M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`;
        return (
          <g key={k}>
            <path d={d} style={{ stroke: C.border }} strokeWidth="1.3" />
            {k % 2 === 0 && <Packet path={d} dur={1.6 + r() * 1.6} begin={r() * 2} r={3} />}
          </g>
        );
      })}
      <circle
        cx={nodes[gw].x}
        cy={nodes[gw].y}
        r="34"
        fill="none"
        style={{ stroke: C.primary, strokeOpacity: 0.35 }}
        strokeDasharray="4 5"
        className="art-motion"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${nodes[gw].x} ${nodes[gw].y}`}
          to={`360 ${nodes[gw].x} ${nodes[gw].y}`}
          dur="18s"
          repeatCount="indefinite"
        />
      </circle>
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={i === gw ? 16 : 9}
            style={{ fill: C.surface, stroke: i === gw ? C.primary : C.border }}
            strokeWidth="1.6"
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={i === gw ? 6 : 3.5}
            style={{ fill: i === gw ? C.primary : C.muted }}
          />
        </g>
      ))}
      <Chip x={nodes[gw].x} y={nodes[gw].y + 50} label="Zero-trust gateway" accent />
    </>
  );
}

function Rack({ r }: { r: () => number }) {
  const racks = [255, 360, 465];
  return (
    <>
      {racks.map((x, ri) => (
        <g key={x} transform={`translate(${x} 78)`}>
          <rect width="84" height="294" rx="10" style={{ fill: C.surface, stroke: C.border }} />
          {Array.from({ length: 11 }, (_, u) => (
            <g key={u} transform={`translate(8 ${12 + u * 25})`}>
              <rect width="68" height="19" rx="4" style={{ fill: C.bg, stroke: C.border }} />
              <rect
                x="7"
                y="7"
                width="26"
                height="5"
                rx="2.5"
                style={{ fill: C.muted, fillOpacity: 0.3 }}
              />
              {[0, 1].map((l) => {
                const warm = r() > 0.88;
                return (
                  <circle
                    key={l}
                    cx={50 + l * 9}
                    cy="9.5"
                    r="2.6"
                    style={{ fill: warm ? C.violet : C.primary }}
                    className="art-motion"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.25;1;0.25"
                      dur={`${1.2 + r() * 2.4}s`}
                      begin={`${r() * 2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          ))}
          <text
            x="42"
            y="312"
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            className="font-sans"
            style={{ fill: C.muted }}
          >
            {["Compute", "Storage", "Network"][ri]}
          </text>
        </g>
      ))}
      <path
        id="rack-arc"
        d="M 297 76 C 330 30, 470 30, 507 76"
        fill="none"
        style={{ stroke: C.primary, strokeOpacity: 0.4 }}
        strokeDasharray="4 5"
      />
      <Packet path="M 297 76 C 330 30, 470 30, 507 76" dur={3.2} begin={0} r={3.6} />
    </>
  );
}

function Design({ r }: { r: () => number }) {
  const hue = pick(r, [0, 1, 2]);
  const swatches = [C.primary, C.violet, C.fg, C.muted];
  return (
    <>
      {/* layout grid */}
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={220 + i * 60}
          y1="80"
          x2={220 + i * 60}
          y2="370"
          style={{ stroke: C.border }}
          strokeDasharray="2 6"
        />
      ))}
      {/* golden-ratio construction */}
      <circle cx="330" cy="225" r="110" fill="none" style={{ stroke: C.border }} />
      <circle cx="398" cy="225" r="68" fill="none" style={{ stroke: C.border }} />
      <circle
        cx="440"
        cy="225"
        r="42"
        fill="none"
        style={{ stroke: C.primary, strokeOpacity: 0.45 }}
      />
      {/* bezier being drawn */}
      <path
        d="M 230 320 C 300 150, 470 300, 570 130"
        fill="none"
        style={{ stroke: hue === 1 ? C.violet : C.primary }}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="520"
        className="art-motion"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="520;0;0"
          keyTimes="0;0.55;1"
          dur="4.8s"
          repeatCount="indefinite"
        />
      </path>
      <line
        x1="230"
        y1="320"
        x2="300"
        y2="150"
        style={{ stroke: C.muted, strokeOpacity: 0.5 }}
        strokeWidth="1.2"
      />
      <line
        x1="570"
        y1="130"
        x2="470"
        y2="300"
        style={{ stroke: C.muted, strokeOpacity: 0.5 }}
        strokeWidth="1.2"
      />
      {[
        [230, 320],
        [570, 130],
      ].map(([x, y]) => (
        <rect
          key={x}
          x={x - 6}
          y={y - 6}
          width="12"
          height="12"
          rx="2"
          style={{ fill: C.bg, stroke: C.fg }}
          strokeWidth="1.5"
        />
      ))}
      {[
        [300, 150],
        [470, 300],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="5" style={{ fill: C.primary }} />
      ))}
      <text
        x="548"
        y="330"
        fontSize="64"
        fontWeight="600"
        className="font-display"
        style={{ fill: C.fg, fillOpacity: 0.9 }}
        letterSpacing="-3"
      >
        Aa
      </text>
      {swatches.map((s, i) => (
        <circle key={i} cx={236 + i * 30} cy="102" r="11" style={{ fill: s }} />
      ))}
    </>
  );
}

function Connect({ r }: { r: () => number }) {
  const a = { x: 250, y: 225 };
  const b = { x: 550, y: 225 };
  const top = `M ${a.x + 46} ${a.y - 10} C 350 150, 450 150, ${b.x - 46} ${b.y - 10}`;
  const bottom = `M ${b.x - 46} ${b.y + 10} C 450 300, 350 300, ${a.x + 46} ${a.y + 10}`;
  return (
    <>
      <path d={top} fill="none" style={{ stroke: C.border }} strokeWidth="1.5" />
      <path d={bottom} fill="none" style={{ stroke: C.border }} strokeWidth="1.5" />
      <Packet path={top} dur={2.6} begin={0} />
      <Packet path={top} dur={2.6} begin={1.3} />
      <Packet path={bottom} dur={2.6} begin={0.6} color={C.violet} />
      {[
        [a, "Your brief"],
        [b, "nova2labs"],
      ].map(([p, label], i) => {
        const pt = p as { x: number; y: number };
        return (
          <g key={i} transform={`translate(${pt.x - 46} ${pt.y - 46})`}>
            <rect
              width="92"
              height="92"
              rx="26"
              style={{ fill: C.surface, stroke: i ? C.primary : C.border }}
              strokeWidth="1.5"
            />
            <circle
              cx="46"
              cy="40"
              r="12"
              style={{ fill: i ? C.primary : C.muted, fillOpacity: i ? 1 : 0.5 }}
            />
            <text
              x="46"
              y="75"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              className="font-sans"
              style={{ fill: C.fg }}
            >
              {label as string}
            </text>
          </g>
        );
      })}
      <Chip x={400} y={120} label="Reply within 24 hours" accent />
      <Chip
        x={400}
        y={332}
        label={pick(r, ["Plan + fixed price", "Scope agreed in writing", "NDA on request"])}
      />
    </>
  );
}

const MOTIFS: Record<Motif, (p: { r: () => number }) => React.ReactElement> = {
  agents: Agents,
  llm: Llm,
  stack: Stack,
  pipeline: Pipeline,
  mesh: Mesh,
  rack: Rack,
  design: Design,
  connect: Connect,
};

export function Artwork({ motif, seed, label }: { motif: Motif; seed: string; label: string }) {
  const uid = useId().replace(/:/g, "");
  const r = rng(`${motif}:${seed}`);
  const Motif = MOTIFS[motif];
  const glowX = 300 + r() * 200;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx={glowX / W} cy="0.45" r="0.6">
          <stop offset="0" style={{ stopColor: C.primary, stopOpacity: 0.22 }} />
          <stop offset="1" style={{ stopColor: C.primary, stopOpacity: 0 }} />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" style={{ stroke: C.border }} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width={W} height={H} style={{ fill: C.surface }} />
      <rect width={W} height={H} fill={`url(#${uid}-grid)`} opacity="0.55" />
      <rect width={W} height={H} fill={`url(#${uid}-glow)`} />
      <Motif r={r} />
    </svg>
  );
}
