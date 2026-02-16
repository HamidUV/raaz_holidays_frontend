
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deepblue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold mb-4 font-playfair">
              <span>RAAZ</span> Holidays
            </h2>
            <p className="mb-4 text-gray-300">
              Your trusted partner for Hajj, Umrah and premium travel services since 2005.
              We specialize in making your spiritual and leisure journeys memorable.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-raaz font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="text-gray-300 hover:text-raaz transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-raaz transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="text-gray-300 hover:text-raaz transition-colors">Travel Packages</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-raaz transition-colors">Our Services</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-raaz font-playfair">Contact Us</h3>
            <p className="mb-2 text-gray-300">Calicut Road, Manjeri</p>
            <p className="mb-2 text-gray-300">Malappuram, Kerala, India</p>
            <p className="mb-2 text-gray-300">Phone: +91 974 550 0598</p>
            <p className="mb-4 text-gray-300">Email: info@raazholidays.com</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-raaz transition-colors" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-raaz transition-colors" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.18-.8.396-1.15.748-.35.35-.566.683-.747 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.059 1.37-.059 4.04 0 2.67.01 2.986.059 4.04.045.976.207 1.504.344 1.857.18.466.396.8.748 1.15.35.35.683.566 1.15.747.353.137.882.3 1.857.344 1.054.048 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.976-.045 1.505-.207 1.858-.344.466-.18.8-.396 1.15-.748.35-.35.566-.683.747-1.15.137-.353.3-.882.344-1.857.048-1.055.059-1.37.059-4.04 0-2.67-.01-2.986-.059-4.04-.045-.976-.207-1.505-.344-1.858-.18-.466-.396-.8-.748-1.15-.35-.35-.683-.566-1.15-.747-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.059-4.04-.059zm0 3.063A5.135 5.135 0 1 1 6.865 12 5.135 5.135 0 0 1 12 6.865zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.338-7.862a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-raaz transition-colors" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        {/* <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RAAZ Holidays. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
