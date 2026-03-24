import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const { category } = useParams(); // /products/:category
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search"); // /products?search=xxx

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    let url = "";
    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}`;
    } else if (category && category !== "All") {
      url = `https://dummyjson.com/products/category/${category.toLowerCase()}`;
    } else {
      url = "https://dummyjson.com/products";
    }

    axios
      .get(url)
      .then((res) => setProducts(res.data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category, searchQuery]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  if (!products.length)
    return (
      <h2 className="text-center mt-10 text-gray-500">No products found</h2>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center justify-center">
        {searchQuery
          ? `Search results for "${searchQuery}"`
          : category
            ? `${category.toUpperCase()}`
            : "All Products"}
      </h2>

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
            <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
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
