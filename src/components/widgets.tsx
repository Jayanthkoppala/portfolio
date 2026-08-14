"use client";

import { useEffect, useState } from "react";

/** IST clock that admits the truth after midnight. */
export function ClockWidget() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const ist = now
    ? new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--:--";
  const hour = now
    ? parseInt(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          hour12: false,
        }).format(now),
        10
      )
    : 12;
  const lateNight = hour >= 0 && hour < 6;

  return (
    <div className="flex h-full flex-col justify-between">
      <p className="kicker">Bengaluru · IST</p>
      <p className="font-mono text-4xl tabular-nums tracking-tight text-ink">
        {ist}
      </p>
      <p className="serif-accent text-lg" style={{ color: "var(--accent)" }}>
        {lateNight ? "still up. told you." : "most nights, still up."}
      </p>
    </div>
  );
}

/** Terminal that types the whoami. */
export function TerminalWidget() {
  const lines = [
    "$ whoami",
    "jayanth — building since 16",
    "$ ls ~/shipped",
    "boss  nohunt  vixdex  hashpit  credibly  jackdot",
    "$ uptime",
    "awake since the last deadline",
    "$ _",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 600 : 700);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-[#0d1a10] p-4 font-mono text-[0.72rem] leading-relaxed">
      <div className="mb-2 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      {lines.slice(0, shown).map((l, i) => (
        <p
          key={i}
          className={l.startsWith("$") ? "text-[#7dd88f]" : "text-[#4a9c5c]"}
          style={{ textShadow: "0 0 6px rgba(74,222,128,0.4)" }}
        >
          {l}
        </p>
      ))}
    </div>
  );
}
