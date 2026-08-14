"use client";

/**
 * Custom cursor: emerald dot + trailing ring. Ring swells over interactive
 * elements. Desktop fine-pointers only; native cursor stays on inputs.
 */
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100, y = -100, rx = -100, ry = -100;
    let hot = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      hot = !!t.closest("a, button, [role='button'], .cursor-grab, input, textarea");
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${hot ? 1.7 : 1})`;
      ring.style.borderColor = hot ? "rgba(16,185,129,0.9)" : "rgba(233,238,234,0.35)";
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 rounded-full bg-accent lg:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 rounded-full border transition-[border-color] duration-200 lg:block"
        style={{ borderColor: "rgba(233,238,234,0.35)" }}
      />
    </>
  );
}
