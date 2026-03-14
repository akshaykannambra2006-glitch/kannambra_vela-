"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function LocationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const playerRef = useRef<any>(null);

  // Slow Ken Burns cinematic zoom tied to scroll, reduced max scale to 1.05
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const entryScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Setup YouTube precise looping via IFrame Player API (30s -> 36s)
  useEffect(() => {
    // Load API
    const loadYoutubeApi = () => {
      // @ts-ignore
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // @ts-ignore
        window.onYouTubeIframeAPIReady = initPlayer;
      } else {
        initPlayer();
      }
    };

    let timeUpdater: NodeJS.Timeout;

    const initPlayer = () => {
      // @ts-ignore
      playerRef.current = new window.YT.Player("festival-bg-video", {
        videoId: "RO_HRE2yjgE",
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          mute: 1,
          playsinline: 1,
          start: 30,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            event.target.mute();
            
            // Core logic: continuously check time to force the exact 30s-36s loop
            timeUpdater = setInterval(() => {
              const currentTime = event.target.getCurrentTime();
              if (currentTime >= 36) {
                event.target.seekTo(30);
              }
            }, 250); // check 4x a second
          },
          onStateChange: (event: any) => {
            // @ts-ignore
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(30);
              event.target.playVideo();
            }
          }
        }
      });
    };

    loadYoutubeApi();

    return () => {
      if (timeUpdater) clearInterval(timeUpdater);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  // Generate subtle golden embers for the festival grounding
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([]);
  
  useEffect(() => {
    setEmbers(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8, 
        duration: 10 + Math.random() * 15, // slower upward movement
        size: Math.random() * 2 + 1
      }))
    );
  }, []);

  const staggervariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={containerRef} id="location" className="relative overflow-hidden w-full min-h-screen bg-[#030303] py-32 flex items-center justify-center">
      
      {/* Cinematic Looping Background Video */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0 origin-center animate-[kenburns_25s_infinite_alternate_ease-in-out]"
        style={{ scale: entryScale, opacity: 0.25 }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden blur-[6px] pointer-events-none">
          <div
            id="festival-bg-video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
          />
        </div>
      </motion.div>

      {/* Atmospheric Faint Smoke */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />

      {/* Cinematic Dark Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%)"
        }}
      />

      {/* Subtle Golden Night Flicker */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none mix-blend-screen opacity-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.7)_0%,transparent_80%)] animate-[pulse_6s_infinite_alternate]" />

      {/* Floating Ember Sparks */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
        {embers.map((ember) => (
          <motion.div
            key={`ember-${ember.id}`}
            className="absolute bottom-[-10px] rounded-full bg-[#D4AF37] blur-[1px]"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.x}%`,
              opacity: 0.2 + Math.random() * 0.3, 
              boxShadow: "0 0 10px 2px rgba(212, 175, 55, 0.4)"
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: [`${ember.x}%`, `${ember.x + (Math.random() * 20 - 10)}%`],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              y: { duration: ember.duration, repeat: Infinity, ease: "linear", delay: ember.delay },
              x: { duration: ember.duration, repeat: Infinity, ease: "easeInOut", delay: ember.delay },
              opacity: { duration: ember.duration, repeat: Infinity, ease: "easeOut", delay: ember.delay }
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Cinematic Main Title */}
        <motion.div 
          custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants}
          className="text-center w-full mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-antique-gold)] opacity-50" />
            <h2 className="font-serif text-4xl md:text-6xl lg:text-[6rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-widest uppercase leading-tight line-clamp-2 pb-2">
              The Sacred Grounds
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-antique-gold)] opacity-50" />
          </div>
          <p className="font-serif italic text-[#D4AF37] tracking-[0.3em] md:tracking-[0.6em] text-sm md:text-xl drop-shadow-md opacity-90 uppercase">
            Where Tradition Comes Alive
          </p>
        </motion.div>

        {/* 2-Column Responsive Card Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-[stretch] gap-10 lg:gap-16 w-full">
          
          {/* Location 1: Rishinaradamangalam Desam */}
          <motion.div 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants}
            className="group relative bg-[#0a0a0a] rounded-2xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/70 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] w-full max-w-[420px] mx-auto h-auto"
          >
            {/* Cinematic Image & Text Block (~340px min-height to expand based on text) */}
            <div className="relative w-full flex flex-col min-h-[340px] flex-grow overflow-hidden">
              
              {/* Background Layers */}
              <div className="absolute inset-0 z-0 bg-black">
                <motion.div
                  className="w-full h-full bg-cover bg-center opacity-[0.85] group-hover:brightness-110 transition-all duration-700"
                  style={{ backgroundImage: "url('/images/r-desam-bg.jpg')" }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* Cinematic Gradient Overlay */}
                <div 
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))" }}
                />
                {/* Soft Vignette Edge Darkening */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[1] pointer-events-none" />
                {/* Torch Flicker overlay */}
                <div className="absolute inset-0 bg-[#FF7A00]/10 mix-blend-color-dodge animate-[pulse_3s_infinite_alternate] z-[1] pointer-events-none" />
                {/* Hover Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]" />
              </div>

              {/* Text Layout */}
              <div className="relative z-10 p-7 md:p-8 flex flex-col h-full flex-grow pointer-events-none text-left justify-end">
                <div>
                  <MapPin className="text-[#D4AF37] w-7 h-7 mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#ffffff] mb-1 leading-tight drop-shadow-lg">
                    Rishinaradamangalam Desam
                  </h3>
                  <p className="font-serif italic text-[#D4AF37] text-base lg:text-lg tracking-wider mb-4 drop-shadow-md font-medium">
                    ഋഷിനാരദമംഗലം ദേശം മന്ദം
                  </p>
                  
                  <p className="font-sans text-[rgba(255,255,255,0.85)] text-sm leading-relaxed drop-shadow-md font-light">
                    This sacred ground hosts the powerful rhythms of Panchavadyam and the majestic elephant procession during Kannambra – Rishinaradamangalam Vela.
                    <br/><br/>
                    Here, the energy of the festival builds as percussion, tradition, and devotion come together.
                  </p>
                </div>

                {/* Get Directions Anchor */}
                <div className="mt-6 pointer-events-auto">
                  <a 
                    href="https://maps.app.goo.gl/ftmGLghyHnhEk4vp8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full border border-[#D4AF37]/50 bg-black/60 backdrop-blur text-[#D4AF37] font-sans tracking-widest text-xs uppercase transition-all duration-300 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Panel (~180px) */}
            <div className="relative h-[180px] w-full border-t border-[#D4AF37]/30 overflow-hidden z-10 bg-black transition-all duration-500">
              <div className="absolute inset-0 bg-black mix-blend-color z-10 pointer-events-none" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.7390979401824!2d76.4714157!3d10.6003264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba80b8bd5555555%3A0xe53a3eb7fa450b73!2sRM%20Vela%20Mandham!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[85%] contrast-[1.1] brightness-[0.7] invert-[5%] w-full h-full group-hover:brightness-[0.9] transition-all duration-500"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 bg-[#D4AF37]/30 rounded-full animate-ping absolute -top-3 -left-3" />
                <MapPin className="text-[#D4AF37] w-6 h-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] fill-black/50" />
              </div>
            </div>
          </motion.div>

          {/* Location 2: Vela Parambu */}
          <motion.div 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants}
            className="group relative bg-[#0a0a0a] rounded-2xl border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/70 hover:shadow-[0_0_60px_rgba(212,175,55,0.3)] w-full max-w-[420px] mx-auto h-auto"
          >
            {/* Cinematic Image & Text Block (~340px min-height to expand based on text) */}
            <div className="relative w-full flex flex-col min-h-[340px] flex-grow overflow-hidden">
              
              {/* Background Layers */}
              <div className="absolute inset-0 z-0 bg-black">
                <motion.div
                  className="w-full h-full bg-cover bg-center opacity-[0.85] group-hover:brightness-110 transition-all duration-700"
                  style={{ backgroundImage: "url('/images/v-parambu-bg.jpg')" }}
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                />
                {/* Cinematic Gradient Overlay */}
                <div 
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))" }}
                />
                {/* Soft Vignette Edge Darkening */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[1] pointer-events-none" />
                {/* Spark/Firework Flicker overlay */}
                <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-color-dodge animate-[pulse_4s_infinite_alternate] z-[1] pointer-events-none" />
                {/* Hover Glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-[2]" />
              </div>

              {/* Text Layout */}
              <div className="relative z-10 p-7 md:p-8 flex flex-col h-full flex-grow pointer-events-none text-left justify-end">
                <div>
                  <MapPin className="text-[#D4AF37] w-7 h-7 mb-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-[#ffffff] mb-1 leading-tight drop-shadow-lg">
                    Vela Parambu
                  </h3>
                  <p className="font-serif italic text-[#D4AF37] text-base lg:text-lg tracking-wider mb-4 drop-shadow-md font-medium">
                    വേള പറമ്പ്
                  </p>
                  
                  <p className="font-sans text-[rgba(255,255,255,0.85)] text-sm leading-relaxed drop-shadow-md font-light">
                    The grand stage of the festival where the spectacular Vedikkettu fireworks illuminate the night sky.
                    <br/><br/>
                    This ground also hosts the magnificent festival pandhal and gathering of thousands of devotees.
                  </p>
                </div>

                {/* Get Directions Anchor */}
                <div className="mt-6 pointer-events-auto">
                  <a 
                    href="https://maps.app.goo.gl/iXJRnMjMyuSyb2VdA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-full border border-[#D4AF37]/50 bg-black/60 backdrop-blur text-[#D4AF37] font-sans tracking-widest text-xs uppercase transition-all duration-300 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Panel (~180px) */}
            <div className="relative h-[180px] w-full border-t border-[#D4AF37]/30 overflow-hidden z-10 bg-black transition-all duration-500">
              <div className="absolute inset-0 bg-black mix-blend-color z-10 pointer-events-none" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.730101869811!2d76.4716757!3d10.6015794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba80b8df9b9a6b1%3A0xe53a3eb7fa450b73!2sKannambra%20Vela%20Parambu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[85%] contrast-[1.1] brightness-[0.7] invert-[5%] w-full h-full group-hover:brightness-[0.9] transition-all duration-500"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 bg-[#D4AF37]/30 rounded-full animate-ping absolute -top-3 -left-3" />
                <MapPin className="text-[#D4AF37] w-6 h-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] fill-black/50" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
