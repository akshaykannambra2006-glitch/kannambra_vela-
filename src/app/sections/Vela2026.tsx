"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import { Sparkles, Calendar, Bell, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Vela2026Section() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Background slow zoom based on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Base scale from scroll, plus hover scale
  const bgScaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgScale = isHovered ? 1.18 : bgScaleScroll;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      // Background brighten
      tl.to(".v26-bg-overlay", { opacity: 0.6, duration: 1.5, ease: "power2.out" })
        
      // Titles fade in
      tl.from(".v26-heading", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=1")
        .from(".v26-title", { opacity: 0, scale: 0.95, filter: "blur(10px)", duration: 1, ease: "power3.out" }, "-=0.6")
        .from(".v26-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.8")
        
      // Card elements
      tl.from(cardRef.current, { opacity: 0, y: 40, duration: 1, ease: "power3.out", boxShadow: "0 0 0px rgba(212,175,55,0)" }, "-=0.5")
      tl.from(".v26-card-text", { opacity: 0, y: 10, duration: 0.6 }, "-=0.4")
      
      // Icons sequence
      tl.from(".v26-icon", {
        opacity: 0, 
        scale: 0.5, 
        y: 20,
        duration: 0.6, 
        stagger: 0.2, 
        ease: "back.out(1.5)"
      }, "-=0.2")

      // Timeline sequence
      tl.from(".v26-timeline-line", { scaleX: 0, transformOrigin: "left center", duration: 1.5, ease: "power2.inOut" }, "-=0.4")
      tl.from(".v26-step", { opacity: 0, y: 10, duration: 0.6, stagger: 0.3 }, "-=1.2")
      
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Embers / dust particles
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 20,
    size: Math.random() * 3 + 1,
    isSpark: Math.random() > 0.8
  }));

  return (
    <section id="vela-2026" className="relative w-full bg-[#050505] min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center py-32 border-y border-white/5" ref={sectionRef}>
      
      {/* Cinematic Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center transition-transform duration-1000 ease-out"
        style={{ scale: bgScale }}
      >
        {/* Base deep background */}
        <div className="absolute inset-0 bg-[#0A0A0A]" />
        
        {/* Subtle temple bells & architecture silhouette texture */}
        <div className="absolute inset-0 bg-[url('/images/heritage.jpg')] bg-cover bg-center mix-blend-overlay opacity-10 grayscale-[50%]" />
        
        {/* Slow moving smoke/fog layer */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-overlay animate-[pulse_8s_ease-in-out_Infinity]" />

        {/* Faint animated silhouettes behind card */}
        <div className="absolute inset-0 overflow-hidden">
           {/* Elephants hint */}
           <motion.div 
             className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none"
             animate={{ x: ["-5%", "5%", "-5%"], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           />
           {/* Fireworks hint */}
           <motion.div 
             className="absolute top-[10%] right-[15%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(255,100,50,0.04)_0%,transparent_70%)] blur-3xl pointer-events-none"
             animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.8, 0.2] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           />
        </div>

        <div className="v26-bg-overlay absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505] opacity-90 z-[1]" />
      </motion.div>

      {/* Floating golden dust & active sparks */}
      <div className="absolute inset-0 z-[2] pointer-events-none w-full h-full overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.isSpark ? "bg-[#FFB040] blur-[1px]" : "bg-[#D4AF37] blur-[2px]"}`}
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: p.isSpark ? "0 0 10px 2px rgba(255, 122, 0, 0.4)" : "none",
              opacity: 0.1
            }}
            animate={{
              y: ["0%", "-50vh"],
              x: ["0%", `${Math.random() * 20 - 10}%`],
              opacity: [0, (isHovered && p.isSpark) ? 0.8 : (p.isSpark ? 0.5 : 0.3), 0],
              scale: isHovered ? 1.2 : 1
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
        
        {/* Subtle light beam from center */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0deg,rgba(212,175,55,0.03)_180deg,transparent_360deg)] animate-[spin_30s_linear_Infinity] pointer-events-none transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center pt-20 pb-10">
        
        <div className="text-center mb-16 relative w-full">
          <h4 className="v26-heading font-sans text-[var(--color-antique-gold)] tracking-[0.5em] text-xs md:text-sm uppercase mb-6 drop-shadow-md">
            Events & Schedule
          </h4>
          
          <h2 className="v26-title font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] tracking-widest drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] leading-none mb-8">
            VELA 2026
          </h2>
          
          <div className="v26-subtitle inline-block">
            <p className="font-sans text-[var(--color-fire-amber)] tracking-[0.3em] sm:tracking-[0.6em] md:tracking-[1em] uppercase text-xs sm:text-sm md:text-lg drop-shadow-[0_0_15px_rgba(255,100,50,0.8)] animate-[pulse_3s_ease-in-out_Infinity]">
              Events Updating Soon
            </p>
          </div>
        </div>

        {/* Cinematic Center Card */}
        <div 
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full relative group cursor-default mx-auto"
        >
          {/* Card Glow Background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative w-full bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/5 group-hover:border-[#D4AF37]/30 rounded-[2rem] p-10 md:p-16 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700">
            
            <p className="v26-card-text font-serif text-xl md:text-2xl text-white/90 italic mb-12 drop-shadow-md max-w-4xl mx-auto">
              "The full festival schedule will be revealed soon."
            </p>

            {/* Animated Icons Row */}
            <div className="flex z-20 items-center justify-center gap-8 md:gap-16 mb-16 w-full">
              {[
                { icon: <Bell className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37] opacity-80" />, label: "Procession" },
                { icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37] opacity-80" />, label: "Melam" },
                { icon: <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37]" />, label: "Fireworks" }
              ].map((item, i) => (
                <div key={i} className="v26-icon flex flex-col items-center gap-4 relative">
                  {/* Inner glowing aura */}
                  <div className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-[200ms]" />
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-black/50 border border-[#D4AF37]/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] group-hover:shadow-[inset_0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 z-10 relative">
                     {item.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Teaser */}
            <div className="w-full max-w-4xl relative mb-12 mx-auto" ref={timelineRef}>
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />
              <div className="v26-timeline-line absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent -translate-y-1/2 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
              
              <div className="relative flex justify-between w-full">
                {[
                  "Kummatti Night",
                  "Panchavadyam",
                  "Vedikkettu Finale"
                ].map((step, i) => (
                  <div key={i} className="v26-step flex flex-col items-center gap-4 filter blur-[2px] group-hover:blur-[1px] transition-all duration-700 opacity-60 group-hover:opacity-100 flex-1 relative">
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#0A0A0A] border-[2px] border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] z-10" />
                    <span className="absolute top-8 left-1/2 -translate-x-1/2 font-sans text-[9px] md:text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] whitespace-nowrap text-center">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typewriter Flicker Text */}
            <div className="mt-8 relative inline-block mx-auto mb-4">
              <span className="font-mono text-sm md:text-lg tracking-[0.5em] md:tracking-[0.8em] text-white/80 animate-[flicker_4s_linear_Infinity] group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                SCHEDULE REVEAL SOON
              </span>
              <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(212, 175, 55, 0.4);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.4;
            text-shadow: none;
          }
        }
      `}</style>
    </section>
  );
}
