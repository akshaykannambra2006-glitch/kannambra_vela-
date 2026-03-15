"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const instruments = [
  { 
    id: "chenda",
    name: "Chenda", 
    description: "The powerful lead percussion",
    image: "/images/chenda.png",
    type: "split" 
  },
  { 
    id: "kombu",
    name: "Kombu", 
    description: "The majestic c-shaped brass horn",
    image: "/images/kombu.png",
    type: "arc"
  },
  { 
    id: "ilathalam",
    name: "Ilathalam", 
    description: "The miniature cymbals setting the tempo",
    image: "/images/ilathalam.png",
    type: "cymbals"
  },
  { 
    id: "kurumkuzhal",
    name: "Kurumkuzhal", 
    description: "The piercing short double reed",
    image: "/images/kurumkuzhal.png",
    type: "float"
  },
];

export default function PanchavadyamSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredInstrument, setHoveredInstrument] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Intro Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Cinematic fade-in of the title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  // Generate embers
  const embers = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 10,
    size: Math.random() * 3 + 2
  }));

  const vibrateVariants = {
    playing: {
      y: [0, -1, 1, -1, 0],
      x: [0, 1, -1, 0, 1],
      transition: {
        duration: 0.5, // Matches a fast tempo beat
        repeat: Infinity,
        ease: "linear" as const
      }
    },
    stopped: { y: 0, x: 0 }
  };

  return (
    <SectionWrapper id="panchavadyam" className="bg-[#050505] min-h-screen py-32 relative overflow-hidden">
      
      {/* Container with optional vibration when playing */}
      <motion.div 
        ref={containerRef} 
        className="relative w-full h-full"
        variants={vibrateVariants}
        animate={isPlaying ? "playing" : "stopped"}
      >

        {/* 1. Cinematic Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/80 to-[#050505] z-10 pointer-events-none" />

        {/* 2. Cinematic YouTube Video Background (Layer 0) */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 z-[0] overflow-hidden pointer-events-none mix-blend-screen"
            >
              <iframe
                className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none saturate-50 contrast-125 sepia-50 blur-[2px]"
                src="https://www.youtube.com/embed/V1vrgMbjgg4?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=V1vrgMbjgg4"
                title="Panchavadyam Audio Background"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. Global Glowing Ember Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {embers.map((ember) => (
            <motion.div
              key={ember.id}
              className="absolute bottom-[-10px] rounded-full bg-[var(--color-fire-amber)] blur-[1px]"
              style={{
                width: ember.size,
                height: ember.size,
                left: `${ember.x}%`,
                boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.6)"
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: [`${ember.x}%`, `${ember.x + (Math.random() * 10 - 5)}%`],
                opacity: isPlaying ? [0, 0.8, 0] : [0, 0.4, 0]
              }}
              transition={{
                y: { duration: ember.duration, repeat: Infinity, ease: "linear", delay: ember.delay },
                x: { duration: ember.duration, repeat: Infinity, ease: "easeInOut", delay: ember.delay },
                opacity: { duration: ember.duration, repeat: Infinity, ease: "easeInOut", delay: ember.delay }
              }}
            />
          ))}
        </div>

        {/* 4. Full-Screen Cinematic Instrument Overlays (Layer 10) */}
        <div className="fixed inset-0 z-[10] pointer-events-none overflow-hidden flex items-center justify-center">
          <AnimatePresence>
            {instruments.map((inst) => (
              hoveredInstrument === inst.id && <FullScreenInstrumentOverlay key={inst.id} inst={inst} isPlaying={isPlaying} />
            ))}
          </AnimatePresence>
        </div>

        {/* 5. Content Foreground (Layer 20) */}
        <div className="relative z-[20]">
          {/* Header */}
          <div ref={titleRef} className="text-center mb-24">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[var(--color-fire-amber)] drop-shadow-[0_0_30px_rgba(255,122,0,0.5)] tracking-widest uppercase mb-4">
              Heartbeat of Kerala
            </h2>
            <p className="font-sans text-[var(--color-antique-gold)] tracking-[0.4em] uppercase text-sm">
              Panchavadyam & Melam
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            
            {/* Interactive Center Orb */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              
              {/* Pulsing rings (heartbeat) */}
              <motion.div 
                className="absolute inset-0 border-[2px] border-[var(--color-fire-amber)] rounded-full opacity-0 pointer-events-none"
                animate={isPlaying ? { scale: [1, 1.4, 1], opacity: [0.8, 0, 0] } : { scale: 1, opacity: 0.2 }}
                transition={isPlaying ? { duration: 1.1, repeat: Infinity, ease: "easeOut" } : { duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute inset-0 border border-[var(--color-fire-amber)] rounded-full opacity-0 pointer-events-none"
                animate={isPlaying ? { scale: [1, 2], opacity: [0.3, 0] } : { scale: 1.1, opacity: 0.1 }}
                transition={isPlaying ? { duration: 1.1, repeat: Infinity, ease: "easeOut", delay: 0.2 } : { duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />

              <button 
                onClick={toggleSound}
                className={`w-40 h-40 md:w-56 md:h-56 bg-gradient-radial from-[var(--color-temple-red)] to-[#110505] rounded-full flex items-center justify-center border transition-all duration-700 overflow-hidden ${isPlaying ? 'border-[var(--color-fire-amber)] shadow-[0_0_60px_rgba(255,122,0,0.6)] scale-105' : 'border-[var(--color-antique-gold)] shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,0,0.6)]'}`}
              >
                <div className={`absolute inset-0 bg-[#FFD27F] mix-blend-overlay transition-opacity duration-300 scale-150 blur-xl ${isPlaying ? 'opacity-40 animate-pulse' : 'opacity-0'}`} />
                <span className={`font-serif tracking-[0.2em] uppercase text-sm md:text-base drop-shadow-md transition-colors duration-300 font-medium ${isPlaying ? 'text-white' : 'text-[var(--color-antique-gold)]'}`}>
                  {isPlaying ? 'MUTE RHYTHM' : 'FEEL THE RHYTHM'}
                </span>
              </button>
            </div>

            {/* Instruments Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-32 w-full px-6">
              {instruments.map((inst, idx) => (
                <InstrumentCard 
                  key={inst.id} 
                  inst={inst} 
                  idx={idx} 
                  isHovered={hoveredInstrument === inst.id}
                  onHover={() => setHoveredInstrument(inst.id)}
                  onLeave={() => setHoveredInstrument(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

function FullScreenInstrumentOverlay({ inst, isPlaying }: { inst: any, isPlaying: boolean }) {
  // Determine if we need to add a vibration effect to the animated instrument directly
  const vibratingBaseAnimation = isPlaying ? {
    y: [0, -2, 2, -2, 0],
    x: [0, 2, -2, 0, 2],
    transition: { duration: 0.5, repeat: Infinity, ease: "linear" as const }
  } : {};

  // For Split (Chenda)
  const splitLeft = {
    hidden: { x: "-100vw", opacity: 0, filter: "blur(20px)" },
    visible: { 
      x: "-25vw", // Stops inside the screen 25% from center
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 40px rgba(212,175,55,0.8))",
      transition: { duration: 0.8, ease: "circOut" as const }
    },
    exit: { x: "-100vw", opacity: 0, filter: "blur(20px)", transition: { duration: 0.6, ease: "circIn" as const } }
  };
  const splitRight = {
    hidden: { x: "100vw", opacity: 0, filter: "blur(20px)", scaleX: -1 },
    visible: { 
      x: "25vw", 
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 40px rgba(212,175,55,0.8))",
      scaleX: -1,
      transition: { duration: 0.8, ease: "circOut" as const }
    },
    exit: { x: "100vw", opacity: 0, filter: "blur(20px)", scaleX: -1, transition: { duration: 0.6, ease: "circIn" as const } }
  };

  // For Arc (Kombu)
  const arcLeft = {
    hidden: { x: "-100vw", rotate: -60, opacity: 0, filter: "blur(20px)" },
    visible: { 
      x: "-30vw", 
      rotate: -15, 
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 40px rgba(212,175,55,0.8)) brightness(1.2)",
      transition: { duration: 0.9, ease: "easeOut" as const }
    },
    exit: { x: "-100vw", rotate: -60, opacity: 0, filter: "blur(20px)", transition: { duration: 0.7, ease: "easeIn" as const } }
  };
  const arcRight = {
    hidden: { x: "100vw", rotate: 60, opacity: 0, filter: "blur(20px)", scaleX: -1 },
    visible: { 
      x: "30vw", 
      rotate: 15, 
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 40px rgba(212,175,55,0.8)) brightness(1.2)",
      scaleX: -1,
      transition: { duration: 0.9, ease: "easeOut" as const }
    },
    exit: { x: "100vw", rotate: 60, opacity: 0, filter: "blur(20px)", scaleX: -1, transition: { duration: 0.7, ease: "easeIn" as const } }
  };

  // For Cymbals (Ilathalam)
  const cymbalsLeft = {
    hidden: { x: "-80vw", rotate: -45, opacity: 0, filter: "brightness(0.5) blur(15px)" },
    visible: { 
      x: "-20vw", 
      rotate: 0, 
      opacity: 1, 
      filter: "brightness(1.5) drop-shadow(0 0 50px rgba(212,175,55,1)) blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
    exit: { x: "-80vw", rotate: -45, opacity: 0, filter: "brightness(0.5) blur(15px)", transition: { duration: 0.5, ease: "easeIn" as const } }
  };
  const cymbalsRight = {
    hidden: { x: "80vw", rotate: 45, opacity: 0, filter: "brightness(0.5) blur(15px)", scaleX: -1 },
    visible: { 
      x: "20vw", 
      rotate: 0, 
      opacity: 1, 
      filter: "brightness(1.5) drop-shadow(0 0 50px rgba(212,175,55,1)) blur(0px)",
      scaleX: -1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
    exit: { x: "80vw", rotate: 45, opacity: 0, filter: "brightness(0.5) blur(15px)", scaleX: -1, transition: { duration: 0.5, ease: "easeIn" as const } }
  };

  // For Float (Kurumkuzhal)
  const floatLeft = {
    hidden: { x: "-80vw", opacity: 0, filter: "blur(15px)" },
    visible: { 
      x: "-25vw", 
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 30px rgba(212,175,55,0.7))",
      transition: { duration: 1, ease: "circOut" as const }
    },
    exit: { x: "-80vw", opacity: 0, filter: "blur(15px)", transition: { duration: 0.8, ease: "easeInOut" as const } }
  };
  const floatRight = {
    hidden: { x: "80vw", opacity: 0, filter: "blur(15px)", scaleX: -1 },
    visible: { 
      x: "25vw", 
      opacity: 0.9, 
      filter: "blur(0px) drop-shadow(0 0 30px rgba(212,175,55,0.7))",
      scaleX: -1,
      transition: { duration: 1, ease: "circOut" as const }
    },
    exit: { x: "80vw", opacity: 0, filter: "blur(15px)", scaleX: -1, transition: { duration: 0.8, ease: "easeInOut" as const } }
  };

  // Shared inner animation for floated items to continuously sway while visible
  const floatingInner = {
    y: [-15, 15, -15],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const }
  };

  return (
    <>
      {inst.type === "split" && (
        <>
          <motion.div className="absolute w-[400px] h-[400px]" variants={splitLeft} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={vibratingBaseAnimation} className="w-full h-full relative">
              <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
          <motion.div className="absolute w-[400px] h-[400px]" variants={splitRight} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={vibratingBaseAnimation} className="w-full h-full relative">
              <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
        </>
      )}

      {inst.type === "arc" && (
        <>
          <motion.div className="absolute w-[600px] h-[600px] origin-bottom" variants={arcLeft} initial="hidden" animate="visible" exit="exit">
            <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
          </motion.div>
          <motion.div className="absolute w-[600px] h-[600px] origin-bottom" variants={arcRight} initial="hidden" animate="visible" exit="exit">
            <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
          </motion.div>
        </>
      )}

      {inst.type === "cymbals" && (
        <>
          <motion.div className="absolute w-[300px] h-[300px]" variants={cymbalsLeft} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={vibratingBaseAnimation} className="w-full h-full relative">
              <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
          <motion.div className="absolute w-[300px] h-[300px]" variants={cymbalsRight} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={vibratingBaseAnimation} className="w-full h-full relative">
               <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
        </>
      )}

      {inst.type === "float" && (
        <>
          <motion.div className="absolute w-[180px] h-[600px]" variants={floatLeft} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={floatingInner} className="w-full h-full relative">
              <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
          <motion.div className="absolute w-[180px] h-[600px]" variants={floatRight} initial="hidden" animate="visible" exit="exit">
            <motion.div animate={floatingInner} className="w-full h-full relative">
              <Image src={inst.image} alt={inst.name} fill className="object-contain" priority quality={100} unoptimized={true} />
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
}

function InstrumentCard({ inst, idx, isHovered, onHover, onLeave }: { inst: any, idx: number, isHovered: boolean, onHover: () => void, onLeave: () => void }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onHover}
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { delay: idx * 0.2, duration: 0.8 } },
        hover: { scale: 1.02 }
      }}
      className={`group relative h-56 lg:h-64 border bg-[#0A0A0A]/40 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] ${isHovered ? 'border-[var(--color-antique-gold)]/80' : 'border-[var(--color-antique-gold)]/20'}`}
    >
      {/* Visual background highlight on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-antique-gold)]/20 to-transparent transition-opacity duration-500 z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Text Content */}
      <div className="relative z-20 p-6 flex flex-col items-center justify-center w-full h-full transition-all duration-500">
        <h4 className={`font-serif text-2xl lg:text-3xl mb-3 tracking-widest drop-shadow-md transition-colors duration-500 ${isHovered ? 'text-white' : 'text-[var(--color-antique-gold)]'}`}>
          {inst.name}
        </h4>
        <p className={`font-sans text-xs text-center tracking-[0.1em] leading-relaxed transition-colors duration-500 ${isHovered ? 'text-[var(--color-antique-gold)]' : 'text-white/50'}`}>
          <span className={`block transition-opacity duration-300 ${isHovered ? 'opacity-80' : 'opacity-100'}`}>
            {inst.description}
          </span>
        </p>
      </div>
    </motion.div>
  );
}
