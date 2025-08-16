import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 bg-gradient-to-br from-indigo-100 via-white to-pink-50 overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
          Your Ideas,
          <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
            Supercharged by AI
          </span>
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-sm sm:text-base">
          Create articles, images, and more with our cutting-edge AI tools. Save
          time, boost productivity, and bring your ideas to life.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigate("/ai")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Start Creating
          </button>
          <button className="px-8 py-3 rounded-xl bg-white border border-gray-200 hover:scale-105 transition-transform duration-200 font-semibold">
            Watch Demo
          </button>
        </div>

        {/* Trusted By */}
        <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
          <img src={assets.user_group} alt="Users" className="h-8 w-auto" />
          <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium">
            Trusted by 10k+ creators
          </span>
        </div>
      </div>

      {/* Right Illustration */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={assets.hero_image}
          alt="AI Tools"
          className="max-w-[90%] md:max-w-md object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default Hero;
