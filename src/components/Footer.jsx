import React from 'react';
import { Link } from 'react-router-dom';
import payment from '../media/payment.png';
import securePay from '../media/secure_pay.png';

const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 text-sm text-left">

        <div className="copy-right-sec mt-1">
          <p className="copy-right text-xs">Copyright © medsforhim.com. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
