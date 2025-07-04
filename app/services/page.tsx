'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const containerRef = useRef(null);
  const serviceRefs = useRef([]);
  
  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Services data
  const services = [
    {
      id: 'web-dev',
      title: 'Web Development',
      subtitle: 'Custom Solutions for Modern Businesses',
      description: 'We create custom, responsive websites using the latest technologies and best practices. From simple landing pages to complex web applications, we deliver solutions that drive results.',
      image: '/images/simple web developme.png',
      icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>,
      color: 'from-purple-600 to-indigo-800',
      features: [
        'Responsive Design',
        'Performance Optimization',
        'Custom Functionality',
        'SEO Best Practices'
      ]
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      subtitle: 'Beautiful Interfaces That Convert',
      description: "Transform your digital presence with our expert UI/UX design services. We create beautiful, intuitive interfaces that engage users and drive conversions while maintaining brand consistency.",
      image: '/images/uiux design.jpg',
      icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>,
      color: 'from-pink-600 to-purple-800',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'Usability Testing'
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      subtitle: 'Sell Products Online with Ease',
      description: 'Build your online store with our comprehensive e-commerce solutions. We implement secure payment systems, inventory management, and user-friendly interfaces to help your business grow.',
      image: '/images/assets_task_01jwzt76tvegnrqksxtbbcg6fp_1749119408_img_2.webp',
      icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>,
      color: 'from-indigo-600 to-blue-800',
      features: [
        'Secure Payment Integration',
        'Inventory Management',
        'Mobile Shopping Experience',
        'Customer Account Systems'
      ]
    },
    {
      id: 'seo',
      title: 'SEO Optimization',
      subtitle: 'Increase Your Online Visibility',
      description: 'Improve your search engine rankings and drive more organic traffic to your website with our comprehensive SEO services tailored to your business goals.',
      image: '/images/assets_task_01jwzsy159eaqr39k0ccpxj22c_1749119126_img_1.webp',
      icon: <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>,
      color: 'from-teal-600 to-green-800',
      features: [
        'Keyword Research',
        'On-Page Optimization',
        'Technical SEO',
        'Performance Monitoring'
      ]
    }
  ];

  // Update active service based on scroll position
  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveService(index);
          }
        },
        { threshold: 0.5 }
      );
      
      if (ref) {
        observer.observe(ref);
      }
      
      return observer;
    });
    
    return () => {
      observers.forEach((observer, index) => {
        if (serviceRefs.current[index]) {
          observer.unobserve(serviceRefs.current[index]);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black" ref={containerRef}>
      {/* Floating Navigation */}
      <motion.div 
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex flex-col space-y-8">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              className="group flex items-center"
              onClick={() => {
                serviceRefs.current[index].scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <motion.div
                className={`w-1 h-16 rounded-full ${
                  activeService === index ? 'bg-purple-500' : 'bg-gray-700'
                } mr-3`}
                animate={{
                  height: activeService === index ? 64 : 32,
                  backgroundColor: activeService === index ? '#a855f7' : '#374151'
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="overflow-hidden"
                animate={{
                  width: activeService === index ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`whitespace-nowrap text-sm font-medium ${
                  activeService === index ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {service.title}
                </span>
              </motion.div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Hero Section - Diagonal Split */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/80" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: "url('/images/codeing.png')",
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
            }}
          />
        </div>
        
        <div className="relative z-10 flex flex-col h-full justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block text-purple-400 text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Expertise
              </motion.span>
              
              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Digital <span className="text-purple-400">Services</span> That Drive Results
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Comprehensive web solutions tailored to your unique business needs
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  href="/quote"
                  className="neo-brutalism inline-flex items-center justify-center px-8 py-4 text-white font-bold"
                >
                  Get Started
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Showcase - Each with unique layout */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          ref={(el: HTMLElement | null) => {
            if (el) serviceRefs.current[index] = el;
          }}
          className={`py-24 relative ${index % 2 === 0 ? 'diagonal-section bg-gray-950' : 'diagonal-section-reverse bg-black'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              {/* Image Side */}
              <motion.div 
                className="w-full lg:w-1/2 relative"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-[400px] overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                    style={{
                      clipPath: index % 2 === 0 
                        ? 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)' 
                        : 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="relative h-[350px] w-[350px] rounded-xl overflow-hidden animated-border"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.25)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="mb-2">{service.icon}</div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Content Side */}
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {service.id === 'ui-ux' ? (
                  <div className="flex flex-col">
                    <motion.p
                      className="text-purple-400 text-lg font-semibold mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Beautiful Interfaces That Convert
                    </motion.p>
                    
                    <motion.h2
                      className="text-4xl font-bold mb-6 relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      UI/UX Design
                      <motion.span 
                        className="absolute -bottom-2 left-0 right-0 h-1 bg-purple-500 rounded"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </motion.h2>
                  </div>
                ) : (
                  <>
                    <motion.span 
                      className="inline-block text-purple-400 text-lg font-semibold mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {service.subtitle}
                    </motion.span>
                    
                    <motion.h2
                      className="text-4xl font-bold mb-6 relative inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {service.title}
                      <motion.span 
                        className="absolute -bottom-2 left-0 h-1 bg-purple-500 rounded"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </motion.h2>
                  </>
                )}
                
                <motion.p
                  className="text-gray-300 text-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {service.description}
                </motion.p>
                
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {service.features.map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                    >
                      <svg className="w-5 h-5 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Link
                    href="/quote"
                    className="glass-card inline-flex items-center px-6 py-3 text-white font-medium rounded-lg float-on-hover"
                  >
                    Request This Service
                    <motion.svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-24 relative bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="frosted-card rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your project?</h2>
                <p className="text-gray-300">Let's discuss how our services can help you achieve your business goals.</p>
              </div>
              <div>
                <Link 
                  href="/quote" 
                  className="neo-brutalism inline-flex items-center justify-center px-8 py-4 text-white font-bold"
                >
                  Get a Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 