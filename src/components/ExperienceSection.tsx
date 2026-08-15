/** WHERE I'VE WORKED — recent-first career chapters. */
import { type CareerEntry } from "@/components/CareerLine";
import CareerIndex from "@/components/CareerIndex";

const LINKS = {
  boss: "https://bosshq.in",
  bossLaunch: "https://x.com/JayBosshq/status/2082880953366827258",
  bossSarvam: "https://x.com/JayBosshq/status/2083173402932851055",
  qatobit: "https://qatobit.com",
  nohunt: "https://nohunt.ai",
  recall: "https://x.com/JayBosshq/status/1953448415242723438",
  xtheo: "https://chat.agenttheo.com",
  xtheoDemo: "https://x.com/JayBosshq/status/2002170394623807826",
  mca: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  msmeGrant: "https://www.cuchd.in/uic/computing/achievements.php",
  imigrom: "https://in.linkedin.com/company/imigrom-mediatech",
  securrDocs: "https://securr.gitbook.io/securr",
  securrLi: "https://www.linkedin.com/company/securrtech",
};

const ENTRIES: CareerEntry[] = [
  {
    key: "boss",
    label: "BOSS!",
    period: "jun 2026 — now",
    periodLabel: "June 2026 to present",
    role: "Founder",
    org: "BOSS!",
    orgHref: LINKS.boss,
    status: "BUILDING NOW",
    outcome: "Building BOSS end to end as its sole engineer.",
    shot: "/shots/proj-boss.png",
    shotAlt:
      "The BOSS! recruiting product interface showing its dark dashboard and candidate workflow",
    shotHref: LINKS.boss,
    shotCaption: "BOSS! · recruiter workspace, conversations, and shortlist.",
    shotFit: "contain",
    flagship: true,
    body:
      "A recruiter posts one role and gets 242 applications. BOSS! screens all of them, calls the ones worth talking to, and hands back a ranked top 5–10 in 48 hours. I build every piece of it: the site, the screening pipeline, the voice on the call, the deploys. Sarvam's AI Startup Program backs the voice layer, and the unit economics are built for India. A 10-minute screening call costs about ₹36.",
    stack: ["Next.js", "Python", "Voice AI", "Screening systems", "Product ops"],
    scope: [
      {
        label: "Interface",
        detail: "Recruiter workspace, candidate flows, the shortlist.",
      },
      {
        label: "Backend",
        detail: "Role intake, screening runs, APIs, data flow.",
      },
      {
        label: "AI systems",
        detail: "Live voice conversations and structured hiring context.",
      },
      {
        label: "Founder",
        detail: "Product decisions, deployment, costs, and daily operations.",
      },
    ],
    links: [
      { label: "Live product", href: LINKS.boss },
      {
        label: "Sarvam post",
        href: LINKS.bossSarvam,
      },
      {
        label: "Launch post",
        href: LINKS.bossLaunch,
      },
    ],
  },
  {
    key: "qatobit",
    label: "Qatobit",
    period: "may 2026 — now",
    periodLabel: "May 2026 to present",
    role: "Founding Engineer",
    org: "Qatobit",
    shot: "/shots/proj-qatobit.png",
    shotAlt: "The Qatobit landing page: India's crypto wealth architect.",
    shotHref: LINKS.qatobit,
    shotCaption: "Qatobit · structured crypto indices for India.",
    shotFit: "cover",
    orgHref: LINKS.qatobit,
    status: "PART-TIME · NOW",
    outcome: "Building India’s crypto-index platform foundations.",
    body:
      "Crypto index investing for India: rules-based QSI indices instead of coin-picking, live proof of reserves, INR rails. I build the platform side, the part that has to hold when real money moves. Part-time, alongside BOSS. Two products, one keyboard.",
    stack: ["TypeScript", "Index products", "Trading infrastructure", "INR rails"],
    scope: [
      {
        label: "Product",
        detail: "Indices an investor can actually understand.",
      },
      {
        label: "Platform",
        detail: "Portfolio services, account flows, the plumbing.",
      },
      {
        label: "Money rails",
        detail: "Systems designed around KYC, UPI, custody, and withdrawals.",
      },
      {
        label: "Role",
        detail: "Founding engineering work alongside building BOSS!",
      },
    ],
    links: [
      {
        label: "Product preview",
        href: LINKS.qatobit,
      },
    ],
  },
  {
    key: "nohunt",
    label: "NoHunt",
    period: "nov 2025 — may 2026",
    periodLabel: "November 2025 to May 2026",
    role: "Founder",
    org: "NoHunt",
    status: "CLOSED · MAY 2026",
    shot: "/shots/proj-nohunt.png",
    shotAlt: "The NoHunt candidate dashboard with applications in flight.",
    shotHref: LINKS.nohunt,
    shotCaption: "NoHunt · the product, still live.",
    shotFit: "cover",
    outcome: "Six months building for candidates shaped what came next.",
    body:
      "Job seekers burn 11 hours a week on applications. NoHunt took one resume upload and did the rest: found roles, tailored, filled the forms, tracked everything, through a Chrome extension that drove the browser itself. The proper engineering underneath: an ATS-readiness engine running 19 checks in under 50 milliseconds at zero LLM cost. I closed it in May 2026. Six months on the candidate side taught me where the bodies are buried, so I switched chairs.",
    stack: ["Chrome MV3", "Elasticsearch", "Qdrant", "ATS integrations"],
    scope: [
      {
        label: "Product",
        detail: "A candidate workspace from resume upload to application tracking.",
      },
      {
        label: "Extension",
        detail: "Form detection, autofill, job capture, and browser workflows.",
      },
      {
        label: "Matching",
        detail: "Keyword, semantic, skill, and ATS-readiness checks.",
      },
      {
        label: "Founder",
        detail: "Research, product, engineering, and the decision to close it.",
      },
    ],
    links: [
      {
        label: "Live product",
        href: LINKS.nohunt,
      },
    ],
  },
  {
    key: "xtheo",
    label: "Xtheo",
    period: "aug 2025 — mar 2026",
    periodLabel: "August 2025 to March 2026",
    role: "Founding Engineer",
    org: "Xtheo",
    shot: "/shots/proj-xtheo.png",
    shotAlt: "The xTheo product entry screen with its logo and wallet connect.",
    shotHref: LINKS.xtheo,
    shotCaption: "xTheo · natural-language DeFi, live.",
    shotFit: "cover",
    orgHref: LINKS.xtheo,
    status: "FOUNDING TEAM",
    outcome: "A trading-agent win became a founding-engineer role.",
    body:
      "I joined by winning. My trading agent placed 9th in the Recall + Gaia challenge, won $1,500, and the entry became the job offer. I took the platform from zero to production: natural-language swaps, bridging, liquidity, audited leverage contracts holding user funds. Built and mentored a team of 3 while shipping alongside them.",
    stack: ["Solidity", "Kafka", "InfluxDB", "LLM agents", "DeFi"],
    scope: [
      {
        label: "Agents",
        detail: "Natural-language swaps, bridges, positions, and strategy runs.",
      },
      {
        label: "Backend",
        detail: "Event pipelines, market data, execution state.",
      },
      {
        label: "Onchain",
        detail: "Contract integrations for trading and liquidity.",
      },
      {
        label: "Leadership",
        detail: "Built and mentored a three-person engineering team.",
      },
    ],
    links: [
      { label: "Live product", href: LINKS.xtheo },
      {
        label: "Origin post",
        href: LINKS.recall,
      },
      {
        label: "Perps demo",
        href: LINKS.xtheoDemo,
      },
    ],
  },
  {
    key: "ledgesys",
    label: "LEDGESYS",
    period: "feb 2024 — jan 2025",
    periodLabel: "February 2024 to January 2025",
    role: "Co-Founder",
    org: "LEDGESYS · Souldem",
    status: "CO-FOUNDED · REGISTERED",
    outcome: "₹15 lakh turned a college build into a company.",
    shot: "/images/receipts/ledgesys-itnt.jpg",
    shotAlt:
      "Jayanth Koppala and co-founder Abdul Haq at the iTNT technology hub",
    shotHref: LINKS.msmeGrant,
    shotCaption: "With co-founder Abdul Haq at iTNT, Chennai.",
    body:
      "I built Souldem with Abdul Haq, a co-founder I met in my second year of college and then built with for three years. We put exam credentials on-chain so certificates couldn't be faked, won a ₹15 lakh grant at the MSME Idea Hackathon, and incorporated LEDGESYS. My name is on the directors line. Running it taught me the unglamorous parts: filings, pitches, keeping a cofounder and a deadline in the same room.",
    stack: ["Solidity", "IPFS", "Credential systems", "Company operations"],
    scope: [
      {
        label: "Product",
        detail: "Souldem turned academic credentials into verifiable records.",
      },
      {
        label: "Onchain",
        detail: "Credential contracts, IPFS documents, and issuer workflows.",
      },
      {
        label: "Company",
        detail: "Grant applications, incorporation, pitching, and delivery.",
      },
      {
        label: "Founder",
        detail: "Built the system with Abdul Haq while still in college.",
      },
    ],
    links: [
      {
        label: "Grant page",
        href: LINKS.msmeGrant,
      },
      {
        label: "Company listing",
        href: LINKS.mca,
      },
    ],
  },
  {
    key: "imigrom",
    label: "Imigrom",
    period: "mar — jul 2023",
    periodLabel: "March to July 2023",
    role: "Chief Technology Officer",
    org: "Imigrom Mediatech",
    orgHref: LINKS.imigrom,
    status: "CLIENT SERVICES",
    outcome: "At 20, I learned where delivery, sales, and cash flow meet.",
    body:
      "CTO at 20. Five months, 5+ clients, ₹5,00,000 in revenue, four departments at once: tech, design, sales, marketing. Client calls in the morning, delivery at night. Services taught me what customers actually pay for, and it is not the parts engineers polish.",
    stack: ["Web products", "Client delivery", "Sales", "Team operations"],
    scope: [
      {
        label: "Delivery",
        detail: "Scoped and shipped websites for more than five clients.",
      },
      {
        label: "Revenue",
        detail: "Engineering decisions with ₹5L of client work on the line.",
      },
      {
        label: "Team",
        detail: "Worked across technology, design, sales, and marketing.",
      },
      {
        label: "Role",
        detail: "CTO at 20, learning the business side of shipping.",
      },
    ],
    links: [
      {
        label: "Company page",
        href: LINKS.imigrom,
      },
    ],
  },
  {
    key: "securr",
    label: "Securr",
    period: "dec 2022 — apr 2023",
    periodLabel: "December 2022 to April 2023",
    role: "Full Stack Developer",
    org: "Stabel → Securr",
    orgHref: LINKS.securrLi,
    status: "FIRST PRODUCTION ROLE",
    outcome: "My first production role made reliability real.",
    body:
      "My first production job, at 19, straight through a rename. The landing page I built pulled 2,000 users in its first 30 days, 67% above target, and I worked the bug-bounty platform front and back. The clients were real names: Chingari, StackOS. The users were hackers. The product had to survive them.",
    stack: ["React", "Next.js", "Node.js", "MongoDB", "Product reliability"],
    scope: [
      {
        label: "Interface",
        detail: "Landing page, researcher flows, and platform surfaces.",
      },
      {
        label: "Backend",
        detail: "Node services, MongoDB models, and platform workflows.",
      },
      {
        label: "Reliability",
        detail: "Code review and production discipline for hacker-facing software.",
      },
      {
        label: "Role",
        detail: "Core-team full-stack work in my first production job.",
      },
    ],
    links: [
      {
        label: "Company page",
        href: LINKS.securrLi,
      },
      {
        label: "Platform docs",
        href: LINKS.securrDocs,
      },
    ],
  },
];

export default function ExperienceSection() {
  return <CareerIndex entries={ENTRIES} />;
}
