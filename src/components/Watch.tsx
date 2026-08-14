"use client";

import { useEffect, useState } from "react";

/**
 * Analog IST watch, v2 — reference-grade dial: metallic bezel, fine minute
 * track, rotated 24-hour numeral chapter ring, applied polished indices,
 * tapered dauphine hands, emerald seconds with counterweight.
 */
export default function Watch({ size = 380 }: { size?: number }) {
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

  const hDeg = t ? ((t.h % 12) + t.m / 60) * 30 : 305;
  const mDeg = t ? (t.m + t.s / 60) * 6 : 130;
  const sDeg = t ? t.s * 6 : 0;
  const c = size / 2;
  const numerals = ["24", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Current time in Bengaluru"
    >
      <defs>
        <radialGradient id="w-dial" cx="38%" cy="28%">
          <stop offset="0%" stopColor="#181b19" />
          <stop offset="65%" stopColor="#0c0e0d" />
          <stop offset="100%" stopColor="#070808" />
        </radialGradient>
        <linearGradient id="w-bezel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#585e59" />
          <stop offset="30%" stopColor="#15181628" />
          <stop offset="50%" stopColor="#0d0f0e" />
          <stop offset="80%" stopColor="#2c322e" />
          <stop offset="100%" stopColor="#494f4a" />
        </linearGradient>
        <linearGradient id="w-index" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f2f5f1" />
          <stop offset="50%" stopColor="#b9c0ba" />
          <stop offset="100%" stopColor="#e8ece7" />
        </linearGradient>
        <linearGradient id="w-hand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#eef1ec" />
          <stop offset="50%" stopColor="#c9cfc9" />
          <stop offset="100%" stopColor="#f5f7f3" />
        </linearGradient>
      </defs>

      {/* case */}
      <circle cx={c} cy={c} r={c - 1} fill="url(#w-bezel)" />
      <circle cx={c} cy={c} r={c - 7} fill="#060707" />
      <circle cx={c} cy={c} r={c - 9} fill="url(#w-dial)" />

      {/* fine minute/second track — 120 ticks */}
      {Array.from({ length: 120 }).map((_, i) => {
        const a = (i * 3 * Math.PI) / 180;
        const major = i % 10 === 0;
        const r1 = c - (major ? 22 : 17);
        const r2 = c - 11;
        return (
          <line
            key={`t${i}`}
            x1={c + r1 * Math.sin(a)}
            y1={c - r1 * Math.cos(a)}
            x2={c + r2 * Math.sin(a)}
            y2={c - r2 * Math.cos(a)}
            stroke={major ? "#d7dcd6" : "#3c423e"}
            strokeWidth={major ? 2.4 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* 24-hour numeral chapter ring, rotated tangentially */}
      {numerals.map((n, i) => {
        const deg = i * 30;
        const r = c - 34;
        return (
          <text
            key={n}
            x={c}
            y={c - r}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#8b948d"
            fontSize={size * 0.042}
            fontFamily="ui-monospace, Menlo, monospace"
            transform={`rotate(${deg} ${c} ${c})`}
          >
            {n}
          </text>
        );
      })}

      {/* applied polished indices */}
      {Array.from({ length: 12 }).map((_, i) => {
        if (i === 0) return null; // 12 o'clock gets twin bars
        const deg = i * 30;
        return (
          <g key={`i${i}`} transform={`rotate(${deg} ${c} ${c})`}>
            <rect
              x={c - 3.4}
              y={c - (c - 48)}
              width={6.8}
              height={size * 0.1}
              rx={2}
              fill="url(#w-index)"
            />
          </g>
        );
      })}
      <rect x={c - 9} y={48} width={7} height={size * 0.1} rx={2} fill="url(#w-index)" />
      <rect x={c + 2} y={48} width={7} height={size * 0.1} rx={2} fill="url(#w-index)" />

      {/* hands — tapered dauphine */}
      <g transform={`rotate(${hDeg} ${c} ${c})`}>
        <polygon
          points={`${c - 5},${c + 16} ${c - 2},${c - size * 0.24} ${c + 2},${c - size * 0.24} ${c + 5},${c + 16}`}
          fill="url(#w-hand)"
        />
      </g>
      <g transform={`rotate(${mDeg} ${c} ${c})`}>
        <polygon
          points={`${c - 4},${c + 20} ${c - 1.6},${c - size * 0.37} ${c + 1.6},${c - size * 0.37} ${c + 4},${c + 20}`}
          fill="url(#w-hand)"
        />
      </g>
      <g
        style={{
          transform: `rotate(${sDeg}deg)`,
          transformOrigin: "center",
          transition:
            t && t.s === 0 ? "none" : "transform 0.2s cubic-bezier(0.4, 2.1, 0.6, 1)",
        }}
      >
        <line
          x1={c}
          y1={c + 30}
          x2={c}
          y2={c - size * 0.41}
          stroke="#10b981"
          strokeWidth={1.8}
          strokeLinecap="round"
        />
        <circle cx={c} cy={c + 30} r={5} fill="#10b981" />
      </g>

      {/* center stack */}
      <circle cx={c} cy={c} r={8} fill="#dfe4de" />
      <circle cx={c} cy={c} r={4.5} fill="#10b981" />
      <circle cx={c} cy={c} r={1.8} fill="#060707" />
    </svg>
  );
}
