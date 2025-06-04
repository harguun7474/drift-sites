'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.21, 0.45, 0.27, 0.99] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const imageVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.27, 0.99] }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.4, ease: [0.21, 0.45, 0.27, 0.99] }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.27, 0.99] }
  },
  hover: {
    y: -10,
    transition: { duration: 0.3, ease: [0.21, 0.45, 0.27, 0.99] }
  }
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.6, ease: [0.21, 0.45, 0.27, 0.99] }
  },
  hover: {
    rotate: 360,
    transition: { duration: 0.8, ease: [0.21, 0.45, 0.27, 0.99] }
  }
};

export default function About() {
  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      bio: 'With over 20 years of experience in lawn care and property management, John leads our team with expertise and passion for creating beautiful outdoor spaces.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      bio: 'Sarah ensures smooth operations and maintains our high standards of service quality across all projects, bringing 15 years of operational excellence to the team.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
    },
    {
      name: 'Mike Wilson',
      role: 'Head of Moving Services',
      bio: 'Mike brings 15 years of experience in house moving and structural engineering to our team, ensuring every relocation project is executed with precision and care.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Landscape Designer',
      bio: 'Lisa is our creative genius behind stunning landscape designs. Her architectural background and eye for beauty transform ordinary yards into extraordinary spaces.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: "url('/images/codeing.png')" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
        </motion.div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-white max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Excellence in Every Project
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Delivering exceptional results with precision and care
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="section-title inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Commitment
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              At Drift Sites, we are dedicated to delivering exceptional web development services that exceed expectations. 
              Our team of skilled professionals combines technical expertise with creative vision to create beautiful, 
              functional websites while ensuring every project is completed with the highest standards of quality.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-3xl font-bold mb-6 relative inline-block text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Professional Excellence
                <motion.span 
                  className="absolute -bottom-2 left-0 w-1/3 h-1 bg-purple-500 rounded"
                  initial={{ width: 0 }}
                  whileInView={{ width: "33.333333%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-300 mb-4 text-lg">
                  Our team brings together years of specialized experience in web development and design. 
                  We combine cutting-edge technologies with creative vision to deliver outstanding digital solutions that 
                  make a lasting impression.
                </p>
                <p className="text-gray-300 mb-4 text-lg">
                  From responsive websites to complex web applications, we handle every project 
                  with meticulous attention to detail and a commitment to excellence that sets us apart.
                </p>
                <p className="text-gray-300 text-lg">
                  We take pride in our work and it shows in every project we complete. Our dedication to quality 
                  and customer satisfaction has made us the preferred choice for businesses looking to enhance their online presence.
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative h-[500px] rounded-xl overflow-hidden shadow-xl order-1 lg:order-2"
              variants={imageVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <Image
                src="/images/Web Design.png"
                alt="Professional Excellence"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="section-title inline-block text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-3xl mx-auto mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              These principles guide every aspect of our business and define how we operate
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Excellence",
                description: "We are committed to delivering the highest quality web solutions that exceed client expectations in every aspect of our work.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "Integrity",
                description: "We conduct our business with honesty, transparency, and ethical practices that build long-lasting trust with our clients and community.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              },
              {
                title: "Innovation",
                description: "We continuously improve our methods, technologies, and techniques to deliver cutting-edge solutions that enhance efficiency and results.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-500/20"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-center text-white">{value.title}</h3>
                <p className="text-gray-300 text-center">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Quality",
                description: "We prioritize quality in every line of code, every design element, and every interaction with our clients, ensuring exceptional results.",
                icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "User-Centered Design",
                description: "We create websites and applications that focus on the end-user experience, making them intuitive, accessible, and engaging.",
                icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-gray-800 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-purple-500/20"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-4 text-center text-white">{value.title}</h3>
                <p className="text-gray-300 text-center">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Digital Presence?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience the difference of working with a team that truly cares about your online success
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quote"
                className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-md text-lg font-semibold inline-flex items-center transition-all duration-300"
              >
                <span>Get Your Free Quote</span>
                <motion.svg 
                  className="w-5 h-5 ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 