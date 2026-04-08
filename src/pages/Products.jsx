import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";


// Skeleton loader for product cards
const ProductCardSkeleton = () => (
  <div className="bg-white shadow-md rounded-xl p-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-lg mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/5"></div>
  </div>
);

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get("search"); // ?search=laptop
  const categoryQuery = queryParams.get("category"); // ?category=smartphones

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    // Decide API URL
    const url = searchQuery
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`
      : categoryQuery
        ? `https://dummyjson.com/products/category/${categoryQuery.toLowerCase()}`
        : "https://dummyjson.com/products";

    axios
      .get(url)
      .then((res) => setProducts(res.data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchQuery, categoryQuery]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center justify-center animate-pulse bg-gray-200 h-6 w-48 rounded"></h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  // Error message
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  // No products
  if (!products.length) {
    return (
      <h2 className="text-center mt-10 text-gray-500">No products found</h2>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : categoryQuery
            ? categoryQuery.toUpperCase()
            : "All Products"}
      </h2>

      {/* Product grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
          >
            <div className="h-48 flex justify-center items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
            <h2 className="text-md font-semibold mt-3 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-blue-500 font-bold mt-2">$ {product.price}</p>
            <p className="flex items-center mt-2 text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                return (
                  <span key={i}>
                    {product.rating >= starValue ? <FaStar /> : <FaRegStar />}
                  </span>
                );
              })}
              <span className="ml-2 text-gray-600 font-semibold">
                {product.rating.toFixed(1)}
              </span>
            </p>

            <NavLink
              to={`/product/${product.id}`}
              className="block mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 text-center"
            >
              See more
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
