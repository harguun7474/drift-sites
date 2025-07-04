import { motion } from 'framer-motion';
import { useDevicePerformance, getAnimationConfig, useIsMobile } from '../../utils/deviceDetection';

// Optimized fade up animation that adapts to device performance
export const FadeUpDiv = ({ children, delay = 0, className = '' }) => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // Extremely simplified for mobile
  if (isMobile) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 5 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{
        duration: animConfig.transitionDuration,
        delay: animConfig.useSimplifiedEffects ? delay * 0.5 : delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for child elements - optimized for mobile
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  }
};

// Fade in animation for child elements - with performance detection
export const useFadeInUp = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // No animation for mobile
  if (isMobile) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 }
    };
  }
  
  return {
    hidden: { 
      opacity: 0,
      y: animConfig.useSimplifiedEffects ? 5 : 20
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animConfig.transitionDuration,
        ease: "easeOut"
      }
    }
  };
};

// Legacy fadeInUp for backward compatibility
export const fadeInUp = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
};

// Scale animation for hover effects - conditionally enabled
export const useScaleOnHover = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // Disable completely on mobile
  if (isMobile || !animConfig.enableHoverAnimations) {
    return {
      initial: { scale: 1 },
      hover: { scale: 1 }
    };
  }
  
  return {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: animConfig.transitionDuration,
        ease: "easeOut"
      }
    }
  };
};

// Legacy scaleOnHover for backward compatibility
export const scaleOnHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
};

// Slide in from side animation - optimized
export const useSlideInFromSide = (direction = "left", delay = 0) => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // No animation for mobile
  if (isMobile) {
    return {
      hidden: { opacity: 1, x: 0 },
      show: { opacity: 1, x: 0 }
    };
  }
  
  const distance = animConfig.useSimplifiedEffects ? 10 : 50;
  
  return {
    hidden: {
      x: direction === "left" ? -distance : distance,
      opacity: 0 
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: animConfig.transitionDuration,
        delay: animConfig.useSimplifiedEffects ? delay * 0.5 : delay,
        ease: "easeOut"
      }
    }
  };
};

// Legacy slideInFromSide for backward compatibility
export const slideInFromSide = (direction = "left", delay = 0) => ({
  hidden: {
    x: direction === "left" ? -50 : 50,
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
});

// Page transition wrapper - optimized
export const PageWrapper = ({ children, className = '' }) => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // No animation for mobile
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 5 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 2 : 20 }}
      transition={{
        duration: animConfig.transitionDuration,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Floating animation - optimized or disabled for mobile
export const useFloatingAnimation = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // Disable completely on mobile
  if (isMobile || !animConfig.enableBackgroundAnimations) {
    return {
      initial: { y: 0 },
      animate: { y: 0 }
    };
  }
  
  return {
    initial: { y: 0 },
    animate: {
      y: animConfig.useSimplifiedEffects ? [-2, 2] : [-8, 8],
      transition: {
        duration: animConfig.useSimplifiedEffects ? 4 : 2,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut"
      }
    }
  };
};

// Legacy floatingAnimation for backward compatibility
export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  }
};

// Text reveal animation - optimized
export const useTextReveal = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  const isMobile = useIsMobile();
  
  // No animation for mobile
  if (isMobile) {
    return {
      hidden: { opacity: 1 },
      show: { opacity: 1 }
    };
  }
  
  // Use a much simpler animation for low-performance devices
  if (animConfig.useSimplifiedEffects) {
    return {
      hidden: {
        opacity: 0
      },
      show: {
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut"
        }
      }
    };
  }
  
  return {
    hidden: {
      y: "100%",
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animConfig.transitionDuration,
        ease: [0.21, 0.45, 0.27, 0.99]
      }
    }
  };
};

// Legacy textReveal for backward compatibility
export const textReveal = {
  hidden: {
    y: "100%",
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
};

// Card hover animation - optimized
export const useCardHoverAnimation = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  
  if (!animConfig.enableHoverAnimations) {
    return {
      initial: { scale: 1 },
      hover: { scale: 1 }
    };
  }
  
  return {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: animConfig.transitionDuration,
        ease: animConfig.useSimplifiedEffects ? "easeOut" : [0.21, 0.45, 0.27, 0.99]
      }
    }
  };
};

// Legacy cardHoverAnimation for backward compatibility
export const cardHoverAnimation = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
};

// Mobile menu animation - optimized
export const useMobileMenuAnimation = () => {
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  
  return {
    hidden: { 
      height: 0,
      opacity: 0
    },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: animConfig.transitionDuration,
        ease: animConfig.useSimplifiedEffects ? "easeOut" : [0.21, 0.45, 0.27, 0.99]
      }
    }
  };
};

// Legacy mobileMenuAnimation for backward compatibility
export const mobileMenuAnimation = {
  hidden: { 
    height: 0,
    opacity: 0
  },
  show: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
}; 