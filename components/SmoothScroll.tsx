"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// html has scroll-padding-top: 80px, which Lenis already honours.
const OFFSET = 0;
const NAV_GAP = 80;

/** Page offset of an element from its layout box, so a reveal still sliding it into place doesn't skew the result. */
function layoutTop(el: HTMLElement) {
  let top = 0;
  for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) top += e.offsetTop;
  return top;
}

/** Scrolls to a hash target, through Lenis when it's running. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return false;
  const top = layoutTop(el) - NAV_GAP;
  if (window.__lenis) window.__lenis.scrollTo(top, { offset: OFFSET });
  else window.scrollTo({ top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", hash);
  return true;
}

/** Lenis smooth scrolling, off for reduced motion and touch screens (native scrolling is better there). */
export function SmoothScroll() {
  useEffect(() => {
    // The floating phones start bobbing on the first interaction, so the animation never competes with loading.
    const root = document.documentElement;
    const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown", "touchstart"] as const;
    const start = () => {
      root.classList.add("ready");
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: OFFSET }, lerp: 0.12 });
    window.__lenis = lenis;
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      delete window.__lenis;
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}
