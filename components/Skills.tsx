import { SectionHeader } from "./SectionHeader";
import { SkillsMap } from "./SkillsMap";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="05"
          label="Skills"
          id="skills-title"
          title="Skills"
          intro="What my projects use, mapped to the projects that use it. C, C++ and Java are for DSA and coursework. The same list is on my resume."
        />
        <SkillsMap />
      </div>
    </section>
  );
}
