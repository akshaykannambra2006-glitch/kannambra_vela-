"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

const galleryImages = [
  "/images/gallery/img1.jpg", // 0: medium hero
  "/images/gallery/img2.jpg", // 1: portrait 1
  "/images/gallery/img3.jpg", // 2: portrait 2
  "/images/gallery/img4.jpg", // 3: small card 1
  "/images/gallery/img5.jpg", // 4: small card 2
  "/images/gallery/img6.jpg", // 5: small card 3
  "/images/gallery/img7.jpg", // 6: landscape
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Cinematic zoom effect for background
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Generate embers specific to this area
  const sparks = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: Math.random() * 3 + 1
  }));

  // Stagger variants for gallery grid elements
  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const // Cinematic ease out
      }
    })
  };

  const GalleryCard = ({ src, imgIndex, className, delayIndex }: { src: string, imgIndex: number, className: string, delayIndex: number }) => (
    <motion.div
      custom={delayIndex}
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      onClick={() => setIndex(imgIndex)}
      className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#050505] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] hover:border-[var(--color-antique-gold)]/50 hover:-translate-y-2 transform-gpu ${className}`}
    >
        {/* Parallax Image Wrapper for Hover Zoom */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-1000 group-hover:scale-105 pointer-events-none">
          <img 
            src={src}
            alt={`Glimpse ${imgIndex + 1}`}
            className="object-cover w-full h-full filter saturate-[0.8] group-hover:saturate-100 transition-all duration-700"
          />
        </div>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
        
        {/* Dark gradient on bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Deep Vignette Inside the Card */}
        <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] pointer-events-none mix-blend-multiply" />
        
        {/* Golden glow border flash on hover */}
        <div className="absolute inset-0 border-2 border-[var(--color-antique-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl blur-[2px]" />
    </motion.div>
  );

  return (
    <section ref={containerRef} id="gallery" className="relative w-full min-h-screen overflow-hidden bg-[#030303] py-24 md:py-32">
       
       {/* =========================================
           CINEMATIC BACKGROUND
       ========================================= */}
       <motion.div 
         className="absolute inset-0 z-0 origin-center opacity-[0.35]" 
         style={{ scale: bgScale }}
       >
         <div 
           className="w-full h-full bg-cover bg-center" 
           style={{ backgroundImage: "url('/images/elephants-bg.jpg')", filter: "sepia(0.2) contrast(1.1)" }}
         />
       </motion.div>
       
       {/* Dark overlays & textures */}
       <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505] z-[1] pointer-events-none" />
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay z-[1] pointer-events-none" />
       
       {/* Golden Vignette & Light Rays */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,rgba(0,0,0,0.9)_100%)] z-[2] pointer-events-none" />
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-screen bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15)_0%,transparent_70%)] opacity-50 z-[2] pointer-events-none mix-blend-screen" />

       {/* Floating Ember Sparks */}
       <div className="absolute inset-0 z-[2] pointer-events-none">
         {sparks.map((spark) => (
            <motion.div
              key={spark.id}
              className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[1px]"
              style={{
                width: spark.size,
                height: spark.size,
                left: `${spark.x}%`,
                opacity: 0.3 + Math.random() * 0.4,
                boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.4)"
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: [`${spark.x}%`, `${spark.x + (Math.random() * 15 - 7.5)}%`],
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

       {/* =========================================
           CONTENT LAYER
       ========================================= */}
       <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 pt-12 flex flex-col items-center">
          
          {/* Main Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24 relative w-full"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-32 bg-[var(--color-antique-gold)]/10 blur-[80px] pointer-events-none rounded-[100%]" />
             
             <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--color-antique-gold)] drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] tracking-widest uppercase mb-6 md:mb-8 leading-tight relative z-10">
               GLIMPSES OF <br className="md:hidden" /> THE VELA
             </h2>
             <p className="font-sans text-white/70 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed uppercase tracking-[0.2em] relative z-10 px-4">
               A visual journey through the heritage, devotion, and spectacle of Kannambra – Rishinaradamangalam Vela.
             </p>
             <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-antique-gold)] to-transparent mx-auto mt-12 opacity-60" />
          </motion.div>

          {/* Museum Layout Grid */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl">
            
            {/* Column 1: Hero & Landscape */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:max-w-[480px]">
              <GalleryCard src={galleryImages[0]} imgIndex={0} delayIndex={0} className="w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]" />
              <GalleryCard src={galleryImages[6]} imgIndex={6} delayIndex={3} className="w-full aspect-[16/9]" />
            </div>

            {/* Column 2: Two Stacked Portraits */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:max-w-[320px]">
              <GalleryCard src={galleryImages[1]} imgIndex={1} delayIndex={1} className="w-full aspect-[4/5]" />
              <GalleryCard src={galleryImages[2]} imgIndex={2} delayIndex={4} className="w-full aspect-[4/5]" />
            </div>

            {/* Column 3: Three Smaller Cinematic Cards */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:max-w-[320px]">
              <GalleryCard src={galleryImages[3]} imgIndex={3} delayIndex={2} className="w-full aspect-[4/5]" />
              <GalleryCard src={galleryImages[4]} imgIndex={4} delayIndex={5} className="w-full aspect-[4/5]" />
              <GalleryCard src={galleryImages[5]} imgIndex={5} delayIndex={6} className="w-full aspect-[4/5]" />
            </div>

          </div>
       </div>

       {/* =========================================
           LIGHTBOX VIEWER
       ========================================= */}
       <Lightbox
        index={index}
        slides={galleryImages.map(src => ({ src }))}
        open={index >= 0}
        close={() => setIndex(-1)}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, 0.98)" },
          icon: { filter: "drop-shadow(0px 0px 5px rgba(212, 175, 55, 0.8))" }
        }}
        animation={{ fade: 400, swipe: 250 }}
        carousel={{ 
          finite: false, // Infinite looping
          padding: "5%" 
        }}
      />
    </section>
  );
}
