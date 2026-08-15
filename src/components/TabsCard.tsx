"use client";

import { useState } from "react";
import { thinking } from "@/config/portfolio";

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
    body: "Audited leverage contracts with real user funds behind them. On-chain work teaches you what production actually means — there is no hotfix.",
  },
  {
    key: "Product",
    head: "End to end, alone if I have to",
    body: "Backend, frontend, the voice on the call, the deploy. One person can carry a whole product if the scope is honest.",
  },
];

/** Philosophy card with working tabs — each swaps one blunt line. */
export default function TabsCard() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  return (
    <div className="glass flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <p className="kicker">how I build</p>
        <p className="kicker !text-accent">philosophy</p>
      </div>
      <h3 className="mt-3 text-2xl font-bold leading-none tracking-tight">
        Products
        <br />
        <span className="serif-accent text-ink-dim">that hold up.</span>
      </h3>
      <div className="mt-4 flex flex-wrap gap-2">
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
      <div className="mt-4">
        <p className="text-sm font-semibold text-ink">{tab.head}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">{tab.body}</p>
      </div>
      <div className="mt-4 space-y-3 border-t border-line pt-4">
        {thinking.map((t) => (
          <a key={t.title} href={t.href} target="_blank" rel="noreferrer" className="group block">
            <p className="text-sm font-semibold">{t.title}</p>
            <p className="serif-accent text-base leading-snug text-ink-dim">
              &ldquo;{t.quote}&rdquo;{" "}
              <span className="kicker transition-colors group-hover:!text-accent">{t.where} ↗</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
