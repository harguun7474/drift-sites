'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-md text-white' 
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <Image 
                src="/images/drift-sites-logo.png" 
                alt="Drift Sites Logo" 
                width={150} 
                height={60} 
                className="h-12 w-auto" 
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  pathname === '/' ? 'text-purple-400' : 'text-white'
                } ${
                  scrolled 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  pathname === '/services' ? 'text-purple-400' : 'text-white'
                } ${
                  scrolled 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-white/10'
                }`}
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  pathname === '/about' ? 'text-purple-400' : 'text-white'
                } ${
                  scrolled 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-white/10'
                }`}
              >
                About
              </Link>
              <Link 
                href="/quote" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-lg ml-2"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                scrolled 
                  ? 'hover:bg-gray-800 text-white' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="md:hidden bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-md"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: [0.21, 0.45, 0.27, 0.99]
        }}
      >
        <motion.div 
          className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
          initial={{ y: -20 }}
          animate={{ y: isMenuOpen ? 0 : -20 }}
          transition={{ 
            duration: 0.3,
            ease: [0.21, 0.45, 0.27, 0.99],
            delay: 0.1
          }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isMenuOpen ? 0 : -20, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link 
              href="/" 
              className={`block hover:bg-gray-800 px-3 py-2 rounded-md ${pathname === '/' ? 'text-purple-400' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isMenuOpen ? 0 : -20, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Link 
              href="/services" 
              className={`block hover:bg-gray-800 px-3 py-2 rounded-md ${pathname === '/services' ? 'text-purple-400' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isMenuOpen ? 0 : -20, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link 
              href="/about" 
              className={`block hover:bg-gray-800 px-3 py-2 rounded-md ${pathname === '/about' ? 'text-purple-400' : 'text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: isMenuOpen ? 0 : -20, opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Link 
              href="/quote" 
              className="block bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
} 