import React from 'react';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import farmerOxPlowImg from '../assets/images/farmer_ox_plow_1788000488778.jpg';

interface HeroBannerProps {
  language?: Language;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ language: propLanguage }) => {
  const { language, t } = useLanguage();
  const activeLang = propLanguage || language;

  return (
    <div
      id="hero-region-banner"
      className="w-full bg-[#083B2B] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-emerald-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      {/* Left Content */}
      <div className="relative z-10 max-w-3xl space-y-3">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest bg-[#12533D] text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.activeRegion}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest bg-[#12533D] text-emerald-300 border border-emerald-500/30">
            {t.telemetryBadge}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-sans text-amber-300 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
          {t.heroTitle}
        </h2>

        {/* Subtitle description */}
        <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
          {t.heroDescription}
        </p>
      </div>

      {/* Right Graphic Badge - Farmer Plowing Logo */}
      <div className="relative z-10 shrink-0 self-center md:self-auto">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-emerald-400/60 p-2 flex items-center justify-center shadow-lg overflow-hidden group">
          <img
            src={farmerOxPlowImg}
            alt="Farmer Plowing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter grayscale contrast-[250%] brightness-[0.70] group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

