'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GrassParticlesProps {
  isActive: boolean;
  onComplete?: () => void;
}

interface GrassBlade {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

export default function GrassParticles({ isActive, onComplete }: GrassParticlesProps) {
  const blades = useRef<GrassBlade[]>([]);

  useEffect(() => {
    // Create grass blades with random properties
    blades.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * 200 - 100, // Random x position between -100 and 100
      y: Math.random() * -150 - 50,  // Random y position upward
      rotation: Math.random() * 360,  // Random rotation
      scale: Math.random() * 0.5 + 0.5, // Random scale between 0.5 and 1
      delay: Math.random() * 0.3,     // Random delay for staggered animation
    }));
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {blades.current.map((blade, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 bottom-1/2"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, blade.scale, 0],
                x: [0, blade.x],
                y: [0, blade.y],
                rotate: [0, blade.rotation],
              }}
              transition={{
                duration: 1,
                delay: blade.delay,
                ease: "easeOut",
              }}
              onAnimationComplete={index === 0 ? onComplete : undefined}
            >
              <svg
                width="20"
                height="40"
                viewBox="0 0 20 40"
                className="text-green-500"
              >
                <path
                  d="M10 0C10 0 0 20 0 30C0 35.5 4.5 40 10 40C15.5 40 20 35.5 20 30C20 20 10 0 10 0Z"
                  fill="currentColor"
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
} 