import { projects } from "@/lib/data";
import { stories } from "@/lib/stories";
import { ProjectStory } from "./ProjectStory";
import { SectionHeader } from "./SectionHeader";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-20 pb-12 sm:pt-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="01"
          label="Projects"
          id="projects-title"
          title="Projects"
          intro="Three projects I built. The recordings are from the live demos of the two web apps. The demos need no account, so you can try everything yourself."
        />

        <div className="grid grid-cols-1 gap-20 pt-12 sm:pt-16 lg:gap-24">
          {projects.map((p, i) => (
            <ProjectStory key={p.slug} project={p} steps={stories[p.slug]} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
