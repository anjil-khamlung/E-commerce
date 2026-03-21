import React, { useState } from "react";
import laptop from "../assets/laptop.png";
import phones from "../assets/phones.jpg";

import fragnance from "../assets/fragnance.png";
import CategorySection from "../components/CategorySection";

const Home = () => {
  const images = [laptop, fragnance,phones];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative px-3 ">
      <div className="relative">
        <img
          src={images[current]}
          alt="slider"
          className="h-[calc(100vh-4rem)] w-full object-cover"
        />
        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-3/5 bg-linear-to-t from-gray-200 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-[7%] -translate-y-1/2 
  bg-white/50 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-[7%] -translate-y-1/2 
  bg-white/50 hover:bg-white text-black p-3 rounded-full cursor-pointer"
      >
        ❯
      </button>

      {/* Overlay */}
      <div className="relative -mt-95 px-2  ">
        <CategorySection />
      </div>
    </div>
  );
};

export default Home;
