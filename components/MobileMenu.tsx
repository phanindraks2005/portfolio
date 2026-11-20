"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";
import { openPalette } from "./CommandPalette";
import { NavClock } from "./NavClock";
import { NavLink, navLinks } from "./NavLink";

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
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    }
  }, [open]);

  // Close if the screen grows past the phone layout while open.
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Unlock scrolling and close right away (not after the re-render), so a tapped #link can scroll the page.
  const close = () => {
    document.documentElement.style.overflow = "";
    window.__lenis?.start();
    if (dialog.current?.open) dialog.current.close();
    setOpen(false);
  };

  // A modal dialog lets Tab leave for the browser's own toolbar; keep it cycling through the menu instead.
  const wrapTab = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>("a[href], button")];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const ext = "mono inline-flex min-h-11 items-center text-ink-2 underline-offset-4 hover:text-ink hover:underline hover:decoration-accent";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="mono inline-flex h-11 items-center px-1 text-ink underline-offset-4 hover:underline hover:decoration-accent lg:hidden"
      >
        Menu
      </button>

      <dialog
        ref={dialog}
        onClose={close}
        onKeyDown={wrapTab}
        aria-label="Menu"
        data-lenis-prevent
        className="mobile-menu m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-4 sm:px-8">
          <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line">
            <NavLink href="/" onClick={close} className="inline-flex h-11 items-center gap-2.5 text-[15px] font-medium text-ink">
              <span className="status-dot" aria-hidden="true" />K S Phanindra
            </NavLink>
            <div className="flex items-center gap-3">
              <NavClock className="whitespace-nowrap" />
              <button
                type="button"
                onClick={close}
                className="mono inline-flex h-11 items-center px-1 text-ink underline-offset-4 hover:underline hover:decoration-accent"
              >
                Close
              </button>
            </div>
          </div>

          <nav aria-label="Menu" className="flex-1 overflow-y-auto pt-4">
            <ul className="grid">
              {navLinks.map((l, i) => (
                <li key={l.href} className="menu-item" style={{ ["--i" as string]: i }}>
                  <NavLink
                    href={l.href}
                    onClick={close}
                    className="flex items-baseline gap-4 border-b border-line py-4 font-mono text-[28px] leading-none tracking-[0.02em] text-ink uppercase active:text-accent"
                  >
                    <span className="mono text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="menu-item mt-6 flex flex-wrap gap-x-6" style={{ ["--i" as string]: navLinks.length }}>
              <button
                type="button"
                onClick={() => {
                  close();
                  requestAnimationFrame(openPalette);
                }}
                className={ext}
              >
                Search
              </button>
              <a href={site.github} target="_blank" rel="noopener noreferrer" onClick={close} className={ext}>
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" onClick={close} className={ext}>
                LinkedIn ↗
              </a>
            </div>
          </nav>

          <p
            className="menu-item shrink-0 border-t border-line pt-4 pb-[max(20px,env(safe-area-inset-bottom))] font-mono text-[13px] text-ink-2"
            style={{ ["--i" as string]: navLinks.length + 1 }}
          >
            {site.email}
          </p>
        </div>
      </dialog>
    </>
  );
}
