'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from '../components/LeafParticles';
import { motion } from 'framer-motion';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    access_key: 'ccade881-80c6-412a-a75f-05b37091e9f4' // Replace with your actual access key
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

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
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50" />
          <LeafParticles />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Free Quote</h1>
            <p className="text-xl text-gray-200">Let's discuss how we can transform your property</p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form Column */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
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
                    className="absolute -bottom-2 left-0 w-2/3 h-1 bg-green-500 rounded"
                  ></motion.span>
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
                    className="text-center py-8"
                  >
                    <div className="text-green-500 mb-4">
                      <motion.svg 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-16 h-16 mx-auto" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-8">We've received your request and will contact you shortly.</p>
                    <Link href="/" className="btn-primary">
                      Return to Home
                    </Link>
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
                      <motion.div variants={itemVariants}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                          Service Interested In *
                        </label>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        >
                          <option value="">Select a service</option>
                          <option value="lawn-mowing">Lawn Mowing</option>
                          <option value="landscaping">Landscaping</option>
                          <option value="house-moving">House Moving</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                        placeholder="Please describe your project requirements..."
                      />
                    </motion.div>

                    {status.info.error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm"
                      >
                        {status.info.msg}
                      </motion.div>
                    )}

                    <motion.div 
                      variants={itemVariants}
                      className="flex justify-center"
                    >
                      <motion.button
                        type="submit"
                        disabled={status.submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full md:w-auto"
                      >
                        {status.submitting ? 'Submitting...' : 'Submit Request'}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="sticky top-24"
              >
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="bg-green-800 text-white rounded-xl shadow-lg p-8 mb-8"
                >
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
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
                      transition={{ delay: 0.9 }}
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
                  </div>

                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 pt-6 border-t border-green-700"
                  >
                    <h4 className="font-medium mb-2">Business Hours</h4>
                    <ul className="space-y-1 text-green-100">
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex justify-between"
                      >
                        <span>Monday-Friday:</span> <span>8:00 AM - 6:00 PM</span>
                      </motion.li>
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex justify-between"
                      >
                        <span>Saturday:</span> <span>9:00 AM - 3:00 PM</span>
                      </motion.li>
                      <motion.li 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="flex justify-between"
                      >
                        <span>Sunday:</span> <span>Closed</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="bg-gray-100 rounded-xl p-8"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <motion.li 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="flex items-start"
                    >
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Free, no-obligation quotes</span>
                    </motion.li>
                    <motion.li 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="flex items-start"
                    >
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Fully licensed and insured</span>
                    </motion.li>
                    <motion.li 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.7 }}
                      className="flex items-start"
                    >
                      <svg className="h-5 w-5 text-green-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Satisfaction guaranteed</span>
                    </motion.li>
                  </ul>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 