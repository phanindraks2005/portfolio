import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="px-4 pt-32 pb-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1320px]">
        <p className="mono text-ink-3">404</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.03em] text-ink">This page isn’t here.</h1>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
          The link may be old or mistyped. Everything on the site is one click away from the home page.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            ← Home page
          </Link>
          <Link href="/resume" className="btn btn-secondary">
            Resume
          </Link>
        </div>
        <h2 className="mono mt-16 text-ink-3">Case studies</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="link inline-flex min-h-11 items-center text-[16px]">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
