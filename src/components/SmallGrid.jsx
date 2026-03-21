import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SmallGrid = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data.products.slice(0, 4));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  
  if (error) {
    return <h2 className="text-center mt-10 text-red-500">{error}</h2>;
  }

  return (
    <div className="max-w-sm mx-auto p-4 ">
      <h2 className="text-lg font-semibold mb-2">{category.toUpperCase()}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((item) => (
          <Link key={item.id} to="/products" state={{category:category}}>
            <div  className="flex flex-col items-center">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-28 object-cover bg-gray-200 cursor-pointer  p-2"
              />
              <p className="text-xs mt-1 text-center">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};;

export default SmallGrid;
