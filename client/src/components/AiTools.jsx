import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="relative px-4 sm:px-20 xl:px-32 py-24">
      {/* Soft background gradient + blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-pink-300/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-slate-800 text-4xl sm:text-5xl font-bold tracking-tight">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 mt-4">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-8 mt-14 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 w-full sm:w-[280px] rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-gray-100 
            hover:-translate-y-1 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group"
            onClick={() => user && navigate(tool.path)}
          >
            {/*Navigate only if user logged in */}
            
            {/* Icon with gradient */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-slate-800">
              {tool.title}
            </h3>
            <p className="text-gray-500 text-sm mt-2">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
