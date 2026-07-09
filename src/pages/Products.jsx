import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { API_CONFIG } from "../services/config";
import Fuse from "fuse.js";
import ProductCardSkeleton from "../components/skeletons/ProductCardSkeleton";



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

  if (searchQuery) {
    axios
      .get(`${API_CONFIG.DUMMY_JSON_URL}/products?limit=500`)
      .then((res) => {
        const fuse = new Fuse(res.data.products, {
          keys: ["title", "brand", "category"],
          threshold: 0.4,
        });

        const results = fuse.search(searchQuery);

        setProducts(results.map((result) => result.item));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return;
  }

  const url = categoryQuery
    ? `${API_CONFIG.DUMMY_JSON_URL}/products/category/${categoryQuery.toLowerCase()}`
    : `${API_CONFIG.DUMMY_JSON_URL}/products`;

  axios
    .get(url)
    .then((res) => setProducts(res.data.products))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
}, [searchQuery, categoryQuery]);
  
  // Loading skeleton
  if (loading) {
   return <ProductCardSkeleton/>
  }

  // Error message
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  // No products
  if (!products.length) {
    return (
      <h2 className="text-center mt-30 text-gray-500 text-2xl">No products found</h2>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Heading */}
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center">
        {searchQuery
          ? `Showing results for "${searchQuery}"`
          : categoryQuery
            ? categoryQuery.toUpperCase()
            : "All Products"}
      </h2>

      {/* Product grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md  p-4 hover:shadow-xl transition"
          >
            <NavLink to={`/product/${product.id}`}>
              <div className="h-48 flex justify-center items-center ">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </NavLink>
            <h2 className="text-md font-semibold mt-3 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <p className="text-green-500 font-bold mt-2">$ {product.price}</p>
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
              className="block mt-3 w-full bg-green-500 text-white py-2 rounded-3xl hover:bg-green-600 text-center"
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
