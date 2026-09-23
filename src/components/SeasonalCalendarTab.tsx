import React, { useState } from 'react';
import { Calendar, Droplets, Sprout, AlertCircle, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { DistrictInfo, SeasonalCropGuide } from '../types';
import { SEASONAL_GUIDE_DATA } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface SeasonalCalendarTabProps {
  district: DistrictInfo;
}

export const SeasonalCalendarTab: React.FC<SeasonalCalendarTabProps> = ({ district }) => {
  const { t, getDistrictName } = useLanguage();
  const [activeSeasonIdx, setActiveSeasonIdx] = useState<number>(1); // default Samba

  const selectedSeason = SEASONAL_GUIDE_DATA[activeSeasonIdx];

  return (
    <div id="seasonal-calendar-tab" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-start gap-3.5 border-b border-slate-100 pb-5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t.seasonalCalendarTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5 font-medium leading-relaxed">
              {t.seasonalCalendarSubtitle}
            </p>
          </div>
        </div>

        {/* Season Selector Tabs */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SEASONAL_GUIDE_DATA.map((season, idx) => {
            const isActive = activeSeasonIdx === idx;
            return (
              <button
                key={season.seasonName}
                onClick={() => setActiveSeasonIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                }`}
              >
                <span className="block text-xs font-black truncate">{season.seasonName}</span>
                <span
                  className={`block text-[11px] font-bold mt-0.5 ${
                    isActive ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  {season.tamilName}
                </span>
                <span className="block text-[10px] text-slate-400 mt-1">{season.months}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Season Deep Dive Popped Up Slide */}
      <div className="bg-white rounded-3xl border-2 border-blue-500/60 p-6 sm:p-7 shadow-xl shadow-blue-500/10 space-y-6 relative overflow-hidden ring-1 ring-blue-500/30">
        {/* Top colored accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-rose-600" />

        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-xs">
              {selectedSeason.months}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {selectedSeason.seasonName} ({selectedSeason.tamilName})
            </h3>
            <p className="text-xs text-slate-600 font-bold mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              Focus Districts: {selectedSeason.targetDistricts}
            </p>
          </div>

          <div className="bg-blue-50/90 p-4 rounded-2xl border-2 border-blue-200 max-w-sm text-xs space-y-1 shadow-2xs">
            <span className="font-extrabold text-blue-950 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-700" />
              Water &amp; Monsoon Advisory
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              {selectedSeason.waterAdvisory}
            </p>
          </div>
        </div>

        {/* Recommended Crops Cards (Alternating Blue & Red Cards) */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span>TNAU High-Yield Varietal Recommendations</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
              {selectedSeason.recommendedCrops.length} Varieties
            </span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedSeason.recommendedCrops.map((c, idx) => {
              const isBlueCard = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border-2 space-y-2.5 flex flex-col justify-between shadow-xs transition-all ${
                    isBlueCard
                      ? 'bg-blue-50/70 border-blue-300/80 hover:border-blue-400'
                      : 'bg-rose-50/70 border-rose-300/80 hover:border-rose-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900 text-sm">{c.crop}</span>
                      <span
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center text-white ${
                          isBlueCard ? 'bg-blue-600' : 'bg-rose-600'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    </div>
                    <p className={`text-xs font-bold mt-1 ${isBlueCard ? 'text-blue-800' : 'text-rose-800'}`}>
                      Varieties: {c.variety}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-1 text-slate-600 font-bold text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Duration: {c.duration}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium leading-normal bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      💡 {c.specialTip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-Crop Rotation Cycle (Rich Royal Blue Gradient Slide) */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 space-y-2 text-xs border border-blue-500/30 shadow-md">
          <div className="flex items-center gap-2 text-sky-300 font-bold">
            <Sprout className="w-4 h-4" />
            <span>Optimal 3-Crop Sustainable Rotation Cycle for {district.nameEn}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-300">
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-700/60">
              <span className="text-sky-300 font-bold block mb-0.5">Stage 1: Kuruvai (June)</span>
              <p className="text-[11px] text-blue-100">Short duration paddy (ADT 43) utilizing canal release.</p>
            </div>
            <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800/60">
              <span className="text-rose-300 font-bold block mb-0.5">Stage 2: Thaladi (Oct)</span>
              <p className="text-[11px] text-rose-100">Medium duration paddy (CR 1009) with NE Monsoon rainwater.</p>
            </div>
            <div className="bg-blue-900/60 p-3 rounded-xl border border-blue-700/60">
              <span className="text-sky-300 font-bold block mb-0.5">Stage 3: Rice Fallow (Feb)</span>
              <p className="text-[11px] text-blue-100">Black gram (VBN 8) broadcast on standing paddy 10 days before harvest to restore soil nitrogen.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
