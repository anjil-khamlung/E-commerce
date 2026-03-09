import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const init = {
    name: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(init);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      alert("name must be filled");
      return;
    }
    if (formData.email.trim() === "") {
      alert("email must be filled");
      return;
    }

    if (formData.password.length < 7) {
      alert("password should contain at least 8 character");
      return;
    }
    console.log(formData); //api call
    setFormData(init);
    navigate("/");
  };
  return (
    <div className="h-screen grid place-items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-100 p-6 shadow-2xl  rounded-2xl"
      >
        <h1 className="font-bold text-4xl text-center">Register</h1>

        <div className="flex flex-col gap-1">
          <label className="text-2xl">Username</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="enter name"
            name="name"
            className="border-2 rounded w-full p-2"
            value={formData.name}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-2xl">Email</label>
          <input
            onChange={handleChange}
            value={formData.email}
            placeholder="enter email"
            name="email"
            className="border-2 rounded w-full p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-2xl">Password</label>
          <input
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="enter password"
            name="password"
            className="border-2 rounded w-full p-2"
            required
          />
        </div>

        <button
          className="bg-blue-500 p-2 rounded-md font-bold text-white cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
