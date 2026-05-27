/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { RefreshCw, TriangleAlert as AlertTriangle } from "lucide-react";
import { SearchResponse } from "./types";
import { SUGGESTED_QUERIES, HUMOROUS_FEEDBACK_REPLIES } from "./constants";
import LandingScreen from "./components/LandingScreen";
import ResultsHeader from "./components/ResultsHeader";
import AllTabContent, { KnowledgePanel } from "./components/AllTabContent";
import { ImagesTabContent, VideosTabContent, ShoppingTabContent } from "./components/MediaTabs";
import ReportModal from "./components/ReportModal";
import InfoModal from "./components/InfoModal";
import Footer from "./components/Footer";

export default function App() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos" | "shopping">("all");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showReporter, setShowReporter] = useState(false);
  const [reportedReason, setReportedReason] = useState("");
  const [reportedLink, setReportedLink] = useState("");
  const [reportingSuccess, setReportingSuccess] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // About & Compliance multi-tab modal state
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTab, setInfoTab] = useState<"readme" | "help" | "feedback" | "privacy" | "terms">("readme");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [localFeedbackList, setLocalFeedbackList] = useState<{id: string, email: string, text: string, response: string, date: string}[]>([]);

  // Shuffle and choose 8 random prompts
  const shufflePrompts = () => {
    const shuffled = [...SUGGESTED_QUERIES].sort(() => 0.5 - Math.random());
    setSuggestedPrompts(shuffled.slice(0, 8));
  };

  // Load history from localStorage and randomize suggested search prompts
  useEffect(() => {
    shufflePrompts();

    const saved = localStorage.getItem("wrongle_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }

    const savedFeedback = localStorage.getItem("wrongle_feedback");
    if (savedFeedback) {
      try {
        setLocalFeedbackList(JSON.parse(savedFeedback));
      } catch (e) {
        // ignore
      }
    }

    // Load dark mode preference
    const savedDarkMode = localStorage.getItem("wrongle_dark_mode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("wrongle_dark_mode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = HUMOROUS_FEEDBACK_REPLIES[Math.floor(Math.random() * HUMOROUS_FEEDBACK_REPLIES.length)];
    
    const newFeedback = {
      id: String(Date.now()),
      email: feedbackEmail,
      text: feedbackText,
      response,
      date: new Date().toLocaleDateString("en-US", { hour: '2-digit', minute: '2-digit' })
    };

    const updatedList = [newFeedback, ...localFeedbackList].slice(0, 5);
    setLocalFeedbackList(updatedList);
    localStorage.setItem("wrongle_feedback", JSON.stringify(updatedList));
    
    setFeedbackSubmitted(true);
    setFeedbackText("");
  };

  const saveToHistory = (q: string) => {
    const cleaned = q.trim();
    if (!cleaned) return;
    const filtered = history.filter((item) => item.toLowerCase() !== cleaned.toLowerCase());
    const updated = [cleaned, ...filtered].slice(0, 8);
    setHistory(updated);
    localStorage.setItem("wrongle_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("wrongle_history");
  };

  const handleSearch = async (searchQuery: string) => {
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) return;

    setQuery(cleanQuery);
    setLoading(true);
    setHasSearched(true);
    setErrorNotice(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: cleanQuery }),
      });

      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      const data: SearchResponse = await response.json();
      setSearchResult(data);
      saveToHistory(cleanQuery);
    } catch (err: any) {
      console.error("Search error:", err);
      setErrorNotice("The search transmission was hijacked by high-altitude pigeons. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFeelingUnlucky = () => {
    const rand = SUGGESTED_QUERIES[Math.floor(Math.random() * SUGGESTED_QUERIES.length)];
    handleSearch(rand);
  };

  const handleBackHome = () => {
    setHasSearched(false);
    setSearchResult(null);
    setQuery("");
    setActiveTab("all");
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportingSuccess(true);
    setTimeout(() => {
      setShowReporter(false);
      setReportingSuccess(false);
      setReportedReason("");
      setReportedLink("");
      alert("System Action Completed: Our compliance department has successfully replaced that accurate data point with a higher-quality falsehood.");
    }, 2000);
  };

  return (
    <div id="app-container" className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
      darkMode
        ? "bg-slate-950 text-slate-100"
        : "bg-white text-slate-800"
    }`}>
      
      {/* 1. INITIAL LANDING SCREEN */}
      {!hasSearched && (
        <LandingScreen
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          triggerFeelingUnlucky={triggerFeelingUnlucky}
          suggestedPrompts={suggestedPrompts}
          shufflePrompts={shufflePrompts}
          history={history}
          clearHistory={clearHistory}
        />
      )}

      {/* 2. RESULTS VIEW PANEL */}
      {hasSearched && (
        <div className="flex-grow flex flex-col">
          <ResultsHeader
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
            handleBackHome={handleBackHome}
            setShowReporter={setShowReporter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Core Content Body */}
          <main className={`flex-grow pb-16 ${darkMode ? "bg-slate-900/30" : "bg-slate-50/50"}`}>
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8">
              
              {/* LEFT SIDE: Main content */}
              <div className="w-full lg:w-[65%] flex flex-col space-y-6">
                
                {/* Loader State */}
                {loading && (
                  <div className={`flex flex-col items-center justify-center py-20 px-4 border rounded-xl shadow-2xs ${
                    darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  }`}>
                    <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-4 stroke-[2.5]" />
                    <h3 className={`text-lg font-medium ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                      Scrambling Search Indices...
                    </h3>
                    <p className={`text-sm text-center max-w-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      Our algorithms are working hard to guarantee all factual data is successfully removed before presentation.
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {errorNotice && !loading && (
                  <div className={`p-5 border rounded-xl flex items-start space-x-3 ${
                    darkMode ? "bg-rose-950/50 border-rose-900 text-rose-300" : "bg-rose-50 border-rose-100 text-rose-800"
                  }`}>
                    <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${darkMode ? "text-rose-400" : "text-rose-500"}`} />
                    <div>
                      <h4 className="font-semibold text-sm">Satirical Network Collision</h4>
                      <p className={`text-xs leading-relaxed mt-1 ${darkMode ? "text-rose-400" : "text-rose-600"}`}>{errorNotice}</p>
                    </div>
                  </div>
                )}

                {/* Main results container */}
                {!loading && !errorNotice && searchResult && (
                  <div className="space-y-6">
                    {/* Meta statistics text */}
                    <div className={`text-xs font-medium tracking-wide ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      About 4,194,500,000 completely erroneous results (0.0003 seconds) — <span className="text-green-600 font-semibold uppercase">Relevance Index: -Inf%</span>
                    </div>

                    {/* Absurd suggestion card */}
                    {searchResult.didYouMean && (
                      <div className={`text-sm p-3.5 rounded-lg flex items-center space-x-2 ${
                        darkMode ? "text-slate-300 bg-amber-950/30 border border-amber-900/40" : "text-slate-600 bg-amber-50/30 border border-amber-100/40"
                      }`}>
                        <span className="text-red-500 font-semibold italic">Did you mean:</span>
                        <button
                          onClick={() => handleSearch(searchResult.didYouMean || "")}
                          className={`font-medium hover:underline border-none bg-transparent cursor-pointer ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {searchResult.didYouMean}
                        </button>
                      </div>
                    )}

                    {/* Tab Content */}
                    {activeTab === "all" && (
                      <AllTabContent darkMode={darkMode} searchResult={searchResult} handleSearch={handleSearch} />
                    )}
                    {activeTab === "images" && (
                      <ImagesTabContent darkMode={darkMode} query={searchResult.query} />
                    )}
                    {activeTab === "videos" && (
                      <VideosTabContent darkMode={darkMode} query={searchResult.query} />
                    )}
                    {activeTab === "shopping" && (
                      <ShoppingTabContent darkMode={darkMode} />
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Sidebar */}
              <div className="w-full lg:w-[35%]">
                <blockquote className={`p-4 border-l-4 rounded text-xs italic mb-5 leading-normal ${
                  darkMode ? "bg-slate-900 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
                }`}>
                  &quot;The internet is full of true, boring statements. This space serves to restore equilibrium with beautifully structured, pristine fiction.&quot;
                </blockquote>

                {!loading && searchResult && (
                  <KnowledgePanel darkMode={darkMode} searchResult={searchResult} />
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* 3. REPORT MODAL */}
      <ReportModal
        darkMode={darkMode}
        showReporter={showReporter}
        setShowReporter={setShowReporter}
        reportedReason={reportedReason}
        setReportedReason={setReportedReason}
        reportedLink={reportedLink}
        setReportedLink={setReportedLink}
        reportingSuccess={reportingSuccess}
        handleReportSubmit={handleReportSubmit}
      />

      {/* 4. FOOTER */}
      <Footer darkMode={darkMode} setInfoTab={setInfoTab} setShowInfoModal={setShowInfoModal} />

      {/* 5. INFO MODAL */}
      <InfoModal
        darkMode={darkMode}
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        infoTab={infoTab}
        setInfoTab={setInfoTab}
        feedbackEmail={feedbackEmail}
        setFeedbackEmail={setFeedbackEmail}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        feedbackSubmitted={feedbackSubmitted}
        setFeedbackSubmitted={setFeedbackSubmitted}
        handleFeedbackSubmit={handleFeedbackSubmit}
        localFeedbackList={localFeedbackList}
      />
    </div>
  );
}
