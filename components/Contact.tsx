"use client";

import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { site } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal, RevealItem } from "./motion";
import { copyEmail } from "./toast";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-40">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(79_124_255/0.22),transparent)]"
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <RevealItem>
          <h2 className="display mx-auto max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-ink">
            Let&rsquo;s build something that ships.
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-2">
            I&rsquo;m looking for SWE internships. Email is the fastest way to reach me.
          </p>
        </RevealItem>
        <RevealItem className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent pr-5 pl-4 text-[15px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-[#6b91ff] active:scale-[0.97]"
          >
            <Copy size={16} aria-hidden="true" />
            {site.email}
          </button>
          <a
            href={`mailto:${site.email}`}
            aria-label="Write an email"
            className="grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-ink-2 transition-colors duration-300 hover:border-white/30 hover:text-ink"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30"
          >
            <LinkedInIcon size={16} />
            LinkedIn
            <ArrowUpRight size={15} className="text-muted" aria-hidden="true" />
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30"
          >
            <GitHubIcon size={16} />
            GitHub
            <ArrowUpRight size={15} className="text-muted" aria-hidden="true" />
          </a>
        </RevealItem>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 K S Phanindra. Built with Next.js and Framer Motion.</p>
        <p>
          Press <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[12px] text-ink-2">Ctrl K</kbd> to jump anywhere.
        </p>
      </div>
    </footer>
  );
}
