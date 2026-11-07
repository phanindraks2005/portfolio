"use client";

import { useEffect } from "react";

/** Feeds the pointer position into the hovered .glow-card as --mx / --my. One listener for the whole page. */
export function GlowTracker() {
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const update = () => {
      frame = 0;
      if (!last) return;
      const card = (last.target as Element | null)?.closest?.<HTMLElement>(".glow-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${last.clientX - r.left}px`);
      card.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
