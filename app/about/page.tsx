'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
            alt="About Specialty Lawns"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/30" />
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
              
              <div className="mt-8 flex space-x-6">
                <div>
                  <span className="block text-4xl font-bold text-green-600">12+</span>
                  <span className="text-gray-500">Years Experience</span>
                </div>
                <div>
                  <span className="block text-4xl font-bold text-green-600">1500+</span>
                  <span className="text-gray-500">Happy Clients</span>
                </div>
                <div>
                  <span className="block text-4xl font-bold text-green-600">24+</span>
                  <span className="text-gray-500">Team Members</span>
                </div>
              </div>
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

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Our experienced professionals bring expertise, passion, and dedication to every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="animate-on-scroll group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-green-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                    <div className="mt-4 flex space-x-3">
                      <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="section-title inline-block">Our Achievements</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Recognition of our commitment to excellence in lawn care and house moving
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md animate-on-scroll">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Best Landscaping Service 2022</h3>
              <p className="text-gray-600 text-center">Awarded by the Regional Horticultural Association for excellence in landscape design and maintenance.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md animate-on-scroll">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Green Business Certification</h3>
              <p className="text-gray-600 text-center">Recognized for our sustainable practices and eco-friendly approach to lawn care and landscaping.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md animate-on-scroll">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Safety Excellence Award</h3>
              <p className="text-gray-600 text-center">Awarded for maintaining the highest safety standards in house moving and structural relocation services.</p>
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