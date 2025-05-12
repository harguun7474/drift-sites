import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-4">Specialty<span className="text-green-500">Lawns</span></h3>
            <p className="text-gray-400 mb-6">
              Professional lawn care and moving services you can trust. Transforming properties with excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61573155665570" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-green-500 rounded"></span>
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>0275186513</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@specialtylawns.com</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links Column */}
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-green-500 rounded"></span>
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  <span>→</span> Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  <span>→</span> About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/quote" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  <span>→</span> Get a Quote
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  <span>→</span> Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  <span>→</span> Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom / Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Specialty Lawns. All rights reserved.</p>
          <p className="mt-2 text-sm">Designed with 💚 for beautiful lawns and seamless moves.</p>
        </div>
      </div>
    </footer>
  );
} 