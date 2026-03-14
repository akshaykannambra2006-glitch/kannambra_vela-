"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.2)] border border-[var(--color-antique-gold)]/30 group">
      
      {/* Dark gradient vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)] z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
      
      {isInView && (
        <>
          {/* Blurred Duplicate Background Video Layer for Iframe */}
          <div className="absolute inset-0 z-0 overflow-hidden scale-150 saturate-200 blur-2xl opacity-40 pointer-events-none">
            <iframe
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
              src="https://www.youtube.com/embed/P9k5toNoGMI?autoplay=1&mute=1&loop=1&playlist=P9k5toNoGMI&controls=0&modestbranding=1&playsinline=1"
              allow="autoplay; encrypted-media"
              tabIndex={-1}
            />
          </div>

          {/* Foreground Vertical Video IFrame */}
          <div className="absolute inset-0 z-10">
            <iframe
              className="w-full h-full pointer-events-auto"
              src="https://www.youtube.com/embed/P9k5toNoGMI?autoplay=1&mute=1&loop=1&playlist=P9k5toNoGMI&controls=0&modestbranding=1&playsinline=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </>
      )}
    </div>
  );
};

export default function VedikkettuSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Custom scroll progress for the Ken Burns zoom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Flash effect simulation (Vedikkettu light bursts)
      const flash = () => {
        if (!containerRef.current) return;
        const flashOverlay = containerRef.current.querySelector('.vedikkettu-flash');
        if (flashOverlay && Math.random() > 0.5) {
          gsap.fromTo(flashOverlay, 
            { opacity: 0, backgroundColor: "rgba(255,255,255,0)" },
            { 
              // mostly warm orange, sometimes white
              opacity: 0.15 + Math.random() * 0.4, 
              backgroundColor: Math.random() > 0.8 ? "rgba(255,255,255,0.4)" : "rgba(255,180,100,0.2)",
              duration: 0.05 + Math.random() * 0.1, 
              yoyo: true, 
              repeat: Math.random() > 0.6 ? 3 : 1,
              ease: "power1.inOut"
            }
          );
        }
      };
      
      const flashInterval = setInterval(flash, 1500 + Math.random() * 2000);
      return () => clearInterval(flashInterval);
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Generate embers
  const embers = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 8, // staggered start
    duration: 6 + Math.random() * 10, // slow upward movement
    size: Math.random() * 3 + 1
  }));

  // Stagger variants for content
  const staggervariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section ref={containerRef} id="vedikkettu" className="relative overflow-hidden w-full min-h-screen bg-[#030303]">
      
      {/* Dynamic Background Map Image Layer - Low Opacity & Flickering */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full z-0 origin-center animate-[pulse_4s_ease-in-out_Infinity]"
        style={{ scale: heroScale, opacity: 0.15 }}
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `url("https://lh3.googleusercontent.com/d/1ZyCbf5OWngcMFmii6h3JSM-gjD5PVVeb=w2000") center/cover no-repeat`
          }}
        />
      </motion.div>

      {/* Gradient Overlay Layer */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.9))"
        }}
      />

      {/* Firework Light Effect Overlay */}
      <div className="vedikkettu-flash absolute top-0 left-0 w-full h-full z-[1] pointer-events-none mix-blend-screen opacity-0" />

      {/* Spark Particles Layer */}
      <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
        {embers.map((ember) => (
          <motion.div
            key={`hero-${ember.id}`}
            className="absolute bottom-[-10px] rounded-full bg-[#FFB040] blur-[1px]"
            style={{
              width: ember.size,
              height: ember.size,
              left: `${ember.x}%`,
              opacity: 0.3 + Math.random() * 0.3, // low opacity
              boxShadow: "0 0 10px 2px rgba(255, 122, 0, 0.4)"
            }}
            animate={{
              y: ["0vh", "-100vh"],
              x: [`${ember.x}%`, `${ember.x + (Math.random() * 20 - 10)}%`],
              opacity: [0, 0.8, 0]
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
      <div className="relative z-[2] w-full mx-auto px-6 lg:px-12 2xl:px-32 3xl:px-48 pt-40 pb-32">
        <div className="flex flex-col gap-24 lg:gap-32">
          
          {/* Main Title */}
          <motion.div 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants}
            className="text-center w-full mx-auto mb-12"
          >
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D1] to-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] tracking-widest uppercase mb-6 leading-none">
              Vedikkettu
            </h2>
            <p className="font-sans text-[var(--color-antique-gold)] tracking-[0.4em] md:tracking-[0.8em] uppercase text-sm md:text-lg drop-shadow-md">
              The Sky of Kannambra
            </p>
          </motion.div>

          {/* Row 1: Text Content (Left) + Archival Image (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Side: Storytelling Sections 1 & 2 */}
            <div className="flex flex-col gap-16">
              <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)] opacity-50" />
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-antique-gold)] italic drop-shadow-md">The Tradition</h3>
                </div>
                <div className="bg-black/20 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl relative">
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-fire-amber)] to-transparent opacity-50" />
                  <p className="text-white/80 font-sans tracking-wide leading-relaxed text-lg pl-6">
                    The Vedikkettu of Kannambra – Rishinaradamangalam Vela is among the most spectacular fireworks displays in Kerala.
                    <br/><br/>
                    For decades, thousands gather every year to witness the sky of Kannambra erupt in thunder and light.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)] opacity-50" />
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-antique-gold)] italic drop-shadow-md">Preparation</h3>
                </div>
                <div className="bg-black/20 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl relative">
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-fire-amber)] to-transparent opacity-50" />
                  <p className="text-white/80 font-sans tracking-wide leading-relaxed text-lg pl-6">
                    Before the fireworks ignite the sky, rows of Kuzhiminnalas are carefully arranged on the ground.
                    <br/><br/>
                    Each element is placed with precision by skilled artisans who preserve the traditional methods of festival fireworks.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side: Archival Image */}
            <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6 w-full lg:pl-12">
              <div className="relative w-full max-w-[700px] xl:max-w-[850px] mx-auto lg:mx-0 aspect-[4/3] rounded-3xl overflow-hidden border-[2px] border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] group">
                {/* Film grain and vignette overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-overlay z-20 pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)] z-20 pointer-events-none" />
                
                <motion.div
                  whileHover={{ scale: 1.03, filter: "sepia(0.3) brightness(1.1) contrast(1.1)" }}
                  initial={{ filter: "sepia(0.7) brightness(0.85) contrast(1.3)" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full origin-center">
                    <Image 
                      src="/images/kuzhiminnal.jpg" 
                      alt="Traditional Vedikkettu Setup" 
                      fill
                      quality={100}
                      unoptimized={true}
                      className="object-cover object-center"
                    />
                  </motion.div>
                </motion.div>
              </div>
              <p className="text-sm md:text-base text-white/50 tracking-wider text-center lg:text-left font-serif italic px-2">
                An archival photograph showing rows of Kuzhiminnalas arranged before the traditional Vedikkettu display.
              </p>
            </motion.div>

          </div>

          {/* Row 2: Drone Footage (Left) + Text Content (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center lg:pt-16">
            
            {/* Left Side: Drone Footage */}
            <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6 w-full max-w-sm md:max-w-[400px] xl:max-w-[480px] mx-auto lg:mx-0 lg:ml-auto lg:pr-12">
              <VideoPlayer />
            </motion.div>

            {/* Right Side: Storytelling Sections 3 & 4 */}
            <div className="flex flex-col gap-16">
              <motion.div custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)] opacity-50" />
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-antique-gold)] italic drop-shadow-md">The Moment</h3>
                </div>
                <div className="bg-black/20 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl relative">
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-fire-amber)] to-transparent opacity-50" />
                  <p className="text-white/80 font-sans tracking-wide leading-relaxed text-lg pl-6">
                    When the Vedikkettu begins, the silence of the night is broken by powerful explosions.
                    <br/><br/>
                    The sky transforms into a breathtaking canvas of fire, echoing across the temple grounds.
                  </p>
                </div>
              </motion.div>

              <motion.div custom={6} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggervariants} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[var(--color-antique-gold)] opacity-50" />
                  <h3 className="font-serif text-2xl md:text-3xl text-[var(--color-antique-gold)] italic drop-shadow-md">A Festival Attraction</h3>
                </div>
                <div className="bg-black/20 p-8 rounded-xl backdrop-blur-sm border border-white/5 shadow-2xl relative">
                  <div className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[var(--color-fire-amber)] to-transparent opacity-50" />
                  <p className="text-white/80 font-sans tracking-wide leading-relaxed text-lg pl-6">
                    Visitors travel from across Kerala and even other parts of India to witness this iconic display.
                    <br/><br/>
                    For many, the Vedikkettu has become the unforgettable climax of Kannambra Vela.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
