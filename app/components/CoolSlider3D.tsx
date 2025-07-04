'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface SliderProps {
  slides: {
    id: number;
    image: string;
    title: string;
    description: string;
  }[];
  autoPlayInterval?: number;
}

const CoolSlider3D = ({ slides, autoPlayInterval = 5000 }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const constraintsRef = useRef(null);
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position into rotation values
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  const brightness = useTransform(mouseY, [-300, 300], [1.2, 0.8]);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset mouse position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    
    if (autoPlayInterval > 0) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 45 : -45,
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      filter: 'blur(8px)',
      z: -200,
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      z: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { type: 'spring', stiffness: 100, damping: 20 },
        filter: { duration: 0.5 },
        z: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 45 : -45,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      filter: 'blur(8px)',
      z: -200,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        rotateY: { type: 'spring', stiffness: 100, damping: 20 },
        filter: { duration: 0.5 },
        z: { duration: 0.5 }
      }
    })
  };

  // Handle next/prev slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Auto play functionality
  useEffect(() => {
    if (autoPlayInterval > 0) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    
    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoPlayInterval]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Pause auto play on hover
  const handleMouseEnter = () => resetTimeout();

  // Particle effect animation
  const particleVariants = {
    initial: { 
      opacity: 0,
      scale: 0,
      y: 0
    },
    animate: (i: number) => ({ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0.5],
      y: [-20, -60 - (i * 10)],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-xl perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={constraintsRef}
    >
      {/* 3D container */}
      <motion.div 
        className="w-full h-full preserve-3d"
        style={{ 
          rotateX, 
          rotateY,
        }}
      >
        {/* Main slider */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full"
            style={{ 
              transformStyle: "preserve-3d",
              filter: `brightness(${brightness})`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                unoptimized={slides[currentIndex].image.startsWith('http')}
              />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent backdrop-blur-[2px]" />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-purple-500/50"
                    style={{
                      left: `${10 + (i * 8)}%`,
                      bottom: "0%"
                    }}
                    custom={i}
                    variants={particleVariants}
                    initial="initial"
                    animate="animate"
                  />
                ))}
              </div>
              
              {/* Text content with 3D effect */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full p-8 text-white"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
                style={{ 
                  transformStyle: "preserve-3d",
                  zIndex: 10
                }}
              >
                <motion.div
                  className="relative"
                  style={{ z: 20 }}
                >
                  <motion.h3 
                    className="text-4xl font-bold mb-2 text-shadow-lg"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
                  >
                    {slides[currentIndex].title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-gray-200 max-w-2xl"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
                  >
                    {slides[currentIndex].description}
                  </motion.p>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-purple-600 to-purple-300 mt-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Navigation arrows with hover effects */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
        onClick={prevSlide}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(147, 51, 234, 0.7)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
        onClick={nextSlide}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 15px rgba(147, 51, 234, 0.7)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dots indicator with animations */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-purple-500' : 'bg-white/50'}`}
            whileHover={{ scale: 1.5 }}
            animate={{
              scale: index === currentIndex ? [1, 1.2, 1] : 1,
              transition: {
                duration: 0.5,
                repeat: index === currentIndex ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      {/* Progress bar with glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 shadow-glow"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: autoPlayInterval / 1000,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      </div>
    </div>
  );
};

export default CoolSlider3D; 