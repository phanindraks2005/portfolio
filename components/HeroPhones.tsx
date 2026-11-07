"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { RoadSenseMap } from "./RoadSenseArt";

/**
 * The three products as phones, each lit in its own colour. Rendered on the server and visible at once on every
 * screen; only the motion (pointer tilt, gentle bob) is added in the browser, and only on fine pointers.
 */
export function HeroPhones() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = el.closest("section") ?? document.body;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    hero.addEventListener("pointermove", onMove as EventListener, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove as EventListener);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="hero-phones relative mx-auto aspect-[1/1.02] w-full max-w-[440px]" aria-hidden="true">
      <Frame className="top-[15%] left-[3%] w-[38%] -rotate-[9deg]" color="#f5a524" delay={2} depth={10}>
        <RoadSenseMap />
      </Frame>
      <Frame className="top-[15%] right-[3%] w-[38%] rotate-[9deg]" color="#2dd4bf" delay={3} depth={10}>
        <Image src="/shots/medivault-public-card.webp" alt="" fill sizes="(min-width: 1024px) 170px, 120px" className="object-cover object-top" priority />
      </Frame>
      <Frame className="top-[2%] left-[27%] z-10 w-[46%]" color="#c6f432" delay={1} depth={22}>
        <Image src="/shots/stride-today-phone.webp" alt="" fill sizes="(min-width: 1024px) 210px, 150px" className="object-cover object-top" priority />
      </Frame>
    </div>
  );
}

function Frame({
  className,
  color,
  delay,
  depth,
  children,
}: {
  className: string;
  color: string;
  delay: number;
  depth: number;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="phone-parallax" style={{ ["--depth" as string]: depth }}>
        <div style={{ ["--d" as string]: delay }}>
          <div
            className="phone-bob rounded-[26px] border border-white/12 bg-[#16181d] p-[5px]"
            style={{ boxShadow: `0 40px 80px -30px rgb(0 0 0 / 0.9), 0 0 80px -20px ${color}66` }}
          >
            <div className="relative aspect-[390/844] overflow-hidden rounded-[21px] bg-black">
              {children}
              <div className="absolute top-[7px] left-1/2 h-[9px] w-[30%] -translate-x-1/2 rounded-full bg-black/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
