import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-20 xl:px-32 overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Decorative gradient blobs */}
      <div className="absolute top-[-15%] left-[-15%] w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-72 h-72 bg-pink-300/10 rounded-full blur-3xl opacity-50 animate-pulse" />

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold leading-tight bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          Create amazing content <br />
          with <span className="text-primary">AI tools</span>
        </h1>
        <p className="mt-6 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-sm sm:text-base text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm sm:text-base">
        <button
          onClick={() => navigate("/ai")}
          className="px-10 py-3 rounded-lg bg-gradient-to-r from-primary to-pink-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Start Creating
        </button>
        <button className="px-10 py-3 rounded-lg bg-white/60 backdrop-blur-lg border border-gray-200 hover:scale-105 hover:shadow-md transition-all duration-200">
          Watch Demo
        </button>
      </div>

      {/* Trusted by section */}
      <div className="flex items-center gap-3 mt-10 mx-auto text-gray-600">
        <img src={assets.user_group} alt="Users" className="h-8" />
        <span className="text-sm sm:text-base">Trusted by 10k+ people</span>
      </div>
    </div>
  );
};

export default Hero;
