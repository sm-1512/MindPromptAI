import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn, signOut } = useClerk();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <nav className="rounded-2xl bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl shadow-lg border border-white/40 px-6 sm:px-10 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-24 sm:w-36 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-primary rounded-full",
                  },
                }}
                afterSignOut={() => signOut(() => navigate("/"))} // updated method
              />
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary hover:bg-primary/90 transition-colors text-white px-6 sm:px-8 py-2 shadow-md"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          )}

        
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
