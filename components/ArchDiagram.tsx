import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment } from "react";
import type { Case } from "@/lib/cases";

/** Columns of boxes joined by labelled arrows: left to right on wide screens, top to bottom on phones. */
export function ArchDiagram({ arch }: { arch: Case["arch"] }) {
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
                <div key={n.title} className="rounded-[6px] border border-line bg-surface p-5">
                  <p className="mono text-ink">{n.title}</p>
                  <ul className="mt-3 grid gap-1 text-[13.5px] leading-snug text-ink-2">
                    {n.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {i < arch.columns.length - 1 && (
              <div className="flex items-center justify-center gap-2 py-1 text-center font-mono text-[12px] leading-snug text-ink-3 lg:flex-col lg:px-3">
                <ArrowDown size={16} className="shrink-0 text-ink lg:hidden" aria-hidden="true" />
                <ArrowRight size={18} className="hidden shrink-0 text-ink lg:block" aria-hidden="true" />
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
