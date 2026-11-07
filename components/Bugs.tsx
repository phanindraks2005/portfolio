"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { bugs, type Bug } from "@/lib/bugs";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

export function Bugs() {
  return (
    <section id="bugs" data-glow="#4f7cff" aria-labelledby="bugs-title" className="pt-12 pb-20 sm:pt-16 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <SplitHeading
            id="bugs-title"
            text="Bugs I’ve killed"
            className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] font-semibold text-ink"
          />
          <Reveal>
            <RevealItem>
              <p className="mt-5 text-[17px] leading-relaxed text-ink-2">
                Four real bugs from my own projects, how I tracked each one down, and the code that fixed it. Open one for the full story.
              </p>
            </RevealItem>
          </Reveal>
        </div>

        <Reveal className="mt-12 grid items-start gap-4 md:grid-cols-2">
          {bugs.map((b) => (
            <RevealItem key={b.title} className="min-w-0">
              <BugCard bug={b} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BugCard({ bug: b }: { bug: Bug }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  // A link to this card ("Read the full bug story", /#bug-…) opens it, on arrival or from the same page.
  useEffect(() => {
    const hash = `#${b.id}`;
    if (location.hash === hash) setOpen(true);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && new URL((a as HTMLAnchorElement).href).hash === hash) setOpen(true);
    };
    const onHash = () => location.hash === hash && setOpen(true);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [b.id]);
  return (
    <article
      id={b.id}
      className="glow-card bug min-w-0 rounded-[22px]"
      style={{ ["--glow" as string]: b.color }}
      data-open={open || undefined}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start gap-4 rounded-[22px] p-6 text-left sm:p-7"
        >
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-[13px] font-medium" style={{ color: b.color }}>
              <span className="size-1.5 rounded-full" style={{ background: b.color }} aria-hidden="true" />
              {b.project}
            </span>
            <span className="display mt-2.5 block text-[20px] leading-snug font-semibold text-ink">{b.title}</span>
            <span className="mt-2.5 block text-[15px] leading-relaxed font-normal text-ink-2">{b.symptom}</span>
          </span>
          <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-ink-2">
            <ChevronDown size={16} className="bug-chevron transition-transform duration-300" aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div id={id} className="bug-body" hidden={!open}>
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-5 px-6 pb-7 sm:px-7">
            <Part label="Root cause" text={b.cause} />
            <Part label="Fix" text={b.fix} />
            <figure className="min-w-0">
              <figcaption className="mb-2 font-mono text-[12px] text-muted">{b.file}</figcaption>
              <pre className="overflow-x-auto rounded-[14px] border border-line bg-[#0a0b0e] p-4 font-mono text-[12.5px] leading-[1.65] text-ink-2">
                <code>{b.code}</code>
              </pre>
            </figure>
          </div>
        </div>
      </div>
    </article>
  );
}

function Part({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-ink">{label}</p>
      <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{text}</p>
    </div>
  );
}
