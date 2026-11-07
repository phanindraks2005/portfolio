import data from "@/lib/contributions.json";
import { HeatGrid } from "./HeatGrid";
import { GitHubIcon } from "./icons";

const fmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** GitHub's public contribution calendar, saved at build time by scripts/fetch-contributions.mjs. */
export function Contributions() {
  return (
    <div className="glow-card rounded-[24px] p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-[22px] font-semibold text-ink">GitHub activity</h3>
        <a
          href={`https://github.com/${data.user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[14px] text-ink-2 transition-colors hover:text-ink"
        >
          <GitHubIcon size={15} />
          {data.user}
        </a>
      </div>
      <p className="mt-2 text-[15px] text-ink-2">
        <span className="font-semibold text-ink">{data.total}</span> public contributions in the last year · updated{" "}
        {fmt.format(new Date(data.fetchedAt + "T00:00:00Z"))}
      </p>

      <div className="heatmap mt-6 overflow-x-auto pb-1" tabIndex={0} aria-label="Contribution calendar for the last year" role="region">
        <HeatGrid />
      </div>
      <div className="mt-4 flex items-center justify-end gap-1.5 text-[12px] text-muted" aria-hidden="true">
        Less
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className="size-[11px] rounded-[3px] heat" data-level={l} />
        ))}
        More
      </div>
    </div>
  );
}
