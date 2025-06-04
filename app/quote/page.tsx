'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Quote() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    projectType: '',
    timeline: '',
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
          projectType: '',
          timeline: '',
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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[400px]"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <motion.div 
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-black/50" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: "url('/images/codeing.png')" }}
          />
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
              className="text-xl text-gray-300"
              variants={heroTextVariants}
            >
              Let's discuss how we can transform your digital presence
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Quote Form Section */}
      <motion.section 
        className="py-16 bg-gray-900"
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
                    duration: 0.6,
                    ease: [0.21, 0.45, 0.27, 0.99]
                  }
                }
              }}
            >
              {status.submitted ? (
                <motion.div
                  className="bg-gray-800 p-8 rounded-lg shadow-lg border border-purple-500/20"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      We've received your request and will get back to you shortly.
                    </p>
                    <Link
                      href="/"
                      className="btn-primary inline-flex items-center"
                    >
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service Type
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="e-commerce">E-commerce Solutions</option>
                        <option value="seo">SEO Optimization</option>
                        <option value="maintenance">Website Maintenance</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select project type</option>
                        <option value="new-website">New Website</option>
                        <option value="redesign">Website Redesign</option>
                        <option value="e-commerce">E-commerce Store</option>
                        <option value="web-app">Web Application</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">As Soon as Possible</option>
                        <option value="1-2-weeks">1-2 Weeks</option>
                        <option value="2-4-weeks">2-4 Weeks</option>
                        <option value="1-2-months">1-2 Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell us about your project..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      {status.submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </motion.div>

                  {status.info.msg && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-md ${
                        status.info.error ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'
                      }`}
                    >
                      {status.info.msg}
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>

            {/* Info Column */}
            <motion.div 
              className="lg:w-1/3"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.21, 0.45, 0.27, 0.99]
                  }
                }
              }}
            >
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Expert Development',
                      description: 'Our team of skilled developers uses the latest technologies and best practices.'
                    },
                    {
                      title: 'Custom Solutions',
                      description: 'We create tailored solutions that perfectly match your business needs.'
                    },
                    {
                      title: 'Responsive Design',
                      description: 'All our websites are fully responsive and work perfectly on all devices.'
                    },
                    {
                      title: 'Fast Turnaround',
                      description: 'We deliver projects on time without compromising on quality.'
                    }
                  ].map((item, index) => (
                    <motion.li
                      key={item.title}
                      className="flex items-start"
                      variants={itemVariants}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
} 