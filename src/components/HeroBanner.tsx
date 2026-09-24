import React from 'react';
import { Language, DistrictInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import farmerOxPlowImg from '../assets/images/farmer_ox_plow_1788000488778.jpg';
import { MapPin, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  language?: Language;
  district?: DistrictInfo;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ language: propLanguage, district }) => {
  const { language, t, isTamil, getDistrictName } = useLanguage();
  const districtName = district ? getDistrictName(district) : '';

  return (
    <>
      {/* ============================================================== */}
      {/* MOBILE / TABLET (<1280px): Compact Contextual Strip             */}
      {/* Takes only ~40px instead of 280px, freeing above-the-fold space */}
      {/* ============================================================== */}
      <div
        id="hero-compact-strip"
        className="block xl:hidden w-full bg-emerald-50/80 border border-emerald-200/90 rounded-2xl px-3.5 py-2 shadow-2xs"
      >
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="font-extrabold text-[#1B5E20] truncate">
              {isTamil ? 'தமிழ்நாடு உழவர் வழிகாட்டி' : 'TN Farmer Advisory Hub'}
            </span>
          </div>
          {district && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-white/90 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0 shadow-2xs">
              <MapPin className="w-3 h-3 text-emerald-600" />
              <span>{districtName}</span>
              <span className="text-slate-400 font-normal hidden sm:inline">• {district.zone}</span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP (>=1280px): Dignified, Non-Developer Agricultural Hero */}
      {/* ============================================================== */}
      <div
        id="hero-region-banner"
        className="hidden xl:flex w-full bg-[#083B2B] text-white rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-md border border-emerald-900/60 items-center justify-between gap-6"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

        {/* Left Content */}
        <div className="relative z-10 max-w-3xl space-y-2.5">
          {/* Top Badges (Farmer-Friendly, No Developer Telemetry Jargon) */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#12533D] text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {isTamil ? 'அக்ரிகுரல் — தமிழ்நாடு வேளாண் மையம்' : 'AgriKural — Tamil Nadu Agricultural Hub'}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#12533D] text-emerald-300 border border-emerald-500/30">
              {isTamil ? 'தமிழ்நாடு 38 மாவட்டங்கள்' : '38 Tamil Nadu Districts'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-amber-300 drop-shadow-xs">
            {isTamil ? 'அக்ரிகுரல்: தமிழ்நாடு உழவர் வழிகாட்டி மற்றும் வேளாண் மையம்' : 'AgriKural: Tamil Nadu Farmer Advisory & Agricultural Hub'}
          </h2>

          {/* Subtitle description */}
          <p className="text-sm text-emerald-100/90 leading-relaxed font-normal">
            {isTamil
              ? 'பயிர் நோய் ஆய்வு, தினசரி சந்தை விலை, அணை நீர்மட்டம், அரசு மானியங்கள், விளைபொருள் நேரடி விற்பனை மற்றும் விவசாய ஆட்கள் ஒரே இடத்தில்.'
              : 'Crop disease diagnosis, daily mandi prices, dam water levels, govt subsidies, direct harvest selling, and farm labor logistics across Tamil Nadu.'}
          </p>
        </div>

        {/* Right Graphic Badge - Farmer Plowing Logo */}
        <div className="relative z-10 shrink-0">
          <div className="w-20 h-20 rounded-2xl bg-white border-2 border-emerald-400/60 p-2 flex items-center justify-center shadow-lg overflow-hidden group">
            <img
              src={farmerOxPlowImg}
              alt="Farmer Plowing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter grayscale contrast-[250%] brightness-[0.70] group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </>
  );
};
