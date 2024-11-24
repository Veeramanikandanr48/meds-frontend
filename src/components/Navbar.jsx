import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/media/logo.png";
import { FaWhatsapp, FaFacebook, FaInstagram, FaShoppingCart, FaBars } from 'react-icons/fa';

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    <a href="https://wa.me/18126427099" 
       target="_blank" 
       rel="noopener noreferrer"
       className="text-green-500 hover:text-green-600 transition-colors">
      <FaWhatsapp size={20} />
    </a>
    <a href="https://www.facebook.com/people/Healthy-Bonding/61567110196869/?sk=about" 
       target="_blank" 
       rel="noopener noreferrer"
       className="text-blue-500 hover:text-blue-600 transition-colors">
      <FaFacebook size={20} />
    </a>
    <a href="https://www.instagram.com/healthybonding24/" 
       target="_blank" 
       rel="noopener noreferrer"
       className="text-pink-500 hover:text-pink-600 transition-colors">
      <FaInstagram size={20} />
    </a>
  </div>
);

const NavItem = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-base font-medium text-white hover:text-gray-300 transition-colors"
    style={{textDecoration: 'none', color: 'inherit'}}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <FaBars size={24} />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <img src={logo} alt="logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/category/offer">Offers</NavItem>
            <NavItem to="/faq">FAQ</NavItem>
            <NavItem to="/contact-us">Contact Us</NavItem>
          </div>

          {/* Social Links & Cart - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <SocialLinks />
            <Link to="/cart" className="text-white hover:text-gray-300" style={{textDecoration: 'none', color: 'inherit'}}>
              <FaShoppingCart size={24} />
            </Link>
          </div>

          {/* Mobile Cart Icon */}
          <div className="lg:hidden">
            <Link to="/cart" className="text-white hover:text-gray-300" style={{textDecoration: 'none', color: 'inherit'}}>
              <FaShoppingCart size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-700">
            <NavItem to="/" onClick={() => setIsMenuOpen(false)}>Home</NavItem>
            <NavItem to="/category/offer" onClick={() => setIsMenuOpen(false)}>Offers</NavItem>
            <NavItem to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</NavItem>
            <NavItem to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</NavItem>
            <div className="py-2 border-t border-gray-600">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
