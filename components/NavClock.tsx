"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Kolkata",
});

/** Bengaluru time, to the second. Filled in after hydration so the server and the browser agree. */
export function NavClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`mono tabular-nums text-ink-2 ${className}`}>
      <span className="sr-only">Time in Bengaluru: </span>
      {now === null ? "--:--:--" : format.format(now)} IST
    </span>
  );
}
