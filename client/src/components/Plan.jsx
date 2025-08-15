import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 relative z-20">
      {/* Heading Section */}
      <div className="text-center mb-14">
        <h2 className="text-slate-800 text-4xl sm:text-[42px] font-bold tracking-tight">
          Choose Your Perfect Plan
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
          Start for free, explore all the creative tools, and upgrade only when
          you're ready to take your projects to the next level.
        </p>
      </div>

      {/* Pricing Table - Integrated Look */}
      <div className="bg-gradient-to-br from-white/70 via-white/50 to-transparent backdrop-blur-md rounded-3xl border border-white/40 shadow-xl p-8 sm:p-12">
        <PricingTable />
      </div>

      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
    </div>
  );
};

export default Plan;
