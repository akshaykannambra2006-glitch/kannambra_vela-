"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: "v1",
    title: "The Grand Procession",
    thumbnail: "https://img.youtube.com/vi/pTRps4PifB8/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/pTRps4PifB8?autoplay=1&controls=1&rel=0",
    tag: "HIGHLIGHTS",
    description: "The majestic elephant procession and the divine energy of the Vela.",
    isVertical: false,
  },
  {
    id: "v2",
    title: "Heartbeat of Melam",
    // We try to use an auto-generated secondary thumbnail (1.jpg, 2.jpg, or 3.jpg) 
    // to avoid showing the fireworks cover image for the Panchavadyam section.
    thumbnail: "https://img.youtube.com/vi/OgDvkZdXvQ0/2.jpg",
    embedUrl: "https://www.youtube.com/embed/OgDvkZdXvQ0?start=225&autoplay=1&controls=1&rel=0",
    tag: "PANCHAVADYAM",
    description: "The thunderous rhythm of Panchavadyam echoing through the temple grounds.",
    isVertical: false,
  },
  {
    id: "v3",
    title: "Vedikkettu Spectacle",
    thumbnail: "https://img.youtube.com/vi/OgDvkZdXvQ0/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/OgDvkZdXvQ0?start=110&autoplay=1&controls=1&rel=0",
    tag: "FIREWORKS",
    description: "The sky erupts in a spectacular display of traditional temple fireworks.",
    isVertical: false,
  },
  {
    id: "v4",
    title: "Fireworks Spectacle",
    thumbnail: "https://img.youtube.com/vi/9Pqs_1xf4BY/hqdefault.jpg",
    embedUrl: "https://www.youtube.com/embed/9Pqs_1xf4BY?autoplay=1&controls=1&rel=0",
    tag: "FINALE",
    description: "The explosive climax that lights up the night sky of Kannambra.",
    isVertical: true,
  }
];

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<typeof videos[0] | null>(null);

  // Cinematic Zoom for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(".vh-title", { opacity: 0, y: 30, duration: 1, ease: "power3.out" })
        .from(".vh-subtitle", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .from(".vh-row", { opacity: 0, y: 50, duration: 1, ease: "power3.out" }, "-=0.4");
        
    }, containerRef);
    
    // Add ESC key listener for modal closing
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      ctx.revert();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Embers animation background
  const embers = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    size: Math.random() * 3 + 1
  }));

  // Extra firework particles for the Finale video modal
  const fireworkParticles = Array.from({ length: 50 }).map((_, i) => ({
    id: `fw-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <SectionWrapper id="videos" className="relative bg-[#0A0A0A] py-32 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Layer with Ken Burns Effect */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        {/* Main Background Image - Crowd scene from Instagram post proxy */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url('https://instagram.fcok14-1.fna.fbcdn.net/v/t39.30808-6/480219468_18451842001097787_8783637177580665576_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjgweDE2MDAuc2RyLmYyOTUwMy5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fcok14-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=fA-7s6I1yosQ7kNvgEx90s3&_nc_gid=513a863e00ea49e4acda75b08c69d80c&edm=AP_V10EBAAAA&ccb=7-5&ig_cache_key=MzU1NjU5MDYxNDExMDMwMzgzOA%3D%3D.3-ccb7-5&oh=00_AYDRR8zE620vO9r-v31f4WwN2qGZ5nQ_A62IeR651Q6wVw&oe=67DB6377&_nc_sid=2999b8')` }}
        />
        {/* Cinematic Blending Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        <div className="absolute inset-0 bg-black/30" /> {/* Slight brightness reduction */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" /> {/* Vignette */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-overlay" /> {/* Temple smoke / texture */}
      </motion.div>

      {/* Floating Ember Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {embers.map((ember) => (
          <motion.div
            key={`ember-${ember.id}`}
            className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[1px]"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.x}%`,
              opacity: 0.2 + Math.random() * 0.4,
              boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.4)"
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: [`${ember.x}%`, `${ember.x + (Math.random() * 20 - 10)}%`],
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

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24" ref={containerRef}>
        
        {/* Header Section */}
        <div className="flex flex-col mb-12">
          <h2 className="vh-title font-serif text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] tracking-widest drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-6">
            CINEMATIC MEMORIES
          </h2>
          <p className="vh-subtitle font-sans text-white/70 max-w-2xl text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md">
            Experience the power, rhythm, devotion, and explosive spectacle of Kannambra – Rishinaradamangalam Vela through our curated festival films.
          </p>
        </div>

        {/* Netflix-Style Horizontal Scroll Row */}
        <div 
          ref={scrollContainerRef}
          className="vh-row flex gap-6 md:gap-8 overflow-x-auto pb-12 pt-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] min-w-[300px] snap-center group"
              onClick={() => setActiveVideo(video)}
            >
              <div className="relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-[#141414] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] outline outline-1 outline-transparent group-hover:outline-[#D4AF37]/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                
                {/* Thumbnail */}
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[15%] group-hover:grayscale-0"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20 group-hover:from-black/80 transition-all duration-500" />
                
                {/* Center Play Icon Glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="absolute w-20 h-20 bg-[var(--color-antique-gold)]/20 rounded-full blur-xl animate-pulse" />
                  <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border-[1.5px] border-[var(--color-antique-gold)] flex items-center justify-center text-[var(--color-antique-gold)] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>

                {/* Card Info */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-2 drop-shadow-md">
                    {video.tag}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl text-white font-semibold drop-shadow-lg group-hover:text-[#FFF5D1] transition-colors mb-2">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm font-sans line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* Add a spacer at the end for clean scrolling padding */}
          <div className="flex-none w-6 md:w-12" />
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveVideo(null);
            }}
          >
            {/* Modal Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${activeVideo.isVertical ? 'w-[40vw] h-[80vh]' : 'w-[80vw] h-[60vh]'} bg-[var(--color-antique-gold)]/10 blur-[100px] pointer-events-none`} />

            {/* Special Firework Particles for Finale */}
            {activeVideo.isVertical && activeVideo.tag === "FINALE" && (
              <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden mix-blend-screen">
                {fireworkParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full bg-[#FFB040] blur-[2px]"
                    style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
                    animate={{
                      scale: [0, 2, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}

            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all z-50 group border border-white/20 hover:border-white/50"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative bg-black w-full rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)] outline outline-1 outline-[var(--color-antique-gold)]/30 ${
                activeVideo.isVertical ? 'max-w-[450px] aspect-[9/16]' : 'max-w-[70rem] aspect-video'
              }`}
            >
              <iframe
                className="w-full h-full"
                src={activeVideo.embedUrl}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionWrapper>
  );
}
