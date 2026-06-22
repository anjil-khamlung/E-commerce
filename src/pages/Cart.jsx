import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);



useEffect(() => {
  fetchCart();
}, []);

const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCart(res.data);
  } catch (error) {
    console.error(error);
  }
};

  // Remove item from cart
const removeItem = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCart();
  } catch (error) {
    console.error(error);
  }
};

  // Clear entire cart
 const clearCart = async () => {
   try {
     const token = localStorage.getItem("token");

     await axios.delete("http://localhost:5000/api/cart", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     setCart([]);
   } catch (error) {
     console.error(error);
   }
 };

  // Update quantity of a cart item
 const updateQuantity = async (id, delta) => {
   try {
     const token = localStorage.getItem("token");

     await axios.put(
       "http://localhost:5000/api/cart/update",
       {
         productId: id,
         delta,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       },
     );

     fetchCart();
   } catch (error) {
     console.error(error);
   }
 };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left side: Cart items */}
        <div className="flex-1 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-blue-500">$ {item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400 cursor-pointer"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-gray-300 px-2 rounded hover:bg-gray-400 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
            <button
              onClick={() => navigate("/")}
              className=" text-blue-500 px-6 py-2 cursor-pointer hover:text-blue-600 "
            >
              ← Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Right side: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal ({cart.length} {cart.length === 1 ? "item" : "items"}
                  )
                </span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>

              {subtotal > 100 && (
                <div className="text-sm text-green-600">
                  Free shipping on orders over $100!
                </div>
              )}

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-500">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-600 transition-colors mb-3"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
