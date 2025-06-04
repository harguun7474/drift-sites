'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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

export default function Services() {
  const services = [
    {
      title: 'Web Development',
      description: 'We create custom, responsive websites using the latest technologies and best practices. From simple landing pages to complex web applications, we deliver solutions that drive results.',
      image: '/images/simple web developme.png',
      icon: '💻'
    },
    {
      title: 'UI/UX Design',
      description: "Transform your digital presence with our expert UI/UX design services. We create beautiful, intuitive interfaces that engage users and drive conversions while maintaining brand consistency.",
      image: '/images/uiux design.jpg',
      icon: '🎨'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Build your online store with our comprehensive e-commerce solutions. We implement secure payment systems, inventory management, and user-friendly interfaces to help your business grow.',
      image: '/images/ecommerce-futuristic.jpg',
      icon: '🛍️'
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-black/50" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20" />
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: "url('/images/codeing.png')" }}
          />
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
              Our Web Development Services
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title inline-block mb-6">Excellence in Digital Solutions</h2>
            <p className="text-gray-300 text-lg mb-4">
              At Drift Sites, we combine technical expertise with creative vision to deliver exceptional web solutions. 
              Our team stays ahead of the curve with the latest technologies and best practices.
            </p>
            <p className="text-gray-300 text-lg">
              Explore our core services below, or contact us to discuss your specific project needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="space-y-24"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-full lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-xl border border-purple-500/20"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-black/50" />
                </motion.div>
                <motion.div 
                  className="w-full lg:w-1/2 p-8 lg:p-12"
                  variants={fadeInUp}
                >
                  <h2 className="text-3xl font-bold mb-6 relative text-white">
                    {service.title}
                    <motion.span 
                      className="absolute -bottom-2 left-0 w-16 h-1 bg-purple-500 rounded"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">{service.description}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/quote"
                      className="btn-primary inline-flex items-center"
                    >
                      <span>Get a Quote</span>
                      <motion.svg 
                        className="w-4 h-4 ml-2"
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title inline-block">Additional Services</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-6">
              We offer a variety of specialized services to enhance your digital presence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { title: 'SEO Optimization', description: 'Improve your website visibility and ranking in search engines.' },
              { title: 'Performance Optimization', description: 'Enhance your website speed and user experience.' },
              { title: 'Content Management', description: 'Easy-to-use CMS solutions for managing your website content.' },
              { title: 'Mobile Development', description: 'Native and cross-platform mobile applications.' },
              { title: 'API Development', description: 'Custom API solutions for seamless integration.' },
              { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure and deployment services.' },
              { title: 'Maintenance', description: 'Regular updates and maintenance to keep your site running smoothly.' },
              { title: 'Security', description: 'Comprehensive security solutions to protect your digital assets.' },
              { title: 'Analytics', description: 'Advanced analytics and reporting for data-driven decisions.' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300 border border-gray-700"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="text-purple-400 mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 