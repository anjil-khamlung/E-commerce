import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import laptops from "../assets/laptops.webp";
import phone from "../assets/phone.webp";
import watches from "../assets/watches.jpg";
import perfumes from "../assets/perfumes.jpg";
import CategorySection from "../components/CategorySection";

const Home = () => {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // changes every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <div className="relative px-2 sm:px-3">
      {/* Slider */}
      <div className="relative">
        <Link to={`/products?category=${images[current].category}`}>
          <img
            src={images[current].src}
            alt={images[current].category}
            className="
        w-full object-cover cursor-pointer
        h-56 sm:h-80 md:h-125 lg:h-175
        rounded-lg
      "
          />
        </Link>

        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-gray-200 to-transparent pointer-events-none"></div>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="
      absolute left-2 sm:left-4 top-[25%] -translate-y-1/2
      bg-white/70 hover:bg-white
      w-10 h-10 sm:w-12 sm:h-12
      rounded-full shadow-md
      flex items-center justify-center
      text-lg sm:text-xl
      transition cursor-pointer
      z-20
    "
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="
      absolute right-2 sm:right-4 top-[25%] -translate-y-1/2
      bg-white/70 hover:bg-white
      w-10 h-10 sm:w-12 sm:h-12
      rounded-full shadow-md
      flex items-center justify-center
      text-lg sm:text-xl
      transition
      z-20 cursor-pointer
    "
        >
          ❯
        </button>
      </div>

      {/* Category Section */}
      <div className="relative -mt-4 sm:-mt-8 md:-mt-60 lg:-mt-100 xl:-mt-100 z-10">
        <CategorySection />
      </div>
    </div>
  );
};

export default Home;
