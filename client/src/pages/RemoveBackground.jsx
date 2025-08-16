import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full p-6 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 text-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-indigo-700">
              Background Removal
            </h1>
          </div>

          <label className="mt-2 text-sm font-medium text-slate-700">
            Upload Image
          </label>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-300 text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />

          <p className="mt-2 text-sm text-gray-500">
            Upload an image to remove its background. Supported formats: JPG,
            PNG.
          </p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Eraser className="w-5 h-5" />
            )}
            Remove Background
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition h-full">
          <div className="flex items-center gap-3 mb-4">
            <Eraser className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl font-semibold text-indigo-700">
              Processed Image
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center">
              <Eraser className="w-10 h-10 mb-3 text-gray-400" />
              <p className="text-sm max-w-sm">
                Upload an image to remove its background.
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

export default RemoveBackground;
