"use client";

import { useEffect, useRef, useState } from "react";
import data from "@/lib/contributions.json";

type Day = { date: string; level: number; count: number };

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en-IN", { month: "short", timeZone: "UTC" });
const utc = (d: string) => new Date(d + "T00:00:00Z");

/** The calendar grid. Built in the browser when it nears the screen, so its ~370 cells stay out of the page's HTML. */
export function HeatGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "400px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const days = data.days as Day[];
  // Columns are weeks starting on Sunday, like GitHub's own calendar.
  const cells: (Day | null)[] = [...Array(utc(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div ref={ref} aria-hidden="true" className="min-w-[720px]" style={{ aspectRatio: `${weeks.length} / 8.6` }}>
      {show && (
        <div className="grid gap-y-1.5" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`, columnGap: 3 }}>
          {weeks.map((w, i) => {
            const d = w.find(Boolean);
            const prev = i > 0 ? weeks[i - 1].find(Boolean) : null;
            const m = d ? month.format(utc(d.date)) : "";
            const label = d && (!prev || month.format(utc(prev.date)) !== m) ? m : "";
            return (
              <span key={`m${i}`} className="h-3 overflow-visible text-[11px] leading-3 whitespace-nowrap text-muted">
                {label}
              </span>
            );
          })}
          {weeks.map((w, i) => (
            <div key={i} className="grid grid-rows-7 gap-[3px]">
              {Array.from({ length: 7 }, (_, r) => {
                const d = w[r];
                if (!d) return <span key={r} className="aspect-square" />;
                return (
                  <span
                    key={r}
                    title={`${d.count || "No"} contribution${d.count === 1 ? "" : "s"} on ${fmt.format(utc(d.date))}`}
                    className="heat aspect-square rounded-[3px]"
                    data-level={d.level}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
