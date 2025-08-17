import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;
      const { data } = await axios.post("/api/ai/generate-blog-title",{ prompt },{ headers: { Authorization: `Bearer ${await getToken()}` } });

      if(data.success){
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-6 bg-gray-50 text-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-teal-600" />
            <h1 className="text-xl font-semibold">AI Title Generator</h1>
          </div>

          <label className="mt-2 text-sm font-medium">Keyword</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="The future of artificial intelligence is..."
            required
          />

          <label className="mt-5 text-sm font-medium">Category</label>
          <div className="mt-3 flex flex-wrap gap-3">
            {blogCategories.map((item) => (
              <span
                onClick={() => setSelectedCategory(item)}
                key={item}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
                  selectedCategory === item
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Hash className="w-5 h-5" />
            )}
            Generate Title
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-4">
            <Hash className="w-5 h-5 text-teal-600" />
            <h1 className="text-xl font-semibold">Generated Titles</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center">
              <Hash className="w-10 h-10 mb-3" />
              <p className="text-sm max-w-sm">
                Enter a topic and click <b>“Generate Title”</b> to get started
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogTitles;
