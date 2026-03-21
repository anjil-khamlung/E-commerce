import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <img className="h-16" src={logo} alt="My Logo" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 text-lg">
            {["home", ].map((path) => (
              <li key={path}>
                <NavLink
                  to={`/${path}`}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  {path}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            <NavLink
              className="bg-blue-400 text-white px-3 py-1 rounded-md w-20 h-9 text-center"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="bg-blue-400 text-white px-3 py-1 rounded-md w-20 h-9 text-center"
              to="/register"
            >
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

     {/* Mobile Menu */}
{isOpen && (
  <div className="absolute right-4 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-4 md:hidden">
    
    <ul className="flex flex-col gap-4 text-lg">
      {["home", "products"].map((path) => (
        <li key={path}>
          <NavLink
            to={`/${path}`}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            {path}
          </NavLink>
        </li>
      ))}
    </ul>

    <div className="flex flex-col gap-2 mt-4">
      <NavLink
        to="/login"
        onClick={() => setIsOpen(false)}
        className="bg-blue-400 text-white px-3 py-2 rounded-md text-center"
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        onClick={() => setIsOpen(false)}
        className="bg-blue-400 text-white px-3 py-2 rounded-md text-center"
      >
        Register
      </NavLink>
    </div>
  </div>
)}
     
    </nav>
  );
};

export default Navbar;
