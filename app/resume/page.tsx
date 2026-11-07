import type { Metadata } from "next";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { PrintButton } from "@/components/PrintButton";
import { site } from "@/lib/data";
import { resume } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of K S Phanindra: B.Tech CSE at BMS College of Engineering (2023–2027), full-stack projects MediVault, Stride and RoadSense.",
  alternates: { canonical: "/resume" },
};

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default function ResumePage() {
  return (
    <main className="resume-page px-5 pt-28 pb-24 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[860px]">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to portfolio
          </Link>
          <div className="flex flex-wrap gap-2">
            <a
              href={site.resume}
              download="KS_Phanindra_Resume.pdf"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-accent-strong px-4 text-[14px] font-medium text-white transition-[transform,background-color] duration-300 hover:bg-accent-hover active:scale-[0.97]"
            >
              <Download size={15} aria-hidden="true" />
              Download PDF
            </a>
            <PrintButton />
          </div>
        </div>

        <article className="sheet rounded-[24px] border border-line bg-surface p-6 sm:p-12">
          <header className="text-center">
            <h1 className="display text-[clamp(2rem,5vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-ink">{resume.name}</h1>
            <p className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[14px] text-ink-2">
              <span>{resume.location}</span>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:text-ink hover:underline">
                {site.email}
              </a>
              <span aria-hidden="true">·</span>
              <a href={site.linkedin} className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline">
                <LinkedInIcon size={13} />
                {host(site.linkedin)}
              </a>
              <span aria-hidden="true">·</span>
              <a href={site.github} className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-ink hover:underline">
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
                  <dt className="text-[15px] font-semibold text-ink">{s.label}</dt>
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
                    <h3 className="text-[16px] font-semibold text-ink">
                      {p.name} <span className="font-normal text-ink-2">— {p.tagline}</span>
                    </h3>
                    <p className="flex gap-3 text-[14px]">
                      <a href={p.github} className="text-accent-text underline-offset-4 hover:underline">
                        GitHub
                      </a>
                      {p.live && (
                        <a href={p.live} className="text-accent-text underline-offset-4 hover:underline">
                          Live
                        </a>
                      )}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[14px] text-muted italic">{p.stack}</p>
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
      <h2 className="border-b border-line-strong pb-2 text-[13px] font-semibold tracking-[0.08em] text-ink uppercase">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 className="text-[16px] font-semibold text-ink">{left}</h3>
      <span className="text-[14px] text-muted">{right}</span>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 grid list-disc gap-1.5 pl-5 text-[15px] leading-relaxed text-ink-2 marker:text-muted">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
