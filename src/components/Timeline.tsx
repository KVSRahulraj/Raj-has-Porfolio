import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase } from "lucide-react";
import { experienceData } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animate the timeline central progress bar growing downwards
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );

      // 2. Slide in each entry panel based on alternate parity
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        const isLeft = index % 2 === 0;
        const xOffset = isLeft ? -80 : 80;
        const panel = item.querySelector(".timeline-panel");
        const node = item.querySelector(".timeline-node");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Scale-in the central timeline timeline center circles
        tl.fromTo(
          node,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }
        );

        // Slide panel
        tl.fromTo(
          panel,
          { x: xOffset, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen bg-[#E0CFBD] py-24 sm:py-32 px-6 md:px-12 select-none overflow-hidden border-b border-[#9B0D04]/10"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.03] pointer-events-none z-10"></div>
      
      {/* Background Section Number Watermark */}
      <div className="absolute top-10 right-4 font-sans font-black text-[25vw] leading-none text-[#1A0F0A]/[0.03] pointer-events-none select-none z-0">
        03
      </div>

      <div className="w-full max-w-5xl mx-auto z-15 relative">
        {/* Header Block */}
        <div className="max-w-xl text-left mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-4 block">
            ◆ TIMELINE & PROGRESS
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight leading-none uppercase">
            Work Experience
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5C4E43] mt-4 leading-relaxed">
            Leading engineering and creative choreography for boutique digital agencies and active enterprise marketplaces.
          </p>
        </div>

        {/* Timeline Map Container */}
        <div className="relative mt-12 sm:mt-16 pb-12 w-full">
          
          {/* Central Line Channel */}
          <div className="absolute left-[24px] sm:left-1/2 top-0 h-full w-[2px] bg-[#1A0F0A]/10 -translate-x-1/2 pointer-events-none"></div>
          
          {/* Animated Central Core Thread */}
          <div
            ref={lineRef}
            className="absolute left-[24px] sm:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#9B0D04] via-rose-800 to-[#9B0D04] -translate-x-1/2 origin-top scale-y-0 pointer-events-none shadow-[0_0_8px_rgba(155,13,4,0.2)]"
          ></div>

          {/* Core Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((item, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[idx] = el;
                  }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isLeft ? "sm:flex-row-reverse" : ""
                  } w-full`}
                  style={{ willChange: "transform, opacity" }}
                >
                  
                  {/* Invisible spacer col to anchor center alignments on Desktop */}
                  <div className="hidden sm:block w-1/2"></div>

                  {/* Tiny central pulse node orb */}
                  <div className="absolute left-[24px] sm:left-1/2 top-[32px] -translate-x-1/2 z-20 pointer-events-none">
                    <div
                      className="timeline-node w-[14px] h-[14px] rounded-full bg-[#D5C3B0] border-2 border-[#9B0D04] shadow-[0_0_15px_rgba(155,13,4,0.2)] flex items-center justify-center relative scale-0"
                      style={{ willChange: "transform" }}
                    >
                      <div className="w-[4px] h-[4px] rounded-full bg-[#9B0D04] animate-ping"></div>
                    </div>
                  </div>

                  {/* Primary text details card */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8 relative">
                    <div className="timeline-panel clickable-card bg-[#D5C3B0] border border-[#9B0D04]/10 hover:border-[#9B0D04]/20 rounded-2xl p-6 sm:p-8 shadow-[0_12px_24px_rgba(155,13,4,0.05)] transition-all duration-300 relative overflow-hidden">
                      {/* Decorative timeline visual indicator */}
                      <div className="absolute top-4 right-4 text-[#9B0D04]/15">
                        <Briefcase className="w-5 h-5" />
                      </div>

                      {/* Date Indicator Badge */}
                      <span className="inline-block px-3 py-1 bg-[#E0CFBD] border border-[#9B0D04]/10 text-[9px] sm:text-[10px] uppercase font-mono font-black tracking-widest text-[#9B0D04] rounded-full mb-4">
                        {item.duration}
                      </span>

                      {/* Header details */}
                      <h4 className="font-sans font-extrabold text-lg sm:text-xl text-[#1A0F0A] tracking-tight mb-1">
                        {item.role}
                      </h4>
                      <span className="font-sans font-bold text-xs uppercase tracking-wide text-[#5C4E43] block mb-4">
                        {item.company}
                      </span>

                      {/* Brief description copy */}
                      <p className="font-sans text-xs sm:text-sm text-[#5C4E43] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
