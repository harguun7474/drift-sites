'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
          ? 'bg-white/95 backdrop-blur-md shadow-md text-green-800' 
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-green-800">Specialty</span><span className="text-green-500">Lawns</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  scrolled 
                    ? 'hover:bg-green-100 text-green-800' 
                    : 'hover:bg-white/20 text-green-800'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  scrolled 
                    ? 'hover:bg-green-100 text-green-800' 
                    : 'hover:bg-white/20 text-green-800'
                }`}
              >
                Services
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  scrolled 
                    ? 'hover:bg-green-100 text-green-800' 
                    : 'hover:bg-white/20 text-green-800'
                }`}
              >
                About
              </Link>
              <Link 
                href="/quote" 
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-lg ml-2"
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
                  ? 'hover:bg-green-100 text-green-800' 
                  : 'hover:bg-white/20 text-green-800'
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
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block text-green-800 hover:bg-green-100 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="block text-green-800 hover:bg-green-100 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className="block text-green-800 hover:bg-green-100 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/quote" 
              className="block bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 