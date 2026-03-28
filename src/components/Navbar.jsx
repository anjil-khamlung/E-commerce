
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import e_logo from "../assets/e_logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
    const dropdownRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };


    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (!dropdownRef.current?.contains(e.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-15">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              setSearch("");
            }}
          >
            <img className="h-15" src={e_logo} alt="Logo" />
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-stretch border min-h-10 rounded-lg overflow-hidden w-full max-w-2xl mx-auto"
          >
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

          {/* Cart  */}
          <FaShoppingCart className="text-4xl text-blue-400 mx-4 cursor-pointer hover:text-blue-600 transition-colors" />

          {/* Desktop Buttons */}
          {!currentUser ? (
            <div className="hidden md:flex gap-2">
              <NavLink
                className="bg-blue-400 text-white hover:bg-blue-600 transition-colors px-3 py-1 rounded-md w-20 h-9 text-center"
                to="/login"
              >
                Login
              </NavLink>

              <NavLink
                className="bg-blue-400 text-white hover:bg-blue-600 transition-colors px-3 py-1 rounded-md w-20 h-9 text-center"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <>
              <FaUserCircle
                size={35}
                className="cursor-pointer text-blue-400  hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div ref={dropdownRef} className="absolute right-4 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col  items-center gap-2 mt-4">
                    <span className="font-semibold">{currentUser.email}</span>
                    <button
                      className="bg-blue-400 text-white hover:bg-blue-600 transition-colors px-3 py-1 mx-4 rounded-md w-20 h-9 text-center cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

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

