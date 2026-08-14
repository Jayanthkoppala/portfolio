"use client";

import { ReactLenis } from "lenis/react";

/** Site-wide smooth scroll. Native-scroll based — no hijacking. */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.1 }}>
      {children}
    </ReactLenis>
  );
}
