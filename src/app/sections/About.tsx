"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../components/SectionWrapper";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Setup the cinematic reveal sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          // Play when entering, reverse exactly back when scrolling way up past it
          toggleActions: "play none none reverse",
        }
      });

      // Initial States
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(videoRef.current, { opacity: 0 });

      // The Sequence:
      // 1. Fade the video in beautifully as the user scrolls into the section
      tl.to(videoRef.current, { opacity: 0.35, duration: 1 })
      // 2. Wait 3 seconds so user can watch the video cinematically 
        .to({}, { duration: 3 })
      // 3. Fade video out completely
        .to(videoRef.current, { opacity: 0, duration: 1 })
      // 4. Fade content wrapper in simultaneously
        .to(contentRef.current, { opacity: 1, duration: 1 }, "-=0.8");

      // 5. Cascade the text sequence
      textRefs.current.forEach((text, i) => {
        tl.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6" // overlapping words
        );
      });

      // Parallax image
      gsap.fromTo(
        imageRef.current,
        { y: 50, scale: 1.1 },
        {
          y: -50,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="about" className="bg-[#0A0A0A] relative overflow-hidden">
      
      {/* Background Video Layer strictly bounded to About Section */}
      <div 
        ref={videoRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-0"
      >
        <iframe
            className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            src="https://www.youtube.com/embed/dIAGf0dCG4c?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=dIAGf0dCG4c&mute=1"
            title="Kannambra – Rishinaradamangalam Vela About Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {/* Dense vignette down to exactly match the page background */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0A0A]/70 to-[#0A0A0A]" />
      </div>

      <div 
        ref={containerRef}
        className="relative min-h-[800px] flex items-center justify-center py-20 z-10 w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Everything inside contentRef will be hidden for the first 3 seconds */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full justify-between"
        >
        <div className="space-y-8 relative z-10 selection:bg-[var(--color-antique-gold)] selection:text-black lg:pr-12">
          <div className="flex items-center gap-6">
            <div className="w-20 h-[2px] bg-[var(--color-antique-gold)] shadow-[0_0_15px_rgba(212,175,55,1)]" />
            <h2 className="text-[var(--color-antique-gold)] font-cinzel font-bold tracking-[0.4em] uppercase text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              The Heritage
            </h2>
          </div>
          
          <div className="relative group cursor-default">
            {/* Cinematic background glow on hover */}
            <div className="absolute -inset-4 bg-[var(--color-lamp-glow)] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-1000 rounded-full" />
            
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-cinzel leading-[1.1] relative z-10 transition-all duration-700 group-hover:tracking-wide">
              A celebration of <br/>
              <span className="italic text-white/50 font-light font-serif">devotion</span> & <br/>
              cultural <span className="text-[var(--color-temple-red)] font-bold drop-shadow-[0_0_20px_rgba(122,14,14,0.6)]">grandeur</span>.
            </h3>
          </div>
          
          <div className="space-y-6 text-white/60 font-sans text-lg leading-relaxed pt-4">
            <p ref={(el) => { if (el) textRefs.current[0] = el; }}>
              Every year, under the sacred presence of Sree Kurumba Bhagavathy, Kannambra – Rishinaradamangalam Vela brings together faith, rhythm, and spectacle. From the majestic elephants adorned in golden caparisons to the thunder of Panchavadyam and the brilliance of fireworks, the festival transforms Kannambra into a stage of living tradition.
            </p>
            <p ref={(el) => { if (el) textRefs.current[1] = el; }}>
              A night where heritage breathes, and culture comes alive also Kannambra – Rishinaradamangalam Vela in golden
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-[500px] xl:max-w-[650px] mx-auto overflow-hidden rounded-3xl group lg:ml-auto lg:mr-0">
          <div className="absolute inset-0 bg-[var(--color-antique-gold)]/10 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-10" />
          
          <div ref={imageRef} className="w-full h-full relative">
            <Image
              src="/images/heritage.jpg"
              alt="Traditional Kerala temple lighting during Kannambra – Rishinaradamangalam Vela"
              width={800}
              height={1000}
              quality={100}
              unoptimized={true}
              className="object-cover w-full h-full grayscale-[10%] contrast-110"
            />
          </div>
          
          <div className="absolute bottom-8 left-8 z-20">
            <p className="font-serif text-2xl tracking-widest text-white drop-shadow-md">EST. <span className="text-[var(--color-antique-gold)] font-bold">1980</span></p>
            <p className="text-xs tracking-[0.2em] text-white/70 uppercase mt-2 drop-shadow-md">A tradition reborn</p>
          </div>
        </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
