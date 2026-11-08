import { ArrowUpRight, Clock3, Copy, MapPin } from "lucide-react";
import { site } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { LocalTime } from "./LocalTime";
import { Reveal, RevealItem } from "./motion";
import { SplitHeading } from "./SplitHeading";

const link =
  "flex min-h-12 items-center gap-3 rounded-xl border border-line bg-white/[0.02] px-4 text-[15px] text-ink transition-colors duration-300 hover:border-white/25";

export function Contact() {
  // Read at build time; the form only appears once the mail key exists (add it on Vercel, then redeploy).
  const formReady = Boolean(process.env.RESEND_API_KEY);
  return (
    <section id="contact" data-glow="#4f7cff" className="relative overflow-hidden py-28 sm:py-40">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(79_124_255/0.22),transparent)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="text-center">
          <SplitHeading
            text="Let’s talk."
            className="display mx-auto max-w-[16ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-ink"
          />
          <RevealItem>
            <p className="mx-auto mt-6 max-w-[46ch] text-[17px] leading-relaxed text-ink-2">
              Open to SWE internships &amp; full-time roles · 2027. Write here or email me.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <RevealItem>
            <ContactForm enabled={formReady} />
          </RevealItem>

          <RevealItem className="flex flex-col gap-3 rounded-[24px] border border-line bg-surface p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-[14px] text-ink-2">
              <Clock3 size={16} className="text-accent" aria-hidden="true" />
              Usually replies within a day
            </p>
            <p className="inline-flex items-center gap-2 text-[14px] text-ink-2">
              <MapPin size={16} className="text-accent" aria-hidden="true" />
              Bengaluru · <LocalTime />
            </p>
            <div className="mt-3 grid gap-2.5">
              <CopyEmailButton className={`${link} w-full text-left`}>
                <Copy size={16} className="shrink-0 text-muted" aria-hidden="true" />
                <span className="min-w-0 truncate">
                  <span className="sr-only">Copy </span>
                  {site.email}
                </span>
              </CopyEmailButton>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                <LinkedInIcon size={16} />
                LinkedIn
                <ArrowUpRight size={15} className="ml-auto text-muted" aria-hidden="true" />
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>
                <GitHubIcon size={16} />
                GitHub
                <ArrowUpRight size={15} className="ml-auto text-muted" aria-hidden="true" />
              </a>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
