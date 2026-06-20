import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Timeline", href: "#timeline" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // 1. Navbar background color change on scroll
    const trigger = ScrollTrigger.create({
      start: "top -50px",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(224, 207, 189, 0.92)",
          backdropFilter: "blur(20px)",
          borderBottomColor: "rgba(155, 13, 4, 0.15)",
          paddingTop: "16px",
          paddingBottom: "16px",
          duration: 0.3,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(224, 207, 189, 0)",
          backdropFilter: "blur(0px)",
          borderBottomColor: "rgba(155, 13, 4, 0)",
          paddingTop: "24px",
          paddingBottom: "24px",
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    // 2. Determine active section with lightweight IntersectionObserver
    const sections = ["hero", "about", "skills", "work", "timeline", "testimonials", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when centered in viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      trigger.kill();
      observer.disconnect();
    };
  }, []);

  // Handle Fullscreen Mobile Opening and Stagger Animation
  useEffect(() => {
    if (isOpen) {
      // Open
      gsap.to(mobileMenuRef.current, {
        x: "0%",
        duration: 0.6,
        ease: "power4.out",
      });

      // Stagger items
      if (mobileLinksRef.current) {
        const links = mobileLinksRef.current.children;
        gsap.fromTo(
          links,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    } else {
      // Close
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "power3.inIn",
      });
    }
  }, [isOpen]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Primary Fixed Navbar Header */}
      <header
        ref={navRef}
        id="navbar"
        className="fixed top-0 left-0 w-full z-45 border-b border-transparent py-6 px-6 md:px-12 flex justify-between items-center transition-all duration-300 pointer-events-auto bg-transparent"
      >
        {/* Left Side Branding */}
        <a
          href="#hero"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center space-x-3 group relative clickable"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#9B0D04] flex items-center justify-center font-mono font-bold text-xs text-[#9B0D04] group-hover:bg-[#9B0D04] group-hover:text-[#E0CFBD] transition-all duration-300">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-[#1A0F0A] tracking-widest uppercase">
              RAHUL RAJ
            </span>
            <span className="font-mono text-[9px] text-[#9B0D04] tracking-widest uppercase">
              CREATIVE DEVELOPER
            </span>
          </div>
        </a>

        {/* Right Side Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs text-[#5C4E43]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative px-4 py-2 hover:text-[#9B0D04] transition-all duration-300 group ${
                  isActive ? "text-[#9B0D04] font-semibold" : ""
                }`}
              >
                {link.label}
                {/* Active Indicator Underline */}
                <span
                  className={`absolute bottom-0 left-4 h-[2px] bg-[#9B0D04] transition-all duration-300 ${
                    isActive ? "w-[calc(100%-32px)]" : "w-0 group-hover:w-[calc(100%-32px)]"
                  }`}
                ></span>
              </a>
            );
          })}
        </nav>

        {/* CTA in Desktop Nav */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="px-5 py-2.5 rounded-full border border-[#9B0D04]/30 bg-transparent hover:bg-[#9B0D04] hover:text-[#E0CFBD] hover:border-transparent text-[#9B0D04] font-mono text-xs transition-all duration-300 shadow-[0_0_20px_rgba(155,13,4,0.02)] hover:shadow-[0_0_30px_rgba(155,13,4,0.25)] hover:-translate-y-0.5 inline-block font-semibold"
          >
            LET'S TALK
          </a>
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          id="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#1A0F0A] hover:text-[#9B0D04] p-2 transition-colors relative z-50 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Fullscreen Mobile Overlay Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-nav"
        className="fixed inset-0 w-full h-full bg-[#E0CFBD]/98 backdrop-blur-2xl z-40 flex items-center justify-center translate-x-full lg:hidden"
      >
        {/* Subtle Background Watermark Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#9B0D04]/3 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#1A0F0A]/3 blur-[150px] pointer-events-none"></div>

        <div className="w-full max-w-lg px-8 py-12 flex flex-col space-y-12">
          {/* Header Marker */}
          <div className="border-b border-[#9B0D04]/10 pb-4 font-mono text-xs text-[#5C4E43] uppercase tracking-widest">
            NAVIGATION INDEX
          </div>

          <div ref={mobileLinksRef} className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`text-3xl md:text-4xl font-sans font-bold hover:text-[#9B0D04] transition-all duration-300 group flex items-baseline space-x-3 ${
                    isActive ? "text-[#9B0D04]" : "text-[#1A0F0A]"
                  }`}
                >
                  <span className="font-mono text-xs text-[#D59A96] group-hover:text-[#9B0D04] transition-all duration-300">
                    ◆ {link.href === "#hero" ? "00" : `0${navLinks.indexOf(link)}`}
                  </span>
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Socials / Footer in Mobile Menu */}
          <div className="border-t border-[#9B0D04]/10 pt-8 flex flex-col space-y-4 font-mono text-xs text-[#5C4E43]">
            <span className="text-[10px] text-[#8E7B6C] uppercase tracking-wider">CONNECT WITH ME</span>
            <div className="flex space-x-6">
              <a href="https://github.com/KVSRahulraj/Zenith" target="_blank" className="hover:text-[#9B0D04] transition-colors">
                GITHUB
              </a>
              <a href="https://www.linkedin.com/feed/" target="_blank" className="hover:text-[#9B0D04] transition-colors">
                LINKEDIN
              </a>
              <span className="text-[#9B0D04]">portfolio@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
