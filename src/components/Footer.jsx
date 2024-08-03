import React from 'react';
import { Link } from 'react-router-dom';
import payment from '../media/payment.png';
import securePay from '../media/secure_pay.png';

const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 text-sm text-left">

          {/* Home, Contact Us, About Us
          <div className="text-sm">
            <ul className="list-none">
              <li>Home</li>
              <li><Link to="/contact-us">Contact Us</Link></li> Contact Us Link
              <li>About Us</li>
            </ul>
          </div>

          Mobile Version (Hidden in Mobile View)
          <div className="hidden md:block">
          <Link to="/contact-us" className="block w-75 border border-blue-500 bg-blue-500 text-white font-bold py-2 px-2 rounded-full text-center mt-4 hover:bg-blue-700 hover:border-blue-700">
        Contact Us
      </Link>
          </div>
        </div>

        Copy Right Section */}
        <div className="copy-right-sec mt-1">
          <p className="copy-right text-xs">Copyright © medsforhim.com. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
