import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import { LocalTime } from "./LocalTime";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const card = "glow-card rounded-[24px] p-6 sm:p-8";

const interests = ["Gym", "Travel", "Sports", "Music", "Chess"];

const now = ["Preparing for campus placements", "Practising DSA every day", "Writing a research paper on RoadSense"];

export function About() {
  return (
    <section id="about" data-glow="#4f7cff" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <RevealItem>
            <SplitHeading text="About" className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink" />
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 items-center gap-10 sm:mt-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          <RevealItem className="relative mx-auto w-full max-w-[340px] md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(closest-side,rgb(79_124_255/0.35),transparent)]"
            />
            <Image
              src="/me.jpg"
              alt="K S Phanindra"
              width={360}
              height={451}
              sizes="340px"
              className="relative h-auto w-full rounded-[24px] border border-line-strong shadow-[0_30px_80px_-30px_rgb(79_124_255/0.45)]"
            />
          </RevealItem>

          <RevealItem>
            <p className="display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-[1.25] font-medium text-ink">
              I build complete products, from the database schema and its security policies to the interface and the AI inside it.
            </p>
            <div className="mt-6 grid max-w-[60ch] gap-4 text-[16px] leading-relaxed text-ink-2">
              <p>
                MediVault was my first full-stack project. I built it in my third semester because I kept losing my prescriptions and had no
                record of my medical history. I wanted one place for all of it, one that could also answer my questions.
              </p>
              <p>I built Stride because I wanted one place to track all my habits.</p>
              <p>Outside code, I&rsquo;m at the gym, travelling, playing sports, listening to music or learning a new skill.</p>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Outside code">
              {interests.map((i) => (
                <li key={i} className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[14px] text-ink-2">
                  {i}
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          <RevealItem className={`${card} md:col-span-2`}>
            <MapPin size={20} className="text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-[13px] font-medium text-muted">Based in</h3>
            <p className="mt-1.5 text-[17px] font-medium text-ink">Bengaluru, India</p>
            <p className="mt-1 text-[15px] text-ink-2">
              <LocalTime />
            </p>
          </RevealItem>

          <RevealItem className={`${card} md:col-span-4`}>
            <div id="now" className="flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="display text-[20px] font-semibold text-ink">What I&rsquo;m doing now</h3>
                <p className="text-[13px] text-muted">
                  Last updated: <time dateTime="2026-11">November 2026</time>
                </p>
              </div>
              <ul className="mt-5 grid gap-3 text-[16px] text-ink-2">
                {now.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <ArrowRight size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="mt-6 inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-3 text-[14px] text-ink-2">
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
