import Link from "next/link";
import type { Project } from "@/lib/data";
import { GitHubIcon } from "./icons";

type Item = { href: string; label: string; arrow: "↗" | "→"; external: boolean; primary: boolean; live?: boolean; code?: boolean };

/**
 * A project's actions as mono pill buttons, main action first: Live demo (with a live dot) when there is one,
 * otherwise Case study; then Case study, then Code. Case-study pages pass caseStudy={false}.
 * Phones: the main action takes a full row, the other two share the next one.
 */
export function ProjectLinks({ project: p, caseStudy = true, className = "" }: { project: Project; caseStudy?: boolean; className?: string }) {
  const items: Item[] = [];
  if (p.live) items.push({ href: p.live, label: "Live demo", arrow: "↗", external: true, primary: true, live: true });
  if (caseStudy) items.push({ href: `/projects/${p.slug}`, label: "Case study", arrow: "→", external: false, primary: !p.live });
  items.push({ href: p.github, label: "Code", arrow: "↗", external: true, primary: false, code: true });

  const outlines = items.filter((i) => !i.primary).length;

  return (
    <ul className={`grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap ${className}`} aria-label={`${p.name} links`}>
      {items.map((i, index) => {
        // Full row on phones for the main action, and for an outline button left on its own.
        const full = i.primary || (outlines % 2 === 1 && index === items.length - 1);
        const cls = `pbtn ${i.primary ? "pbtn-primary" : "pbtn-outline"} w-full sm:w-auto`;
        const body = (
          <>
            {i.live && <span className="live-dot" aria-hidden="true" />}
            {i.code && <GitHubIcon size={14} />}
            {i.label}
            <span className={i.arrow === "↗" ? "pbtn-arrow-ur" : "pbtn-arrow-r"} aria-hidden="true">
              {i.arrow}
            </span>
          </>
        );
        return (
          <li key={i.label} className={full ? "col-span-2" : ""}>
            {i.external ? (
              <a href={i.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={i.href} className={cls}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
