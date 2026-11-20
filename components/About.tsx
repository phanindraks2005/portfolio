import Image from "next/image";
import { Reveal, RevealItem } from "./motion";
import { SectionHeader } from "./SectionHeader";

const interests = ["Gym", "Travel", "Sports", "Music", "Chess"];

const now = ["Preparing for campus placements", "Practising DSA every day", "Writing a research paper on RoadSense"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader index="03" label="About" id="about-title" title="About" />

        <Reveal className="grid grid-cols-1 gap-10 pt-10 sm:pt-14 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
          <RevealItem className="w-full max-w-[300px]">
            <p className="mono mb-4 text-ink-3">Who I am</p>
            <Image
              src="/me.jpg"
              alt="K S Phanindra"
              width={360}
              height={451}
              sizes="300px"
              className="h-auto w-full rounded-[6px] border border-line"
            />
          </RevealItem>

          <RevealItem>
            <div className="grid max-w-[62ch] gap-5 text-[17px] leading-[1.6] text-ink-2">
              <p>
                I&rsquo;m a Computer Science student at BMS College of Engineering, Bengaluru. I started building because keeping track of
                things in my own life was hard. I kept losing prescriptions and had no record of my medical history, so in my third semester
                I built MediVault, my first full-stack project. Later I wanted one place to track all my habits, so I built Stride.
              </p>
              <p className="text-ink">When I start something, I don&rsquo;t stop until I&rsquo;m happy with how it works.</p>
              <p>I&rsquo;m looking for a team where I can stay focused on solving real problems and building things people use.</p>
            </div>
            <p className="mono mt-10 text-ink-3">Outside code</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Outside code">
              {interests.map((i) => (
                <li key={i} className="mono tag">
                  {i}
                </li>
              ))}
            </ul>

            <div id="now" className="mt-12 max-w-[62ch]">
              <div className="surface-card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="display text-[20px] text-ink">What I&rsquo;m doing now</h3>
                  <p className="mono text-ink-3">
                    Last updated: <time dateTime="2026-11">November 2026</time>
                  </p>
                </div>
                <ul className="mt-5 grid border-t border-line text-[16px] text-ink-2">
                  {now.map((n, i) => (
                    <li key={n} className="flex items-baseline gap-4 border-b border-line py-3">
                      <span className="mono text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mono chip-open mt-6">
                  <span className="status-dot" aria-hidden="true" />
                  Open to SWE internships &amp; full-time roles · 2027
                </p>
              </div>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
