import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 text-sm text-left">
          {/* Copyright Section */}
          <div className="copy-right-sec mt-1">
            <p className="copy-right text-xs">Copyright © medsforhim.com. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;