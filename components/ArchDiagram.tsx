import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";
import type { Case } from "@/lib/cases";

/** Columns of boxes joined by labelled arrows: left to right on wide screens, top to bottom on phones. */
export function ArchDiagram({ arch, color }: { arch: Case["arch"]; color: string }) {
  return (
    <figure>
      <div
        className="grid grid-cols-1 items-center gap-3 lg:[grid-template-columns:var(--cols)] lg:gap-0"
        style={{ ["--cols" as string]: arch.columns.map(() => "minmax(0,1fr)").join(" minmax(110px,auto) ") }}
      >
        {arch.columns.map((col, i) => (
          <Fragment key={i}>
            <div className="grid gap-3">
              {col.map((n) => (
                <div key={n.title} className="rounded-[18px] border border-line bg-surface p-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                    <span className="size-2 rounded-full" style={{ background: i === 0 ? "#f5f6f8" : color }} aria-hidden="true" />
                    {n.title}
                  </p>
                  <ul className="mt-2.5 grid gap-1 text-[13.5px] leading-snug text-ink-2">
                    {n.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {i < arch.columns.length - 1 && (
              <div className="flex items-center justify-center gap-2 py-1 text-center text-[12.5px] leading-snug text-muted lg:flex-col lg:px-3">
                <ArrowDown size={18} className="shrink-0 lg:hidden" style={{ color }} aria-hidden="true" />
                <ArrowRight size={20} className="hidden shrink-0 lg:block" style={{ color }} aria-hidden="true" />
                <span className="max-w-[26ch] lg:max-w-[16ch]">{arch.edges[i]}</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <figcaption className="mt-5 max-w-[70ch] text-[15px] leading-relaxed text-ink-2">{arch.note}</figcaption>
    </figure>
  );
}
