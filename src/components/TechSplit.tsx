"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const SLUGS = [
  "typescript", "nextdotjs", "react", "nodedotjs", "python", "solidity",
  "tailwindcss", "mongodb", "postgresql", "googlecloud", "docker",
  "git", "github", "vercel", "cloudflare", "anthropic", "ethereum",
  "solana", "telegram", "whatsapp", "linux", "framer", "figma", "bun",
  "express",
];

/** The revolving tech globe — drag to spin. */
export default function TechSplit() {
  const images = SLUGS.map((s) => `https://cdn.simpleicons.org/${s}/9aa49d`);
  return (
    <div className="relative flex items-center justify-center py-4">
      <div
        aria-hidden
        className="absolute inset-0 m-auto h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(16,185,129,0.12)" }}
      />
      <IconCloud images={images} />
      <p className="kicker absolute bottom-0">drag it — every logo is something I ship with</p>
    </div>
  );
}
