import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/Header";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar";
import FAQPage from "./Pages/Faq";
import CheckoutPage from "./Pages/Checkout";
import ContactFormWithInfo from "./Pages/Contact";
import Admin from "./Pages/Admin";
import Categories from "./Pages/Categories";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import OfferProductDetails from './Pages/OfferProductDetails';
import OfferPage from "./Pages/OfferPage";

const App = () => {
  // State variables for selected letter and search value
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0); // Initialize cart item count state

  // Function to update cart item number
  const updateCartItemNumber = (count) => {
    setCartItemCount(count);
  };

  // Function to handle letter click event
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  // Function to handle search
  const onSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <Router>
      {/* Render Navbar */}
      <Navbar />
      {/* Render Header and pass handleLetterClick, onSearch, and cartItemCount as props */}
      <Header
        handleLetterClick={handleLetterClick}
        onSearch={onSearch}
        cartItemCount={cartItemCount} // Pass the cartItemCount prop
      />
      {/* Define routes */}
      <Routes>
        {/* Home route with optional selectedLetter and searchValue props */}
        <Route
          path="/"
          element={<Home selectedLetter={selectedLetter} searchValue={searchValue} />}
        />
        {/* Route for specific category */}
        <Route
          path="/category/:categoryName"
          element={<Home selectedLetter={selectedLetter} searchValue={searchValue} />}
        />
        {/* Route for product details */}
        <Route path="/product/:productName" element={<ProductDetails />} />
        {/* Route for cart */}
        <Route path="/cart" element={<Cart updateCartItemNumber={updateCartItemNumber} />} />
        {/* Route for FAQ page */}
        <Route path="/faq" element={<FAQPage />} />
        {/* Route for checkout page */}
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/contact-us" element={<ContactFormWithInfo/>}/>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<Admin />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/offer/:productName" element={<OfferProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
// added
