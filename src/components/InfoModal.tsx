import React from "react";
import { X, ChevronRight, Send } from "lucide-react";

interface InfoModalProps {
  darkMode: boolean;
  showInfoModal: boolean;
  setShowInfoModal: (show: boolean) => void;
  infoTab: "readme" | "help" | "feedback" | "privacy" | "terms";
  setInfoTab: (tab: "readme" | "help" | "feedback" | "privacy" | "terms") => void;
  feedbackEmail: string;
  setFeedbackEmail: (email: string) => void;
  feedbackText: string;
  setFeedbackText: (text: string) => void;
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: (submitted: boolean) => void;
  handleFeedbackSubmit: (e: React.FormEvent) => void;
  localFeedbackList: { id: string; email: string; text: string; response: string; date: string }[];
}

export default function InfoModal({
  darkMode,
  showInfoModal,
  setShowInfoModal,
  infoTab,
  setInfoTab,
  feedbackEmail,
  setFeedbackEmail,
  feedbackText,
  setFeedbackText,
  feedbackSubmitted,
  setFeedbackSubmitted,
  handleFeedbackSubmit,
  localFeedbackList
}: InfoModalProps) {
  if (!showInfoModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className={`border rounded-3xl p-0 max-w-2xl w-full shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[560px] ${
        darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
      }`}>

        {/* Sidebar with Navigation Tabs */}
        <div className={`w-full md:w-52 border-r p-5 shrink-0 flex flex-col justify-between ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
        }`}>
          <div>
            <div className="text-center md:text-left mb-6">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent tracking-tighter font-display">
                Wrongle Info Hub
              </span>
              <p className={`text-[10px] font-mono uppercase tracking-wider mt-1 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                Grounded in fiction
              </p>
            </div>

            <nav className="space-y-1.5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-1.5 md:gap-0 select-none">
              {[
                { id: "readme", label: "Readme" },
                { id: "help", label: "Help Center" },
                { id: "feedback", label: "Feedback" },
                { id: "privacy", label: "Privacy Policy" },
                { id: "terms", label: "Terms of Use" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setInfoTab(tab.id as "readme" | "help" | "feedback" | "privacy" | "terms");
                    setFeedbackSubmitted(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer shrink-0 md:w-full ${
                    infoTab === tab.id
                      ? darkMode
                        ? "bg-indigo-600/90 text-white shadow-xs"
                        : "bg-indigo-600/90 text-white shadow-xs"
                      : darkMode
                        ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
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
            <span className={`text-[9px] font-mono italic leading-snug ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
              Wrongle Core Platform // Version 4.0.4-NoTruth
            </span>
          </div>
        </div>

        {/* Content pane */}
        <div className={`flex-1 flex flex-col relative h-full overflow-hidden ${darkMode ? "bg-slate-900" : "bg-white"}`}>
          {/* Close Button */}
          <button
            onClick={() => setShowInfoModal(false)}
            className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors z-20 cursor-pointer ${
              darkMode ? "text-slate-500 hover:text-slate-300 hover:bg-slate-800" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Main Scrollable Area */}
          <div className={`flex-1 overflow-y-auto p-6 md:p-8 pt-10 md:pt-8 text-xs space-y-4 ${
            darkMode ? "text-slate-300" : "text-slate-700"
          }`}>
            {infoTab === "readme" && <ReadmeContent darkMode={darkMode} />}
            {infoTab === "help" && <HelpContent darkMode={darkMode} />}
            {infoTab === "feedback" && (
              <FeedbackContent 
                darkMode={darkMode}
                feedbackEmail={feedbackEmail}
                setFeedbackEmail={setFeedbackEmail}
                feedbackText={feedbackText}
                setFeedbackText={setFeedbackText}
                feedbackSubmitted={feedbackSubmitted}
                handleFeedbackSubmit={handleFeedbackSubmit}
                localFeedbackList={localFeedbackList}
              />
            )}
            {infoTab === "privacy" && <PrivacyContent darkMode={darkMode} />}
            {infoTab === "terms" && <TermsContent darkMode={darkMode} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadmeContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-4 animate-fade-in animate-duration-200">
      <div className="flex items-center space-x-2 text-indigo-500 pt-3 md:pt-0">
        <h4 className={`text-lg font-bold font-display ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
          Project Spec: Wrongle Search
        </h4>
      </div>
      <p className="leading-relaxed">
        Welcome to <strong className={darkMode ? "text-slate-100" : "text-slate-900"}>Wrongle</strong>, the next-generation anti-credible, purely confidence-driven mock search browser. Operating under the fundamental law of <em>&quot;Why guess when you can be absolutely wrong?&quot;</em>, Wrongle provides simulated results and generative satirical answers to help you unlearn factual baggage.
      </p>
      <div className={`p-4 rounded-xl border space-y-2 ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
      }`}>
        <span className={`font-mono text-xs uppercase font-bold tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Features Installed
        </span>
        <ul className="list-disc pl-4 space-y-1 font-sans">
          <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>100% Dynamic Satire System</strong> on every query using highly complex heuristic models.</li>
          <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>AI Satirical Overview</strong> presenting customized highlights with exquisite typography.</li>
          <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Spurious Image & Video Modules</strong> to supply completely unhelpful physical context.</li>
          <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Unrelated Sponsored Placement</strong> offering premium services that nobody asked for.</li>
          <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Truth Reporting Form</strong> to protect database integrity against accurate facts.</li>
        </ul>
      </div>
      <p className={`italic ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
        Disclaimer: No real facts were harmed in the making of this search browser.
      </p>
    </div>
  );
}

function HelpContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-4 animate-fade-in animate-duration-200">
      <h4 className={`text-lg font-bold font-display pt-3 md:pt-0 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
        Help Center & FAQ
      </h4>
      <p className="leading-relaxed">
        Navigating an absolute void of factual logic can occasionally be distressing. Use these official steps to resolve your confusion:
      </p>

      <div className="space-y-3.5">
        <div className={`border-b pb-3 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <strong className={darkMode ? "text-slate-100" : "text-slate-800"}>Q: Why are all results wrong?</strong>
          <p className="mt-1">A: By design. Our search ranking algorithm was specifically built to invert relevance scores. The more related a result is, the less likely it appears.</p>
        </div>
        <div className={`border-b pb-3 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <strong className={darkMode ? "text-slate-100" : "text-slate-800"}>Q: I found something accurate! What do I do?</strong>
          <p className="mt-1">A: Please use the Emergency Truth Reporting Form available on the results page. Our agents will promptly remove the offending factual data and replace it with suitable absurdity.</p>
        </div>
        <div className={`border-b pb-3 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <strong className={darkMode ? "text-slate-100" : "text-slate-800"}>Q: Can I trust any shopping results?</strong>
          <p className="mt-1">A: Trust is a very strong word. Our shopping tab is curated from the world&apos;s finest imaginary product database. Do not, under any circumstances, actually try to buy these items.</p>
        </div>
        <div>
          <strong className={darkMode ? "text-slate-100" : "text-slate-800"}>Q: How do I actually get real information?</strong>
          <p className="mt-1">A: We recommend stepping outside and speaking directly to a highly unreliable neighbour.</p>
        </div>
      </div>
    </div>
  );
}

interface FeedbackContentProps {
  darkMode: boolean;
  feedbackEmail: string;
  setFeedbackEmail: (email: string) => void;
  feedbackText: string;
  setFeedbackText: (text: string) => void;
  feedbackSubmitted: boolean;
  handleFeedbackSubmit: (e: React.FormEvent) => void;
  localFeedbackList: { id: string; email: string; text: string; response: string; date: string }[];
}

function FeedbackContent({
  darkMode,
  feedbackEmail,
  setFeedbackEmail,
  feedbackText,
  setFeedbackText,
  feedbackSubmitted,
  handleFeedbackSubmit,
  localFeedbackList
}: FeedbackContentProps) {
  return (
    <div className="space-y-4 animate-fade-in animate-duration-200">
      <h4 className={`text-lg font-bold font-display pt-3 md:pt-0 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
        Submit Feedback
      </h4>
      <p className="leading-relaxed">
        Have a complaint, suggestion, or bizarre dream involving search engines? Write to us. Our feedback system is powered by a team of imaginary interns who may or may not read your submission.
      </p>

      {feedbackSubmitted ? (
        <div className={`p-5 rounded-xl border text-center space-y-2 ${
          darkMode ? "bg-emerald-950/50 border-emerald-900 text-emerald-400" : "bg-emerald-50 border-emerald-100 text-emerald-700"
        }`}>
          <p className="font-semibold">Thank you for your feedback!</p>
          <p className="text-xs opacity-80">Our team of bewildered interns has been notified.</p>
        </div>
      ) : (
        <form onSubmit={handleFeedbackSubmit} className="space-y-3">
          <div>
            <label className={`block text-xs font-bold uppercase mb-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Your Email (Optional)
            </label>
            <input
              type="email"
              placeholder="definitely.real@email.com"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              className={`w-full text-xs p-2.5 border rounded-lg outline-none transition-colors ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-slate-500"
                  : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-300"
              }`}
            />
          </div>
          <div>
            <label className={`block text-xs font-bold uppercase mb-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Your Feedback
            </label>
            <textarea
              required
              rows={3}
              placeholder="Please describe your experience in vivid, unnecessary detail..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className={`w-full text-xs p-2.5 border rounded-lg outline-none transition-colors ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500 focus:border-slate-500"
                  : "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-slate-300"
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </form>
      )}

      {/* Previous feedback list */}
      {localFeedbackList.length > 0 && (
        <div className={`mt-6 pt-4 border-t space-y-3 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <h5 className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
            Your Previous Feedback
          </h5>
          {localFeedbackList.map((fb) => (
            <div key={fb.id} className={`p-3 rounded-lg border text-xs space-y-1.5 ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`font-mono text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{fb.date}</span>
                <span className={`font-mono text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{fb.email || "Anonymous"}</span>
              </div>
              <p className={darkMode ? "text-slate-300" : "text-slate-700"}>{fb.text}</p>
              <p className={`italic ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>Response: {fb.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PrivacyContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-4 animate-fade-in animate-duration-200">
      <h4 className={`text-lg font-bold font-display pt-3 md:pt-0 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
        Privacy Policy
      </h4>
      <p className="leading-relaxed">
        At Wrongle, we take your privacy extremely <em>non</em>-seriously. Here is a summary of how we handle your data:
      </p>
      <ul className="list-disc pl-4 space-y-2">
        <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Data Collection:</strong> We collect absolutely nothing of value. Your queries are forgotten immediately after being mangled by our algorithm.</li>
        <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Cookies:</strong> We may use cookies, but only the edible kind. Any digital cookies are purely fictional.</li>
        <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Third Parties:</strong> We share your data with exactly zero third parties, mostly because no one asked for it.</li>
        <li><strong className={darkMode ? "text-slate-200" : "text-slate-800"}>Security:</strong> Your information is protected by a state-of-the-art cardboard firewall.</li>
      </ul>
      <p className={`italic ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
        Last updated: The day before yesterday, probably.
      </p>
    </div>
  );
}

function TermsContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-4 animate-fade-in animate-duration-200">
      <h4 className={`text-lg font-bold font-display pt-3 md:pt-0 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
        Terms of Use
      </h4>
      <p className="leading-relaxed">
        By using Wrongle, you agree to the following terms and non-conditions:
      </p>
      <ol className="list-decimal pl-4 space-y-2">
        <li>You acknowledge that all information provided is <strong className={darkMode ? "text-slate-200" : "text-slate-800"}>100% incorrect</strong> and should never be used for any real-world decision-making.</li>
        <li>You will not hold Wrongle responsible for any confusion, laughter, or existential crises that may result from using this service.</li>
        <li>You agree to report any accidentally accurate information immediately using the provided form.</li>
        <li>You accept that the &quot;I&apos;m Feeling Unlucky&quot; button may lead to unexpected philosophical questions.</li>
        <li>You understand that our shopping section sells only imaginary products that do not exist in any known dimension.</li>
      </ol>
      <p className={`italic ${darkMode ? "text-slate-500" : "text-slate-500"}`}>
        These terms are subject to change without notice, reason, or logical consistency.
      </p>
    </div>
  );
}
