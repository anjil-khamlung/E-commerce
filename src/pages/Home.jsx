import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="bg-linear-to-r from-blue-500 to-blue-300 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Welcome to E-Shop
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Discover amazing products at unbeatable prices. Shop now and enjoy
              exclusive deals!
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
