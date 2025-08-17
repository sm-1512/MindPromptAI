import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/cover-letter-generator", label: "Cover Letter Generator", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col justify-between shadow-sm max-sm:absolute top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      {/* Top Section */}
      <div className="my-8 w-full">
        <img
          src={user.imageUrl}
          alt="User avatar"
          className="w-16 h-16 rounded-full mx-auto shadow-md"
        />
        <h1 className="mt-3 text-center font-semibold text-gray-800">
          {user.fullName}
        </h1>

        {/* Nav Items */}
        <div className="px-6 mt-8 text-sm font-medium space-y-1">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-gray-500"
                    }`}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t border-gray-200 p-4 px-6 flex items-center justify-between bg-gray-50">
        <div
          onClick={openUserProfile}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition"
        >
          <img src={user.imageUrl} className="w-9 h-9 rounded-full" alt="" />
          <div>
            <h1 className="text-sm font-semibold text-gray-800">
              {user.fullName}
            </h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="w-5 text-gray-400 hover:text-red-500 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
