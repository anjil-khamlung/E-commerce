import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";


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

const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError("");

  if (!validate()) return;

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>

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
        <div className="relative">
          <label className="font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
            placeholder="Enter your password"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showPassword ? "🙈" : "🐵"}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white rounded font-bold p-2 hover:bg-green-600 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
