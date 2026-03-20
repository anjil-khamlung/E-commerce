import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)
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

  const validate = () => {
    let newErrors = {};
    //Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    //Password validdation
   if (!formData.password) {
     newErrors.password = "Password is required";
   } else if (formData.password.length < 8) {
     newErrors.password = "Password must be at least 8 characters";
   } else if (!/[A-Z]/.test(formData.password)) {
     newErrors.password = "Password must contain at least one uppercase letter";
   } else if (!/\d/.test(formData.password)) {
     newErrors.password = "Password must contain at least one number";
   } else if (!/[@$!%*?&]/.test(formData.password)) {
     newErrors.password =
       "Password must contain at least one special character";
   }

    //confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //checks if there are any errors and returns true (form is valid) or false (form has errors)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("user data:", formData);

    //Api call

    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Register</h1>

        {/*email*/}
        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Example: abe@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/*password*/}
        <div className="relative">
          <label className="font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Example: abc@134DE"
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

        {/*confirmPassword*/}

        <div className="relative">
          <label className="font-semibold">confirmPassword</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="Example: abc@134DE"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 cursor-pointer"
          >
            {showConfirmPassword ? "🙈" : "🐵"}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          className="bg-blue-500  text-white py-2 rounded font-bold hover:bg-blue-600 transition cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
