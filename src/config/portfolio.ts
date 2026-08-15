// Shared source of truth for stable portfolio data.
// The richer, source-labeled career chapters live in ExperienceSection.tsx
// so their public evidence stays beside the exact claim it supports.

export const identity = {
  name: "Jayanth Koppala",
  heroLines: [
    "I've shipped with hackathon teams, led engineers in production, and built whole products solo.",
    "Full-stack engineer & founder. Bengaluru.",
  ],
  email: "jay@bosshq.in",
  // Add the real scheduling URL here when it is ready. The navigation keeps
  // an email fallback so the call action is never a dead end.
  bookingUrl: null as string | null,
  socials: [
    { label: "X", href: "https://x.com/JayBosshq" },
    { label: "GitHub", href: "https://github.com/Jayanthkoppala" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jayanth-koppala-71a8091b9/",
    },
    { label: "Instagram", href: "https://www.instagram.com/jayanth_137/" },
  ],
};

export const about: string[] = [
  "The first thing anyone paid me for was marketing. ₹500, three months, I was 16. I freelanced after that and the money got real. Then I noticed I was getting better at earning and not at building. So I stopped.",
  "At 17 I left home for a college on the other side of the country, in a state where I didn't speak the language. I picked it for that reason. Nothing there was handled for me. I had to talk to strangers to get anything done.",
  "College happened around the building, not the other way around. Somewhere in there I interned, worked full-time, ran a business of my own, won hackathons, started companies, all stacked on top of classes. I've slept through exams I should have taken and events I wanted to attend because I coded till sunrise. I've been broke with a cracked mac screen, still shipping.",
  "When I go quiet, it's not rest. It's cooking season.",
  "The pattern, honestly: I put myself somewhere I don't belong and let it change me. Comfort is the thing that's always made me worse. Right now that somewhere is Bengaluru. Most nights, still up, building.",
];

export const projects = [
  {
    name: "BOSS!",
    problem:
      "A recruiter opens one role and gets 242 applications, most in the first hour.",
    shipped:
      "Screens all of them, talks to the ones worth talking to, and hands back a top 5–10 with reasons in 48 hours. Reads your Naukri pile, runs on WhatsApp. Built end to end by one person.",
    href: "https://bosshq.in",
    live: true,
    year: "2026",
  },
  {
    name: "NoHunt",
    problem:
      "Job seekers burn 11 hours a week on applications that mostly go nowhere.",
    shipped:
      "One resume upload, then it finds roles, tailors, applies, and tracks. The candidate side of the same problem BOSS now attacks from the other end.",
    href: "https://nohunt.ai",
    live: true,
    year: "2025–26",
  },
  {
    name: "VixDex",
    problem:
      "You can't trade volatility on-chain the way TradFi trades the VIX.",
    shipped:
      "A Uniswap V4 hook that prices volatility with no LPs and no oracles. It took the Uniswap Foundation prize at the Hook Incubator. Built with Abdul Haq; I owned the trading interface end to end.",
    href: "https://vixdex.vercel.app",
    live: true,
    year: "2025",
  },
  {
    name: "The Hash Pit",
    problem: "Crypto price charts are boring to watch.",
    shipped:
      "NFT fighters bound to real coins battle in a 3D arena driven by live price feeds. Lose the death match and your fighter burns.",
    href: "https://github.com/Jayanthkoppala/The_Hash_Pit",
    live: false,
    year: "2025",
  },
  {
    name: "Credibly",
    problem: "Course certificates are screenshots anyone can fake.",
    shipped:
      "Turns YouTube videos into courses with a fresh quiz per learner and a certificate you can check on-chain. Built at the BASED INDIA hackathon.",
    href: "https://credibly-teal.vercel.app",
    live: true,
    year: "2024",
  },
  {
    name: "Jackdot",
    problem: "On-chain lotteries still ask you to trust the operator's dice.",
    shipped:
      "A Polkadot lottery that runs inside Telegram with provably fair draws. Picked up a bounty at the Polkadot Hacker House.",
    href: "https://jackdot-jayanth137s-projects.vercel.app",
    live: true,
    year: "2024",
  },
];

export const wins = [
  {
    line: "2nd place, TON Hackathon Bootcamp. $1,500. TonMate.",
    href: "https://x.com/JayBosshq/status/1850824819966669220",
    source: "the tweet",
  },
  {
    line: "Uniswap Foundation prize, Hook Incubator. VixDex.",
    href: "https://x.com/JayBosshq/status/1908253253730500716",
    source: "Atrium's announcement",
  },
  {
    line: "$1,500, Recall + Gaia trading-agent competition. It became a job offer.",
    href: "https://x.com/JayBosshq/status/1953448415242723438",
    source: "the tweet",
  },
  {
    line: "$300 bounty, Polkadot Hacker House. Jackdot.",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
    source: "the tweet",
  },
  {
    line: "₹15 lakh MSME Idea Hackathon grant. Souldem (LEDGESYS).",
    href: "https://www.cuchd.in/uic/computing/achievements.php",
    source: "Chandigarh University record",
  },
];

export const winsCloser = "Plus a few smaller ones I never posted about.";

export const thinking = [
  {
    title: "Auto-apply broke inbound hiring.",
    quote:
      "Volume was never the problem. Signal is. They don't need 242 of them per role. They need the 3 who are real.",
    href: "https://www.linkedin.com/in/jayanth-koppala-71a8091b9/recent-activity/all/",
    where: "LinkedIn",
  },
  {
    title: "Voice AI at Indian scale.",
    quote:
      "Latency, quality, cost. You rarely get all three, so the real work is deciding which one you give up.",
    href: "https://x.com/JayBosshq",
    where: "X",
  },
];

export const marqueeItems = [
  "TypeScript",
  "Next.js",
  "Node.js",
  "Solidity",
  "Foundry",
  "Python",
  "LLM agents",
  "Voice AI",
  "WhatsApp APIs",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Uniswap V4 hooks",
  "Telegram Mini Apps",
];

export const contactCloser =
  "Building something in hiring? Mail me. I reply to everything.";
