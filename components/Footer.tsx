import lighthouse from "@/lib/lighthouse.json";

type Scores = { performance: number; accessibility: number; "best-practices": number; seo: number };
const names: [keyof Scores, string][] = [
  ["performance", "Performance"],
  ["accessibility", "Accessibility"],
  ["best-practices", "Best practices"],
  ["seo", "SEO"],
];

export function Footer() {
  const lh = lighthouse as { measuredAt: string | null; mobile: Scores | null; desktop: Scores | null };
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-4 py-10 text-ink-2 sm:px-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2">
          <p className="mono">© 2026 K S Phanindra. Built with Next.js and Framer Motion.</p>
          <p className="mono hidden text-ink-3 md:block">
            Press <kbd className="rounded-[4px] border border-line px-1.5 py-0.5 font-mono text-ink-2">Ctrl K</kbd> to jump anywhere.
          </p>
        </div>
        {lh.mobile && lh.desktop && (
          <div>
            <p className="mono text-ink-3">PageSpeed Insights for the home page, {lh.measuredAt} (mobile / desktop)</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {names.map(([key, label]) => (
                <li key={key} className="mono tag gap-2">
                  {Math.min(lh.mobile![key], lh.desktop![key]) >= 90 && <span className="status-dot" aria-hidden="true" />}
                  {label}
                  <span className="text-ink tabular-nums">
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
