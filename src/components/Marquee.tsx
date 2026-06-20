import { useRef } from "react";

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  const keywordsStrip1 = [
    "Creative Frontend Dev",
    "Animation Specialist",
    "GSAP ScrollTrigger",
    "React / Next.js",
    "Three.js & WebGL",
    "Performance Guru",
    "Visual Storytelling",
  ];

  const keywordsStrip2 = [
    "Luxury Digital Styling",
    "Awwwards Style Motion",
    "Interactive UI/UX",
    "Cinematic Experience",
    "Pixel Perfect Code",
    "Corporate Brand identity",
  ];

  const keywordsStrip3 = [
    "Accessibility Auditing",
    "Speed Optimization",
    "Modern Tailwind Core",
    "Figma To Real App",
    "Server-side API Proxy",
    "Pure CSS Keyframes",
  ];

  // Helper custom SVGs to intersperse
  const StarIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#9B0D04] mx-4 inline-block shadow-[0_0_8px_rgba(155,13,4,0.3)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const DiamondIcon = () => (
    <svg className="w-3.5 h-3.5 text-[#9B0D04] mx-4 inline-block shadow-[0_0_8px_rgba(155,13,4,0.3)]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2z" />
    </svg>
  );

  const CircleIcon = () => (
    <span className="w-2.5 h-2.5 rounded-full bg-[#9B0D04] mx-4 inline-block opacity-80 shadow-[0_0_8px_rgba(155,13,4,0.3)]"></span>
  );

  // Triple render to guarantee seamless scroll loop across wider monitors
  const MarqueeRow = ({
    items,
    speedClass,
    iconType,
    direction = "left",
  }: {
    items: string[];
    speedClass: string;
    iconType: "star" | "diamond" | "circle";
    direction: "left" | "right";
  }) => {
    const renderedItems = [...items, ...items, ...items, ...items];
    const selectIcon = (type: string, i: number) => {
      if (type === "star") return <StarIcon key={`icon-${i}`} />;
      if (type === "diamond") return <DiamondIcon key={`icon-${i}`} />;
      return <CircleIcon key={`icon-${i}`} />;
    };

    return (
      <div className="w-full overflow-hidden whitespace-nowrap flex group py-2 md:py-3.5">
        <div
          className={`flex whitespace-nowrap will-change-transform ${speedClass} ${
            direction === "right" ? "hover:[animation-play-state:paused]" : "hover:[animation-play-state:paused]"
          }`}
        >
          {renderedItems.map((item, index) => (
            <div key={`item-${index}`} className="inline-flex items-center select-none font-mono text-[11px] md:text-sm font-black uppercase tracking-[0.2em] text-[#1A0F0A]">
              <span className="mr-2 text-[#1A0F0A]/95">{item}</span>
              {selectIcon(iconType, index)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="marquee-ticker"
      ref={containerRef}
      className="relative z-20 py-16 bg-[#D5C3B0] overflow-hidden flex flex-col justify-center space-y-4 border-t border-b border-[#9B0D04]/10"
    >
      {/* Inline styles for keyframe animations (scrolling) */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translate3d(-33.3333%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-scroll-left-normal {
          animation: scrollLeft 35s linear infinite;
        }
        .animate-scroll-right-normal {
          animation: scrollRight 35s linear infinite;
        }
        .animate-scroll-left-fast {
          animation: scrollLeft 22s linear infinite;
        }
      `}</style>

      {/* Slightly Rotated Wrapper Container */}
      <div className="-rotate-1 sm:-rotate-2 scale-[1.03] flex flex-col space-y-3 md:space-y-4">
        {/* Strip 1: Scrolls LEFT */}
        <div className="bg-gradient-to-r from-[#9B0D04]/5 via-[#D5C3B0] to-[#9B0D04]/5 border-y border-[#9B0D04]/10 py-1">
          <MarqueeRow
            items={keywordsStrip1}
            speedClass="animate-scroll-left-normal"
            iconType="star"
            direction="left"
          />
        </div>

        {/* Strip 2: Scrolls RIGHT */}
        <div className="bg-gradient-to-r from-[#9B0D04]/5 via-[#D5C3B0] to-[#9B0D04]/5 border-y border-[#9B0D04]/10 py-1">
          <MarqueeRow
            items={keywordsStrip2}
            speedClass="animate-scroll-right-normal"
            iconType="diamond"
            direction="right"
          />
        </div>

        {/* Strip 3: Scrolls LEFT FASTER */}
        <div className="bg-gradient-to-r from-[#9B0D04]/8 via-[#D5C3B0] to-[#9B0D04]/8 border-y border-[#9B0D04]/10 py-1">
          <MarqueeRow
            items={keywordsStrip3}
            speedClass="animate-scroll-left-fast"
            iconType="circle"
            direction="left"
          />
        </div>
      </div>
    </section>
  );
}
