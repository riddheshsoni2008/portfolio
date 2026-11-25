import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import JourneyIntro from "@/components/journey/JourneyIntro";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GithubActivity from "@/components/GithubActivity";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main>
        <JourneyIntro />
        <About />
        <Skills />
        <Projects />
        <GithubActivity />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
