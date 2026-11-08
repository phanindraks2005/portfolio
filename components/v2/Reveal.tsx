"use client";

import { useEffect } from "react";

/**
 * One-shot entrances. Content is visible by default; only elements still below the fold are
 * armed (hidden), and each is revealed once as it enters. Siblings in the same parent stagger.
 * Nothing is armed under reduced motion or if this script never runs.
 */
export function Reveal({ selector }: { selector: string }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => el.getBoundingClientRect().top > innerHeight);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      const i = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
      el.style.setProperty("--rv-d", `${Math.min(i, 4) * 75}ms`);
      el.classList.add("rv-armed");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [selector]);
  return null;
}
