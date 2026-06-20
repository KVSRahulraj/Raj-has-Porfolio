import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsData } from "../data";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "design" | "tools">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const categories = [
    { id: "all", name: "All Capabilities" },
    { id: "frontend", name: "Frontend Dev" },
    { id: "design", name: "Creative Design" },
    { id: "tools", name: "Tools & Pipelines" },
  ];

  // Helper to filter skills
  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === "all") return true;
    return skill.category === activeCategory;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-in stagger reveal when scrolled into view
      gsap.fromTo(
        ".skill-pill-anim",
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.04,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: pillsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Section title slide-in
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 90%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]); // Re-run animation when active section is filtered

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#E0CFBD] flex flex-col justify-center py-24 sm:py-32 px-6 md:px-12 overflow-hidden border-b border-[#9B0D04]/10"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.04] pointer-events-none z-10"></div>
      
      {/* Background Section Number Watermark */}
      <div className="absolute top-10 left-4 font-sans font-black text-[25vw] leading-none text-[#1A0F0A]/[0.03] pointer-events-none select-none z-0">
        02
      </div>

      <div className="w-full max-w-6xl mx-auto z-15 relative">
        
        {/* Section Heading Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
          <div className="max-w-xl text-left">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-4 block">
              ◆ EXPERTISE INDEX
            </span>
            <h2
              ref={headlineRef}
              className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight leading-none uppercase animate-none"
            >
              What I Bring to the Table
            </h2>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-[10px] sm:text-xs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 pointer-events-auto cursor-pointer clickable ${
                    isActive
                      ? "bg-[#9B0D04] text-[#E0CFBD] border-transparent font-bold shadow-[0_4px_15px_rgba(155,13,4,0.25)]"
                      : "bg-[#D5C3B0] hover:bg-[#CDB9A4] border-[#9B0D04]/10 text-[#5C4E43] hover:text-[#1A0F0A]"
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scattered tag style capsules container */}
        <div
          ref={pillsContainerRef}
          className="flex flex-wrap justify-start items-center gap-4 py-6 px-1"
        >
          {filteredSkills.map((skill, index) => {
            // Assign gradient overlay colors based on categories
            const barGradient =
              skill.category === "frontend"
                ? "from-[#9B0D04] to-red-800"
                : skill.category === "design"
                ? "from-[#7D0903] to-[#9B0D04]"
                : "from-[#4A0200] to-red-950";

            return (
              <div
                key={`${skill.name}-${index}`}
                className="skill-pill-anim skill-pill clickable-card active:scale-95 transition-all duration-300 relative px-6 py-4 bg-[#D5C3B0] border border-[#9B0D04]/10 hover:border-[#9B0D04]/45 rounded-2xl flex flex-col items-start min-w-[210px] sm:min-w-[240px] flex-grow md:flex-grow-0 max-w-sm"
              >
                {/* Micro Category Code Bubble */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#6E5D50] font-semibold">
                    {skill.category === "frontend"
                      ? "ENGINE // FRONT"
                      : skill.category === "design"
                      ? "MATRIX // ARCH"
                      : "PIPELINE // TOOL"}
                  </span>
                  <span className="font-mono text-[10px] text-[#9B0D04] font-bold">
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Name */}
                <span className="font-sans font-bold text-sm sm:text-base text-[#1A0F0A] tracking-tight mb-3">
                  {skill.name}
                </span>

                {/* Skill level bar */}
                <div className="w-full h-1 bg-[#1A0F0A]/10 relative rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${barGradient} rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
