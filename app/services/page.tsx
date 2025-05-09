'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from '../components/LeafParticles';

export default function Services() {
  useEffect(() => {
    // Add animation classes to elements when they come into view
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

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
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Our Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50" />
          <LeafParticles />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Professional Services</h1>
            <p className="text-xl text-gray-200">Comprehensive solutions tailored to your property's unique needs</p>
          </div>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll">
            <h2 className="section-title inline-block mb-6">Excellence in Every Detail</h2>
            <p className="text-gray-600 text-lg mb-4">
              At Specialty Lawns, we pride ourselves on delivering exceptional services that transform your property. 
              With years of experience and a commitment to quality, our team ensures outstanding results every time.
            </p>
            <p className="text-gray-600 text-lg">
              Browse our core services below, or contact us to discuss your specific project needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                } animate-on-scroll`}
              >
                <div className="w-full lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                  <h2 className="text-3xl font-bold mb-6 relative">
                    {service.title}
                    <span className="absolute -bottom-2 left-0 w-16 h-1 bg-green-500 rounded"></span>
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">{service.description}</p>
                  <Link
                    href="/quote"
                    className="btn-primary inline-flex items-center"
                  >
                    <span>Get a Quote</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to schedule a free consultation and customized quote for your property
            </p>
            <Link
              href="/quote"
              className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-md text-lg font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105"
            >
              <span>Request a Free Quote</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 