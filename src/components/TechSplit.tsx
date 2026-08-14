"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

type Technology = {
  label: string;
  slug: string;
  color: string;
  mark?: string;
};

const TECHNOLOGY_ROWS: Technology[][] = [
  [
    { label: "ReactJS", slug: "react", color: "61DAFB" },
    { label: "NextJS", slug: "nextdotjs", color: "9CA39E" },
    { label: "TypeScript", slug: "typescript", color: "3178C6" },
    { label: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
    { label: "Motion", slug: "framer", color: "FFF312" },
    { label: "Sanity", slug: "sanity", color: "F03E2F" },
  ],
  [
    { label: "Contentful", slug: "contentful", color: "2478CC" },
    { label: "NodeJS", slug: "nodedotjs", color: "5FA04E" },
    { label: "ExpressJS", slug: "express", color: "9CA39E" },
    { label: "PostgreSQL", slug: "postgresql", color: "4169E1" },
    { label: "MongoDB", slug: "mongodb", color: "47A248" },
    { label: "Prisma", slug: "prisma", color: "9CA39E" },
    { label: "Zustand", slug: "zustand", color: "C09B79", mark: "Z" },
  ],
  [
    { label: "Zod", slug: "zod", color: "3E67B1" },
    { label: "pnpm", slug: "pnpm", color: "F69220" },
    { label: "Bun", slug: "bun", color: "F6E4CF" },
    { label: "Git", slug: "git", color: "F05032" },
    { label: "GitHub", slug: "github", color: "9CA39E" },
    { label: "Vercel", slug: "vercel", color: "9CA39E" },
    { label: "AWS", slug: "amazonwebservices", color: "FF9900", mark: "aws" },
    { label: "Docker", slug: "docker", color: "2496ED" },
    { label: "Expo", slug: "expo", color: "9CA39E" },
  ],
  [
    { label: "Clerk", slug: "clerk", color: "6C47FF" },
    { label: "Linux", slug: "linux", color: "FCC624" },
  ],
];

const TECHNOLOGIES = TECHNOLOGY_ROWS.flat();

function TechnologyChip({
  technology,
  index,
  reduceMotion,
}: {
  technology: Technology;
  index: number;
  reduceMotion: boolean;
}) {
  const iconUrl = `https://cdn.simpleicons.org/${technology.slug}/${technology.color}`;

  return (
    <motion.span
      role="listitem"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{
        duration: reduceMotion ? 0 : 0.38,
        delay: reduceMotion ? 0 : Math.min(index * 0.022, 0.34),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group/chip inline-flex h-9 items-center gap-2 rounded-lg border border-ink/[0.1] bg-ink/[0.025] px-3 font-mono text-[13px] tracking-[0.015em] text-ink-dim shadow-[inset_0_1px_0_var(--surface-highlight)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/[0.2] hover:bg-ink/[0.055] hover:text-ink hover:shadow-[inset_0_1px_0_var(--surface-highlight),0_8px_24px_rgba(0,0,0,0.08)] sm:text-sm"
    >
      {technology.mark ? (
        <span
          aria-hidden="true"
          className="grid h-[18px] min-w-[18px] shrink-0 place-items-center font-sans text-[9px] font-bold leading-none transition-transform duration-200 group-hover/chip:scale-105"
          style={{ color: `#${technology.color}` }}
        >
          {technology.mark}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="h-[18px] w-[18px] shrink-0 bg-contain bg-center bg-no-repeat transition-transform duration-200 group-hover/chip:scale-105"
          style={{ backgroundImage: `url(${iconUrl})` }}
        />
      )}
      {technology.label}
    </motion.span>
  );
}

export default function TechSplit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawRotation = useTransform(scrollYProgress, [0, 1], [28, 720]);
  const smoothRotation = useSpring(rawRotation, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  });

  return (
    <div
      ref={sectionRef}
      className="relative isolate mx-auto min-h-[640px] overflow-hidden pt-[165px] sm:min-h-[690px] sm:pt-[215px] lg:min-h-[720px] lg:pt-[285px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[270px] w-[270px] -translate-x-1/2 sm:h-[340px] sm:w-[340px] lg:h-[430px] lg:w-[430px]"
      >
        <motion.div
          className="h-full w-full transform-gpu"
          style={{
            rotate: shouldReduceMotion ? 28 : smoothRotation,
            willChange: shouldReduceMotion ? "auto" : "transform",
          }}
        >
          <Image
            src="/images/obsidian-knot.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 430px, (min-width: 640px) 340px, 270px"
            className="object-contain opacity-[0.8] dark:opacity-[0.68]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 14, filter: "blur(8px)" }
        }
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 text-center"
      >
        <p className="kicker !text-[0.68rem] !text-ink-dim tracking-[0.23em] drop-shadow-[0_1px_10px_var(--bg)]">
          My skillset
        </p>
        <h2 className="mt-4 text-balance text-[clamp(3.2rem,7vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-ink">
          The Magic{" "}
          <span className="serif-accent bg-[linear-gradient(105deg,#db1bc5_0%,#fc396a_52%,#ff7b3d_100%)] bg-clip-text pr-[0.06em] text-transparent">
            Behind
          </span>
        </h2>
      </motion.div>

      <div
        role="list"
        aria-label="Technologies I build with"
        className="relative z-10 mx-auto mt-9 flex max-w-[760px] flex-wrap justify-center gap-2.5 px-1 sm:mt-10 sm:gap-3 lg:hidden"
      >
        {TECHNOLOGIES.map((technology, index) => (
          <TechnologyChip
            key={technology.slug}
            technology={technology}
            index={index}
            reduceMotion={shouldReduceMotion}
          />
        ))}
      </div>

      <div
        role="list"
        aria-label="Technologies I build with"
        className="relative z-10 mx-auto mt-11 hidden flex-col items-center gap-3 lg:flex"
      >
        {TECHNOLOGY_ROWS.map((row, rowIndex) => {
          const rowOffset = TECHNOLOGY_ROWS.slice(0, rowIndex).reduce(
            (count, currentRow) => count + currentRow.length,
            0,
          );

          return (
            <div key={row[0].slug} className="flex justify-center gap-3">
              {row.map((technology, index) => (
                <TechnologyChip
                  key={technology.slug}
                  technology={technology}
                  index={rowOffset + index}
                  reduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
