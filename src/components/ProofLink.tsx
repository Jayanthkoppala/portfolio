/**
 * Inline claim link: accent weight in prose, underline only on hover,
 * screen-reader-safe external arrow pinned to a sans face so no display
 * font can drop the glyph.
 */
export default function ProofLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-accent no-underline decoration-1 decoration-accent/40 underline-offset-[5px] hover:underline"
    >
      {children}
      <span
        aria-hidden="true"
        className="ml-[0.125em] inline-block font-sans text-[0.8em] no-underline"
      >
        ↗
      </span>
    </a>
  );
}
