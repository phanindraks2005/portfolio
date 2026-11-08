"use client";

import { usePathname } from "next/navigation";

/** The v2 preview pages bring their own header and footer, so the current site's chrome stays off there. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path?.startsWith("/v2-")) return null;
  return <>{children}</>;
}
