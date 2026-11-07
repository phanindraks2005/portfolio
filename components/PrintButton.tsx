"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-[14px] font-medium text-ink transition-colors duration-300 hover:border-white/30 active:scale-[0.97]"
    >
      <Printer size={15} aria-hidden="true" />
      Print
    </button>
  );
}
