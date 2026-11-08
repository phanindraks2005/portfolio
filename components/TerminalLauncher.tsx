"use client";

import { SquareTerminal } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Terminal = dynamic(() => import("./Terminal").then((m) => m.Terminal), { ssr: false });

const OPEN_EVENT = "terminal:open";
export const openTerminal = () => window.dispatchEvent(new Event(OPEN_EVENT));

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

/** The footer's terminal button and the ~ shortcut. The terminal's code loads the first time it opens. */
export function TerminalLauncher() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const show = () => {
      setLoaded(true);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "~" || e.ctrlKey || e.metaKey || e.altKey || typing(e.target) || document.querySelector("dialog[open]")) return;
      e.preventDefault();
      show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openTerminal}
        aria-label="Open terminal"
        title="Open terminal (~)"
        aria-keyshortcuts="Shift+Backquote"
        className="grid size-11 place-items-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
      >
        <SquareTerminal size={18} aria-hidden="true" />
      </button>
      {loaded && <Terminal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
