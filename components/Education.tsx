"use client";

import { m } from "framer-motion";
import { education } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SplitHeading text="Education" className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink" />

        <div className="relative pl-8 sm:pl-10">
          {/* The rail draws itself downward as the timeline scrolls in. */}
          <m.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-accent via-line-strong to-transparent sm:left-[11px]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <Reveal as="ol" className="grid gap-10">
            {education.map((e, i) => (
              <RevealItem as="li" key={e.school} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-8 grid size-[15px] place-items-center rounded-full border sm:-left-10 sm:size-[23px] ${
                    i === 0 ? "border-accent bg-accent-soft" : "border-line-strong bg-surface"
                  }`}
                >
                  <span className={`size-[5px] rounded-full sm:size-[7px] ${i === 0 ? "bg-accent" : "bg-muted"}`} />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[18px] font-semibold text-ink">{e.school}</h3>
                  {e.years && <span className="text-[14px] tabular-nums text-muted">{e.years}</span>}
                </div>
                <p className="mt-1 text-[15px] text-accent-text">{e.detail}</p>
                {e.coursework && (
                  <>
                    <p className="mt-4 text-[13px] font-medium text-muted">Key coursework</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {e.coursework.map((c) => (
                        <li key={c} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 text-[13px] text-ink-2">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
