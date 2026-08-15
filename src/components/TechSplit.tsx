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
  neutral?: boolean;
};

const TECHNOLOGY_ROWS: Technology[][] = [
  // full-stack
  [
    { label: "TypeScript", slug: "typescript", color: "3178C6" },
    { label: "JavaScript", slug: "javascript", color: "F7DF1E" },
    { label: "ReactJS", slug: "react", color: "61DAFB" },
    { label: "NextJS", slug: "nextdotjs", color: "9CA39E", neutral: true },
    { label: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
    { label: "Motion", slug: "framer", color: "FFF312" },
  ],
  // backend + data
  [
    { label: "NodeJS", slug: "nodedotjs", color: "5FA04E" },
    { label: "ExpressJS", slug: "express", color: "9CA39E", neutral: true },
    { label: "Bun", slug: "bun", color: "F6E4CF", neutral: true },
    { label: "Python", slug: "python", color: "3776AB" },
    { label: "MongoDB", slug: "mongodb", color: "47A248" },
    { label: "PostgreSQL", slug: "postgresql", color: "4169E1" },
    { label: "Elasticsearch", slug: "elasticsearch", color: "00BFB3" },
    { label: "Qdrant", slug: "qdrant", color: "DC244C" },
  ],
  // AI + realtime
  [
    { label: "Gemini", slug: "googlegemini", color: "8E75B2" },
    { label: "Claude", slug: "claude", color: "D97757" },
    { label: "OpenRouter", slug: "openrouter", color: "9CA39E", neutral: true },
    { label: "LiveKit", slug: "livekit", color: "1FD5F9" },
    { label: "ElevenLabs", slug: "elevenlabs", color: "9CA39E", neutral: true },
    { label: "Kafka", slug: "apachekafka", color: "9CA39E", neutral: true },
    { label: "InfluxDB", slug: "influxdb", color: "22ADF6" },
  ],
  // devops
  [
    { label: "AWS", slug: "amazonwebservices", color: "FF9900", mark: "aws" },
    { label: "Docker", slug: "docker", color: "2496ED" },
    { label: "Git", slug: "git", color: "F05032" },
    { label: "GitHub", slug: "github", color: "9CA39E", neutral: true },
    { label: "GH Actions", slug: "githubactions", color: "2088FF" },
    { label: "Vercel", slug: "vercel", color: "9CA39E", neutral: true },
    { label: "Cloudflare", slug: "cloudflare", color: "F38020" },
    { label: "Linux", slug: "linux", color: "FCC624" },
    { label: "pnpm", slug: "pnpm", color: "F69220" },
  ],
  // blockchain
  [
    { label: "Solidity", slug: "solidity", color: "9CA39E", neutral: true },
    { label: "Ethereum", slug: "ethereum", color: "9CA39E", neutral: true },
    { label: "Foundry", slug: "foundry", color: "F6851B", mark: "⚒" },
    { label: "Solana", slug: "solana", color: "9945FF" },
    { label: "Polkadot", slug: "polkadot", color: "E6007A" },
    { label: "TON", slug: "ton", color: "0098EA" },
    { label: "Uniswap", slug: "uniswap", color: "FF007A", mark: "🦄" },
    { label: "IPFS", slug: "ipfs", color: "65C2CB" },
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
  const iconPath = `/icons/tech/${technology.slug}.svg`;

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
      className="group/chip inline-flex h-8 items-center gap-2 rounded-lg border border-ink/[0.1] bg-ink/[0.025] px-2.5 font-mono text-[12px] tracking-[0.015em] text-ink-dim shadow-[inset_0_1px_0_var(--surface-highlight)] transition-[border-color,background-color,color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ink/[0.2] hover:bg-ink/[0.055] hover:text-ink hover:shadow-[inset_0_1px_0_var(--surface-highlight),0_8px_24px_rgba(0,0,0,0.08)] sm:h-9 sm:px-3 sm:text-sm"
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
          className="h-[17px] w-[17px] shrink-0 transition-transform duration-200 group-hover/chip:scale-105 sm:h-[18px] sm:w-[18px]"
          style={{
            backgroundColor: technology.neutral
              ? "var(--ink-dim)"
              : `#${technology.color}`,
            WebkitMaskImage: `url(${iconPath})`,
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskImage: `url(${iconPath})`,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
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
      className="relative isolate mx-auto min-h-[660px] overflow-hidden pt-[185px] sm:min-h-[710px] sm:pt-[235px] lg:min-h-[740px] lg:pt-[305px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[270px] w-[270px] -translate-x-1/2 sm:h-[340px] sm:w-[340px] lg:h-[430px] lg:w-[430px]"
      >
        <motion.div
          className="relative h-full w-full transform-gpu"
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
            className="scale-x-[1.08] scale-y-[0.92] object-contain opacity-[0.8] dark:opacity-[0.68]"
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
        <p className="kicker !text-[0.68rem] !text-white tracking-[0.23em] mix-blend-difference">
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
    </div>
  );
}
