import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Create intro animation timeline
      const tl = gsap.timeline();

      // Slow floating loop for the background gradient orb
      gsap.to(orbRef1.current, {
        x: "50%",
        y: "30%",
        rotation: 360,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Bouncing scroll indicator loop
      gsap.fromTo(
        scrollIndicatorRef.current,
        { y: 0 },
        {
          y: 10,
          opacity: 0.8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        }
      );

      // Main staggering introduction
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );

      // Animate each headline line by finding its child word-spans
      lineRefs.current.forEach((line) => {
        if (line) {
          const spans = line.querySelectorAll(".word-span");
          tl.fromTo(
            spans,
            { yPercent: 105, skewY: 5 },
            {
              yPercent: 0,
              skewY: 0,
              stagger: 0.08,
              duration: 1.0,
              ease: "power4.out",
            },
            "-=0.75" // Overlaps sections for a rapid cinematic feel
          );
        }
      });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      tl.fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Fade in the scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // Split text helpers
  const lineOne = "I CRAFT DIGITAL".split(" ");
  const lineTwo = "EXPERIENCES THAT".split(" ");
  const lineThree = "PEOPLE REMEMBER".split(" ");

  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#E0CFBD] flex flex-col justify-center items-center px-6 md:px-12 pt-24 overflow-hidden select-none"
    >
      {/* Background Noise Grain Layout */}
      <div className="absolute inset-0 bg-noise-grain opacity-[0.05] pointer-events-none z-10"></div>

      {/* Background Subtle Gradient Orbs */}
      <div
        ref={orbRef1}
        className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#9B0D04]/8 to-transparent blur-[130px] pointer-events-none z-0"
      ></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-[#9B0D04]/4 to-transparent blur-[150px] pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <div className="w-full max-w-6xl flex flex-col justify-center items-center text-center z-20 relative">
        {/* Dynamic Badge */}
        <div
          ref={badgeRef}
          className="opacity-0 mb-8 px-4 py-1.5 rounded-full border border-[#9B0D04]/30 bg-[#9B0D04]/5 hover:border-[#9B0D04] transition-colors duration-300 flex items-center space-x-2 font-mono text-[11px] tracking-widest text-[#9B0D04] uppercase font-semibold"
        >
          <span className="w-2 h-2 bg-[#9B0D04] rounded-full animate-ping"></span>
          <span>CREATIVE ENGINE PORTFOLIO 2026</span>
        </div>

        {/* Massive Headline */}
        <div id="hero-headline" className="flex flex-col select-none uppercase font-sans font-black tracking-tighter leading-[0.9] text-[#1A0F0A]">
          {/* Headline Line 1 */}
          <div
            ref={(el) => { lineRefs.current[0] = el; }}
            className="overflow-hidden flex flex-wrap justify-center py-1 md:py-2"
          >
            {lineOne.map((word, index) => (
              <span
                key={`line1-${word}-${index}`}
                className="word-span text-[8vw] sm:text-[7vw] lg:text-[6.5vw] font-black inline-block mr-[2vw] md:mr-[1.5vw] last:mr-0 text-[#1A0F0A]"
                style={{ willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Headline Line 2 */}
          <div
            ref={(el) => { lineRefs.current[1] = el; }}
            className="overflow-hidden flex flex-wrap justify-center py-1 md:py-2"
          >
            {lineTwo.map((word, index) => (
              <span
                key={`line2-${word}-${index}`}
                className="word-span text-[8vw] sm:text-[7vw] lg:text-[6.5vw] font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1A0F0A] via-[#1A0F0A] to-[#6E5D50] mr-[2vw] md:mr-[1.5vw] last:mr-0"
                style={{ willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Headline Line 3 */}
          <div
            ref={(el) => { lineRefs.current[2] = el; }}
            className="overflow-hidden flex flex-wrap justify-center py-1 md:py-2"
          >
            {lineThree.map((word, index) => (
              <span
                key={`line3-${word}-${index}`}
                className="word-span text-[8vw] sm:text-[7vw] lg:text-[6.5vw] font-black inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#9B0D04] to-[#7D0903] mr-[2vw] md:mr-[1.5vw] last:mr-0 drop-shadow-[0_0_25px_rgba(155,13,4,0.12)]"
                style={{ willChange: "transform" }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle description */}
        <div
          ref={subtitleRef}
          className="opacity-0 max-w-xl text-center mt-10 md:mt-12 text-sm sm:text-base md:text-lg text-[#5C4E43] font-sans tracking-normal leading-relaxed"
        >
          Hello, I'm{" "}
          <span className="text-[#1A0F0A] font-bold tracking-tight">Rahul Raj</span>. I specialize
          in turning high-concept creative design into beautiful, accessible,
          and incredibly fast, animated digital experiences.
        </div>

        {/* Landing CTAs */}
        <div
          ref={ctasRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10 w-full px-4"
        >
          <a
            href="#work"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9B0D04] text-[#E0CFBD] font-mono text-xs font-bold uppercase tracking-widest text-center shadow-[0_8px_30px_rgba(155,13,4,0.15)] hover:shadow-[0_8px_35px_rgba(155,13,4,0.35)] hover:-translate-y-1.5 active:scale-95 transition-all duration-300 clickable active:duration-75"
          >
            EXPLORE WORK
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#9B0D04]/30 bg-transparent text-[#9B0D04] font-mono text-xs font-bold uppercase tracking-widest text-center hover:bg-[#9B0D04] hover:text-[#E0CFBD] hover:border-transparent hover:-translate-y-1.5 active:scale-95 transition-all duration-300 clickable active:duration-75"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 flex flex-col items-center justify-center cursor-pointer z-20 opacity-0 bg-transparent border-none outline-none"
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center justify-center p-2 focus:outline-none focus:ring-0 select-none bg-transparent appearance-none border-none outline-none clickable text-[#5C4E43] hover:text-[#9B0D04] transition-colors"
          style={{ background: "transparent", border: "none" }}
        >
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6E5D50] mb-2 font-semibold">
            SCROLL DOWN
          </span>
          <ArrowDown className="w-4 h-4 text-[#9B0D04]" />
        </button>
      </div>
    </section>
  );
}
