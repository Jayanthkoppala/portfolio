"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

const LINES = ["JAYANTH", "KOPPALA"] as const;

export default function PressureName() {
  const letters = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const resetPressure = useCallback(() => {
    letters.current.forEach((letter) => {
      letter?.style.setProperty("--pressure", "0");
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || event.pointerType !== "mouse") return;

      const pointerX = event.clientX;
      const pointerY = event.clientY;

      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const measuredLetters = letters.current.flatMap((letter) =>
          letter ? [{ letter, rect: letter.getBoundingClientRect() }] : []
        );

        measuredLetters.forEach(({ letter, rect }) => {
          const dx = pointerX - (rect.left + rect.width / 2);
          const dy = pointerY - (rect.top + rect.height / 2);
          const reach = Math.max(150, rect.height * 1.45);
          const influence = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
          letter.style.setProperty("--pressure", influence.toFixed(3));
        });
      });
    },
    [reduceMotion]
  );

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    []
  );

  return (
    <h1 id="hero-title" className="poster-name">
      <span className="sr-only">Jayanth Koppala</span>
      <span
        aria-hidden="true"
        className="poster-name-visual"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPressure}
      >
        {LINES.map((line, lineIndex) => (
          <span className="poster-name-line" key={line}>
            {Array.from(line).map((letter, letterIndex) => {
              const flatIndex = lineIndex * LINES[0].length + letterIndex;
              const isNickname = lineIndex === 0 && letterIndex < 3;

              return (
                <span
                  className={`poster-name-letter${isNickname ? " is-jay" : ""}`}
                  key={`${line}-${letterIndex}`}
                  ref={(node) => {
                    letters.current[flatIndex] = node;
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}
