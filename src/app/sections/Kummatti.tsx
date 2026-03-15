"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "../components/SectionWrapper";

export default function KummattiSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow Parallax for the overarching background and cards
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Floating embers and neem leaves
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 10,
    size: Math.random() * 3 + 1,
    isLeaf: Math.random() > 0.6 // 40% chance to be a green neem leaf
  }));

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: customDelay, ease: "easeOut" as const }
    })
  };

  return (
    <section 
      ref={containerRef}
      id="kummatti" 
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-32 bg-black"
    >
      {/* =========================================
          CINEMATIC YOUTUBE BACKGROUND
      ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        {/* Scale Up container to hide youtube borders */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-h-[100vw] min-w-[177.77vh]">
          <iframe
            className="w-full h-full pointer-events-none scale-125 md:scale-105"
            src="https://www.youtube.com/embed/S36_SV9GVJQ?start=140&autoplay=1&mute=1&loop=1&playlist=S36_SV9GVJQ&controls=0&showinfo=0"
            title="Kummati Cinematic Background"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Video Overlays for Cinematic Atmosphere */}
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Reduces global brightness to 40% */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.7) 80%, #000000 100%)"
          }} 
        />
        {/* Warm Golden/Green Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.95)_100%)] z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.05)_0%,transparent_60%)] z-20 mix-blend-screen" />
      </div>

      {/* =========================================
          PARTICLE SYSTEM (Leaves & Embers)
      ========================================= */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}`}
            className="absolute bottom-[-20px] rounded-full blur-[1px]"
            style={{
              width: p.isLeaf ? p.size * 2 : p.size,
              height: p.isLeaf ? p.size * 1.2 : p.size, // leaves slightly oval
              left: `${p.x}%`,
              backgroundColor: p.isLeaf ? "#2E472D" : "#FFB040", // Neem green or Amber ember
              opacity: p.isLeaf ? (0.3 + Math.random() * 0.3) : (0.4 + Math.random() * 0.5),
              boxShadow: p.isLeaf ? "none" : "0 0 10px 2px rgba(255, 122, 0, 0.5)",
              borderRadius: p.isLeaf ? "50% 0 50% 0" : "50%" // Leaf shape css trick
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: p.isLeaf 
                ? [`${p.x}%`, `${p.x + (Math.random() * 20 - 10)}%`] // leaves drift more horizontally
                : [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`],
              rotate: p.isLeaf ? [0, 360] : 0, // leaves spin
              opacity: [0, p.isLeaf ? 0.6 : 0.8, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: p.isLeaf ? "easeInOut" : "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      {/* =========================================
          MAIN CONTENT LAYER
      ========================================= */}
      <div className="relative z-40 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-16 relative w-full"
        >
          {/* Subtle glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-[var(--color-antique-gold)]/10 blur-[60px] pointer-events-none rounded-[100%]" />
          
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--color-antique-gold)] tracking-[0.2em] md:tracking-[0.4em] uppercase drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] leading-none mb-6">
            KUMMATI
          </h2>
          
          <p className="font-sans text-[var(--color-ivory)]/80 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase max-w-2xl mx-auto border-y border-[var(--color-antique-gold)]/30 py-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The 41-day ritual that awakens the spirit of Kannambra Vela.
          </p>
        </motion.div>

        {/* 2-Column Story & Visual Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8">
          
          {/* LEFT: Story Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-6 bg-black/40 backdrop-blur-md border border-[var(--color-antique-gold)]/20 p-8 md:p-12 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Inner top highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-antique-gold)]/40 to-transparent" />
            
            <div className="space-y-6 text-white/80 font-sans leading-relaxed text-sm md:text-base border-l border-[var(--color-antique-gold)]/30 pl-6 drop-shadow-md relative z-10">
              <motion.p custom={0.1} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                The ritual of Kummati marks the spiritual beginning of the Kannambra – Rishinaradamangalam Vela season.
              </motion.p>
              
              <motion.p custom={0.3} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                The tradition begins on the day of Vishu with a sacred ceremony called <span className="text-[var(--color-antique-gold)] font-medium">Kura Natal</span>. During this ritual, long bamboo poles are placed at the Mula Sthaanam in both Rishinaradamangalam Desa Mannam and Kannambra Kavu.
              </motion.p>
              
              <motion.p custom={0.5} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                This ceremony marks the official beginning of the Vela season. From that evening onward, for 41 days, the villages come alive with the voices of children performing the Kummati ritual.
              </motion.p>

              {/* Rhythmic Chant Display */}
              <div className="py-6 my-8 border-y border-white/10 text-center relative">
                {/* Subtle soft green/gold aura behind chant */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2E472D]/20 to-transparent blur-md pointer-events-none" />
                
                <h4 className="font-serif text-[var(--color-antique-gold)] text-lg md:text-xl italic font-light mb-6 opacity-80">
                  Every evening children walk through the streets holding neem branches, chanting:
                </h4>
                
                <div className="space-y-3 font-serif text-xl sm:text-2xl md:text-3xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-wide">
                  <motion.p custom={1.2} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[#FFE8B3]">“Kuthu Kuthu Kummati</motion.p>
                  <motion.p custom={1.6} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>Arude Arude Kummati</motion.p>
                  <motion.p custom={2.0} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>Sree Kurumbha Ammayude Kummati</motion.p>
                  <motion.p custom={2.4} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-[var(--color-antique-gold)]">Aade Thulle Poo”</motion.p>
                </div>
              </div>

              <motion.p custom={3.0} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                Their chants echo through the village streets as devotion, excitement, and community spirit build toward the grand Vela.
              </motion.p>
              <motion.p custom={3.2} variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                The ritual continues every evening until the day before the Vela, when the grand Kummati celebration fills the streets with joy and tradition.
              </motion.p>
            </div>
          </motion.div>

          {/* RIGHT: Visual Collage Panel */}
          <motion.div 
            style={{ y: yParallax }}
            className="lg:col-span-6 relative h-full min-h-[500px] flex flex-col justify-center gap-8 pl-0 lg:pl-10"
          >
             {/* Main Primary Image */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, delay: 0.3 }}
               className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.9)] border border-[var(--color-antique-gold)]/30 group z-20 top-0 lg:-top-12"
             >
                <img 
                  src="/images/kuranatal-1.jpg"
                  alt="Kura Natal Ritual 1"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none mix-blend-multiply" />
             </motion.div>

             {/* Overlapping Secondary Image */}
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, delay: 0.6 }}
               className="absolute z-30 w-[65%] sm:w-[50%] lg:w-[65%] aspect-square rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.9)] border-2 border-[#111] group -bottom-10 lg:-bottom-24 right-4 lg:-right-8"
             >
                <img 
                  src="/images/kuranatal-2.jpg"
                  alt="Kura Natal Ritual 2"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter sepia-[0.1]"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
                {/* Glowing edge highlight */}
                <div className="absolute inset-0 border border-[var(--color-antique-gold)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
             </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
