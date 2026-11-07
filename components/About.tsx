import { GraduationCap, MapPin, Target } from "lucide-react";
import { skills } from "@/lib/data";
import { LocalTime } from "./LocalTime";
import { BrandIcon } from "./icons";
import { Reveal, RevealItem } from "./motion";

const card = "glow-card rounded-[24px] p-6 sm:p-8";

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <RevealItem>
            <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink">About</h2>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-6">
          <RevealItem className={`${card} md:col-span-4 md:row-span-2`}>
            <p className="display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.25] font-medium text-ink">
              I like owning a feature from end to end: the table and its row-level security, the API route, the interface, and the AI call
              in the middle.
            </p>
            <p className="mt-6 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">
              That&rsquo;s how Stride and MediVault were built. I audit my own apps the way a reviewer would, and fix what I find: a
              cross-account file read, a copilot that claimed actions it hadn&rsquo;t done, history silently cut off at 1,000 rows. Each web
              app also ships a demo with no sign-up, because the people looking at my work should be able to click everything.
            </p>
          </RevealItem>

          <RevealItem className={`${card} md:col-span-2`}>
            <GraduationCap size={20} className="text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-[13px] font-medium text-muted">Education</h3>
            <p className="mt-1.5 text-[17px] font-medium leading-snug text-ink">BMS College of Engineering</p>
            <p className="mt-1 text-[15px] text-ink-2">B.Tech, Computer Science · 2023–2027</p>
          </RevealItem>

          <RevealItem className={`${card} md:col-span-2`}>
            <MapPin size={20} className="text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-[13px] font-medium text-muted">Based in</h3>
            <p className="mt-1.5 text-[17px] font-medium text-ink">Bengaluru, India</p>
            <p className="mt-1 text-[15px] text-ink-2">
              <LocalTime /> IST
            </p>
          </RevealItem>

          <RevealItem className={`${card} md:col-span-6`}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <Target size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-[13px] font-medium text-muted">Currently</h3>
                  <p className="mt-1.5 text-[17px] font-medium text-ink">Practising DSA and preparing for campus placements.</p>
                </div>
              </div>
              <p className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-3 text-[14px] text-ink-2 sm:self-auto">
                <span className="pulse" aria-hidden="true" />
                Open to SWE internships
              </p>
            </div>
          </RevealItem>

          <RevealItem className={`${card} md:col-span-6`}>
            <h3 className="display text-[22px] font-semibold text-ink">Skills</h3>
            <p className="mt-2 text-[15px] text-ink-2">Only what my projects actually use.</p>
            <dl className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-5">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt className="text-[13px] font-medium text-muted">{g.group}</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 text-[13px] text-ink"
                      >
                        <BrandIcon name={s} size={14} />
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        </Reveal>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const names = skills.flatMap((g) => g.items).filter((n) => n !== "REST APIs");
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
    <div className="marquee mt-16 overflow-hidden py-2 sm:mt-20">
      <ul className="marquee-track" aria-label="Technologies I use">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
