import { projects } from "@/lib/data";
import { stories } from "@/lib/stories";
import { Reveal, RevealItem } from "./motion";
import { ProjectStory } from "./ProjectStory";
import { SplitHeading } from "./SplitHeading";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative pt-16 pb-12 sm:pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SplitHeading
            id="projects-title"
            text="Projects"
            className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink"
          />
          <Reveal>
            <RevealItem>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
                Three products I designed, built and shipped. The recordings come from the two web apps&rsquo; live demos, which
                need no account, so you can click through everything yourself.
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-24 sm:mt-16 lg:gap-28">
          {projects.map((p, i) => (
            <ProjectStory key={p.slug} project={p} steps={stories[p.slug]} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
