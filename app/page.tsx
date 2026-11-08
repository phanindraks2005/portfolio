import { About } from "@/components/About";
import { Bugs } from "@/components/Bugs";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Verified } from "@/components/Verified";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Bugs />
      <About />
      <Skills />
      <Verified />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
