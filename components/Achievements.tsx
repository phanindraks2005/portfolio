import { achievements } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SectionHeader } from "./SectionHeader";

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="achievements-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader index="08" label="Achievements" id="achievements-title" title="Achievements" />
        <Reveal as="ol" className="grid">
          {achievements.map((a, i) => (
            <RevealItem as="li" key={a.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-8">
              <span className="mono pt-1 text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="display text-[20px] leading-snug text-ink">{a.title}</p>
                {"detail" in a && <p className="mt-1.5 text-[15px] text-ink-2">{a.detail}</p>}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
