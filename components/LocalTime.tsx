"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });

/** The current time in Bengaluru, updated each minute. Renders a placeholder until mounted to avoid a hydration mismatch. */
export function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}
