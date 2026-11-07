import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Page not found",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="px-5 pt-36 pb-28 sm:px-8 sm:pt-44">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[14px] text-muted">404</p>
        <h1 className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-ink">
          This page isn’t here.
        </h1>
        <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
          The link may be old or mistyped. Everything on the site is one click away from the home page.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-strong px-5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-accent-hover"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Home page
          </Link>
          <Link
            href="/resume"
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30"
          >
            Resume
          </Link>
        </div>
        <h2 className="mt-16 text-[13px] font-medium text-muted">Case studies</h2>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center gap-2 text-[16px] text-ink hover:text-accent-text">
                <span className="size-2 rounded-full" style={{ background: p.color }} aria-hidden="true" />
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
