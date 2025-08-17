import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CoverLetterGenerator = () => {
  const [input, setInput] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", input);
      formData.append("jobDescription", jobDescription);
      formData.append("companyName", companyName);
      formData.append("jobTitle", jobTitle);

      const { data } = await axios.post("/api/ai/cover-letter", formData, {
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
    <div className="h-full p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-black" />
            <h1 className="text-xl font-semibold text-black">
              Cover Letter Generator
            </h1>
          </div>

          {/* Resume Upload */}
          <label className="mt-2 text-sm font-medium text-gray-800">
            Upload Resume
          </label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-400 text-gray-700 focus:ring-2 focus:ring-black focus:outline-none"
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Supported format: PDF. Upload your resume for generating a tailored
            cover letter.
          </p>

          <label className="mt-2 text-sm font-medium text-gray-800">
            Company Name
          </label>
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            value={companyName}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-400 text-gray-700"
            placeholder="e.g., Tech Corp"
            required
          />

          <label className="mt-2 text-sm font-medium text-gray-800">
            Job Title
          </label>
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            type="text"
            value={jobTitle}
            className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-400 text-gray-700"
            placeholder="e.g., Software Engineer"
            required
          />

          {/* Job Description */}
          <label className="mt-4 text-sm font-medium text-gray-800">
            Job Description
          </label>
          <textarea
            onChange={(e) => setJobDescription(e.target.value)}
            value={jobDescription}
            rows={6}
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-400 text-gray-700 focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Paste the job description here..."
            required
          />

          {/* Button */}
          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-black hover:bg-gray-800 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <FileText className="w-5 h-5" />
            )}
            Generate Cover Letter
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition h-full overflow-hidden">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <FileText className="w-5 h-5 text-black" />
            <h1 className="text-xl font-semibold text-black">
              Generated Cover Letter
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center overflow-hidden">
              <FileText className="w-10 h-10 mb-3 text-gray-400" />
              <p className="text-sm max-w-sm">
                Upload your resume & paste a job description to generate a cover
                letter.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-gray-800">
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

export default CoverLetterGenerator;
