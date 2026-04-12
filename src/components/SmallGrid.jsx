import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Skeleton Loader Component
const SmallGridSkeleton = ({ count = 4 }) => {
  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2 animate-pulse bg-gray-200 h-6 w-32 rounded"></h2>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full h-28 bg-gray-200 rounded-lg animate-pulse p-2"></div>
            <div className="mt-2 h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SmallGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data.products.slice(0, 4)); // show only first 4
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) return <SmallGridSkeleton />;

  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  if (!products.length) {
    return (
      <h2 className="text-center mt-10 text-gray-500">
        No products found in {category}
      </h2>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">{category.toUpperCase()}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <Link key={item.id} to={`/products?category=${category}`}>
            <div className="flex flex-col items-center">
              <div className="w-full h-28 bg-gray-100  overflow-hidden p-2">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
              <p className="text-xs mt-1 text-center line-clamp-2">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SmallGrid;
