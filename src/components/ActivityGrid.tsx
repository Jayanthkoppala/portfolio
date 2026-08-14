"use client";

import { ActivityCalendar } from "react-activity-calendar";
import NumberFlow from "@number-flow/react";
import contributions from "@/data/contributions.json";

/**
 * Real contribution wall from the committed GraphQL snapshot (private counts
 * included). colorScheme is forced dark to avoid the light-flash-on-prerender
 * gotcha in react-activity-calendar's useColorScheme hook.
 */
export default function ActivityGrid() {
  const max = Math.max(...contributions.days.map((d) => d.count), 1);
  const data = contributions.days.map((d) => ({
    date: d.date,
    count: d.count,
    level:
      d.count === 0
        ? 0
        : d.count <= max * 0.15
          ? 1
          : d.count <= max * 0.4
            ? 2
            : d.count <= max * 0.7
              ? 3
              : 4,
  }));

  const privatePct = Math.round(
    (contributions.restricted / Math.max(contributions.total, 1)) * 100
  );

  return (
    <div className="glass !rounded-3xl p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-ink-dim">
          <span className="text-2xl font-bold tabular-nums text-ink">
            <NumberFlow value={contributions.total} />
          </span>{" "}
          contributions in the last year
        </p>
        <p className="kicker">
          {privatePct}% in private repos — that&apos;s where the current work
          lives
        </p>
      </div>
      <div className="overflow-x-auto pb-1 [&_svg]:mx-auto">
        <ActivityCalendar
          data={data}
          colorScheme="dark"
          theme={{ dark: ["rgba(255,255,255,0.05)", "#10b981"] }}
          blockSize={11}
          blockMargin={3}
          blockRadius={2}
          fontSize={11}
          showColorLegend={false}
          showTotalCount={false}
          weekStart={1}
          labels={{ legend: { less: "less", more: "more" } }}
        />
      </div>
    </div>
  );
}
