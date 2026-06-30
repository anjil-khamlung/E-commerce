import { useLocation, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { useEffect } from "react";

const PaymentFail = () => {
  const navigate = useNavigate();



  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-lg rounded-lg border p-8 w-full max-w-md text-center">
        <div className="flex justify-center">
          <RxCrossCircled className="text-red-500 text-7xl" />
        </div>
        <h1 className="text-red-600 text-3xl font-bold">Payment Failed </h1>

        <p className="mt-4 text-gray-600">
          Your payment could not be completed.
        </p>

        <p className="mt-2 text-gray-500 text-sm">
          Please try again or choose another payment method.
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="mt-6 bg-red-500 w-full text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
        >
          Try Again
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-3 block mx-auto text-green-500  hover:text-green-600 cursor-pointer "
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFail;
