'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LeafParticles from '../components/LeafParticles';

export default function About() {
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
    animatedElements.forEach(el => {
      observer.observe(el);
      el.classList.add('opacity-0'); // Initially hidden
    });

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-main.jpg"
            alt="About Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/50" />
          <LeafParticles />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Company</h1>
            <p className="text-xl text-gray-200">Building a greener future with excellence and integrity</p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll">
            <h2 className="section-title inline-block">Our Mission</h2>
            <p className="text-gray-600 text-lg mt-8">
              At Specialty Lawns, our mission is to transform outdoor spaces and provide exceptional moving services 
              that exceed client expectations. We blend artistry with technical expertise to create beautiful, 
              functional environments while ensuring seamless relocations that respect both structures and landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                Our Story
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-green-500 rounded"></span>
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                Founded in 2010, Specialty Lawns began with a simple mission: to provide exceptional lawn care services
                that transform outdoor spaces into beautiful, functional areas. What started as a small family business
                has grown into a full-service company offering comprehensive lawn care and house moving solutions.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Over the years, we've expanded our services to include house moving, allowing us to serve our community
                in new and meaningful ways. Our commitment to quality, safety, and customer satisfaction has remained
                constant throughout our growth.
              </p>
              <p className="text-gray-600 text-lg">
                Today, we're proud to be one of the most trusted names in lawn care and house moving services,
                serving hundreds of satisfied customers across the region.
              </p>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl animate-on-scroll order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                alt="Company History"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              These principles guide every aspect of our business and define how we operate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Excellence</h3>
              <p className="text-gray-600 text-center">We are committed to delivering the highest quality services that exceed client expectations in every aspect of our work.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">We conduct our business with honesty, transparency, and ethical practices that build long-lasting trust with our clients and community.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">We continuously improve our methods, equipment, and techniques to deliver cutting-edge solutions that enhance efficiency and results.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <div className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Safety</h3>
              <p className="text-gray-600 text-center">We prioritize the safety of our team, clients, and properties in every project we undertake, following rigorous safety protocols at all times.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Environmental Responsibility</h3>
              <p className="text-gray-600 text-center">We embrace sustainable practices and eco-friendly solutions that minimize our environmental impact while creating beautiful, healthy spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6">Join Our Growing Family</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the difference of working with a team that truly cares about transforming your space
            </p>
            <Link
              href="/quote"
              className="bg-white text-green-800 hover:bg-green-100 px-8 py-4 rounded-md text-lg font-semibold inline-flex items-center transition-all duration-300 transform hover:scale-105"
            >
              <span>Get in Touch Today</span>
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