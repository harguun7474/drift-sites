'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView, AnimatePresence } from 'framer-motion';
import { 
  useFloatingAnimation, 
  useFadeInUp, 
  useTextReveal, 
  staggerContainer 
} from './components/animations/SharedAnimations';
import { useDevicePerformance, getAnimationConfig, useIsMobile } from './utils/deviceDetection';

// Custom hook for typing animation
function useTypingAnimation(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayText, isTyping };
}

// Custom hook for parallax effects
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Home() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = [useRef(null), useRef(null)];
  
  // Device detection for performance optimization
  const isMobile = useIsMobile();
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  
  // Get optimized animation variants
  const fadeInUpAnim = useFadeInUp();
  const floatingAnim = useFloatingAnimation();
  const textRevealAnim = useTextReveal();
  
  // Scroll animation setup - conditionally enable based on device performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: animConfig.useSimplifiedEffects ? 50 : 100,
    damping: animConfig.useSimplifiedEffects ? 15 : 30,
    restDelta: 0.001
  });

  // Parallax effects - only enable on higher performance devices
  const textY = animConfig.enableParallax 
    ? useTransform(springScroll, [0, 1], [0, -150])
    : useTransform(springScroll, [0, 1], [0, 0]);
    
  const rotate = animConfig.enableParallax
    ? useTransform(springScroll, [0, 0.5], [0, 15])
    : useTransform(springScroll, [0, 1], [0, 0]);
    
  const scale = animConfig.enableParallax
    ? useTransform(springScroll, [0, 0.5], [1, 1.2])
    : useTransform(springScroll, [0, 1], [1, 1]);
  
  // Check which section is in view
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observers = sectionRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return observer;
    });
    
    return () => {
      observers.forEach((observer, index) => {
        if (sectionRefs[index].current) {
          observer.unobserve(sectionRefs[index].current!);
        }
      });
    };
  }, []);

  // Generate particles for background effect - reduce count on mobile
  const particleCount = animConfig.enableParticles ? (isMobile ? 5 : 15) : 0;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 5 : 10) + (isMobile ? 3 : 5),
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10
  }));

  // Add typing animation for the main heading
  const { displayText: mainHeadingText, isTyping: isMainHeadingTyping } = useTypingAnimation("Elevate Your Digital Presence", 100);

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      {/* Floating particles - only if enabled */}
      {animConfig.enableParticles && particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            bottom: '-20px',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
      
      {/* Side navigation indicators - hide on mobile */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col space-y-4">
          {[0, 1].map((index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                activeSection === index ? 'bg-purple-500' : 'bg-gray-600'
              }`}
              animate={{
                scale: activeSection === index ? 1.5 : 1,
                backgroundColor: activeSection === index ? '#a855f7' : '#4b5563'
              }}
              transition={{ duration: animConfig.transitionDuration }}
              onClick={() => {
                sectionRefs[index].current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section - Asymmetric Split Layout */}
      <section 
        ref={sectionRefs[0]}
        className="min-h-screen relative flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/codeing.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          </div>
          
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto flex flex-col items-center"
            >
            <motion.span 
              className="inline-block text-purple-400 text-base md:text-lg font-semibold mb-4 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Web Development Agency
            </motion.span>

            <h1 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-8 leading-snug text-white" style={{textShadow: 'none'}}>
              {mainHeadingText}
              {isMainHeadingTyping && (
                <motion.span
                  className="inline-block w-2 h-8 md:h-10 bg-purple-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
              </h1>

            <motion.p 
              className="text-base md:text-lg text-gray-300 max-w-lg mx-auto mb-10 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Professional web development services that transform your ideas into stunning, high-performance websites.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/quote"
                className="neo-brutalism inline-flex items-center justify-center px-8 py-4 text-white font-bold"
              >
                Get a Free Quote
                <motion.svg 
                  className="w-5 h-5 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>
              <Link
                href="/services"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          >
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
      </section>

      {/* Services Section - Horizontal Scroll Cards */}
      <section 
        ref={sectionRefs[1]}
        className="py-16 md:py-24 relative z-10 diagonal-section-reverse bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 25 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.transitionDuration }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
              Our <span className="text-purple-400">Services</span>
              <motion.span 
                className="absolute -bottom-2 left-0 h-1 bg-purple-500 rounded"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: animConfig.transitionDuration * 1.5, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          
          <div className="flex overflow-x-auto pb-8 space-x-4 md:space-x-6 snap-x snap-mandatory hide-scrollbar -mx-4">
            {[
              {
                title: "Web Development",
                description: "Custom, responsive websites built with modern technologies and best practices",
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: "from-purple-600 to-indigo-800"
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that engage and convert your visitors",
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                color: "from-pink-600 to-purple-800"
              },
              {
                title: "E-commerce Solutions",
                description: "Powerful online stores that drive sales and grow your business",
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                ),
                color: "from-indigo-600 to-blue-800"
              },
              {
                title: "SEO Optimization",
                description: "Improve your visibility in search engines and drive organic traffic",
                icon: (
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                color: "from-teal-600 to-green-800"
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] snap-center px-4"
                initial={{ opacity: 0, x: animConfig.useSimplifiedEffects ? 25 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: animConfig.transitionDuration, delay: index * (animConfig.useSimplifiedEffects ? 0.05 : 0.1) }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`h-[350px] md:h-[400px] rounded-xl overflow-hidden relative group`}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 group-hover:opacity-90 transition-all duration-300`}></div>
                  <div className="relative h-full p-6 md:p-8 flex flex-col">
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-100 text-sm md:text-base mb-4 md:mb-6 group-hover:text-white/90 transition-colors duration-300">{service.description}</p>
                    <div className="mt-auto">
                      <Link 
                        href="/services" 
                        className="inline-flex items-center text-white font-semibold group hover:text-purple-300 transition-colors duration-300"
                      >
                        <span>Learn More</span>
                          <motion.svg 
                            className="w-5 h-5 ml-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </motion.svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
          <motion.div 
            className="glass-card rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 25 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.transitionDuration }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="max-w-lg">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Ready to transform your digital presence?</h2>
                <p className="text-gray-300 text-sm md:text-base">Let's discuss how we can help you achieve your goals with a custom web solution.</p>
              </div>
              <div className="w-full md:w-auto">
                <Link 
                  href="/quote" 
                  className="bg-purple-600 hover:bg-purple-500 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-white font-bold rounded-md transition-all duration-300 hover:shadow-lg"
                >
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Add this CSS to hide scrollbar but allow scrolling */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 