'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useDevicePerformance, getAnimationConfig } from '../utils/deviceDetection';
import { 
  useFadeInUp, 
  useFloatingAnimation, 
  useTextReveal, 
  useCardHoverAnimation 
} from '../components/animations/SharedAnimations';

export default function About() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('story');
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  
  const isStoryInView = useInView(storyRef, { once: false, amount: 0.5 });
  const isValuesInView = useInView(valuesRef, { once: false, amount: 0.5 });
  
  // Get device performance level
  const performanceLevel = useDevicePerformance();
  const animConfig = getAnimationConfig(performanceLevel);
  
  // Animation variants
  const fadeInUpAnim = useFadeInUp();
  const floatingAnim = useFloatingAnimation();
  const cardHoverAnim = useCardHoverAnimation();
  
  // Update active tab based on scroll position
  useEffect(() => {
    if (isStoryInView) setActiveTab('story');
    else if (isValuesInView) setActiveTab('values');
  }, [isStoryInView, isValuesInView]);
  
  // Scroll to section when tab is clicked
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Parallax scrolling effect - conditionally enabled based on device performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Only apply parallax effects on medium/high performance devices
  const backgroundY = animConfig.enableParallax 
    ? useTransform(scrollYProgress, [0, 1], [0, 300])
    : useTransform(scrollYProgress, [0, 1], [0, 0]);
  
  const textOpacity = animConfig.enableParallax
    ? useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0])
    : useTransform(scrollYProgress, [0, 1], [1, 1]);
  
  const textY = animConfig.enableParallax
    ? useTransform(scrollYProgress, [0, 0.2, 0.3], [0, -50, -100])
    : useTransform(scrollYProgress, [0, 1], [0, 0]);
  
  // Company values
  const values = [
    { 
      title: 'Innovation', 
      description: 'We embrace new technologies and creative solutions to deliver cutting-edge websites.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      title: 'Quality', 
      description: 'We maintain the highest standards in every line of code and pixel of design.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      title: 'Collaboration', 
      description: 'We work closely with our clients to ensure their vision is realized in every project.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      title: 'Transparency', 
      description: 'We believe in open communication and keeping clients informed throughout the process.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black relative" ref={containerRef}>
      {/* Fixed side navigation - hide on mobile */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <nav className="flex flex-col space-y-8">
          {[
            { id: 'story', label: 'Our Story', ref: storyRef },
            { id: 'values', label: 'Our Values', ref: valuesRef }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.ref)}
              className={`flex items-center group ${
                activeTab === item.id ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              <motion.div
                className={`w-1 h-16 rounded-full ${
                  activeTab === item.id ? 'bg-purple-500' : 'bg-gray-700'
                } mr-3`}
                animate={{
                  height: activeTab === item.id ? 64 : 32,
                  backgroundColor: activeTab === item.id ? '#a855f7' : '#374151'
                }}
                transition={{ duration: animConfig.transitionDuration }}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Mobile navigation tabs - only show on small screens */}
      <div className="lg:hidden sticky top-20 z-50 bg-black/80 backdrop-blur-md p-4 flex justify-center space-x-8 border-b border-purple-900/30">
        {[
          { id: 'story', label: 'Our Story', ref: storyRef },
          { id: 'values', label: 'Our Values', ref: valuesRef }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.ref)}
            className={`relative px-4 py-2 ${
              activeTab === item.id ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <span className="text-sm font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-purple-500 w-full"
                layoutId="activeTabIndicator"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
      
      {/* Hero Section with Parallax */}
      <section className="relative h-[100vh] overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
          style={{ 
            backgroundImage: "url('/images/codeing.png')",
            y: backgroundY
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black/50 to-black" />
        
        <motion.div 
          className="relative h-full flex flex-col justify-center items-center text-center px-4"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.transitionDuration, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.span 
              className="inline-block text-purple-400 text-lg font-semibold mb-4"
              initial="hidden"
              animate="show"
              variants={fadeInUpAnim}
              transition={{ delay: 0.4 }}
            >
              About Drift Sites
            </motion.span>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 neon-text"
              initial="hidden"
              animate="show"
              variants={fadeInUpAnim}
              transition={{ delay: 0.6 }}
            >
              We Create<br />
              <span className="text-purple-400">Digital</span> Experiences
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial="hidden"
              animate="show"
              variants={fadeInUpAnim}
              transition={{ delay: 0.8 }}
            >
              A team of passionate web developers and designers dedicated to transforming your ideas into exceptional digital solutions.
            </motion.p>
          </motion.div>
          
          {/* Only show scroll indicator animation on higher performance devices */}
          {animConfig.enableBackgroundAnimations && (
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial="initial"
              animate="animate"
              variants={floatingAnim}
            >
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Our Story Section - Asymmetric Layout */}
      <section 
        ref={storyRef}
        className="py-24 relative diagonal-section bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Content Side */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: animConfig.useSimplifiedEffects ? -25 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animConfig.transitionDuration }}
            >
              <motion.span 
                className="block text-purple-400 text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.transitionDuration, delay: 0.2 }}
              >
                Our Journey
              </motion.span>
              <motion.h2 
                className="text-4xl font-bold mb-6 mt-0 relative"
                initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.transitionDuration, delay: 0.3 }}
              >
                Our Story
                <motion.span 
                  className="absolute -bottom-2 left-0 h-1 bg-purple-500 rounded"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: animConfig.transitionDuration * 1.3, delay: 0.5 }}
                />
              </motion.h2>
              
              <motion.div
                className="space-y-6 text-gray-300"
                initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.transitionDuration, delay: 0.4 }}
              >
                <p>
                  Drift Sites began with a simple mission: to create beautiful, functional websites that deliver real results for businesses of all sizes.
                </p>
                <p>
                  What started as a small team of passionate developers has evolved into a full-service web development agency, serving clients across multiple industries with custom digital solutions tailored to their unique needs.
                </p>
                <p>
                  We continue to push the boundaries of web design and development, embracing new technologies and innovative approaches to help our clients stand out in an increasingly competitive digital landscape.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Visual Side - simplified for mobile */}
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: animConfig.useSimplifiedEffects ? 25 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animConfig.transitionDuration, delay: 0.2 }}
            >
              <div className="relative h-[300px] md:h-[500px] flex items-center justify-center">
                <motion.div
                  className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full overflow-hidden border-4 border-purple-500 shadow-xl preserve-3d z-10 relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: animConfig.transitionDuration, delay: 0.4 }}
                >
                  <Image
                    src="/images/openart-image_PtqTYL-g_1751623943991_raw.jpg"
                    alt="Drift Sites Logo"
                    fill
                    className="object-contain p-4"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section - Circular Layout */}
      <section 
        ref={valuesRef}
        className="py-24 relative diagonal-section-reverse bg-black"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 15 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animConfig.transitionDuration }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-6 relative inline-block"
              initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animConfig.transitionDuration }}
            >
              Our Core Values
              <motion.span 
                className="absolute -bottom-2 left-0 h-1 bg-purple-500 rounded"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.transitionDuration * 1.3, delay: 0.2 }}
              />
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 10 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animConfig.transitionDuration, delay: 0.2 }}
            >
              The principles that guide our work and relationships with clients
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="glass-card hover:neon-border group animated-border"
                initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 15 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animConfig.transitionDuration, delay: index * (animConfig.useSimplifiedEffects ? 0.05 : 0.1) }}
                whileHover={animConfig.enableHoverAnimations ? { y: -10 } : {}}
              >
                <div className="p-6 text-center">
                <motion.div 
                    className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-purple-900/30 text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-colors duration-300"
                    whileHover={animConfig.enableHoverAnimations ? { rotate: 360, scale: 1.1 } : {}}
                    transition={{ duration: 0.8 }}
                  >
                    {value.icon}
                </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="frosted-card rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: animConfig.useSimplifiedEffects ? 25 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animConfig.transitionDuration }}
            viewport={{ once: true }}
          >
            <div className="p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to work with us?</h2>
                <p className="text-gray-300">Let's discuss how we can help bring your digital vision to life.</p>
              </div>
              <div>
              <Link
                href="/quote"
                  className="neo-brutalism inline-flex items-center justify-center px-8 py-4 text-white font-bold"
              >
                  Get in Touch
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 