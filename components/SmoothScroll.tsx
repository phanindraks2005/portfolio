"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const OFFSET = -80;

/** Scrolls to a hash target, through Lenis when it's running. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: OFFSET });
  else el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", hash);
  return true;
}

/** Lenis smooth scrolling, off for reduced motion and touch screens (native scrolling is better there). */
export function SmoothScroll() {
  useEffect(() => {
    // Decorative loops (aurora drift, pulse, floating phones, marquee) start on the first interaction,
    // so they never compete with loading; loops marked [data-loop] also pause while off screen.
    const root = document.documentElement;
    const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown", "touchstart"] as const;
    const start = () => {
      root.classList.add("ready");
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    // Off-screen loops are listed on <html> (already hydrated), never on the sections themselves.
    const off = new Set<string>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const name = (e.target as HTMLElement).dataset.loop!;
        if (e.isIntersecting) off.delete(name);
        else off.add(name);
      }
      root.dataset.off = [...off].join(" ");
    });
    document.querySelectorAll("[data-loop]").forEach((el) => io.observe(el));
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      io.disconnect();
    };
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
