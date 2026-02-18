import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-500">E-Shop</span>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
