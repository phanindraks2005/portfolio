import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const card = "glow-card rounded-[24px] p-6 sm:p-8";

const interests = ["Gym", "Travel", "Sports", "Music", "Chess"];

const now = ["Preparing for campus placements", "Practising DSA every day", "Writing a research paper on RoadSense"];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
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
              className="absolute -inset-x-2 -inset-y-6 rounded-[40px] sm:-inset-6 bg-[radial-gradient(closest-side,rgb(79_124_255/0.35),transparent)]"
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
            <div className="grid max-w-[60ch] gap-5 text-[17px] leading-relaxed text-ink-2">
              <p>
                I&rsquo;m a Computer Science student at BMS College of Engineering, Bengaluru. I started building because keeping track of
                things in my own life was hard. I kept losing prescriptions and had no record of my medical history, so in my third semester
                I built MediVault, my first full-stack project. Later I wanted one place to track all my habits, so I built Stride.
              </p>
              <p className="text-ink">When I start something, I don&rsquo;t stop until I&rsquo;m happy with how it works.</p>
              <p>I&rsquo;m looking for a team where I can stay focused on solving real problems and building things people use.</p>
            </div>
            <p className="mt-8 text-[14px] text-muted">Outside code</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Outside code">
              {interests.map((i) => (
                <li key={i} className="rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[14px] text-ink-2">
                  {i}
                </li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>

        {/* The id sits outside the reveal, so a jump to #now measures where the card ends up, not where it starts sliding from. */}
        <div id="now" className="mt-12">
          <Reveal>
            <RevealItem className={card}>
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
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
