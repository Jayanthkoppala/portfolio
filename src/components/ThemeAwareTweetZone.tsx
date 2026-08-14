"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribeToHydration = () => () => undefined;

export default function ThemeAwareTweetZone({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { resolvedTheme } = useTheme();

  return (
    <div
      data-theme={mounted && resolvedTheme === "light" ? "light" : "dark"}
      className="tweet-zone"
    >
      {children}
    </div>
  );
}
