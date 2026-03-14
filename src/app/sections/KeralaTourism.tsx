"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KeralaTourismSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        }
      });
      
      tl.from(".kt-title", { opacity: 0, y: 30, duration: 1, ease: "power3.out", stagger: 0.2 })
        .from(".kt-text", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", stagger: 0.15 }, "-=0.5")
        .from(".kt-badge", { opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Embers animation
  const embers = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 5 + Math.random() * 10,
    size: Math.random() * 3 + 1
  }));

  return (
    <section 
      ref={containerRef}
      id="kerala-tourism" 
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0F0F0F] py-32 border-y border-white/5"
    >
      {/* Background Video Layer */}
      <motion.div 
        ref={videoRef}
        style={{ scale: videoScale }}
        className="absolute top-0 left-0 w-full h-full z-0 origin-center pointer-events-none"
      >
        <iframe
          className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
          src="https://www.youtube.com/embed/a021ep5nMkI?autoplay=1&mute=1&loop=1&playlist=a021ep5nMkI&controls=0&showinfo=0&autohide=1&playsinline=1"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Reduced brightness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/40 to-[#0F0F0F] z-10" /> {/* Strong black gradient overlay seamlessly blending into page bg */}
        <div className="absolute inset-0 backdrop-blur-[4px] z-10" /> {/* Slight blur */}
        {/* Smoke texture (mix-blend) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-overlay z-10" />
      </motion.div>

      {/* Sparks floating upward */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none overflow-hidden">
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[1px]"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.x}%`,
              opacity: 0.3 + Math.random() * 0.4,
              boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.4)"
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: [`${ember.x}%`, `${ember.x + (Math.random() * 10 - 5)}%`],
              opacity: [0, 1, 0]
            }}
            transition={{
              y: { duration: ember.duration, repeat: Infinity, ease: "linear", delay: ember.delay },
              x: { duration: ember.duration, repeat: Infinity, ease: "easeInOut", delay: ember.delay },
              opacity: { duration: ember.duration, repeat: Infinity, ease: "easeOut", delay: ember.delay }
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center text-center">
        
        <div className="mb-12 kt-title">
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] mb-6 font-bold leading-tight">
            Recognized by<br/>Kerala Tourism
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="w-12 h-[1px] bg-[#D4AF37]/50" />
             <p className="font-sans text-[var(--color-antique-gold)] tracking-[0.3em] lg:tracking-[0.4em] uppercase text-sm md:text-base drop-shadow-md">
               A Cultural Celebration of Kerala
             </p>
             <div className="w-12 h-[1px] bg-[#D4AF37]/50" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8 text-white/90 font-sans text-lg md:text-xl lg:text-2xl leading-relaxed mb-16 drop-shadow-lg">
          <p className="kt-text font-medium text-white">
            For centuries, Kannambra – Rishinaradamangalam Vela has stood as one of the most vibrant temple festivals of Kerala.
          </p>
          <p className="kt-text">
            <span className="text-[#D4AF37] opacity-90">Recognized by Kerala Tourism</span>, the festival represents the spirit of Kerala's temple traditions — majestic elephant processions, powerful percussion ensembles, and spectacular fireworks that illuminate the night sky.
          </p>
          <p className="kt-text italic text-white/60 text-base md:text-lg">
            Every year thousands gather at Sree Kurumba Bhagavathy Temple in Palakkad to witness this grand celebration of devotion, culture, and community.
          </p>
        </div>

        {/* Badge Link */}
        <a 
          href="https://www.keralatourism.org/event/kannambra-vela/94/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="kt-badge group relative inline-flex flex-col items-center justify-center gap-3 p-8 rounded-3xl bg-black/50 border-[0.5px] border-[#D4AF37]/40 backdrop-blur-md hover:bg-black/70 hover:border-[#D4AF37]/80 transition-all duration-500 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] hover:-translate-y-2 cursor-pointer"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h4 className="font-serif text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D1] via-[#D4AF37] to-[#FFF5D1] tracking-wider font-bold mb-3 drop-shadow-md">
              Kerala Tourism Recognition
            </h4>
            <div className="w-24 h-[1px] bg-[#D4AF37]/40 mb-3 group-hover:w-32 transition-all duration-300" />
            <span className="text-white/70 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase group-hover:text-white transition-colors duration-300">
              Featured Festival on Kerala Tourism
            </span>
          </div>
        </a>

      </div>
    </section>
  );
}
