"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import type { Step } from "@/lib/stories";
import { LoopVideo } from "./LoopVideo";
import { ProjectLinks } from "./ProjectLinks";
import { Reveal, RevealItem } from "./motion";
import { LaptopFrame, PhoneFrame } from "./Frames";
import { RoadSenseStage } from "./RoadSenseStage";

/**
 * One project as a scroll story. On wide screens the device stays pinned while the steps scroll past,
 * and its screen follows the step in the middle of the viewport.
 */
export function ProjectStory({ project: p, steps, flip, index }: { project: Project; steps: Step[]; flip: boolean; index: number }) {
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
    <article ref={root} id={p.slug} className="story">
      <Reveal className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-14">
        <RevealItem>
          <p className="mono flex items-center gap-3 text-ink-3">
            <span className="text-ink">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true">·</span>
            {p.kind}
          </p>
          <h3 className="display mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-ink">{p.name}</h3>
          <p className="mt-4 max-w-[46ch] text-[18px] leading-relaxed text-ink">{p.pitch}</p>
          {p.team && <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">{p.team}</p>}
          <ProjectLinks project={p} className="mt-5" />
        </RevealItem>
        <RevealItem>
          <ul className="flex flex-wrap gap-2" aria-label={`${p.name} tech stack`}>
            {p.stack.map((s) => (
              <li key={s} className="mono tag">
                {s}
              </li>
            ))}
          </ul>
        </RevealItem>
      </Reveal>

      <div
        className={`mt-6 grid gap-2 lg:mt-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14 ${flip ? "lg:[direction:rtl]" : ""}`}
      >
        {/* The stage stays pinned while the steps scroll: beside them on wide screens, above them on phones. */}
        <div className="sticky top-14 z-10 -mx-4 bg-bg px-4 pt-3 pb-4 [direction:ltr] sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:bg-transparent lg:p-0">
          <div className="lg:sticky lg:top-[max(80px,calc(50vh-250px))] lg:py-10">
            <div className="surface-card relative overflow-hidden px-3 pt-4 pb-3 sm:px-5 sm:pt-6 lg:px-8 lg:pt-8 lg:pb-6">
              {p.slug === "roadsense" ? (
                <RoadSenseStage step={active} />
              ) : (
                <Stage steps={steps} active={active} activePhone={activePhone} load={near} play={inView} />
              )}
              <StepDots count={steps.length} active={active} />
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
              <p className="mono text-ink-3 tabular-nums">
                {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h4 className="display mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-ink">{s.title}</h4>
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
                showPoster={load}
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

function StepDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-ink" : "w-1.5 bg-line"}`}
        />
      ))}
    </div>
  );
}
