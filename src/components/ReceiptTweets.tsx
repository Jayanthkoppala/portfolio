import type { Tweet } from "react-tweet/api";
import tweets from "@/data/tweets.json";

/**
 * THE RECEIPTS — one continuous evidence wall. Three opposite-direction
 * marquee rails carrying four card species: tweets (committed snapshot),
 * wins (hackathon medals), rooms (community roles — every one linked to a
 * real receipt on LinkedIn or X), and facts (registry records, live
 * deployments). Nothing is prose; every claim is a card with a link.
 */
const T = tweets as unknown as Record<string, Tweet>;

type Win = { title: string; prize: string; note: string; href: string };
const WINS: Win[] = [
  {
    title: "TON Bootcamp",
    prize: "2nd · $1,500",
    note: "TonMate — announced it myself, the day it happened.",
    href: "https://x.com/JayBosshq/status/1850824819966669220",
  },
  {
    title: "Uniswap Hook Incubator",
    prize: "prize winner",
    note: "VixDex, a volatility-trading hook. Atrium announced it.",
    href: "https://x.com/JayBosshq/status/1908253253730500716",
  },
  {
    title: "Recall + Gaia",
    prize: "9th · $1,500",
    note: "Trading-agent competition. The entry became the Xtheo job.",
    href: "https://x.com/JayBosshq/status/1953448415242723438",
  },
  {
    title: "Polkadot Hacker House",
    prize: "$300 bounty",
    note: "Jackdot, a Telegram lottery app with provably fair draws.",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
  },
  {
    title: "MSME Idea Hackathon",
    prize: "₹15 lakh grant",
    note: "Souldem — the grant that funded my first registered company.",
    href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  },
];

type Room = {
  org: string;
  role: string;
  note: string;
  href: string;
  src: string;
};
const ROOMS: Room[] = [
  {
    org: "The Phoenix Guild",
    role: "Technical Director · Chandigarh",
    note: "Hosted the sessions myself — receipt on LinkedIn.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7134208457670336512/",
    src: "linkedin",
  },
  {
    org: "IEEE CIS",
    role: "Executive Member · Webmaster",
    note: "The appointment post, and a GitHub session I co-led.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7162122191340290048/",
    src: "linkedin",
  },
  {
    org: "Aleo zkMeetup",
    role: "Speaker",
    note: "Phoenix Guild × Aleo Chandigarh — the event invite.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7171564639317680128/",
    src: "linkedin",
  },
  {
    org: "AthenaFOSS",
    role: "Hacker house",
    note: "Solved the Monad CTF riddle after a full workday.",
    href: "https://x.com/JayBosshq/status/1968547768495923492",
    src: "x",
  },
  {
    org: "ETHDelhi",
    role: "Hacker house",
    note: "With the rest of the circus.",
    href: "https://x.com/JayBosshq/status/1971584564632985757",
    src: "x",
  },
];

type Fact = { kicker: string; title: string; note: string; href: string };
const FACTS: Fact[] = [
  {
    kicker: "on the record",
    title: "LEDGESYS Software Pvt Ltd",
    note: "CIN U62091TN2024PTC173053 — my name on the directors line.",
    href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
  },
  {
    kicker: "still live",
    title: "vixdex.vercel.app",
    note: "The winning hook, still deployed. Click it.",
    href: "https://vixdex.vercel.app",
  },
  {
    kicker: "still live",
    title: "credibly-teal.vercel.app",
    note: "Built at BASED India. Never taken down.",
    href: "https://credibly-teal.vercel.app",
  },
];

function cleanText(t: string) {
  return t
    .replace(/https:\/\/t\.co\/\S+/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

/* ── card species ── */

function TweetCard({ id }: { id: string }) {
  const t = T[id];
  const media =
    (t as { mediaDetails?: { type: string; media_url_https: string }[] })
      .mediaDetails ?? [];
  const first = media[0];
  return (
    <a
      href={`https://x.com/JayBosshq/status/${id}`}
      target="_blank"
      rel="noreferrer"
      className="glass group flex w-[330px] shrink-0 flex-col !rounded-2xl p-5 transition-colors hover:border-accent/40 sm:w-[360px]"
    >
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.user.profile_image_url_https}
          alt=""
          className="h-9 w-9 rounded-full border border-line"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {t.user.name}
          </p>
          <p className="kicker !normal-case !tracking-normal">
            @{t.user.screen_name} · {fmtDate(t.created_at)}
          </p>
        </div>
        <span
          aria-hidden
          className="ml-auto text-sm text-ink-faint transition-colors group-hover:text-accent"
        >
          ↗
        </span>
      </div>
      <p
        className={`mt-3 text-[0.88rem] leading-relaxed text-ink-dim ${
          first ? "line-clamp-3" : "line-clamp-5"
        }`}
      >
        {cleanText(t.text)}
      </p>
      {first && (
        <div className="relative mt-auto pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={first.media_url_https}
            alt=""
            className="h-20 w-full rounded-xl border border-line object-cover"
            loading="lazy"
          />
          {first.type !== "photo" && (
            <span
              aria-hidden
              className="absolute bottom-2 left-2 grid h-7 w-7 place-items-center rounded-full bg-bg/80 text-[0.6rem] text-ink backdrop-blur"
            >
              ▶
            </span>
          )}
        </div>
      )}
    </a>
  );
}

function WinCard({ w }: { w: Win }) {
  return (
    <a
      href={w.href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-[270px] shrink-0 flex-col justify-between rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.14] to-accent/[0.04] p-5 transition-all hover:border-accent hover:shadow-[0_0_28px_rgba(16,185,129,0.18)]"
    >
      <div>
        <p className="kicker !text-accent">hackathon win</p>
        <p
          style={{ fontFamily: "var(--font-anton)" }}
          className="mt-2 text-xl uppercase leading-tight text-ink"
        >
          {w.title}
        </p>
        <p className="serif-accent mt-1 text-lg text-accent">{w.prize}</p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {w.note}
        <span
          aria-hidden
          className="ml-1 inline-block text-ink-faint transition-colors group-hover:text-accent"
        >
          ↗
        </span>
      </p>
    </a>
  );
}

function RoomCard({ r }: { r: Room }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noreferrer"
      className="group flex w-[260px] shrink-0 flex-col justify-between rounded-2xl border border-dashed border-line bg-bg-raised/40 p-5 transition-colors hover:border-accent/50"
    >
      <div>
        <p className="kicker">the rooms · {r.src}</p>
        <p
          style={{ fontFamily: "var(--font-anton)" }}
          className="mt-2 text-lg uppercase leading-tight text-ink"
        >
          {r.org}
        </p>
        <p className="serif-accent mt-1 text-[0.95rem] text-ink-dim">
          {r.role}
        </p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {r.note}
        <span
          aria-hidden
          className="ml-1 inline-block text-ink-faint transition-colors group-hover:text-accent"
        >
          ↗
        </span>
      </p>
    </a>
  );
}

function FactCard({ f }: { f: Fact }) {
  return (
    <a
      href={f.href}
      target="_blank"
      rel="noreferrer"
      className="glass group relative flex w-[290px] shrink-0 flex-col justify-between overflow-hidden !rounded-2xl p-5 transition-colors hover:border-accent/40"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -right-1 select-none font-mono text-[84px] leading-none text-ink opacity-[0.05] transition-opacity group-hover:opacity-[0.12]"
      >
        ↗
      </span>
      <div>
        <p className="kicker">{f.kicker}</p>
        <p className="mt-2 break-all font-mono text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-accent">
          {f.title}
        </p>
      </div>
      <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-dim">
        {f.note}
        <span aria-hidden className="ml-1 inline-block text-ink-faint">
          ↗
        </span>
      </p>
    </a>
  );
}

function GhostCard() {
  return (
    <div className="flex w-[240px] shrink-0 flex-col justify-center rounded-2xl border border-dashed border-line/60 p-5">
      <p className="serif-accent text-[1.05rem] leading-snug text-ink-dim">
        + a few smaller wins I never posted about.
      </p>
      <p className="kicker mt-3">no receipt · just memory</p>
    </div>
  );
}

/* ── rails ── */

function Rail({
  children,
  reverse,
  duration,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="receipt-rail relative">
      <div
        style={{ animationDuration: `${duration}s` }}
        className={`flex w-max items-stretch gap-4 py-2 ${
          reverse ? "rail-track-reverse" : "rail-track"
        }`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export default function ReceiptTweets() {
  const tq = Object.keys(T).map((id) => <TweetCard key={`t-${id}`} id={id} />);
  const wq = WINS.map((w) => <WinCard key={`w-${w.title}`} w={w} />);
  const rq = ROOMS.map((r) => <RoomCard key={`r-${r.org}`} r={r} />);
  const fq = FACTS.map((f) => <FactCard key={`f-${f.title}`} f={f} />);

  // weighted interleave — tweets carry the stream, a win / room / fact
  // lands between every couple of tweets so no two of a kind touch
  const pools = [tq, wq, tq, rq, tq, fq];
  const stream: React.ReactNode[] = [];
  let pi = 0;
  while (tq.length || wq.length || rq.length || fq.length) {
    const pool = pools[pi++ % pools.length];
    const card =
      pool.shift() ?? tq.shift() ?? wq.shift() ?? rq.shift() ?? fq.shift();
    if (card) stream.push(card);
  }
  const rails: React.ReactNode[][] = [[], [], []];
  stream.forEach((c, i) => rails[i % 3].push(c));
  rails[2].push(<GhostCard key="ghost" />);

  return (
    <div className="receipt-rails -mx-6 mt-2 space-y-1 sm:-mx-10">
      <Rail duration={72}>{rails[0]}</Rail>
      <Rail duration={84} reverse>
        {rails[1]}
      </Rail>
      <Rail duration={78}>{rails[2]}</Rail>
    </div>
  );
}
