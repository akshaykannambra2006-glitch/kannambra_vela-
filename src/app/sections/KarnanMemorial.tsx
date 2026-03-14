"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import Image from "next/image";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function KarnanMemorial() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Arch frame slowly rises upward from the bottom (lift-up animation)
      gsap.fromTo(
        imageContainerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // 2. Slow cinematic camera zoom to the Karnan portrait (1 to 1.08 over 15s)
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.08,
          duration: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%", // Start zooming slightly before fully in view
            toggleActions: "play none none reverse", // Reset when scrolled away
          }
        }
      );

      // 3. Reveal background memory video slightly later in the scroll
      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        {
          opacity: 0.15, // opacity around 15-20% as requested
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%", // triggered later in scroll
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // 4. Cascade text reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        }
      });

      textRefs.current.forEach((el, index) => {
        if (el) {
          tl.fromTo(
            el,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            "-=0.7"
          );
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="karnan" className="bg-[#050505] relative py-32 overflow-hidden">
      
      {/* --- Visual Atmosphere Layers --- */}
      
      {/* Video Memory Effect */}
      <div 
        ref={videoRef}
        className="absolute inset-0 z-0 opacity-0 pointer-events-none mix-blend-screen overflow-hidden"
      >
        <iframe
          className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-sm filter sepia-[50%] contrast-[120%]"
          src="https://www.youtube.com/embed/IboCRpXYajM?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=IboCRpXYajM&mute=1&start=59&end=62"
          title="Karnan Memory Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Black gradient overlay over video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
      </div>

      {/* Subtle floating dust particles */}
      <div 
        className="absolute inset-0 opacity-30 z-0 pointer-events-none bg-repeat animate-[pulse_10s_ease-in-out_infinite]" 
        style={{ backgroundImage: "url('/images/noise.png')" }} 
      />
      
      {/* Cinematic Spotlight / Golden Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[var(--color-antique-gold)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0" />

      <div ref={sectionRef} className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- Header --- */}
        <div className="flex flex-col items-center text-center space-y-6 mb-24">
          <div className="flex items-center gap-4 justify-center" ref={(el) => { if (el) textRefs.current[0] = el; }}>
            <div className="w-16 h-[1px] bg-[var(--color-antique-gold)]/50" />
            <span className="text-[var(--color-antique-gold)] uppercase tracking-[0.4em] text-xs font-serif">In Memoriam</span>
            <div className="w-16 h-[1px] bg-[var(--color-antique-gold)]/50" />
          </div>
          
          <h2 
            className="text-5xl md:text-7xl font-serif text-[var(--color-antique-gold)] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] relative"
            ref={(el) => { if (el) textRefs.current[1] = el; }}
          >
            {/* Subtle temple-lamp glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--color-lamp-glow)] opacity-[0.1] blur-[40px] rounded-full pointer-events-none" />
            മംഗലാംകുന്ന് കർണൻ
          </h2>
          
          <p 
            className="text-white/40 tracking-[0.4em] font-cinzel text-sm relative z-10"
            ref={(el) => { if (el) textRefs.current[2] = el; }}
          >
            1955 — 2021
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* --- Left Side Quote --- */}
          <div className="lg:col-span-4 space-y-8 pr-0 lg:pr-8 text-center lg:text-left order-2 lg:order-1">
            <Quote className="w-12 h-12 text-[var(--color-antique-gold)]/40 mx-auto lg:mx-0 mb-6" />
            <p 
              className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[var(--color-antique-gold)] opacity-90"
              ref={(el) => { if (el) textRefs.current[3] = el; }}
            >
              “Not just an elephant.<br/>
              A legend.<br/>
              A presence that could silence thousands.”
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-[var(--color-antique-gold)]/40 to-transparent mx-auto lg:mx-0" />
          </div>

          {/* --- Central Portrait --- */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div 
              ref={imageContainerRef}
              className="relative w-full max-w-[380px] aspect-[4/5] group"
            >
              {/* Soft golden aura around the arch */}
              <div className="absolute -inset-4 bg-gradient-to-b from-[var(--color-antique-gold)]/60 via-[var(--color-antique-gold)]/10 to-transparent opacity-60 blur-xl rounded-t-full transition-opacity duration-[3s]" />
              
              <div 
                className="relative w-full h-full rounded-t-full overflow-hidden border-2 border-[var(--color-antique-gold)]/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-black"
                style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)" }} // subtle vignette inner shadow
              >
                <Image
                  ref={imageRef as any}
                  src="/images/karnan.jpg" 
                  alt="Mangalamkunnu Karnan Portrait"
                  fill
                  quality={100}
                  unoptimized={true}
                  className="object-cover object-top opacity-90 mix-blend-screen"
                  style={{
                    filter: "sepia(30%) contrast(110%) brightness(0.9)", // slight retro tone
                  }}
                />
                
                {/* Soft golden rim lighting / Vignette over image */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/40 to-[#050505] z-10 pointer-events-none" />
                
                {/* Dark background fade at bottom of arch */}
                <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent z-10 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* --- Right Side Content --- */}
          <div className="lg:col-span-4 space-y-6 pl-0 lg:pl-12 text-center lg:text-left order-3 lg:order-3">
            <h3 
              className="text-3xl font-cinzel text-[var(--color-antique-gold)] tracking-widest uppercase mb-8"
              ref={(el) => { if (el) textRefs.current[4] = el; }}
            >
              The Uncrowned King
            </h3>
            <div className="space-y-6 text-white/70 font-sans leading-relaxed text-base tracking-wide border-l border-[var(--color-antique-gold)]/20 pl-6">
              <p ref={(el) => { if (el) textRefs.current[5] = el; }}>
                Mangalamkunnu Karnan was not merely a temple elephant — he was a living legend of Kerala's festival heritage.
              </p>
              <p ref={(el) => { if (el) textRefs.current[6] = el; }}>
                Renowned for his majestic head raise and commanding aura, Karnan became an unforgettable symbol of strength, grace, and royal presence.
              </p>
              <p ref={(el) => { if (el) textRefs.current[7] = el; }}>
                For decades he stood proudly at Kannambra – Rishinaradamangalam Vela, carrying the sacred Thidambu with unmatched dignity. His arrival alone could silence thousands, and the sight of him towering above the festival crowd became an unforgettable moment for generations.
              </p>
              <p ref={(el) => { if (el) textRefs.current[8] = el; }} className="text-[var(--color-antique-gold)]/80 italic">
                Though Karnan left this world in 2021, his legacy lives on — in the rhythm of the chenda, in the memories of devotees, and in the proud history of Kerala's temple festivals.
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
