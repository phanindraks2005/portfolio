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
    </section>
  );
}
