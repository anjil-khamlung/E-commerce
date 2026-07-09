import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { API_CONFIG } from "../services/config";
import logo from "../assets/logo.png";
import { IoIosArrowRoundBack } from "react-icons/io";


const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    } else if (!/[@$!%*?&]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      const res = await axios.post(`${API_CONFIG.BACKEND_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-14 rounded-2xl mb-6" />
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-xl w-full shadow-md flex flex-col gap-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Sign In
          </h1>

          {apiError && <p className="text-red-500 text-center">{apiError}</p>}

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>

            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-2 pr-12 rounded"
                placeholder="Example: Abc@1234"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-2xl"
              >
                {showPassword ? "🙈" : "🐵"}
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded font-bold p-2 hover:bg-green-600 transition cursor-pointer"
          >
            Sign In
          </button>

          <Link
            to="/"
            className="flex items-center mx-auto text-center text-green-600 hover:text-green-700"
          >
            <IoIosArrowRoundBack className="text-3xl" />
            <span> Back to Home</span>
          </Link>

          <p className="text-center text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
