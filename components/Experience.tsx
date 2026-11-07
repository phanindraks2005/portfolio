import { experience } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

export function Experience() {
  return (
    <section id="experience" data-glow="#4f7cff" className="cv py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <RevealItem>
            <SplitHeading text="Experience" className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink" />
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-ink-2">
              Outside the code: running events at BMSCE, from leading a volunteer team to the technical setup.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal as="ol" className="relative grid gap-3">
          {experience.map((e) => (
            <RevealItem as="li" key={e.org} className="glow-card relative rounded-[20px] p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[17px] font-semibold text-ink">{e.title}</h3>
                <span className="text-[14px] tabular-nums text-muted">{e.year}</span>
              </div>
              <p className="mt-1 text-[15px] text-accent">{e.org}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{e.text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
