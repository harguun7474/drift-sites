import { motion } from 'framer-motion';

interface LeafButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const leafVariants = {
  initial: { 
    opacity: 0,
    scale: 0,
    rotate: 0
  },
  hover: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    rotate: [0, 360],
    x: [0, Math.random() * 100 - 50],
    y: [0, Math.random() * 100 - 50],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: i * 0.2,
      ease: "easeInOut"
    }
  })
};

export default function LeafButton({ children, type = 'button', disabled = false, onClick, className = '' }: LeafButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative px-8 py-3 rounded-lg font-medium text-white shadow-lg 
        ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'} 
        ${className}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #22c55e 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-50 blur-xl"
        style={{
          background: 'linear-gradient(135deg, #22c55e33 0%, #16a34a33 100%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Sparkle effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${25 + i * 25}%`,
            top: '50%',
          }}
          animate={{
            y: [10, -10, 10],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Button content */}
      <motion.span 
        className="relative z-10 inline-flex items-center justify-center gap-2"
        animate={{ 
          textShadow: ['0 0 0px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.5)', '0 0 0px rgba(255,255,255,0.5)']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
} 