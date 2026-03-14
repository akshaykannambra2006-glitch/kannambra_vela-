"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import PhotoAlbum from "react-photo-album";

// Lightbox dynamic import to save bundle size
import dynamic from "next/dynamic";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });
import "yet-another-react-lightbox/styles.css";

const photos = [
  { src: "/images/gallery-1.webp", width: 800, height: 1200 },
  { src: "/images/gallery-2.webp", width: 1200, height: 800 },
  { src: "/images/gallery-3.webp", width: 800, height: 800 },
  { src: "/images/gallery-4.webp", width: 1200, height: 1600 },
  { src: "/images/gallery-5.webp", width: 800, height: 600 },
  { src: "/images/gallery-6.webp", width: 1000, height: 1000 },
  { src: "/images/gallery-7.webp", width: 1200, height: 1800 },
  { src: "/images/gallery-8.webp", width: 900, height: 600 },
];

export default function GallerySection() {
  const [index, setIndex] = useState(-1);

  return (
    <SectionWrapper id="gallery" className="bg-[#050505] min-h-screen py-32 relative">
      {/* Background sparks */}
      <div className="absolute inset-0 z-0 bg-[url('/images/sparks-bg-placeholder.webp')] bg-repeat opacity-10 pointer-events-none mix-blend-screen" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl text-white tracking-widest drop-shadow-lg">
              GLIMPSES OF <br />
              <span className="text-[var(--color-antique-gold)]">THE VELA</span>
            </h2>
          </div>
          <p className="font-sans text-white/50 max-w-sm text-sm leading-relaxed border-l border-[var(--color-antique-gold)] pl-4">
            A visual journey through the heritage, emotion, and unparalleled energy of Palakkad's grandest festival.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="w-full"
        >
          <PhotoAlbum
            layout="masonry"
            photos={photos}
            spacing={16}
            columns={(containerWidth) => {
              if (containerWidth < 400) return 1;
              if (containerWidth < 800) return 2;
              return 3;
            }}
            onClick={({ index }) => setIndex(index)}
            // @ts-expect-error React 18 to 19 type mismatch
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto, index }) => {
              return (
                <div 
                  key={index}
                  style={{ ...wrapperStyle, position: "relative" }} 
                  className="group overflow-hidden rounded-3xl cursor-pointer border border-white/5 saturate-[0.8] hover:saturate-100 hover:border-[var(--color-antique-gold)]/40 transition-all duration-700"
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <div className="transform group-hover:scale-105 transition-transform duration-1000 w-full h-full">
                    {renderDefaultPhoto({ wrapped: true })}
                  </div>
                </div>
              );
            }}
          />

        </motion.div>

      </div>

      <Lightbox
        index={index}
        slides={photos}
        open={index >= 0}
        close={() => setIndex(-1)}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </SectionWrapper>
  );
}
