import { motion } from 'framer-motion';

// Fade up animation for sections
export const FadeUpDiv = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.6,
      delay,
      ease: [0.21, 0.45, 0.27, 0.99]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

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

// Scale animation for hover effects
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

// Page transition wrapper
export const PageWrapper = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{
      duration: 0.5,
      ease: [0.21, 0.45, 0.27, 0.99]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating animation
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

// Card hover animation
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

// Mobile menu animation
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