import React, { useState } from "react";
import { Edit, Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const {getToken} = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const {data} = await axios.post('/api/ai/generate-article',{prompt, length: selectedLength.length}, {headers:{Authorization:`Bearer ${await getToken()}`}});

      if(data.success){
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
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
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Article Configuration</h1>
          </div>

          <label className="mt-2 text-sm font-medium">Article Topic</label>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="The future of artificial intelligence is..."
            required
          />

          <label className="mt-5 text-sm font-medium">Article Length</label>
          <div className="mt-3 flex flex-wrap gap-3">
            {articleLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                key={index}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
                  selectedLength.text === item.text
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Edit className="w-5 h-5" />
            )}
            Generate Article
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-sm h-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <Edit className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-semibold">Generated Article</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center overflow-hidden">
              <Edit className="w-10 h-10 mb-3" />
              <p className="text-sm max-w-sm">
                Enter a topic and click <b>“Generate Article”</b> to get started
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

export default WriteArticle;
