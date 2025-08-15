import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full text-gray-500 mt-20 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/20">
      {/* Decorative Blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-pink-300/10 rounded-full blur-3xl -z-10" />

      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300/30 pb-10">
        {/* Logo & Description */}
        <div className="md:max-w-sm">
          <img className="h-10" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm leading-relaxed">
            Experience the power of AI with{" "}
            <span className="text-primary font-semibold">MindPromptAI</span>.
            Transform your content creation with our premium AI tools — write
            articles, generate images, and enhance your workflow effortlessly.
          </p>
        </div>

        {/* Links & Newsletter */}
        <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-12 sm:gap-20">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold mb-5 text-gray-800 text-base">
              Company
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-3 max-w-xs">
              <p>
                Get the latest news, articles, and resources — straight to your
                inbox.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <input
                  className="border border-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-primary outline-none w-full h-10 rounded-lg px-3 bg-white/70 backdrop-blur-sm"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-gradient-to-r from-primary to-pink-500 w-28 h-10 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <p className="pt-6 text-center text-xs md:text-sm text-gray-500">
        © 2025 MindPromptAI. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
