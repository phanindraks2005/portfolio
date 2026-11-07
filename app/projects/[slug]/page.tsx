import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/ArchDiagram";
import { FeatureMedia } from "@/components/FeatureMedia";
import { LaptopFrame, PhoneFrame } from "@/components/Frames";
import { BrandIcon, GitHubIcon } from "@/components/icons";
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
  return pageMetadata({ title: `${p.name} case study`, description: p.pitch, path: `/projects/${p.slug}` });
}

const h2 = "display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] font-semibold text-ink";

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
    <main className="case" style={{ ["--c" as string]: p.color }}>
      {/* Hero */}
      <section data-glow={p.color} className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[80%]"
          style={{ background: `radial-gradient(50% 60% at 70% 20%, ${p.color}24, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-[14px] text-ink-2 transition-colors hover:text-ink">
              <ArrowLeft size={16} aria-hidden="true" />
              All projects
            </Link>
            <p className="mt-8 flex items-center gap-3 text-[14px] text-ink-2">
              <span
                className="size-2.5 rounded-full"
                style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }}
                aria-hidden="true"
              />
              {p.kind}
            </p>
            <h1 className="display mt-4 text-[clamp(3rem,7vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">{p.name}</h1>
            <p className="mt-5 max-w-[48ch] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-ink">{p.pitch}</p>
            {p.team && <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">{p.team}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[15px] font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
                  style={{ background: p.color }}
                >
                  Live demo
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.04] active:scale-[0.97]"
              >
                <GitHubIcon size={16} />
                GitHub
              </a>
            </div>
          </div>

          <div className="relative">
            {slug === "roadsense" ? (
              <div className="glow-card rounded-[24px] p-4 sm:p-6" style={{ ["--glow" as string]: p.color }}>
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

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Problem */}
        <Block id="problem" title="The problem">
          <div className="grid gap-4 text-[17px] leading-relaxed text-ink-2 lg:grid-cols-2 lg:gap-10">
            {c.problem.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </Block>

        {/* What I built */}
        <Block id="built" title="What I built">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="min-w-0">
                <article className="glow-card h-full overflow-hidden rounded-[22px]" style={{ ["--glow" as string]: p.color }}>
                  <div className="case-media border-b border-line p-4 sm:p-5">
                    {slug === "roadsense" ? (
                      <RoadSenseStage step={i} />
                    ) : s.laptop ? (
                      <div
                        className="relative overflow-hidden rounded-[10px] border border-white/10 bg-black"
                        style={{ aspectRatio: "16 / 10" }}
                      >
                        <FeatureMedia media={s.laptop} className="size-full object-cover object-top-left" />
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <h3 className="text-[18px] font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{s.text}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </div>
        </Block>

        {/* Architecture */}
        <Block id="architecture" title="How it fits together">
          <ArchDiagram arch={c.arch} color={p.color} />
        </Block>

        {/* Stack */}
        <Block id="stack" title="Tech stack, and why">
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {c.stack.map((t) => (
              <div key={t.name} className="min-w-0">
                <dt className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                  {t.icon && <BrandIcon name={t.icon} size={16} />}
                  {t.name}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{t.why}</dd>
              </div>
            ))}
          </dl>
        </Block>

        {/* Hardest problems */}
        <Block id="hardest" title="The hardest parts">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.hardest.map((h) => (
              <article key={h.title} className="glow-card flex flex-col rounded-[20px] p-6" style={{ ["--glow" as string]: p.color }}>
                <h3 className="text-[17px] font-semibold text-ink">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{h.text}</p>
                {h.href && (
                  <Link
                    href={h.href}
                    className="mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-2 text-[14px] font-medium text-accent-text hover:text-ink"
                  >
                    Read the full bug story
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Block>

        {/* Security */}
        <Block id="security" title="Security approach">
          <ul className="grid max-w-[78ch] gap-3.5">
            {c.security.map((s) => (
              <li key={s} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                <Check size={17} className="mt-[4px] shrink-0" style={{ color: p.color }} aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* Results */}
        <Block id="results" title={slug === "roadsense" ? "The rules it runs on" : "Results and verification"}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.results.map((r) => (
              <div key={r.label} className="glow-card rounded-[20px] p-6" style={{ ["--glow" as string]: p.color }}>
                <p className="display text-[clamp(1.9rem,3.4vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums">
                  {r.value}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{r.label}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Next */}
        <Block id="next" title="What I’d do next">
          <ul className="grid max-w-[78ch] gap-3.5">
            {c.next.map((n) => (
              <li key={n} className="flex gap-3 text-[16px] leading-relaxed text-ink-2">
                <ArrowRight size={17} className="mt-[4px] shrink-0" style={{ color: p.color }} aria-hidden="true" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* Prev / next */}
        <nav aria-label="More projects" className="grid grid-cols-1 gap-4 pt-8 pb-24 sm:grid-cols-2 sm:pb-32">
          <ProjectLink project={prev} dir="prev" />
          <ProjectLink project={next} dir="next" />
        </nav>
      </div>
    </main>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 sm:py-20">
      <Reveal>
        <RevealItem>
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
      className={`glow-card group flex flex-col gap-2 rounded-[22px] p-6 sm:p-8 ${dir === "next" ? "sm:items-end sm:text-right" : ""}`}
      style={{ ["--glow" as string]: p.color }}
    >
      <span className="inline-flex items-center gap-2 text-[14px] text-ink-2">
        {dir === "prev" && <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />}
        {dir === "prev" ? "Previous project" : "Next project"}
        {dir === "next" && <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />}
      </span>
      <span className="display flex items-center gap-3 text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-ink">
        <span className="size-2.5 rounded-full" style={{ background: p.color }} aria-hidden="true" />
        {p.name}
      </span>
      <span className="text-[14px] text-ink-2">{p.kind}</span>
    </Link>
  );
}
