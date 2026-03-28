import React, { useState } from "react";
import { Link } from "react-router-dom";
import laptops from "../assets/laptops.webp";
import phone from "../assets/phone.webp";
import watches from "../assets/watches.jpg";
import perfumes from "../assets/perfumes.jpg";
import CategorySection from "../components/CategorySection";

const Home = () => {
  // category info to each image
  const images = [
    { src: laptops, category: "laptops" },
    { src: perfumes, category: "fragrances" },
    { src: phone, category: "smartphones" },
    { src: watches, category: "mens-watches" },
  ];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative px-3">
      <div className="relative">
        {/* Wrap image in Link to category page */}
        <Link to={`/products?category=${images[current].category}`}>
          <img
            src={images[current].src}
            alt={images[current].category}
            className="h-[calc(100vh-4rem)] w-full object-cover cursor-pointer"
          />
        </Link>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-3/5 bg-linear-to-t from-gray-200 to-transparent pointer-events-none"></div>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-[7%] -translate-y-1/2 bg-white/50 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-[7%] -translate-y-1/2 bg-white/50 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❯
      </button>

      {/* Overlay */}
      <div className="relative -mt-95 px-2">
        <CategorySection />
      </div>
    </div>
  );
};

export default Home;
