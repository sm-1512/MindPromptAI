import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-full bg-white/80 backdrop-blur-lg shadow-lg flex justify-between items-center py-3 px-6 sm:px-10">
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 sm:w-36 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {user ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-primary/90 transition-colors text-white px-6 sm:px-8 py-2"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
