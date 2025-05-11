'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from '../components/LeafParticles';

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
      title: 'Lawn Mowing',
      description: 'Our professional lawn mowing services ensure your yard looks pristine year-round. We use state-of-the-art equipment and techniques to provide consistent, high-quality results with every visit.',
      image: '/images/services/lawn-service-1.jpg'
    },
    {
      title: 'Landscaping',
      description: "Transform your outdoor space with our comprehensive landscaping services. From design to implementation, we create beautiful, functional landscapes that enhance your property's value and your enjoyment.",
      image: '/images/services/lawn-service-2.jpg'
    },
    {
      title: 'House Moving',
      description: 'Our experienced team specializes in complete house relocation services. Using state-of-the-art equipment and proven techniques, we ensure your structure is moved safely and efficiently to its new location.',
      image: '/images/495964413_122126956886771855_902390982935800256_n.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Our Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50" />
          <LeafParticles />
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
              Our Professional Services
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Comprehensive solutions tailored to your property's unique needs
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title inline-block mb-6">Excellence in Every Detail</h2>
            <p className="text-gray-600 text-lg mb-4">
              At Specialty Lawns, we pride ourselves on delivering exceptional services that transform your property. 
              With years of experience and a commitment to quality, our team ensures outstanding results every time.
            </p>
            <p className="text-gray-600 text-lg">
              Browse our core services below, or contact us to discuss your specific project needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-gray-50">
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
                  className="w-full lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-xl"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="w-full lg:w-1/2 p-8 lg:p-12"
                  variants={fadeInUp}
                >
                  <h2 className="text-3xl font-bold mb-6 relative">
                    {service.title}
                    <motion.span 
                      className="absolute -bottom-2 left-0 w-16 h-1 bg-green-500 rounded"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">{service.description}</p>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title inline-block">Additional Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We offer a variety of specialized services to meet all your property needs
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
              { title: 'Van Hire', description: 'Professional van rental services for all your moving and transportation needs.' },
              { title: 'Office Moving', description: 'Professional office relocation services for businesses of all sizes.' },
              { title: 'Furniture Moving', description: 'Careful and efficient furniture moving services for your home or office.' },
              { title: 'Clean Up', description: 'Comprehensive property cleanup services for a pristine environment.' },
              { title: 'Hedge Trimming', description: 'Precision hedge trimming services for neat and healthy shrubs.' },
              { title: 'Edging', description: 'Professional lawn edging services for clean, defined borders.' },
              { title: 'Rubbish Removal', description: 'Efficient and responsible rubbish removal services for your property.' },
              { title: 'Trimming', description: 'Professional trimming services for trees, shrubs, and plants.' },
              { title: 'Hedge Shaping', description: 'Expert hedge shaping services for beautiful, well-maintained hedges.' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="text-green-600 mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to schedule a free consultation and customized quote for your property
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/quote"
                className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-md text-lg font-semibold inline-flex items-center transition-all duration-300"
              >
                <span>Request a Free Quote</span>
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