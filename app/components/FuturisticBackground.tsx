import { motion } from 'framer-motion';
import Image from 'next/image';

export const FuturisticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, rgba(88, 28, 135, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(88, 28, 135, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, rgba(88, 28, 135, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(88, 28, 135, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              x: [0, Math.random() * 1000 - 500],
              y: [0, Math.random() * 1000 - 500],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 