import { FileQuestion, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const InterviewQuestions = () => {
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

      const { data } = await axios.post(
        "/api/ai/interview-questions",
        formData,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

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
    <div className="h-full p-6 bg-gradient-to-br from-stone-100 via-rose-50 to-stone-200 text-stone-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-stone-300 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-rose-700" />
            <h1 className="text-xl font-semibold text-rose-800">
              Generate Interview Questions
            </h1>
          </div>

          <label className="mt-2 text-sm font-medium text-stone-700">
            Upload Resume
          </label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-stone-300 text-stone-600 focus:ring-2 focus:ring-rose-400 focus:outline-none"
            required
          />

          <p className="mt-2 text-sm text-stone-500">
            Supported format: PDF. Upload your resume to generate interview
            questions.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-rose-700 to-stone-600 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <FileQuestion className="w-5 h-5" />
            )}
            Generate Questions
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-stone-300 shadow-md hover:shadow-lg transition h-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <FileQuestion className="w-5 h-5 text-rose-600" />
            <h1 className="text-xl font-semibold text-rose-800">Results</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-stone-400 text-center overflow-hidden">
              <FileQuestion className="w-10 h-10 mb-3 text-stone-400" />
              <p className="text-sm max-w-sm">
                Upload a PDF resume to generate project-specific interview
                questions.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-stone-700">
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

export default InterviewQuestions;
