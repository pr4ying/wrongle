import React from "react";
import { Video as VideoIcon, ShoppingBag } from "lucide-react";
import { RANDOM_IMAGES, VIDEO_THUMBNAILS, ABSURD_PRODUCTS, ABSURD_VIDEOS } from "../constants";

interface ImagesTabContentProps {
  darkMode: boolean;
  query: string;
}

export function ImagesTabContent({ darkMode, query }: ImagesTabContentProps) {
  return (
    <div className={`border rounded-xl p-5 md:p-6 shadow-2xs space-y-6 ${
      darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      <div>
        <h3 className={`text-lg font-medium ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
          Visual Un-Grounding Database
        </h3>
        <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Our computer-vision engine was configured with incorrect polarities. Every image description below is 100% false.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 4, 3, 5, 6].map((num, idx) => {
          const imgUrl = RANDOM_IMAGES[(idx + (query ? query.length : 0)) % RANDOM_IMAGES.length];
          return (
            <div key={num} className={`border rounded-lg overflow-hidden flex flex-col hover:shadow-2xs transition-all group ${
              darkMode ? "border-slate-700 hover:border-blue-700" : "border-slate-200 hover:border-blue-200"
            }`}>
              <div className={`h-44 overflow-hidden relative ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                <img
                  src={imgUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  alt="Absurd ungrounded presentation"
                />
                <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-[9px] font-mono text-white px-2 py-0.5 rounded tracking-wider">
                  RES_0{num} // SATIRICAL_MATRIX
                </div>
                <div className={`absolute bottom-2 right-2 backdrop-blur-2xs text-[8px] font-mono px-1.5 py-0.5 rounded ${
                  darkMode ? "bg-slate-800/70 text-slate-300" : "bg-white/70 text-slate-700"
                }`}>
                  3 x 4 microns
                </div>
              </div>

              <div className={`p-3 border-t text-xs leading-relaxed ${
                darkMode ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-600"
              }`}>
                <strong>Caption:</strong> Beautiful rendering of <em>&quot;{query || "topics"}&quot;</em> undergoing stress trials in an imaginary kitchen.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface VideosTabContentProps {
  darkMode: boolean;
  query: string;
}

export function VideosTabContent({ darkMode, query }: VideosTabContentProps) {
  return (
    <div className={`border rounded-xl p-5 md:p-6 shadow-2xs space-y-6 ${
      darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      <div>
        <h3 className={`text-lg font-medium ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
          Uninformative Broadcasts
        </h3>
        <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Stream absolute chaos in standard HD. Perfect as white noise for house plants.
        </p>
      </div>

      <div className="space-y-4">
        {ABSURD_VIDEOS.map((vid, vidIdx) => (
          <div
            key={vid.id}
            className={`border rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:shadow-2xs transition-all cursor-pointer group ${
              darkMode ? "border-slate-800 hover:border-blue-800" : "border-slate-100 hover:border-blue-100"
            }`}
            onClick={() => alert(`Streaming service error: No stream loaded. Please write a hand-signed letter of complaint to ${vid.creator} to request high-speed VHS tapes.`)}
          >
            {/* Video thumbnail */}
            <div className="w-full md:w-48 h-28 bg-slate-900 rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden">
              <img
                src={VIDEO_THUMBNAILS[(vidIdx + (query ? query.length : 0)) % VIDEO_THUMBNAILS.length]}
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
                <span className={`px-2 py-0.5 border rounded-full text-[9px] font-bold tracking-wider uppercase ${
                  darkMode ? "bg-blue-900/50 text-blue-400 border-blue-800" : "bg-blue-50 text-blue-600 border-blue-100"
                }`}>
                  {vid.category}
                </span>
                <h4 className={`text-base font-semibold leading-snug mt-1.5 transition-colors ${
                  darkMode ? "text-slate-200 group-hover:text-blue-400" : "text-slate-800 group-hover:text-blue-600"
                }`}>
                  {vid.title}
                </h4>
              </div>
              <div className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                <span>Creator: <strong className={darkMode ? "text-slate-300" : "text-slate-700"}>{vid.creator}</strong></span>
                <span className="mx-2">•</span>
                <span>{vid.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ShoppingTabContentProps {
  darkMode: boolean;
}

export function ShoppingTabContent({ darkMode }: ShoppingTabContentProps) {
  return (
    <div className={`border rounded-xl p-5 md:p-6 shadow-2xs space-y-6 ${
      darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
    }`}>
      <div className={`flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-4 ${
        darkMode ? "border-slate-800" : "border-slate-200"
      }`}>
        <div>
          <h3 className={`text-lg font-medium ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
            Spurious Consumer Goods
          </h3>
          <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Products that fulfill dreams you definitely never had. Secure checkout via postage stamps.
          </p>
        </div>
        <span className={`text-xs border px-3 py-1 rounded-full font-medium ${
          darkMode ? "bg-emerald-900/50 text-emerald-400 border-emerald-800" : "bg-emerald-50 text-emerald-700 border-emerald-100"
        }`}>
          ✓ Free Shipping via carrier pigeon
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {ABSURD_PRODUCTS.map((prod) => (
          <div key={prod.id} className={`border rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-xs transition-all ${
            darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200/80"
          }`}>
            <div>
              <div className={`h-36 flex items-center justify-center p-4 relative ${darkMode ? "bg-slate-700" : prod.imageBg}`}>
                <ShoppingBag className={`w-12 h-12 stroke-[1.2] ${darkMode ? "text-slate-400" : "text-slate-700/60"}`} />
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-2xs ${
                  darkMode ? "bg-slate-600/80 text-slate-300" : "bg-white/80 text-slate-600"
                }`}>
                  ★ {prod.rating} Rating
                </span>
              </div>
              <div className="p-4">
                <h4 className={`font-semibold text-sm block leading-tight ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                  {prod.title}
                </h4>
                <p className={`text-xs mt-1.5 leading-normal ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {prod.desc}
                </p>
              </div>
            </div>

            <div className={`p-4 pt-0 border-t flex items-center justify-between ${
              darkMode ? "border-slate-700 bg-slate-800/50" : "border-slate-100 bg-slate-50/50"
            }`}>
              <span className={`text-base font-bold ${darkMode ? "text-slate-100" : "text-slate-800"}`}>
                {prod.price}
              </span>
              <button
                onClick={() => alert(`Purchase Protocol Failed!\n\nYour purchase of '${prod.title}' was aborted. Reason: Standard postage stamp rates went cold.`)}
                className={`px-3 py-1.5 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  darkMode ? "bg-slate-600 hover:bg-slate-500" : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                Acquire Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
