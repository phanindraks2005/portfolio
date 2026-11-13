"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
            text="Built, then verified"
            className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink"
          />
          <Reveal>
            <RevealItem>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
                Shipping is half the job. These numbers come from the audits I ran on my own apps: Lighthouse, a click-through of every
                control, security checks and a scan of every repo&rsquo;s history.
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
        <CountUp value={s.value} />
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

/**
 * Renders the final number on the server (and with reduced motion), so it's always readable.
 * When it hydrates off screen it counts up from 0 the first time it scrolls into view.
 */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // already on screen: leave the real number
    let frame = 0;
    // Off screen at hydration: start from 0 and count up on first sight.
    el.textContent = "0";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / 1400);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = fmt.format(Math.round(value * eased));
          if (k < 1) frame = requestAnimationFrame(tick);
          else setShown(value);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{fmt.format(shown)}</span>;
}
