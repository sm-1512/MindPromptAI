import { Image, Sparkles } from 'lucide-react';
import React, {useState} from 'react'

const GenerateImages = () => {

  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
            <h1 className="text-xl font-semibold">AI Image Generator</h1>
          </div>

          <label className="mt-2 text-sm font-medium">
            Describe Your Image
          </label>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            className="w-full p-3 mt-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe what you what to see"
            required
          />

          <label className="mt-5 text-sm font-medium">Style</label>
          <div className="mt-3 flex flex-wrap gap-3">
            {imageStyle.map((item) => (
              <span
                onClick={() => setSelectedStyle(item)}
                key={item}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
                  selectedStyle === item
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="my-6 flex items-center gap-2">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />

              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>

              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
            </label>
            <p className="text-sm">Make this image Public</p>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 mt-8 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
              <Image className="w-5 h-5" />
            )}
            Generate Image
          </button>
        </form>

        {/* Right Panel */}
        <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 shadow-sm h-full">
          <div className="flex items-center gap-3 mb-4">
            <Image className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-semibold">Generated Images</h1>
          </div>

          {!content ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-400 text-center">
              <Image className="w-10 h-10 mb-3" />
              <p className="text-sm max-w-sm">
                Enter a topic and click <b>“Generate Image”</b> to get started
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
}

export default GenerateImages