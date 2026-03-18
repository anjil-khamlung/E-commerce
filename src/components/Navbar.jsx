import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" >
            <img className="h-16" src={logo} alt="My Logo"  />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-4 text-lg">
            {["home", "products"].map((path) => (
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

          {/* Desktop buttons */}
          <div className="hidden md:flex gap-2">
            <NavLink
              to="/login"
              className="bg-blue-400  text-white px-3 py-1 rounded-md w-20 h-9 text-center"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-blue-400 text-white px-3 py-1 rounded-md w-20 h-9 text-center"
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
