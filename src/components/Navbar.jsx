import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../src/media/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Icon */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop NavItems */}
          <div className="hidden lg:flex items-center">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/category/offer">Offers</NavItem>
            <NavItem to="/faq">FAQ</NavItem>
            <NavItem to="/contact-us">Contact Us</NavItem>
          </div>

          {/* Mobile Logo */}
          <div className="flex items-center justify-center w-full lg:w-auto lg:flex-shrink-0">
            <Link to="/">
              <img src={logo} width={100} height={100} alt="logo" />
            </Link>
          </div>

          {/* Cart Icon for Mobile */}
          <div className="flex-shrink-0 lg:hidden text-right pr-3">
            <Link to="/cart" className="text-white hover:text-gray-300">
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/officel/80/add-shopping-cart.png"
                alt="add-shopping-cart"
              />
            </Link>
          </div>

          {/* Additional Items for Desktop */}
          <ul className="hidden lg:flex items-center gap-8">
            <li className="text-sm font-medium">
              US Toll Free:{" "}
              <span className="text-green-500">+1 888 524 7161</span>
            </li>
            <li className="text-sm font-medium text-green-500 hover:text-gray-400 transition duration-300">
              Live Chat Online
            </li>
            <li className="relative">
              <select
                name="lang"
                id="Lang"
                className="px-2 bg-white text-black border border-white text-sm font-medium focus:outline-none focus:border-gray-400"
              >
                <option value="English">🇺🇸 English</option>
                <option value="Spanish">🇪🇸 Spanish</option>
                <option value="French">🇫🇷 French</option>
                <option value="German">🇩🇪 German</option>
                <option value="Italian">🇮🇹 Italian</option>
                <option value="Chinese">🇨🇳 Chinese</option>
                <option value="Japanese">🇯🇵 Japanese</option>
                {/* Add more language options and corresponding flags as needed */}
              </select>
            </li>
            <li className="relative">
              <select
                name="currency"
                id="Currency"
                className="px-2 bg-white text-black border border-white text-sm font-medium focus:outline-none focus:border-gray-400"
              >
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
                <option value="JPY">JPY ¥</option>
                {/* Add more currency options as needed */}
              </select>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="text-white text-xs flex flex-col items-center p-3 list-none">
              <NavItem to="/" onClick={toggleMenu}>
                Home
              </NavItem>
              <NavItem to="/category/offer" onClick={toggleMenu}>
                Offers
              </NavItem>
              <NavItem to="/faq" onClick={toggleMenu}>
                FAQ
              </NavItem>
              <NavItem to="/contact-us" onClick={toggleMenu}>
                Contact Us
              </NavItem>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-300"
    >
      {children}
    </Link>
  );
};

export default Navbar;
