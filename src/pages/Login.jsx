import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        form,
      );
      localStorage.setItem("token", res.data.token);
      alert("Login Successful");
      navigate("/profile");
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 w-full mb-3"
          required
        />
        <button className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
