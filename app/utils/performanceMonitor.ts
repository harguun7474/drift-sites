'use client';

import { useEffect, useState } from 'react';

// Interface for performance metrics
interface PerformanceMetrics {
  fps: number;
  frameDrops: number;
  lastUpdate: number;
  isLowPerformance: boolean;
}

// Default performance thresholds - lower threshold for mobile
const LOW_PERFORMANCE_FPS = 40;
const FRAME_DROP_THRESHOLD = 3;

// Global performance state that can be accessed across components
let globalPerformanceState = {
  fps: 60,
  frameDrops: 0,
  lastUpdate: 0,
  isLowPerformance: false,
};

// Function to update global performance state
const updatePerformanceState = (metrics: Partial<PerformanceMetrics>) => {
  globalPerformanceState = {
    ...globalPerformanceState,
    ...metrics,
  };
};

/**
 * Hook to monitor performance and detect frame drops
 * @param fpsThreshold FPS below which performance is considered low
 * @param frameDropThreshold Number of consecutive frame drops to trigger low performance mode
 * @returns Performance metrics and a flag indicating if performance is low
 */
export const usePerformanceMonitor = (
  fpsThreshold = LOW_PERFORMANCE_FPS,
  frameDropThreshold = FRAME_DROP_THRESHOLD
) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameDrops: 0,
    lastUpdate: 0,
    isLowPerformance: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if it's a mobile device for more aggressive optimization
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent || navigator.vendor || (window as any).opera
    );
    
    // Use more aggressive thresholds for mobile
    const effectiveFpsThreshold = isMobileDevice ? 45 : fpsThreshold;
    const effectiveFrameDropThreshold = isMobileDevice ? 2 : frameDropThreshold;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;
    let consecutiveFrameDrops = 0;

    // Function to calculate FPS
    const calculateFPS = () => {
      const now = performance.now();
      const elapsed = now - lastTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((frameCount * 1000) / elapsed);
        
        // Check for low FPS
        if (fps < effectiveFpsThreshold) {
          consecutiveFrameDrops++;
        } else {
          consecutiveFrameDrops = Math.max(0, consecutiveFrameDrops - 1);
        }
        
        // Determine if device is in low performance mode
        const isLowPerformance = consecutiveFrameDrops >= effectiveFrameDropThreshold;
        
        // Update metrics
        const newMetrics = {
          fps,
          frameDrops: consecutiveFrameDrops,
          lastUpdate: now,
          isLowPerformance,
        };
        
        setMetrics(newMetrics);
        updatePerformanceState(newMetrics);
        
        // Reset for next second
        frameCount = 0;
        lastTime = now;
      }
      
      frameCount++;
      animationFrameId = requestAnimationFrame(calculateFPS);
    };

    // Start monitoring
    animationFrameId = requestAnimationFrame(calculateFPS);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [fpsThreshold, frameDropThreshold]);

  return metrics;
};

/**
 * Get the current performance state without using a hook
 * Useful for non-React contexts
 */
export const getPerformanceState = () => {
  return globalPerformanceState;
};

/**
 * Utility to dynamically adjust animation properties based on performance
 * @param defaultDuration Default animation duration
 * @returns Adjusted duration based on performance
 */
export const getOptimizedDuration = (defaultDuration: number): number => {
  const { isLowPerformance } = globalPerformanceState;
  return isLowPerformance ? Math.max(0.1, defaultDuration * 0.4) : defaultDuration;
};

/**
 * Utility to determine if complex animations should be enabled
 */
export const shouldEnableComplexAnimations = (): boolean => {
  const { isLowPerformance, fps } = globalPerformanceState;
  return !isLowPerformance && fps > LOW_PERFORMANCE_FPS;
};

/**
 * Component to monitor performance and automatically adjust global settings
 */
export const PerformanceMonitor: React.FC = () => {
  usePerformanceMonitor();
  return null; // This component doesn't render anything
}; 