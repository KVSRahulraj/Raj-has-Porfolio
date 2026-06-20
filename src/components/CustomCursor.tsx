import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      const touch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(touch);
      
      if (!touch) {
        document.body.classList.add("nocursor");
      } else {
        document.body.classList.remove("nocursor");
      }
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) return;

    // Outer ring quickTo
    const outerXTo = gsap.quickTo(outerRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const outerYTo = gsap.quickTo(outerRef.current, "y", { duration: 0.4, ease: "power3.out" });

    // Inner dot quickTo
    const innerXTo = gsap.quickTo(innerRef.current, "x", { duration: 0.12, ease: "power3.out" });
    const innerYTo = gsap.quickTo(innerRef.current, "y", { duration: 0.12, ease: "power3.out" });

    // Track mouse
    const moveCursor = (e: MouseEvent) => {
      outerXTo(e.clientX);
      outerYTo(e.clientY);
      innerXTo(e.clientX);
      innerYTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // MouseDown & MouseUp scale pulse animations
    const handleMouseDown = () => {
      gsap.to(outerRef.current, { scale: 0.75, duration: 0.15, ease: "power3.out" });
      gsap.to(innerRef.current, { scale: 0.5, duration: 0.15, ease: "power3.out" });
    };

    const handleMouseUp = () => {
      gsap.to(outerRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(innerRef.current, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    // Clickable Hover Effects
    const handleMouseOverClickable = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".clickable-card") ||
          target.closest(".skill-pill") ||
          target.classList.contains("clickable") ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA")
      ) {
        gsap.to(outerRef.current, {
          width: 56,
          height: 56,
          borderColor: "#9B0D04",
          backgroundColor: "rgba(155, 13, 4, 0.08)",
          borderWidth: "1.5px",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(innerRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOutClickable = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".clickable-card") ||
          target.closest(".skill-pill") ||
          target.classList.contains("clickable") ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA")
      ) {
        gsap.to(outerRef.current, {
          width: 40,
          height: 40,
          borderColor: "#9B0D04",
          backgroundColor: "rgba(155, 13, 4, 0)",
          borderWidth: "2px",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(innerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOverClickable);
    document.addEventListener("mouseout", handleMouseOutClickable);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOverClickable);
      document.removeEventListener("mouseout", handleMouseOutClickable);
      document.body.classList.remove("nocursor");
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        ref={outerRef}
        id="cursor-outer"
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#9B0D04] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-multiply"
        style={{ willChange: "transform, width, height, border-color, background-color" }}
      ></div>

      {/* Inner Pin Dot */}
      <div
        ref={innerRef}
        id="cursor-inner"
        className="fixed top-0 left-0 w-2 h-2 bg-[#9B0D04] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ willChange: "transform, opacity" }}
      ></div>
    </>
  );
}
