import { MapPin, Target } from "lucide-react";
import { LocalTime } from "./LocalTime";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const card = "glow-card rounded-[24px] p-6 sm:p-8";

export function About() {
  return (
    <section id="about" data-glow="#4f7cff" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <RevealItem>
            <SplitHeading text="About" className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink" />
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-6">
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
            <MapPin size={20} className="text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-[13px] font-medium text-muted">Based in</h3>
            <p className="mt-1.5 text-[17px] font-medium text-ink">Bengaluru, India</p>
            <p className="mt-1 text-[15px] text-ink-2">
              <LocalTime />
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
                <span className="pulse" aria-hidden="true">
                  <span />
                </span>
                Open to SWE internships &amp; full-time roles · 2027
              </p>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
