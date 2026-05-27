import React from "react";
import { Search, ArrowRight, Clock, RefreshCw, X, Moon, Sun, TrendingUp } from "lucide-react";
import { SUGGESTED_QUERIES } from "../constants";

interface LandingScreenProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  triggerFeelingUnlucky: () => void;
  suggestedPrompts: string[];
  shufflePrompts: () => void;
  history: string[];
  clearHistory: () => void;
}

export default function LandingScreen({
  darkMode,
  toggleDarkMode,
  query,
  setQuery,
  handleSearch,
  triggerFeelingUnlucky,
  suggestedPrompts,
  shufflePrompts,
  history,
  clearHistory
}: LandingScreenProps) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full pt-16 pb-24">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-2.5 rounded-full transition-all duration-300 shadow-md ${
            darkMode
              ? "bg-slate-800 text-yellow-400 hover:bg-slate-700 border border-slate-600"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Central Branded Logo */}
      <div className="text-center mb-10 pt-4 sm:pt-10">
        <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter select-none font-display">
          <span className="text-blue-500">W</span>
          <span className="text-red-500">r</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">n</span>
          <span className="text-green-400">g</span>
          <span className="text-red-500">l</span>
          <span className="text-blue-500">e</span>
        </h1>
        <p className={`text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-tight mt-6 select-none max-w-2xl mx-auto leading-snug ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}>
          The World&apos;s Most Inaccurate, Highly Confident Search Engine.
        </p>
      </div>

      {/* Search Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="w-full mb-8"
      >
        <div className={`relative flex items-center border rounded-full py-4.5 px-6 shadow-sm hover:shadow-md focus-within:shadow-md transition-all ${
          darkMode
            ? "bg-slate-900 border-slate-700 focus-within:border-slate-500"
            : "bg-white border-slate-200 focus-within:border-slate-300"
        }`}>
          <Search className={`w-5 h-5 mr-3.5 stroke-[2.2] ${darkMode ? "text-slate-400" : "text-slate-400"}`} />
          <input
            type="text"
            placeholder="Ask me anything, guaranteed to be wrong..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full outline-none text-base bg-transparent ${
              darkMode
                ? "text-slate-100 placeholder-slate-500"
                : "text-slate-800 placeholder-slate-400"
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className={`p-1 rounded-full transition-colors mr-2 animate-fade-in ${
                darkMode
                  ? "hover:bg-slate-800 text-slate-400 hover:text-slate-300"
                  : "hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={!query}
            className={`p-1.5 rounded-full transition-all ${
              query
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : darkMode
                  ? "text-slate-600 pointer-events-none"
                  : "text-slate-300 pointer-events-none"
            }`}
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3 mt-4">
          <button
            type="submit"
            disabled={!query}
            className={`px-6 py-2.5 border rounded-full text-sm font-medium transition-colors shadow-2xs cursor-pointer ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200 hover:text-slate-800"
            }`}
          >
            Wrongle Search
          </button>
          <button
            type="button"
            onClick={triggerFeelingUnlucky}
            className={`px-6 py-2.5 border rounded-full text-sm font-medium transition-colors shadow-2xs flex items-center space-x-2 cursor-pointer ${
              darkMode
                ? "bg-rose-950 border-rose-900 text-rose-400 hover:bg-rose-900/50 hover:border-rose-800"
                : "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100/90 hover:border-rose-200"
            }`}
          >
            <span>I&apos;m Feeling Unlucky</span>
          </button>
        </div>
      </form>

      {/* Suggestions Pill Grid */}
      <div className="w-full mt-2">
        <div className={`flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-3 ${
          darkMode ? "text-slate-500" : "text-slate-400"
        }`}>
          <span className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span>Most-Searched Today</span>
          </span>
          <button
            type="button"
            onClick={shufflePrompts}
            className={`flex items-center space-x-1 text-[10px] transition-colors font-bold cursor-pointer ${
              darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
            }`}
            title="Shuffle Suggestions"
          >
            <RefreshCw className="w-3 h-3 animate-spin-hover" />
            <span>Shuffle Prompts</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(suggestedPrompts.length > 0 ? suggestedPrompts : SUGGESTED_QUERIES.slice(0, 8)).map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(item)}
              className={`text-xs text-left border rounded-xl px-4 py-2.5 transition-all font-medium cursor-pointer shadow-3xs truncate flex justify-between items-center group ${
                darkMode
                  ? "bg-slate-900 border-slate-800 hover:border-indigo-700 hover:bg-slate-800/50 hover:text-indigo-400 text-slate-300"
                  : "bg-slate-50 border-slate-100 hover:border-indigo-150 hover:bg-slate-100/50 hover:text-indigo-700 text-slate-700"
              }`}
            >
              <span className="truncate">{item}</span>
              <ArrowRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1 ${
                darkMode ? "text-slate-500" : "text-slate-350"
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Search History Panel */}
      {history.length > 0 && (
        <div className={`w-full mt-8 pt-6 border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
          <div className={`flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-3 ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Your Search History</span>
            </span>
            <button
              onClick={clearHistory}
              className="text-[10px] hover:text-red-500 tracking-wider normal-case font-semibold cursor-pointer"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(q)}
                className={`text-xs border rounded-lg px-3 py-1.5 transition-colors flex items-center space-x-1 ${
                  darkMode
                    ? "text-slate-400 bg-slate-900 border-slate-800 hover:bg-slate-800"
                    : "text-slate-500 bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
