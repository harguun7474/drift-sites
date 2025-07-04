'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const CoolSlider = ({ slides, autoPlayInterval = 5000 }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    })
  };

  // Dot indicator variants
  const dotVariants = {
    inactive: { scale: 0.7, opacity: 0.5 },
    active: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
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
  const handleMouseLeave = () => {
    if (autoPlayInterval > 0) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* Text content */}
            <motion.div 
              className="absolute bottom-0 left-0 w-full p-8 text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.h3 
                className="text-3xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {slides[currentIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-200 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {slides[currentIndex].description}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
        onClick={prevSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
        onClick={nextSlide}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full bg-white`}
            variants={dotVariants}
            animate={index === currentIndex ? "active" : "inactive"}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
        <motion.div
          className="h-full bg-purple-500"
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

export default CoolSlider; 