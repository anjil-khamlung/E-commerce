import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const init = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(init);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username.trim() === "") {
      alert("username must be filled");
      return;
    }

    if (formData.password.length < 5) {
      alert("password should contain at least 5 character");
      return;
    }

    try {
      const res = await login(formData);
      console.log(res);
      navigate("/");
      toast.success("Login successfull");
      console.log(formData);
      setFormData(init);
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="h-screen grid place-items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 shadow-2xl w-100 p-6 rounded-2xl"
      >
        <h1 className="text-4xl text-center font-bold">Login</h1>
        <input
          onChange={handleChange}
          className="p-2 w-full border-2 rounded-md"
          type="text"
          placeholder="enter username"
          name="username"
          value={formData.username}
          required
        />
        <input
          onChange={handleChange}
          className="p-2 w-full border-2 rounded-md"
          type="password"
          placeholder="enter password"
          name="password"
          value={formData.password}
          required
        />
        <input
          className="bg-blue-500 p-2 rounded-md font-bold text-white cursor-pointer"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
};

export default Login;
