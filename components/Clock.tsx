"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });

/** Starts from the server's time (so the first paint already shows it) and updates every 30 s. */
export function Clock({ start }: { start: number }) {
  const [now, setNow] = useState(start);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{format.format(now)} IST</span>;
}
