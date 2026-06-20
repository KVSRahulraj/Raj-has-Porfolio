import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { projectsData } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // We only execute GSAP stacking effects on desktop viewports to avoid mobile clipping
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        const nextCard = cards[i + 1];
        
        // Pin configuration
        ScrollTrigger.create({
          trigger: card,
          start: "top 120px", // Pinned below the navbar
          pin: true,
          pinSpacing: false,
          end: "bottom 120px",
          invalidateOnRefresh: true,
        });

        // Scale prior card down slightly when its successor emerges
        if (nextCard) {
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          });
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative min-h-screen bg-[#E0CFBD] py-24 sm:py-32 px-6 md:px-12 select-none overflow-hidden border-b border-[#9B0D04]/10"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.03] pointer-events-none z-10"></div>

      <div className="w-full max-w-6xl mx-auto z-15 relative">
        {/* Header Block */}
        <div className="max-w-xl text-left mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-4 block">
            ◆ SELECTED WORKS
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight leading-none uppercase">
            Case Studies & Projects
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5C4E43] mt-4 leading-relaxed">
            A handpicked selection of key digital products engineered for fine dining, luxury hospitality, and high-performance commercial marketplaces.
          </p>
        </div>

        {/* Stacked Cards Layout Deck */}
        <div className="flex flex-col space-y-16 lg:space-y-24 pb-12 relative">
          {projectsData.map((project, idx) => {
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="clickable-card w-full rounded-3xl bg-[#D5C3B0] border border-[#9B0D04]/10 hover:border-[#9B0D04]/30 transition-all duration-300 p-6 md:p-10 lg:p-12 shadow-[0_25px_50px_rgba(155,13,4,0.06)] flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-[500px] relative overflow-hidden"
                style={{ willChange: "transform, opacity, scale" }}
              >
                
                {/* Embedded Glowing background element in card */}
                <div className="absolute top-[-30%] right-[-10%] w-[350px] h-[350px] bg-[#9B0D04]/3 rounded-full blur-[80px] pointer-events-none"></div>

                {/* Left Side: Mockup Image inside rounded viewport container */}
                <div className="w-full lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden relative border border-[#9B0D04]/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  
                  {/* Subtle glow border overlay */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#9B0D04]/20 rounded-2xl transition-all duration-500 z-20 pointer-events-none"></div>

                  <img
                    src={project.image}
                    alt={`${project.title} Interface Visual Mockup`}
                    referrerPolicy="no-referrer"
                    className="absolute top-0 left-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Hover visual CTA tag on image */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/30 backdrop-blur-[2px]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-[#1A0F0A] text-[#E0CFBD] font-mono font-bold text-xs uppercase flex items-center space-x-2 tracking-wider shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto"
                    >
                      <span>VIEW LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Detailed copy */}
                <div className="w-full lg:col-span-5 flex flex-col items-start text-left relative z-10 select-none">
                  
                  {/* Watermarked Big Number Index */}
                  <div className="absolute top-[-40px] right-0 font-sans font-black text-[12vw] sm:text-[10vw] lg:text-[7vw] leading-none text-[#1A0F0A]/[0.03] pointer-events-none select-none -z-10">
                    {project.number}
                  </div>

                  {/* Section Label */}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B0D04] font-semibold mb-3 block">
                    ◆ {project.category.toUpperCase()}
                  </span>

                  {/* Title */}
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#1A0F0A] tracking-tight leading-tight mb-4">
                    {project.title}
                  </h3>

                  {/* Description text */}
                  <p className="font-sans text-sm sm:text-base text-[#5C4E43] leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technology Badges Row */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="font-mono text-[9px] sm:text-[10px] text-[#6E5D50] bg-[#E0CFBD] border border-[#9B0D04]/10 py-1 px-2.5 rounded-md font-semibold"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>

                  {/* View details button links to mock drive content */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-[#9B0D04] uppercase tracking-widest flex items-center space-x-2 border-b border-transparent hover:border-[#9B0D04] pb-1 transition-all duration-300 group pointer-events-auto"
                  >
                    <span>EXPLORE SYSTEM PROJECT</span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                      →
                    </span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
