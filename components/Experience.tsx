import { experience } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="06"
          label="Experience"
          id="experience-title"
          title="Experience"
          intro={<>I&rsquo;ve also helped run events at BMSCE, from leading a volunteer team to handling the technical setup.</>}
        />

        <Reveal as="ol" className="grid">
          {experience.map((e) => (
            <RevealItem as="li" key={e.org} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <p className="mono pt-1 text-ink-3 tabular-nums">{e.year}</p>
              <div>
                <h3 className="display text-[20px] leading-snug text-ink">{e.title}</h3>
                <p className="mono mt-2 text-ink-2">{e.org}</p>
                <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">{e.text}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
