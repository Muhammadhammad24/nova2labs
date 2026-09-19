import type { ServiceSlug } from "@/components/ServiceIcons";

export type ServiceDetail = {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  body: string;
  points: string[];
  deliverables: string[];
  process: { step: string; detail: string }[];
  stack: string[];
  outcomes: string[];
  lead: string;
};

export const SERVICES: ServiceDetail[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    tagline: "Agents that complete work, not just reply to it.",
    body: "Agents with tool-use, memory, evaluation and guardrails, wired into the systems you already run. We start with one scoped workflow and extend from there.",
    points: ["Tool-use & function calling", "RAG + memory architectures", "Evaluation harnesses"],
    deliverables: [
      "Agent architecture design document with task graph and tool contracts",
      "Production agent runtime with tool-calling, memory and tracing",
      "Evaluation suite covering accuracy, safety, latency and cost",
      "Guardrails, prompt-injection defenses and human-in-the-loop checkpoints",
      "Operator dashboard for runs, traces, replay and overrides",
    ],
    process: [
      { step: "Scope", detail: "Identify the workflow, success metric and acceptance criteria." },
      {
        step: "Prototype",
        detail: "Ship a thin vertical slice with one agent, one tool, real data.",
      },
      { step: "Harden", detail: "Add evals, retries, fallbacks, observability and cost ceilings." },
      { step: "Operate", detail: "Hand over with runbooks, dashboards and on-call playbooks." },
    ],
    stack: ["OpenAI", "Anthropic", "LangGraph", "Vercel AI SDK", "Pinecone / pgvector", "Temporal"],
    outcomes: [
      "Cut manual workflow time by 60–90%",
      "Auditable, replayable agent decisions",
      "Predictable per-task cost and latency",
    ],
    lead: "nova2labs",
  },
  {
    slug: "llm-nlp",
    title: "LLM & NLP",
    tagline: "Turn documents and text into structured data.",
    body: "Model selection, fine-tuning, retrieval and classical NLP pipelines. Outputs are schema-validated and measured against a golden set, so accuracy is a number you can check.",
    points: ["Fine-tuning & adapters", "Retrieval pipelines", "Classification & NER"],
    deliverables: [
      "Model selection report with cost, latency and quality benchmarks",
      "Retrieval pipeline: ingestion, chunking, embeddings, hybrid search",
      "Fine-tuned model or LoRA adapter with reproducible training pipeline",
      "Structured extraction layer with schema validation and fallbacks",
      "Eval harness with golden sets and regression tracking",
    ],
    process: [
      { step: "Data audit", detail: "Inventory sources, licensing, PII and label quality." },
      { step: "Baseline", detail: "Start with the simplest model that could work; measure." },
      {
        step: "Optimize",
        detail: "Iterate on retrieval, prompts and fine-tunes, but only where it moves the metric.",
      },
      {
        step: "Ship",
        detail: "Deploy behind a typed API with rate limits, caching and observability.",
      },
    ],
    stack: ["PyTorch", "Hugging Face", "spaCy", "LlamaIndex", "Weaviate", "Ray"],
    outcomes: [
      "Higher extraction accuracy at a fraction of frontier-model cost",
      "Deterministic, schema-validated outputs",
      "Repeatable training and eval pipelines",
    ],
    lead: "nova2labs",
  },
  {
    slug: "full-stack",
    title: "Full-Stack Engineering",
    tagline: "Web products built to be maintained.",
    body: "Typed APIs, a clean data layer, accessible interfaces and a delivery pipeline your team can run. We build new products and take over stalled codebases.",
    points: ["React / Next / TanStack", "Node, Python, Go services", "Postgres, Redis, queues"],
    deliverables: [
      "Architecture document covering data model, APIs and deployment topology",
      "Typed end-to-end stack with shared contracts between client and server",
      "Accessible, responsive UI built on a documented design system",
      "Authentication, authorization and role model wired to the database",
      "CI pipeline with previews, tests and one-click rollbacks",
    ],
    process: [
      {
        step: "Discovery",
        detail: "Map users, jobs-to-be-done and the smallest valuable release.",
      },
      { step: "Foundations", detail: "Set up the stack, conventions and CI before feature work." },
      { step: "Iterate", detail: "Ship in weekly increments behind feature flags." },
      { step: "Scale", detail: "Profile, cache, denormalize and split services only when needed." },
    ],
    stack: ["React", "TanStack Start", "Node.js", "Python", "PostgreSQL", "Redis"],
    outcomes: [
      "Production launch in weeks, not quarters",
      "A codebase your team can extend without us",
      "Measurable performance and accessibility budgets",
    ],
    lead: "nova2labs",
  },
  {
    slug: "devops",
    title: "DevOps & DevSecOps",
    tagline: "Delivery pipelines your team can operate.",
    body: "CI/CD, infrastructure as code and Kubernetes with security checks inside the pipeline. Reproducible environments, observability and cost controls come as standard.",
    points: ["Terraform / Pulumi", "Kubernetes & GitOps", "SAST/DAST, SBOM, policy-as-code"],
    deliverables: [
      "Infrastructure as code covering networks, clusters, data and secrets",
      "GitOps-driven Kubernetes platform with progressive delivery",
      "CI/CD pipelines with SAST, DAST, SBOM generation and signed artifacts",
      "Policy-as-code (OPA / Kyverno) enforcing security and cost guardrails",
      "Observability stack: metrics, logs, traces and SLO-based alerts",
    ],
    process: [
      { step: "Assess", detail: "Audit current infra, pipelines, security posture and cost." },
      {
        step: "Design",
        detail: "Target architecture with explicit trade-offs and migration path.",
      },
      { step: "Migrate", detail: "Move workloads in safe slices with rollback at every step." },
      { step: "Enable", detail: "Train the team and leave runbooks they actually use." },
    ],
    stack: ["Terraform", "Kubernetes", "ArgoCD", "GitHub Actions", "Prometheus", "Trivy"],
    outcomes: [
      "Faster, safer deploys with measurable lead time",
      "Security findings caught at PR time, not in production",
      "Lower cloud bill through right-sizing and policy",
    ],
    lead: "nova2labs",
  },
  {
    slug: "networking",
    title: "Networking",
    tagline: "Networks that hold up under real load.",
    body: "Routing, switching, segmentation and remote access for distributed teams and multiple sites, documented so your own staff can run it.",
    points: ["Routing & switching", "VPN / SD-WAN", "Segmentation & ACLs"],
    deliverables: [
      "Network architecture and addressing plan with growth headroom",
      "Segmentation model, ACLs and zero-trust access policies",
      "Site-to-site and remote-access VPN / SD-WAN deployment",
      "Monitoring, alerting and capacity dashboards",
      "Runbooks for incident response and change management",
    ],
    process: [
      { step: "Survey", detail: "Inventory sites, links, devices and current pain points." },
      { step: "Design", detail: "Propose topology, segmentation and failure domains." },
      { step: "Roll out", detail: "Stage changes per site with documented rollback." },
      { step: "Operate", detail: "Set SLOs, dashboards and a change cadence." },
    ],
    stack: ["Cisco", "MikroTik", "Fortinet", "WireGuard", "pfSense", "Zabbix"],
    outcomes: [
      "Documented, predictable network behavior",
      "Reduced incidents and faster MTTR",
      "Secure remote access without VPN sprawl",
    ],
    lead: "nova2labs",
  },
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    tagline: "Identity, devices and recovery, properly set up.",
    body: "Directory and identity, endpoint management, virtualisation and disaster recovery. One source of truth for accounts and devices, with recovery that has actually been tested.",
    points: ["Identity & SSO", "Virtualization", "Backup & DR"],
    deliverables: [
      "Identity and SSO rollout (Entra ID / Google Workspace / Okta)",
      "Endpoint management with baseline policies and patching",
      "Virtualization or private-cloud platform with HA storage",
      "Backup, retention and disaster-recovery plan with tested RPO/RTO",
      "Asset inventory, lifecycle and offboarding workflow",
    ],
    process: [
      { step: "Audit", detail: "Map current systems, accounts, devices and risks." },
      { step: "Plan", detail: "Target state with phased migration and budget." },
      { step: "Deploy", detail: "Implement in waves, verifying at each milestone." },
      { step: "Handover", detail: "Documentation, training and ongoing support model." },
    ],
    stack: ["Entra ID", "Active Directory", "Proxmox", "VMware", "Veeam", "Intune"],
    outcomes: [
      "One identity, one device policy, one source of truth",
      "Tested recovery, not just backups",
      "Clean joiner / mover / leaver workflows",
    ],
    lead: "nova2labs",
  },
  {
    slug: "graphic-design",
    title: "Brand & Product Design",
    tagline: "One visual system across everything you ship.",
    body: "Logo and identity, product interfaces, decks and marketing assets, built on shared design tokens so the site, the product and the pitch all look like one company.",
    points: [
      "Logo & identity systems",
      "Product UI & design systems",
      "Pitch decks & marketing assets",
    ],
    deliverables: [
      "Logo suite: primary, stacked and icon marks, in SVG, PNG and favicon sizes",
      "Brand guidelines: colour tokens, typography scale, spacing and usage rules",
      "Design system in Figma, mapped one-to-one to the code that ships it",
      "Marketing set: social cards, OG images, ad creatives and email headers",
      "Investor or sales deck built on your new identity",
    ],
    process: [
      {
        step: "Positioning",
        detail: "Who you serve, who you compete with, and what the brand has to signal.",
      },
      {
        step: "Direction",
        detail: "Two or three distinct visual routes. You pick one before any polish begins.",
      },
      {
        step: "Build",
        detail: "Logo, tokens, type scale and components produced as production-ready assets.",
      },
      {
        step: "Handover",
        detail: "Editable source files, exports and guidelines. No licence traps, all yours.",
      },
    ],
    stack: ["Figma", "Illustrator", "Inkscape", "Tailwind tokens", "SVG", "Framer Motion"],
    outcomes: [
      "One identity across site, product, deck and ads",
      "Design tokens developers can implement exactly",
      "Assets in every size and format you'll be asked for",
    ],
    lead: "nova2labs",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const getNextService = (slug: string) => {
  const i = SERVICES.findIndex((s) => s.slug === slug);
  return SERVICES[(i + 1) % SERVICES.length];
};
