"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Full-stack developer · AI-integrated web apps",
  "Next.js, Supabase and Gemini, end to end",
  "Row-level security, tested like a reviewer",
];

/** Cycles the role line. All phrases share one grid cell, so the line never changes height. */
export function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Like the other decorative loops, it waits for the first interaction (html.ready).
    const id = setInterval(() => {
      if (document.documentElement.classList.contains("ready")) setI((n) => (n + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="role-cycler grid">
      {phrases.map((p, n) => (
        <span
          key={p}
          aria-hidden={n !== 0 || undefined}
          className={`role-phrase ${n === i ? "is-on" : n === (i + phrases.length - 1) % phrases.length ? "is-out" : ""}`}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
