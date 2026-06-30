import { useLocation, useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import { API_CONFIG } from "../services/config";
import axios from "axios";

const PaymentSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  

  const params = new URLSearchParams(search);
  const data = params.get("data");

  let paymentInfo = null;

  try {
    if (data) {
      paymentInfo = JSON.parse(atob(data));
    }
  } catch (error) {
    console.error("Failed to decode eSewa response:", error);
  }

    useEffect(() => {
      const params = new URLSearchParams(search);

      if (!params.get("data")) {
        navigate("/");
      }
    }, []);
  
useEffect(() => {
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Token:", token);

      const res = await axios.delete(`${API_CONFIG.BACKEND_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cart cleared:", res.data);
    } catch (error) {
      console.error(
        "Clear cart failed:",
        error.response?.data || error.message,
      );
    }
  };

  clearCart();
}, []);

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <div className="flex justify-center">
          <IoIosCheckmarkCircleOutline className="text-7xl text-green-500" />
        </div>

        <h1 className="text-green-600 text-3xl font-bold mt-2">
          Payment Successful
        </h1>

        {paymentInfo ? (
          <div className="bg-gray-100 rounded-lg p-4 mt-6 text-left space-y-2">
            <p>
              <strong>Transaction Code:</strong> {paymentInfo.transaction_code}
            </p>

            <p>
              <strong>Transaction UUID:</strong> {paymentInfo.transaction_uuid}
            </p>

            <p>
              <strong>Total Paid:</strong> Rs. {paymentInfo.total_amount}
            </p>

            <p>
              <strong>Status:</strong> {paymentInfo.status}
            </p>

            <p>
              <strong>Product Code:</strong> {paymentInfo.product_code}
            </p>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-4 mt-6">
            <p>No payment information received.</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer "
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
