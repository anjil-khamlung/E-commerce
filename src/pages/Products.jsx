import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setProducts(res.data.products); 
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loading UI 
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-4 bg-white rounded-lg shadow">
            <div className="h-40 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse mt-3 rounded"></div>
            <div className="h-4 bg-gray-200 animate-pulse mt-2 w-1/2 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error UI
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-6">

      {/* Responsive Grid */}
      <div
        className="grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
          >
            {/* Image */}
            <div className="h-48 flex justify-center items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="text-md font-semibold mt-3 line-clamp-2">
              {product.title}
            </h2>

            {/* Brand */}
            <p className="text-sm text-gray-500">{product.brand}</p>

            {/* Price */}
            <p className="text-blue-500 font-bold mt-2">$ {product.price}</p>

            {/* Rating */}
            <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>

            {/* Button */}
            <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
