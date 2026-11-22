"use client";

import { useState } from "react";
import { projects, skills } from "@/lib/data";
import { Reveal, RevealItem } from "./motion";

const used = new Map(skills.flatMap((g) => g.items.map((s) => [s.name, s.used] as const)));
const notes = new Map(skills.flatMap((g) => g.items.map((s) => [s.name, s.note] as const)));

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
    <div className="pt-10 sm:pt-14">
      <div className="sticky top-14 z-10 -mx-4 border-b border-line bg-bg px-4 py-3 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <ul className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Projects">
          {projects.map((p) => {
            const lit = slugs.includes(p.slug);
            return (
              <li
                key={p.slug}
                data-lit={lit || undefined}
                data-dim={(active && !lit) || undefined}
                className="skill-project rounded-[6px] border border-line bg-surface px-3 py-2.5 sm:px-5 sm:py-4"
              >
                <span className="skill-project-name block truncate text-[14px] font-medium text-ink sm:text-[17px]">{p.name}</span>
                <span className="mono mt-1.5 hidden truncate text-ink-3 sm:block">{p.kind}</span>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="mono mt-3 min-h-[20px] text-ink-2 sm:mt-4">
          {active && !slugs.length ? (
            <>
              <span className="text-ink">{active}</span> · {notes.get(active)}
            </>
          ) : active ? (
            <>
              <span className="text-ink">{active}</span> · used in {slugs.length} {slugs.length === 1 ? "project" : "projects"}:{" "}
              {names.join(", ")}
            </>
          ) : (
            <span className="text-ink-3">Hover or tap a skill to see which projects use it.</span>
          )}
        </p>
      </div>

      <Reveal className="mt-8 grid border-t border-line sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g) => (
          <RevealItem key={g.group} className="border-b border-line py-6 sm:pr-8">
            <h3 className="mono text-ink-3">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
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
                    className="skill-chip mono inline-flex min-h-11 items-center rounded-full border border-line px-3.5 text-ink sm:min-h-9"
                  >
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
