import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDevicePerformance, getAnimationConfig } from '../utils/deviceDetection';

export const FuturisticBackground = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  
  // Reduce number of particles based on performance level
  const particleCount = performanceLevel === 'high' ? 20 : performanceLevel === 'medium' ? 10 : 0;
  const orbCount = performanceLevel === 'high' ? 3 : performanceLevel === 'medium' ? 2 : 1;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background - simplified for mobile */}
      {animConfig.enableBackgroundAnimations ? (
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
            duration: performanceLevel === 'low' ? 20 : 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ) : (
        // Static gradient for low-performance devices
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
      )}

      {/* Grid overlay - static for all devices */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />

      {/* Animated particles - only for medium/high performance */}
      {animConfig.enableParticles && particleCount > 0 && (
        <div className="absolute inset-0">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Glowing orbs - reduced for mobile */}
      <div className="absolute inset-0">
        {[...Array(orbCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"
            initial={{
              x: 0,
              y: 0,
              scale: 1,
              left: `${(i + 1) * 25}%`,
              top: `${(i + 1) * 25}%`,
            }}
            animate={animConfig.enableBackgroundAnimations ? {
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}; 