import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [targetIndustry, setTargetIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");


  const { getToken } = useAuth();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);
      formData.append("targetRole", targetRole);
      formData.append("targetIndustry", targetIndustry);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
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
    <div className="h-full p-6 bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100 text-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-sky-600" />
            <h1 className="text-xl font-semibold text-sky-700">
              Resume Review
            </h1>
          </div>

          <label className="mt-2 text-sm font-medium text-slate-700">
            Upload Resume
          </label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-slate-300 text-slate-600 focus:ring-2 focus:ring-sky-400 focus:outline-none"
            required
          />

          <p className="mt-2 text-sm text-slate-500">
            Supported format: PDF. Upload your resume for review.
          </p>

          <label className="mt-2 text-sm font-medium text-slate-700">
            Target Role
          </label>
          <input
            onChange={(e) => setTargetRole(e.target.value)}
            type="text"
            value={targetRole}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="e.g., Software Engineer"
            required
          />

          <label className="mt-2 text-sm font-medium text-slate-700">
            Target Industry
          </label>
          <input
            onChange={(e) => setTargetIndustry(e.target.value)}
            type="text"
            value={targetIndustry}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
            placeholder="e.g., Technology"
            required
          />

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-sky-500 to-cyan-600 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <FileText className="w-5 h-5" />
            )}
            Review Resume
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition h-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <FileText className="w-5 h-5 text-cyan-600" />
            <h1 className="text-xl font-semibold text-sky-700">Results</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-slate-400 text-center overflow-hidden">
              <FileText className="w-10 h-10 mb-3 text-slate-400" />
              <p className="text-sm max-w-sm">
                Upload a PDF to review your resume.
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

export default ReviewResume;
