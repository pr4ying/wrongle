import React from "react";
import { ChevronRight } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
  setInfoTab: (tab: "readme" | "help" | "feedback" | "privacy" | "terms") => void;
  setShowInfoModal: (show: boolean) => void;
}

export default function Footer({ darkMode, setInfoTab, setShowInfoModal }: FooterProps) {
  return (
    <footer className={`border-t px-6 md:px-24 py-5 select-none shrink-0 ${
      darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"
    }`}>
      <div className={`flex flex-col md:flex-row justify-between items-center text-xs gap-4 ${
        darkMode ? "text-slate-400" : "text-slate-600"
      }`}>
        <div className="flex flex-wrap gap-4 md:space-x-6 items-center">
          <button
            onClick={() => {
              setInfoTab("readme");
              setShowInfoModal(true);
            }}
            className={`font-bold border px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300 bg-indigo-950 border-indigo-900 hover:border-indigo-800"
                : "text-indigo-650 hover:text-indigo-850 bg-indigo-50 border border-indigo-100 hover:border-indigo-200"
            }`}
          >
            Readme
          </button>
          <button
            onClick={() => {
              setInfoTab("help");
              setShowInfoModal(true);
            }}
            className={`hover:underline cursor-pointer transition-colors ${
              darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            Help
          </button>
          <button
            onClick={() => {
              setInfoTab("feedback");
              setShowInfoModal(true);
            }}
            className={`hover:underline cursor-pointer transition-colors ${
              darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => {
              setInfoTab("privacy");
              setShowInfoModal(true);
            }}
            className={`hover:underline cursor-pointer transition-colors ${
              darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => {
              setInfoTab("terms");
              setShowInfoModal(true);
            }}
            className={`hover:underline cursor-pointer transition-colors ${
              darkMode ? "hover:text-indigo-400" : "hover:text-indigo-600"
            }`}
          >
            Terms
          </button>
        </div>
        <span className={`italic text-center md:text-right font-mono ${darkMode ? "text-slate-500 opacity-60" : "opacity-60 text-slate-500"}`}>
          Disclaimer: Everything presented here is absolutely incorrect. Grounded in zero reality.
        </span>
      </div>
    </footer>
  );
}
