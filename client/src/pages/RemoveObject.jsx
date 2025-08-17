import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (object.split(" ").length > 1) {
      return toast("Please enter only one object name");
    }

    const formData = new FormData();
    formData.append("image", input);
    formData.append("object", object);

    try {
      const { data } = await axios.post("/api/ai/remove-image-object", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`}});

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-lime-50 text-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Panel */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h1 className="text-xl font-semibold text-pink-600">
              Object Removal
            </h1>
          </div>

          <label className="text-sm font-medium text-slate-700 mb-1">
            Upload Image
          </label>

          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-3 text-sm rounded-xl border border-gray-300 text-gray-600 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
            required
          />
          <p className="mt-4 text-xs text-gray-500">
            Supported formats: JPG, PNG. Upload an image to remove an object.
          </p>

          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={4}
            className="w-full p-3 mt-4 outline-none text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
            placeholder="e.g., watch or spoon (only one object)"
            required
          />

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Scissors className="w-5 h-5" />
            )}
            Remove Object
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
          <div className="flex items-center gap-3 mb-6">
            <Scissors className="w-5 h-5 text-pink-500" />
            <h1 className="text-xl font-semibold text-pink-600">
              Processed Image
            </h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center">
              <Scissors className="w-10 h-10 mb-3 text-gray-400" />
              <p className="text-sm max-w-sm">
                Upload an image and remove an object to see the processed
                result.
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-700">
              <img
                src={content}
                alt="Generated Image"
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
