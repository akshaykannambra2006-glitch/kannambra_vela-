"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalBackgroundVideo() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    const heroSection = document.getElementById("hero");
    
    // We create a ScrollTrigger that fades out the video as we scroll past the About section
    // The user wants the video to play during Hero and About (first 3 seconds/scrolls), 
    // then disappear entirely until they come back up.
    
    if (aboutSection) {
      ScrollTrigger.create({
        trigger: aboutSection,
        start: "bottom bottom", // When bottom of about hits bottom of viewport
        end: "+=300",           // Fade out over the next 300px of scrolling down
        scrub: true,
        onUpdate: (self) => {
          // self.progress goes from 0 to 1
          // We map this to fade the opacity from 0.25 down to 0
          if (videoRef.current) {
            videoRef.current.style.opacity = String(0.25 - (self.progress * 0.25));
          }
        },
        onLeave: () => {
             // Make sure it's completely hidden when past the section
             if (videoRef.current) videoRef.current.style.opacity = "0";
             setIsVisible(false); // Can safely unmount tracking if needed, but keeping it simple with CSS
        },
        onEnterBack: () => {
             // Turn back on when scrolling back up
             setIsVisible(true);
             if (videoRef.current) videoRef.current.style.opacity = "0";
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }} // Very low opacity so text is readable
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden pointer-events-none"
        >
          <iframe
            className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            src="https://www.youtube.com/embed/dIAGf0dCG4c?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=dIAGf0dCG4c&mute=1"
            title="Kannambra – Rishinaradamangalam Vela Background Atmosphere"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Subtle vignette over the video to soften edges */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[var(--color-charcoal-black)]/60 to-[var(--color-charcoal-black)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
