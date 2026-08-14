"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { flushSync } from "react-dom";

import { useReducedMotionPreference } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  variant?: TransitionVariant;
  fromCenter?: boolean;
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
}

type ThemeViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ThemeTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ThemeViewTransition;
};

function polygonCollapsed(point: string, vertexCount: number) {
  return `polygon(${Array.from({ length: vertexCount }, () => point).join(", ")})`;
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  const toRadius = (radius: number) =>
    `${
      (radius /
        (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) *
      100
    }%`;

  switch (variant) {
    case "square": {
      const halfSide =
        Math.max(
          Math.max(cx, viewportWidth - cx),
          Math.max(cy, viewportHeight - cy)
        ) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ];
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end.join(", ")})`];
    }
    case "triangle": {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const vertices = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ];
      return [
        polygonCollapsed(point(cx, cy), 3),
        `polygon(${vertices.join(", ")})`,
      ];
    }
    case "diamond": {
      const radius = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - radius),
        point(cx + radius, cy),
        point(cx, cy + radius),
        point(cx - radius, cy),
      ];
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end.join(", ")})`];
    }
    case "hexagon": {
      const radius = maxRadius * Math.SQRT2;
      const vertices = Array.from({ length: 6 }, (_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI) / 3;
        return point(
          cx + radius * Math.cos(angle),
          cy + radius * Math.sin(angle)
        );
      });
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${vertices.join(", ")})`,
      ];
    }
    case "rectangle": {
      const halfWidth = Math.max(cx, viewportWidth - cx);
      const halfHeight = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy - halfHeight),
        point(cx + halfWidth, cy + halfHeight),
        point(cx - halfWidth, cy + halfHeight),
      ];
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end.join(", ")})`];
    }
    case "star": {
      const radius = maxRadius * Math.SQRT2 * 1.03;
      const star = (size: number) => {
        const vertices: string[] = [];
        for (let index = 0; index < 5; index += 1) {
          const outerAngle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
          const innerAngle = outerAngle + Math.PI / 5;
          vertices.push(
            point(
              cx + size * Math.cos(outerAngle),
              cy + size * Math.sin(outerAngle)
            ),
            point(
              cx + size * 0.42 * Math.cos(innerAngle),
              cy + size * 0.42 * Math.sin(innerAngle)
            )
          );
        }
        return `polygon(${vertices.join(", ")})`;
      };
      return [star(Math.max(2, radius * 0.025)), star(radius)];
    }
    case "circle":
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ];
  }
}

export function AnimatedThemeToggler({
  className,
  duration = 500,
  variant = "circle",
  fromCenter = false,
  theme,
  onThemeChange,
  disabled,
  ...props
}: AnimatedThemeTogglerProps) {
  const reducedMotion = useReducedMotionPreference();
  const controlled = theme !== undefined;
  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = controlled ? theme === "dark" : internalIsDark;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitioningRef = useRef(false);
  const activeAnimationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (controlled) return;

    const root = document.documentElement;
    const syncTheme = () => setInternalIsDark(root.classList.contains("dark"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [controlled]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    const root = document.documentElement;
    if (
      !button ||
      disabled ||
      transitioningRef.current ||
      root.dataset.magicuiThemeVt === "active"
    ) {
      return;
    }

    const nextTheme = isDark ? "light" : "dark";
    const applyTheme = () => {
      root.classList.remove("light", "dark");
      root.classList.add(nextTheme);
      if (controlled) {
        onThemeChange?.(nextTheme);
      } else {
        setInternalIsDark(nextTheme === "dark");
        localStorage.setItem("theme", nextTheme);
      }
    };

    const transitionDocument = document as ThemeTransitionDocument;
    if (reducedMotion || !transitionDocument.startViewTransition) {
      applyTheme();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const bounds = button.getBoundingClientRect();
    const x = fromCenter ? viewportWidth / 2 : bounds.left + bounds.width / 2;
    const y = fromCenter ? viewportHeight / 2 : bounds.top + bounds.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    );
    const clipPath = getThemeTransitionClipPaths(
      variant,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight
    );

    root.dataset.magicuiThemeVt = "active";
    root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`);
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0]);
    transitioningRef.current = true;

    const cleanup = () => {
      transitioningRef.current = false;
      activeAnimationRef.current?.cancel();
      activeAnimationRef.current = null;
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty("--magicui-theme-toggle-vt-duration");
      root.style.removeProperty("--magicui-theme-vt-clip-from");
    };

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(applyTheme);
    });
    transition.finished.finally(cleanup).catch(() => undefined);
    transition.ready
      .then(() => {
        activeAnimationRef.current = root.animate(
          { clipPath },
          {
            duration,
            easing: variant === "star" ? "linear" : "ease-in-out",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(cleanup);
  }, [
    controlled,
    disabled,
    duration,
    fromCenter,
    isDark,
    onThemeChange,
    reducedMotion,
    variant,
  ]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      disabled={disabled}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(className)}
      {...props}
    >
      <span aria-hidden className="relative block h-4 w-4">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={isDark ? "sun" : "moon"}
            className="absolute inset-0 grid place-items-center"
            initial={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            {isDark ? (
              <Sun className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Moon className="h-4 w-4" strokeWidth={1.75} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
