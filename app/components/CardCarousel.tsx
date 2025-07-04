'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CardCarouselProps {
  slides: {
    id: number;
    image: string;
    title: string;
    description: string;
    link?: string;
  }[];
  autoPlayInterval?: number;
}

const CardCarousel = ({ slides, autoPlayInterval = 5000 }: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const progressControls = useAnimation();

  // Calculate indices for visible cards
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((currentIndex + i) % slides.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  // Start progress animation
  const startProgressAnimation = () => {
    progressControls.start({
      width: "100%",
      transition: {
        duration: autoPlayInterval / 1000,
        ease: "linear"
      }
    });
  };

  // Reset progress animation
  const resetProgressAnimation = () => {
    progressControls.set({ width: "0%" });
    if (!isHovering && !isDragging) {
      startProgressAnimation();
    }
  };

  // Auto play functionality
  useEffect(() => {
    if (autoPlayInterval > 0 && !isDragging && !isHovering) {
      resetTimeout();
      resetProgressAnimation();
      
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    
    return () => {
      resetTimeout();
    };
  }, [currentIndex, autoPlayInterval, isDragging, isHovering]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Handle next/prev slide with animation pop
  const nextSlide = () => {
    controls.start({
      scale: [1, 1.03, 1],
      transition: { duration: 0.4, times: [0, 0.2, 1] }
    });
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    controls.start({
      scale: [1, 1.03, 1],
      transition: { duration: 0.4, times: [0, 0.2, 1] }
    });
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Pause auto play on hover/drag
  const handleMouseEnter = () => {
    setIsHovering(true);
    resetTimeout();
    progressControls.stop();
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (autoPlayInterval > 0) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, autoPlayInterval);
      resetProgressAnimation();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    resetTimeout();
    progressControls.stop();
  };

  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    if (info.offset.x < -50) {
      nextSlide();
    } else if (info.offset.x > 50) {
      prevSlide();
    } else {
      // Snap back with a bouncy animation if not enough drag
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 500, damping: 15 }
      });
      
      // Restart the progress animation
      if (!isHovering) {
        resetProgressAnimation();
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
          nextSlide();
        }, autoPlayInterval);
      }
    }
  };

  // Card variants for animation - more poppy and slick
  const cardVariants = {
    active: (i: number) => ({
      scale: 1 - i * 0.08,
      x: i * 60,
      y: i * 25,
      opacity: 1 - i * 0.25,
      zIndex: 3 - i,
      filter: `blur(${i * 3}px)`,
      rotateY: i * -5,
      transition: {
        duration: 0.35,
        ease: [0.19, 1.0, 0.22, 1.0], // Expo ease out for snappier animation
        opacity: { duration: 0.2 },
        filter: { duration: 0.3 }
      }
    }),
    inactive: {
      scale: 0.7,
      x: 300,
      y: 50,
      opacity: 0,
      zIndex: 0,
      filter: "blur(10px)",
      rotateY: 15,
      transition: {
        duration: 0.35,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  // Text animation variants - more dynamic
  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.19, 1.0, 0.22, 1.0]
      }
    }
  };

  const descriptionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.19, 1.0, 0.22, 1.0],
        delay: 0.1
      }
    }
  };

  // Start progress animation on initial render
  useEffect(() => {
    if (!isDragging && !isHovering) {
      startProgressAnimation();
    }
  }, []);

  return (
    <div className="relative w-full py-10">
      {/* Card Carousel */}
      <motion.div
        ref={carouselRef}
        className="relative w-full h-[400px] flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
        animate={controls}
      >
        <AnimatePresence mode="wait">
          {visibleIndices.map((slideIndex, i) => (
            <motion.div
              key={slides[slideIndex].id}
              className="absolute w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl"
              custom={i}
              variants={cardVariants}
              initial="inactive"
              animate="active"
              whileTap={i === 0 ? "tap" : undefined}
              whileHover={i === 0 ? "hover" : undefined}
              style={{ 
                originX: 0.5, 
                originY: 0.5,
                transformStyle: "preserve-3d",
                perspective: "1200px"
              }}
            >
              <div className="relative w-full h-[400px] bg-gray-900 rounded-xl overflow-hidden">
                <Image
                  src={slides[slideIndex].image}
                  alt={slides[slideIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  unoptimized={slides[slideIndex].image.startsWith('http')}
                />
                
                {/* Content overlay with gradient animation */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                  animate={{ 
                    background: i === 0 ? [
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
                      "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.5), transparent)",
                      "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)"
                    ] : undefined
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: i === 0 ? Infinity : 0, 
                    repeatType: "reverse" 
                  }}
                />
                
                {/* Card content with staggered animations */}
                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                  <motion.div
                    className="flex items-center mb-4"
                    initial="hidden"
                    animate="visible"
                    variants={titleVariants}
                  >
                    <motion.div 
                      className="w-1 h-8 bg-purple-500 mr-3 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: "2rem" }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    />
                    <h3 className="text-3xl font-bold">{slides[slideIndex].title}</h3>
                  </motion.div>
                  
                  <motion.p 
                    className="text-lg text-gray-300 max-w-xl"
                    variants={descriptionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {slides[slideIndex].description}
                  </motion.p>
                  
                  {i === 0 && (
                    <Link 
                      href={slides[slideIndex].link || "/services"}
                      passHref
                    >
                      <motion.div
                        className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium inline-flex items-center cursor-pointer"
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgb(168, 85, 247)",
                          transition: { duration: 0.15 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            duration: 0.3, 
                            delay: 0.3,
                            ease: "backOut"
                          }
                        }}
                      >
                        <span>Learn More</span>
                        <motion.svg 
                          className="w-5 h-5 ml-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 8, 0] }}
                          transition={{ 
                            duration: 0.8,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                            ease: "easeInOut"
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </motion.div>
                    </Link>
                  )}
                </div>
                
                {/* Card number indicator with pulse animation */}
                <div className="absolute top-6 right-6">
                  <motion.div
                    className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {slideIndex + 1} / {slides.length}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* Navigation controls with enhanced animations */}
      <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto">
        <motion.button
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-purple-600 text-white flex items-center justify-center"
          onClick={prevSlide}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgb(147, 51, 234)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <div className="flex-1 mx-4">
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"
              initial={{ width: "0%" }}
              animate={progressControls}
              key={`progress-${currentIndex}`} // Ensure unique key for each slide
            />
          </div>
          <div className="flex justify-between mt-3 text-sm text-gray-400">
            {[...Array(Math.min(5, slides.length))].map((_, i) => (
              <motion.button
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentIndex === i ? 'text-white bg-purple-600' : 'text-gray-500 hover:text-white'}`}
                onClick={() => setCurrentIndex(i)}
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                animate={currentIndex === i ? {
                  scale: [1, 1.15, 1],
                  transition: { duration: 0.4, times: [0, 0.5, 1] }
                } : undefined}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.button
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-purple-600 text-white flex items-center justify-center"
          onClick={nextSlide}
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgb(147, 51, 234)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default CardCarousel; 