"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background lamp glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[var(--color-lamp-glow)] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-[var(--color-antique-gold)] rounded-full flex items-center justify-center text-[var(--color-antique-gold)]">
                <span className="font-serif text-lg font-bold">K</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base tracking-[0.2em] font-medium text-white">KANNAMBRA</span>
                <span className="font-serif text-[0.45rem] tracking-[0.2em] md:tracking-[0.3em] text-[var(--color-antique-gold)] whitespace-nowrap">RISHINARADAMANGALAM VELA</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              The grand traditional Kerala temple festival of Rhythm, Fire and Culture. Experience the sacred energy of Sree Kurumba Bhagavathy Temple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[var(--color-antique-gold)] tracking-widest text-sm mb-6 uppercase">Explore</h4>
            <ul className="space-y-4">
              {['About', 'Elephants', 'Panchavadyam', 'Schedule', 'Gallery'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white text-sm transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-[var(--color-antique-gold)] tracking-widest text-sm mb-6 uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={18} className="text-[var(--color-temple-red)] shrink-0 mt-0.5" />
                <span>Sree Kurumba Bhagavathy Temple,<br />Kannambra, Palakkad,<br />Kerala 678686</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={18} className="text-[var(--color-temple-red)] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={18} className="text-[var(--color-temple-red)] shrink-0" />
                <span>info@kannambravela.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-[var(--color-antique-gold)] tracking-widest text-sm mb-6 uppercase">Follow Us</h4>
            <p className="text-white/50 text-sm mb-6">
              Stay updated with the latest festival news and highlights.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--color-antique-gold)] hover:text-black hover:border-[var(--color-antique-gold)] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} Kannambra – Rishinaradamangalam Vela Committee. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
