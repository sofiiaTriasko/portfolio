import { Hero } from "@/components/Hero";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <Projects />
      <Achievements />
      <About />
      <Skills />
      <InteractiveTerminal />
      <Contact />
    </>
  );
}
