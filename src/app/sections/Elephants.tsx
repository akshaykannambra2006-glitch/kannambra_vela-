"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Extended data with optional video URLs, featured images, stats, and legends
const elephants = [
  {
    name: "Mangalamkunnu Ayyappan",
    temple: "Kurumba Bhagavathy",
    // To use a Google Drive Image, use this format: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID'
    image: "/images/elephant-1.webp",
    featuredImage: "/images/elephant-ayyappan-featured.jpg",
    videoUrl: "https://www.youtube.com/embed/YVnBaT3oMqM?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=YVnBaT3oMqM&mute=1",
    stats: {
      temple: "Kurumba Bhagavathy",
      height: "305 cm",
      knownFor: "Majestic Posture",
      appearances: "Over 100 Festivals"
    },
    legend: "A majestic tusker whose mere presence on the festival grounds demands reverence. Known for an exceptionally calm demeanor despite his towering height, he has consistently carried the divine thidambu with unwavering grace. His participation in Kannambra Vela elevates the entire atmosphere into a truly legendary spectacle."
  },
  {
    name: "Tiruvambadi Sivasundar",
    temple: "Kannambra Desham",
    image: "/images/elephant-2.webp",
    featuredImage: "/images/elephant-2.webp",
    videoUrl: null,
    stats: {
      temple: "Kannambra Desham",
      height: "308 cm",
      knownFor: "Elegant Tusks",
      appearances: "Legendary Status"
    },
    legend: "An iconic presence in Kerala's festival history, remembered for exquisite physical proportions and a proud head carriage that defined the standard for festival elephants. His legacy continues to inspire elephant lovers across the state."
  },
  {
    name: "Pampady Rajan",
    temple: "Guest Participant",
    image: "/images/elephant-3.webp",
    featuredImage: "/images/elephant-3.webp",
    videoUrl: null,
    stats: {
      temple: "Guest Participant",
      height: "312 cm",
      knownFor: "Towering Height",
      appearances: "Statewide Fame"
    },
    legend: "Often cited as one of the tallest living elephants in Kerala, his arrival at any festival guarantees an awe-struck crowd. The sheer magnitude of his stature makes him the undisputed focal point of the elephant array."
  },
  {
    name: "Kuttankulangara Arjunan",
    temple: "Sree Kurumba Vela",
    image: "/images/elephant-4.webp",
    featuredImage: "/images/elephant-4.webp",
    videoUrl: null,
    stats: {
      temple: "Sree Kurumba Vela",
      height: "298 cm",
      knownFor: "Classic Features",
      appearances: "Decorated Veteran"
    },
    legend: "A celebrated elephant renowned for his quintessential Kerala tusker features. His experienced and steady nature makes him perfect for carrying the elaborate golden nettipattam and holding the divine idol through the chaotic joy of the Vela."
  },
];

export default function ElephantsSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeElephant = activeIdx !== null ? elephants[activeIdx] : null;
  const processionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: processionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  // Generate sparks specific to this section
  const sparks = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 8,
    size: Math.random() * 3 + 1
  }));

  return (
    <section 
      id="elephants" 
      className="relative w-full min-h-[140vh] bg-black overflow-hidden flex flex-col items-center py-24 lg:py-32"
    >
      {/* =========================================
          DYNAMIC CINEMATIC BACKGROUND
      ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
        
        <AnimatePresence mode="wait">
          {activeElephant?.videoUrl ? (
            // =========================================
            // ACTIVE CINEMATIC VIDEO BACKGROUND
            // =========================================
            <motion.div
              key={`video-${activeIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Scale Up container to hide youtube borders */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] min-h-[100vw] min-w-[177.77vh]">
                <iframe
                  className="w-full h-full pointer-events-none scale-125 md:scale-105"
                  src={activeElephant.videoUrl}
                  title={`${activeElephant.name} Tribute`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>

              {/* Video Specific Coloring overlays */}
              <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
              {/* Blur for cinematic softness */}
              <div className="absolute inset-0 backdrop-blur-[4px] z-10 pointer-events-none" />
              {/* Dark Gradient Overlay for Readability */}
              <div 
                className="absolute inset-0 pointer-events-none z-20" 
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.85) 100%)"
                }}
              />
              {/* Brightness Reduction & Smoke */}
              <div className="absolute inset-0 bg-[#000] mix-blend-multiply opacity-40 z-20 pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-25 mix-blend-screen z-20 pointer-events-none" style={{ animation: "pulse 10s infinite" }} />
            </motion.div>
            
          ) : (
            
            // =========================================
            // DEFAULT CINEMATIC IMAGE BACKGROUND
            // =========================================
            <motion.div
              key="default-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Focus Vignette */}
              <div className="absolute inset-0 pointer-events-none z-20" style={{ boxShadow: "inset 0 0 220px rgba(0,0,0,0.55)" }} />

              <motion.div
                className="absolute inset-[-5%] w-[110%] h-[110%] origin-center bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/elephants-bg.jpg')",
                  filter: "brightness(0.75) contrast(1.15) saturate(1.1)",
                }}
                animate={{ scale: [1, 1.06] }}
                transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              >
                {/* 4-Stop Cinematic Dark Gradient to keep text visible while image is clear */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)"
                  }}
                />
              </motion.div>
            </motion.div>
              
          )}
        </AnimatePresence>

        {/* =========================================
            PERSISTENT SPARK PARTICLES
        ========================================= */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {sparks.map((spark) => (
            <motion.div
              key={`spark-${spark.id}`}
              className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[1px]"
              style={{
                width: spark.size,
                height: spark.size,
                left: `${spark.x}%`,
                opacity: 0.5 + Math.random() * 0.4,
                boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.5)"
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: [`${spark.x}%`, `${spark.x + (Math.random() * 10 - 5)}%`],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                y: { duration: spark.duration, repeat: Infinity, ease: "linear", delay: spark.delay },
                x: { duration: spark.duration, repeat: Infinity, ease: "easeInOut", delay: spark.delay },
                opacity: { duration: spark.duration, repeat: Infinity, ease: "easeOut", delay: spark.delay }
              }}
            />
          ))}
        </div>
      </div>


      {/* --- SECTION HEADING --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-40 w-full max-w-5xl mx-auto px-4 text-center mt-12 mb-[10vh]"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative inline-block mb-8"
        >
          <p className="font-sans text-xs md:text-sm text-[var(--color-antique-gold)] uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)] relative z-10">
            Elephants of the Vela
          </p>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-antique-gold)] to-transparent mt-3 opacity-60" />
        </motion.div>

        {/* Spotlight behind main heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-32 bg-[var(--color-antique-gold)]/10 blur-[80px] pointer-events-none rounded-[100%]" />
        
        <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-[#FFF3D6] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] mb-4 leading-tight">
          ഗജവീരന്മാർ
        </h2>
        <p className="font-serif text-sm md:text-base lg:text-lg text-[var(--color-ivory)]/90 uppercase tracking-[0.3em] lg:tracking-[0.4em]">
          The Giants of Kannambra Vela
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mt-8 opacity-60">
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-antique-gold)] to-transparent" />
          <div className="w-2 h-2 mx-4 rotate-45 border border-[var(--color-antique-gold)] group-hover:bg-[var(--color-antique-gold)] transition-colors" />
          <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-[var(--color-antique-gold)] via-[var(--color-antique-gold)] to-transparent" />
        </div>
      </motion.div>


      {/* --- CINEMATIC EXPANDING PROFILE (HERO) --- */}
      <div className="relative z-40 w-full flex-grow flex flex-col items-center justify-center px-4 lg:px-8 min-h-[300px] mb-16 pointer-events-auto">
        <AnimatePresence mode="wait">
          {activeElephant ? (
            
            <motion.div
              key={`profile-${activeIdx}`}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl relative backdrop-blur-md bg-black/40 border border-[var(--color-antique-gold)]/30 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
            >
              {/* Subtle inner dark vignette for cinematic feel on panel */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-8 md:p-12 items-center">
                
                {/* LEFT: Stats */}
                <div className="order-2 md:order-1 col-span-1 md:col-span-3 flex flex-col gap-6 text-center md:text-left">
                  {Object.entries(activeElephant.stats).map(([key, value]) => (
                    <div key={key}>
                      <span className="block font-sans text-[var(--color-antique-gold)] text-[10px] tracking-[0.2em] uppercase mb-1 opacity-80">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="block font-serif text-sm md:text-base text-[var(--color-ivory)] drop-shadow-md">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CENTER: Image & Titles (Using object-fit: contain to show full elephant) */}
                <div className="order-1 md:order-2 col-span-1 md:col-span-6 flex flex-col items-center justify-center py-4 md:py-0 px-4">
                  
                  <div className="relative w-full max-h-[500px] h-[50vh] md:h-auto md:min-h-[400px] flex items-center justify-center mx-auto rounded-3xl overflow-hidden border border-[var(--color-antique-gold)]/60 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-8 bg-black/50 group">
                    <Image 
                      src={activeElephant.featuredImage}
                      alt={activeElephant.name}
                      fill
                      quality={100}
                      unoptimized={true}
                      className="object-contain p-2 transition-transform duration-1000 group-hover:scale-[1.02] z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                    />
                  </div>

                  <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] mb-3 text-center">
                    {activeElephant.name}
                  </h3>
                  <p className="font-sans text-[var(--color-antique-gold)] text-xs md:text-sm lg:text-base tracking-[0.4em] uppercase drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] text-center">
                    {activeElephant.temple}
                  </p>
                </div>

                {/* RIGHT: Legend Paragraph */}
                <div className="order-3 col-span-1 md:col-span-3 flex flex-col justify-center text-center md:text-left">
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)]/50 mb-6 mx-auto md:mx-0" />
                  <p className="font-serif text-sm md:text-base text-[var(--color-ivory)]/90 leading-relaxed italic drop-shadow-md">
                    &ldquo;{activeElephant.legend}&rdquo;
                  </p>
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)]/50 mt-6 mx-auto md:mx-0" />
                </div>

              </div>
            </motion.div>
            
          ) : (
            
            // =========================================
            // UNSELECTED DEFAULT MESSAGE
            // =========================================
            <motion.div
              key="default-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center p-8 bg-[var(--color-charcoal-black)]/40 backdrop-blur-sm border border-[var(--color-antique-gold)]/20 rounded-full"
            >
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="font-serif text-lg md:text-xl lg:text-2xl text-[var(--color-antique-gold)] tracking-widest text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              >
                Select a card to view the legends
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* --- ELEPHANT CARDS GRID --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="relative z-50 w-full mx-auto px-6 mb-32"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {elephants.map((elephant, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveIdx(idx === activeIdx ? null : idx)}
              className={`group relative aspect-[4/5] rounded-md overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                activeIdx === idx 
                  ? 'ring-2 ring-[var(--color-antique-gold)] shadow-[0_0_40px_rgba(212,175,55,0.5)] -translate-y-4 scale-105' 
                  : 'border border-white/10 hover:border-[var(--color-antique-gold)] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]'
              }`}
            >
              <Image 
                src={elephant.image}
                alt={elephant.name}
                fill
                quality={100}
                unoptimized={true}
                className={`object-cover transition-all duration-700 ${
                  activeIdx === idx 
                    ? 'brightness-110 scale-110 filter' 
                    : 'brightness-[0.6] grayscale-[30%] group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 w-full p-5 z-10">
                <p className={`font-sans text-[10px] tracking-[0.2em] uppercase mb-1 transition-opacity duration-300 ${
                  activeIdx === idx 
                    ? 'text-[var(--color-antique-gold)] opacity-100' 
                    : 'text-[var(--color-ivory)]/70 opacity-80 group-hover:opacity-100 group-hover:text-[var(--color-antique-gold)]'
                }`}>
                  {elephant.temple}
                </p>
                <h4 className="font-serif text-lg text-white leading-snug drop-shadow-lg">
                  {elephant.name}
                </h4>
              </div>

              {/* Hover Glow Edge Effect */}
              <div className="absolute inset-0 border border-[var(--color-antique-gold)] opacity-0 group-hover:opacity-100 rounded-md pointer-events-none transition-opacity duration-500 blur-[2px]" />
            </div>
          ))}
        </div>
      </motion.div>


      {/* --- Coda Parallax --- */}
      <div 
        ref={processionRef}
        className="relative z-40 w-full h-[30vh] md:h-[40vh] bg-black overflow-hidden flex items-center justify-center border-t border-b border-white/5"
      >
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
        >
          <Image 
            src="/images/heritage.jpg"
            alt="Elephant Procession"
            fill
            quality={100}
            unoptimized={true}
            className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
          />
        </motion.div>
        
        {/* Darkening Gradients for procession container */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.9)_100%)] z-[1] pointer-events-none" />
      </div>

    </section>
  );
}
