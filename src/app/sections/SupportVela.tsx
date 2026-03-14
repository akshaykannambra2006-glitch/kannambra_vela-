"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SupportVelaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);
  
  const upiId = "qr918590335380-4306@unionbankofindia";
  const bankAccount = "520101058204306";
  const ifscCode = "UBIN0901059";

  // Slow 25-second continuous Ken Burns effect via CSS animation class 
  // tied with scroll transform for entry scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const entryScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Generate subtle embers for the background
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([]);
  
  useEffect(() => {
    setEmbers(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 10, 
        duration: 8 + Math.random() * 15, // slower upward movement
        size: Math.random() * 2.5 + 1
      }))
    );
  }, []);

  const handleCopy = async (text: string, setCopied: (val: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Stagger variants for content
  const staggervariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={containerRef} id="support" className="relative overflow-hidden w-full min-h-screen bg-[#030303] flex items-center justify-center py-32">
      
      {/* Background Image Layer - 25s slow zoom loop */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0 origin-center animate-[kenburns_25s_infinite_alternate_ease-in-out]"
        style={{ scale: entryScale, opacity: 0.2 }}
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `url("https://lh3.googleusercontent.com/d/1ZyCbf5OWngcMFmii6h3JSM-gjD5PVVeb=w2000") center/cover no-repeat`
          }}
        />
      </motion.div>

      {/* Atmospheric Smoke Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />

      {/* Cinematic Dark Gradient Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%)"
        }}
      />

      {/* Subtle Golden Fireworks Flicker */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none mix-blend-screen opacity-5 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.8)_0%,transparent_70%)] animate-[pulse_8s_infinite_alternate]" />

      {/* Spark Particles Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
        {embers.map((ember) => (
          <motion.div
            key={`ember-${ember.id}`}
            className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[0.5px]"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.x}%`,
              opacity: 0.15 + Math.random() * 0.2, // very low opacity
              boxShadow: "0 0 8px 1px rgba(255, 122, 0, 0.3)"
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: [`${ember.x}%`, `${ember.x + (Math.random() * 15 - 7.5)}%`],
              opacity: [0, 0.6, 0]
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
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12 flex flex-col items-center justify-center">
        
        {/* Main Title Section */}
        <motion.div 
          custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
          className="text-center w-full mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-antique-gold)] opacity-50" />
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.3)] tracking-widest uppercase leading-none">
              Support
              <br className="md:hidden"/> The Vela
            </h2>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-antique-gold)] opacity-50" />
          </div>
          <p className="font-serif italic text-[#D4AF37] tracking-[0.2em] md:tracking-[0.4em] text-lg md:text-2xl drop-shadow-md opacity-90">
            Preserving Tradition Together
          </p>
        </motion.div>

        {/* Intro Message */}
        <motion.div 
          custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
          className="max-w-3xl text-center mb-20"
        >
          <p className="text-white/80 font-sans tracking-wide leading-relaxed text-lg md:text-xl">
            For generations, Kannambra – Rishinaradamangalam Vela has been a celebration of devotion, culture, and community.
            <br/><br/>
            Your support helps preserve this timeless tradition and ensures that the spirit of the Vela continues to inspire generations to come.
          </p>
        </motion.div>

        {/* Donation Cards Grid - 3 Columns Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full mb-24">
          
          {/* Card 1: QR Code Donation */}
          <motion.div 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
            className="group relative bg-black/40 backdrop-blur-md rounded-2xl p-8 lg:p-10 border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] h-full"
          >
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="font-serif text-2xl text-[var(--color-antique-gold)] tracking-widest uppercase mb-10 text-center relative z-10 w-full border-b border-[#D4AF37]/10 pb-4">
              QR Code
            </h3>
            
            <div className="flex-grow flex flex-col items-center justify-center w-full">
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8 bg-white p-3 rounded-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-[pulse_4s_infinite_alternate]">
                <Image 
                  src="/images/donation-qr.jpg" 
                  alt="Donation QR Code" 
                  fill
                  quality={100}
                  unoptimized={true}
                  className="object-contain rounded-lg"
                />
              </div>
              
              <p className="text-sm md:text-base text-white/60 tracking-wider text-center font-sans max-w-[250px] relative z-10">
                Scan to support Kannambra – Rishinaradamangalam Vela.
              </p>
            </div>
          </motion.div>

          {/* Card 2: UPI Donation */}
          <motion.div 
            custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
            className="group relative bg-black/40 backdrop-blur-md rounded-2xl p-8 lg:p-10 border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] h-full"
          >
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="font-serif text-2xl text-[var(--color-antique-gold)] tracking-widest uppercase mb-10 text-center relative z-10 w-full border-b border-[#D4AF37]/10 pb-4">
              UPI Donation
            </h3>
            
            <div className="flex-grow flex flex-col items-center justify-center w-full">
              <div className="w-20 h-20 mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.05)] text-[#D4AF37]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                  <path d="M6 15h.01" />
                  <path d="M10 15h.01" />
                </svg>
              </div>
              
              <div className="w-full flex flex-col items-center gap-6 relative z-10">
                <div className="w-full text-center p-4 bg-black/50 border border-white/10 rounded-lg overflow-hidden">
                  <p className="text-white/80 font-mono text-sm sm:text-base break-all select-all">
                    {upiId}
                  </p>
                </div>
                
                <button 
                  onClick={() => handleCopy(upiId, setCopiedUpi)}
                  className="relative overflow-hidden px-8 py-3 rounded-full border border-[#D4AF37]/50 bg-black/50 text-[#D4AF37] font-sans tracking-widest text-xs lg:text-sm uppercase transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95 flex items-center gap-3 w-max"
                >
                  <AnimatePresence mode="wait">
                    {copiedUpi ? (
                      <motion.span 
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 text-green-400"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Copied to clipboard
                      </motion.span>
                    ) : (
                      <motion.span 
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy UPI ID
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Bank Transfer */}
          <motion.div 
            custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
            className="group relative bg-black/40 backdrop-blur-md rounded-2xl p-8 lg:p-10 border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_50px_rgba(212,175,55,0.1)] h-full"
          >
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="font-serif text-2xl text-[var(--color-antique-gold)] tracking-widest uppercase mb-10 text-center relative z-10 w-full border-b border-[#D4AF37]/10 pb-4">
              Bank Transfer
            </h3>
            
            <div className="flex-grow flex flex-col justify-center items-center w-full relative z-10">
                <div className="w-16 h-16 mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.05)] text-[#D4AF37]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="22"></line>
                        <path d="M5 17h14"></path>
                        <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"></path>
                        <path d="M4 22V17"></path>
                        <path d="M20 22V17"></path>
                        <path d="M2 2h20"></path>
                    </svg>
                </div>

                <div className="w-full space-y-5 text-center flex-grow flex flex-col justify-center">
                    
                    <div>
                        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">Account Name</p>
                        <p className="text-white/90 font-sans text-sm tracking-wide">R. Mangalam Desam Vela Committee</p>
                    </div>

                    <div>
                        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">Bank</p>
                        <p className="text-white/90 font-sans text-sm tracking-wide">Union Bank of India</p>
                    </div>

                    <div>
                        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">Branch</p>
                        <p className="text-white/90 font-sans text-sm tracking-wide">Kannambra, Palakkad – 678686</p>
                    </div>

                    <div className="pt-2 border-t border-white/10 w-[80%] mx-auto">
                        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">Account Number</p>
                        <p className="text-[#D4AF37] font-mono text-base tracking-widest drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] select-all">{bankAccount}</p>
                    </div>

                    <div className="pb-2">
                        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-1">IFSC Code</p>
                        <p className="text-[#D4AF37] font-mono text-base tracking-widest drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] select-all">{ifscCode}</p>
                    </div>

                </div>

                {/* Bank Copy Action Buttons */}
                <div className="flex gap-4 mt-8 w-full justify-center">
                    <button 
                        onClick={() => handleCopy(bankAccount, setCopiedBank)}
                        className="relative overflow-hidden px-4 py-2 rounded-full border border-[#D4AF37]/50 bg-black/50 text-[#D4AF37] font-sans tracking-widest text-[10px] uppercase transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center min-w-[130px]"
                    >
                        <AnimatePresence mode="wait">
                            {copiedBank ? (
                            <motion.span 
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5 text-green-400"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Copied!
                            </motion.span>
                            ) : (
                            <motion.span 
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Copy A/C No
                            </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    <button 
                        onClick={() => handleCopy(ifscCode, setCopiedIfsc)}
                        className="relative overflow-hidden px-4 py-2 rounded-full border border-[#D4AF37]/50 bg-black/50 text-[#D4AF37] font-sans tracking-widest text-[10px] uppercase transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95 flex items-center justify-center min-w-[110px]"
                    >
                        <AnimatePresence mode="wait">
                            {copiedIfsc ? (
                            <motion.span 
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5 text-green-400"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                Copied!
                            </motion.span>
                            ) : (
                            <motion.span 
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1.5"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                Copy IFSC
                            </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
          </motion.div>

        </div>

        {/* Final Closing Message */}
        <motion.div 
          custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants as any}
          className="text-center pb-12 w-full max-w-4xl"
        >
          <h4 className="font-serif text-[var(--color-antique-gold)] text-lg md:text-2xl drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] leading-relaxed px-4">
            Every contribution helps keep the traditions of<br className="hidden md:block"/> Kannambra – Rishinaradamangalam Vela alive.
          </h4>
        </motion.div>

      </div>
    </section>
  );
}
