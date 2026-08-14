"use client";

import { useState } from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import { thinking } from "@/config/portfolio";

const SLUGS = [
  "typescript",
  "nextdotjs",
  "react",
  "nodedotjs",
  "python",
  "solidity",
  "tailwindcss",
  "mongodb",
  "postgresql",
  "amazonwebservices",
  "docker",
  "git",
  "github",
  "vercel",
  "cloudflare",
  "anthropic",
  "ethereum",
  "solana",
  "telegram",
  "whatsapp",
  "linux",
  "framer",
  "figma",
  "bun",
  "express",
];

const TABS = [
  {
    key: "Agents",
    head: "Systems that act",
    body: "I build agents that do the work, not chatbots that describe it. Screening calls, trading decisions, application flows — running without me in the loop.",
  },
  {
    key: "Voice",
    head: "Latency, quality, cost",
    body: "You rarely get all three. The real work is deciding which one to give up. I build voice agents that hold at volume without the lag or the bill.",
  },
  {
    key: "Contracts",
    head: "Code that holds money",
    body: "Audited leverage contracts with real user funds behind them. On-chain work teaches what production means — there is no hotfix.",
  },
  {
    key: "Product",
    head: "End to end, alone if I have to",
    body: "Backend, frontend, the voice on the call, the deploy. One person can carry a whole product if the scope is honest.",
  },
];

/** Tech as a revolving globe of real logos; philosophy + takes beside it. */
export default function TechSplit() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const images = SLUGS.map(
    (s) => `https://cdn.simpleicons.org/${s}/9aa49d`
  );

  return (
    <div className="grid items-center gap-10 sm:grid-cols-2 [&>*]:min-w-0">
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 m-auto h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(16,185,129,0.12)" }}
        />
        <IconCloud images={images} />
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActive(i)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                i === active
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-line text-ink-dim hover:border-ink-faint hover:text-ink"
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>
        <p className="mt-5 text-lg font-semibold text-ink">{tab.head}</p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-dim">
          {tab.body}
        </p>

        <div className="mt-8 space-y-3 border-t border-line pt-6">
          {thinking.map((t) => (
            <a
              key={t.title}
              href={t.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="serif-accent text-base leading-snug text-ink-dim">
                &ldquo;{t.quote}&rdquo;{" "}
                <span className="kicker transition-colors group-hover:!text-accent">
                  {t.where} ↗
                </span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
