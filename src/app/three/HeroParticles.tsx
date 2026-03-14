"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createSparkTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 210, 127, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 122, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
  }
  return new THREE.CanvasTexture(canvas);
}

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
  }
`;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 400;

  const [positions, colors, baseSizes, velocities, phases] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseSizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color("#FFD27F"), // warm gold
      new THREE.Color("#FFB347"), // amber
      new THREE.Color("#FF7A00"), // subtle orange
      new THREE.Color("#FFF5E1")  // occasional bright white/gold spark
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10; // z
      
      const isBrightSpark = Math.random() > 0.95;
      const color = isBrightSpark ? colorPalette[3] : colorPalette[Math.floor(Math.random() * 3)];
      
      colors[i * 3]     = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size variation
      baseSizes[i] = isBrightSpark ? Math.random() * 3 + 3 : Math.random() * 2 + 1;

      // Upward drift and slight sideways drift
      velocities[i * 3]     = (Math.random() - 0.5) * 0.02; // vx
      velocities[i * 3 + 1] = Math.random() * 0.05 + 0.01;  // vy (upwards)
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // vz

      phases[i] = Math.random() * Math.PI * 2; // for flicker
    }

    return [positions, colors, baseSizes, velocities, phases];
  }, [particleCount]);

  const texture = useMemo(() => createSparkTexture(), []);

  // Make size array for dynamic updating
  const currentSizes = useMemo(() => new Float32Array(particleCount), [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
    const sizesAttr = geometry.attributes.size as THREE.BufferAttribute;
    
    for (let i = 0; i < particleCount; i++) {
      // Float upward & drift
      positionsAttr.array[i * 3]     += velocities[i * 3];
      positionsAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
      positionsAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Add slight sine wave sideways drifting
      positionsAttr.array[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + phases[i]) * 0.01;

      // Reset particle to bottom if it floats too high
      if (positionsAttr.array[i * 3 + 1] > 25) {
        positionsAttr.array[i * 3 + 1] = -25;
        positionsAttr.array[i * 3] = (Math.random() - 0.5) * 80;
      }

      // Flicker effect
      sizesAttr.array[i] = baseSizes[i] * (0.6 + 0.4 * Math.sin(state.clock.elapsedTime * 3 + phases[i]));
    }
    
    positionsAttr.needsUpdate = true;
    sizesAttr.needsUpdate = true;
    
    // Very subtle slow rotation
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[currentSizes, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={{
          pointTexture: { value: texture }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
