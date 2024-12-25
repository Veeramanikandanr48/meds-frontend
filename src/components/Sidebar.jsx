import React, { useState, useEffect } from "react";
import card_content from '../media/card_content.png';
import { Link } from 'react-router-dom';
import BACKEND_URL from '../Data/config';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Bestsellers");

  // Fetch categories from the API and add static Offer category
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

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Function to get the link path based on category
  const getCategoryLink = (category) => {
    if (category.name === "Offer") {
      return `/offer`; // Link to offer page instead of specific product
    }
    return `/category/${category.name}`;
  };

  return (
    <div className="lg:flex flex-col min-h-screen p-5 gap-3 hidden lg:flex">
      <h1 className="border-b py-2 h6">Categories List</h1>
      <ul className="flex flex-col text-xs gap-2 text-gray-600">
        {categories.map((category, index) => (
          <li 
            key={index} 
            className="cursor-pointer flex items-center gap-1" 
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              width="20"
              height="20"
              src={`${category.name === activeCategory 
                ? 'https://img.icons8.com/pulsar-gradient/48/add-folder.png'
                : 'https://img.icons8.com/pulsar-line/48/add-folder.png'}`}
              alt="folder-invoices"
            />
            <Link 
              to={getCategoryLink(category)}
              className={category.name === activeCategory ? 'font-bold' : ''} 
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link 
        to="/contact-us" 
        className="block border border-blue-500 bg-blue-500 text-white font-bold py-2 px-4 rounded-full text-center mt-4 hover:bg-blue-700 hover:border-blue-700"
      >
        Contact Us
      </Link>
      <h1 className="border-b py-2 h6">Shipping option</h1>
      <img src={card_content} alt="card-c" className="mb-5"/>
    </div>
  );
};

export default Sidebar;
