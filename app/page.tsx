import { About } from "@/components/About";
import { CommandPalette } from "@/components/CommandPalette";
import { Contact, Footer } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { GlowTracker } from "@/components/GlowTracker";
import { Hero } from "@/components/Hero";
import { MotionProvider } from "@/components/motion";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Toaster } from "@/components/toast";

export default function Home() {
  return (
    <MotionProvider>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Toaster />
      <GlowTracker />
    </MotionProvider>
  );
}
