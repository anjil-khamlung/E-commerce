import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    if (!form.name || !form.email || !form.address) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("Order placed successfully!");

    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping Form */}
        <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-md p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t pt-3 flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
