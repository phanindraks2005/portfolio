"use client";

import { useEffect, useRef } from "react";

const RADIUS = 80; // px around the pointer that pushes dots away
const PUSH = 2.4;
const SPRING = 0.075;
const DAMPING = 0.82;
const DOT = "#1a1a1a";

/**
 * The name as a field of dots. The text is drawn in Doto on an offscreen canvas, sampled on a grid,
 * and each lit cell becomes a dot that the pointer pushes away and a spring pulls back home.
 * One line from 640 px up, two below. The loop only runs while dots are moving and the hero is on screen.
 * The real heading is the sr-only <h1> next to it; this is decoration.
 */
export function DotName() {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = box.current;
    const canvas = cv.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let n = 0;
    let r = 1.5;
    let w = 0;
    let h = 0;
    let px = -1e4;
    let py = -1e4;
    let frame = 0;
    let visible = true;
    let ready = false;
    let disposed = false;
    let resizeTimer = 0;

    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-doto").trim() || "monospace";

    const sample = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Same breakpoint as the box's aspect ratio (Tailwind's sm).
      const lines = matchMedia("(max-width: 639.98px)").matches ? ["K S", "PHANINDRA"] : ["K S PHANINDRA"];
      const off = document.createElement("canvas");
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.font = `900 100px ${family}`;
      const m = lines.map((l) => o.measureText(l));
      const widest = Math.max(...m.map((t) => t.actualBoundingBoxLeft + t.actualBoundingBoxRight));
      const cap = Math.max(...m.map((t) => t.actualBoundingBoxAscent + t.actualBoundingBoxDescent));
      const gapRatio = 0.22;
      const tall = cap * (lines.length + gapRatio * (lines.length - 1));
      const size = Math.min(((w * 0.96) / widest) * 100, (h / tall) * 100);
      const capPx = (cap * size) / 100;
      const blockH = (tall * size) / 100;

      off.width = Math.ceil(w);
      off.height = Math.ceil(h);
      o.font = `900 ${size}px ${family}`;
      o.textAlign = "left";
      o.textBaseline = "alphabetic";
      o.fillStyle = "#000";
      lines.forEach((l, i) => {
        const t = o.measureText(l);
        const lw = t.actualBoundingBoxLeft + t.actualBoundingBoxRight;
        const left = (w - lw) / 2 + t.actualBoundingBoxLeft;
        const top = (h - blockH) / 2 + i * capPx * (1 + gapRatio);
        o.fillText(l, left, top + t.actualBoundingBoxAscent);
      });

      // Grid spacing follows the type size, so phones keep the same look with fewer dots.
      const step = Math.max(3.2, Math.min(5, size / 34));
      r = Math.min(1.5, step * 0.36);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const pts: number[] = [];
      for (let yy = step / 2; yy < off.height; yy += step) {
        for (let xx = step / 2; xx < off.width; xx += step) {
          if (data[(Math.floor(yy) * off.width + Math.floor(xx)) * 4 + 3] > 140) pts.push(xx, yy);
        }
      }
      n = pts.length / 2;
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        hx[i] = pts[i * 2];
        hy[i] = pts[i * 2 + 1];
      }
      x = hx.slice();
      y = hy.slice();
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = DOT;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        ctx.moveTo(x[i] + r, y[i]);
        ctx.arc(x[i], y[i], r, 0, Math.PI * 2);
      }
      ctx.fill();
    };

    const tick = () => {
      frame = 0;
      const r2 = RADIUS * RADIUS;
      let speed = 0;
      let away = 0;
      for (let i = 0; i < n; i++) {
        const dx = x[i] - px;
        const dy = y[i] - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / RADIUS) * PUSH;
          vx[i] += (dx / d) * f;
          vy[i] += (dy / d) * f;
        }
        vx[i] = (vx[i] + (hx[i] - x[i]) * SPRING) * DAMPING;
        vy[i] = (vy[i] + (hy[i] - y[i]) * SPRING) * DAMPING;
        x[i] += vx[i];
        y[i] += vy[i];
        speed += Math.abs(vx[i]) + Math.abs(vy[i]);
        away += Math.abs(hx[i] - x[i]) + Math.abs(hy[i] - y[i]);
      }
      draw();
      // Keep going while anything moves. A still pointer holds the dots in place, so stop there too;
      // once the pointer has gone and the dots are home, snap them exactly home and stop.
      const limit = 0.05 * Math.max(1, n / 200);
      if (speed > limit) kick();
      else if (pointerNear()) return;
      else if (away > limit) kick();
      else {
        x.set(hx);
        y.set(hy);
        vx.fill(0);
        vy.fill(0);
        draw();
      }
    };

    const kick = () => {
      if (!frame && visible && ready && !still) frame = requestAnimationFrame(tick);
    };

    const pointerNear = () => px > -RADIUS && py > -RADIUS && px < w + RADIUS && py < h + RADIUS;
    let wasNear = false;
    const point = (cx: number, cy: number) => {
      const rect = canvas.getBoundingClientRect();
      px = cx - rect.left;
      py = cy - rect.top;
      // Only wake the loop when the pointer is near the dots, or has just left them.
      const near = pointerNear();
      if (near || wasNear) kick();
      wasNear = near;
    };
    const leave = () => {
      px = -1e4;
      py = -1e4;
      kick();
    };
    const onPointer = (e: PointerEvent) => e.pointerType !== "touch" && point(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) point(t.clientX, t.clientY);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ready && sample(), 150);
    });

    // Start after first paint and once Doto is in, so the canvas never holds up the page.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(async () => {
      try {
        await document.fonts.load(`900 100px ${family}`);
        await document.fonts.ready;
      } catch {}
      if (disposed) return;
      ready = true;
      sample();
      wrap.dataset.ready = "";
      io.observe(wrap);
      ro.observe(wrap);
      if (!still) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        document.documentElement.addEventListener("pointerleave", leave);
        canvas.addEventListener("touchstart", onTouch, { passive: true });
        canvas.addEventListener("touchmove", onTouch, { passive: true });
        canvas.addEventListener("touchend", leave, { passive: true });
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("touchstart", onTouch);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", leave);
    };
  }, []);

  return (
    <div ref={box} aria-hidden="true" className="dot-name relative aspect-[100/33] w-full sm:aspect-[100/10.5]">
      <canvas ref={cv} className="absolute inset-0 size-full" />
    </div>
  );
}
