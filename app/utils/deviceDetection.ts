'use client';

import { useEffect, useState } from 'react';
import { getPerformanceState } from './performanceMonitor';

// Hook to detect if the device is mobile
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Hook to detect device performance capabilities
export const useDevicePerformance = () => {
  const [performanceLevel, setPerformanceLevel] = useState('medium');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const detectPerformance = () => {
      // Check if we have performance data from the monitor
      const performanceState = getPerformanceState();
      if (performanceState.isLowPerformance) {
        setPerformanceLevel('low');
        return;
      }
      
      // Always default to low on mobile devices for better performance
      if (isMobile) {
        setPerformanceLevel('low');
        return;
      }
      
      // Check for hardware concurrency (CPU cores)
      const cpuCores = navigator.hardwareConcurrency || 0;
      
      // Check for device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory || 0;
      
      if (cpuCores <= 4 || deviceMemory <= 4) {
        setPerformanceLevel('low');
      } else if (cpuCores <= 6 || deviceMemory <= 8) {
        setPerformanceLevel('medium');
      } else {
        setPerformanceLevel('high');
      }
    };
    
    detectPerformance();
    
    // Re-check performance when FPS drops are detected
    const intervalId = setInterval(() => {
      const performanceState = getPerformanceState();
      if (performanceState.isLowPerformance && performanceLevel !== 'low') {
        setPerformanceLevel('low');
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [isMobile, performanceLevel]);
  
  return performanceLevel;
};

// Function to get animation settings based on device performance
export const getAnimationConfig = (performanceLevel: string) => {
  switch (performanceLevel) {
    case 'low':
      return {
        enableParallax: false,
        enableBackgroundAnimations: false,
        enableParticles: false,
        enableHoverAnimations: false,
        transitionDuration: 0.2,
        useSimplifiedEffects: true
      };
    case 'medium':
      return {
        enableParallax: false,
        enableBackgroundAnimations: true,
        enableParticles: false,
        enableHoverAnimations: true,
        transitionDuration: 0.3,
        useSimplifiedEffects: true
      };
    case 'high':
    default:
      return {
        enableParallax: true,
        enableBackgroundAnimations: true,
        enableParticles: true,
        enableHoverAnimations: true,
        transitionDuration: 0.6,
        useSimplifiedEffects: false
      };
  }
}; 