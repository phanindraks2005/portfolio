import lighthouse from "@/lib/lighthouse.json";

type Scores = { performance: number; accessibility: number; "best-practices": number; seo: number };
const names: [keyof Scores, string][] = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["best-practices", "Best practices"],
  ["seo", "SEO"],
];

const tone = (n: number) => (n >= 90 ? "#34d399" : n >= 50 ? "#fbbf24" : "#f87171");

export function Footer() {
  const lh = lighthouse as { measuredAt: string | null; mobile: Scores | null; desktop: Scores | null };
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-[14px] text-muted sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p>© 2026 K S Phanindra. Built with Next.js and Framer Motion.</p>
          <p>
            Press <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[12px] text-ink-2">Ctrl K</kbd> to jump anywhere.
          </p>
        </div>
        {lh.mobile && lh.desktop && (
          <div>
            <p className="text-[13px]">PageSpeed Insights for the home page, {lh.measuredAt} (mobile / desktop)</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {names.map(([key, label]) => (
                <li
                  key={key}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pr-3 pl-2 text-[13px] text-ink-2"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: tone(Math.min(lh.mobile![key], lh.desktop![key])) }}
                    aria-hidden="true"
                  />
                  {label}
                  <span className="font-medium text-ink tabular-nums">
                    {lh.mobile![key]} / {lh.desktop![key]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
