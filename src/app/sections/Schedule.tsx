"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const scheduleEvents = [
  {
    time: "Day 1",
    title: "Kodiyettam",
    description: "The sacred flag hoisting ceremony marking the official beginning of the Vela.",
  },
  {
    time: "Day 2-3",
    title: "Cultural Programs",
    description: "Traditional folk arts, Kathakali, and classical music performances at the temple grounds.",
  },
  {
    time: "Day 4",
    title: "Elephant Procession Starts",
    description: "The initial gathering of caparisoned elephants arriving from different desams.",
  },
  {
    time: "Day 5 (Morning)",
    title: "Panchavadyam & Melam",
    description: "The grand ensemble of over 100 percussionists creating the rhythmic heartbeat of the festival.",
  },
  {
    time: "Day 5 (Night)",
    title: "Main Vela Night",
    description: "The pinnacle of the festival. Illuminated elephants, massive crowds, and divine energy.",
  },
  {
    time: "Day 6 (Early Morning)",
    title: "Fireworks Finale",
    description: "A spectacular display of traditional pyrotechnics lighting up the Kerala sky.",
  },
];

export default function ScheduleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="schedule" className="bg-[#0A0A0A] py-32">
      <div className="container mx-auto px-6 max-w-5xl" ref={containerRef}>
        <div className="text-center mb-24">
          <h2 className="font-serif text-4xl md:text-6xl text-[var(--color-antique-gold)] tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            2026 FESTIVAL SCHEDULE
          </h2>
          <div className="w-24 h-[1px] bg-[var(--color-temple-red)] mx-auto mt-8" />
        </div>

        <div className="relative">
          {/* Main animated Timeline Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--color-antique-gold)] via-[var(--color-fire-amber)] to-[var(--color-temple-red)] shadow-[0_0_15px_rgba(255,122,0,0.8)]"
            style={{ height: lineHeight }}
          />

          {/* Events */}
          <div className="space-y-16 md:space-y-24">
            {scheduleEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center md:justify-between">
                  
                  {/* Glowing Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-[11px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[var(--color-lamp-glow)] shadow-[0_0_20px_rgba(255,210,127,1)] border-2 border-black z-10"
                  />

                  {/* Desktop Layout - Alternating Cards */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-12' : 'ml-auto pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <span className="font-serif text-[var(--color-antique-gold)] text-sm tracking-[0.2em] uppercase block mb-3">
                        {event.time}
                      </span>
                      <h4 className="font-serif text-2xl text-white mb-4 drop-shadow-md">
                        {event.title}
                      </h4>
                      <p className="font-sans text-white/50 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Mobile Layout - One Sided */}
                  <div className="pl-16 md:hidden w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <span className="font-serif text-[var(--color-antique-gold)] text-sm tracking-[0.2em] uppercase block mb-2">
                        {event.time}
                      </span>
                      <h4 className="font-serif text-xl text-white mb-3">
                        {event.title}
                      </h4>
                      <p className="font-sans text-white/50 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
