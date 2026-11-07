import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/lib/data";
import { Laptop, Phone } from "./Devices";
import { BrandIcon, GitHubIcon } from "./icons";
import { Reveal, RevealItem } from "./motion";
import { RoadSenseMap, SpeedTrace } from "./RoadSenseArt";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <RevealItem>
            <h2 className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink">Projects</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
              Three products I designed, built and shipped on my own. The two web apps have a demo that needs no account, so you can click
              through everything.
            </p>
          </RevealItem>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, flip }: { project: Project; flip: boolean }) {
  return (
    <Reveal>
      <RevealItem>
        <article
          id={p.slug}
          className={`project glow-card group scroll-mt-24 overflow-hidden rounded-[28px] ${flip ? "flip" : ""}`}
          style={{ ["--c" as string]: p.color }}
        >
          <div className="stage relative overflow-hidden px-6 pt-10 pb-8 sm:px-12 sm:pt-14 sm:pb-10">
            <div className="halo" aria-hidden="true" />
            <div className="devices relative mx-auto max-w-[860px]">
              <Devices project={p} />
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 lg:p-12 lg:pt-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }}
                  aria-hidden="true"
                />
                <span className="text-[14px] text-ink-2">{p.kind}</span>
              </div>
              <h3 className="display mt-4 text-[clamp(2.25rem,4.4vw,3.25rem)] leading-[1] font-semibold text-ink">{p.name}</h3>
              <p className="mt-4 text-[18px] leading-relaxed text-ink">{p.pitch}</p>

              <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${p.name} tech stack`}>
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[13px] text-ink-2"
                  >
                    <BrandIcon name={s.replace(/ \d+$/, "")} size={13} />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium text-black transition-transform duration-300 active:scale-[0.97]"
                    style={{ background: p.color }}
                  >
                    Live demo
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[14px] font-medium text-ink transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.04] active:scale-[0.97]"
                >
                  <GitHubIcon size={15} />
                  GitHub
                </a>
                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-[14px] font-medium text-ink-2 transition-colors duration-300 hover:text-ink"
                >
                  Case study
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <ul className="grid content-start gap-4">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                  <Check size={16} className="mt-[3px] shrink-0" style={{ color: p.color }} aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </RevealItem>
    </Reveal>
  );
}

function Devices({ project: p }: { project: Project }) {
  if (p.laptop) {
    return (
      <div className="relative pr-[10%] pb-[3%]">
        <Laptop src={p.laptop.src} alt={p.laptop.alt} />
        {p.phone && (
          <div className="absolute right-0 bottom-0 w-[22%]">
            <Phone src={p.phone.src} alt={p.phone.alt} />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="relative flex items-center">
      <div className="relative z-0 min-w-0 flex-1 rounded-[18px] border border-white/10 bg-[#16181d] p-[1.4%] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
        <SpeedTrace />
      </div>
      <div className="relative z-10 -ml-[7%] w-[26%] shrink-0">
        <Phone>
          <RoadSenseMap />
        </Phone>
      </div>
    </div>
  );
}
