import React, { useEffect, useRef } from "react";
import { Carousel } from "bootstrap"; // Import Bootstrap Carousel

const CarouselComponent = () => {
  const images = [
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1712920615/uploads/ipd74pyd1a3z76jv32qw.jpg",
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1712920615/uploads/p487ptyrbkxibw2dlyiz.jpg",
    "https://res.cloudinary.com/dpcfyn3si/image/upload/v1712920615/uploads/pmar6lpfusooguvlyiby.jpg",
    "https://mercury.akamaized.net/i/9efab1e5df1bb31fb2879a6f10b0bdea_232025_0.jpg",
    "https://mercury.akamaized.net/i/d87b80bb7a3fb13572c40d68fe4c310f_260642_0.jpg",
    "https://mercury.akamaized.net/i/e59b1dc6c30b3fec61a5fc99d18e65f2_232029_0.jpg",
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
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="d-block w-100"
            />
          </div>
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
