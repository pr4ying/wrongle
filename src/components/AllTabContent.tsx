import React from "react";
import { RefreshCw, TriangleAlert as AlertTriangle, ExternalLink, Sparkles, Info, TrendingUp, ChevronRight, MapPin } from "lucide-react";
import { SearchResponse } from "../types";
import { formatAnswerHighlight } from "../utils";
import { MAP_WIDGET_IMAGES } from "../constants";

interface AllTabContentProps {
  darkMode: boolean;
  searchResult: SearchResponse;
  handleSearch: (query: string) => void;
}

export default function AllTabContent({ darkMode, searchResult, handleSearch }: AllTabContentProps) {
  return (
    <div className="space-y-6">
      {/* THE AUTHORITATIVE ABSURD ANSWER BOX */}
      <div className={`p-6 md:p-8 border rounded-2xl shadow-sm space-y-4 relative overflow-hidden transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-tr from-violet-950/50 via-indigo-950/60 to-slate-900/40 border-violet-900"
          : "bg-gradient-to-tr from-[#f3f0ff]/50 via-[#ecf2ff]/60 to-[#fdf2f8]/40 border-violet-100"
      }`}>
        {/* AI Overview Header */}
        <div className="flex items-center space-x-2.5 text-indigo-400 select-none pb-1">
          <div className="bg-linear-to-tr from-violet-600 to-indigo-600 rounded-full p-1.5 text-white shadow-xs">
            <Sparkles className="w-4 h-4 animate-pulse fill-indigo-200" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent tracking-tight font-display">
            AI Satirical Overview
          </span>
        </div>

        {/* Direct answer */}
        <p className={`text-[17px] md:text-lg leading-relaxed font-sans font-medium italic ${
          darkMode ? "text-slate-100" : "text-slate-900"
        }`}>
          {formatAnswerHighlight({ text: searchResult.directAnswer, query: searchResult.query, isDarkMode: darkMode })}
        </p>

        <div className={`pt-3 text-[10px] font-mono flex items-center space-x-1 border-t ${
          darkMode ? "text-slate-500 border-slate-700/50" : "text-slate-400/80 border-slate-200/50"
        }`}>
          <Info className={`w-3.5 h-3.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
          <span>This response has been generated with 100% simulated credibility using the Wrongle Satire Core.</span>
        </div>
      </div>

      {/* UNRELATED SPONSORED ADVERTISEMENT */}
      {searchResult.unrelatedAd && (
        <div className={`p-5 border-2 border-dashed rounded-xl space-y-3 relative overflow-hidden ${
          darkMode ? "bg-yellow-950/30 border-amber-800" : "bg-yellow-50/40 border-amber-200"
        }`}>
          <div className={`absolute top-0 right-0 text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider ${
            darkMode ? "bg-amber-900 text-amber-200" : "bg-amber-200 text-amber-800"
          }`}>
            Irrelevant Sponsor
          </div>
          <div>
            <div className={`text-xs flex items-center space-x-1.5 font-semibold ${
              darkMode ? "text-amber-500" : "text-amber-600"
            }`}>
              <span>{searchResult.unrelatedAd.url || "https://www.totally-unrelated.example"}</span>
            </div>
            <h4 className={`text-base font-semibold mt-1 cursor-pointer hover:underline ${
              darkMode ? "text-slate-100 hover:text-blue-400" : "text-slate-900 hover:text-blue-800"
            }`}>
              {searchResult.unrelatedAd.title}
            </h4>
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {searchResult.unrelatedAd.description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className={`text-[10px] italic ${darkMode ? "text-amber-500" : "text-amber-600"}`}>
              ★ Paid for in bubblegum tokens
            </span>
            <button
              onClick={() => alert(`Redirecting to our useless sponsor page at: ${searchResult.unrelatedAd?.url}. Please ensure your snail is fully polished first.`)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                darkMode
                  ? "bg-amber-900 hover:bg-amber-800 text-amber-200"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-800"
              }`}
            >
              {searchResult.unrelatedAd.cta || "Apply Now"}
            </button>
          </div>
        </div>
      )}

      {/* ORGANIC SEARCH RESULTS */}
      <div className={`border rounded-xl p-5 md:p-6 space-y-8 shadow-2xs ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80"
      }`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider border-b pb-3 ${
          darkMode ? "text-slate-500 border-slate-800" : "text-slate-400 border-slate-100"
        }`}>
          Organic Highly Distant Search Matches
        </h3>

        {searchResult.results && searchResult.results.length > 0 ? (
          <div className={`divide-y space-y-6 ${darkMode ? "divide-slate-800" : "divide-slate-100"}`}>
            {searchResult.results.map((item, idx) => (
              <article
                key={idx}
                className={`flex flex-col ${idx > 0 ? "pt-6" : ""}`}
              >
                {/* URL Badge with relevance indicator */}
                <div className={`flex items-center space-x-2 text-xs mb-1.5 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  <span className={`font-mono px-2 py-0.5 rounded text-[10px] truncate max-w-[240px] ${
                    darkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.url}
                  </span>
                  <span className={`font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                    darkMode ? "text-emerald-400 bg-emerald-900/50" : "text-emerald-500 bg-emerald-50"
                  }`}>
                    Match Score: {item.relevanceScore}
                  </span>
                </div>

                {/* Title Link */}
                <h4 className="text-lg text-blue-500 hover:text-blue-400 hover:underline cursor-pointer font-sans leading-snug">
                  <a
                    href="#external"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`You attempted to access a highly inappropriate external resource: ${item.url}\n\nOur system safety protocols blocked the request because it was calculated to contain too many actual vegetables.`);
                    }}
                    className="flex items-center"
                  >
                    {item.title}
                    <ExternalLink className={`w-3 h-3 ml-1.5 inline shrink-0 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
                  </a>
                </h4>

                {/* Description */}
                <p className={`text-sm leading-relaxed mt-1.5 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className={`text-center py-10 italic ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Wow, no results found. Even of the incorrect variety.
          </div>
        )}
      </div>

      {/* RELATED SEARCHES LIST */}
      {searchResult.relatedSearches && searchResult.relatedSearches.length > 0 && (
        <div className={`border rounded-xl p-5 shadow-2xs space-y-3 ${
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        }`}>
          <h4 className={`text-xs uppercase tracking-wider font-bold flex items-center ${
            darkMode ? "text-slate-500" : "text-slate-400"
          }`}>
            <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
            Users also queried other ungrounded topics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {searchResult.relatedSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handleSearch(term)}
                className={`text-left text-sm p-2.5 rounded-lg border transition-colors flex items-center justify-between cursor-pointer group ${
                  darkMode
                    ? "text-slate-300 bg-slate-800 hover:bg-blue-900/50 hover:text-blue-400 border-slate-700"
                    : "text-slate-700 bg-slate-50 hover:bg-blue-50/50 hover:text-blue-700 border-slate-100"
                }`}
              >
                <span className="truncate">{term}</span>
                <ChevronRight className={`w-4 h-4 transition-all ${darkMode ? "text-slate-600 group-hover:text-blue-500" : "text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5"}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface KnowledgePanelProps {
  darkMode: boolean;
  searchResult: SearchResponse;
}

export function KnowledgePanel({ darkMode, searchResult }: KnowledgePanelProps) {
  if (!searchResult.knowledgePanel) return null;

  return (
    <aside className="space-y-6">
      <div className={`border rounded-xl p-5 md:p-6 shadow-2xs ${
        darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-2xl font-semibold tracking-tight leading-tight ${
              darkMode ? "text-slate-100" : "text-slate-900"
            }`}>
              {searchResult.knowledgePanel.title}
            </h2>
            <p className={`text-xs mt-1 font-mono uppercase tracking-wider ${
              darkMode ? "text-slate-500" : "text-slate-500"
            }`}>
              {searchResult.knowledgePanel.subtitle}
            </p>
          </div>
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
            darkMode ? "bg-amber-900/50 text-amber-400 border-amber-800" : "bg-amber-100 text-amber-800 border-amber-200"
          }`}>
            Verified Fake
          </span>
        </div>

        {/* Map Image */}
        <div className={`w-full h-44 rounded-lg my-4 flex items-center justify-center overflow-hidden border relative group ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-200"
        }`}>
          <img
            src={MAP_WIDGET_IMAGES[(searchResult ? searchResult.query.length : 0) % MAP_WIDGET_IMAGES.length]}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            referrerPolicy="no-referrer"
            alt="Dynamic Map Visualizer Representation"
          />
          <div className={`absolute inset-0 transition-colors ${darkMode ? "bg-slate-900/20" : "bg-slate-900/10 group-hover:bg-transparent"}`}></div>

          {/* Animated Map Pin */}
          <div className={`absolute z-10 p-2 rounded-full shadow-md animate-bounce border ${
            darkMode ? "bg-slate-800/95 border-slate-700" : "bg-white/95 border-slate-100"
          }`}>
            <MapPin className="w-5 h-5 text-red-500 fill-red-100" />
          </div>

          <div className={`absolute bottom-2 left-2 right-2 flex justify-between text-[9px] font-semibold px-2 py-1 rounded-sm backdrop-blur-xs shadow-2xs select-none border ${
            darkMode ? "text-slate-200 bg-slate-800/85 border-slate-700" : "text-slate-800 bg-white/85 border-slate-100"
          }`}>
            <span>Map: {searchResult?.knowledgePanel?.title || "Fictional Space"}</span>
            <span className="font-mono text-blue-400 font-bold">Altitude: {(searchResult ? searchResult.query.length * 115 : 1200)}m</span>
          </div>
        </div>

        {/* Description */}
        <p className={`text-xs leading-relaxed mb-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
          {searchResult.knowledgePanel.description}
        </p>

        {/* Side Facts Grid */}
        <div className={`border-t pt-4 space-y-2.5 ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
          {searchResult.knowledgePanel.facts && searchResult.knowledgePanel.facts.map((fact, index) => (
            <div key={index} className="flex justify-between text-xs leading-normal">
              <span className={`font-medium ${darkMode ? "text-slate-400" : "text-slate-500"}`}>{fact.label}:</span>
              <span className={`font-semibold text-right max-w-[180px] truncate ${darkMode ? "text-slate-200" : "text-slate-800"}`} title={fact.value}>
                {fact.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
