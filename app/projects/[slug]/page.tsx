import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/ArchDiagram";
import { FeatureMedia } from "@/components/FeatureMedia";
import { LaptopFrame, PhoneFrame } from "@/components/Frames";
import { Reveal, RevealItem } from "@/components/motion";
import { RoadSenseStage } from "@/components/RoadSenseStage";
import { cases } from "@/lib/cases";
import { projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { stories } from "@/lib/stories";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.name} case study`, description: `${p.name}, ${p.kind.toLowerCase()}. ${p.pitch}`, path: `/projects/${p.slug}` });
}

const h2 = "display mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] text-ink";
const pad = (n: number) => String(n).padStart(2, "0");

export default async function CaseStudy({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const p = projects[index];
  const c = cases[slug];
  const steps = stories[slug];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const first = steps[0];

  return (
    <main className="case">
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-24">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Link href="/#projects" className="mono link inline-flex min-h-11 items-center">
              ← All projects
            </Link>
            <p className="mono mt-8 text-ink-3">
              {pad(index + 1)} / Case study · {p.kind}
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-ink">{p.name}</h1>
            <p className="mt-5 max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-ink">{p.pitch}</p>
            {p.team && <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">{p.team}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live demo ↗
                </a>
              )}
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Code ↗
              </a>
            </div>
          </div>

          <div className="relative">
            {slug === "roadsense" ? (
              <div className="surface-card p-3 sm:p-5">
                <RoadSenseStage step={3} />
              </div>
            ) : (
              <div className="relative pr-[9%] pb-[2%]">
                <LaptopFrame>
                  <Image
                    src={first.laptop!.poster}
                    alt={first.laptop!.alt}
                    fill
                    preload
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 600px, 92vw"
                    className="object-cover object-top-left"
                  />
                </LaptopFrame>
                {first.phone && (
                  <div className="absolute right-0 bottom-0 w-[22%]">
                    <PhoneFrame>
                      <Image src={first.phone.poster} alt={first.phone.alt} fill sizes="140px" className="object-cover object-top" />
                    </PhoneFrame>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <Block n={1} id="problem" title="The problem">
          <div className="grid gap-4 text-[17px] leading-[1.6] text-ink-2 lg:grid-cols-2 lg:gap-10">
            {c.problem.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Block>

        <Block n={2} id="built" title="What I built">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="min-w-0">
                <article className="surface-card h-full overflow-hidden">
                  <div className="border-b border-line p-3 sm:p-4">
                    {slug === "roadsense" ? (
                      <RoadSenseStage step={i} />
                    ) : s.laptop ? (
                      <div className="relative overflow-hidden rounded-[4px] border border-line bg-ink" style={{ aspectRatio: "16 / 10" }}>
                        <FeatureMedia media={s.laptop} className="size-full object-cover object-top-left" />
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <p className="mono text-ink-3">{pad(i + 1)}</p>
                    <h3 className="display mt-2 text-[19px] text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </div>
        </Block>

        <Block n={3} id="architecture" title="How it fits together">
          <ArchDiagram arch={c.arch} />
        </Block>

        <Block n={4} id="stack" title="Tech stack and why I chose it">
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {c.stack.map((t) => (
              <div key={t.name} className="min-w-0 border-t border-line pt-4">
                <dt className="mono text-ink">{t.name}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{t.why}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block n={5} id="hardest" title="The hardest parts">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.hardest.map((h) => (
              <article key={h.title} className="surface-card flex flex-col p-6">
                <h3 className="display text-[19px] text-ink">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{h.text}</p>
                {h.href && (
                  <Link href={h.href} className="mono link mt-auto inline-flex min-h-11 items-center self-start pt-2">
                    Read the full bug story →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Block>

        <Block n={6} id="security" title="Security approach">
          <ul className="grid max-w-[78ch] border-t border-line">
            {c.security.map((s, i) => (
              <li key={s} className="flex gap-4 border-b border-line py-3.5 text-[16px] leading-relaxed text-ink-2">
                <span className="mono shrink-0 pt-1 text-ink-3">{pad(i + 1)}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block n={7} id="results" title={slug === "roadsense" ? "The rules it runs on" : "Results"}>
          <div className="grid grid-cols-1 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.results.map((r) => (
              <div key={r.label} className="bg-bg py-7 sm:px-6">
                <p className="display text-[clamp(1.9rem,3.4vw,2.5rem)] leading-none tracking-[-0.03em] text-ink tabular-nums">{r.value}</p>
                <p className="mono mt-4 leading-relaxed text-ink-2">{r.label}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block n={8} id="next" title="What I’d do next">
          <ul className="grid max-w-[78ch] border-t border-line">
            {c.next.map((n) => (
              <li key={n} className="flex gap-4 border-b border-line py-3.5 text-[16px] leading-relaxed text-ink-2">
                <span className="mono shrink-0 pt-1 text-ink-3" aria-hidden="true">
                  →
                </span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Block>

        <nav aria-label="More projects" className="grid grid-cols-1 gap-4 border-t border-line pt-10 pb-24 sm:grid-cols-2 sm:pb-32">
          <ProjectLink project={prev} dir="prev" />
          <ProjectLink project={next} dir="next" />
        </nav>
      </div>
    </main>
  );
}

function Block({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 sm:py-20">
      <Reveal>
        <RevealItem>
          <p className="mono text-ink-3">{pad(n)}</p>
          <h2 id={`${id}-title`} className={h2}>
            {title}
          </h2>
        </RevealItem>
        <RevealItem className="mt-8 sm:mt-10">{children}</RevealItem>
      </Reveal>
    </section>
  );
}

function ProjectLink({ project: p, dir }: { project: (typeof projects)[number]; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className={`surface-card card-hover flex flex-col gap-2 p-6 sm:p-8 ${dir === "next" ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="mono text-ink-3">{dir === "prev" ? "← Previous project" : "Next project →"}</span>
      <span className="display text-[clamp(1.6rem,3vw,2.2rem)] text-ink">{p.name}</span>
      <span className="text-[14px] text-ink-2">{p.kind}</span>
    </Link>
  );
}
