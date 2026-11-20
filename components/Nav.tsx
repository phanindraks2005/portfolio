"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { openPalette } from "./CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { NavClock } from "./NavClock";
import { NavLink, navLinks } from "./NavLink";


const noop = () => () => {};
// Every home section is watched, so the ones without a nav link (Verified, Experience…) clear the highlight.
const spied = ["projects", "bugs", "about", "skills", "verified", "experience", "education", "achievements", "contact"];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const mac = useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section crossing the upper third of the screen is the active one.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = spied.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    const top = document.getElementById("top");
    const topObs = top ? new IntersectionObserver(([e]) => e.isIntersecting && setSection(null), { rootMargin: "-30% 0px -65% 0px" }) : null;
    if (top) topObs?.observe(top);
    return () => {
      obs.disconnect();
      topObs?.disconnect();
    };
  }, [pathname]);

  const active = pathname === "/resume" ? "resume" : pathname === "/" ? section : null;

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 border-b border-line transition-colors duration-300 ${
        scrolled ? "bg-bg/92 backdrop-blur-md" : "bg-bg"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="inline-flex h-11 shrink-0 items-center gap-2.5 text-[15px] font-medium text-ink">
          <span className="status-dot" aria-hidden="true" />K S Phanindra
        </Link>
        <div className="flex min-w-0 items-center gap-3 lg:gap-6">
          <ul className="hidden items-center gap-5 lg:flex">
            {navLinks.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.href}>
                  <NavLink
                    href={l.href}
                    aria-current={on ? (l.id === "resume" ? "page" : "location") : undefined}
                    className={`mono inline-flex h-11 items-center underline-offset-[6px] transition-colors ${
                      on ? "text-accent underline decoration-accent" : "text-ink hover:underline hover:decoration-accent"
                    }`}
                  >
                    {l.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <NavClock className="whitespace-nowrap" />
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search the site"
            title="Search the site"
            aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
            className="mono hidden h-8 items-center gap-2 rounded-full border border-line px-3 text-ink-2 transition-colors hover:border-ink hover:text-ink lg:inline-flex"
          >
            Search
            <kbd className="font-mono text-ink-3" aria-hidden="true">
              {mac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}

