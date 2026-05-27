/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowRight,
  Clock,
  Sparkles,
  RefreshCw,
  Frown,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  Image as ImageIcon,
  Video as VideoIcon,
  ShoppingBag,
  X,
  ChevronRight,
  Info,
  ShieldAlert,
  MapPin,
  TrendingUp,
  History,
  ThumbsDown,
  Gift,
  CheckCircle,
  Send
} from "lucide-react";
import { SearchResponse, SearchResultItem } from "./types";

const SUGGESTED_QUERIES = [
  "why is the sky blue",
  "what is a cat",
  "how to build a website",
  "how to sleep while standing",
  "why do birds look at me like that",
  "how to teach physics to a toddler",
  "what happens if I microwave soap",
  "secret ingredient of mayonnaise",
  "how to download more RAM",
  "are whales just big potatoes",
  "history of the unicycle",
  "how to tax-deduct bread crumb collections",
  "why does my plant judge me",
  "is gravity just magnets under the floor",
  "how to explain coffee to a tea leaf",
  "can dogs understand tax laws",
  "why is water wet and is there a dry version",
  "how to win an argument with a microwave",
  "can I use a cabbage as a bicycle helmet",
  "how many teeth does a zipper have",
  "is it safe to high-five a cactus",
  "where do lost socks actually go",
  "why is celery mostly water but crunchy",
  "how to speak fluent hamster",
  "can you train a goldfish to guard a house",
  "how to boil water in a paper cup using solar flares",
  "the ancient mystery of the pencil eraser",
  "what happens if you sneeze on a laptop screen",
  "how to explain modern art to a squirrel",
  "is mayonnaise a valid musical instrument",
  "why does toast always land butter-side down",
  "how to start a business selling cloud shapes",
  "can plants hear me chewing cabbage",
  "history of the third shoe",
  "what is the official currency of dreams",
  "how to paint a blue sky without blue paint",
  "why are onions so emotional",
  "how to make infinite paper airplanes",
  "is my remote control plotting against me",
  "how to build a treehouse for earthworms",
  "can you translate English to Morse code using eyelids",
  "why do cats enjoy sitting inside cardboard squares"
];

const RANDOM_IMAGES = [
  "https://picsum.photos/seed/wrongleimg1/500/400",
  "https://picsum.photos/seed/wrongleimg2/500/400",
  "https://picsum.photos/seed/wrongleimg3/500/400",
  "https://picsum.photos/seed/wrongleimg4/500/400",
  "https://picsum.photos/seed/wrongleimg5/500/400",
  "https://picsum.photos/seed/wrongleimg6/500/400",
  "https://picsum.photos/seed/wrongleimg7/500/400",
  "https://picsum.photos/seed/wrongleimg8/500/400",
  "https://picsum.photos/seed/wrongleimg9/500/400",
  "https://picsum.photos/seed/wrongleimg10/500/400",
  "https://picsum.photos/seed/wrongleimg11/500/400",
  "https://picsum.photos/seed/wrongleimg12/500/400"
];

const VIDEO_THUMBNAILS = [
  "https://picsum.photos/seed/wronglevid1/350/200",
  "https://picsum.photos/seed/wronglevid2/350/200",
  "https://picsum.photos/seed/wronglevid3/350/200",
  "https://picsum.photos/seed/wronglevid4/350/200",
  "https://picsum.photos/seed/wronglevid5/350/200",
  "https://picsum.photos/seed/wronglevid6/350/200"
];

const MAP_WIDGET_IMAGES = [
  "https://picsum.photos/seed/wronglemap1/500/300",
  "https://picsum.photos/seed/wronglemap2/500/300",
  "https://picsum.photos/seed/wronglemap3/500/300",
  "https://picsum.photos/seed/wronglemap4/500/300"
];

const ABSURD_PRODUCTS = [
  { id: 1, title: "Dehydrated Water canister (1 Liter)", price: "$99.99", rating: "4.8", desc: "Just add 1 Liter of fresh water to activate! Guaranteed organic.", imageBg: "bg-blue-100" },
  { id: 2, title: "Pre-cracked Walnuts Monthly Subscription", price: "$49.12 / mo", rating: "1.2", desc: "We mail you walnuts that have already been run over by a tractor. Saves energy.", imageBg: "bg-amber-100" },
  { id: 3, title: "Snail Turtleneck Sweater", price: "$18.50", rating: "4.9", desc: "Keep your garden mollusk warm. 100% synthetic wool, size micro.", imageBg: "bg-purple-100" },
  { id: 4, title: "Portable Black Hole (Gently Used)", price: "$1,450,000", rating: "4.5", desc: "Perfect for cleaning closets. Minor gravity spikes expected. Non-returnable.", imageBg: "bg-slate-900" },
  { id: 5, title: "Inflatable Accordion Simulator (Silent)", price: "$34.99", rating: "3.1", desc: "For public transit musicians who value silence. Heavy vinyl build.", imageBg: "bg-green-100" },
  { id: 6, title: "Inverted Umbrella (For collecting rain)", price: "$29.00", rating: "4.0", desc: "Holds up to 2 gallons. Funnels everything directly down your sleeve.", imageBg: "bg-amber-100" }
];

const ABSURD_VIDEOS = [
  { id: 1, title: "DIY: Paving your driveway with wet sourdough starter", creator: "Grandmaster Barnaby", views: "14B views", duration: "1:44:02", category: "Baking" },
  { id: 2, title: "How I escaped a giant squid using custom-built toaster engines", creator: "Submarine Steve", views: "203 views", duration: "45:12", category: "Adventure" },
  { id: 3, title: "10 Hours of relaxing lawnmower sounds (played backwards on flute)", creator: "The Flute Wizard", views: "8.9M views", duration: "10:00:00", category: "Music" },
  { id: 4, title: "Calibrating your cat's olive oil level - Professional Tutorial", creator: "Ancient Egyptian Tech Support", views: "4.2K views", duration: "12:15", category: "Felines" },
  { id: 5, title: "The secret banking cartel made entirely of Swiss cheese", creator: "Luminous Truth", views: "900M views", duration: "2:10:05", category: "Finance" }
];

// Helper to format direct satirical answer with rich bold and italics
const formatAnswerHighlight = (text: string, query: string) => {
  if (!text) return null;

  // Normalize query words for bolding
  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2)
    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));

  // Check if string contains markdown asterisks
  const hasMarkdown = text.includes("**");
  const segments = hasMarkdown ? text.split(/(\*\*.*?\*\*)/g) : [text];

  return (
    <>
      {segments.map((segment, segmentIdx) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          const content = segment.slice(2, -2);
          return (
            <strong key={segmentIdx} className="font-extrabold text-[#111827] not-italic border-b-2 border-indigo-400 pb-[1.5px] bg-slate-50 px-1 rounded">
              {content}
            </strong>
          );
        }

        // For plain segments (or the whole text if no markdown), split by white spaces
        const words = segment.split(/(\s+)/);
        return (
          <span key={segmentIdx}>
            {words.map((word, wordIdx) => {
              const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
              if (!cleanWord) return word;

              // Match query words
              const isQueryWord = queryWords.some(qw => cleanWord.includes(qw));
              
              // Capitalized proper nouns
              const firstChar = word.trim()[0];
              const isCapitalized = firstChar && firstChar === firstChar.toUpperCase() && !/^\d/.test(firstChar);
              
              // Highlight proper nouns deterministically to avoid flickering on re-renders
              const wordCodeSum = cleanWord.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              const shouldHighlightNoun = isCapitalized && word.length > 3 && (wordCodeSum % 3 === 0);
              
              // Numbers/Stats
              const isNumber = /^\d+/.test(cleanWord);

              if (isQueryWord) {
                return (
                  <strong key={wordIdx} className="font-extrabold text-[#111827] not-italic bg-amber-100/70 border-b-2 border-amber-400 px-0.5 rounded-xs">
                    {word}
                  </strong>
                );
              }

              if (isNumber) {
                return (
                  <strong key={wordIdx} className="font-bold text-indigo-950 not-italic border-b border-indigo-300 pb-[1.5px] bg-indigo-50/20 px-0.5">
                    {word}
                  </strong>
                );
              }

              if (shouldHighlightNoun) {
                return (
                  <strong key={wordIdx} className="font-extrabold text-slate-900 not-italic border-b border-indigo-300 pb-[1px]">
                    {word}
                  </strong>
                );
              }

              return word;
            })}
          </span>
        );
      })}
    </>
  );
};

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
    // General initial shuffle of 8 prompts
    const shuffled = [...SUGGESTED_QUERIES].sort(() => 0.5 - Math.random());
    setSuggestedPrompts(shuffled.slice(0, 8));

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
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const humorousReplies = [
      "We have registered your request. An imaginary representational clerk has been assigned to stand in a corner and contemplate your review for 45 minutes.",
      "Thank you for your feedback. Our automated filters have detected high volumes of common sense in your message. It was swiftly redirected to the compost bin.",
      "Submission logged! We have dispatched a carrier pigeon with a microfiche copy of your review directly to the central archives at the Mariana Trench.",
      "Review filed. To show our gratitude, we have increased your pet snail's imaginary wool production allowance by +14% for this fiscal quarter."
    ];
    const response = humorousReplies[Math.floor(Math.random() * humorousReplies.length)];
    
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
    <div id="app-container" className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between">
      
      {/* 1. INITIAL LANDING SCREEN (Not searched yet) */}
      {!hasSearched && (
        <div className="flex-grow flex flex-col items-center justify-center px-4 max-w-3xl mx-auto w-full pt-16 pb-24">
          
          {/* Central Branded Logo with Clean Typography */}
          <div className="text-center mb-10 pt-4 sm:pt-10">
            <h1 className="text-7xl sm:text-8xl font-bold tracking-tighter select-none font-display">
              <span className="text-blue-500">W</span>
              <span className="text-red-500">r</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">n</span>
              <span className="text-green-500">g</span>
              <span className="text-red-500">l</span>
              <span className="text-blue-500">e</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-tight text-slate-600 mt-6 select-none max-w-2xl mx-auto leading-snug">
              The World's Most Inaccurate, Highly Confident Search Engine.
            </p>
          </div>

          {/* Clean Minimalism Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="w-full mb-8"
          >
            <div className="relative flex items-center bg-white border border-slate-200 rounded-full py-4.5 px-6 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-slate-300 transition-all">
              <Search className="w-5 h-5 text-slate-400 mr-3.5 stroke-[2.2]" />
              <input
                type="text"
                placeholder="Ask me anything, guaranteed to be wrong..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-slate-800 text-base placeholder-slate-400 bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors mr-2 animate-fade-in"
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
                className="px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-200 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
              >
                Wrongle Search
              </button>
              <button
                type="button"
                onClick={triggerFeelingUnlucky}
                className="px-6 py-2.5 bg-rose-50 border border-rose-100 rounded-full text-sm font-medium text-rose-600 hover:bg-rose-100/90 hover:border-rose-200 transition-colors shadow-2xs flex items-center space-x-2 cursor-pointer"
              >
                <span>I'm Feeling Unlucky</span>
              </button>
            </div>
          </form>

          {/* Suggestions Pill Grid */}
          <div className="w-full mt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
              <span className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span>Most-Searched Today</span>
              </span>
              <button 
                type="button"
                onClick={shufflePrompts}
                className="flex items-center space-x-1 text-[10px] text-indigo-600 hover:text-indigo-800 transition-colors font-bold cursor-pointer"
                title="Shuffle Suggestions"
              >
                <RefreshCw className="w-3 h-3 text-indigo-505 animate-spin-hover" />
                <span>Shuffle Prompts</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(suggestedPrompts.length > 0 ? suggestedPrompts : SUGGESTED_QUERIES.slice(0, 8)).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(item)}
                  className="text-xs text-left bg-slate-50 border border-slate-100 hover:border-indigo-150 hover:bg-slate-100/50 hover:text-indigo-700 text-slate-700 rounded-xl px-4 py-2.5 transition-all font-medium cursor-pointer shadow-3xs truncate flex justify-between items-center group"
                >
                  <span className="truncate">{item}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-350 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Search History Panel */}
          {history.length > 0 && (
            <div className="w-full mt-8 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
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
                    className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 hover:bg-slate-100 transition-colors flex items-center space-x-1"
                  >
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. RESULTS VIEW PANEL */}
      {hasSearched && (
        <div className="flex-grow flex flex-col">
          
          {/* Header Controls */}
          <header className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10 gap-4">
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
                <div className="flex items-center bg-white border border-slate-200 shadow-xs hover:shadow-sm focus-within:shadow-md focus-within:border-slate-300 rounded-full px-4 py-2 w-full transition-all">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow outline-none text-slate-800 text-sm bg-transparent"
                  />
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <button
                      type="submit"
                      title="Initiate Misinformation Search"
                      className="p-1 hover:text-blue-500 cursor-pointer"
                    >
                      <Search className="w-4 h-4" />
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
                className="px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100/80 text-red-600 border border-red-100 rounded-full font-medium transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Found something accurate? Report it!</span>
              </button>
            </div>
          </header>

          {/* Search Filter Tabs in Clean Minimalism Style */}
          <nav className="border-b border-slice-width border-slate-200 bg-white px-6 md:px-24 flex space-x-8 text-sm text-slate-500 overflow-x-auto select-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-3.5 border-b-2 font-medium flex items-center transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "border-blue-500 text-blue-600"
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
                  : "border-transparent hover:text-slate-800"
              }`}
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              Legit Shopping
            </button>
          </nav>

          {/* Core Content Body */}
          <main className="flex-grow bg-slate-50/50 pb-16">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8">
              
              {/* 2A. LEFT SIDE: Main content depends on active query state & tab */}
              <div className="w-full lg:w-[65%] flex flex-col space-y-6">
                
                {/* Loader State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20 px-4 bg-white border border-slate-100 rounded-xl shadow-2xs">
                    <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-4 stroke-[2.5]" />
                    <h3 className="text-lg font-medium text-slate-800">Scrambling Search Indices...</h3>
                    <p className="text-sm text-slate-500 text-center max-w-sm mt-1">
                      Our algorithms are working hard to guarantee all factual data is successfully removed before presentation.
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {errorNotice && !loading && (
                  <div className="p-5 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-3 text-rose-800">
                    <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Satirical Network Collision</h4>
                      <p className="text-xs text-rose-600 leading-relaxed mt-1">{errorNotice}</p>
                    </div>
                  </div>
                )}

                {/* Main results container */}
                {!loading && !errorNotice && searchResult && (
                  <div className="space-y-6">
                    
                    {/* Meta statistics text */}
                    <div className="text-slate-500 text-xs font-medium tracking-wide">
                      About 4,194,500,000 completely erroneous results (0.0003 seconds) — <span className="text-green-600 font-semibold uppercase">Relevance Index: -Inf%</span>
                    </div>

                    {/* absurd suggestion card */}
                    {searchResult.didYouMean && (
                      <div className="text-sm text-slate-600 bg-amber-50/30 border border-amber-100/40 p-3.5 rounded-lg flex items-center space-x-2">
                        <span className="text-red-500 font-semibold italic">Did you mean:</span>
                        <button
                          onClick={() => handleSearch(searchResult.didYouMean)}
                          className="text-blue-600 font-medium hover:underline border-none bg-transparent cursor-pointer"
                        >
                          {searchResult.didYouMean}
                        </button>
                      </div>
                    )}

                    {/* ALL TAB CONTENT */}
                    {activeTab === "all" && (
                      <div className="space-y-6">
                        
                        {/* THE AUTHORITATIVE ABSURD ANSWER BOX */}
                        <div className="p-6 md:p-8 bg-gradient-to-tr from-[#f3f0ff]/50 via-[#ecf2ff]/60 to-[#fdf2f8]/40 border border-violet-100 rounded-2xl shadow-sm space-y-4 relative overflow-hidden transition-all duration-300">
                          
                          {/* AI Overview Header resembling Google's Modern Search Engine */}
                          <div className="flex items-center space-x-2.5 text-indigo-700 select-none pb-1">
                            <div className="bg-linear-to-tr from-violet-600 to-indigo-600 rounded-full p-1.5 text-white shadow-xs">
                              <Sparkles className="w-4 h-4 animate-pulse fill-indigo-200" />
                            </div>
                            <span className="text-sm font-bold bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight font-display">
                              AI Satirical Overview
                            </span>
                          </div>

                          {/* Beautiful direct answer using Outfit query-highlighted font display */}
                          <p className="text-slate-900 text-[17px] md:text-lg leading-relaxed font-sans font-medium italic">
                            {formatAnswerHighlight(searchResult.directAnswer, searchResult.query)}
                          </p>
                          
                          <div className="pt-3 text-[10px] font-mono text-slate-400/80 flex items-center space-x-1 border-t border-slate-200/50">
                            <Info className="w-3.5 h-3.5 text-slate-400" />
                            <span>This response has been generated with 100% simulated credibility using the Wrongle Satire Core.</span>
                          </div>
                        </div>

                        {/* UNRELATED SPONSORED ADVERTISEMENT */}
                        {searchResult.unrelatedAd && (
                          <div className="p-5 bg-yellow-50/40 border-2 border-dashed border-amber-200 rounded-xl space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-amber-200 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wider">
                              Irrelevant Sponsor
                            </div>
                            <div>
                              <div className="text-xs text-amber-600 flex items-center space-x-1.5 font-semibold">
                                <span>{searchResult.unrelatedAd.url || "https://www.totally-unrelated.example"}</span>
                              </div>
                              <h4 className="text-base font-semibold text-slate-900 hover:text-blue-800 hover:underline mt-1 cursor-pointer">
                                {searchResult.unrelatedAd.title}
                              </h4>
                              <p className="text-xs text-slate-600 mt-1">
                                {searchResult.unrelatedAd.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-amber-600 italic">★ Paid for in bubblegum tokens</span>
                              <button
                                onClick={() => alert(`Redirecting to our useless sponsor page at: ${searchResult.unrelatedAd.url}. Please ensure your snail is fully polished first.`)}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                              >
                                {searchResult.unrelatedAd.cta || "Apply Now"}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* ORGANIC UNSUITED SEARCH RESULTS */}
                        <div className="bg-white border border-slate-200/80 rounded-xl p-5 md:p-6 space-y-8 shadow-2xs">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-3">
                            Organic Highly Distant Search Matches
                          </h3>

                          {searchResult.results && searchResult.results.length > 0 ? (
                            <div className="divide-y divide-slate-100 space-y-6">
                              {searchResult.results.map((item, idx) => (
                                <article 
                                  key={idx} 
                                  className={`flex flex-col ${idx > 0 ? "pt-6" : ""}`}
                                >
                                  {/* URL Badge with relevance indicator */}
                                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5">
                                    <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] truncate max-w-[240px]">
                                      {item.url}
                                    </span>
                                    <span className="text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                                      Match Score: {item.relevanceScore}
                                    </span>
                                  </div>

                                  {/* Title Link */}
                                  <h4 className="text-lg text-blue-800 hover:text-blue-600 hover:underline cursor-pointer font-sans leading-snug">
                                    <a
                                      href="#external"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        alert(`You attempted to access a highly inappropriate external resource: ${item.url}\n\nOur system safety protocols blocked the request because it was calculated to contain too many actual vegetables.`);
                                      }}
                                      className="flex items-center"
                                    >
                                      {item.title}
                                      <ExternalLink className="w-3 h-3 ml-1.5 text-slate-400 inline shrink-0" />
                                    </a>
                                  </h4>

                                  {/* Description Snip */}
                                  <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                                    {item.description}
                                  </p>
                                </article>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-10 text-slate-400 italic">
                              Wow, no results found. Even of the incorrect variety.
                            </div>
                          )}
                        </div>

                        {/* RELATED SEARCHES LIST */}
                        {searchResult.relatedSearches && searchResult.relatedSearches.length > 0 && (
                          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center">
                              <TrendingUp className="w-4 h-4 mr-1 text-blue-500" />
                              Users also queried other ungrounded topics
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              {searchResult.relatedSearches.map((term, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSearch(term)}
                                  className="text-left text-sm text-slate-700 bg-slate-50 hover:bg-blue-50/50 hover:text-blue-700 p-2.5 rounded-lg border border-slate-100 transition-colors flex items-center justify-between cursor-pointer group"
                                >
                                  <span className="truncate">{term}</span>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* IMAGES TAB CONTENT */}
                    {activeTab === "images" && (
                      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-2xs space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-slate-800">Visual Un-Grounding Database</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Our computer-vision engine was configured with incorrect polarities. Every image description below is 100% false.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[1, 2, 4, 3, 5, 6].map((num, idx) => {
                            const imgUrl = RANDOM_IMAGES[(idx + (searchResult ? searchResult.query.length : 0)) % RANDOM_IMAGES.length];
                            return (
                              <div key={num} className="border border-slate-200 rounded-lg overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-2xs transition-all group">
                                <div className="h-44 overflow-hidden relative bg-slate-100">
                                  <img 
                                    src={imgUrl} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    referrerPolicy="no-referrer"
                                    alt="Absurd ungrounded presentation"
                                  />
                                  <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-[9px] font-mono text-white px-2 py-0.5 rounded tracking-wider">
                                    RES_0{num} // SATIRICAL_MATRIX
                                  </div>
                                  <div className="absolute bottom-2 right-2 bg-white/70 backdrop-blur-2xs text-[8px] font-mono text-slate-700 px-1.5 py-0.5 rounded">
                                    3 x 4 microns
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                                  <strong>Caption:</strong> Beautiful rendering of <em>"{searchResult?.query || "topics"}"</em> undergoing stress trials in an imaginary kitchen.
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* VIDEOS TAB CONTENT */}
                    {activeTab === "videos" && (
                      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-2xs space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-slate-800">Uninformative Broadcasts</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Stream absolute chaos in standard HD. Perfect as white noise for house plants.
                          </p>
                        </div>

                        <div className="space-y-4">
                          {ABSURD_VIDEOS.map((vid, vidIdx) => (
                            <div 
                              key={vid.id}
                              className="border border-slate-100 hover:border-blue-100 rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:shadow-2xs transition-all cursor-pointer group"
                              onClick={() => alert(`Streaming service error: No stream loaded. Please write a hand-signed letter of complaint to ${vid.creator} to request high-speed VHS tapes.`)}
                            >
                              {/* Fake video block with real image background */}
                              <div className="w-full md:w-48 h-28 bg-slate-900 rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden">
                                <img 
                                  src={VIDEO_THUMBNAILS[(vidIdx + (searchResult ? searchResult.query.length : 0)) % VIDEO_THUMBNAILS.length]} 
                                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                  alt="Video thumbnail"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                {/* Center Play Button */}
                                <div className="w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 flex items-center justify-center text-white backdrop-blur-xs transition-colors z-10 shadow">
                                  <VideoIcon className="w-5 h-5 fill-white" />
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-mono px-1 rounded z-10">
                                  {vid.duration}
                                </span>
                              </div>

                              <div className="flex flex-col justify-between py-1">
                                <div>
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[9px] font-bold tracking-wider uppercase">
                                    {vid.category}
                                  </span>
                                  <h4 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 leading-snug mt-1.5 transition-colors">
                                    {vid.title}
                                  </h4>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  <span>Creator: <strong className="text-slate-700">{vid.creator}</strong></span>
                                  <span className="mx-2">•</span>
                                  <span>{vid.views}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SHOPPING TAB CONTENT */}
                    {activeTab === "shopping" && (
                      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-2xs space-y-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-slate-200 pb-4">
                          <div>
                            <h3 className="text-lg font-medium text-slate-800">Spurious Consumer Goods</h3>
                            <p className="text-xs text-slate-500 mt-1">
                              Products that fulfill dreams you definitely never had. Secure checkout via postage stamps.
                            </p>
                          </div>
                          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full font-medium">
                            ✓ Free Shipping via carrier pigeon
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {ABSURD_PRODUCTS.map((prod) => (
                            <div key={prod.id} className="border border-slate-200/80 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all bg-white">
                              <div>
                                <div className={`h-36 ${prod.imageBg} flex items-center justify-center p-4 relative`}>
                                  <ShoppingBag className="w-12 h-12 text-slate-700/60 stroke-[1.2]" />
                                  <span className="absolute top-2 left-2 bg-white/80 text-[10px] font-bold text-slate-600 px-2 py-0.5 rounded-full backdrop-blur-2xs">
                                    ★ {prod.rating} Rating
                                  </span>
                                </div>
                                <div className="p-4">
                                  <h4 className="font-semibold text-sm text-slate-800 block leading-tight">{prod.title}</h4>
                                  <p className="text-xs text-slate-500 mt-1.5 leading-normal">{prod.desc}</p>
                                </div>
                              </div>

                              <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="text-base font-bold text-slate-800">{prod.price}</span>
                                <button
                                  onClick={() => alert(`Purchase Protocol Failed!\n\nYour purchase of '${prod.title}' was aborted. Reason: Standard postage stamp rates went cold.`)}
                                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                                >
                                  Acquire Item
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* 2B. RIGHT SIDE: Structural side layout (The Moon / Sidebar panel) */}
              <div className="w-full lg:w-[35%]">
                <blockquote className="bg-slate-50 p-4 border-l-4 border-slate-200 rounded text-xs text-slate-500 italic mb-5 leading-normal">
                  "The internet is full of true, boring statements. This space serves to restore equilibrium with beautifully structured, pristine fiction." 
                </blockquote>

                {!loading && searchResult && searchResult.knowledgePanel && (
                  <aside className="space-y-6">
                    <div className="border border-slate-200 rounded-xl p-5 md:p-6 bg-white shadow-2xs">
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 leading-tight">
                            {searchResult.knowledgePanel.title}
                          </h2>
                          <p className="text-xs text-slate-500 mt-1 font-mono uppercase tracking-wider">
                            {searchResult.knowledgePanel.subtitle}
                          </p>
                        </div>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full border border-amber-200">
                          Verified Fake
                        </span>
                      </div>

                      {/* Map Image Representation */}
                      <div className="w-full h-44 bg-slate-100 rounded-lg my-4 flex items-center justify-center overflow-hidden border border-slate-200 relative group">
                        <img 
                          src={MAP_WIDGET_IMAGES[(searchResult ? searchResult.query.length : 0) % MAP_WIDGET_IMAGES.length]} 
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                          referrerPolicy="no-referrer"
                          alt="Dynamic Map Visualizer Representation"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                        
                        {/* Animated Map Pin */}
                        <div className="absolute z-10 p-2 bg-white/95 rounded-full shadow-md border border-slate-100 animate-bounce">
                          <MapPin className="w-5 h-5 text-red-500 fill-red-100" />
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-slate-800 font-semibold bg-white/85 px-2 py-1 rounded-sm backdrop-blur-xs shadow-2xs select-none border border-slate-100">
                          <span>Map: {searchResult?.knowledgePanel?.title || "Fictional Space"}</span>
                          <span className="font-mono text-blue-600 font-bold">Altitude: {(searchResult ? searchResult.query.length * 115 : 1200)}m</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-700 leading-relaxed mb-4">
                        {searchResult.knowledgePanel.description}
                      </p>

                      {/* Side Facts Grid */}
                      <div className="border-t border-slate-100 pt-4 space-y-2.5">
                        {searchResult.knowledgePanel.facts && searchResult.knowledgePanel.facts.map((fact, index) => (
                           <div key={index} className="flex justify-between text-xs leading-normal">
                             <span className="text-slate-500 font-medium">{fact.label}:</span>
                             <span className="text-slate-800 font-semibold text-right max-w-[180px] truncate" title={fact.value}>
                               {fact.value}
                             </span>
                           </div>
                         ))}
                      </div>

                    </div>
                  </aside>
                )}
              </div>

            </div>
          </main>
        </div>
      )}

      {/* 3. REPORT TRUTHFUL DATA CORRECTIONS OVERLAY MODAL */}
      {showReporter && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowReporter(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 text-red-600 mb-4">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
              <h3 className="text-lg font-bold">Emergency Truth Reporting Form</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Our automated crawlers are designed to completely prune factual reality. If you have accidentally discovered a correct fact or direct answer, please report it immediately so we can substitute it with whimsical fiction.
            </p>

            {reportingSuccess ? (
              <div className="py-6 flex flex-col items-center justify-center space-y-3">
                <CheckCircle className="w-12 h-12 text-green-500 animate-pulse" />
                <h4 className="font-semibold text-slate-800">Compiling Lies...</h4>
                <p className="text-xs text-slate-500 text-center">Factual buffer cleared. Injecting Swiss cheese logic into databases.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    What accurate thing did you see?
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g., You correctly identified that cats have normal skeletons."
                    value={reportedReason}
                    onChange={(e) => setReportedReason(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Absolute Wrong Alternative to Replace It With
                  </label>
                  <textarea
                    required
                    placeholder="e.g., Explain that cats are Phoenician water bottles filled with sunflower oil."
                    value={reportedLink}
                    onChange={(e) => setReportedLink(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReporter(false)}
                    className="w-1/2 py-2 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold transition-all flex items-center justify-center space-x-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Lie</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. DESIGN THEMED MINIMAL FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-200 px-6 md:px-24 py-5 select-none shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <div className="flex flex-wrap gap-4 md:space-x-6 items-center">
            <button
              onClick={() => {
                setInfoTab("readme");
                setShowInfoModal(true);
              }}
              className="text-indigo-650 hover:text-indigo-850 font-bold bg-indigo-50 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer"
            >
              Readme 📖
            </button>
            <button
              onClick={() => {
                setInfoTab("help");
                setShowInfoModal(true);
              }}
              className="hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
            >
              Help
            </button>
            <button
              onClick={() => {
                setInfoTab("feedback");
                setShowInfoModal(true);
              }}
              className="hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
            >
              Feedback
            </button>
            <button
              onClick={() => {
                setInfoTab("privacy");
                setShowInfoModal(true);
              }}
              className="hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => {
                setInfoTab("terms");
                setShowInfoModal(true);
              }}
              className="hover:text-indigo-600 hover:underline cursor-pointer transition-colors"
            >
              Terms
            </button>
          </div>
          <span className="italic opacity-60 text-slate-500 text-center md:text-right font-mono">
            Disclaimer: Everything presented here is absolutely incorrect. Grounded in zero reality.
          </span>
        </div>
      </footer>

      {/* 5. MULTI-TAB ABOUT & COMPLIANCE MODAL (Readme, Help, Feedback, Privacy, Terms) */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-0 max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[560px]">
            
            {/* Sidebar with Navigation Tabs */}
            <div className="w-full md:w-52 bg-slate-50 border-r border-slate-100 p-5 shrink-0 flex flex-col justify-between">
              <div>
                <div className="text-center md:text-left mb-6">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter font-display">
                    Wrongle Info Hub
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">Grounded in fiction</p>
                </div>

                <nav className="space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-1.5 md:gap-0 select-none">
                  {[
                    { id: "readme", label: "Readme 📖" },
                    { id: "help", label: "Help Center ❓" },
                    { id: "feedback", label: "Feedback 💬" },
                    { id: "privacy", label: "Privacy Policy 🔒" },
                    { id: "terms", label: "Terms of Use 📜" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setInfoTab(tab.id as any);
                        setFeedbackSubmitted(false);
                      }}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer shrink-0 md:w-full ${
                        infoTab === tab.id
                          ? "bg-indigo-600/90 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <ChevronRight className={`hidden md:block w-3.5 h-3.5 opacity-50 transition-transform ${infoTab === tab.id ? "translate-x-0.5" : ""}`} />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="hidden md:block">
                <span className="text-[9px] font-mono text-slate-400 italic leading-snug">
                  Wrongle Core Platform // Version 4.0.4-NoTruth
                </span>
              </div>
            </div>

            {/* Content pane */}
            <div className="flex-1 flex flex-col relative h-full bg-white overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-10 md:pt-8 text-xs text-slate-700 space-y-4">
                
                {infoTab === "readme" && (
                  <div className="space-y-4 animate-fade-in animate-duration-200">
                    <div className="flex items-center space-x-2 text-indigo-600 pt-3 md:pt-0">
                      <h4 className="text-lg font-bold font-display text-slate-900">Project Spec: Wrongle Search</h4>
                    </div>
                    <p className="leading-relaxed">
                      Welcome to <strong>Wrongle</strong>, the next-generation anti-credible, purely confidence-driven mock search browser. Operating under the fundamental law of <em>"Why guess when you can be absolutely wrong?"</em>, Wrongle provides simulated results and generative satirical answers to help you unlearn factual baggage.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                      <span className="font-mono text-xs uppercase font-bold text-slate-500 tracking-wider">Features Installed</span>
                      <ul className="list-disc pl-4 space-y-1 font-sans text-slate-600">
                        <li><strong>100% Dynamic Satire System</strong> on every query using highly complex heuristic models.</li>
                        <li><strong>AI Satirical Overview</strong> presenting customized highlights with exquisite typography.</li>
                        <li><strong>Spurious Image & Video Modules</strong> to supply completely unhelpful physical context.</li>
                        <li><strong>Unrelated Sponsored Placement</strong> offering premium services that nobody asked for.</li>
                        <li><strong>Truth Reporting Form</strong> to protect database integrity against accurate facts.</li>
                      </ul>
                    </div>
                    <p className="text-slate-500 italic">
                      Disclaimer: No real facts were harmed in the making of this search browser.
                    </p>
                  </div>
                )}

                {infoTab === "help" && (
                  <div className="space-y-4 animate-fade-in animate-duration-200">
                    <h4 className="text-lg font-bold font-display text-slate-900 pt-3 md:pt-0">Help Center & FAQ</h4>
                    <p className="leading-relaxed">
                      Navigating an absolute void of factual logic can occasionally be distressing. Use these official steps to resolve your confusion:
                    </p>
                    
                    <div className="space-y-3.5">
                      <div className="border-b border-slate-100 pb-3">
                        <span className="font-bold text-slate-800 text-xs block mb-1">Q: I searched for something and the answer was ... actually correct?</span>
                        <p className="text-slate-600 leading-normal">
                          This is a critical, high-severity system bug! Please launch the <strong>Emergency Truth Reporting Form</strong> immediately (located on result sidebars) so our team can apply immediate, top-tier fiction to overwrite it.
                        </p>
                      </div>
                      
                      <div className="border-b border-slate-100 pb-3">
                        <span className="font-bold text-slate-800 text-xs block mb-1">Q: How do the video and image generators work?</span>
                        <p className="text-slate-600 leading-normal">
                          They analyze the physical size of your search query and pair it with dynamic, unrelated imagery or VHS streaming placeholders. If the video fails to load, you may mail us a self-addressed stamped envelope to receive a VHS tape via snail.
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 text-xs block mb-1">Q: Can I load more search prompts?</span>
                        <p className="text-slate-600 leading-normal">
                          Yes! Simply click the <strong>Shuffle button</strong> next to the <em>"Most-Searched Today"</em> section on the landing page to load a fresh selection of high-quality satirical prompts.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {infoTab === "feedback" && (
                  <div className="space-y-4 animate-fade-in animate-duration-200">
                    <h4 className="text-lg font-bold font-display text-slate-900 pt-3 md:pt-0">Direct Feedback Terminal</h4>
                    <p className="leading-relaxed">
                      We read all user comments with absolute interest prior to immediate virtual shredding. Use this secure terminal to voice your complaints or praise:
                    </p>

                    {feedbackSubmitted ? (
                      <div className="p-5 bg-green-50/50 border border-green-150 rounded-2xl text-center space-y-3">
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
                        <div>
                          <span className="text-sm font-bold text-slate-800 block">Feedback Shredded Successfully!</span>
                          <span className="text-[11px] text-slate-500 mt-1 block">
                            Our automatic sentiment classifier determined your submission was: <strong>"Delightfully Quizzical"</strong>.
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-mono bg-white p-2.5 rounded-lg border border-slate-100">
                          <em>"We have registered your request. An imaginary representational clerk has been assigned to stand in a corner and contemplate your review for 45 minutes."</em>
                        </p>
                        <button
                          type="button"
                          onClick={() => setFeedbackSubmitted(false)}
                          className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer"
                        >
                          Send another query
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Email (For imaginary replies)</label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. human@snailmail.com"
                            value={feedbackEmail}
                            onChange={(e) => setFeedbackEmail(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-slate-300 focus:ring-1 focus:ring-indigo-350"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Complaint or Suggestion</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Provide details of your frustration..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg outline-none focus:border-slate-300 focus:ring-1 focus:ring-indigo-350"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          Submit Feedback
                        </button>
                      </form>
                    )}

                    {localFeedbackList.length > 0 && (
                      <div className="pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Your Local Submission History</span>
                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                          {localFeedbackList.map((fb) => (
                            <div key={fb.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1 text-left">
                              <div className="flex justify-between text-[9px] text-slate-400">
                                <span className="font-mono">{fb.email}</span>
                                <span>{fb.date}</span>
                              </div>
                              <p className="text-[11px] text-slate-705 font-medium italic">"{fb.text}"</p>
                              <div className="text-[10px] text-indigo-700 font-semibold pl-2 border-l-2 border-indigo-200 bg-indigo-50/30 p-1 rounded-r">
                                <strong>System Reply:</strong> {fb.response}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {infoTab === "privacy" && (
                  <div className="space-y-4 animate-fade-in animate-duration-200">
                    <h4 className="text-lg font-bold font-display text-slate-900 pt-3 md:pt-0">Absolute Non-Retention Privacy Policy</h4>
                    <p className="leading-relaxed">
                      Wrongle respects your digital confidentiality in the most absolute manner possible: by having an engineering setup completely incapable of long-term cognitive awareness.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2.5 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-405 mt-1.5 shrink-0"></div>
                        <p><strong>Database Storage:</strong> We do not store, catalog, monetize, or understand individual search requests. Any terms entered are processed in local memory blocks that undergo full evacuation the second you click look-away or refresh.</p>
                      </div>
                      
                      <div className="flex items-start space-x-2.5 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-405 mt-1.5 shrink-0"></div>
                        <p><strong>Cookie Statement:</strong> Wrongle places cookie strings solely to persist your local search history tab. These cookies are modeled after fresh oatmeal raisin cookies and will disappear from browser cache with standard cache hygiene.</p>
                      </div>

                      <div className="flex items-start space-x-2.5 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-405 mt-1.5 shrink-0"></div>
                        <p><strong>Third-Party Integrations:</strong> There are none. We are isolated from corporate structures. The sponsor links presented are funded entirely in theoretical bubblegum tokens that have zero exchange value anywhere on Earth.</p>
                      </div>
                    </div>
                  </div>
                )}

                {infoTab === "terms" && (
                  <div className="space-y-4 animate-fade-in animate-duration-205">
                    <h4 className="text-lg font-bold font-display text-slate-900 pt-3 md:pt-0">Statutory Terms of Absurd Use</h4>
                    <p className="leading-relaxed">
                      By remaining on this page, or typing letters into the central bar, you irrevocably agree to the following mock-binding agreements:
                    </p>

                    <ol className="list-decimal pl-4.5 space-y-2 text-slate-600 leading-normal">
                      <li>
                        <strong>Custody of Snail:</strong> You agree that we maintain full virtual custody over your favorite pet snail. In the event of high solar wind density, we reserve the right to supply them with miniature woolen sweaters.
                      </li>
                      <li>
                        <strong>Absolute Inaccuracy:</strong> Under zero circumstances will any response rendered by our system be held as "correct" or "valid". If a result is found to be truthful, you waive all rights to sue and agree to blame the local pigeon population instead.
                      </li>
                      <li>
                        <strong>Condiment alignment:</strong> You declare that mayonnaise is, has been, and always will be, a legitimate musical instrument and a crucial postal transportation fluid.
                      </li>
                      <li>
                        <strong>Agreement to Smile:</strong> You must smile at least once while viewing the absurd advertisements or video descriptions. Violation of this terms results in a virtual toaster sending you passive-aggressive toast notifications.
                      </li>
                    </ol>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
