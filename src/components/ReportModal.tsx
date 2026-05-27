import React from "react";
import { X, ShieldAlert, Send, CircleCheck as CheckCircle } from "lucide-react";

interface ReportModalProps {
  darkMode: boolean;
  showReporter: boolean;
  setShowReporter: (show: boolean) => void;
  reportedReason: string;
  setReportedReason: (reason: string) => void;
  reportedLink: string;
  setReportedLink: (link: string) => void;
  reportingSuccess: boolean;
  handleReportSubmit: (e: React.FormEvent) => void;
}

export default function ReportModal({
  darkMode,
  showReporter,
  setShowReporter,
  reportedReason,
  setReportedReason,
  reportedLink,
  setReportedLink,
  reportingSuccess,
  handleReportSubmit
}: ReportModalProps) {
  if (!showReporter) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`border rounded-2xl p-6 max-w-md w-full shadow-2xl relative ${
        darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
      }`}>
        <button
          onClick={() => setShowReporter(false)}
          className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
            darkMode ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 text-red-500 mb-4">
          <ShieldAlert className="w-6 h-6 stroke-[2]" />
          <h3 className={`text-lg font-bold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
            Emergency Truth Reporting Form
          </h3>
        </div>

        <p className={`text-xs leading-relaxed mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          Our automated crawlers are designed to completely prune factual reality. If you have accidentally discovered a correct fact or direct answer, please report it immediately so we can substitute it with whimsical fiction.
        </p>

        {reportingSuccess ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-3">
            <CheckCircle className="w-12 h-12 text-green-500 animate-pulse" />
            <h4 className={`font-semibold ${darkMode ? "text-slate-100" : "text-slate-800"}`}>Compiling Lies...</h4>
            <p className={`text-xs text-center ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Factual buffer cleared. Injecting Swiss cheese logic into databases.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                What accurate thing did you see?
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g., You correctly identified that cats have normal skeletons."
                value={reportedReason}
                onChange={(e) => setReportedReason(e.target.value)}
                className={`w-full text-xs p-2.5 border rounded-lg outline-none transition-colors ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-slate-500"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-300"
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase mb-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                Absolute Wrong Alternative to Replace It With
              </label>
              <textarea
                required
                placeholder="e.g., Explain that cats are Phoenician water bottles filled with sunflower oil."
                value={reportedLink}
                onChange={(e) => setReportedLink(e.target.value)}
                className={`w-full text-xs p-2.5 border rounded-lg outline-none transition-colors ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-slate-500"
                    : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-300"
                }`}
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowReporter(false)}
                className={`w-1/2 py-2 border rounded-full text-xs font-semibold transition-colors ${
                  darkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
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
  );
}
