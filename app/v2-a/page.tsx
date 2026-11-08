import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FileRail } from "@/components/v2/FileRail";
import { Reveal } from "@/components/v2/Reveal";
import { Yours } from "@/components/v2/Yours";
import { experience, projects, site } from "@/lib/data";
import { stories } from "@/lib/stories";
import "../v2.css";
import "./v2a.css";

const brico = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-brico", display: "swap" });

export const metadata: Metadata = {
  title: "Direction A · Scoresheet",
  robots: { index: false },
};

const stride = projects.find((p) => p.slug === "stride")!;
const others = projects.filter((p) => p.slug !== "stride");

export default function DirectionA() {
  return (
    <div className={`va ${brico.variable}`}>
      <header className="va-head va-frame">
        <a href="#top" className="va-mark" aria-label="K S Phanindra, back to the top">
          <BoardMark />
        </a>
        <nav aria-label="Main">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <Link href="/resume">Resume</Link>
        </nav>
      </header>

      <FileRail />

      <main>
        <section id="top" className="va-hero va-frame" aria-labelledby="va-title">
          <h1 id="va-title" className="va-display">
            <span className="va-line">
              <span>K S</span>
            </span>
            <span className="va-line va-line-right">
              <span>Phanindra</span>
            </span>
          </h1>
          <div className="va-hero-foot">
            <p className="va-lead">
              Full-stack developer, Bengaluru. <Yours q="(a)" hint="Who you are and what you build, in one or two casual sentences." />
            </p>
            <a href="#work" className="va-btn">
              See the work
            </a>
          </div>
        </section>

        <section id="work" className="va-work" aria-labelledby="va-work-title">
          <div className="va-frame">
            <h2 id="va-work-title" className="va-h2">
              <Square sq="e3" dark />
              Work
            </h2>
          </div>

          <article className="va-block" aria-labelledby="va-stride">
            <div className="va-visual">
              <Image
                src={stride.laptop!.src}
                alt={stride.laptop!.alt}
                width={1800}
                height={1125}
                sizes="(min-width: 900px) 62vw, 110vw"
              />
            </div>
            <div className="va-cluster">
              <Image src="/shots/stride-libra.webp" alt="Libra's chat in Stride, with logged entries shown as chips" width={1800} height={1125} sizes="(min-width: 900px) 26vw, 70vw" />
              <div className="va-cluster-row">
                <h3 id="va-stride" className="va-h3">
                  Stride
                  <span>Habits and fitness</span>
                </h3>
                <div className="va-cluster-text">
                  <p>{stride.pitch}</p>
                  <p>
                    <Yours q="(c)" hint="What annoyed you enough to build it, and the one thing you're proudest of." />
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="va-frame">
            <ol className="va-moves" aria-label="What Stride does">
              {stories.stride.map((s) => (
                <li key={s.title}>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="va-links">
              <a href={stride.live} className="va-btn">
                Open the live demo
              </a>
              <Link href="/projects/stride">Read how it was built</Link>
              <a href={stride.github}>Code on GitHub</a>
            </p>
          </div>

          <ul className="va-next va-frame" aria-label="The other projects">
            {others.map((p) => (
              <li key={p.slug} style={{ background: p.color }}>
                <Link href={`/projects/${p.slug}`}>
                  <strong>{p.name}</strong>
                  <span>{p.kind}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <figure className="va-map">
          <Image
            src="/v2/bangalore-map-1878.webp"
            alt="An 1878 survey map of Bangalore Taluk: roads, tanks and villages around the town"
            width={1920}
            height={1757}
            sizes="100vw"
          />
          <figcaption className="va-frame">Bangalore Taluk, surveyed 1878.</figcaption>
        </figure>

        <section id="about" className="va-about va-frame" aria-labelledby="va-about-title">
          <div className="va-about-row">
            <div className="va-side">
              <Image src="/me.jpg" alt="K S Phanindra, smiling, in a café" width={360} height={451} sizes="(min-width: 900px) 24vw, 60vw" />
              <dl>
                <div>
                  <dt>Based in</dt>
                  <dd>Bengaluru</dd>
                </div>
                <div>
                  <dt>Studying</dt>
                  <dd>B.Tech CSE, BMS College of Engineering, 2023–2027</dd>
                </div>
                <div>
                  <dt>Chess</dt>
                  <dd>3rd place, state level</dd>
                </div>
              </dl>
            </div>
            <div className="va-about-main">
              <h2 id="va-about-title" className="va-h2">
                <Square sq="e4" />
                About
              </h2>
              <p className="va-statement">
                <Yours q="(b)" hint="Why you started coding." />
              </p>
              <p className="va-statement">
                <Yours q="(d)" hint="Something people wouldn't guess about you." />
              </p>
                <div className="va-record va-record-lists">
                <div>
                  <h3>Experience</h3>
                  <ul>
                    {experience.map((e) => (
                      <li key={e.title}>
                        <span>
                          {e.title.split(",")[0]}, {e.org.split(",")[0]}
                        </span>
                        <span>{e.year}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Off the screen</h3>
                  <ul>
                    <li>
                      <span>Chess, state level</span>
                      <span>3rd</span>
                    </li>
                    <li>
                      <span>School football team</span>
                      <span>GEM</span>
                    </li>
                    <li>
                      <span>Athletics and the gym</span>
                      <span />
                    </li>
                    <li>
                      <span>Travel and music</span>
                      <span />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>

      <footer id="contact" className="va-foot" aria-labelledby="va-foot-title">
        <div className="va-frame va-foot-top">
          <div>
            <h2 id="va-foot-title" className="va-invite">
              <Square sq="e5" dark />
              Let&rsquo;s talk.
            </h2>
            <p className="va-foot-next">
              <Yours q="(e)" hint="The kind of team and work you want next." />
            </p>
            <a href={`mailto:${site.email}`} className="va-btn va-btn-light">
              Email me
            </a>
          </div>
          <ul>
            <li>
              <a href={site.github}>GitHub</a>
            </li>
            <li>
              <a href={site.linkedin}>LinkedIn</a>
            </li>
            <li>
              <Link href="/resume">Resume</Link>
            </li>
          </ul>
        </div>
        <p className="va-frame va-credits">
          <span>Map: “Bangalore map 1878”, Government of India, public domain, via Wikimedia Commons.</span>
          <span>Direction A preview</span>
        </p>
        <p className="va-wordmark" aria-hidden="true">
          Phanindra
        </p>
      </footer>
      <Reveal selector=".va-moves li, .va-cluster, .va-next li, .va-statement, .va-side, .va-record-lists > div, .va-foot-top > *" />
    </div>
  );
}

function Square({ sq, dark = false }: { sq: string; dark?: boolean }) {
  return <span className={`va-sq ${dark ? "dark" : "light"}`}>{sq}</span>;
}

/** A 4×4 corner of a board: the site's mark. */
function BoardMark() {
  const cells = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if ((r + c) % 2 === 1) cells.push(<rect key={`${r}${c}`} x={c * 6} y={r * 6} width="6" height="6" />);
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <rect width="24" height="24" fill="#fff" />
      <g fill="currentColor">{cells}</g>
    </svg>
  );
}
