"use client";

import { useEffect, useState } from "react";

/** Analog IST watch — SVG, real time, metallic hands, ember second hand. */
export default function Watch({ size = 230 }: { size?: number }) {
  const [t, setT] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      setT({ h: ist.getHours(), m: ist.getMinutes(), s: ist.getSeconds() });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const hDeg = t ? ((t.h % 12) + t.m / 60) * 30 : 300;
  const mDeg = t ? (t.m + t.s / 60) * 6 : 120;
  const sDeg = t ? t.s * 6 : 0;
  const c = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Current time in Bengaluru"
    >
      <defs>
        <radialGradient id="dial" cx="35%" cy="25%">
          <stop offset="0%" stopColor="#1e2320" />
          <stop offset="70%" stopColor="#0e1210" />
          <stop offset="100%" stopColor="#090b0a" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#414a44" />
          <stop offset="45%" stopColor="#131816" />
          <stop offset="100%" stopColor="#333b36" />
        </linearGradient>
      </defs>
      {/* case + dial */}
      <circle cx={c} cy={c} r={c - 2} fill="url(#rim)" />
      <circle cx={c} cy={c} r={c - 8} fill="url(#dial)" />
      {/* minute ticks */}
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i * 6 * Math.PI) / 180;
        const major = i % 5 === 0;
        const r1 = c - (major ? 24 : 18);
        const r2 = c - 12;
        return (
          <line
            key={i}
            x1={c + r1 * Math.sin(a)}
            y1={c - r1 * Math.cos(a)}
            x2={c + r2 * Math.sin(a)}
            y2={c - r2 * Math.cos(a)}
            stroke={major ? "#d5dcd6" : "#414a44"}
            strokeWidth={major ? 3 : 1}
            strokeLinecap="round"
          />
        );
      })}
      {/* hands */}
      <g style={{ transform: `rotate(${hDeg}deg)`, transformOrigin: "center" }}>
        <line x1={c} y1={c + 10} x2={c} y2={c - size * 0.24} stroke="#e7ede8" strokeWidth={6} strokeLinecap="round" />
      </g>
      <g style={{ transform: `rotate(${mDeg}deg)`, transformOrigin: "center" }}>
        <line x1={c} y1={c + 14} x2={c} y2={c - size * 0.36} stroke="#e7ede8" strokeWidth={4} strokeLinecap="round" />
      </g>
      <g
        style={{
          transform: `rotate(${sDeg}deg)`,
          transformOrigin: "center",
          transition: t && t.s === 0 ? "none" : "transform 0.2s cubic-bezier(0.4, 2.1, 0.6, 1)",
        }}
      >
        <line x1={c} y1={c + 18} x2={c} y2={c - size * 0.4} stroke="#10b981" strokeWidth={2} strokeLinecap="round" />
      </g>
      <circle cx={c} cy={c} r={5} fill="#10b981" />
      <circle cx={c} cy={c} r={2} fill="#090b0a" />
    </svg>
  );
}
