"use client";

import { Menu } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { openPalette } from "./CommandPalette";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
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
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/90" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="display text-[17px] font-semibold text-ink">
          K S Phanindra
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-lg px-3 py-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openPalette}
            className="ml-2 flex items-center gap-2 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
          >
            <Menu size={16} className="md:hidden" aria-hidden="true" />
            <span className="md:hidden">Menu</span>
            <span className="hidden md:inline">Jump to</span>
            <kbd className="hidden font-mono text-[12px] text-muted md:inline">{mac ? "⌘" : "Ctrl"} K</kbd>
          </button>
        </div>
      </nav>
    </header>
  );
}
