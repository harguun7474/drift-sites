'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from './components/LeafParticles';
import { motion, useScroll, useTransform, useSpring, MotionValue, useInView, useReducedMotion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleOnHover, textReveal, floatingAnimation } from './components/animations/SharedAnimations';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function Home() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 50]);

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const imageScale = useTransform(springScroll, [0, 0.5], [1, 1.3]);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);
  const backgroundY = useTransform(springScroll, [0, 1], [0, 100]);
  const rotateX = useTransform(springScroll, [0, 0.5], [0, 15]);

  return (
    <div className="min-h-screen" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
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
                className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Transform Your <span className="text-green-400">Outdoor Space</span>
              </motion.h1>
            </motion.div>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-2xl mb-8 text-gray-200 max-w-xl"
            >
              Professional lawn care and moving services that exceed expectations
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div 
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="will-change-transform"
              >
                <Link
                  href="/quote"
                  className="btn-primary inline-flex items-center justify-center group"
                >
                  <span>Get a Free Quote</span>
                  <motion.svg 
                    whileHover={prefersReducedMotion ? {} : { x: 5 }}
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </Link>
              </motion.div>

              <motion.div 
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="will-change-transform"
              >
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
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 will-change-transform"
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
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div className="overflow-hidden mb-16">
            <motion.h2 
              variants={textReveal}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
              Our Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 max-w-3xl mx-auto text-center"
            >
              Comprehensive lawn care and moving solutions tailored to your needs
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
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
                whileHover={prefersReducedMotion ? {} : { 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="card group will-change-transform"
              >
                <div className="relative h-[250px] md:h-[300px] overflow-hidden rounded-t-lg">
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="will-change-transform"
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
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute bottom-0 left-0 p-6 text-white"
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{service.title}</h3>
                  </motion.div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link
                    href="/services"
                    className="text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 inline-flex items-center"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div className="overflow-hidden mb-16">
            <motion.h2 
              variants={textReveal}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "Expert Team",
                description: "Our skilled professionals bring years of experience and dedication to every project.",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              },
              {
                title: "Quality Service",
                description: "We use premium equipment and materials to deliver outstanding results every time.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "Customer Satisfaction",
                description: "Your satisfaction is our priority. We work closely with you to exceed expectations.",
                icon: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 will-change-transform"
              >
                <motion.div 
                  className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
} 