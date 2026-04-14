import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white  mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
            <Link
                      to="/"
                      onClick={() => {
                        setSearch("");
                      }}
                    >
                      <img className="h-15" src={logo} alt="Logo" />
                    </Link>
          <p className="text-sm mt-3">
            Your one stop shop for electronics, fashion and more.
          </p>
        </div>


        {/* Categories */}
        <div>
          <h3 className="font-semibold  mb-3">Categories</h3>

          <div className="flex flex-col gap-2 text-sm">
            <Link to="/products?category=laptops" className="hover:text-gray-700 ">
              Laptops
            </Link>

            <Link
              to="/products?category=smartphones "
              className="hover:text-gray-700 "
            >
              Smartphones
            </Link>

            <Link
              to="/products?category=mens-watches"
              className="hover:text-gray-700 "
            >
              Watches
            </Link>

         
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold  mb-3">Follow Us</h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-gray-700" />
            <FaInstagram className="cursor-pointer hover:text-gray-700" />
            <FaTwitter className="cursor-pointer hover:text-gray-700" />
          </div>

          <p className="text-sm mt-4">support@ecom.com</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
