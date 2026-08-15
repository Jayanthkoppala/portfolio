/**
 * WHERE I'VE WORKED — the career line instrument + chapter panel.
 * Hackathons & communities live in the receipts section now.
 */
import ProofLink from "@/components/ProofLink";
import CareerLine, { type CareerEntry, type Spark } from "@/components/CareerLine";

const LINKS = {
  boss: "https://bosshq.in",
  qatobit: "https://qatobit.com",
  nohunt: "https://nohunt.ai",
  recall: "https://x.com/JayBosshq/status/1953448415242723438",
  ton: "https://x.com/JayBosshq/status/1850824819966669220",
  atrium: "https://x.com/JayBosshq/status/1908253253730500716",
  thread: "https://x.com/JayBosshq/status/1905868856201195986",
  polkadot: "https://x.com/JayBosshq/status/1864403099470975119",
  xtheoDemo: "https://x.com/JayBosshq/status/2002170394623807826",
  mca: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  vixdex: "https://vixdex.vercel.app",
  securrDocs: "https://securr.gitbook.io/securr",
  securrLi: "https://www.linkedin.com/company/securrtech",
  credibly: "https://credibly-teal.vercel.app",
};

const ENTRIES: CareerEntry[] = [
  {
    key: "securr",
    label: "Securr",
    period: "dec 2022 — apr 2023",
    periodLabel: "December 2022 to April 2023",
    role: "Full Stack Developer",
    org: "Stabel → Securr",
    sub: "one role through a rename",
    body: (
      <>
        My first production job, at 19, straight through a rename. I designed
        and built the landing page that pulled 2,000 users in its first 30
        days — 67% above target — then built the bug-bounty platform itself,
        front and back, as part of the core team, and set up the code-review
        process that cut bugs by 30%. This was Web3 security with real names
        on the client list — <ProofLink href={LINKS.securrLi}>Securr&apos;s</ProofLink>{" "}
        audits covered Chingari and StackOS, and{" "}
        <ProofLink href={LINKS.securrDocs}>
          the platform docs are still live
        </ProofLink>
        . The users were hackers; the product had to survive them.
      </>
    ),
    chips: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    key: "imigrom",
    label: "Imigrom",
    period: "mar — jul 2023",
    periodLabel: "March to July 2023",
    role: "Chief Technology Officer",
    org: "Imigrom Mediatech",
    body: (
      <>
        CTO of a web services company at 20. In five months we did ₹5,00,000
        in revenue across 5+ clients, and I ran four departments at once —
        tech, design, sales, marketing. Client calls in the morning, delivery
        at night. Services taught me what product never does: how money
        actually enters a company, and what clients pay for versus what
        engineers polish.
      </>
    ),
  },
  {
    key: "ledgesys",
    label: "LEDGESYS",
    period: "feb 2024 — jan 2025",
    periodLabel: "February 2024 to January 2025",
    role: "Co-Founder",
    org: "LEDGESYS · Souldem",
    body: (
      <>
        My first registered company, built with Abdul Haq — a co-founder I
        met at a networking event in my second year of college, then built
        with for three years. Souldem put exam credentials on-chain so
        certificates couldn&apos;t be faked — React and Solidity up front,
        Node and Mongo behind, IPFS for storage. It won a ₹15 lakh grant in
        the MSME Idea Hackathon and was incubated at the iTNT Hub, Anna
        University. The paper trail is public:{" "}
        <ProofLink href={LINKS.mca}>the incorporation record</ProofLink> — my
        name is on the directors line. Running it taught me the unglamorous
        parts: filings, pitches, keeping a cofounder and a deadline in the
        same room.
      </>
    ),
    chips: ["Solidity", "IPFS", "Node.js", "Company ops"],
  },
  {
    key: "xtheo",
    label: "Xtheo",
    period: "aug 2025 — mar 2026",
    periodLabel: "August 2025 to March 2026",
    role: "Founding Engineer",
    org: "Xtheo",
    sub: "in stealth",
    body: (
      <>
        An AI-DeFi startup, still in stealth — no landing page, on purpose.
        I joined by winning: my trading agent placed 9th in the Recall + Gaia
        challenge, won $1,500, and{" "}
        <ProofLink href={LINKS.recall}>
          the entry became the job offer
        </ProofLink>
        . I took the platform from zero to production: natural-language
        swaps, bridging and liquidity on top of multi-agent orchestration,
        with audited leverage contracts holding user funds — on-chain there
        is no hotfix. Kafka streamed the token data, InfluxDB held the
        time-series, and I built and mentored a team of 3 while shipping
        alongside them. The part I&apos;m proudest of: autonomous strategy
        agents trading perpetuals live —{" "}
        <ProofLink href={LINKS.xtheoDemo}>watch the demo</ProofLink>.
      </>
    ),
    chips: ["Solidity", "Foundry", "Kafka", "InfluxDB", "LLM agents"],
  },
  {
    key: "nohunt",
    label: "NoHunt",
    period: "nov 2025 — may 2026",
    periodLabel: "November 2025 to May 2026",
    role: "Founder",
    org: "NoHunt",
    orgHref: LINKS.nohunt,
    shot: "/shots/proj-nohunt.png",
    body: (
      <>
        The candidate side of the same problem BOSS attacks from the recruiter
        side. Job seekers burn 11 hours a week on applications;{" "}
        <ProofLink href={LINKS.nohunt}>NoHunt</ProofLink> took one resume
        upload and did the rest — discovery, tailoring, form-filling,
        tracking, through a Chrome extension that drove the browser itself.
        The engineering was real: a deterministic ATS-readiness engine
        running 19 checks in under 50 milliseconds at zero LLM cost, and live
        job ingestion from Ashby, Lever and Greenhouse, searchable by
        keyword, meaning or skill match. I closed this chapter in May 2026 —
        six months on the candidate side taught me exactly where the bodies
        are buried. Then I switched chairs.
      </>
    ),
    chips: ["Multi-agent systems", "Elasticsearch", "Chrome MV3", "Qdrant"],
  },
  {
    key: "qatobit",
    label: "Qatobit",
    period: "may 2026 — now",
    periodLabel: "May 2026 to present",
    role: "Founding Engineer",
    org: "Qatobit",
    orgHref: LINKS.qatobit,
    sub: "part-time",
    body: (
      <>
        <ProofLink href={LINKS.qatobit}>Qatobit</ProofLink> is crypto index
        investing for India — rules-based QSI indices instead of
        coin-picking, live proof of reserves, CERT-In audited infrastructure,
        INR deposits with withdrawals from ₹200. I build the platform
        engineering: the part that has to hold when real money moves. It runs
        part-time alongside BOSS. Two products, one keyboard.
      </>
    ),
    chips: ["TypeScript", "Trading infra", "INR rails"],
  },
  {
    key: "boss",
    label: "BOSS!",
    period: "jun 2026 — now",
    periodLabel: "June 2026 to present",
    role: "Founder",
    org: "BOSS!",
    orgHref: LINKS.boss,
    shot: "/shots/proj-boss.png",
    flagship: true,
    body: (
      <>
        A recruiter opens one role and gets 242 applications, most inside the
        first hour. <ProofLink href={LINKS.boss}>BOSS!</ProofLink> screens
        every one of them, holds a live voice call with the ones worth talking
        to, and hands back a ranked top 5–10 with reasons in 48 hours. It runs
        where India hiring actually happens: WhatsApp threads and Naukri
        dashboards. I&apos;m the only engineer on it — the site, the backend,
        the screening pipeline, the voice stack, the deploys. Accepted into
        the Sarvam AI Startup Program for the voice layer, with unit economics
        built for India: a 10-minute screening call costs about ₹36.
      </>
    ),
    chips: ["Voice AI", "LLM pipelines", "WhatsApp API", "Next.js", "Python"],
  },
];

const SPARKS: Spark[] = [
  { at: 40, label: "TON Bootcamp · 2nd · $1,500", href: LINKS.ton },
  { at: 45, label: "Polkadot bounty · $300", href: LINKS.polkadot },
  { at: 52, label: "Recall + Gaia · $1,500 → job", href: LINKS.recall },
  { at: 57, label: "Uniswap Foundation prize", href: LINKS.atrium },
];

export default function ExperienceSection() {
  return (
    <div>
      <CareerLine entries={ENTRIES} sparks={SPARKS} />

    </div>
  );
}
