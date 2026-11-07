import { ArrowDown, Download } from "lucide-react";
import { site } from "@/lib/data";
import { HeroPhones } from "./HeroPhones";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="aurora" aria-hidden="true">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="dots" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div>
          <p
            className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pr-3.5 pl-3 text-[13px] text-ink-2"
            style={{ ["--i" as string]: 0 }}
          >
            <span className="pulse" aria-hidden="true" />
            Open to SWE internships
          </p>

          <h1 className="display rise-h1 mt-7 text-[clamp(3rem,8.4vw,6rem)] leading-[0.92] font-semibold tracking-[-0.05em] text-ink">
            K S Phanindra
          </h1>

          <p className="rise mt-6 text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium text-ink" style={{ ["--i" as string]: 1 }}>
            Full-stack developer <span className="text-muted">·</span> AI-integrated web apps
          </p>
          <p className="rise mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ink-2" style={{ ["--i" as string]: 2 }}>
            I build complete products, from the Postgres schema and its security policies to the interface and the Gemini calls inside it.
            Computer science at BMS College of Engineering, class of 2027.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ ["--i" as string]: 3 }}>
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-[#6b91ff] active:scale-[0.97]"
            >
              View projects
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={site.resume}
              download="KS_Phanindra_Resume.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30 hover:bg-surface-2 active:scale-[0.97]"
            >
              <Download size={16} aria-hidden="true" />
              Download resume
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface/60 text-ink-2 transition-colors duration-300 hover:border-white/30 hover:text-ink"
            >
              <GitHubIcon />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface/60 text-ink-2 transition-colors duration-300 hover:border-white/30 hover:text-ink"
            >
              <LinkedInIcon />
            </a>
          </div>

          <ul
            className="rise mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[14px] text-ink-2"
            style={{ ["--i" as string]: 4 }}
            aria-label="At a glance"
          >
            <li>
              <span className="display text-[17px] font-semibold text-ink">3</span> products shipped
            </li>
            <li>
              <span className="display text-[17px] font-semibold text-ink">2</span> live with demos
            </li>
            <li>Bengaluru, India</li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <HeroPhones />
        </div>
      </div>
    </section>
  );
}
