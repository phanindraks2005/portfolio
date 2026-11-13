import { ArrowDown, Download, FileText } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/data";
import { HeroPhones } from "./HeroPhones";
import { GitHubIcon, LinkedInIcon } from "./icons";

const iconButton =
  "grid size-11 place-items-center rounded-full border border-line-strong bg-surface/60 text-ink-2 transition-colors duration-300 hover:border-white/30 hover:text-ink";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 text-[13px] text-ink-2">
            <span className="status-dot" aria-hidden="true" />
            Open to SWE internships &amp; full-time roles · 2027
          </p>

          <h1 className="display mt-7 text-ink">
            <span className="block text-[clamp(2.75rem,7.6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]">I&rsquo;m K S Phanindra.</span>
            <span className="mt-5 block max-w-[24ch] text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink-2">
              I build things that make everyday life easier.
            </span>
          </h1>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-relaxed text-ink-2">
            Computer Science at BMS College of Engineering, class of 2027.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent-strong px-5 text-[15px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-accent-hover active:scale-[0.97]"
            >
              View projects
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <Link
              href="/resume"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30 hover:bg-surface-2 active:scale-[0.97]"
            >
              <FileText size={16} aria-hidden="true" />
              View resume
            </Link>
            <a
              href={site.resume}
              download="KS_Phanindra_Resume.pdf"
              aria-label="Download resume as PDF"
              title="Download PDF"
              className={iconButton}
            >
              <Download size={17} aria-hidden="true" />
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={iconButton}>
              <GitHubIcon />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={iconButton}>
              <LinkedInIcon />
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-ink-2" aria-label="At a glance">
            <li>
              <span className="display text-[17px] font-semibold text-ink">3</span> products shipped
            </li>
            <li>
              <span className="display text-[17px] font-semibold text-ink">2</span> live with demos
            </li>
            <li>Bengaluru, India</li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
          <HeroPhones />
        </div>
      </div>
    </section>
  );
}
