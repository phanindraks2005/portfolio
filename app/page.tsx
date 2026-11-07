import { About } from "@/components/About";
import { Bugs } from "@/components/Bugs";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Bugs />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
