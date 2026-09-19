/**
 * Portfolio: real systems the nova2labs team has designed, built and run.
 *
 * Every entry is a system this team designed, built and ran. Nothing here is
 * invented, and numbers only appear where they came from the project itself.
 * Source code and walkthroughs are shared privately on request, not linked.
 */
import type { ServiceSlug } from "@/components/ServiceIcons";

export type WorkCategory =
  | "AI Agents"
  | "LLM & NLP"
  | "Full-Stack"
  | "DevOps & Cloud"
  | "IT Infrastructure"
  | "Networking & Security"
  | "Brand & Design";

export type WorkItem = {
  slug: string;
  title: string;
  /** One line that says what it is, in plain language. */
  summary: string;
  category: WorkCategory;
  /** Maps the project back to the service that sells it. */
  service: ServiceSlug;
  year: string;
  /** Headline figure: only ever a real one from the project. */
  metric?: { value: string; label: string };
  /** Shown as a small chip: how the work came about. */
  context: "Client work" | "Research" | "Open source" | "Production system" | "Product";
  problem: string;
  built: string[];
  stack: string[];
  /** Featured entries appear on the home page. */
  featured?: boolean;
};

export const WORK: WorkItem[] = [
  {
    slug: "infotech-wizard",
    title: "InfoTech Wizard — AI IT-support desk",
    summary:
      "A RAG chatbot that answers real IT-support questions from a company's own documentation instead of guessing.",
    category: "AI Agents",
    service: "ai-agents",
    year: "2025",
    metric: { value: "−60%", label: "IT ticket volume" },
    context: "Production system",
    problem:
      "A support desk was drowning in repeat questions: password resets, VPN setup, printer mapping. All of it was documented somewhere nobody could find.",
    built: [
      "Retrieval-augmented backend on FastAPI: documents chunked, embedded with Sentence-Transformers and searched through a FAISS vector index",
      "Answer generation grounded strictly in retrieved passages, so the bot cites internal docs rather than inventing steps",
      "Credential-filtering layer that detects and strips passwords or secrets a user might paste into chat",
      "React + TypeScript chat interface with streaming replies and an escalation path to a human",
      "Dockerised deployment with health checks and interactive API docs for the ops team",
    ],
    stack: [
      "FastAPI",
      "PyTorch",
      "Sentence-Transformers",
      "FAISS",
      "React",
      "TypeScript",
      "Docker",
    ],
    featured: true,
  },
  {
    slug: "n8n-agent-workflows",
    title: "Production AI agent workflows",
    summary:
      "Four business agents where the LLM does the reading and deterministic code does the checking: invoices, leads, content and support.",
    category: "AI Agents",
    service: "ai-agents",
    year: "2026",
    metric: { value: "4", label: "agents in production patterns" },
    context: "Open source",
    problem:
      "Most 'AI automation' breaks the moment a number is wrong or a document is scanned sideways, because nothing verifies what the model produced.",
    built: [
      "Invoice & document extraction agent: LLM extracts fields, code re-checks the arithmetic, OCR handles scans, and anything that fails validation goes to a human review queue with the exact reason",
      "Lead qualifier: enriches inbound leads from their website, scores them against an ideal-customer profile with written reasoning, and refuses to fake personalisation when it has nothing specific to say",
      "Multi-agent content pipeline: researcher, writer, editor, quality gate and SEO formatter, each with a strict contract and a bounded revision loop",
      "RAG support agent: answers grounded in your knowledge base with citations, self-scored confidence, and escalation to a human before an uncertain answer is ever sent",
    ],
    stack: ["n8n", "OpenAI", "Qdrant", "Cohere rerank", "OCR", "Slack", "Gmail", "Google Sheets"],
    featured: true,
  },
  {
    slug: "hybrid-rag-research",
    title: "HybridRAG — vector + graph retrieval",
    summary:
      "A retrieval system that classifies the question first, then picks between semantic search, a knowledge graph, or both.",
    category: "LLM & NLP",
    service: "llm-nlp",
    year: "2025",
    metric: { value: "4", label: "query classes routed separately" },
    context: "Research",
    problem:
      "Plain vector RAG answers 'what is X' well and fails at 'why does X relate to Y'. Scientific literature is full of the second kind of question.",
    built: [
      "Query classifier that sorts questions into explicit facts, implicit reasoning, hidden rationale and interpretable rationale",
      "VectorRAG path using dense embeddings for semantic similarity retrieval",
      "GraphRAG path over a Neo4j knowledge graph extracted from the source papers, for relationship and multi-hop reasoning",
      "Context fusion that merges structured and semantic evidence before generation",
      "Full ingestion pipeline: PDF extraction, cleaning, chunking, embedding and graph construction, plus RAGAS-based evaluation",
    ],
    stack: ["Python", "LangChain", "Neo4j", "FAISS", "MongoDB", "RAGAS", "Streamlit"],
    featured: true,
  },
  {
    slug: "agent-safety-research",
    title: "Agent red-teaming framework",
    summary:
      "A dual-agent system that attacks safety-aligned models on purpose, then measures exactly how and when they break.",
    category: "AI Agents",
    service: "ai-agents",
    year: "2025",
    metric: { value: "14", label: "attack techniques benchmarked" },
    context: "Research",
    problem:
      "Before you put an agent in front of customers, you need to know what it does under adversarial pressure, not hope for the best.",
    built: [
      "Persuader and Persuadee agents driven by LangGraph, with stateful multi-turn conversations and conditional routing",
      "Fourteen jailbreak techniques across four strategy families, run in both single-turn and multi-turn modes",
      "Automated safety judge (Llama-Guard) classifying every response, with human validation on samples",
      "Experiment store in PostgreSQL via SQLAlchemy with Alembic migrations, exposed through a FastAPI service",
      "Streamlit and Plotly dashboards reporting success rates and normalised change per strategy and model",
    ],
    stack: [
      "LangGraph",
      "GPT-4o",
      "Llama-3.3-70B",
      "Llama-Guard",
      "FastAPI",
      "PostgreSQL",
      "Streamlit",
    ],
  },
  {
    slug: "student-pii-guard",
    title: "Student PII detection & redaction",
    summary:
      "A FERPA-aligned model that finds and removes personal data from student writing before it reaches a third-party system.",
    category: "LLM & NLP",
    service: "llm-nlp",
    year: "2026",
    context: "Research",
    problem:
      "Education platforms want to use LLMs on student work, but sending names, emails and IDs to an external model is a compliance incident waiting to happen.",
    built: [
      "Token-classification model fine-tuned on real annotated data (PIILO, CC BY 4.0) rather than synthetic examples",
      "Detection and redaction pipeline covering names, contact details, IDs and free-text identifiers",
      "Benchmarking against public leaderboard solutions so accuracy claims are comparable, not self-reported",
      "Designed around FERPA requirements, with the same pattern applying directly to GDPR workloads",
    ],
    stack: ["Python", "Transformers", "PyTorch", "Token classification", "scikit-learn"],
  },
  {
    slug: "lyricsmith",
    title: "LyricSmith — AI songwriting assistant",
    summary:
      "A generation system for a music-production client where every line is validated for syllable count, stress pattern and rhyme.",
    category: "Full-Stack",
    service: "full-stack",
    year: "2026",
    metric: { value: "3 layers", label: "generate · validate · persist" },
    context: "Client work",
    problem:
      "Generic AI lyrics are unusable in production: the syllables don't fit the melody and the rhymes don't land where the bar needs them.",
    built: [
      "Constraint-aware generation with a validation layer checking syllable counts, stress patterns and rhyme schemes before anything is shown",
      "Background task processing with live status updates, so long generations don't block the interface",
      "Multi-project session workspace with automatic persistence in PostgreSQL",
      "Full data export for analysis and archival, plus structured error handling throughout",
      "Next.js front end against a FastAPI service, built to be operated rather than demoed",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL"],
  },
  {
    slug: "otree-proxy-server",
    title: "Research experiment coordinator",
    summary:
      "A proxy layer for online behavioural experiments that groups participants, blocks duplicates and routes everyone correctly.",
    category: "Full-Stack",
    service: "full-stack",
    year: "2026",
    metric: { value: "20 rounds", label: "multi-participant sessions" },
    context: "Client work",
    problem:
      "Online experiments fail on logistics, not science: the same person joins twice, a group of three starts with two, and the payout redirect sends people to the wrong place.",
    built: [
      "Waiting-room flow that holds participants until a full group has arrived, then releases them together into the experiment",
      "Duplicate-participation guard tied to generated per-group links",
      "Condition- and cohort-aware routing, with separate post-experiment redirects back to the recruitment platform",
      "Real-time monitoring for the research team during live sessions",
      "Next.js and Express on MongoDB, deployed on Vercel for a DFG-funded research project",
    ],
    stack: ["Next.js", "Express", "MongoDB", "Vercel", "oTree"],
  },
  {
    slug: "fairsample",
    title: "FairSample — published Python package",
    summary:
      "An open-source library that explains *why* an imbalanced dataset is hard, not just how to resample it.",
    category: "LLM & NLP",
    service: "llm-nlp",
    year: "2026",
    metric: { value: "40+", label: "complexity measures" },
    context: "Open source",
    problem:
      "Existing imbalanced-learning tools hand you a dozen resamplers and no way to tell which one suits your data. So teams guess and ship a weaker model.",
    built: [
      "Fourteen-plus resampling techniques including overlap-based undersampling, hybrid and clustering-based methods",
      "Over forty dataset complexity measures across feature overlap, instance overlap, structural and multiresolution families",
      "A comparison utility that ranks techniques by their measured effect on overlap instead of by reputation",
      "Published to PyPI with a documentation site, so it installs with one command",
    ],
    stack: ["Python", "scikit-learn", "NumPy", "pandas", "PyPI"],
  },
  {
    slug: "architecture-flow-designer",
    title: "CodeMap — architecture to code",
    summary:
      "A flowchart canvas for designing system architecture that turns the finished diagram into scaffolding code.",
    category: "Full-Stack",
    service: "full-stack",
    year: "2025",
    context: "Product",
    problem:
      "Architecture diagrams go stale the moment they're drawn, because nothing connects the picture to the code anyone actually writes.",
    built: [
      "Drag-and-drop canvas built on React Flow with resizable nodes, live editing and automatic edge routing",
      "Component library covering frontend, backend services, data stores and infrastructure primitives",
      "GPT-4 code generation that reads the diagram and produces implementation scaffolding in the target framework",
      "Structured JSON export of the whole architecture, so it can live in version control",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React Flow",
      "shadcn/ui",
      "Tailwind CSS",
      "OpenAI",
      "Firebase",
    ],
  },
  {
    slug: "universitaet-kompass",
    title: "Universität Kompass — programme matcher",
    summary:
      "Upload a CV, get the German university programmes you actually qualify for, with deadlines and contacts.",
    category: "LLM & NLP",
    service: "llm-nlp",
    year: "2025",
    context: "Product",
    problem:
      "Prospective students spend weeks reading university pages in a second language to work out which programmes will even consider them.",
    built: [
      "CV parsing and profile extraction from uploaded PDFs",
      "Semantic matching of a candidate's qualifications and experience against a scraped programme corpus using embeddings and FAISS search",
      "Programme records enriched with links, portal URLs, contacts and application deadlines, stored in MongoDB",
      "Live Streamlit application anyone can try without an account",
    ],
    stack: ["Python", "OpenAI GPT-4", "LangChain", "FAISS", "MongoDB", "Streamlit"],
  },
  {
    slug: "enterprise-endpoint-automation",
    title: "Enterprise endpoint & Zero-Trust rollout",
    summary:
      "Managing and automating hundreds of Windows, macOS, iOS and Android endpoints across international offices.",
    category: "IT Infrastructure",
    service: "it-infrastructure",
    year: "2020–2026",
    metric: { value: "500+", label: "endpoints under management" },
    context: "Production system",
    problem:
      "Growing companies hit a wall where laptops are set up by hand, identity lives in three places, and nobody can prove a device is patched.",
    built: [
      "Zero-touch provisioning through Microsoft Intune, Autopilot, SCCM, Jamf Pro and Apple Business Manager. Device setup fell from around three hours to twenty-five minutes",
      "Hybrid identity on Active Directory and Entra ID with Group Policy, Exchange and MFA/SSO, dropping account provisioning from two hours to twenty minutes",
      "Zero-Trust security posture using CrowdStrike, Okta MFA/SSO, Splunk Enterprise Security and Palo Alto Prisma, with incident response down from four hours to forty-five minutes",
      "Azure Virtual Desktop delivered to 180+ remote staff across a dozen locations, with deployment time reduced from six hours to ninety minutes",
      "Backup and disaster recovery through Veeam, Acronis and cloud-native backup, with tested four-hour RTO and a 100% backup success record",
    ],
    stack: [
      "Intune",
      "Autopilot",
      "Jamf Pro",
      "Entra ID",
      "Azure Virtual Desktop",
      "CrowdStrike",
      "Okta",
      "Splunk",
      "Veeam",
    ],
    featured: true,
  },
  {
    slug: "itsm-automation",
    title: "ITSM automation & self-service portal",
    summary:
      "Ticket routing, diagnostics and a knowledge portal that together removed the most repetitive half of a service desk's work.",
    category: "DevOps & Cloud",
    service: "devops",
    year: "2021–2026",
    metric: { value: "−70%", label: "manual interventions" },
    context: "Production system",
    problem:
      "A service desk processing over a thousand tickets a month, where most of the work was triage, copy-paste diagnostics and answering the same question again.",
    built: [
      "PowerShell and Python diagnostic frameworks wired into the ServiceNow API, with ITIL-based automated routing and resolution workflows",
      "Self-service portal on SharePoint and Microsoft 365 with Power Automate workflows and AI-assisted answers, cutting ticket volume by around 45%",
      "Predictive asset-lifecycle analytics across a multi-million-dollar hardware estate, saving roughly 25 hours of manual work a week",
      "Monitoring and alerting through Datadog, New Relic, Splunk and PRTG, sustaining 99.7% uptime and full SLA compliance",
      "Infrastructure automation with Terraform, Ansible and YAML pipelines across Azure, AWS and GCP with Docker and Kubernetes",
    ],
    stack: [
      "PowerShell",
      "Python",
      "ServiceNow",
      "Power Automate",
      "Terraform",
      "Ansible",
      "Datadog",
      "Splunk",
    ],
  },
  {
    slug: "pfsense-security-lab",
    title: "Firewall, VPN & IDS build-out",
    summary:
      "A segmented network with firewall policy, remote-access VPN and intrusion detection: built, attacked and documented.",
    category: "Networking & Security",
    service: "networking",
    year: "2025",
    context: "Production system",
    problem:
      "Flat networks with a consumer router are the norm in small offices, which means one compromised laptop reaches everything.",
    built: [
      "pfSense firewall with explicit allow/deny policy, WAN/LAN separation and VLAN segmentation between zones",
      "Remote access over OpenVPN and IPSec, with DHCP and DNS resolution managed centrally",
      "Intrusion detection and prevention using Suricata and Snort, tuned against simulated attack scenarios",
      "Traffic analysis and verification with Wireshark and Nmap, plus scripted firewall-rule updates",
      "Step-by-step runbook and exported configuration so the build can be reproduced or handed over",
    ],
    stack: ["pfSense", "VLAN", "OpenVPN", "IPSec", "Suricata", "Snort", "Wireshark", "Nmap"],
  },
  {
    slug: "velqa-technologies",
    title: "Velqa Technologies — brand & website",
    summary:
      "Identity and marketing site for a BPO and customer-support company, shipped on a modern stack.",
    category: "Brand & Design",
    service: "graphic-design",
    year: "2026",
    context: "Client work",
    problem:
      "A services company with no web presence was losing credibility in sales conversations before the first call even happened.",
    built: [
      "Visual identity and page system designed for a services buyer: what you do, who it's for, and how to start",
      "Next.js 14 site with the App Router, component library and responsive layouts",
      "Continuous deployment on Vercel. Every push to main ships production, every pull request gets a preview",
      "Custom domain, performance defaults and structured content ready for future pages",
    ],
    stack: ["Next.js 14", "React", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "biobrain",
    title: "BioBrain — semantic study assistant",
    summary:
      "A retrieval assistant over biology material that answers from the source text and shows where it came from.",
    category: "LLM & NLP",
    service: "llm-nlp",
    year: "2025",
    context: "Product",
    problem:
      "Students asking a general chatbot about a specific syllabus get confident answers that aren't in their curriculum.",
    built: [
      "Embedding pipeline over curated biology content with FAISS similarity search",
      "Grounded answer generation restricted to retrieved passages",
      "MongoDB-backed content store so material can be extended without retraining anything",
      "Live Streamlit app, publicly accessible with no setup",
    ],
    stack: ["Python", "OpenAI", "FAISS", "MongoDB", "Streamlit"],
  },
];

export const WORK_CATEGORIES: WorkCategory[] = [
  "AI Agents",
  "LLM & NLP",
  "Full-Stack",
  "DevOps & Cloud",
  "IT Infrastructure",
  "Networking & Security",
  "Brand & Design",
];

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug);

export const featuredWork = () => WORK.filter((w) => w.featured);

export const workForService = (service: ServiceSlug) => WORK.filter((w) => w.service === service);

export const getNextWork = (slug: string) => {
  const i = WORK.findIndex((w) => w.slug === slug);
  return WORK[(i + 1) % WORK.length];
};
