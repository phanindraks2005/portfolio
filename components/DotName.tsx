"use client";

import { useEffect, useRef } from "react";

const RADIUS = 80; // px around the pointer that pushes dots away
const PUSH = 2.4;
const SPRING = 0.075;
const DAMPING = 0.82;
const DOT = "#1a1a1a";

/**
 * Hand-made 5 × 7 bitmap letters, only the ones in the name. Each is drawn to stay readable as dots:
 * S is open at the top right and bottom left (never an 8), I has serifs (never a gap), D has cut corners,
 * R's leg kicks out, N has a full diagonal, A has a pointed top and a flat bar.
 */
const GLYPHS: Record<string, string[]> = {
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  H: ["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  A: ["..#..", ".#.#.", "#...#", "#...#", "#####", "#...#", "#...#"],
  N: ["#...#", "#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
};
const COLS = 5;
const ROWS = 7;
const LETTER_GAP = 1; // empty cells between letters
const WORD_GAP = 3; // empty cells between K, S and PHANINDRA
const LINE_GAP = 1; // empty cells between the two lines on phones

/** Cells across a line of words. */
const lineWidth = (words: string[]) =>
  words.reduce((sum, word) => sum + word.length * COLS + (word.length - 1) * LETTER_GAP, 0) + (words.length - 1) * WORD_GAP;

/** Small seeded generator, so the hand-made size wobble is the same on every load. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The name as a field of dots. Every lit cell of the bitmap letters is a 2 × 2 cluster of dots, so strokes are
 * two dots thick; the pointer pushes dots away and a spring pulls them back home.
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
    let rad = new Float32Array(0);
    let w = 0;
    let h = 0;
    let px = -1e4;
    let py = -1e4;
    let frame = 0;
    let visible = true;
    let ready = false;
    let disposed = false;
    let resizeTimer = 0;

    const sample = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // The box's own shape says which layout CSS chose (tall below 640px), so the two can never disagree mid-resize.
      const phone = h / w > 0.2;
      const lines = phone ? [["K", "S"], ["PHANINDRA"]] : [["K", "S", "PHANINDRA"]];
      const cols = Math.max(...lines.map(lineWidth));
      const rows = lines.length * ROWS + (lines.length - 1) * LINE_GAP;
      // Fill ~90% of the width; both phone lines share this cell size.
      const cell = Math.min((w * 0.9) / cols, h / rows);
      const pitch = cell / 2;
      // Dots grow with the grid so strokes stay solid: ~2.4px on phones, ~3px and up on wide screens.
      const base = Math.min(pitch * 0.88, Math.max(phone ? 2.4 : 3, pitch * 0.64));
      const top0 = (h - rows * cell) / 2;

      const rand = seeded(20270);
      const pts: number[] = [];
      const sizes: number[] = [];
      lines.forEach((words, li) => {
        let cx = (w - lineWidth(words) * cell) / 2;
        const cy = top0 + li * (ROWS + LINE_GAP) * cell;
        words.forEach((word, wi) => {
          [...word].forEach((ch, ci) => {
            GLYPHS[ch].forEach((row, ry) => {
              for (let rx = 0; rx < COLS; rx++) {
                if (row[rx] !== "#") continue;
                for (let k = 0; k < 4; k++) {
                  pts.push(cx + rx * cell + ((k & 1) + 0.5) * pitch, cy + ry * cell + ((k >> 1) + 0.5) * pitch);
                  sizes.push((base / 2) * (0.85 + rand() * 0.3));
                }
              }
            });
            cx += (COLS + (ci < word.length - 1 ? LETTER_GAP : 0)) * cell;
          });
          if (wi < words.length - 1) cx += WORD_GAP * cell;
        });
      });
      n = pts.length / 2;
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      rad = Float32Array.from(sizes);
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
        ctx.moveTo(x[i] + rad[i], y[i]);
        ctx.arc(x[i], y[i], rad[i], 0, Math.PI * 2);
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

    // Start after first paint, when the browser is idle, so the canvas never holds up the page.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(() => {
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
    <div ref={box} aria-hidden="true" className="dot-name relative aspect-[100/29] w-full sm:aspect-[100/10.5]">
      <canvas ref={cv} className="absolute inset-0 size-full" />
    </div>
  );
}
