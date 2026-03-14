"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ----------------------------------------------------------------------
// Time Calculation Helper
// ----------------------------------------------------------------------
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const formatNumber = (num: number) => num.toString().padStart(2, '0');

// ----------------------------------------------------------------------
// Countdown Timer Component
// ----------------------------------------------------------------------
interface CountdownDisplayProps {
  targetDate: string;
}

const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return <div className="h-24 md:h-32 opacity-0" />; // skeleton height

  return (
    <div className="flex gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 relative z-10">
      <TimeBlock value={timeLeft.days} label="Days" />
      <Spacer />
      <TimeBlock value={timeLeft.hours} label="Hours" />
      <Spacer />
      <TimeBlock value={timeLeft.minutes} label="Minutes" />
      <Spacer />
      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center justify-center p-2">
    <div className="text-4xl md:text-5xl lg:text-7xl font-serif text-[var(--color-antique-gold)] font-light drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] tabular-nums leading-none">
      {formatNumber(value)}
    </div>
    <div className="text-[10px] md:text-xs text-[var(--color-ivory)] tracking-[0.2em] uppercase mt-2 opacity-80 font-light">
      {label}
    </div>
  </div>
);

const Spacer = () => (
  <div className="text-2xl md:text-4xl lg:text-5xl font-serif text-[var(--color-antique-gold)] font-light opacity-30 pt-1 md:pt-3">
    :
  </div>
);

// ----------------------------------------------------------------------
// Fuse Animation Component
// ----------------------------------------------------------------------
const FuseAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const fuseWidth = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const sparksX = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest > 0.8 && !isDone) setIsDone(true);
      else if (latest <= 0.8 && isDone) setIsDone(false);
    });
  }, [scrollYProgress, isDone]);

  const sparks = Array.from({ length: 15 }).map((_, i) => ({
    id: i, delay: Math.random() * 0.5, duration: 0.5 + Math.random() * 0.5,
    x: (Math.random() - 0.5) * 40, y: -10 - Math.random() * 40, scale: 0.5 + Math.random() * 1
  }));

  return (
    <div ref={containerRef} className="relative w-full h-32 flex items-center justify-center mt-8 z-10 px-4">
      <div className="relative w-full h-1 bg-[var(--color-charcoal-black)] border-t border-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-temple-red)] via-[var(--color-fire-amber)] to-[#FFE8B3] rounded-full shadow-[0_0_20px_rgba(255,122,0,0.8)]"
          style={{ width: fuseWidth }}
        />
      </div>

      <motion.div 
        className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-8 pointer-events-none origin-left"
        style={{ scaleX: sparksX }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 z-30">
          <div className="absolute inset-0 bg-[#FFF3D6] rounded-full blur-[2px] shadow-[0_0_15px_#FFE8B3,0_0_30px_#FF7A00] animate-pulse" />
          {sparks.map(spark => (
            <motion.div
              key={spark.id}
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#FFE8B3] rounded-full shadow-[0_0_5px_#FF7A00]"
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{ x: spark.x, y: spark.y, scale: spark.scale, opacity: 0 }}
              transition={{ duration: spark.duration, repeat: Infinity, delay: spark.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-40"
          >
            <div className="absolute inset-0 bg-[var(--color-antique-gold)] rounded-full blur-[30px] opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-white rounded-full blur-[10px] opacity-60 mix-blend-screen" />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                initial={{ x: "50%", y: "50%", scale: 1, opacity: 1 }}
                animate={{
                  x: `calc(50% + ${(Math.random() - 0.5) * 150}px)`, y: `calc(50% + ${(Math.random() - 0.5) * 150}px)`,
                  scale: 0, opacity: 0
                }}
                transition={{ duration: 0.8 + Math.random() * 0.5, ease: "easeOut" }}
                className="absolute top-0 left-0 w-1.5 h-1.5 bg-[#FFF3D6] rounded-full shadow-[0_0_10px_#var(--color-antique-gold)]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Section Export
// ----------------------------------------------------------------------
export default function CountdownSection() {
  const kumattiRef = useRef<HTMLDivElement>(null);
  const velaRef = useRef<HTMLDivElement>(null);
  const velaVidRef = useRef<HTMLVideoElement>(null);

  const kumattiScroll = useScroll({ target: kumattiRef, offset: ["start end", "end start"] });
  const velaScroll = useScroll({ target: velaRef, offset: ["start end", "end start"] });

  const kumattiScale = useTransform(kumattiScroll.scrollYProgress, [0, 1], [1, 1.15]);
  const velaScale = useTransform(velaScroll.scrollYProgress, [0, 1], [1, 1.15]);

  // Force video playback and current time for Vela
  useEffect(() => {
    const velaVid = velaVidRef.current;
    if (velaVid) {
      const handleLoadedMetadata = () => {
        velaVid.currentTime = 15;
      };
      
      const handleTimeUpdate = () => {
        // Simple loop workaround to keep it rolling without the first 15s
        if (velaVid.currentTime >= velaVid.duration - 0.5) {
          velaVid.currentTime = 15;
        }
      };

      velaVid.addEventListener("loadedmetadata", handleLoadedMetadata);
      velaVid.addEventListener("timeupdate", handleTimeUpdate);
      
      return () => {
        velaVid.removeEventListener("loadedmetadata", handleLoadedMetadata);
        velaVid.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  return (
    <section id="countdown" className="relative w-full bg-[var(--color-charcoal-black)] overflow-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100vh] relative">
        
        {/* Central Blend Overlay (Desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-charcoal-black)] to-transparent z-[3] pointer-events-none opacity-90" />

        {/* Top/Bottom Vignette (Global) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-[3] pointer-events-none" />

        {/* KUMATTI BLOCK - LEFT SIDE */}
        <div ref={kumattiRef} className="relative min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center py-24 lg:py-0 overflow-hidden border-b lg:border-b-0 border-[var(--color-charcoal-black)]">
          {/* Background Video (z-index 0) */}
          <motion.div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ scale: kumattiScale }}>
            {/* 
              Note: Using a third party drive stream proxy or standard iframe is sometimes required, 
              but standard `uc?export=download` works on many modern browsers for <video> if it's a small file.
              Alternatively we can embed a youtube version. We will stick to the requested Drive link.
            */}
            <video
              autoPlay muted loop playsInline
              className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-50 blur-[2px]"
              src="/videos/kumatti.mp4"
            />
          </motion.div>

          {/* Dark Overlay (z-index 1) */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/30 via-black/50 to-black/90" 
          />

          {/* Countdown Content (z-index 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-[2] text-center px-4 w-full flex flex-col items-center"
          >
            <div className="inline-block relative">
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FFF3D6] tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] mb-2 relative z-10">
                KUMATTI
              </h2>
              <div className="absolute -inset-8 bg-[var(--color-antique-gold)] opacity-20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
            </div>
            <p className="font-serif text-lg md:text-xl text-[var(--color-ivory)]/90 tracking-widest mt-1 uppercase font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              May 24, 2026
            </p>
            <CountdownDisplay targetDate="2026-05-24T00:00:00+05:30" />
          </motion.div>
        </div>

        {/* VELA BLOCK - RIGHT SIDE */}
        <div ref={velaRef} className="relative min-h-[50vh] lg:min-h-screen flex flex-col items-center justify-center py-24 lg:py-0 overflow-hidden">
          {/* Background Video (z-index 0) */}
          <motion.div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ scale: velaScale }}>
            <video
              ref={velaVidRef}
              autoPlay muted playsInline
              className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-[0.45] blur-[2px]"
              src="/videos/vela.mp4"
            />
          </motion.div>

          {/* Dark Overlay (z-index 1) */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-black/30 via-black/50 to-black/90" 
          />

          {/* Countdown Content (z-index 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative z-[2] text-center px-4 w-full flex flex-col items-center"
          >
            <div className="inline-block relative">
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FFF3D6] tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] mb-2 relative z-10">
                VELA
              </h2>
              <div className="absolute -inset-8 bg-[var(--color-antique-gold)] opacity-20 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
            </div>
            <p className="font-serif text-lg md:text-xl text-[var(--color-ivory)]/90 tracking-widest mt-1 uppercase font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              May 25, 2026
            </p>
            <CountdownDisplay targetDate="2026-05-25T00:00:00+05:30" />
            
            {/* FUSE ANIMATION OVERLAPPING END OF VELA BLOCK */}
            <div className="w-full max-w-sm mx-auto mt-4">
              <FuseAnimation />
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
