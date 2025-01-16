import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Logo from "../../src/media/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import BACKEND_URL from '../Data/config';

const Header = ({
  handleLetterClick,
  onSearch,
  cartItemCount,
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Bestsellers");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const getCartItemsFromLocalStorage = useCallback(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }, []);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}admin/categories`);
        const data = await response.json();
        // Add static Offer category at the beginning
        const categoriesWithOffer = [
          { name: "Offer", _id: "offer" },
          ...data
        ];
        setCategories(categoriesWithOffer);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const storedCartItems = getCartItemsFromLocalStorage();
    setCartItems(storedCartItems);
  }, [getCartItemsFromLocalStorage]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    onSearch(searchInput.trim());
  };

  const handleLetterButtonClick = (letter) => {
    setSelectedLetter(letter);
    handleLetterClick(letter);
  };

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between px-10 h-36 items-center border-b border-gray-300">
        {/* Logo */}
        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
          <div className="logo">
            <img src={Logo} width={270} height={80} quality={80} alt="logo" />
          </div>
        </Link>
        {/* Search input */}
        <div className="flex flex-col w-[50rem] gap-2 items-center">
          <div className="box w-full flex items-center justify-center">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              className="border-l border-t border-b text-black p-2 text-[0.8rem] w-2/4 focus:outline-none"
              placeholder="Search"
            />
            <button
              onClick={handleSearchButtonClick}
              className="bg-blue-500 p-2 text-[0.8rem] border-blue-500 text-white ml-2"
            >
              Search
            </button>
          </div>
          {/* Suggestions */}
          <div className="suggestions text-gray-500 text-[.8rem] text-center">
            Search by name:{" "}
            {alphabet.split("").map((letter, index) => (
              <button
                key={index}
                className={`text-gray-500 mx-1 hover:text-black focus:outline-none ${
                  selectedLetter === letter ? "font-bold text-success h5" : ""
                }`}
                onClick={() => handleLetterButtonClick(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        {/* Cart */}
        <div className="cart w-2/12 border h-3/4 m-5 rounded-sm flex flex-col items-center justify-center">
          <h2 className="text-[0.7rem] text-center text-gray-400 flex items-center">
            <FaShoppingCart className="mr-1" />
            YOUR CART/CHECKOUT
          </h2>
          {/* Cart items */}
          <div className="data flex flex-col items-center gap-2">
            <p className="text-[0.9rem] text-gray-600">
              {cartItemCount === 0 ? "Empty" : cartItemCount}
            </p>
            <button className="bg-blue-500 px-3 py-2 text-[0.8rem] rounded-circle border-blue-500 text-white">
              <Link to="/cart" style={{textDecoration: 'none', color: 'inherit'}}>View Cart</Link>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Header */}
      <div className="lg:hidden px-5 py-3 border-b border-gray-300 flex items-center justify-between">
        <div className="flex-grow mr-2 w-3/4">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="border-l border-t border-b text-black p-2 text-[0.8rem] w-full focus:outline-none"
            placeholder="Search"
          />
        </div>
        <button
          onClick={handleSearchButtonClick}
          className="bg-blue-500 p-2 text-[0.8rem] border-blue-500 text-white ml-2"
        >
          Search
        </button>
        {/* Categories */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center bg-gray-800 text-white px-2 py-1 rounded-md focus:outline-none"
            style={{ fontSize: "0.75rem" }}
          >
            Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.293 13.707a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L10 11.586 7.707 9.293a1 1 0 00-1.414 1.414l3 3zM5 6a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 left-0 mt-2 w-full">
              <div className="bg-gray-800 rounded-md shadow-lg">
                <div className="py-1">
                  {/* Render categories from API */}
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.name}`}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                        selectedCategory === category.name ? "bg-gray-700" : ""
                      }`}
                      style={{ fontSize: "0.75rem", textDecoration: 'none', color: 'inherit' }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
