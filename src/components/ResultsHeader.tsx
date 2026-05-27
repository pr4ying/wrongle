import React from "react";
import { Search, Moon, Sun, ShieldAlert, Image as ImageIcon, Video as VideoIcon, ShoppingBag } from "lucide-react";

interface ResultsHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  handleBackHome: () => void;
  setShowReporter: (show: boolean) => void;
  activeTab: "all" | "images" | "videos" | "shopping";
  setActiveTab: (tab: "all" | "images" | "videos" | "shopping") => void;
}

export default function ResultsHeader({
  darkMode,
  toggleDarkMode,
  query,
  setQuery,
  handleSearch,
  handleBackHome,
  setShowReporter,
  activeTab,
  setActiveTab
}: ResultsHeaderProps) {
  return (
    <>
      {/* Header Controls */}
      <header className={`flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b sticky top-0 z-10 gap-4 ${
        darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100"
      }`}>
        <div className="flex flex-grow items-center space-x-6">
          {/* Mini Logo */}
          <button
            onClick={handleBackHome}
            className="text-2xl font-extrabold tracking-tighter hover:scale-105 transition-transform cursor-pointer font-display"
          >
            <span className="text-blue-500">W</span>
            <span className="text-red-500">r</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">n</span>
            <span className="text-green-400">g</span>
            <span className="text-red-500">l</span>
            <span className="text-blue-500">e</span>
          </button>

          {/* Input field wrapper */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex-grow max-w-[620px]"
          >
            <div className={`flex items-center border shadow-xs hover:shadow-sm focus-within:shadow-md rounded-full px-4 py-2 w-full transition-all ${
              darkMode
                ? "bg-slate-900 border-slate-700 focus-within:border-slate-500"
                : "bg-white border-slate-200 focus-within:border-slate-300"
            }`}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`flex-grow outline-none text-sm bg-transparent ${
                  darkMode ? "text-slate-100" : "text-slate-800"
                }`}
              />
              <div className="flex items-center space-x-1.5">
                <button
                  type="submit"
                  title="Initiate Misinformation Search"
                  className={`p-1 cursor-pointer ${
                    darkMode ? "text-slate-400 hover:text-blue-400" : "text-slate-400 hover:text-blue-500"
                  }`}
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className={`p-1 cursor-pointer ${
                    darkMode ? "text-slate-400 hover:text-yellow-400" : "text-slate-400 hover:text-indigo-600"
                  }`}
                  title={darkMode ? "Light Mode" : "Dark Mode"}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick stats & custom report helper */}
        <div className="flex items-center space-x-3 text-sm text-slate-500 shrink-0">
          <button
            type="button"
            onClick={() => setShowReporter(true)}
            className={`px-3 py-1.5 text-xs border rounded-full font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
              darkMode
                ? "bg-red-950/50 hover:bg-red-900/50 text-red-400 border-red-900"
                : "bg-red-50 hover:bg-red-100/80 text-red-600 border-red-100"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Found something accurate? Report it!</span>
          </button>
        </div>
      </header>

      {/* Search Filter Tabs */}
      <nav className={`border-b px-6 md:px-24 flex space-x-8 text-sm overflow-x-auto select-none ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-500"
      }`}>
        <button
          onClick={() => setActiveTab("all")}
          className={`py-3.5 border-b-2 font-medium flex items-center transition-colors cursor-pointer ${
            activeTab === "all"
              ? "border-blue-500 text-blue-600"
              : darkMode
                ? "border-transparent hover:text-slate-200"
                : "border-transparent hover:text-slate-800"
          }`}
        >
          <Search className="w-4 h-4 mr-1.5" />
          All Results
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`py-3.5 border-b-2 font-medium flex items-center transition-colors cursor-pointer ${
            activeTab === "images"
              ? "border-blue-500 text-blue-600"
              : darkMode
                ? "border-transparent hover:text-slate-200"
                : "border-transparent hover:text-slate-800"
          }`}
        >
          <ImageIcon className="w-4 h-4 mr-1.5" />
          Helpful Images
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`py-3.5 border-b-2 font-medium flex items-center transition-colors cursor-pointer ${
            activeTab === "videos"
              ? "border-blue-500 text-blue-600"
              : darkMode
                ? "border-transparent hover:text-slate-200"
                : "border-transparent hover:text-slate-800"
          }`}
        >
          <VideoIcon className="w-4 h-4 mr-1.5" />
          Relevant Videos
        </button>
        <button
          onClick={() => setActiveTab("shopping")}
          className={`py-3.5 border-b-2 font-medium flex items-center transition-colors cursor-pointer ${
            activeTab === "shopping"
              ? "border-blue-500 text-blue-600"
              : darkMode
                ? "border-transparent hover:text-slate-200"
                : "border-transparent hover:text-slate-800"
          }`}
        >
          <ShoppingBag className="w-4 h-4 mr-1.5" />
          Legit Shopping
        </button>
      </nav>
    </>
  );
}
