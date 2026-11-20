import type { ReactNode } from "react";
import { Reveal, RevealItem } from "./motion";

/**
 * The header every home section shares: a mono eyebrow with its running index ("01 / PROJECTS"),
 * a large heading, an optional intro beside it, and a hairline under the row.
 */
export function SectionHeader({
  index,
  label,
  title,
  id,
  intro,
}: {
  index: string;
  label: string;
  title: ReactNode;
  id?: string;
  intro?: ReactNode;
}) {
  return (
    <Reveal className="grid gap-x-12 gap-y-5 border-b border-line pb-8 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
      <RevealItem>
        <p className="mono text-ink-3">
          {index} / {label}
        </p>
        <h2 id={id} className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] text-ink">
          {title}
        </h2>
      </RevealItem>
      {intro && (
        <RevealItem>
          <p className="max-w-[52ch] text-[16px] leading-relaxed text-ink-2 lg:justify-self-end">{intro}</p>
        </RevealItem>
      )}
    </Reveal>
  );
}

/** One word of a heading set in Instrument Serif italic. */
export function Em({ children }: { children: ReactNode }) {
  return <em className="serif text-[1.08em] leading-none">{children}</em>;
}
