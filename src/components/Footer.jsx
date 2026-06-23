import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-14" />
          </Link>

          <p className="mt-4 text-sm leading-6 text-gray-400">
            Discover quality products at great prices. Shop electronics,
            fashion, watches and more all in one place.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              to="/products?category=laptops"
              className="hover:text-white transition"
            >
              Laptops
            </Link>

            <Link
              to="/products?category=smartphones"
              className="hover:text-white transition"
            >
              Smartphones
            </Link>

            <Link
              to="/products?category=mens-watches"
              className="hover:text-white transition"
            >
              Watches
            </Link>

            <Link
              to="/products?category=fragrances"
              className="hover:text-white transition"
            >
              Fragrances
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>

            <Link to="/products" className="hover:text-white transition">
              All Products
            </Link>

            <Link to="/cart" className="hover:text-white transition">
              Cart
            </Link>

            <Link to="/login" className="hover:text-white transition">
              Login
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <p className="text-sm">support@myshop.com</p>
          <p className="text-sm mt-2">Kathmandu, Nepal</p>

          <div className="flex gap-4 mt-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-white transition" />
            <FaInstagram className="cursor-pointer hover:text-white transition" />
            <FaTwitter className="cursor-pointer hover:text-white transition" />
            <FaGithub className="cursor-pointer hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>

          <div className="flex gap-4 mt-3 sm:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="hover:text-white transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
