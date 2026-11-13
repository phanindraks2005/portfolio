
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { stats, type Stat } from "@/lib/verified";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const fmt = new Intl.NumberFormat("en-IN");

export function Verified() {
  return (
    <section id="verified" aria-labelledby="verified-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SplitHeading
            id="verified-title"
            text="How I tested it"
            className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink"
          />
          <Reveal>
            <RevealItem>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
                These numbers come from the checks I ran on my own apps: Lighthouse, clicking every control, security tests and a scan of
                every repo&rsquo;s history.
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <RevealItem key={s.label} className="min-w-0">
              <StatCard stat={s} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function StatCard({ stat: s }: { stat: Stat }) {
  return (
    <article className="glow-card flex h-full flex-col rounded-[22px] p-6 sm:p-7" style={{ ["--glow" as string]: s.color }}>
      <p className="display text-[clamp(2.5rem,5vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-ink tabular-nums">
        {s.prefix && <span className="text-muted">{s.prefix}</span>}
        {fmt.format(s.value)}
        {s.suffix && <span style={{ color: s.color }}>{s.suffix}</span>}
      </p>
      <h3 className="mt-4 text-[16px] leading-snug font-semibold text-ink">{s.label}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{s.how}</p>
      <Link
        href={s.link.href}
        className="mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-3 text-[14px] font-medium text-accent-text transition-colors hover:text-ink"
      >
        {s.link.text}
        <ArrowUpRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}
