import { education } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SectionHeader } from "./SectionHeader";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader index="07" label="Education" id="education-title" title="Education" />

        <Reveal as="ol" className="grid">
          {education.map((e) => (
            <RevealItem as="li" key={e.school} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <p className="mono pt-1 text-ink-3 tabular-nums">{e.years ?? ""}</p>
              <div>
                <h3 className="display text-[20px] leading-snug text-ink">{e.school}</h3>
                <p className="mt-1.5 text-[15px] text-ink-2">{e.detail}</p>
                {e.coursework && (
                  <>
                    <p className="mono mt-5 text-ink-3">Key coursework</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {e.coursework.map((c) => (
                        <li key={c} className="mono tag">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
