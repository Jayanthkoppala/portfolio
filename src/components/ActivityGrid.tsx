import contributions from "@/data/contributions.json";

/**
 * GitHub-style contribution wall from a build-time snapshot of the real
 * GraphQL contribution calendar (private contributions included in counts).
 */
export default function ActivityGrid() {
  const days = contributions.days as { date: string; count: number }[];
  // Chunk into weeks of 7, oldest first (data arrives day-ordered).
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const max = Math.max(...days.map((d) => d.count), 1);
  const level = (c: number) =>
    c === 0 ? 0 : c <= max * 0.15 ? 1 : c <= max * 0.4 ? 2 : c <= max * 0.7 ? 3 : 4;
  const colors = [
    "rgba(255,255,255,0.05)",
    "rgba(16,185,129,0.25)",
    "rgba(16,185,129,0.45)",
    "rgba(16,185,129,0.7)",
    "#10b981",
  ];

  const privatePct = Math.round(
    (contributions.restricted / Math.max(contributions.total, 1)) * 100
  );

  return (
    <div className="rounded-xl border border-line bg-bg-card p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-ink-dim">
          <span className="text-xl font-bold text-ink tabular-nums">
            {contributions.total.toLocaleString()}
          </span>{" "}
          contributions in the last year
        </p>
        <p className="kicker">
          {privatePct}% in private repos — that&apos;s where the current work
          lives
        </p>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex w-max gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d) => (
                <div
                  key={d.date}
                  title={`${d.date}: ${d.count}`}
                  className="h-[10px] w-[10px] rounded-[2px]"
                  style={{ background: colors[level(d.count)] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
