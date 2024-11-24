import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import useProductData from "../Data/useProductData";
import Layout from "../Layout";
import SimpleForm from "../components/Chatbot/SimpleForm";

const Home = ({ selectedLetter, searchValue }) => {
  const { categoryName } = useParams();
  const selectedCategory = categoryName || "Bestsellers";
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  let endpoint = selectedLetter
    ? `products/letter/${selectedLetter}`
    : `categories/${selectedCategory}`;
  if (searchValue) {
    endpoint = `products/name/${searchValue}`;
  }

  const { data } = useProductData(endpoint);

  useEffect(() => {
    if (data) {
      setSelectedProducts(data);
      setLoading(false);
    }
    if (data?.error) {
      setError(data.error);
      setLoading(false);
    }
  }, [data]);

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  return (
    <Layout>
      <div className="w-full flex flex-col p-3 min-vh-100">
        <Carousel />
        <div className="relative flex-1">
          {loading && <LoadingSpinner />}
          {!loading && !error && (
            <ProductGrid
              key={selectedCategory}
              products={selectedProducts}
              selectedCategory={selectedCategory}
            />
          )}
          {error && <ErrorMessage error={error} />}
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full flex items-center"
        >
          {chatbotOpen ? "Close Chatbot" : "Open Chatbot"}
        </button>
      </div>
      {chatbotOpen && (
        <div className="fixed bottom-0 right-0 z-50 p-4">
          <div className="p-4 bg-white shadow-lg rounded-lg relative">
            <SimpleForm closeChatbot={toggleChatbot} />
          </div>
        </div>
      )}
    </Layout>
  );
};

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="text-red-500">Error: {error}</div>
);

const ProductGrid = ({ products, selectedCategory }) => (
  <div>
    <h1 className="h1 lg:hidden p-2">{selectedCategory}</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="product-card border rounded-lg overflow-hidden w-auto">
    <div className="p-3">
      <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <h1 className="text-sm font-semibold mb-2">{product.Name}</h1>
      </Link>
      <div className="flex justify-center">
        <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
          <img
            src={product.URL}
            alt={product.name}
            title={product.name}
            className="w-auto h-auto mb-2"
          />
        </Link>
      </div>
      <p className="text-xs text-blue-400 mb-2 flex justify-center">
        {product.packaging}
      </p>
      <p className="text-xs text-red-400 mb-2 flex justify-center">
        Best price guaranteed
      </p>
      <div className="flex justify-center">
        <Link
          to={`/product/${product._id}`}
          className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md"
          style={{textDecoration: 'none', color: 'inherit'}}
        >
          <span className="hidden sm:inline">SELECT PACK</span>
          <span className="sm:hidden">Select</span>
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
