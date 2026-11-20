"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { bugs, type Bug } from "@/lib/bugs";
import { Reveal, RevealItem } from "./motion";
import { scrollToHash } from "./SmoothScroll";
import { Em, SectionHeader } from "./SectionHeader";

export function Bugs() {
  return (
    <section id="bugs" aria-labelledby="bugs-title" className="border-t border-line pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="02"
          label="Bugs I’ve killed"
          id="bugs-title"
          title={
            <>
              Bugs I&rsquo;ve <Em>killed</Em>
            </>
          }
          intro="Four real bugs from my own projects, how I tracked each one down, and the code that fixed it. Open one for the full story."
        />

        <Reveal as="ul" className="grid">
          {bugs.map((b) => (
            <RevealItem as="li" key={b.title} className="min-w-0 border-b border-line">
              <BugCard bug={b} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const onHashChange = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

function BugCard({ bug: b }: { bug: Bug }) {
  const hash = `#${b.id}`;
  // A link to this card ("Read the full bug story", /#bug-…) opens it, until the reader toggles it themselves.
  const targeted = useSyncExternalStore(onHashChange, () => location.hash === hash, () => false);
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? targeted;
  const id = useId();

  useEffect(() => {
    // The browser scrolled here while the card was still sliding up into place; line it up again once it has.
    const settle = location.hash === hash ? window.setTimeout(() => scrollToHash(hash), 900) : 0;
    // Same-page links can scroll without changing the hash.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && new URL((a as HTMLAnchorElement).href).hash === hash) setToggled(true);
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(settle);
    };
  }, [hash]);
  return (
    <article id={b.id} className="bug min-w-0" data-open={open || undefined}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setToggled(!open)}
          className="group grid w-full grid-cols-1 gap-x-8 gap-y-2 py-6 text-left sm:py-8 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-baseline"
        >
          <span className="mono text-ink-3">{b.project}</span>
          <span className="min-w-0">
            <span className="display block text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug text-ink">{b.title}</span>
            <span className="mt-2 block max-w-[70ch] text-[15px] leading-relaxed font-normal text-ink-2">{b.symptom}</span>
          </span>
          <span className="mono mt-2 inline-flex min-h-11 items-center self-start text-ink underline-offset-4 group-hover:underline group-hover:decoration-accent md:mt-0 md:min-h-0">
            {open ? "Close ↑" : "Read →"}
          </span>
        </button>
      </h3>
      <div id={id} className="bug-body" hidden={!open}>
        <div className="grid min-w-0 grid-cols-1 gap-6 pb-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-x-8">
          <div className="hidden md:block" aria-hidden="true" />
          <div className="grid min-w-0 gap-5">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
              <Part label="Root cause" text={b.cause} />
              <Part label="Fix" text={b.fix} />
            </div>
            <figure className="min-w-0">
              <figcaption className="mb-2 font-mono text-[12px] text-ink-3">{b.file}</figcaption>
              <pre
                data-lenis-prevent-horizontal
                className="overflow-x-auto rounded-[6px] bg-ink p-4 font-mono text-[13px] leading-[1.65] text-bg sm:p-5"
              >
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
      <p className="mono text-ink">{label}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{text}</p>
    </div>
  );
}
