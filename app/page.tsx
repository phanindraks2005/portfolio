import { About } from "@/components/About";
import { Bugs } from "@/components/Bugs";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Verified } from "@/components/Verified";
import { site } from "@/lib/data";

// Who this site is about, for search engines (schema.org Person).
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: ["Phanindra K S", "K. S. Phanindra"],
  jobTitle: "Software Engineer",
  description: "Full-stack software engineer and Computer Science and Engineering student at BMS College of Engineering, Bengaluru.",
  url: site.url,
  image: `${site.url}/me.jpg`,
  email: `mailto:${site.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "BMS College of Engineering", url: "https://bmsce.ac.in" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
  knowsAbout: ["Full-stack web development", "Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "FastAPI", "Flutter", "Gemini API"],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Hero />
      <Projects />
      <Bugs />
      <Verified />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
