'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from './components/LeafParticles';
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover, textReveal, floatingAnimation } from './components/animations/SharedAnimations';

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
          <motion.div 
            className="absolute inset-0"
            style={{ y: backgroundY, scale: imageScale }}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.21, 0.45, 0.27, 0.99] }}
          >
            <Image
              src="/images/hero/hero-main.jpg"
              alt="Beautiful lawn"
              fill
              className="object-cover"
              priority
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"
              style={{ opacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
            />
            <LeafParticles />
          </motion.div>

          <motion.div 
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
            style={{ y: textY }}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <div className="text-white max-w-3xl">
              <motion.div className="overflow-hidden">
                <motion.h1 
                  variants={textReveal}
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                >
                  Transform Your <span className="text-green-400">Outdoor Space</span>
                </motion.h1>
              </motion.div>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl"
              >
                Professional lawn care and moving services that exceed expectations
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
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </section>

        {/* Services Preview Section */}
        <section className="py-20 bg-white relative z-10">
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
                  title: "Lawn Mowing",
                  description: "Professional lawn maintenance services for a perfect yard all year round",
                  image: "/images/services/lawn-service-1.jpg"
                },
                {
                  title: "Landscaping",
                  description: "Transform your outdoor space with our professional landscaping services",
                  image: "/images/services/lawn-service-2.jpg"
                },
                {
                  title: "House Moving",
                  description: "Expert house moving services with precision and care",
                  image: "/images/495964413_122126956886771855_902390982935800256_n.jpg"
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
                  <div className="relative h-[300px] overflow-hidden rounded-t-lg">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute bottom-0 left-0 p-6 text-white"
                    >
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link 
                        href="/services" 
                        className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center group"
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
        <section className="py-20 bg-gray-50 relative z-10">
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
                className="text-gray-600 max-w-3xl mx-auto text-center"
              >
                We pride ourselves on providing exceptional service that stands above the competition
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Experienced Team",
                  description: "Our professionals have years of experience in lawn care and house moving, ensuring top-quality service every time."
                },
                {
                  title: "Quality Guaranteed",
                  description: "We stand behind our work with a satisfaction guarantee, ensuring your complete happiness with our services."
                },
                {
                  title: "Competitive Pricing",
                  description: "Get the best value for your money with our transparent and competitive pricing structure."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <motion.div 
                    className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
} 