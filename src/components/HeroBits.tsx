"use client";

import { useEffect, useState } from "react";

const VERDICT = "→ verdict: advance to round two";

/** `$ boss screen` status line with typed verdict + pulsing waveform. */
export default function StatusLine() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const iv = setInterval(() => {
        setTyped(VERDICT.slice(0, ++i));
        if (i >= VERDICT.length) clearInterval(iv);
      }, 34);
    }, 1800);
    return () => clearTimeout(start);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-[0.82rem] text-ink-dim">
        <span className="text-accent">$</span> boss screen --candidate
        jayanth-koppala&nbsp;&nbsp;
        <span className="text-[#6ee7b7]">{typed}</span>
      </span>
      <span className="flex h-[20px] items-center gap-[2.5px]" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <i
            key={i}
            className="w-[2.5px] rounded-full bg-accent"
            style={{
              animation: `wv ${0.7 + ((i * 7) % 10) / 11}s ease-in-out infinite`,
              animationDelay: `${-((i * 13) % 10) / 10}s`,
            }}
          />
        ))}
      </span>
      <style jsx>{`
        i { height: 15%; }
        @keyframes wv {
          0%, 100% { height: 15%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}
