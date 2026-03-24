import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  const categories = ["All", "Laptops", "Phones", "Fragrance"];

  // Auto-fill search input when category changes
  useEffect(() => {
    if (category !== "All") setSearch(category);
    else setSearch("");
  }, [category]);

  // Reset on home page only
  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
      setCategory("All");
    }
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsOpen(false); // close mobile menu
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <img className="h-16" src={logo} alt="Logo" />
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-stretch border min-h-10 rounded-lg overflow-hidden w-full max-w-2xl mx-auto"
          >
            {/* Category Dropdown */}
            <div className="relative flex-none">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none bg-gray-100 px-3 pr-8 text-sm outline-none border-r cursor-pointer h-full"
                style={{ width: `${category.length + 6}ch` }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <MdArrowDropDown className="absolute right-1 top-1/2 -translate-y-1/2 text-xl pointer-events-none text-gray-600" />
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-3 text-sm outline-none"
            />

            {/* Search Button */}
            <button className="bg-blue-400 flex items-center justify-center hover:bg-blue-600 transition-colors w-11 cursor-pointer">
              <IoSearchOutline className="text-white text-2xl" />
            </button>
          </form>

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
};;

export default Navbar;
