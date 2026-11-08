import { Medal, Trophy, Users } from "lucide-react";
import { achievements } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const icons = { trophy: Trophy, medal: Medal, users: Users };

export function Achievements() {
  return (
    <section id="achievements" data-glow="#4f7cff" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SplitHeading text="Achievements" className="display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1] font-semibold text-ink" />
        <Reveal as="ul" className="mt-8 grid gap-3 sm:grid-cols-3">
          {achievements.map((a) => {
            const Icon = icons[a.icon];
            return (
              <RevealItem as="li" key={a.title} className="glow-card flex items-start gap-4 rounded-[20px] p-5 sm:p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[16px] leading-snug font-medium text-ink">{a.title}</p>
                  {"detail" in a && <p className="mt-1 text-[14px] text-ink-2">{a.detail}</p>}
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
