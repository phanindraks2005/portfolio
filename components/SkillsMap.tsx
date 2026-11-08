"use client";

import { useState } from "react";
import { projects, skills } from "@/lib/data";
import { BrandIcon } from "./icons";
import { Reveal, RevealItem } from "./motion";

const used = new Map(skills.flatMap((g) => g.items.map((s) => [s.name, s.used] as const)));

/**
 * Skill chips grouped by area. Hovering, focusing or tapping a chip lights up the projects that use it.
 * A tap pins the choice (touch has no hover); tapping it again, or another chip, changes it.
 */
export function SkillsMap() {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hover ?? pinned;
  const slugs = active ? used.get(active)! : [];
  const names = projects.filter((p) => slugs.includes(p.slug)).map((p) => p.name);

  return (
    <div className="mt-12 sm:mt-14">
      <div className="sticky top-16 z-10 -mx-5 bg-bg/95 px-5 py-3 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
        <ul className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Projects">
          {projects.map((p) => {
            const lit = slugs.includes(p.slug);
            return (
              <li
                key={p.slug}
                data-lit={lit || undefined}
                data-dim={(active && !lit) || undefined}
                style={{ "--c": p.color } as React.CSSProperties}
                className="skill-project rounded-xl border border-line bg-surface px-3 py-2.5 sm:rounded-2xl sm:px-5 sm:py-4"
              >
                <span className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden="true" />
                  <span className="truncate text-[14px] font-medium text-ink sm:text-[16px]">{p.name}</span>
                </span>
                <span className="mt-1 hidden truncate text-[13px] text-muted sm:block">{p.kind}</span>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="mt-3 min-h-[22px] text-[14px] text-ink-2 sm:mt-4">
          {active ? (
            <>
              <span className="font-medium text-ink">{active}</span> · used in {slugs.length}{" "}
              {slugs.length === 1 ? "project" : "projects"}: {names.join(", ")}
            </>
          ) : (
            <span className="text-muted">Hover or tap a skill to see which projects use it.</span>
          )}
        </p>
      </div>

      <Reveal className="mt-6 grid gap-x-8 gap-y-8 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <RevealItem key={g.group}>
            <h3 className="text-[13px] font-medium text-muted">{g.group}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s.name}>
                  <button
                    type="button"
                    aria-pressed={pinned === s.name}
                    data-active={active === s.name || undefined}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHover(s.name)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
                    onFocus={() => setHover(s.name)}
                    onBlur={() => setHover(null)}
                    onClick={() => setPinned((p) => (p === s.name ? null : s.name))}
                    className="skill-chip inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-3 text-[14px] text-ink sm:min-h-9"
                  >
                    <BrandIcon name={s.name} size={14} />
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
