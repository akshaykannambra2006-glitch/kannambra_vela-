"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
      }}
    >
      {/* @ts-expect-error React 19 vs React 18 type mismatch from lenis */}
      {children}
    </ReactLenis>
  );
}
