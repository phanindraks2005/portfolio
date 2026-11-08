"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects, site } from "@/lib/data";

type Entry = { id: number; command?: string; output: ReactNode };

const COMMANDS: [string, string][] = [
  ["help", "list the commands"],
  ["about", "who I am"],
  ["projects", "what I've built"],
  ["resume", "where to read my resume"],
  ["contact", "how to reach me"],
  ["clear", "clear the screen"],
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkClass = "text-accent-text underline decoration-accent/40 underline-offset-2 hover:decoration-accent";

const welcome = (
  <p>
    Welcome. Type <span className="text-ink">help</span> to see what I can do. Esc closes.
  </p>
);

/**
 * A small terminal in a modal <dialog>: native Escape and focus handling, Tab kept inside.
 * While it's open Lenis is stopped and the page locked; the output scrolls natively (data-lenis-prevent).
 */
export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, output: welcome }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      window.__lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      d.showModal();
      input.current?.focus();
    } else if (!open && d.open) d.close();
    if (!open) {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    }
  }, [open]);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [entries]);

  const close = () => {
    document.documentElement.style.overflow = "";
    window.__lenis?.start();
    if (dialog.current?.open) dialog.current.close();
    onClose();
  };

  const nav = (href: string, label: string) => (
    <Link href={href} onClick={close} className={linkClass}>
      {label}
    </Link>
  );

  const respond = (command: string): ReactNode => {
    switch (command) {
      case "help":
        return (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            {COMMANDS.map(([c, d]) => (
              <div key={c} className="contents">
                <dt className="text-ink">{c}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        );
      case "about":
        return (
          <p>
            {site.name}, full-stack developer in Bengaluru. B.Tech in Computer Science and Engineering at BMS College of Engineering
            (2023–2027). I build complete products, from the database schema and its security policies to the interface and the AI inside
            it. {nav("/#about", "More →")}
          </p>
        );
      case "projects":
        return (
          <ul className="grid gap-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <span style={{ color: p.color }}>●</span> {nav(`/projects/${p.slug}`, p.name)} · {p.kind}
              </li>
            ))}
          </ul>
        );
      case "resume":
        return (
          <p>
            {nav("/resume", "/resume")} to read it here, or{" "}
            <a href={site.resume} {...ext} className={linkClass}>
              resume.pdf
            </a>{" "}
            for the PDF.
          </p>
        );
      case "contact":
        return (
          <ul className="grid gap-1">
            <li>
              email{"    "}
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              linkedin{" "}
              <a href={site.linkedin} {...ext} className={linkClass}>
                in/ksphanindra
              </a>
            </li>
            <li>
              github{"   "}
              <a href={site.github} {...ext} className={linkClass}>
                phanindraks2005
              </a>
            </li>
            <li className="text-muted">Usually replies within a day.</li>
          </ul>
        );
      default:
        return (
          <p>
            command not found: {command}. Type <span className="text-ink">help</span>.
          </p>
        );
    }
  };

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    setValue("");
    setCursor(-1);
    if (!command) return;
    setHistory((h) => [command, ...h].slice(0, 30));
    if (command === "clear") return setEntries([]);
    if (command === "exit") return close();
    setEntries((e) => [...e, { id: nextId.current++, command, output: respond(command) }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(value);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === "ArrowUp" ? 1 : -1)));
      setCursor(next);
      setValue(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab" && value && !e.shiftKey) {
      const match = COMMANDS.find(([c]) => c.startsWith(value.trim().toLowerCase()));
      if (match) {
        e.preventDefault();
        setValue(match[0]);
      }
    }
  };

  // A modal dialog lets Tab leave for the browser's own toolbar; keep it cycling inside.
  const wrapTab = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab" || e.defaultPrevented) return;
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input")];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={dialog}
      onClose={close}
      onKeyDown={wrapTab}
      onClick={(e) => e.target === dialog.current && close()}
      aria-label="Terminal"
      className="terminal m-auto mt-[12vh] w-[min(640px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-line-strong bg-[#0a0c10] p-0 text-ink shadow-[0_30px_100px_-20px_rgb(0_0_0/0.8)] backdrop:bg-black/70"
    >
      <div className="flex items-center justify-between border-b border-line py-1 pr-1 pl-4">
        <p className="font-mono text-[12px] text-muted">phanindra@portfolio: ~</p>
        <button
          type="button"
          onClick={close}
          aria-label="Close terminal"
          className="grid size-11 place-items-center rounded-lg text-muted transition-colors hover:text-ink"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <div
        ref={screen}
        data-lenis-prevent
        onClick={(e) => {
          // Clicking the screen focuses the prompt, unless it was a link or the start of a text selection.
          if (!(e.target as HTMLElement).closest("a") && !window.getSelection()?.toString()) input.current?.focus();
        }}
        className="h-[min(360px,55vh)] overflow-y-auto overscroll-contain p-4 font-mono text-[13px] leading-relaxed text-ink-2 sm:text-[14px]"
      >
        <div role="log" aria-live="polite" className="grid gap-3">
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.command && (
                <p className="text-ink">
                  <span className="text-accent">$</span> {entry.command}
                </p>
              )}
              <div className="mt-1 whitespace-pre-wrap break-words">{entry.output}</div>
            </div>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2">
          <span className="text-accent" aria-hidden="true">
            $
          </span>
          <span className="sr-only">Command</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-ink caret-accent focus:outline-none sm:text-[14px]"
          />
        </label>
      </div>
    </dialog>
  );
}
