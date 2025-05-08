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
      title: 'Van Hire',
      description: 'Professional van hire services for all your transportation needs. Our well-maintained fleet ensures safe and reliable delivery of your items.',
      features: [
        'Various van sizes available',
        'Flexible rental periods',
        'Well-maintained vehicles',
        'Competitive rates',
        'Easy booking process'
      ],
      image: 'https://images.unsplash.com/photo-1623966579343-dc29a78108f6?q=80&w=1974&auto=format&fit=crop'
    },
    {
      title: 'House Moving',
      description: 'Complete house relocation services with expert care and precision. We handle everything from planning to execution, ensuring a smooth transition to your new location.',
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
      title: 'Office Moving',
      description: 'Professional office relocation services designed to minimize business disruption. We handle your office equipment and furniture with care and efficiency.',
      features: [
        'Minimal business disruption',
        'Equipment and furniture handling',
        'Secure document transport',
        'IT infrastructure relocation',
        'Post-move setup assistance'
      ],
      image: 'https://images.unsplash.com/photo-1584178130626-3d79301d0a3a?q=80&w=1974&auto=format&fit=crop'
    },
    {
      title: 'Furniture Moving',
      description: 'Expert furniture moving services for both residential and commercial clients. We ensure your valuable furniture arrives safely at its destination.',
      features: [
        'Careful handling of all furniture types',
        'Professional packing services',
        'Assembly and disassembly',
        'Insurance coverage',
        'Flexible scheduling'
      ],
      image: 'https://images.unsplash.com/photo-1603004779967-501057f96207?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Lawn Mowing',
      description: 'Professional lawn maintenance services to keep your property looking pristine year-round. Regular mowing and maintenance for a perfect lawn.',
      features: [
        'Regular maintenance schedules',
        'Custom mowing patterns',
        'Precision edging',
        'Debris cleanup',
        'Seasonal adjustments'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Clean Up',
      description: 'Comprehensive property cleanup services for both residential and commercial properties. We handle all types of waste and debris removal.',
      features: [
        'General property cleanup',
        'Construction debris removal',
        'Garden waste disposal',
        'Recycling services',
        'Eco-friendly disposal'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Hedge Trimming',
      description: 'Professional hedge maintenance services to keep your property boundaries neat and well-maintained. Regular trimming for healthy, attractive hedges.',
      features: [
        'Regular maintenance schedules',
        'Precision trimming',
        'Shape maintenance',
        'Debris removal',
        'Health monitoring'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Edging',
      description: 'Precision lawn edging services to create clean, defined borders around your property. Professional edging for a polished landscape appearance.',
      features: [
        'Clean border creation',
        'Regular maintenance',
        'Precision cutting',
        'Border definition',
        'Professional finish'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Rubbish Removal',
      description: 'Efficient rubbish removal services for all types of waste. We handle collection, sorting, and proper disposal of your unwanted items.',
      features: [
        'All waste types accepted',
        'Proper disposal methods',
        'Recycling services',
        'Quick response time',
        'Competitive rates'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Trimming',
      description: 'Professional tree and shrub trimming services to maintain the health and appearance of your landscape. Regular maintenance for optimal growth.',
      features: [
        'Tree trimming',
        'Shrub maintenance',
        'Health-focused pruning',
        'Seasonal trimming',
        'Debris removal'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Hedge Shaping',
      description: 'Expert hedge shaping services to create beautiful, artistic designs in your landscape. Professional shaping for unique and attractive hedges.',
      features: [
        'Custom designs',
        'Artistic shaping',
        'Regular maintenance',
        'Precision cutting',
        'Creative solutions'
      ],
      image: 'https://images.unsplash.com/photo-1600698476351-86bab6facd8c?q=80&w=2070&auto=format&fit=crop'
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
            <h2 className="section-title inline-block">Our Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              We offer a comprehensive range of services to meet all your property and moving needs
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
              <p className="text-gray-600">Professional van hire services for all your transportation needs.</p>
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
              <p className="text-gray-600">Professional office relocation services with minimal business disruption.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Furniture Moving</h3>
              <p className="text-gray-600">Expert furniture moving services for both residential and commercial clients.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Lawn Mowing</h3>
              <p className="text-gray-600">Professional lawn maintenance services to keep your property looking pristine.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Clean Up</h3>
              <p className="text-gray-600">Comprehensive property cleanup services for residential and commercial properties.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Hedge Trimming</h3>
              <p className="text-gray-600">Professional hedge maintenance services for neat and well-maintained boundaries.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Edging</h3>
              <p className="text-gray-600">Precision lawn edging services for clean, defined borders around your property.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Rubbish Removal</h3>
              <p className="text-gray-600">Efficient rubbish removal services for all types of waste and proper disposal.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Trimming</h3>
              <p className="text-gray-600">Professional tree and shrub trimming services for optimal growth and appearance.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="text-green-600 mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-2">Hedge Shaping</h3>
              <p className="text-gray-600">Expert hedge shaping services for beautiful, artistic designs in your landscape.</p>
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