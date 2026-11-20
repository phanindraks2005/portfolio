import { SectionHeader } from "./SectionHeader";
import { SkillsMap } from "./SkillsMap";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="04"
          label="Skills"
          id="skills-title"
          title="Skills"
          intro="Only what my projects actually use, mapped to the projects that use it."
        />
        <SkillsMap />
      </div>
    </section>
  );
}
