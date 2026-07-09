import axios from "axios";
import React, { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_CONFIG } from "../services/config";
import logo from "../assets/logo.png";
import { IoIosArrowRoundBack } from "react-icons/io";


const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //email and password validation
const validate = () => {
  let newErrors = {};

  // Email
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!formData.email.includes("@")) {
    newErrors.email = "Enter a valid email";
  }

  // Password
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(formData.password)) {
    newErrors.password = "Password must contain at least one uppercase letter";
  } else if (!/\d/.test(formData.password)) {
    newErrors.password = "Password must contain at least one number";
  } else if (!/[@$!%*?&]/.test(formData.password)) {
    newErrors.password = "Password must contain at least one special character";
  }

  // Confirm Password
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
  };
  
  
  //register form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    await axios.post(`${API_CONFIG.BACKEND_URL}/api/auth/register`, {
      email: formData.email,
      password: formData.password,
    });

    toast.success("Registered Successfully");

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  }catch (error) {
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
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full flex flex-col gap-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Sign Up
          </h1>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              placeholder="Example: abc@gmail.com"
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

          {/* Confirm Password */}
          <div>
            <label className="font-semibold">Confirm Password</label>

            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border p-2 pr-12 rounded"
                placeholder="Example: Abc@1234"
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-2xl cursor-pointer"
              >
                {showConfirmPassword ? "🙈" : "🐵"}
              </span>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 transition cursor-pointer"
          >
            Sign Up
          </button>

          <Link
            to="/"
            className="flex items-center mx-auto text-center text-green-600 hover:text-green-700"
          >
            <IoIosArrowRoundBack className="text-3xl" />
            <span> Back to Home</span>
          </Link>

          <p className="text-center text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
