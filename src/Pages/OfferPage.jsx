import React from "react";
import { Link } from "react-router-dom";
import offerProducts from "../Data/offerProducts.json";
import Layout from "../Layout";

const OfferPage = () => {
  // Helper function to find the lowest price for a product
  const findLowestPrice = (prices) => {
    let lowestPrice = Infinity;
    let lowestDiscountPrice = '';
    
    prices.forEach(strength => {
      strength.pills.forEach(pill => {
        const priceValue = parseFloat(pill.discountPrice.replace('$', '').split(' ')[0]);
        if (priceValue < lowestPrice) {
          lowestPrice = priceValue;
          lowestDiscountPrice = pill.discountPrice;
        }
      });
    });
    
    return lowestDiscountPrice;
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Special Offers</h2>
        <div className="row justify-content-center">
          {offerProducts.products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="text-center p-3">
                  <img
                    src={product.URL}
                    alt={product.Name}
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{product.Name}</h5>
                  <p className="card-text text-muted small">{product.Uses}</p>
                  <div className="mt-auto">
                    <div className="mb-2">
                      <span className="fw-bold">Available Strengths:</span>
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {product.prices.map((price, index) => (
                          <Link
                            key={index}
                            to={`/offer/${product.Name.toLowerCase()}?mg=${price.mg}`}
                            className="badge bg-secondary me-1 text-decoration-none"
                          >
                            {price.mg}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-success fw-bold">
                          Starting from {findLowestPrice(product.prices)}
                        </span>
                      </div>
                      <Link
                        to={`/offer/${product.Name.toLowerCase()}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default OfferPage; 