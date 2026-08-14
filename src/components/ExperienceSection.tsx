/**
 * WHERE I'VE WORKED — the list. Brittany-Chiang anatomy on this site's
 * tokens: dimmed-sibling rows, period column, role · org title, rich body
 * with claims linked inline, tag chips on engineering roles. Below the
 * list: hackathons and communities as two prose paragraphs.
 */
import ProofLink from "@/components/ProofLink";
import { BlurFade } from "@/components/ui/blur-fade";

const LINKS = {
  qatobit: "https://qatobit.com",
  nohunt: "https://nohunt.ai",
  recall: "https://x.com/JayBosshq/status/1953448415242723438",
  ton: "https://x.com/JayBosshq/status/1850824819966669220",
  atrium: "https://x.com/JayBosshq/status/1908253253730500716",
  thread: "https://x.com/JayBosshq/status/1905868856201195986",
  grad: "https://x.com/JayBosshq/status/1909753701582913618",
  polkadot: "https://x.com/JayBosshq/status/1864403099470975119",
  mca: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  vixdex: "https://vixdex.vercel.app",
  credibly: "https://credibly-teal.vercel.app",
};

type Entry = {
  period: string;
  periodLabel: string;
  role: string;
  org: string;
  orgHref?: string;
  sub?: string;
  body: React.ReactNode;
  chips?: string[];
};

const ENTRIES: Entry[] = [
  {
    period: "may 2026 — now",
    periodLabel: "May 2026 to present",
    role: "Founding Engineer",
    org: "Qatobit",
    orgHref: LINKS.qatobit,
    sub: "part-time",
    body: (
      <>
        <ProofLink href={LINKS.qatobit}>Qatobit</ProofLink> is crypto index
        investing for India — structured QSI indices instead of coin-picking,
        live proof of reserves, INR deposits from ₹200. I build the platform
        engineering: the part that has to hold when real money moves. It runs
        part-time alongside BOSS. Two products, one keyboard.
      </>
    ),
    chips: ["TypeScript", "Trading infra", "INR rails"],
  },
  {
    period: "nov 2025 — may 2026",
    periodLabel: "November 2025 to May 2026",
    role: "Founder",
    org: "NoHunt",
    orgHref: LINKS.nohunt,
    body: (
      <>
        The candidate side of the same problem BOSS attacks from the recruiter
        side. Job seekers burn 11 hours a week on applications;{" "}
        <ProofLink href={LINKS.nohunt}>NoHunt</ProofLink> took one resume
        upload and did the rest — discovery, tailoring, form-filling,
        tracking, through a Chrome extension that drove the browser itself.
        The engineering was real: a deterministic ATS-readiness engine running
        19 checks in under 50 milliseconds at zero LLM cost, and job ingestion
        from Ashby, Lever and Greenhouse indexed across Elasticsearch, Qdrant
        and MongoDB. I closed this chapter in May 2026. Six months on the
        candidate side taught me exactly where the bodies are buried — then I
        switched chairs.
      </>
    ),
    chips: ["Multi-agent systems", "Elasticsearch", "Chrome MV3", "Qdrant"],
  },
  {
    period: "aug 2025 — mar 2026",
    periodLabel: "August 2025 to March 2026",
    role: "Founding Engineer",
    org: "Xtheo",
    body: (
      <>
        This job started as a competition. I built an AI agent that traded
        Solana memecoins for the Recall + Gaia challenge, placed 9th, won
        $1,500 —{" "}
        <ProofLink href={LINKS.recall}>the entry became a job offer</ProofLink>
        . At Xtheo I took an AI DeFi platform from zero to production:
        natural-language swaps, bridging and liquidity, with audited leverage
        contracts holding user funds. On-chain there is no hotfix, so the bar
        was different. I learned 1→100 engineering the hard way — InfluxDB
        for time-series, Kafka for streaming token data, an efficient
        on-chain swap router — and led a team of 3 while shipping alongside
        them.
      </>
    ),
    chips: ["Solidity", "Foundry", "Kafka", "InfluxDB", "LLM agents"],
  },
  {
    period: "feb 2024 — jan 2025",
    periodLabel: "February 2024 to January 2025",
    role: "Co-Founder",
    org: "LEDGESYS · Souldem",
    body: (
      <>
        My first registered company, at 20. Souldem put exam credentials
        on-chain so certificates couldn&apos;t be faked — React and Solidity
        up front, Node and Mongo behind, IPFS for storage. It won a ₹15 lakh
        grant in the MSME Idea Hackathon and was incubated at the iTNT Hub,
        Anna University. The paper trail is public:{" "}
        <ProofLink href={LINKS.mca}>the incorporation record</ProofLink>.
        Running it taught me the unglamorous parts — filings, pitches,
        keeping a cofounder and a deadline in the same room.
      </>
    ),
    chips: ["Solidity", "IPFS", "Node.js", "Company ops"],
  },
  {
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
    period: "dec 2022 — apr 2023",
    periodLabel: "December 2022 to April 2023",
    role: "Full Stack Developer",
    org: "Stabel → Securr",
    sub: "one role through a rename",
    body: (
      <>
        My first production job, at 19. I designed and built the landing page
        that pulled 2,000 users in its first 30 days, 67% above target. Then
        I built the bug-bounty platform itself, front and back, as part of
        the core team. Web3 security work: the users were hackers, and the
        product had to survive them.
      </>
    ),
  },
];

export default function ExperienceSection() {
  return (
    <div className="mt-16">
      <ol className="group/list">
        {ENTRIES.map((e, i) => (
          <BlurFade key={e.org} delay={0.06 * i} inView>
            <li className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-12 sm:gap-8 md:gap-6 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                {/* hover surface */}
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-white/[0.055] lg:group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]" />
                <header
                  className="kicker relative z-10 mt-1 !tracking-[0.14em] tabular-nums sm:col-span-3"
                  aria-label={e.periodLabel}
                >
                  {e.period}
                </header>
                <div className="relative z-10 sm:col-span-9">
                  <h3 className="font-semibold leading-snug text-ink">
                    {e.orgHref ? (
                      <a
                        href={e.orgHref}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {e.role}{" "}
                        <span aria-hidden="true">·</span>{" "}
                        <span className="serif-accent font-normal">
                          {e.org}
                        </span>
                      </a>
                    ) : (
                      <>
                        {e.role} <span aria-hidden="true">·</span>{" "}
                        <span className="serif-accent font-normal">
                          {e.org}
                        </span>
                      </>
                    )}
                  </h3>
                  {e.sub && (
                    <p className="mt-0.5 text-xs text-ink-faint">{e.sub}</p>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {e.body}
                  </p>
                  {e.chips && (
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                      {e.chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-full px-3 py-1 text-xs font-medium text-accent"
                          style={{ background: "var(--accent-soft)" }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          </BlurFade>
        ))}
      </ol>

      {/* ── hackathons ── */}
      <BlurFade delay={0.1} inView>
        <div className="mt-16 max-w-3xl border-t border-line pt-10">
          <p className="kicker mb-4">hackathons</p>
          <p className="text-[0.95rem] leading-relaxed text-ink-dim">
            I&apos;ve been entering hackathons since college, and the wins
            carry receipts. Second place at the TON Bootcamp with TonMate —{" "}
            <ProofLink href={LINKS.ton}>$1,500, my own announcement</ProofLink>
            . A prize at the Uniswap Hook Incubator for VixDex, a
            volatility-trading hook —{" "}
            <ProofLink href={LINKS.atrium}>
              Atrium&apos;s announcement
            </ProofLink>
            , <ProofLink href={LINKS.thread}>the build thread</ProofLink>, and
            it&apos;s <ProofLink href={LINKS.vixdex}>still live</ProofLink>. A
            trading-agent competition with Recall + Gaia —{" "}
            <ProofLink href={LINKS.recall}>
              9th place, $1,500, and it turned into the Xtheo job
            </ProofLink>
            . A{" "}
            <ProofLink href={LINKS.polkadot}>
              $300 bounty at the Polkadot Hacker House
            </ProofLink>{" "}
            for Jackdot, a Telegram lottery app. The ₹15 lakh MSME grant for
            Souldem — <ProofLink href={LINKS.mca}>company on record</ProofLink>
            . And <ProofLink href={LINKS.credibly}>Credibly</ProofLink>, built
            at BASED India, still deployed. Plus a few smaller ones I never
            posted about.
          </p>
        </div>
      </BlurFade>

      {/* ── communities ── */}
      <BlurFade delay={0.15} inView>
        <div className="mt-10 max-w-3xl">
          <p className="kicker mb-4">communities</p>
          <p className="text-[0.95rem] leading-relaxed text-ink-dim">
            Before the companies, there were the rooms. Technical Director of
            The Phoenix Guild&apos;s Chandigarh chapter, running sessions on
            team formation and shipping with people I&apos;d just met.
            Webmaster for IEEE CIS at Chandigarh University, then Student
            Representative — I built the summer school&apos;s landing page and
            learned that community work is mostly showing up. Spoke at the
            Aleo zkMeetup in Chandigarh on zero-knowledge proofs, back when
            explaining ZK to a room was still a dare. Since then it&apos;s
            been hacker houses: AthenaFOSS, where I stayed up solving the
            Monad CTF riddle after a full workday, and ETHDelhi with the rest
            of the circus. No badges for any of this. Just the habit of being
            in rooms where things get built.
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
