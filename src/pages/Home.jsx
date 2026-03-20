import React, { useState } from "react";
import laptop from "../assets/laptop.png";
import fragnance from "../assets/fragnance.png";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const images = [laptop, fragnance];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative px-3 ">
      {/* Image */}
      <img
        src={images[current]}
        alt="slider"
        className="h-[calc(100vh-4rem)] w-full object-cover "
      />

      <div
        className="absolute inset-0 bg-linear-to-b 
  from-transparent 
  via-transparent 
  via-50% 
  to-white"
      ></div>

      {/* Overlay */}
      <div className="absolute top-1/2 left-10   ">
        <CategorySection />
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/5 transform -translate-y-1/2 
        bg-white/50 hover:bg-white text-black p-3 rounded-full"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/5 transform -translate-y-1/2 
        bg-white/50 hover:bg-white text-black p-3 rounded-full"
      >
        ❯
      </button>
    </div>
  );
};

export default Home;
