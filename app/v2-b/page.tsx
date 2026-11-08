import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { RoadSenseMap } from "@/components/RoadSenseArt";
import { Reveal } from "@/components/v2/Reveal";
import { Yours } from "@/components/v2/Yours";
import { projects, site } from "@/lib/data";
import "../v2.css";
import "./v2b.css";

const epilogue = Epilogue({ subsets: ["latin"], weight: ["400", "500", "900"], variable: "--font-epi", display: "swap" });

export const metadata: Metadata = {
  title: "Direction B · Matchday",
  robots: { index: false },
};

const facts = ["Bengaluru", "CSE, BMS College of Engineering, 2027", "Chess: 3rd at state level", "School football team", "Athletics and the gym"];

const people = [
  {
    src: "/me.jpg",
    w: 360,
    h: 451,
    alt: "K S Phanindra, smiling, in a café",
    name: "K S Phanindra",
    role: "Bengaluru",
    q: "(b)",
    hint: "Why you started coding.",
  },
  {
    src: "/v2/chess-pieces-board.webp",
    w: 1024,
    h: 683,
    alt: "Wooden chess pieces on a board in the afternoon sun",
    name: "Chess",
    role: "3rd place, state level",
  },
  {
    src: "/v2/sree-kanteerava-stadium.webp",
    w: 1920,
    h: 1081,
    alt: "Sree Kanteerava Stadium in Bengaluru at night, floodlit, with its running track around the football pitch",
    name: "Football and athletics",
    role: "School football team, athletics, the gym",
  },
  {
    src: "/v2/me-wide.webp",
    w: 622,
    h: 451,
    alt: "K S Phanindra leaning on a wooden counter",
    name: "Off the clock",
    role: "Travel and music",
    q: "(d)",
    hint: "Something people wouldn't guess about you.",
  },
];

export default function DirectionB() {
  return (
    <div className={`vb ${epilogue.variable}`}>
      <main>
        <section id="top" className="vb-hero" aria-labelledby="vb-title">
          <div className="vb-band">
            <h1 id="vb-title">
              K S <span className="vb-nb">Phanindra</span>
            </h1>
          </div>

          <nav className="vb-links" aria-label="Main">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <Link href="/resume">Resume</Link>
            <a href="#contact">Contact</a>
          </nav>

          <div className="vb-rail-left">
            <div className="vb-tile vb-portrait">
              <Image src="/me.jpg" alt="K S Phanindra" width={360} height={451} sizes="(min-width: 900px) 22vw, 50vw" priority />
            </div>
            <ul className="vb-tile vb-facts" aria-label="Facts">
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <figure className="vb-tile vb-stage">
            <Image
              src="/v2/sree-kanteerava-stadium.webp"
              alt="Sree Kanteerava Stadium, Bengaluru, floodlit at night: a running track around a football pitch"
              width={1920}
              height={1081}
              sizes="(min-width: 900px) 60vw, 100vw"
              priority
            />
            <figcaption className="vb-statement">
              <p>
                Full-stack developer. <Yours q="(a)" hint="Who you are and what you build." />
              </p>
              <span>Sree Kanteerava Stadium, Bengaluru</span>
            </figcaption>
          </figure>

          <ul className="vb-rail-right" aria-label="Projects">
            {projects.map((p) => (
              <li key={p.slug} className="vb-tile" style={{ background: p.color }}>
                <a href={`#${p.slug}`}>
                  <strong>{p.name}</strong>
                  <span>{p.kind.split(",")[0]}</span>
                </a>
              </li>
            ))}
            <li className="vb-tile vb-grey">
              <span>Open to SWE internships &amp; full-time roles, 2027</span>
            </li>
            <li className="vb-tile vb-action">
              <a href="#work">See the work</a>
            </li>
          </ul>
        </section>

        <section id="work" className="vb-work" aria-labelledby="vb-work-title">
          <h2 id="vb-work-title" className="vb-h2">
            Work
          </h2>
          <div className="vb-folders">
            {projects.map((p) => (
              <article
                key={p.slug}
                id={p.slug}
                className="vb-folder"
                style={{ ["--c" as string]: p.color }}
                aria-labelledby={`vb-${p.slug}`}
              >
                <div className="vb-folder-strip">
                  <h3 id={`vb-${p.slug}`} className="vb-tab">
                    {p.name}
                  </h3>
                  <span>{p.kind}</span>
                </div>
                <div className="vb-folder-body">
                  <div className="vb-shot">
                    {p.laptop ? (
                      <Image src={p.laptop.src} alt={p.laptop.alt} width={1800} height={1125} sizes="(min-width: 900px) 58vw, 100vw" />
                    ) : (
                      <div className="vb-drawn">
                        <div className="vb-drawn-phone">
                          <RoadSenseMap />
                        </div>
                        <p>Drawn from the app&rsquo;s real thresholds; RoadSense has no public build.</p>
                      </div>
                    )}
                  </div>
                  <div className="vb-folder-text">
                    <p>{p.pitch}</p>
                    <p>
                      <Yours q="(c)" hint={`${p.name}: the problem that annoyed you, and what you're proudest of.`} />
                    </p>
                    <p className="vb-stack">{p.stack.join(" · ")}</p>
                    <p className="vb-folder-links">
                      <Link href={`/projects/${p.slug}`} className="vb-btn">
                        How it was built
                      </Link>
                      {p.live && <a href={p.live}>Live demo</a>}
                      <a href={p.github}>GitHub</a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="vb-about" aria-labelledby="vb-about-title">
          <div className="vb-about-pin">
            <h2 id="vb-about-title">About</h2>
          </div>
          <ul className="vb-people">
            {people.map((p) => (
              <li key={p.name}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 900px) 28vw, 72vw" />
                <h3>{p.name}</h3>
                <p className="vb-role">{p.role}</p>
                {p.q && (
                  <p>
                    <Yours q={p.q} hint={p.hint!} />
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contact" className="vb-foot" aria-labelledby="vb-foot-title">
        <div className="vb-foot-top">
          <div>
            <h2 id="vb-foot-title">Let&rsquo;s talk.</h2>
            <p>
              <Yours q="(e)" hint="The kind of team and work you want next." />
            </p>
            <a href={`mailto:${site.email}`} className="vb-btn vb-btn-accent">
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
        <p className="vb-credits">
          <span>
            Stadium: “Sree Kanteerava Stadium” by KshitizBathwal / Skyscape Photography, CC BY-SA 4.0, via Wikimedia Commons. Chess: “Chess
            pieces board”, CC0, via rawpixel.
          </span>
          <span>Direction B preview</span>
        </p>
        <p className="vb-wordmark" aria-hidden="true">
          Phanindra
        </p>
      </footer>
      <Reveal selector=".vb-folder-text, .vb-shot, .vb-people li, .vb-foot-top > *" />
    </div>
  );
}
