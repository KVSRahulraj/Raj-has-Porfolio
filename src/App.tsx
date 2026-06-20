import { useState } from "react";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TextReveal from "./components/TextReveal";
import Timeline from "./components/Timeline";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#E0CFBD] text-[#1A0F0A] overflow-x-hidden font-sans selection:bg-[#9B0D04] selection:text-[#E0CFBD]">
      {/* 1. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 2. Loading Preloader Overlay (Mounts and runs immediately on refresh, calling onComplete when done) */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* 3. Primary Header Navigation */}
      {isLoaded && <Navbar />}

      {/* 4. Page Scroll Layout Structure */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Hero Landing */}
        <Hero isLoaded={isLoaded} />

        {/* Triple infinite marquee scroll list */}
        {isLoaded && (
          <>
            <Marquee />
            
            {/* About description & countups */}
            <About />

            {/* Interactive category filtered skills group */}
            <Skills />

            {/* Piled stacked cards projects gallery */}
            <Projects />

            {/* Cinematic text scroll scrub revealer */}
            <TextReveal />

            {/* Alternating experience path tracking */}
            <Timeline />

            {/* Slow drifting testimonials reviews columns */}
            <Testimonials />

            {/* High-end contact details and submission form */}
            <Contact />
          </>
        )}
      </main>

      {/* 5. Small Footer Brandings Row */}
      {isLoaded && <Footer />}
    </div>
  );
}
