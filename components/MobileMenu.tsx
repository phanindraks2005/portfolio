"use client";

import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./icons";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#bugs", label: "Engineering" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

/**
 * The phone menu: a full-screen modal <dialog>, so focus stays inside it and Escape closes it natively.
 * Any link tap closes it; the page underneath doesn't scroll while it's open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  // Close if the screen grows past the phone layout while open.
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Unlock scrolling and close right away (not after the re-render), so a tapped #link can scroll the page.
  const close = () => {
    document.documentElement.style.overflow = "";
    if (dialog.current?.open) dialog.current.close();
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:border-line-strong hover:text-ink md:hidden"
      >
        <Menu size={17} aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        onClose={close}
        aria-label="Menu"
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-5">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href="/" onClick={close} className="display text-[17px] font-semibold text-ink">
              K S Phanindra
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink-2 transition-colors hover:text-ink"
            >
              <X size={17} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu" className="mt-6 flex-1">
            <ul className="grid">
              {links.map((l, i) => (
                <li key={l.href} className="menu-item" style={{ ["--i" as string]: i }}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="display flex items-center justify-between border-b border-line py-4 text-[32px] leading-tight font-semibold tracking-[-0.03em] text-ink active:text-accent-text"
                  >
                    {l.label}
                    <ArrowUpRight size={22} className="text-muted" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="menu-item mt-8 grid gap-3" style={{ ["--i" as string]: links.length }}>
              <Link
                href="/resume"
                onClick={close}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent-strong px-5 text-[16px] font-medium text-white active:scale-[0.98]"
              >
                <FileText size={17} aria-hidden="true" />
                View resume
              </Link>
              <div className="flex gap-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  aria-label="GitHub profile"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] text-ink"
                >
                  <GitHubIcon size={18} />
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  aria-label="LinkedIn profile"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line-strong text-[15px] text-ink"
                >
                  <LinkedInIcon size={18} />
                  LinkedIn
                </a>
              </div>
            </div>
          </nav>

          <p className="menu-item shrink-0 pb-[max(20px,env(safe-area-inset-bottom))] text-[13px] text-muted" style={{ ["--i" as string]: links.length + 1 }}>
            {site.email}
          </p>
        </div>
      </dialog>
    </>
  );
}
