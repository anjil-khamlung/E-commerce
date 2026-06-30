import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { API_CONFIG } from "../services/config";

const ProductDetails = () => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 
    axios
      .get(`${API_CONFIG.DUMMY_JSON_URL}/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-10">Loading...</h2>;
    }
    
  //add product to cart
   const addToCart = async (product) => {
     const token = localStorage.getItem("token");

     if (!token) {
       toast.error("Please login first");
       return;
     }

     try {
       await axios.post(
         `${API_CONFIG.BACKEND_URL}/api/cart/add`,
         {
           id: product.id,
           title: product.title,
           price: product.price,
           thumbnail: product.thumbnail,
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         },
       );

       toast.success("Added to cart");
     } catch (error) {
       console.error(error);

       toast.error(error.response?.data?.message || "Failed to add item");
     }
   };
    
    

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-md h-96 object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-gray-500 mt-2">{product.brand}</p>

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

          <p className="text-green-600 text-2xl font-bold mt-4">
            $ {product.price}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-md cursor-pointer hover:bg-green-600"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate(-1)}
            className="block mt-3 text-green-500 px-6 py-2 cursor-pointer hover:text-green-600"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
