"use client";

import { useRef, type ReactNode } from "react";

/** Pulls its child a few pixels toward the pointer while hovered (fine pointers only). */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate3d(${Math.max(-10, Math.min(10, x))}px, ${Math.max(-8, Math.min(8, y))}px, 0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span ref={ref} onPointerMove={move} onPointerLeave={leave} className={`magnetic inline-flex ${className ?? ""}`}>
      {children}
    </span>
  );
}
