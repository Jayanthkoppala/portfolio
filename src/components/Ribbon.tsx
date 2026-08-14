"use client";

/**
 * Full-bleed diagonal ember band with a scrolling phrase loop.
 * The section-transition signature — Jay's own phrases, not decoration.
 */
export default function Ribbon({
  phrases,
  angle = -2.5,
  reverse = false,
}: {
  phrases: string[];
  angle?: number;
  reverse?: boolean;
}) {
  const row = [...phrases, ...phrases, ...phrases];
  return (
    <div className="relative -mx-4 my-8 overflow-hidden py-6" aria-hidden>
      <div
        className="bg-accent py-3"
        style={{ transform: `rotate(${angle}deg) scale(1.06)` }}
      >
        <div
          className="ribbon-track flex w-max items-center gap-8"
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
        >
          {row.map((p, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-lg uppercase tracking-wide text-bg"
              style={{ fontFamily: "var(--font-anton)" }}
            >
              {p} <span className="mx-4 opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .ribbon-track {
          animation: ribbon 28s linear infinite;
        }
        @keyframes ribbon {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
