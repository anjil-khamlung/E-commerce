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
              h-55 sm:h-75 md:h-125 lg:h-[calc(100vh-4rem)]
            "
          />
        </Link>

        {/* Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 sm:h-3/5 bg-linear-to-t from-gray-200 to-transparent pointer-events-none"></div>
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-[5.5%] -translate-y-1/2 bg-white/60 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-[5.5%] -translate-y-1/2 bg-white/60 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❯
      </button>

      {/* Category Section */}
      <div className="mt-4 sm:-mt-20 md:-mt-87 relative z-10">
        <CategorySection />
      </div>
    </div>
  );
};

export default Home;
