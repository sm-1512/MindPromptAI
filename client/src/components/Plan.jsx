import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative z-20">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-slate-800 text-4xl sm:text-[42px] font-bold tracking-tight">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-base sm:text-lg">
          Start for free and scale up as you grow. Pick the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Pricing Table Container */}
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl p-6 sm:p-10">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
