import { site } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { LocalTime } from "./LocalTime";
import { Reveal, RevealItem } from "./motion";
import { Em, SectionHeader } from "./SectionHeader";

const row = "group flex min-h-14 w-full items-center justify-between gap-4 border-b border-line text-left text-[15px] text-ink";
const label = "min-w-0 truncate underline-offset-4 group-hover:underline group-hover:decoration-accent";

export function Contact() {
  // Read at build time; the form only appears once the mail key exists (add it on Vercel, then redeploy).
  const formReady = Boolean(process.env.RESEND_API_KEY);
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHeader
          index="09"
          label="Contact"
          id="contact-title"
          title={
            <>
              Let&rsquo;s <Em>talk.</Em>
            </>
          }
          intro={<>Open to SWE internships &amp; full-time roles · 2027. Write here or email me.</>}
        />

        <Reveal className="grid grid-cols-1 gap-12 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <RevealItem>
            <ContactForm enabled={formReady} />
          </RevealItem>

          <RevealItem className="flex flex-col">
            <p className="mono text-ink-2">Usually replies within a day</p>
            <p className="mono mt-2 text-ink-2">
              Bengaluru · <LocalTime />
            </p>
            <div className="mt-6 border-t border-line">
              <CopyEmailButton className={row}>
                <span className={label}>
                  <span className="sr-only">Copy </span>
                  {site.email}
                </span>
                <span className="mono shrink-0 text-ink-3" aria-hidden="true">
                  Copy
                </span>
              </CopyEmailButton>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
                <span className={label}>LinkedIn</span>
                <span className="mono text-ink-3" aria-hidden="true">
                  ↗
                </span>
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={row}>
                <span className={label}>GitHub</span>
                <span className="mono text-ink-3" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
