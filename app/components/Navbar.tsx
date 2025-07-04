'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Quote', path: '/quote', isButton: true }
  ];

  return (
    <motion.nav 
      className="fixed w-full z-50 bg-black/30 backdrop-blur-md border-b border-purple-900/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.21, 0.45, 0.27, 0.99] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="transition-all duration-300 transform hover:scale-105">
            <Image 
              src="/images/drift-sites-logo-removebg-preview.png" 
              alt="Drift Sites Logo" 
              width={150} 
              height={60}
              className="h-12 w-auto" 
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
            {navItems.map((item) => (
                item.isButton ? (
              <Link 
                key={item.name}
                href={item.path} 
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-lg ml-2"
              >
                {item.name}
                  </Link>
                ) : (
                  <Link 
                    key={item.name}
                    href={item.path} 
                    className="relative px-4 py-2 rounded-md transition-all duration-300"
                  >
                    <span className={pathname === item.path ? 'text-purple-400' : 'text-white hover:text-purple-300'}>
                      {item.name}
                    </span>
                    {pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-500 w-full"
                    layoutId="navbar-underline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
                )
            ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-purple-900/20 rounded-md transition-all duration-300"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-3 border-t border-purple-900/30">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path} 
              className={`
                block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-300
                ${pathname === item.path ? 'text-purple-400 bg-purple-900/20' : 'text-white hover:bg-purple-900/10'}
                ${item.isButton ? 'bg-purple-700 hover:bg-purple-600 text-center' : ''}
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
} 