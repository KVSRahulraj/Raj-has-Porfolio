import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLParagraphElement>(null);

  const paragraphText =
    "Great designs don't just look beautiful. They make people stop scrolling, feel something, and actually remember your work. That's what I build.";

  // Split string into words array
  const words = paragraphText.split(" ");

  useEffect(() => {
    if (!textContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Query all words
      const wordSpans = textContainerRef.current?.querySelectorAll(".scroll-word");

      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          { opacity: 0.15, color: "#A08F7E" },
          {
            opacity: 1,
            color: "#9B0D04",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 80%",
              end: "bottom 40%",
              scrub: 1, // Sync animation with real scroll velocity
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="meaningful-reveal"
      ref={containerRef}
      className="relative w-full bg-[#E0CFBD] py-32 sm:py-48 px-6 md:px-12 overflow-hidden flex flex-col justify-center items-center text-center border-b border-[#9B0D04]/10"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.03] pointer-events-none z-10"></div>
      
      {/* Deep decorative ambient gold radial highlights */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#9B0D04]/4 blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-5xl mx-auto z-10 relative select-none">
        
        {/* Section Label */}
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B0D04] font-semibold mb-8 block">
          ◆ PHILOSOPHY ENGINE
        </span>

        {/* Large paragraph containing spanned words */}
        <p
          ref={textContainerRef}
          className="font-sans font-bold text-xl sm:text-3xl md:text-4xl text-left md:text-center leading-[1.8] tracking-tight max-w-4xl mx-auto flex flex-wrap justify-start md:justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 md:gap-y-2 select-none"
        >
          {words.map((word, idx) => (
            <span
              key={`reveal-word-${idx}`}
              className="scroll-word inline-block opacity-15 text-[#A08F7E] transition-colors duration-150"
              style={{ willChange: "color, opacity" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
