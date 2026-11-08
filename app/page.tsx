import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
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
      <Achievements />
      <Contact />
    </main>
  );
}
