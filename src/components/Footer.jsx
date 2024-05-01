import React from 'react';
import { Link } from 'react-router-dom';
import payment from '../media/payment.png';
import securePay from '../media/secure_pay.png';

const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 text-sm text-left">

          {/* Home, Contact Us, About Us */}
          <div className="text-sm">
            <ul className="list-none">
              <li>Home</li>
              <li><Link to="/contact-us">Contact Us</Link></li> {/* Contact Us Link */}
              <li>About Us</li>
            </ul>
          </div>

          {/* Our Policy, Terms & Conditions, Sitemap */}
          <div className="text-sm">
            <ul className="list-none">
              <li>Our Policy</li>
              <li>Terms & Conditions</li>
              <li>Sitemap</li>
            </ul>
          </div>

          {/* Payment Options */}
          <div className="text-xs">
            <p className="font-bold">Payment Options</p>
            <img src={payment} width={200} height={40} alt="payment" className="mt-2 mx-auto" />
            <p className="text-xs text-secondary mt-2">Products are not appeared on your credit card statement</p>
          </div>

          {/* Secure Payment Process */}
          <div className="text-xs">
            <p className="font-bold">Secure Payment Process</p>
            <img src={securePay} width={200} height={40} alt="secure_payment" className="mt-2 mx-auto" />
            <p className="text-xs text-secondary mt-2">See links to the certificates at Secure Checkout Page</p>
          </div>

          {/* Mobile Version (Hidden in Mobile View) */}
          <div className="hidden md:block">
          <Link to="/contact-us" className="block w-75 border border-blue-500 bg-blue-500 text-white font-bold py-2 px-2 rounded-full text-center mt-4 hover:bg-blue-700 hover:border-blue-700">
        Contact Us
      </Link>
          </div>
        </div>

        {/* Copy Right Section */}
        <div className="copy-right-sec mt-1">
          <p className="copy-right text-xs">Copyright © budgetmeds.com. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
