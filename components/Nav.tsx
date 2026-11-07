"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { openPalette } from "./CommandPalette";
import { MobileMenu } from "./MobileMenu";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#bugs", label: "Engineering" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const noop = () => () => {};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const mac = useSyncExternalStore(
    noop,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="display text-[17px] font-semibold text-ink">
          K S Phanindra
        </Link>
        <div className="flex items-center gap-2 md:gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-lg px-3 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/resume" className="rounded-lg px-3 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
                Resume
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search the site"
            title="Search the site"
            aria-keyshortcuts={mac ? "Meta+K" : "Control+K"}
            className="ml-2 flex h-9 min-w-9 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
          >
            <Search size={16} aria-hidden="true" />
            <kbd className="hidden font-mono text-[12px] text-muted md:inline" aria-hidden="true">
              {mac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
