'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BlendEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function BlendEffect({ children, className = '' }: BlendEffectProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isHovered
            ? [
                'radial-gradient(600px circle at var(--x) var(--y), rgba(34, 197, 94, 0.15), transparent 40%)',
                'radial-gradient(600px circle at var(--x) var(--y), rgba(34, 197, 94, 0.1), transparent 40%)',
              ]
            : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`,
        } as any}
      />
      <motion.div
        className="relative z-10"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 