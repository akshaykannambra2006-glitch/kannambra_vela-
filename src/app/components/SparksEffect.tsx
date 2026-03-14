"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xOffset: number; // For side drift
}

export default function SparksEffect() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Generate initial sparks
    const generateSparks = () => {
      const isMobile = window.innerWidth < 768;
      const sparkCount = isMobile ? 25 : 50;

      const newSparks = Array.from({ length: sparkCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // random percentage for left
        y: Math.random() * 100, // starting height percentage
        size: Math.random() * 2 + 1, // 1px to 3px
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5, // 0s to 5s stagger
        opacity: Math.random() * 0.6 + 0.1,
        xOffset: (Math.random() - 0.5) * 50 // -25px to 25px drift
      }));
      setSparks(newSparks);
    };

    generateSparks();
    
    // Optional: regenerate periodically or on resize if needed
    const handleResize = () => generateSparks();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (sparks.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen">
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="absolute rounded-full bg-[#FFE8B3] shadow-[0_0_8px_#FF7A00]"
          style={{
            left: `${spark.x}%`,
            width: spark.size,
            height: spark.size,
            opacity: spark.opacity
          }}
          initial={{ y: "110vh", x: 0 }}
          animate={{
            y: "-10vh",
            x: spark.xOffset,
            opacity: [0, spark.opacity, spark.opacity * 1.5, spark.opacity, 0]
          }}
          transition={{
            duration: spark.duration,
            repeat: Infinity,
            delay: spark.delay,
            ease: "linear",
            // For opacity array, distribute keyframes
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
        />
      ))}
      
      {/* Subtle global smoke texture overlay (optional enhancement) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />
    </div>
  );
}
