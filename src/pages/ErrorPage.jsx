import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist 
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
