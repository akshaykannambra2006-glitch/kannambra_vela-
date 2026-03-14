"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlayCircle } from "lucide-react";
import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("../three/HeroParticles"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/sounds/temple-bell.mp3");
      audioRef.current.loop = false;
      audioRef.current.volume = 0.3;
    }
    
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text parallax
      gsap.to(textRef.current, {
        y: "-50%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSoundToggle = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      if (isVideoPlaying) setIsVideoPlaying(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleVideo = () => {
    if (!isVideoPlaying && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image Layer */}
      <AnimatePresence>
        {!isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="absolute inset-[0%] w-full h-full z-0 pointer-events-none overflow-hidden"
          >
            {/* Focus Effect Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.55)" }} />

            {/* Base Image with infinite slow zoom */}
            <motion.div
              className="absolute inset-[-5%] w-[110%] h-[110%] origin-center"
              style={{
                backgroundImage: "url('/images/hero-bg.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0.75) contrast(1.15) saturate(1.1)",
              }}
              animate={{ 
                scale: [1, 1.06]
              }}
              transition={{ 
                duration: 20, 
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {/* Cinematic Black Gradient Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.65) 100%)"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle System (Sparks remain visible completely above background but below text) */}
      <div className="absolute inset-0 z-20 mix-blend-screen pointer-events-none">
        <HeroParticles />
      </div>

      {/* YouTube Video Background (Fades in on interaction) */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-10 bg-black overflow-hidden pointer-events-none"
          >
            <iframe
              className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen"
              src="https://www.youtube.com/embed/57SC63ZiuGw?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=57SC63ZiuGw&mute=0"
              title="Kannambra – Rishinaradamangalam Vela Cinematic Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Overlay to ensure UI readability over video */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[var(--color-charcoal-black)] opacity-90 z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Content (Fades out when video plays) */}
      <div className="relative z-30 container mx-auto px-6 text-center pt-24 pointer-events-none flex flex-col items-center justify-center">
        
        <AnimatePresence>
          {!isVideoPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeIn" } }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col items-center justify-center w-full pointer-events-auto"
            >
              <motion.p 
                className="font-sans text-[var(--color-antique-gold)] tracking-[0.4em] text-xs md:text-sm uppercase mb-6 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Kannambra – Rishinaradamangalam Vela
              </motion.p>
              
              <h1 
                ref={textRef}
                className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] leading-tight font-black uppercase"
              >
                Rishinaradamangalam <br className="hidden md:block"/> Desam
              </h1>
              
              <motion.p 
                className="mt-8 font-sans text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                The Grand Festival of <span className="text-[var(--color-fire-amber)] font-medium">Rhythm, Fire</span> and Tradition
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons (Remain visible) */}
        <motion.div 
          className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8 relative z-30 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <AnimatePresence mode="popLayout">
            {!isVideoPlaying && (
              <motion.a 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                href="#about" 
                className="px-10 py-4 bg-[var(--color-temple-red)] text-[var(--color-ivory)] text-sm uppercase tracking-[0.2em] font-medium border border-[#A11717] rounded-full shadow-[0_0_30px_rgba(122,14,14,0.6)] hover:shadow-[0_0_50px_rgba(255,80,0,0.6)] hover:border-[var(--color-fire-amber)] transition-all duration-500 overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span>Explore Festival</span>
              </motion.a>
            )}
          </AnimatePresence>
          
          <button 
            onClick={toggleVideo}
            className="flex items-center gap-4 text-white/80 hover:text-white transition-colors duration-300 group cursor-pointer bg-black/30 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-6 py-3 md:p-0 rounded-full md:rounded-none border border-white/10 md:border-transparent"
          >
            <PlayCircle className={`w-12 h-12 text-[var(--color-antique-gold)] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.9)] transition-all duration-500 ${isVideoPlaying ? 'rotate-90 scale-110' : ''}`} />
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-antique-gold)] group-hover:text-[var(--color-fire-amber)] transition-colors">
                {isVideoPlaying ? "Close Trailer" : "Watch"}
              </span>
              <span className="text-sm md:text-base font-medium tracking-wider drop-shadow-md">
                Cinematic Trailers
              </span>
            </div>
          </button>
        </motion.div>
        
      </div>

      {/* Decorative Lamp Glows at Bottom Edge */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/4 w-1/2 h-64 bg-[var(--color-lamp-glow)] opacity-[0.2] blur-[100px] rounded-full z-10 pointer-events-none" />

      {/* Audio Control */}
      <button 
        onClick={handleSoundToggle}
        className="absolute bottom-10 right-10 z-[60] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[var(--color-antique-gold)] hover:border-[var(--color-antique-gold)] transition-colors duration-500 backdrop-blur-md"
      >
        {isPlaying ? (
          <span className="text-xs tracking-widest leading-none">❚❚</span>
        ) : (
          <span className="text-xs tracking-widest leading-none">▶</span>
        )}
      </button>
      
      {/* Scroll indicator */}
      <AnimatePresence>
        {!isVideoPlaying && (
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-3 opacity-60"
            animate={{ y: [0, 10, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-antique-gold)]">Scroll to enter</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-antique-gold)] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
