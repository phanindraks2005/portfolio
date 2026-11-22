import Link from "next/link";
import { stats, type Stat } from "@/lib/verified";
import { Reveal, RevealItem } from "./motion";
import { Em, SectionHeader } from "./SectionHeader";

const fmt = new Intl.NumberFormat("en-IN");

export function Verified() {
  return (
    <section id="verified" aria-labelledby="verified-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="03"
          label="How I tested it"
          id="verified-title"
          title={
            <>
              How I <Em>tested</Em> it
            </>
          }
          intro={
            <>
              These numbers come from the checks I ran on my own apps: Lighthouse, clicking every control, security tests and a scan of every
              repo&rsquo;s history.
            </>
          }
        />

        {/* Hairlines between cells: the grid's 1px gaps show the line colour behind them. */}
        <Reveal className="mt-10 grid grid-cols-1 gap-px overflow-hidden border-y border-line bg-line sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <RevealItem key={s.label} className="min-w-0 bg-bg">
              <StatCell stat={s} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({ stat: s }: { stat: Stat }) {
  return (
    <article className="flex h-full flex-col py-8 sm:px-7">
      <p className="display text-[clamp(2.5rem,4vw,3rem)] leading-none tracking-[-0.03em] text-ink tabular-nums">
        {s.prefix && <span className="text-ink-3">{s.prefix}</span>}
        {fmt.format(s.value)}
        {s.suffix && <span>{s.suffix}</span>}
      </p>
      <h3 className="mono mt-4 leading-relaxed text-ink">{s.label}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{s.how}</p>
      <Link href={s.link.href} className="mono link mt-auto inline-flex min-h-11 items-center self-start pt-4">
        {s.link.text} →
      </Link>
    </article>
  );
}
