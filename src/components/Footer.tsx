import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    const target = document.querySelector("#hero");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#E0CFBD] border-t border-[#9B0D04]/10 py-10 sm:py-12 px-6 md:px-12 select-none pointer-events-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="font-mono text-[10px] sm:text-xs text-[#5C4E43]">
            © 2026 RAHUL RAJ. ALL RIGHTS RESERVED.
          </p>
          <span className="font-mono text-[9px] text-[#6E5D50] uppercase tracking-widest mt-1">
            CRAFTED WITH GSAP ORCHESTRATION & SOLID DECK DESIGNS.
          </span>
        </div>

        {/* Right Side Tools (Back to top) */}
        <div className="flex items-center space-x-6">
          <div className="flex space-x-4 font-mono text-[11px] text-[#5C4E43]">
            <a href="https://github.com/KVSRahulraj/Zenith" target="_blank" rel="noreferrer" className="hover:text-[#9B0D04] transition-colors duration-300">
              GITHUB
            </a>
            <span className="text-[#9B0D04]/20">/</span>
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="hover:text-[#9B0D04] transition-colors duration-300">
              LINKEDIN
            </a>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-[#D5C3B0] hover:bg-[#9B0D04] border border-[#9B0D04]/10 text-[#5C4E43] hover:text-[#E0CFBD] hover:shadow-[0_4px_15px_rgba(155,13,4,0.15)] flex items-center justify-center transition-all duration-300 clickable cursor-pointer active:scale-95"
            aria-label="Back to top scroll button"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
