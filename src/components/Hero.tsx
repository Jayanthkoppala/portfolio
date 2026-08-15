"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import PressureName from "@/components/PressureName";
import { identity } from "@/config/portfolio";

const Dither = dynamic(() => import("@/components/Dither"), { ssr: false });
const subscribeToHydration = () => () => undefined;

const reveal = (delay: number, reduceMotion: boolean | null) => ({
  initial: reduceMotion ? false : { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: reduceMotion
    ? { duration: 0 }
    : { duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] as const },
});

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const { resolvedTheme } = useTheme();
  const lightMode = mounted && resolvedTheme === "light";

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="poster-hero relative min-h-[max(100svh,42rem)] overflow-hidden"
    >
      {mounted ? (
        <div
          aria-hidden
          className={`poster-atmosphere poster-dither absolute ${
            lightMode ? "poster-dither-light" : "poster-dither-dark"
          }`}
        >
          <Dither
            waveSpeed={0.05}
            waveFrequency={3}
            waveAmplitude={0.3}
            waveColor={
              lightMode ? [0.68, 0.68, 0.68] : [0, 0.690196, 0.462745]
            }
            colorNum={4}
            pixelSize={2}
            disableAnimation={Boolean(reduceMotion)}
            enableMouseInteraction={!reduceMotion}
            mouseRadius={0.3}
          />
        </div>
      ) : null}
      <div aria-hidden className="poster-handoff pointer-events-none absolute inset-x-0 bottom-0" />

      <motion.div
        {...reveal(0.04, reduceMotion)}
        className="poster-topline absolute inset-x-0 top-0 z-10"
      >
        <span>Bengaluru / India</span>
        <span aria-hidden>Portfolio / 2026</span>
        <span>Full-stack engineer / Founder</span>
      </motion.div>

      <div className="poster-inner relative z-10 mx-auto min-h-[max(100svh,42rem)] max-w-[1600px]">
        <motion.div
          {...reveal(0.12, reduceMotion)}
          className="poster-name-stage relative"
        >
          <PressureName />
        </motion.div>

        <div className="poster-footer">
          <motion.div
            {...reveal(0.22, reduceMotion)}
            className="poster-statement-wrap"
          >
            <p className="poster-statement">
              I build the whole product,
              <span>end to end.</span>
            </p>
            <a
              href="https://bosshq.in"
              target="_blank"
              rel="noreferrer"
              className="poster-now group"
            >
              <span aria-hidden className="poster-now-dot" />
              Now / building BOSS!
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.7}
              />
            </a>
          </motion.div>

          <motion.nav
            {...reveal(0.3, reduceMotion)}
            aria-label="Hero shortcuts"
            className="poster-links"
          >
            <a href="#desk" className="poster-link group">
              <span className="poster-link-index">01</span>
              <span>Work</span>
              <ArrowDownRight aria-hidden className="poster-link-arrow" />
            </a>
            <a href="#story" className="poster-link group">
              <span className="poster-link-index">02</span>
              <span>Story</span>
              <ArrowDownRight aria-hidden className="poster-link-arrow" />
            </a>
            <a href={`mailto:${identity.email}`} className="poster-link group">
              <span className="poster-link-index">03</span>
              <span>Email</span>
              <ArrowUpRight aria-hidden className="poster-link-arrow" />
            </a>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
