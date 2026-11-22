import Link from "next/link";
import { projects, site, skills } from "@/lib/data";
import { DotName } from "./DotName";
import { Em } from "./SectionHeader";

const stack = skills.flatMap((g) => g.items.map((s) => s.name));

const metaLink = "mono link inline-flex min-h-11 items-center text-ink";

export function Hero() {
  return (
    <section id="top" className="pt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line py-2.5">
          <p className="mono text-ink-2">Full-stack developer · Bengaluru · BMSCE &rsquo;27</p>
          <div className="flex flex-wrap items-center gap-x-5">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className={metaLink}>
              GitHub&nbsp;↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={metaLink}>
              LinkedIn&nbsp;↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mono chip-open">
              <span className="status-dot" aria-hidden="true" />
              Open to SWE roles
            </p>
          </div>
        </div>

        <h1 className="sr-only">K S Phanindra</h1>
        <div className="py-7 sm:py-10 lg:py-11">
          <DotName />
        </div>

        <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <p className="display max-w-[18ch] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] text-ink">
            I build things that make everyday life <Em>easier.</Em>
          </p>
          <div className="lg:pt-2">
            <p className="max-w-[50ch] text-[15px] leading-relaxed text-pretty text-ink-2">
              A habit tracker with an AI coach, a family medical records app, and a road-safety app that detects speed bumps from
              the phone&rsquo;s GPS speed. I build them end to end, from the database to the last pixel.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">
                See projects →
              </a>
              <Link href="/resume" className="btn btn-secondary">
                Resume
              </Link>
            </div>

            {/* The three projects with their main action, so a demo is one click from the first screen. */}
            <div className="mt-8">
              <h2 className="mono text-ink-3">Selected work</h2>
              <ul className="mt-2 border-t border-line">
                {projects.map((p) => (
                  <li key={p.slug} className="flex items-baseline justify-between gap-4 border-b border-line">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex min-h-11 min-w-0 flex-col justify-center py-2.5 sm:flex-row sm:items-baseline sm:gap-3"
                    >
                      <span className="text-[15px] font-medium text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-accent">
                        {p.name}
                      </span>
                      <span className="truncate text-[14px] text-ink-2">{p.short}</span>
                    </Link>
                    {p.live ? (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="mono link inline-flex min-h-11 shrink-0 items-baseline gap-2 py-3.5">
                        <span className="live-dot self-center" aria-hidden="true" />
                        Live demo&nbsp;↗<span className="sr-only"> of {p.name} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={`/projects/${p.slug}`} className="mono link inline-flex min-h-11 shrink-0 items-baseline py-3.5">
                        Case study&nbsp;→<span className="sr-only"> of {p.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee mt-10 overflow-hidden border-t border-b border-line py-3.5 sm:mt-12">
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
