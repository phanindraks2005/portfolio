import type { Metadata } from "next";

import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { PrintButton } from "@/components/PrintButton";
import { site } from "@/lib/data";
import { resume } from "@/lib/resume";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description:
    "Resume of K S Phanindra: B.Tech CSE at BMS College of Engineering (2023–2027), full-stack projects MediVault, Stride and RoadSense.",
  path: "/resume",
});

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function ResumePage() {
  return (
    <main className="resume-page px-4 pt-24 pb-24 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-[860px]">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="mono link inline-flex min-h-11 items-center">
            ← Back to portfolio
          </Link>
          <div className="flex flex-wrap gap-2">
            <a href={site.resume} download="KS_Phanindra_Resume.pdf" className="btn btn-primary">
              Download PDF ↓
            </a>
            <PrintButton />
          </div>
        </div>

        <article className="sheet rounded-[6px] border border-line bg-surface p-6 sm:p-12">
          <header className="text-center">
            <h1 className="display text-[clamp(2rem,5vw,2.75rem)] leading-none tracking-[-0.02em] text-ink">{resume.name}</h1>
            <p className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[14px] text-ink-2">
              <span>{resume.location}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline hover:decoration-accent sm:min-h-0">
                {site.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={site.linkedin} className="inline-flex min-h-11 items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline hover:decoration-accent sm:min-h-0">
                <LinkedInIcon size={13} />
                {host(site.linkedin)}
              </a>
              <span aria-hidden="true">·</span>
              <a href={site.github} className="inline-flex min-h-11 items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline hover:decoration-accent sm:min-h-0">
                <GitHubIcon size={13} />
                {host(site.github)}
              </a>
            </p>
          </header>

          <Section title="Education">
            <Row left={resume.education.school} right={resume.education.place} />
            <p className="text-[15px] text-ink">
              {resume.education.degree} · CGPA {resume.education.cgpa}
            </p>
            <p className="text-[15px] text-ink-2">{resume.education.years}</p>
            <p className="mt-3 text-[15px] text-ink-2">
              <span className="text-ink">Areas of interest:</span> {resume.education.interests}
            </p>
          </Section>

          <Section title="Work experience">
            <div className="grid gap-6">
              {resume.experience.map((e) => (
                <div key={e.org}>
                  <Row left={e.org} right={e.place} />
                  <p className="text-[15px] text-ink-2">
                    {e.role} · {e.year}
                  </p>
                  <Bullets items={e.points} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Skills">
            <dl className="grid gap-2.5">
              {resume.skills.map((s) => (
                <div key={s.label} className="grid gap-x-4 sm:grid-cols-[190px_1fr]">
                  <dt className="text-[15px] font-medium text-ink">{s.label}</dt>
                  <dd className="text-[15px] text-ink-2">{s.items}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Projects">
            <div className="grid gap-7">
              {resume.projects.map((p) => (
                <div key={p.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[16px] font-medium text-ink">
                      {p.name} <span className="font-normal text-ink-2">— {p.tagline}</span>
                    </h3>
                    <p className="flex gap-3 text-[14px]">
                      <a href={p.github} className="inline-flex min-h-11 min-w-11 items-center text-ink underline underline-offset-4 decoration-line hover:decoration-accent sm:min-h-0 sm:min-w-0">
                        GitHub
                      </a>
                      {p.live && (
                        <a href={p.live} className="inline-flex min-h-11 min-w-11 items-center text-ink underline underline-offset-4 decoration-line hover:decoration-accent sm:min-h-0 sm:min-w-0">
                          Live
                        </a>
                      )}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[14px] text-ink-3 italic">{p.stack}</p>
                  <Bullets items={p.points} />
                </div>
              ))}
            </div>
          </Section>
        </article>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mono border-b border-ink pb-2 text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="text-[16px] font-medium text-ink">{left}</h3>
      <span className="text-[14px] text-ink-3">{right}</span>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-ink-3">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
