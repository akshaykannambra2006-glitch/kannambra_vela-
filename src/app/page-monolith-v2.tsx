"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Copy, MapPin, Volume2, ExternalLink } from "lucide-react";

// --- 1. Global Ember Sparks ---
const EmberSparks = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#FF7A00] rounded-full"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: -100,
            x: `+=${Math.random() * 100 - 50}`,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{ boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.8)" }}
        />
      ))}
    </div>
  );
};

// --- 2. Hero Section ---
function HeroSection() {
  const [showTrailer, setShowTrailer] = useState(false);
  
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!showTrailer ? (
          <motion.div
            key="bg-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src="https://drive.google.com/uc?export=view&id=18kry63LjhsYx0iehzyX64jj4w2WP3NzN"
              alt="Hero Background"
              fill
              unoptimized
              className="object-cover scale-110 animate-[kenburns_20s_ease-out_infinite_alternate]"
            />
          </motion.div>
        ) : (
          <motion.div
            key="bg-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <iframe
              src="https://www.youtube.com/embed/RO_HRE2yjgE?start=30&end=36&autoplay=1&mute=1&loop=1&playlist=RO_HRE2yjgE&controls=0&showinfo=0&rel=0"
              className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] sm:w-[150vw] sm:h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-80 pointer-events-none mix-blend-screen"
              allow="autoplay; encrypted-media"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0F0F0F]" />
      
      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-bold tracking-widest text-[#D4AF37] mb-8"
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
        >
          RISHINARADAMANGALAM DESAM
        </motion.h1>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 mt-8"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 1 }}
        >
          <button className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F] transition-all duration-500 font-serif tracking-widest text-sm bg-black/50 backdrop-blur-sm cursor-pointer">
            EXPLORE FESTIVAL
          </button>
          <button 
            onClick={() => setShowTrailer(!showTrailer)}
            className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-[#0F0F0F] hover:from-[#B87333] hover:to-[#D4AF37] transition-all duration-500 font-serif tracking-widest text-sm flex items-center justify-center gap-2 group cursor-pointer"
          >
            {showTrailer ? "CLOSE TRAILER" : "WATCH CINEMATIC TRAILER"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// --- 3. Countdown Section ---
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date("May 25, 2026 00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex flex-col md:flex-row border-y border-white/10">
      <div className="relative flex-1 h-[60vh] md:h-[80vh] overflow-hidden group">
        <iframe 
          className="absolute inset-0 w-full h-full object-cover scale-[1.5] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
          src="https://drive.google.com/file/d/1RCNon0ulxSte8oeNSxw33-Pb4_3BKsOL/preview?autoplay=1&mute=1&loop=1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/50 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-4">KUMMATTI</h2>
          <p className="text-xl tracking-widest text-[#F7F3E9]/80 mb-12 uppercase">May 24 2026</p>
        </div>
      </div>

      <div className="relative flex-1 h-[60vh] md:h-[80vh] overflow-hidden group border-t md:border-t-0 md:border-l border-white/10">
        <iframe 
          className="absolute inset-0 w-full h-full object-cover scale-[1.5] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
          src="https://drive.google.com/file/d/1kGRaQ3UJxVMBSd7EJsxw6xLGQbHUJ4SC/preview?autoplay=1&mute=1&loop=1" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/50 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-4">VELA</h2>
          <p className="text-xl tracking-widest text-[#F7F3E9]/80 mb-12 uppercase">May 25 2026</p>
        </div>
      </div>

      {mounted && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] md:w-auto bg-[#0F0F0F]/80 backdrop-blur-md border border-[#D4AF37]/30 p-8 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="flex justify-center gap-4 md:gap-8 pb-4">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.mins },
              { label: "SECS", value: timeLeft.secs },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center w-16 md:w-24">
                <span className="text-3xl md:text-5xl font-serif text-[#D4AF37] tabular-nums">{item.value.toString().padStart(2, '0')}</span>
                <span className="text-[10px] md:text-xs tracking-widest text-white/50 mt-2">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
             <motion.div 
               className="absolute left-0 top-0 bottom-0 bg-[#FF7A00] shadow-[0_0_10px_#FF7A00]"
               initial={{ width: "100%" }} animate={{ width: "0%" }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
             <motion.div
               className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_10px_rgba(255,122,0,0.8)]"
               initial={{ left: "100%" }} animate={{ left: "0%" }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </div>
      )}
    </section>
  );
}

// --- 4. Panchavadyam Section ---
function PanchavadyamSection() {
  const [hoveredInstrument, setHoveredInstrument] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-24 group border-b border-white/10">
      <iframe 
        className="absolute inset-0 w-full h-full sm:w-[150vw] sm:h-[150vh] object-cover scale-[1.5] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-screen"
        src={`https://www.youtube.com/embed/V1vrgMbjgg4?autoplay=1&mute=${audioEnabled ? '0' : '1'}&loop=1&playlist=V1vrgMbjgg4&controls=0&showinfo=0`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-black/80 to-[#0F0F0F]" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-7xl font-serif text-[#D4AF37] mb-16 tracking-widest">PANCHAVADYAM</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8 mb-16">
          {["Chenda", "Kombu", "Elathalam", "Kuzhal"].map(instrument => (
            <motion.div
              key={instrument}
              className="relative text-2xl md:text-4xl font-serif text-white/50 hover:text-[#D4AF37] transition-colors duration-500 cursor-pointer p-4 group"
              onMouseEnter={() => setHoveredInstrument(instrument)}
              onMouseLeave={() => setHoveredInstrument(null)}
            >
              {instrument}
              <AnimatePresence>
                 {hoveredInstrument === instrument && (
                   <motion.div 
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 50 }}
                     className="absolute -top-12 left-1/2 -translate-x-1/2 text-sm text-[#FF7A00] tracking-widest whitespace-nowrap"
                   >
                     Sacred Sounds
                   </motion.div>
                 )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="px-8 py-4 border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-[#0F0F0F] transition-all duration-500 font-serif tracking-widest text-sm flex items-center gap-3 mx-auto cursor-pointer"
        >
          <Volume2 size={20} /> {audioEnabled ? "MUTE SOUNDS" : "FEEL THE RHYTHM"}
        </button>
      </div>
    </section>
  );
}

// --- 5. Karnan Section ---
function KarnanSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
      <iframe 
        className="absolute inset-0 w-full h-[150vh] xl:h-[200vh] -translate-y-1/4 xl:-translate-y-1/4 scale-[1.2] pointer-events-none opacity-30 mix-blend-luminosity grayscale-[50%] sepia-[20%]"
        src="https://www.youtube.com/embed/IboCRpXYajM?start=59&end=62&autoplay=1&mute=1&loop=1&playlist=IboCRpXYajM&controls=0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-[#0F0F0F] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-transparent to-[#0F0F0F]" />
      
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8">
        <div className="w-full md:w-1/3 text-left">
           <p className="text-[#D4AF37]/70 font-serif italic text-xl md:text-2xl leading-relaxed border-l border-[#D4AF37] pl-6 py-2">
             "A legend etched in time.<br/>The pride of the festival."
           </p>
        </div>
        
        <div className="w-full md:w-1/3 text-center my-16 md:my-0">
          <h2 className="text-5xl md:text-8xl font-serif text-[#D4AF37] tracking-wider drop-shadow-[0_0_20px_rgba(212,175,55,0.8)]">
            മംഗലാംകുന്ന്<br/>കർണൻ
          </h2>
          <p className="mt-6 text-white/50 tracking-[0.3em] text-sm uppercase">Mangalamkunnu Karnan</p>
        </div>
        
        <div className="w-full md:w-1/3 text-right">
           <p className="text-[#D4AF37]/70 font-serif italic text-xl md:text-2xl leading-relaxed border-r border-[#D4AF37] pr-6 py-2">
             "His majestic presence elevating<br/>the devotion of Kannambra."
           </p>
        </div>
      </div>
    </section>
  );
}

// --- 6. Vedikkettu Section ---
function VedikkettuSection() {
  return (
    <section className="relative min-h-screen py-32 overflow-hidden border-b border-white/10 flex flex-col items-center">
      <div className="absolute inset-0">
        <Image 
          src="https://scontent-maa3-3.xx.fbcdn.net/v/t39.30808-6/482252700_1056230693212566_88887171283276178_n.jpg"
          alt="Fireworks Back"
          fill
          unoptimized
          className="object-cover opacity-20 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        />
        <iframe 
          className="absolute inset-0 w-full h-[150vh] scale-[1.5] -translate-y-1/4 pointer-events-none opacity-40 mix-blend-screen"
          src="https://drive.google.com/file/d/1ZyCbf5OWngcMFmii6h3JSM-gjD5PVVeb/preview?autoplay=1&mute=1&loop=1"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-black/60 to-[#0F0F0F]" />
        <div className="absolute inset-0 bg-white opacity-0 animate-[pulse_5s_ease-out_infinite] mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-serif text-[#FF7A00] mb-4 drop-shadow-[0_0_15px_rgba(255,122,0,0.8)] tracking-widest">
          VEDIKKETTU
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg font-serif">
          One of the largest fireworks spectacles in Kerala, painting the night sky in devotion.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        <div className="relative h-[600px] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,122,0,0.2)]">
          <iframe 
            src="https://www.youtube.com/embed/P9k5toNoGMI?autoplay=1&mute=1&loop=1&playlist=P9k5toNoGMI&controls=0&showinfo=0"
            className="absolute inset-0 w-full h-[120%] -translate-y-[10%] pointer-events-none object-cover scale-[1.2]"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" />
          <div className="absolute bottom-6 left-6 text-2xl font-serif text-white tracking-widest drop-shadow-lg">
            DRONE FOOTAGE
          </div>
        </div>

        <div className="relative h-[600px] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <Image 
            src="https://drive.google.com/uc?export=view&id=1fn5T2J2W1PrHtWX3sfJi2JKHJ2_crU2W"
            fill
            unoptimized
            alt="Kuzhiminnal"
            className="object-cover scale-110 hover:scale-100 transition-transform duration-1000 origin-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 right-6 text-2xl font-serif text-[#D4AF37] tracking-widest text-right">
            KUZHIMINNAL<br/>PREPARATION
          </div>
        </div>
      </div>
    </section>
  );
}

// --- 7. Elephants Section ---
function ElephantsSection() {
  const [selectedElephant, setSelectedElephant] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-32 flex flex-col items-center border-b border-white/10 overflow-hidden transition-all duration-1000">
      <AnimatePresence mode="wait">
        {selectedElephant === "ayyappan" ? (
          <motion.div key="video-bg" initial={{opacity: 0}} animate={{opacity: 0.4}} exit={{opacity: 0}} className="absolute inset-0">
             <iframe 
                className="absolute inset-0 w-full h-[150vh] scale-[1.2] -translate-y-1/4 pointer-events-none mix-blend-screen"
                src="https://www.youtube.com/embed/YVnBaT3oMqM?autoplay=1&mute=1&loop=1&playlist=YVnBaT3oMqM&controls=0"
             />
          </motion.div>
        ) : (
          <motion.div key="img-bg" initial={{opacity: 0}} animate={{opacity: 0.3}} exit={{opacity: 0}} className="absolute inset-0">
            <Image
              src="https://drive.google.com/uc?export=view&id=1kQOpNaeFeATgzcCyAxXnVZ2ekg6AOu9T"
              alt="Elephants Default"
              fill
              unoptimized
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-transparent to-[#0F0F0F]" />
      
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-2 drop-shadow-md">ഗജവീരന്മാർ</h2>
        <p className="text-xl md:text-2xl text-white/50 tracking-[0.2em] font-serif uppercase">
          The Giants of Kannambra Vela
        </p>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        {!selectedElephant ? (
           <motion.p 
             initial={{opacity: 0}}
             animate={{opacity: [0.5, 1, 0.5]}} 
             transition={{repeat: Infinity, duration: 3}}
             className="text-[#FF7A00] font-serif tracking-widest mb-12 text-lg"
           >
             SELECT A CARD TO VIEW THE LEGENDS
           </motion.p>
        ) : (
           <motion.button 
             initial={{opacity: 0, y: 10}}
             animate={{opacity: 1, y: 0}}
             onClick={() => setSelectedElephant(null)}
             className="mb-12 text-sm text-white/50 hover:text-[#D4AF37] tracking-widest uppercase border-b border-white/20 hover:border-[#D4AF37] pb-1 transition-colors cursor-pointer"
           >
             Back to Gallery
           </motion.button>
        )}

        <AnimatePresence mode="wait">
          {!selectedElephant ? (
            <motion.div 
              key="gallery"
              initial={{opacity: 0, scale: 0.95}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.95}}
              className="flex justify-center gap-8 w-full"
            >
              <div 
                className="w-72 h-[450px] relative group cursor-pointer overflow-hidden border border-white/10 rounded-xl shadow-xl bg-black"
                onClick={() => setSelectedElephant("ayyappan")}
              >
                <Image 
                  src="https://drive.google.com/uc?export=view&id=1Jbs_YXZfYFeB_p-K0m8rwlFfsYXYeFj1"
                  fill
                  unoptimized
                  alt="Mangalamkunnu Ayyappan"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-6 left-0 right-0 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl text-[#D4AF37] font-serif mb-1">MANGALAMKUNNU</h3>
                  <h4 className="text-2xl text-white font-serif font-bold">AYYAPPAN</h4>
                </div>
              </div>
            </motion.div>
          ) : (
             <motion.div 
               key="expanded"
               initial={{opacity: 0, height: 0}}
               animate={{opacity: 1, height: "auto"}}
               exit={{opacity: 0, height: 0}}
               className="w-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(212,175,55,0.15)]"
             >
               <div className="p-12 w-full md:w-1/3 flex flex-col justify-center text-center md:text-right border-b md:border-b-0 md:border-r border-white/10">
                 <h3 className="text-sm tracking-[0.3em] text-[#D4AF37] mb-4 uppercase">The Legend</h3>
                 <p className="text-white/80 font-serif leading-relaxed text-lg">
                   Known for his majestic headposture and calm demeanor, Ayyappan is a commanding presence at Kannambra.
                 </p>
               </div>
               
               <div className="relative w-full md:w-1/3 h-[500px]">
                 <Image 
                    src="https://drive.google.com/uc?export=view&id=1Jbs_YXZfYFeB_p-K0m8rwlFfsYXYeFj1"
                    fill
                    unoptimized
                    alt="Mangalamkunnu Ayyappan"
                    className="object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 md:opacity-100 opacity-0" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80 opacity-100 md:opacity-0" />
               </div>

               <div className="p-12 w-full md:w-1/3 flex flex-col justify-center text-center md:text-left border-t md:border-t-0 md:border-l border-white/10">
                 <h3 className="text-sm tracking-[0.3em] text-[#D4AF37] mb-4 uppercase">Stature</h3>
                 <ul className="text-white/80 font-serif space-y-4 text-lg">
                   <li><span className="text-[#D4AF37]">Height:</span> Majestic</li>
                   <li><span className="text-[#D4AF37]">Tusk:</span> Perfect Arch</li>
                   <li><span className="text-[#D4AF37]">Origin:</span> Mangalamkunnu</li>
                 </ul>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- 8. Location Section ---
function LocationSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 border-b border-white/10 overflow-hidden">
      <iframe 
        className="absolute inset-0 w-full h-[150vh] scale-[1.5] -translate-y-1/4 pointer-events-none opacity-20 mix-blend-screen"
        src="https://www.youtube.com/embed/RO_HRE2yjgE?start=30&end=36&autoplay=1&mute=1&loop=1&playlist=RO_HRE2yjgE&controls=0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-black/70 to-[#0F0F0F]" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-serif text-[#D4AF37] mb-16 tracking-widest text-center">FESTIVAL LOCATIONS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <a href="https://maps.app.goo.gl/ftmGLghyHnhEk4vp8" target="_blank" rel="noreferrer" className="group relative bg-[#0F0F0F]/60 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-[#D4AF37] transition-all duration-500 overflow-hidden flex items-center justify-between">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-serif text-white mb-2">ഋഷിനാരദമംഗലം ദേശം</h3>
              <p className="text-sm tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
                <MapPin size={16} /> Location 1
              </p>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all">
              <ExternalLink size={20} />
            </div>
          </a>

          <a href="https://maps.app.goo.gl/iXJRnMjMyuSyb2VdA" target="_blank" rel="noreferrer" className="group relative bg-[#0F0F0F]/60 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:border-[#D4AF37] transition-all duration-500 overflow-hidden flex items-center justify-between">
            <div className="absolute inset-0 bg-gradient-to-l from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-serif text-white mb-2">വേല പറമ്പ്</h3>
              <p className="text-sm tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
                <MapPin size={16} /> Location 2
              </p>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all">
              <ExternalLink size={20} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// --- 9. Support Section ---
function SupportSection() {
  const upiId = "qr918590335380-4306@unionbankofindia";
  const [copied, setCopied] = useState(false);

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <section className="relative min-h-[90vh] py-24 flex items-center justify-center border-b border-white/10 text-center overflow-hidden">
      <iframe 
        className="absolute inset-0 w-full h-[150vh] scale-[1.2] -translate-y-1/4 pointer-events-none opacity-20 mix-blend-screen"
        src="https://drive.google.com/file/d/1HlwGYSqFxlY43M5AgeyXavdyq9f8K77T/preview?autoplay=1&mute=1&loop=1"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/80 to-[#0F0F0F]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-2 tracking-widest drop-shadow-lg">SUPPORT THE VELA</h2>
        <p className="text-xl text-white/60 tracking-[0.2em] font-serif uppercase mb-12">
          Preserving Tradition Together
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* UPI Box */}
           <div className="bg-[#0F0F0F]/80 backdrop-blur-xl border border-[#D4AF37]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.1)] flex flex-col items-center justify-center">
             <div className="relative w-48 h-48 mb-8 border-4 border-[#D4AF37]/50 rounded-xl overflow-hidden p-2 bg-white">
               <Image 
                  src="https://drive.google.com/uc?export=view&id=1iOOvx-M3P-nTRF7eRHVr8_Sz20flL3Nb"
                  fill
                  unoptimized
                  alt="UPI QR Code"
                  className="object-contain p-2"
               />
             </div>
             
             <button className="flex items-center gap-4 bg-black/50 py-4 px-6 rounded-full border border-white/10 mb-4 mx-auto hover:border-[#D4AF37] transition-colors cursor-pointer w-full justify-center group" onClick={copyUpi}>
               <span className="text-sm md:text-base font-mono text-[#D4AF37] truncate">{copied ? "COPIED!" : upiId}</span>
               <Copy size={16} className="text-white/50 group-hover:text-white shrink-0" />
             </button>

             <p className="text-white/40 tracking-widest text-xs uppercase">Scan to donate directly via UPI</p>
           </div>

           {/* Bank Details Box */}
           <div className="bg-[#0F0F0F]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-center text-left hover:border-[#D4AF37]/50 transition-colors">
              <h3 className="text-2xl font-serif text-[#D4AF37] mb-6 tracking-widest border-b border-white/10 pb-4">BANK TRANSFER</h3>
              
              <div className="space-y-4 font-serif text-white/80 text-lg">
                <div>
                   <span className="block text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Account Name</span>
                   <p>Kannambra Vela Committee</p>
                </div>
                <div>
                   <span className="block text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Account Number</span>
                   <p className="font-mono text-xl">4306 0000 0000</p>
                </div>
                <div>
                   <span className="block text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">IFSC Code</span>
                   <p className="font-mono text-xl">UBIN0000000</p>
                </div>
                <div>
                   <span className="block text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Bank Name</span>
                   <p>Union Bank of India</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

// --- 10. Main Page Container ---
export default function MasterV2Page() {
  return (
    <div className="relative bg-[#0F0F0F] text-[#F7F3E9] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-[#0F0F0F] overflow-x-hidden">
      <EmberSparks />
      <HeroSection />
      <CountdownSection />
      <PanchavadyamSection />
      <KarnanSection />
      <VedikkettuSection />
      <ElephantsSection />
      <LocationSection />
      <SupportSection />
      
      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10 text-center text-white/40 font-serif tracking-widest text-xs uppercase">
        © 2026 Kannambra Vela. Tradition lives on.
      </footer>
    </div>
  );
}
