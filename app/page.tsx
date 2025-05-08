'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="Beautiful lawn"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your <span className="text-green-400">Outdoor Space</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-xl">
              Professional lawn care and moving services that exceed expectations
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quote"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span>Get a Free Quote</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Our Premium Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We offer comprehensive lawn care and house moving services tailored to your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="card group animate-on-scroll">
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src="/images/services/lawn-service-1.jpg"
                  alt="Lawn mowing service"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Lawn Mowing</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Professional lawn maintenance services for a perfect yard all year round</p>
                <Link 
                  href="/services" 
                  className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center group"
                >
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="card group animate-on-scroll">
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src="/images/services/lawn-service-2.jpg"
                  alt="Landscaping service"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Landscaping</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Transform your outdoor space with our professional landscaping services</p>
                <Link 
                  href="/services" 
                  className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center group"
                >
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="card group animate-on-scroll">
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src="/images/hero/hero-sunset.avif"
                  alt="House moving service"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">House Moving</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Expert house relocation services with care and precision for a stress-free move</p>
                <Link 
                  href="/services" 
                  className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center group"
                >
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-on-scroll">
              <div className="text-4xl md:text-5xl font-bold mb-2">12+</div>
              <div className="text-green-200">Years Experience</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl md:text-5xl font-bold mb-2">1500+</div>
              <div className="text-green-200">Satisfied Clients</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-green-200">Quality Guarantee</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-green-200">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Why Choose Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We pride ourselves on providing exceptional service that stands above the competition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Experienced Team</h3>
              <p className="text-gray-600 text-center">Our professionals have years of experience in lawn care and house moving, ensuring top-quality service every time.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Reliable & Punctual</h3>
              <p className="text-gray-600 text-center">We value your time and always show up as scheduled, completing projects efficiently without compromising quality.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Fully Insured</h3>
              <p className="text-gray-600 text-center">Your property is protected with our comprehensive insurance coverage, giving you peace of mind throughout the service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Property?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and discover how we can help you achieve the outdoor space of your dreams
            </p>
            <Link
              href="/quote"
              className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-md text-lg font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105"
            >
              <span>Get Your Free Quote</span>
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