import Link from "next/link";
import { skills } from "@/lib/data";
import { DotName } from "./DotName";
import { Em } from "./SectionHeader";

const stack = skills.flatMap((g) => g.items.map((s) => s.name));

const stats = [
  { value: "3", label: "products shipped" },
  { value: "2", label: "live with demos" },
  { value: null, label: "Bengaluru, India" },
];

export function Hero() {
  return (
    <section id="top" className="pt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line py-4">
          <p className="mono text-ink-2">Full-stack developer · Bangalore · BMSCE &rsquo;27</p>
          <p className="mono chip-open">
            <span className="status-dot" aria-hidden="true" />
            Open to SWE roles
          </p>
        </div>

        <h1 className="sr-only">K S Phanindra</h1>
        <div className="py-8 sm:py-12 lg:py-14">
          <DotName />
        </div>

        <div className="grid gap-8 border-t border-line pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <p className="display max-w-[18ch] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] text-ink">
            I build things that make everyday life <Em>easier.</Em>
          </p>
          <div className="lg:pt-2">
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
              Flutter apps that spot speed bumps, web apps for family health records, habit trackers people actually use. Built end to
              end, from the database to the last pixel.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">
                See projects →
              </a>
              <Link href="/resume" className="btn btn-secondary">
                Resume
              </Link>
            </div>
          </div>
        </div>

        {/* Phones: two stats side by side, the place on its own row; wider: one row split by hairlines. */}
        <ul className="mt-10 grid grid-cols-2 border-t border-line sm:mt-14 sm:flex" aria-label="At a glance">
          {stats.map((s, i) => (
            <li
              key={s.label}
              className={`mono flex items-baseline gap-2 py-4 pr-4 text-ink-2 sm:pr-8 ${
                i === 1 ? "border-l border-line pl-4 sm:pl-8" : i === 2 ? "col-span-2 border-t border-line sm:border-t-0 sm:border-l sm:pl-8" : ""
              }`}
            >
              {s.value && <span className="text-[15px] text-ink tabular-nums">{s.value}</span>}
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="marquee overflow-hidden border-t border-b border-line py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0" aria-label={copy === 0 ? "Tech stack" : undefined} aria-hidden={copy === 1 || undefined}>
              {stack.map((s) => (
                <li key={s} className="mono shrink-0 whitespace-nowrap text-ink-2">
                  <span className="px-3">{s}</span>
                  <span className="text-ink-3" aria-hidden="true">
                    /
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
