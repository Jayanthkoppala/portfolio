"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react";

import { Dock, DockIcon } from "@/components/ui/dock";
import { identity } from "@/config/portfolio";
import { useReducedMotionPreference } from "@/lib/use-reduced-motion";

type ChannelId = "GitHub" | "LinkedIn" | "Email" | "X" | "Instagram";

type Channel = {
  id: ChannelId;
  label: string;
  detail: string;
  href: string;
  external: boolean;
};

const BRAND_PATHS: Record<Exclude<ChannelId, "Email">, string> = {
  X: "M18.9 1.2h3.7l-8.1 9.3L24 23.2h-7.5l-5.9-7.7-6.7 7.7H.2l8.7-9.9L-.1 1.2h7.7l5.3 7 6-7Zm-1.3 19.8h2L6.5 3.3H4.3l13.3 17.7Z",
  GitHub:
    "M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5Z",
  LinkedIn:
    "M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.5V9h3.6v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 1 .8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-1-.8-1.7-1.8-1.7Z",
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1ZM12 0C8.7 0 8.3 0 7.1.1 5.8.2 5 .4 4.3.6c-.7.3-1.4.7-2 1.3s-1 1.3-1.3 2C.7 4.6.5 5.5.4 6.7.3 8 .3 8.4.3 11.7s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.7.7 1.4 1.3 2s1.3 1 2 1.3c.7.3 1.5.5 2.8.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.2-.1 2.1-.3 2.8-.6.7-.3 1.4-.7 2-1.3s1-1.3 1.3-2c.3-.7.5-1.5.6-2.8.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.2-.3-2.1-.6-2.8a5.5 5.5 0 0 0-1.3-2 5.5 5.5 0 0 0-2-1.3c-.7-.3-1.5-.5-2.8-.6C15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.8-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0Z",
};

function BrandIcon({ name }: { name: Exclude<ChannelId, "Email"> }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-[18px] fill-current">
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}

export default function ContactEnd() {
  const reducedMotion = useReducedMotionPreference();
  const [activeId, setActiveId] = useState<ChannelId>("Email");
  const [copied, setCopied] = useState(false);
  const mailSubject = encodeURIComponent("Saw your portfolio");
  const mailHref = `mailto:${identity.email}?subject=${mailSubject}`;

  const channels = useMemo<Channel[]>(() => {
    const social = Object.fromEntries(
      identity.socials.map((item) => [item.label, item.href])
    );

    return [
      {
        id: "GitHub",
        label: "GitHub",
        detail: "@Jayanthkoppala",
        href: social.GitHub,
        external: true,
      },
      {
        id: "LinkedIn",
        label: "LinkedIn",
        detail: "Jayanth Koppala",
        href: social.LinkedIn,
        external: true,
      },
      {
        id: "Email",
        label: "Email Jay",
        detail: identity.email,
        href: mailHref,
        external: false,
      },
      {
        id: "X",
        label: "X",
        detail: "@JayBosshq",
        href: social.X,
        external: true,
      },
      {
        id: "Instagram",
        label: "Instagram",
        detail: "@jayanth_137",
        href: social.Instagram,
        external: true,
      },
    ];
  }, [mailHref]);

  const activeChannel =
    channels.find((channel) => channel.id === activeId) ?? channels[2];

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
    } catch {
      window.location.href = mailHref;
    }
  };

  const enter = (delay = 0) => ({
    initial: reducedMotion
      ? false
      : { opacity: 0, y: 10, filter: "blur(4px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.5 as const },
    transition: {
      duration: reducedMotion ? 0 : 0.42,
      delay: reducedMotion ? 0 : delay,
      ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
    },
  });

  return (
    <div aria-labelledby="contact-title">
      <h2 className="sr-only" id="contact-title">
        Contact Jayanth Koppala
      </h2>

      <motion.div
        {...enter()}
        className="flex items-center justify-between gap-4 border-b border-line pb-4"
      >
        <p className="kicker !text-[0.62rem] !text-ink-dim">
          Open channel<span className="hidden sm:inline"> · 07</span>
        </p>
        <p className="flex items-center gap-2 text-right text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-dim">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Building BOSS!<span className="hidden sm:inline"> · inbox always open</span>
        </p>
      </motion.div>

      <div className="grid items-center gap-5 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.42fr)] lg:gap-12">
        <motion.div
          {...enter(0.07)}
          className="relative flex min-h-24 items-center justify-center"
          onMouseLeave={() => setActiveId("Email")}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line"
          />
          <Dock
            iconSize={52}
            iconMagnification={reducedMotion ? 52 : 70}
            iconDistance={110}
            disableMagnification={reducedMotion}
            className="!mt-0 !h-[76px] !gap-1.5 !rounded-[28px] !border-0 !bg-bg !px-2.5 !py-2 !backdrop-blur-none sm:!gap-3 sm:!px-4"
          >
            {channels.map((channel) => {
              const isEmail = channel.id === "Email";
              const isActive = channel.id === activeId;

              return (
                <DockIcon key={channel.id} className="!p-0">
                  <motion.a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    aria-label={
                      channel.external
                        ? `Open ${channel.label} in a new tab`
                        : `Email Jayanth at ${identity.email}`
                    }
                    onMouseEnter={() => setActiveId(channel.id)}
                    onFocus={() => setActiveId(channel.id)}
                    whileTap={{ scale: 0.96 }}
                    className={`group relative flex cursor-pointer items-center justify-center rounded-full ring-1 transition-[background-color,color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 ${
                      isEmail
                        ? "size-[52px] bg-ink text-bg ring-ink shadow-[0_12px_30px_-16px_rgba(0,0,0,0.65)]"
                        : `size-11 bg-bg-raised text-ink-dim ring-line shadow-[inset_0_1px_0_var(--surface-highlight)] hover:-translate-y-0.5 hover:bg-ink hover:text-bg ${
                            isActive ? "bg-ink text-bg" : ""
                          }`
                    }`}
                  >
                    {isEmail ? (
                      <Mail aria-hidden size={20} strokeWidth={1.8} />
                    ) : (
                      <BrandIcon name={channel.id as Exclude<ChannelId, "Email">} />
                    )}
                    {isActive ? (
                      <motion.span
                        aria-hidden
                        layoutId="contact-signal"
                        className="absolute -bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_var(--bg)]"
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 32 }
                        }
                      />
                    ) : null}
                  </motion.a>
                </DockIcon>
              );
            })}
          </Dock>
        </motion.div>

        <motion.div
          {...enter(0.13)}
          className="flex min-h-[76px] items-center justify-between gap-4 border-l-0 border-line lg:border-l lg:pl-8"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.a
              key={activeChannel.id}
              href={activeChannel.href}
              target={activeChannel.external ? "_blank" : undefined}
              rel={activeChannel.external ? "noreferrer" : undefined}
              aria-label={
                activeChannel.external
                  ? `Open ${activeChannel.label} in a new tab`
                  : `Email Jayanth at ${identity.email}`
              }
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: -6, scale: 0.98, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: 5, scale: 0.98, filter: "blur(4px)" }
              }
              transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
              className="group/detail min-w-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
            >
              <p className="text-[0.61rem] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                {activeChannel.label}
              </p>
              <span className="mt-1 flex items-center gap-2 text-lg font-semibold tracking-[-0.025em] text-ink sm:text-xl">
                <span className="truncate">{activeChannel.detail}</span>
                <ArrowUpRight
                  aria-hidden
                  className="size-4 shrink-0 text-ink-faint transition-transform duration-200 group-hover/detail:-translate-y-0.5 group-hover/detail:translate-x-0.5"
                />
              </span>
            </motion.a>
          </AnimatePresence>

          {activeChannel.id === "Email" ? (
            <motion.button
              type="button"
              aria-label={copied ? "Email copied" : `Copy ${identity.email}`}
              onClick={copyEmail}
              whileTap={{ scale: 0.96 }}
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-bg-raised text-ink-dim ring-1 ring-line transition-colors duration-200 hover:bg-ink hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, scale: 0.25, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
                  transition={{ duration: reducedMotion ? 0 : 0.3, bounce: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {copied ? (
                    <Check aria-hidden size={17} className="text-accent" />
                  ) : (
                    <Copy aria-hidden size={16} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          ) : null}
        </motion.div>
      </div>

      <motion.div
        {...enter(0.19)}
        className="flex items-center justify-between gap-4 border-t border-line pt-4"
      >
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
          © {new Date().getFullYear()} Jayanth Koppala · Bengaluru, India
        </p>
        <a
          href="#home"
          aria-label="Back to the top"
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-dim ring-1 ring-line transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
        >
          <ArrowUp aria-hidden size={16} />
        </a>
      </motion.div>
    </div>
  );
}
