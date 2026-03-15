"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Elephants", href: "#elephants" },
  { name: "Panchavadyam", href: "#panchavadyam" },
  { name: "Schedule", href: "#schedule" },
  { name: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to element if it exists
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/5" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, "#hero")} 
            className="flex items-center gap-3 relative group"
          >
            {/* Subtle backlight glow behind the logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-[var(--color-antique-gold,#D4AF37)] opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-700 pointer-events-none rounded-full" />
            
            {/* Goddess Image Emblem */}
            <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
              {/* Emblem Glow */}
              <div className="absolute inset-0 bg-[var(--color-antique-gold,#D4AF37)] rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <Image 
                src="/images/goddess-logo.png" 
                alt="Sree Kurumba Bhagavathy Emblem" 
                fill
                quality={100}
                unoptimized={true}
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(212,175,55,0.4)]"
              />
            </div>
            
            {/* Decorative temple motif / line */}
            <div className="w-[2px] h-8 md:h-10 bg-gradient-to-b from-transparent via-[var(--color-antique-gold,#D4AF37)] to-transparent rounded-full shadow-[0_0_10px_rgba(212,175,55,0.6)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.9)] transition-all duration-500 ml-1" />
            
            <div className="flex flex-col justify-center">
              {/* Malayalam Primary Text */}
              <span className="text-xl md:text-[1.35rem] font-serif text-[var(--color-antique-gold,#D4AF37)] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] tracking-wide leading-tight mb-0.5 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-500">
                കണ്ണമ്പ്ര – ഋഷിനാരദമംഗലം വേല
              </span>
              
              {/* English Subtitle */}
              <span className="font-cinzel text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] text-[var(--color-antique-gold,#D4AF37)]/80 group-hover:text-white transition-colors duration-300">
                KANNAMBRA – RISHINARADAMANGALAM VELA
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-[var(--color-antique-gold,#D4AF37)] transition-colors relative group font-sans"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[var(--color-antique-gold,#D4AF37)] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none relative z-50 w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-[var(--color-antique-gold,#D4AF37)] transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : "mb-[4px]"}`}></span>
            <span className={`block w-6 h-[2px] bg-[var(--color-antique-gold,#D4AF37)] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "mb-[4px]"}`}></span>
            <span className={`block w-6 h-[2px] bg-[var(--color-antique-gold,#D4AF37)] transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-cinzel tracking-widest text-[#E0E0E0] hover:text-[var(--color-antique-gold,#D4AF37)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[var(--color-antique-gold,#D4AF37)] font-cinzel text-sm tracking-widest opacity-60">RHYTHM • FIRE • TRADITION</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}