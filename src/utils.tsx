import React from "react";

interface FormatAnswerHighlightProps {
  text: string;
  query: string;
  isDarkMode: boolean;
}

export const formatAnswerHighlight = ({ text, query, isDarkMode }: FormatAnswerHighlightProps) => {
  if (!text) return null;

  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2)
    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));

  const hasMarkdown = text.includes("**");
  const segments = hasMarkdown ? text.split(/(\*\*.*?\*\*)/g) : [text];

  return (
    <>
      {segments.map((segment, segmentIdx) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          const content = segment.slice(2, -2);
          return (
            <strong key={segmentIdx} className={`font-extrabold not-italic border-b-2 border-indigo-400 pb-[1.5px] px-1 rounded ${
              isDarkMode ? "text-slate-100 bg-slate-800" : "text-[#111827] bg-slate-50"
            }`}>
              {content}
            </strong>
          );
        }

        const words = segment.split(/(\s+)/);
        return (
          <span key={segmentIdx}>
            {words.map((word, wordIdx) => {
              const cleanWord = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
              if (!cleanWord) return word;

              const isQueryWord = queryWords.some(qw => cleanWord.includes(qw));
              
              const firstChar = word.trim()[0];
              const isCapitalized = firstChar && firstChar === firstChar.toUpperCase() && !/^\d/.test(firstChar);
              
              const wordCodeSum = cleanWord.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
              const shouldHighlightNoun = isCapitalized && word.length > 3 && (wordCodeSum % 3 === 0);
              
              const isNumber = /^\d+/.test(cleanWord);

              if (isQueryWord) {
                return (
                  <strong key={wordIdx} className={`font-extrabold not-italic border-b-2 border-amber-400 px-0.5 rounded-xs ${
                    isDarkMode ? "text-amber-200 bg-amber-900/50" : "text-[#111827] bg-amber-100/70"
                  }`}>
                    {word}
                  </strong>
                );
              }

              if (isNumber) {
                return (
                  <strong key={wordIdx} className={`font-bold not-italic border-b border-indigo-300 pb-[1.5px] px-0.5 ${
                    isDarkMode ? "text-indigo-300 bg-indigo-900/30" : "text-indigo-950 bg-indigo-50/20"
                  }`}>
                    {word}
                  </strong>
                );
              }

              if (shouldHighlightNoun) {
                return (
                  <strong key={wordIdx} className={`font-extrabold not-italic border-b border-indigo-300 pb-[1px] ${
                    isDarkMode ? "text-slate-200" : "text-slate-900"
                  }`}>
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
