"use client";

import { useEffect } from "react";

/** Tints the fixed page glow with the colour of whichever [data-glow] section holds the middle of the screen. */
export function GlowScene() {
  useEffect(() => {
    const glow = document.querySelector<HTMLElement>(".page-glow");
    if (!glow) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) glow.style.setProperty("--scene", (e.target as HTMLElement).dataset.glow!);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    const watch = () => document.querySelectorAll("[data-glow]").forEach((el) => obs.observe(el));
    watch();
    return () => obs.disconnect();
  }, []);
  return <div className="page-glow" aria-hidden="true" />;
}
