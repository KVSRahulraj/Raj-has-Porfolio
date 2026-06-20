import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Stats numbers for counting
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal entire section (Fade & Slide UP)
      gsap.fromTo(
        [leftColRef.current, rightColRef.current],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Parallax on the photo container
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. Stats numerical count up animations
      const countUp = (target: HTMLSpanElement | null, endValue: number, suffix: string = "") => {
        if (!target) return;
        
        // Ensure starting text is "0"
        target.innerText = "0" + suffix;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: endValue,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (target) {
              target.innerText = Math.floor(obj.val) + suffix;
            }
          },
        });
      };

      countUp(stat1Ref.current, 5, "+");
      countUp(stat2Ref.current, 50, "+");
      countUp(stat3Ref.current, 20, "+");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#E0CFBD] flex items-center justify-center py-24 sm:py-32 px-6 md:px-12 overflow-hidden border-b border-[#9B0D04]/10"
    >
      {/* Background Section Number Watermark */}
      <div className="absolute top-10 right-4 font-sans font-black text-[25vw] leading-none text-[#1A0F0A]/[0.03] pointer-events-none select-none z-0">
        01
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
        
        {/* Left Column - Copy and Info */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Section Marker */}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-4 block">
            ◆ ABOUT ME
          </span>

          {/* Tagline philosophy */}
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight leading-tight mb-6">
            I turn ambitious ideas into fast, pixel-perfect interactive reality.
          </h2>

          {/* Bio text */}
          <div className="space-y-4 text-sm sm:text-base text-[#5C4E43] font-sans leading-relaxed mb-10 max-w-xl">
            <p>
              I'm <strong className="text-[#1A0F0A] font-extrabold">Rahul Raj</strong>, a designer and creative frontend engineer with 5+ years of experience constructing high-end digital spaces. I believe software shouldn't just run efficiently—it must engage our human emotions.
            </p>
            <p>
              I specialize in bridging the gap between elaborate creative design and performant, secure runtime code. Using components built with modern libraries and animated with GSAP, I craft web systems that load fast and stay memorable.
            </p>
          </div>

          {/* Key statistical parameters */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-[#9B0D04]/20 pt-8 w-full">
            <div className="flex flex-col">
              <span
                ref={stat1Ref}
                className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#9B0D04] tracking-tight mb-2 block"
              >
                0
              </span>
              <span className="font-mono text-[9px] sm:text-[11px] text-[#6E5D50] uppercase tracking-wider font-bold">
                Years Experience
              </span>
            </div>

            <div className="flex flex-col">
              <span
                ref={stat2Ref}
                className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#9B0D04] to-rose-800 tracking-tight mb-2 block"
              >
                0
              </span>
              <span className="font-mono text-[9px] sm:text-[11px] text-[#6E5D50] uppercase tracking-wider font-bold">
                Projects Completed
              </span>
            </div>

            <div className="flex flex-col">
              <span
                ref={stat3Ref}
                className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight mb-2 block"
              >
                0
              </span>
              <span className="font-mono text-[9px] sm:text-[11px] text-[#6E5D50] uppercase tracking-wider font-bold">
                Global Clients
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Conceptual Avatar / Image Overlay */}
        <div ref={rightColRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden group border border-[#9B0D04]/10 shadow-[0_20px_50px_rgba(155,13,4,0.06)]">
            
            {/* Visual glow border overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#E0CFBD]/40 via-transparent to-transparent z-10 select-none pointer-events-none"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#9B0D04]/30 rounded-2xl transition-all duration-500 z-20 pointer-events-none"></div>
            <div className="absolute -inset-1 bg-[#9B0D04]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"></div>

            {/* Inner background decorative overlay */}
            <div className="absolute inset-0 bg-[#9B0D04]/3 z-0 animate-pulse"></div>

            {/* Main Parallax Image */}
            <img
              ref={imgRef}
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop"
              alt="Rahul Raj Abstract Architecture Visual"
              referrerPolicy="no-referrer"
              className="absolute top-0 left-0 w-full h-[120%] object-cover scale-105 transition-transform duration-500 group-hover:scale-110 filter grayscale contrast-115"
              style={{ willChange: "transform" }}
            />

            {/* Bottom Floating Visual Indicator */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#E0CFBD]/95 backdrop-blur-md border border-[#9B0D04]/10 px-4 py-3 rounded-xl flex items-center justify-between shadow-lg">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-xs text-[#1A0F0A]">RAHUL RAJ</span>
                <span className="font-mono text-[8px] text-[#9B0D04] tracking-widest uppercase font-semibold">CREATIVE FOUNDER</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#9B0D04] animate-pulse"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
