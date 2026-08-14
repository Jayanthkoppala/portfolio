"use client";

import { motion, useSpring } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: ReactNode;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const ENABLED_QUERY =
  "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)";

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch";
}

const DefaultCursorSVG: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 50 54"
    fill="none"
    style={{ scale: 0.5 }}
    aria-hidden="true"
  >
    <g filter="url(#smooth-cursor-shadow)">
      <path
        d="M42.6817 41.1495 27.5103 6.79925c-.7834-1.77368-3.3021-1.77367-4.1176 0L7.59814 41.1495c-.83981 1.8264.92898 3.7407 2.81436 3.0459l13.9632-5.1458a2.25 2.25 0 0 1 1.5665 0l13.8699 5.1458c1.8728.6948 3.6763-1.2195 2.8696-3.0459Z"
        fill="var(--bg)"
      />
      <path
        d="M43.7146 40.6933 28.5431 6.34306c-1.1875-2.68878-4.9659-2.6479-6.1763-.01551L6.57226 40.6778c-1.25886 2.7378 1.40012 5.6202 4.23074 4.5771l13.9632-5.1459c.2559-.0943.5337-.0934.7832-.0008l13.8699 5.1458c2.8068 1.0413 5.5061-1.8193 4.2953-4.5607Z"
        stroke="var(--ink)"
        strokeWidth={2.25825}
      />
      <circle cx="25.45" cy="7.9" r="1.25" fill="var(--accent)" />
    </g>
    <defs>
      <filter
        id="smooth-cursor-shadow"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="smoothCursorShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="smoothCursorShadow"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastPointerPosition = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const visibilityRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(ENABLED_QUERY);

    const updateEnabled = () => {
      setIsEnabled(mediaQuery.matches);
      if (!mediaQuery.matches) {
        visibilityRef.current = false;
        setIsVisible(false);
      }
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const root = document.documentElement;
    const body = document.body;
    const hadCursorClass = root.classList.contains("smooth-cursor-enabled");
    const previousBodyCursor = body.style.cursor;
    let settleTimeout: ReturnType<typeof setTimeout> | null = null;
    let rafId = 0;
    let queuedEvent: PointerEvent | null = null;

    const setVisible = (nextVisible: boolean) => {
      if (visibilityRef.current === nextVisible) return;
      visibilityRef.current = nextVisible;
      setIsVisible(nextVisible);
    };

    const hideCursor = () => setVisible(false);

    const updateVelocity = (currentPosition: Position) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x:
            (currentPosition.x - lastPointerPosition.current.x) / deltaTime,
          y:
            (currentPosition.y - lastPointerPosition.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastPointerPosition.current = currentPosition;
    };

    const updatePointer = (event: PointerEvent) => {
      if (!isTrackablePointer(event.pointerType)) return;

      const target = event.target;
      const isOverDenseData =
        target instanceof Element &&
        target.closest("[data-cursor='compact']") !== null;

      setVisible(!isOverDenseData);
      if (isOverDenseData) return;

      const currentPosition = { x: event.clientX, y: event.clientY };
      updateVelocity(currentPosition);

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      cursorX.set(currentPosition.x);
      cursorY.set(currentPosition.y);

      if (speed <= 0.1) return;

      const currentAngle =
        Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
        90;
      let angleDifference = currentAngle - previousAngle.current;

      if (angleDifference > 180) angleDifference -= 360;
      if (angleDifference < -180) angleDifference += 360;

      accumulatedRotation.current += angleDifference;
      rotation.set(accumulatedRotation.current);
      previousAngle.current = currentAngle;
      scale.set(0.95);

      if (settleTimeout !== null) clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => scale.set(1), 150);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isTrackablePointer(event.pointerType)) return;
      queuedEvent = event;
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (queuedEvent) updatePointer(queuedEvent);
        queuedEvent = null;
        rafId = 0;
      });
    };

    root.classList.add("smooth-cursor-enabled");
    body.style.cursor = "none";
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", hideCursor);
    root.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", hideCursor);
      root.removeEventListener("pointerleave", hideCursor);
      body.style.cursor = previousBodyCursor;
      if (!hadCursorClass) root.classList.remove("smooth-cursor-enabled");
      if (rafId) cancelAnimationFrame(rafId);
      if (settleTimeout !== null) clearTimeout(settleTimeout);
      queuedEvent = null;
      visibilityRef.current = false;
    };
  }, [cursorX, cursorY, isEnabled, rotation, scale]);

  if (!isEnabled) return null;

  return (
    <>
      <style>{`
        @media (any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference) {
          .smooth-cursor-enabled,
          .smooth-cursor-enabled * {
            cursor: none !important;
          }

          .smooth-cursor-enabled [data-cursor="compact"],
          .smooth-cursor-enabled [data-cursor="compact"] * {
            cursor: default !important;
          }
        }
      `}</style>
      <motion.div
        data-smooth-cursor="true"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: rotation,
          scale,
          zIndex: 100,
          pointerEvents: "none",
          willChange: "transform",
          opacity: isVisible ? 1 : 0,
        }}
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {cursor}
      </motion.div>
    </>
  );
}
