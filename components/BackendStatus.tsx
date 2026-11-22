"use client";

import { useEffect, useState } from "react";

const API = "https://roadsense-backend-t98l.onrender.com";
// After this long without an answer the server is probably waking up (Render free tier sleeps when idle).
const SLOW_MS = 2500;
const GIVE_UP_MS = 90_000;

type State =
  | { kind: "checking" }
  | { kind: "waking" }
  | { kind: "online"; confirmed: number; seconds: number }
  | { kind: "down" };

/** A live check of the RoadSense backend: how many confirmed bumps it holds and how fast it answered. */
export function BackendStatus() {
  const [state, setState] = useState<State>({ kind: "checking" });

  useEffect(() => {
    const ctrl = new AbortController();
    const start = performance.now();
    const slow = window.setTimeout(() => setState((s) => (s.kind === "checking" ? { kind: "waking" } : s)), SLOW_MS);
    const giveUp = window.setTimeout(() => ctrl.abort(), GIVE_UP_MS);

    fetch(`${API}/bumps`, { signal: ctrl.signal, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { bumps?: { confirmed?: unknown }[] }) => {
        const confirmed = Array.isArray(data.bumps) ? data.bumps.filter((b) => b?.confirmed === true).length : 0;
        setState({ kind: "online", confirmed, seconds: (performance.now() - start) / 1000 });
      })
      .catch(() => {
        if (!ctrl.signal.aborted || performance.now() - start >= GIVE_UP_MS - 50) setState({ kind: "down" });
      })
      .finally(() => {
        window.clearTimeout(slow);
        window.clearTimeout(giveUp);
      });

    return () => {
      window.clearTimeout(slow);
      window.clearTimeout(giveUp);
      ctrl.abort();
    };
  }, []);

  return (
    <p aria-live="polite" className="mono flex min-h-11 flex-wrap items-center gap-x-2 gap-y-1 text-ink-2">
      {state.kind === "online" ? (
        <>
          <span className="status-dot" aria-hidden="true" />
          <span className="text-ink">Backend online</span>
          <span aria-hidden="true">·</span>
          {state.confirmed} confirmed {state.confirmed === 1 ? "bump" : "bumps"}
          <span aria-hidden="true">·</span>
          answered in {state.seconds < 10 ? state.seconds.toFixed(1) : Math.round(state.seconds)} s
        </>
      ) : state.kind === "waking" ? (
        <>
          <span className="live-dot" aria-hidden="true" />
          Waking up the server, up to a minute on first load
        </>
      ) : state.kind === "down" ? (
        <>Backend not reachable right now. The app&rsquo;s code is on GitHub.</>
      ) : (
        <>Checking the live backend…</>
      )}
    </p>
  );
}
