import { connection } from "next/server";
import { Suspense } from "react";
import { Clock } from "./Clock";

/** The current time in Bengaluru, rendered on the server for each request and kept ticking in the browser. */
export function LocalTime() {
  return (
    <Suspense fallback={<span>IST, UTC+5:30</span>}>
      <Now />
    </Suspense>
  );
}

async function Now() {
  await connection();
  // Rendered once per request (after connection()), so reading the clock here is intended.
  // eslint-disable-next-line react-hooks/purity
  return <Clock start={Date.now()} />;
}
