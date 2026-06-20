import { useRef } from "react";
import { testimonialsData } from "../data";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Grouping testimonials for the three masonry columns
  const col1 = [testimonialsData[0], testimonialsData[3], testimonialsData[0], testimonialsData[3]];
  const col2 = [testimonialsData[1], testimonialsData[4], testimonialsData[1], testimonialsData[4]];
  const col3 = [testimonialsData[2], testimonialsData[1], testimonialsData[2], testimonialsData[1]];

  const RenderingColumn = ({
    items,
    speedClass,
  }: {
    items: typeof testimonialsData;
    speedClass: string;
  }) => {
    return (
      <div className="relative h-[600px] overflow-hidden select-none">
        <div
          className={`flex flex-col space-y-6 will-change-transform ${speedClass} hover:[animation-play-state:paused]`}
        >
          {items.map((item, idx) => {
            // Pick a simple 2 letter initials for default avatar display
            const initials = item.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={`test-${idx}-${item.id}`}
                className="clickable-card scale-[0.98] hover:scale-100 transition-all duration-300 bg-[#D5C3B0]/90 backdrop-blur-md border border-[#9B0D04]/10 hover:border-[#9B0D04]/30 p-6 sm:p-8 rounded-2xl flex flex-col items-start text-left relative overflow-hidden group shadow-[0_12px_24px_rgba(155,13,4,0.05)]"
                style={{ contentVisibility: "auto" }}
              >
                {/* Visual quote indicator */}
                <div className="absolute top-2 right-4 font-serif text-[100px] leading-none text-[#9B0D04]/[0.02] pointer-events-none select-none">
                  “
                </div>

                {/* Star rating indicators */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={`star-${i}`}
                      className="w-3.5 h-3.5 text-[#9B0D04]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote details */}
                <p className="font-sans text-xs sm:text-sm text-[#5C4E43] italic leading-relaxed mb-6 flex-grow select-none">
                  "{item.quote}"
                </p>

                {/* Author Details Block */}
                <div className="flex items-center space-x-4 border-t border-[#9B0D04]/10 pt-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-[#9B0D04] flex items-center justify-center font-mono font-bold text-xs text-[#E0CFBD]">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-xs text-[#1A0F0A]">
                      {item.author}
                    </span>
                    <span className="font-mono text-[9px] text-[#6E5D50] uppercase tracking-wider font-semibold">
                      {item.role}, {item.company}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative min-h-screen bg-[#E0CFBD] py-24 sm:py-32 px-6 md:px-12 select-none overflow-hidden border-b border-[#9B0D04]/10"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.03] pointer-events-none z-10"></div>
      
      {/* Background Section Number Watermark */}
      <div className="absolute top-10 left-4 font-sans font-black text-[25vw] leading-none text-[#1A0F0A]/[0.03] pointer-events-none select-none z-0">
        04
      </div>

      {/* Inline styles for vertical infinite scrolling columns */}
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }
        .animate-scroll-up-fast {
          animation: scrollUp 28s linear infinite;
        }
        .animate-scroll-up-slow {
          animation: scrollUp 38s linear infinite;
        }
        .animate-scroll-up-normal {
          animation: scrollUp 32s linear infinite;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto z-15 relative">
        {/* Header Block */}
        <div className="max-w-xl text-left mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-4 block">
            ◆ USER ADVOCACY
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#1A0F0A] tracking-tight leading-none uppercase">
            Kind Words
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#5C4E43] mt-4 leading-relaxed">
            Discover what executive creative directors and engineering leads say about working with me.
          </p>
        </div>

        {/* 3-Column Drifting Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          
          {/* Column 1 */}
          <RenderingColumn items={col1} speedClass="animate-scroll-up-normal" />

          {/* Column 2 */}
          <div className="hidden md:block">
            <RenderingColumn items={col2} speedClass="animate-scroll-up-slow" />
          </div>

          {/* Column 3 */}
          <div className="hidden lg:block">
            <RenderingColumn items={col3} speedClass="animate-scroll-up-fast" />
          </div>

        </div>
      </div>
    </section>
  );
}
