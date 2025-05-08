'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
      features: [
        'Weekly or bi-weekly maintenance schedules',
        'Custom mowing patterns and heights',
        'Precision edging and trimming',
        'Debris cleanup and removal',
        'Environmentally friendly practices'
      ],
      image: '/images/services/lawn-service-1.jpg'
    },
    {
      title: 'Landscaping',
      description: "Transform your outdoor space with our comprehensive landscaping services. From design to implementation, we create beautiful, functional landscapes that enhance your property's value and your enjoyment.",
      features: [
        'Custom landscape design',
        'Plant selection and installation',
        'Hardscaping (patios, walkways)',
        'Water features and irrigation',
        'Seasonal color rotation'
      ],
      image: '/images/services/lawn-service-2.jpg'
    },
    {
      title: 'House Moving',
      description: 'Our experienced team specializes in complete house relocation services. Using state-of-the-art equipment and proven techniques, we ensure your structure is moved safely and efficiently to its new location.',
      features: [
        'Comprehensive structural assessment',
        'Permit acquisition assistance',
        'Foundation preparation',
        'Safe, secure transport',
        'Complete setup at new location'
      ],
      image: '/images/495964413_122126956886771855_902390982935800256_n.jpg'
    },
    {
      title: 'Lawn Fertilization',
      description: "Keep your lawn healthy, green, and vibrant with our specialized fertilization services. We use premium, environmentally responsible products tailored to your lawn's specific needs and local conditions.",
      features: [
        'Soil analysis and custom treatment plans',
        'Seasonal fertilization schedules',
        'Weed prevention and control',
        'Disease and pest management',
        'Organic options available'
      ],
      image: '/images/services/lawn-service-1.jpg'
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
                className="animate-on-scroll"
              >
                <div className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center bg-white rounded-xl overflow-hidden shadow-lg`}>
                  <div className="w-full lg:w-1/2 h-full">
                    <div className="relative h-[400px]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <h2 className="text-3xl font-bold mb-6 relative">
                      {service.title}
                      <span className="absolute -bottom-2 left-0 w-16 h-1 bg-green-500 rounded"></span>
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">{service.description}</p>
                    <h3 className="font-bold text-lg mb-4 text-gray-800">What's Included:</h3>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-700">
                          <svg
                            className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Additional Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We offer a variety of specialized services to meet all your property needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll">
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Van Hire</h3>
              <p className="text-gray-600">Professional van rental services for all your moving and transportation needs.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">House Moving</h3>
              <p className="text-gray-600">Complete house relocation services with expert care and precision.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Office Moving</h3>
              <p className="text-gray-600">Professional office relocation services for businesses of all sizes.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Furniture Moving</h3>
              <p className="text-gray-600">Careful and efficient furniture moving services for your home or office.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Lawn Mowing</h3>
              <p className="text-gray-600">Professional lawn maintenance services for a perfectly manicured yard.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Clean Up</h3>
              <p className="text-gray-600">Comprehensive property cleanup services for a pristine environment.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Hedge Trimming</h3>
              <p className="text-gray-600">Precision hedge trimming services for neat and healthy shrubs.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Edging</h3>
              <p className="text-gray-600">Professional lawn edging services for clean, defined borders.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Rubbish Removal</h3>
              <p className="text-gray-600">Efficient and responsible rubbish removal services for your property.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Trimming</h3>
              <p className="text-gray-600">Professional trimming services for trees, shrubs, and plants.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Hedge Shaping</h3>
              <p className="text-gray-600">Expert hedge shaping services for beautiful, well-maintained hedges.</p>
            </div>
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