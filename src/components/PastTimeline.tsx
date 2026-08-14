"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * BEFORE — compact beam timeline. A scroll-driven emerald spine lights up
 * past roles newest-first. One outcome line each; receipts travel as chips.
 */
const PAST = [
  {
    role: "Founding Engineer",
    org: "Xtheo",
    period: "aug 2025 — mar 2026",
    line: "AI Web3/DeFi platform, zero to production. Audited leverage contracts holding user funds; led a team of 3.",
    chip: {
      label: "the competition that got me hired ↗",
      href: "https://x.com/JayBosshq/status/1953448415242723438",
    },
  },
  {
    role: "Founder",
    org: "NoHunt",
    period: "nov 2025 — may 2026",
    line: "AI job-application copilot — the candidate side of the same problem BOSS attacks from the recruiter side.",
  },
  {
    role: "Co-Founder",
    org: "LEDGESYS · Souldem",
    period: "feb 2024 — jan 2025",
    line: "On-chain exam credentials. ₹15L MSME grant, incubated at ITNT, Anna University.",
    chip: {
      label: "incorporation record ↗",
      href: "https://tracxn.com/d/legal-entities/india/ledgesys-software-private-limited/__fqiPlCYIzq7GSQ0teygyeLP3MgCfmkhePuaoGAce3h4",
    },
  },
  {
    role: "CTO",
    org: "Imigrom Mediatech",
    period: "mar — jul 2023",
    line: "₹5L revenue, 5+ clients; ran tech, design, sales and marketing at once.",
  },
  {
    role: "Full Stack Developer",
    org: "Stabel → Securr",
    period: "dec 2022 — apr 2023",
    line: "Landing page that pulled 2,000 users in 30 days; shipped the bug-bounty platform front and back.",
  },
  {
    role: "Community",
    org: "TPG · IEEE · Aleo",
    period: "2023 — 2024",
    line: "Technical Director, The Phoenix Guild Chandigarh. IEEE CIS Webmaster. Speaker, Aleo zkMeetup.",
  },
];

export default function PastTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 55%"],
  });
  const beam = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
      <p className="kicker mb-8">before — newest first</p>
      {/* spine */}
      <div className="absolute left-2 top-0 h-full w-px bg-line sm:left-3" />
      <motion.div
        className="absolute left-2 top-0 w-px sm:left-3"
        style={{
          height: beam,
          background:
            "linear-gradient(to bottom, #10b981, rgba(16,185,129,0.25))",
          boxShadow: "0 0 12px rgba(16,185,129,0.5)",
        }}
      />
      <div className="space-y-10">
        {PAST.map((e) => (
          <div key={`${e.role}-${e.org}`} className="relative">
            <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-bg sm:-left-[2.4rem]" />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <p className="font-semibold text-ink">
                {e.role} <span className="text-accent">· {e.org}</span>
              </p>
              <p className="kicker">{e.period}</p>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-dim">
              {e.line}
            </p>
            {e.chip && (
              <a
                href={e.chip.href}
                target="_blank"
                rel="noreferrer"
                className="kicker mt-2 inline-block rounded-full border border-line px-3 py-1 transition-colors hover:border-accent hover:!text-accent"
              >
                {e.chip.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
