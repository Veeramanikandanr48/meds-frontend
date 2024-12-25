import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { Carousel } from "bootstrap"; // Import Bootstrap Carousel

const CarouselComponent = () => {
  const images = [
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1730551915/uploads/yjytm9pviownt45qkskb.jpg",
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1734842245/kdzhi6ay5mimxyuismrn.png",
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1730551917/uploads/n1mra7hnkgiogq8lrskj.jpg",
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const initCarousel = () => {
      new Carousel(carouselRef.current, {
        interval: 5000, // Change interval to 5 seconds
        touch: true, // Enable touch swipe for responsiveness
        keyboard: true, // Enable keyboard navigation
      });
    };

    initCarousel();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="carousel slide py-5" data-bs-ride="carousel" ref={carouselRef}>
      <div className="carousel-inner">
        {images.map((imageUrl, index) => (
          <Link to="/offer" key={index} style={{textDecoration: 'none', color: 'inherit'}}>
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                className="d-block w-100"
              />
            </div>
          </Link>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
