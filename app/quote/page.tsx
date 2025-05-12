'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from '../components/LeafParticles';
import LeafButton from '../components/LeafButton';
import GrassParticles from '../components/GrassParticles';
import { motion } from 'framer-motion';
import BlendEffect from '../components/BlendEffect';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredDate: '',
    serviceFrequency: '',
    access_key: 'ccade881-80c6-412a-a75f-05b37091e9f4' // Replace with your actual access key
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  const [showGrassAnimation, setShowGrassAnimation] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Add new animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.45, 0.27, 0.99]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.21, 0.45, 0.27, 0.99]
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setShowGrassAnimation(true);
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Thank you for your submission!' }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          preferredDate: '',
          serviceFrequency: '',
          access_key: formData.access_key
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.message }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Something went wrong. Please try again.' }
      });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[400px]"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <motion.div 
          className="absolute inset-0"
          variants={imageVariants}
        >
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
          <LeafParticles />
          </motion.div>
        </motion.div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
          variants={heroVariants}
        >
          <div className="text-white max-w-2xl">
            <motion.div
              className="overflow-hidden"
              variants={heroTextVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Request a Free Quote
              </motion.h1>
            </motion.div>
            <motion.p 
              className="text-xl text-gray-200"
              variants={heroTextVariants}
            >
              Let's discuss how we can transform your property
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Quote Form Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {/* Form Column */}
            <motion.div 
              className="lg:w-2/3"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.45, 0.27, 0.99]
                  }
                }
              }}
            >
              <BlendEffect>
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative overflow-hidden backdrop-blur-sm bg-white/90">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600" />
                  </motion.div>
                  
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl font-bold mb-6 relative inline-block"
                >
                  Tell Us About Your Project
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "66.666667%" }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                      className="absolute -bottom-2 left-0 w-2/3 h-1 bg-gradient-to-r from-green-400 to-green-600"
                    />
                </motion.h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below, and we'll get back to you within 24 hours with a 
                  customized quote tailored to your specific needs.
                </p>

                {status.submitted ? (
                  <motion.div 
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                      className="text-center py-12 relative"
                  >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [0, 1.2, 1],
                          rotate: [0, 45, 0]
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          times: [0, 0.6, 1]
                        }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-32 h-32 bg-green-500/10 rounded-full" />
                      </motion.div>
                      <div className="text-green-500 mb-6">
                        <motion.svg 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ 
                            scale: 1,
                            opacity: 1,
                          }}
                          transition={{ 
                            delay: 0.2,
                            duration: 0.5,
                            ease: "backOut"
                          }}
                          className="w-20 h-20 mx-auto" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ 
                              delay: 0.3,
                              duration: 0.8,
                              ease: "easeOut"
                            }}
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7"
                          />
                      </motion.svg>
                    </div>
                      <motion.h2 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold mb-4 text-green-700"
                      >
                        Thank You!
                      </motion.h2>
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-600 mb-8 text-lg"
                      >
                        We've received your request and will contact you shortly.
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link 
                          href="/" 
                          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                        >
                      Return to Home
                    </Link>
                      </motion.div>
                  </motion.div>
                ) : (
                  <motion.form 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                            placeholder="John Doe"
                          />
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                        
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                            placeholder="john@example.com"
                          />
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                            placeholder="(555) 123-4567"
                          />
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                        
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                        >
                          <option value="">Select a service</option>
                          <option value="lawn-mowing">Lawn Mowing</option>
                          <option value="landscaping">Landscaping</option>
                          <option value="house-moving">House Moving</option>
                          <option value="other">Other</option>
                        </select>
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          required
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                          />
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                        
                        <motion.div variants={itemVariants} className="relative group">
                          <label htmlFor="serviceFrequency" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                          Service Frequency *
                        </label>
                        <select
                          id="serviceFrequency"
                          name="serviceFrequency"
                          required
                          value={formData.serviceFrequency}
                          onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                        >
                          <option value="">Select frequency</option>
                          <option value="one-time">One-time Service</option>
                          <option value="weekly">Weekly Service</option>
                          <option value="fortnightly">Fortnightly Service</option>
                        </select>
                          <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                      </motion.div>
                    </div>

                      <motion.div variants={itemVariants} className="relative group">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-hover:text-green-600">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-green-400 hover:shadow-sm"
                        placeholder="Please describe your project requirements..."
                      />
                        <motion.div 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-green-600 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {status.info.error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm bg-red-50 p-3 rounded-md"
                      >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        {status.info.msg}
                          </div>
                      </motion.div>
                    )}

                    <motion.div 
                      variants={itemVariants}
                        className="flex justify-center relative pt-4"
                    >
                        <BlendEffect className="w-full md:w-auto">
                          <LeafButton
                            type="submit"
                            disabled={status.submitting}
                            className="w-full md:w-auto relative group"
                          >
                            <motion.span 
                              className="relative z-10 inline-flex items-center"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {status.submitting ? (
                                <>
                                  <motion.svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </motion.svg>
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  <span>Submit Request</span>
                                  <motion.svg 
                                    className="w-5 h-5 ml-2" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                      duration: 1.5,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </motion.svg>
                                </>
                              )}
                            </motion.span>
                          </LeafButton>
                        </BlendEffect>
                        <GrassParticles 
                          isActive={showGrassAnimation} 
                          onComplete={() => setShowGrassAnimation(false)}
                        />
                    </motion.div>
                  </motion.form>
                )}
              </div>
              </BlendEffect>
            </motion.div>

            {/* Contact Info Column */}
              <motion.div 
              className="lg:w-1/3"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.45, 0.27, 0.99]
                  }
                }
              }}
            >
              <motion.div className="sticky top-24">
                <BlendEffect>
                <motion.div 
                    className="bg-green-800/90 backdrop-blur-sm text-white rounded-xl shadow-lg p-8 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.4 }}
                    >
                      Contact Information
                    </motion.h3>
                    
                    <motion.div 
                      className="space-y-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 1.6
                          }
                        }
                      }}
                    >
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.7 }}
                      className="flex items-start"
                    >
                      <svg className="h-6 w-6 text-green-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-medium text-green-200">Phone</p>
                        <p className="text-white">0275186513</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.8 }}
                      className="flex items-start"
                    >
                      <svg className="h-6 w-6 text-green-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-green-200">Email</p>
                        <p className="text-white">info@specialtylawns.com</p>
                      </div>
                    </motion.div>
                    </motion.div>
                  </motion.div>
                </BlendEffect>

                <BlendEffect>
                  <motion.div 
                    className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <motion.h3 
                      className="text-xl font-bold mb-4 text-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 2 }}
                    >
                      Why Choose Us?
                    </motion.h3>
                    <ul className="space-y-3">
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 2.1 }}
                        className="flex items-start"
                    >
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Free, no-obligation quotes</span>
                    </motion.li>
                  </ul>
                </motion.div>
                </BlendEffect>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
} 