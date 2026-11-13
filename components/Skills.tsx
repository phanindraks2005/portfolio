import { skills } from "@/lib/data";
import { BrandIcon } from "./icons";
import { Reveal, RevealItem } from "./motion";
import { SkillsMap } from "./SkillsMap";
import { SplitHeading } from "./SplitHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <RevealItem>
            <SplitHeading text="Skills" className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink" />
          </RevealItem>
          <RevealItem>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
              Only what my projects actually use, mapped to the projects that use it.
            </p>
          </RevealItem>
        </Reveal>
        <SkillsMap />
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const names = skills.flatMap((g) => g.items.map((s) => s.name)).filter((n) => n !== "REST APIs" && n !== "Recharts");
  const row = (dupe: boolean) =>
    names.map((n) => (
      <li
        key={`${n}-${dupe}`}
        data-dupe={dupe || undefined}
        aria-hidden={dupe || undefined}
        className="flex shrink-0 items-center gap-2.5 px-6 text-[15px] text-ink-2"
      >
        <BrandIcon name={n} size={20} mono />
        {n}
      </li>
    ));
  return (
    <div className="marquee mt-16 overflow-hidden py-2 sm:mt-20" data-loop="marquee">
      <ul className="marquee-track" aria-label="Technologies I use">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
