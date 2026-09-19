/**
 * The two practice areas the studio is organised around.
 *
 * Presented as capabilities of nova2labs rather than individual profiles —
 * clients engage the company, not named individuals.
 */

export type Practice = {
  id: "ai-product" | "infrastructure";
  title: string;
  /** Short positioning line used on cards. */
  focus: string;
  summary: string;
  /** What this practice owns inside an engagement. */
  owns: string[];
  skills: string[];
};

export const PRACTICES: Practice[] = [
  {
    id: "ai-product",
    title: "AI Systems & Product Engineering",
    focus:
      "Builds the AI systems and the products around them: retrieval, agents, evaluation and interface.",
    summary:
      "Retrieval-augmented systems, multi-agent orchestration and LLM safety evaluation, delivered end to end: data pipeline, model layer, typed API and the interface a real user touches, plus the evaluation harness that proves it works before launch.",
    owns: [
      "Agent architecture, tool-use and guardrails",
      "Retrieval pipelines and vector/graph search",
      "Evaluation harnesses and accuracy benchmarking",
      "Full-stack product delivery and deployment",
    ],
    skills: [
      "LangGraph & LangChain",
      "OpenAI · Anthropic · HuggingFace",
      "RAG & GraphRAG",
      "FAISS · Qdrant · Neo4j",
      "PyTorch & Transformers",
      "FastAPI",
      "Next.js & TypeScript",
      "React & Tailwind CSS",
      "PostgreSQL · MongoDB",
      "SQLAlchemy & Alembic",
      "n8n automation",
      "Streamlit & Plotly",
      "scikit-learn",
      "RAGAS evaluation",
      "Docker",
      "CI/CD & preview deploys",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure, Security & Operations",
    focus:
      "Keeps production running: identity, endpoints, networks and the automation around them.",
    summary:
      "Six years of production IT behind this practice: endpoint estates in the hundreds, hybrid identity, Zero-Trust security posture and the automation that replaces manual IT work, zero-touch provisioning, self-service portals and monitoring that catches problems before a ticket is filed.",
    owns: [
      "Identity, endpoint management and Zero-Trust rollout",
      "Networks, firewalls, VPN and segmentation",
      "Backup, disaster recovery and tested RTO",
      "ITSM automation, monitoring and runbooks",
    ],
    skills: [
      "Microsoft Intune",
      "Autopilot & SCCM",
      "Jamf Pro",
      "Entra ID / Active Directory",
      "Azure · AWS · GCP",
      "Azure Virtual Desktop",
      "VMware vSphere / ESXi",
      "Docker & Kubernetes",
      "Terraform & Ansible",
      "PowerShell & Python",
      "ServiceNow · Jira SM",
      "CrowdStrike · Okta · Splunk",
      "pfSense · Fortinet · Cisco",
      "Veeam & Acronis",
      "Datadog · PRTG · SolarWinds",
      "GDPR / HIPAA compliance",
    ],
  },
];

/** Certifications held within the team, with no personal attribution. */
export const CERTIFICATIONS = [
  "ITIL Foundation — IT Service Management",
  "Google — IT Infrastructure Services",
  "HDI Support Center Analyst",
  "Information Security for IT Support",
  "Windows Server Fundamentals — Microsoft",
  "Linux Essentials",
];
