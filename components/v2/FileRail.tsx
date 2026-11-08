"use client";

import { useEffect, useState } from "react";

/**
 * The e-file of a chessboard, standing at the right edge on wide screens.
 * Each square is a section; the pawn advances one square as each section comes into view.
 * e2 is the pawn's starting square, so the page starts there.
 */
const squares = [
  { id: "top", sq: "e2", label: "Start" },
  { id: "work", sq: "e3", label: "Work" },
  { id: "about", sq: "e4", label: "About" },
  { id: "contact", sq: "e5", label: "Contact" },
];

// a1 is dark, so a square is dark when file + rank is even (e = 5).
const isDark = (sq: string) => (5 + Number(sq[1])) % 2 === 0;

export function FileRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const els = squares.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="va-rail" aria-label="Sections">
      <ol>
        {[...squares].reverse().map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={isDark(s.sq) ? "dark" : "light"}
                aria-current={on ? "location" : undefined}
                title={`${s.sq} · ${s.label}`}
              >
                <span className="va-rail-sq">{s.sq}</span>
                <span className="va-rail-label">{s.label}</span>
                {on && <Pawn />}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Pawn() {
  return (
    <svg className="va-pawn" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="6.5" r="3.6" />
      <path d="M8.6 11.2h6.8l-1.3 2c1.4 1.6 2.3 3.6 2.6 5.8H7.3c.3-2.2 1.2-4.2 2.6-5.8z" />
      <rect x="5.5" y="19.4" width="13" height="2.6" rx="0.6" />
    </svg>
  );
}
