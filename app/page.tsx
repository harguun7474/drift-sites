'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover, textReveal, floatingAnimation } from './components/animations/SharedAnimations';
import { FuturisticBackground } from './components/FuturisticBackground';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const textY = useTransform(springScroll, [0, 1], [0, -150]);
  const imageScale = useTransform(springScroll, [0, 0.5], [1, 1.3]);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);
  const backgroundY = useTransform(springScroll, [0, 1], [0, 100]);
  const rotateX = useTransform(springScroll, [0, 0.5], [0, 15]);

  return (
    <div className="min-h-screen">
      <div className="min-h-screen" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative h-[100vh] flex items-center overflow-hidden">
          <FuturisticBackground />
          <motion.div 
            className="absolute inset-0"
            style={{ y: backgroundY, scale: imageScale }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.21, 0.45, 0.27, 0.99] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/70" />
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: "url('/images/codeing.png')" }}
            />
          </motion.div>

          <motion.div 
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center"
            style={{ y: textY }}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <div className="text-white max-w-3xl lg:w-1/2">
              <motion.div className="overflow-hidden">
                <motion.h1 
                  variants={textReveal}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  Elevate Your <span className="text-purple-400">Digital Presence</span>
                </motion.h1>
              </motion.div>
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl mb-8 text-gray-300 max-w-xl"
              >
                Professional web development services that transform your ideas into stunning, high-performance websites
              </motion.p>
              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/quote"
                    className="btn-primary inline-flex items-center justify-center group"
                  >
                    <span>Get a Free Quote</span>
                    <motion.svg 
                      whileHover={{ x: 5 }}
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/services"
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    Explore Services
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
          >
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* Services Preview Section */}
        <section className="py-20 bg-black relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div className="overflow-hidden mb-16">
              <motion.h2 
                variants={textReveal}
                className="text-4xl font-bold text-center"
              >
                Our Services
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Web Development",
                  description: "Custom, responsive websites built with modern technologies and best practices",
                  icon: "💻"
                },
                {
                  title: "UI/UX Design",
                  description: "Beautiful, intuitive interfaces that engage and convert your visitors",
                  icon: "🎨"
                },
                {
                  title: "E-commerce Solutions",
                  description: "Powerful online stores that drive sales and grow your business",
                  icon: "🛍️"
                }
              ].map((service, index) => (
                <motion.div 
                  key={service.title}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="card group"
                >
                  <div className="p-8">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                    <p className="text-gray-400 mb-6">{service.description}</p>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href="/services" 
                        className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center group"
                      >
                        <span>Learn More</span>
                        <svg 
                          className="w-4 h-4 ml-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-900 relative z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div className="overflow-hidden mb-16">
              <motion.h2 
                variants={textReveal}
                className="text-4xl font-bold text-center mb-4"
              >
                Why Choose Us
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-gray-400 max-w-3xl mx-auto text-center"
              >
                We combine technical expertise with creative vision to deliver exceptional results
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Modern Tech Stack",
                  description: "Built with the latest technologies for optimal performance and scalability"
                },
                {
                  title: "Responsive Design",
                  description: "Perfect display and functionality across all devices and screen sizes"
                },
                {
                  title: "SEO Optimized",
                  description: "Built with search engines in mind to maximize your online visibility"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
} 