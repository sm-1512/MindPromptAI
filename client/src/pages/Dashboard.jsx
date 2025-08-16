import React, { useState, useEffect } from "react";
import { dummyCreationData } from "../assets/assets";
import { Sparkles, Gem } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-gray-50">
      {/* Stats Section */}
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Total Creations */}
        <div className="flex items-center justify-between w-72 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-100 shadow-sm hover:shadow-md transition">
          <div>
            <p className="text-sm text-gray-500">Total Creations</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {creations.length}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex items-center justify-between w-72 p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-100 shadow-sm hover:shadow-md transition">
          <div>
            <p className="text-sm text-gray-500">Active Plan</p>
            <h2 className="text-2xl font-bold text-gray-800">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
            <Gem className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div>
        <p className="mb-4 text-lg font-semibold text-gray-700">
          Recent Creations
        </p>
        <div className="space-y-3">
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
