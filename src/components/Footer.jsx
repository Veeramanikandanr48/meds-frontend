import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Copyright Section */}
          <div className="copy-right-sec">
            <p className="copy-right text-xs">Copyright © medsforhim.com. All rights reserved</p>
          </div>
          
          {/* Social Media Links */}
          <div className="social-links flex justify-center md:justify-end gap-4">
            <a 
              href="https://wa.me/18126427099" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              <FaWhatsapp size={24} />
            </a>
            <a 
              href="https://www.facebook.com/people/Healthy-Bonding/61567110196869/?sk=about" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a 
              href="https://www.instagram.com/healthybonding24/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;