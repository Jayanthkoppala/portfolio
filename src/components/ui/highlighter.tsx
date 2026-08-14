"use client";

import { useLayoutEffect, useRef } from "react";
import { useInView } from "motion/react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket";

interface HighlighterProps {
  children: React.ReactNode;
  action?: AnnotationAction;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const isInView = useInView(elementRef, { once: true, margin: "-10%" });
  const shouldShow = !isView || isInView;

  useLayoutEffect(() => {
    const element = elementRef.current;
    let annotation: RoughAnnotation | null = null;
    let resizeObserver: ResizeObserver | null = null;

    if (shouldShow && element) {
      annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
        animate: !reducedMotion,
      });
      annotation.show();

      resizeObserver = new ResizeObserver(() => {
        annotation?.hide();
        annotation?.show();
      });
      resizeObserver.observe(element);
    }

    return () => {
      annotation?.remove();
      resizeObserver?.disconnect();
    };
  }, [
    action,
    animationDuration,
    color,
    iterations,
    multiline,
    padding,
    reducedMotion,
    shouldShow,
    strokeWidth,
  ]);

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  );
}
