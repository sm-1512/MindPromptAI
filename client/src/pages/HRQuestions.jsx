import { FileQuestion, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const HRQuestions = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/hr-questions", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full p-6 bg-gradient-to-br from-zinc-100 via-red-50 to-zinc-200 text-zinc-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-zinc-300 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-red-700" />
            <h1 className="text-xl font-semibold text-red-800">
              Generate HR Interview Questions
            </h1>
          </div>

          <label className="mt-2 text-sm font-medium text-zinc-700">
            Upload Resume (PDF)
          </label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-zinc-300 text-zinc-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          <p className="mt-2 text-sm text-zinc-500">
            We’ll generate people-ops & behavioral questions tailored to your
            resume.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-red-700 to-zinc-700 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <FileQuestion className="w-5 h-5" />
            )}
            Generate HR Questions
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-zinc-300 shadow-md hover:shadow-lg transition h-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <FileQuestion className="w-5 h-5 text-red-600" />
            <h1 className="text-xl font-semibold text-red-800">Results</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-zinc-400 text-center overflow-hidden">
              <FileQuestion className="w-10 h-10 mb-3 text-zinc-400" />
              <p className="text-sm max-w-sm">
                Upload your PDF resume to generate tailored HR/behavioral
                questions.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-zinc-700">
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

export default HRQuestions;
