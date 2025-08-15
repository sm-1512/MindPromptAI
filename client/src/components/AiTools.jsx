import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="relative px-4 sm:px-20 xl:px-32 py-24">
      {/* Matching Hero-style background */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-pink-300/10 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
          Powerful AI Tools
        </h2>
        <p className="text-gray-600 mt-4 text-base sm:text-lg">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      {/* Cards - matching hero feel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white/70 shadow-md border border-gray-100 hover:border-primary/30
            hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            onClick={() => user && navigate(tool.path)}
          >
            {/* Icon - same rounded style as hero buttons */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-xl shadow-sm group-hover:scale-105 transition-all duration-300"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-7 h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">
              {tool.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AiTools;
