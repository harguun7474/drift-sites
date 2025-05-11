import { motion, useReducedMotion } from 'framer-motion';

// Fade up animation for sections
export const FadeUpDiv = ({ children, delay = 0, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.21, 0.45, 0.27, 0.99]
      }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for child elements
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fade in animation for child elements
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
};

// Scale on hover animation
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

// Slide in from side animation
export const slideInFromSide = (direction = "left", delay = 0) => ({
  hidden: { 
    x: direction === "left" ? -100 : 100,
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.21, 0.45, 0.27, 0.99]
    }
  }
});

// Floating animation
export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

// Page transition wrapper
export const PageWrapper = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.4,
        ease: [0.21, 0.45, 0.27, 0.99]
      }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
};

// Text reveal animation
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