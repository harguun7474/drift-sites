'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useDevicePerformance, getAnimationConfig, useIsMobile } from '../utils/deviceDetection';

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Completely disable decorative elements on mobile
  const showDecorativeElements = !isMobile && performanceLevel !== 'low';
  const decorativeOpacity = performanceLevel === 'high' ? 0.8 : 0.3;
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main Content with diagonal sections - simplified for mobile */}
      <div 
        className={`flex-grow pt-20 ${!isMobile ? 'diagonal-sections' : ''}`}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: `opacity ${animConfig.transitionDuration}s ease`
        }}
      >
        {/* Decorative elements - only shown on desktop/high-performance devices */}
        {showDecorativeElements && (
          <>
            <div 
              className="fixed top-0 right-0 w-[30vw] h-[30vh] bg-gradient-to-bl from-purple-900/30 to-transparent rounded-bl-[100px] blur-3xl -z-10"
              style={{ opacity: decorativeOpacity }}
            />
            <div 
              className="fixed bottom-0 left-[20vw] w-[40vw] h-[40vh] bg-gradient-to-tr from-indigo-900/20 to-transparent rounded-tr-[200px] blur-3xl -z-10"
              style={{ opacity: decorativeOpacity }}
            />
          </>
        )}
        
        {/* Content wrapper */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
      
      {/* Footer positioned at bottom */}
      <div className="w-full z-40">
        <Footer />
      </div>
    </div>
  );
} 