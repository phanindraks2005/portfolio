"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import type { Step } from "@/lib/stories";
import { BrandIcon, GitHubIcon } from "./icons";
import { LoopVideo } from "./LoopVideo";
import { Reveal, RevealItem } from "./motion";
import { LaptopFrame, PhoneFrame } from "./Frames";
import { RoadSenseStage } from "./RoadSenseStage";

/**
 * One project as a scroll story. On wide screens the device stays pinned while the steps scroll past,
 * and its screen follows the step in the middle of the viewport.
 */
export function ProjectStory({ project: p, steps, flip }: { project: Project; steps: Step[]; flip: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    const viewObs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "0px" });
    const stepObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    nearObs.observe(el);
    viewObs.observe(el);
    el.querySelectorAll("[data-step]").forEach((s) => stepObs.observe(s));
    return () => {
      nearObs.disconnect();
      viewObs.disconnect();
      stepObs.disconnect();
    };
  }, []);

  // The phone keeps the most recent phone screen a step defined.
  const phoneFor = (i: number) => {
    for (let n = i; n >= 0; n--) if (steps[n].phone) return n;
    return -1;
  };
  const activePhone = phoneFor(active);

  return (
    <article ref={root} id={p.slug} data-glow={p.color} className="story scroll-mt-20" style={{ ["--c" as string]: p.color }}>
      <Reveal className="glow-card story-head grid gap-8 rounded-[28px] p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
        <RevealItem>
          <div className="flex items-center gap-3">
            <span className="size-2.5 rounded-full" style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }} aria-hidden="true" />
            <span className="text-[14px] text-ink-2">{p.kind}</span>
          </div>
          <h3 className="display mt-4 text-[clamp(2.5rem,5vw,3.75rem)] leading-[0.98] font-semibold text-ink">{p.name}</h3>
          <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-ink">{p.pitch}</p>
        </RevealItem>
        <RevealItem>
          <ul className="flex flex-wrap gap-2" aria-label={`${p.name} tech stack`}>
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
          <div className="mt-6 flex flex-wrap gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[14px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
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
        </RevealItem>
      </Reveal>

      <div
        className={`mt-6 grid gap-2 lg:mt-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14 ${flip ? "lg:[direction:rtl]" : ""}`}
      >
        {/* The stage stays pinned while the steps scroll: beside them on wide screens, above them on phones. */}
        <div className="sticky top-16 z-10 -mx-5 bg-bg px-5 pt-3 pb-4 [direction:ltr] sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0">
          <div className="lg:sticky lg:top-[max(88px,calc(50vh-250px))] lg:py-10">
            <div className="glow-card stage-panel relative overflow-hidden rounded-[22px] px-4 pt-6 pb-4 lg:rounded-[28px] lg:px-8 lg:pt-10 lg:pb-8">
              <div className="halo" aria-hidden="true" />
              {p.slug === "roadsense" ? (
                <RoadSenseStage step={active} />
              ) : (
                <Stage steps={steps} active={active} activePhone={activePhone} load={near} play={inView} />
              )}
              <StepDots count={steps.length} active={active} color={p.color} />
            </div>
          </div>
        </div>

        <ol className="[direction:ltr]">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              className="step flex min-h-[48vh] flex-col justify-center py-8 lg:min-h-[78vh] lg:py-0"
              data-active={i === active || undefined}
            >
              <p className="text-[13px] font-medium tabular-nums" style={{ color: p.color }}>
                {i + 1} / {steps.length}
              </p>
              <h4 className="display mt-2 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] font-semibold text-ink">{s.title}</h4>
              <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function Stage({
  steps,
  active,
  activePhone,
  load,
  play,
}: {
  steps: Step[];
  active: number;
  activePhone: number;
  load: boolean;
  play: boolean;
}) {
  return (
    <div className="relative pr-[9%] pb-[2%]">
      <LaptopFrame>
        {steps.map((s, i) =>
          s.laptop ? (
            <Layer key={i} on={i === active}>
              <LoopVideo
                media={s.laptop}
                load={load && Math.abs(i - active) <= 1}
                play={play && i === active}
                className="size-full object-cover object-top-left"
              />
            </Layer>
          ) : null,
        )}
      </LaptopFrame>
      {activePhone >= 0 && (
        <div className="absolute right-0 bottom-0 w-[22%]">
          <PhoneFrame>
            {steps.map((s, i) =>
              s.phone ? (
                <Layer key={i} on={i === activePhone}>
                  <LoopVideo media={s.phone} load={load} play={play && i === activePhone} className="size-full object-cover object-top" />
                </Layer>
              ) : null,
            )}
          </PhoneFrame>
        </div>
      )}
    </div>
  );
}

function Layer({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div className="stage-layer absolute inset-0" data-on={on || undefined} aria-hidden={!on || undefined}>
      {children}
    </div>
  );
}

function StepDots({ count, active, color }: { count: number; active: number; color: string }) {
  return (
    <div className="mt-7 flex justify-center gap-2" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width: i === active ? 28 : 6, background: i === active ? color : "rgb(255 255 255 / 0.18)" }}
        />
      ))}
    </div>
  );
}
