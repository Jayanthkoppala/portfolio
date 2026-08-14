/**
 * WHAT I'VE BUILT — full-width showcase rows, alternating sides.
 * Real product screenshots in a framed browser window, Anton title,
 * problem in serif, receipt chips where a claim has a public artifact.
 * BOSS is excluded — the flagship section owns it.
 */
import Image from "next/image";
import { projects } from "@/config/portfolio";

const SHOTS: Record<string, string> = {
  NoHunt: "/shots/proj-nohunt.png",
  VixDex: "/shots/proj-vixdex.png",
  "The Hash Pit": "/shots/proj-hashpit.png",
  Credibly: "/shots/proj-credibly.png",
  Jackdot: "/shots/proj-jackdot.png",
};

const CHIPS: Record<string, { label: string; href: string }> = {
  VixDex: {
    label: "uniswap foundation prize ↗",
    href: "https://x.com/JayBosshq/status/1908253253730500716",
  },
  Jackdot: {
    label: "polkadot bounty ↗",
    href: "https://x.com/JayBosshq/status/1864403099470975119",
  },
};

export default function WorkShowcase() {
  const rows = projects.filter((p) => p.name !== "BOSS!");
  return (
    <div className="space-y-24">
      {rows.map((p, i) => {
        const flip = i % 2 === 1;
        const chip = CHIPS[p.name];
        const shot = SHOTS[p.name];
        return (
          <article
            key={p.name}
            className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {/* framed screenshot */}
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className={`glass block overflow-hidden !rounded-2xl transition-all duration-300 hover:border-accent/40 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${
                flip ? "lg:order-2" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 truncate rounded-md bg-black/20 px-3 py-0.5 font-mono text-[0.65rem] text-ink-faint">
                  {p.href.replace("https://", "")}
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                {shot ? (
                  <Image
                    src={shot}
                    alt={`${p.name} — screenshot`}
                    fill
                    sizes="(min-width: 1024px) 44vw, 92vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="grid h-full place-items-center font-mono text-sm text-ink-faint">
                    {p.name}
                  </div>
                )}
              </div>
            </a>

            {/* copy */}
            <div className={flip ? "lg:order-1" : ""}>
              <p className="kicker">
                {p.year}
                {p.live && <span className="ml-2 text-good">● live</span>}
              </p>
              <h3
                className="mt-2 text-4xl uppercase tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-anton)" }}
              >
                {p.name}
              </h3>
              <p className="serif-accent mt-4 text-2xl leading-snug text-ink">
                {p.problem}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-dim">
                {p.shipped}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {p.href.replace("https://", "").split("/")[0]} ↗
                </a>
                {chip && (
                  <a
                    href={chip.href}
                    target="_blank"
                    rel="noreferrer"
                    className="kicker rounded-full border border-line px-3 py-1.5 transition-colors hover:border-accent hover:!text-accent"
                  >
                    {chip.label}
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
