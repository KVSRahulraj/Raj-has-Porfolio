import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Animate Counter text increasing 0 -> 100
      tl.to(counterRef.current, {
        innerText: 100,
        duration: 2.0,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent =
              Math.round(parseFloat(counterRef.current.innerText)) + "%";
          }
        },
      });

      // Animate progress bar filling in sync
      tl.to(
        progressBarRef.current,
        {
          width: "100%",
          duration: 2.0,
          ease: "power2.out",
        },
        "<" // Starts at the same time as the counter
      );

      // Fade out labels slightly
      tl.to([labelRef.current, counterRef.current, progressBarRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        delay: 0.1,
      });

      // Slide up the entire preloader container
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      id="preloader"
      ref={containerRef}
      className="fixed inset-0 bg-[#E0CFBD] z-50 flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
    >
      {/* Top Details */}
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9B0D04] font-semibold">
            RAHUL RAJ // PORTFOLIO
          </span>
          <span className="font-mono text-[10px] text-[#6E5D50] mt-1 uppercase">
            CREATIVE FRONTEND DEVELOPER
          </span>
        </div>
        <div ref={labelRef} className="font-mono text-xs text-[#6E5D50] max-w-[200px] text-right leading-relaxed hidden sm:block">
          AWWWARDS-GRADE DESIGN SYSTEM & CREATIVE MOTION ENGINE v1.2
        </div>
      </div>

      {/* Main Counter Graphic */}
      <div className="flex flex-col items-start justify-center flex-grow py-12">
        <span className="font-mono text-[10px] text-[#6E5D50] uppercase tracking-widest mb-2 block">
          SYSTEM LOADING UNIT INDEXES
        </span>
        <div className="overflow-hidden h-[130px] md:h-[200px] flex items-center leading-none">
          <h1
            ref={counterRef}
            id="preloader-counter"
            className="font-sans font-black text-[22vw] md:text-[14vw] text-[#1A0F0A] leading-none tracking-tighter"
          >
            0%
          </h1>
        </div>
      </div>

      {/* Bottom Status Block & Progress Line */}
      <div className="w-full flex flex-col space-y-6">
        <div className="flex justify-between items-end font-mono text-xs text-[#6E5D50]">
          <div className="space-x-4">
            <span className="text-[#9B0D04] font-semibold animate-pulse">● INITIALIZING</span>
            <span className="hidden sm:inline text-[#D4C1AE]">|</span>
            <span className="hidden sm:inline">RESOURCES INJECTED</span>
          </div>
          <div className="text-right">
            EST. TIME: <span className="text-[#1A0F0A] font-bold">2.5s</span>
          </div>
        </div>

        {/* Progress bar boundary */}
        <div className="w-full h-[3px] bg-[#1A0F0A]/10 relative rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 h-full w-[0%] bg-gradient-to-r from-[#9B0D04] via-rose-700 to-red-950 rounded-full shadow-[0_0_12px_rgba(155,13,4,0.3)]"
          ></div>
        </div>
      </div>
    </div>
  );
}
