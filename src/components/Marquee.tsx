"use client";

/** Seamless logo/skill strip. Items rendered twice for the loop; edge fade via mask. */
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-6"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max items-center gap-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="kicker whitespace-nowrap !text-[0.78rem]"
            style={{ color: "var(--ink-dim)" }}
          >
            {item}
            <span className="ml-10 select-none" style={{ color: "var(--accent)" }}>
              ·
            </span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .marquee-track {
          animation: scroll 36s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
