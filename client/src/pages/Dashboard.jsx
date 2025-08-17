import React, { useState, useEffect } from "react";
import { Sparkles, Gem } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

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
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}

      
      
    </div>
  );
};

export default Dashboard;
