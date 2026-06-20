import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Send, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const visualOrbRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow float on the decorative bottom-left green blur orb
      gsap.to(visualOrbRef.current, {
        x: "-40%",
        y: "20%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Giant headline staggers up word-by-word
      gsap.fromTo(
        wordsRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    // Simulate API request timing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success visual after some time
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  const titleWords = ["LET'S", "BUILD", "SOMETHING", "AMAZING."];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen bg-[#E0CFBD] py-24 sm:py-32 px-6 md:px-12 flex items-center justify-center overflow-hidden border-b border-[#9B0D04]/10 select-none"
    >
      <div className="absolute inset-0 bg-noise-grain opacity-[0.03] pointer-events-none z-10"></div>

      {/* Extreme blurred gradient layout orb */}
      <div
        ref={visualOrbRef}
        className="absolute bottom-[-15%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-tr from-[#9B0D04]/5 to-transparent blur-[140px] pointer-events-none -z-10"
      ></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-15 relative">
        
        {/* Left Column - Giant Staggered CTA Text & Contacts details */}
        <div className="lg:col-span-6 flex flex-col justify-center items-start text-left">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#9B0D04] font-semibold mb-6 block">
            ◆ TRANSACT SYSTEM / INBOX
          </span>

          {/* Massively animated headline lines */}
          <div className="flex flex-col space-y-2 uppercase font-sans font-black tracking-tighter leading-none text-[#1A0F0A] text-4xl sm:text-6xl md:text-7xl mb-12">
            {titleWords.map((word, index) => {
              const isAccent = index === 3;
              return (
                <div key={word} className="overflow-hidden h-14 sm:h-20 lg:h-24">
                  <div
                    ref={(el) => {
                      wordsRef.current[index] = el;
                    }}
                    className={`inline-block ${
                      isAccent
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-[#9B0D04] to-rose-800 drop-shadow-[0_0_8px_rgba(155,13,4,0.1)]"
                        : "text-[#1A0F0A]"
                    }`}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {word}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <span className="font-mono text-[10px] text-[#6E5D50] uppercase tracking-widest font-bold block">
              DIRECT CHANNELS
            </span>
            
            {/* Direct Email with premium slide underline */}
            <a
              href="mailto:portfolio@gmail.com"
              className="group flex items-center space-x-3 text-lg sm:text-xl font-sans font-bold text-[#1A0F0A] hover:text-[#9B0D04] transition-colors duration-300 relative pb-1 overflow-hidden pointer-events-auto"
            >
              <Mail className="w-5 h-5 text-[#9B0D04]" />
              <span>portfolio@gmail.com</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9B0D04] group-hover:w-full transition-all duration-300"></span>
            </a>

            {/* Social rows with minor visual offset rotate */}
            <span className="font-mono text-[10px] text-[#6E5D50] uppercase tracking-widest font-bold block pt-4">
              CREATIVE PIPELINES
            </span>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/KVSRahulraj/Zenith"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D5C3B0] hover:bg-[#9B0D04] hover:text-[#E0CFBD] border border-[#9B0D04]/10 text-[#5C4E43] hover:rotate-6 active:scale-95 flex items-center justify-center transition-all duration-300 pointer-events-auto"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D5C3B0] hover:bg-[#9B0D04] hover:text-[#E0CFBD] border border-[#9B0D04]/10 text-[#5C4E43] hover:-rotate-6 active:scale-95 flex items-center justify-center transition-all duration-300 pointer-events-auto"
                aria-label="LinkedIn Feed Link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Premium glassmorphic interface form */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <div className="w-full max-w-md bg-[#D5C3B0] border border-[#9B0D04]/10 hover:border-[#9B0D04]/20 transition-all duration-300 p-8 sm:p-10 rounded-3xl shadow-[0_20px_40px_rgba(155,13,4,0.05)] text-left relative overflow-hidden">
            
            {/* Embedded glowing green background decoration element */}
            <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-[#9B0D04]/3 rounded-full blur-[40px] pointer-events-none"></div>

            <h3 className="font-sans font-extrabold text-xl text-[#1A0F0A] tracking-tight mb-2">
              Send a Message
            </h3>
            <p className="font-sans text-xs text-[#5C4E43] mb-8 max-w-[280px]">
              Ready to construct something unique? Drop some information in the grid below.
            </p>

            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <CheckCircle className="w-16 h-16 text-[#9B0D04] animate-bounce" />
                <h4 className="font-sans font-bold text-lg text-[#1A0F0A]">Transmission complete.</h4>
                <p className="font-sans text-sm text-[#5C4E43] max-w-[280px]">
                  Thank you for reaching out! Rahul will construct a response within 24 hours.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6 pointer-events-auto">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-mono text-[9px] uppercase tracking-widest text-[#6E5D50] font-bold">
                    User Label (Name)
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                    className="w-full bg-[#E0CFBD] border border-[#9B0D04]/10 focus:border-[#9B0D04] rounded-xl px-4 py-3 text-sm text-[#1A0F0A] focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email" className="font-mono text-[9px] uppercase tracking-widest text-[#6E5D50] font-bold">
                    Direct Contact (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@example.com"
                    className="w-full bg-[#E0CFBD] border border-[#9B0D04]/10 focus:border-[#9B0D04] rounded-xl px-4 py-3 text-sm text-[#1A0F0A] focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="font-mono text-[9px] uppercase tracking-widest text-[#6E5D50] font-bold">
                    Project Matrix Specifications
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="What are we building?"
                    className="w-full bg-[#E0CFBD] border border-[#9B0D04]/10 focus:border-[#9B0D04] rounded-xl px-4 py-3 text-sm text-[#1A0F0A] focus:outline-none transition-colors duration-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9B0D04] to-rose-800 text-[#E0CFBD] font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(155,13,4,0.15)] hover:shadow-[0_4px_25px_rgba(155,13,4,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 clickable disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT SIGNAL</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
