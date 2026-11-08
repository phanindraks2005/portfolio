"use client";

import type { ReactNode } from "react";
import { copyEmail } from "./toast";

export function CopyEmailButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={copyEmail} className={className}>
      {children}
    </button>
  );
}
