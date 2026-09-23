import React from 'react';
import {
  Sun,
  MapPin,
  Droplets,
  CloudRain,
  Wind,
  Layers,
  Waves,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { DistrictInfo, Language } from '../types';
import { TN_DISTRICTS } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface WeatherSidebarProps {
  selectedDistrict: DistrictInfo;
  onSelectDistrict: (district: DistrictInfo) => void;
  language?: Language;
}

export const WeatherSidebar: React.FC<WeatherSidebarProps> = ({
  selectedDistrict,
  onSelectDistrict,
}) => {
  const { t, getDistrictName, language } = useLanguage();

  const quickDistrictIds = [
    'thanjavur',
    'coimbatore',
    'madurai',
    'salem',
    'cuddalore',
    'nilgiris',
    'kanniyakumari',
  ];

  // Group districts by zone for clean categorized selection
  const zones = Array.from(new Set(TN_DISTRICTS.map((d) => d.zone)));

  const dayLabelMap: Record<Language, string[]> = {
    en: ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5'],
    ta: ['இன்று', 'நாளை', 'நாள் 3', 'நாள் 4', 'நாள் 5'],
    hi: ['आज', 'कल', 'दिन 3', 'दिन 4', 'दिन 5'],
    te: ['నేడు', 'రేపు', 'రోజు 3', 'రోజు 4', 'రోజు 5'],
    bn: ['আজ', 'আগামীকাল', 'দিন ৩', 'দিন ৪', 'দিন ৫'],
  };

  const dayLabels = dayLabelMap[language] || dayLabelMap.en;
  const currentDistrictName = getDistrictName(selectedDistrict);

  return (
    <aside
      id="weather-agro-forecast-sidebar"
      className="w-full bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col gap-5"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-tight">
            {t.weatherTitle} ({currentDistrictName})
          </h3>
        </div>
        <span className="shrink-0 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/80">
          {selectedDistrict.airLinkCode}
        </span>
      </div>

      {/* Location Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="district-location-select"
            className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            {t.all38Districts}
          </label>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            38/38 {t.activeStatus}
          </span>
        </div>

        {/* Dropdown with Optgroups */}
        <select
          id="district-location-select"
          value={selectedDistrict.id}
          onChange={(e) => {
            const found = TN_DISTRICTS.find((d) => d.id === e.target.value);
            if (found) onSelectDistrict(found);
          }}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
        >
          {zones.map((zoneName) => {
            const districtsInZone = TN_DISTRICTS.filter((d) => d.zone === zoneName);
            return (
              <optgroup key={zoneName} label={`📍 ${zoneName} (${districtsInZone.length})`}>
                {districtsInZone.map((d) => (
                  <option key={d.id} value={d.id}>
                    {getDistrictName(d)} ({d.nameEn})
                  </option>
                ))}
              </optgroup>
            );
          })}
        </select>

        {/* Quick selection chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {quickDistrictIds.map((dId) => {
            const d = TN_DISTRICTS.find((district) => district.id === dId);
            if (!d) return null;
            const isSelected = selectedDistrict.id === dId;
            return (
              <button
                key={dId}
                id={`quick-district-${dId}`}
                onClick={() => onSelectDistrict(d)}
                className={`px-2.5 py-1 text-[11px] rounded-lg font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {getDistrictName(d)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Big Temperature & Condition Display */}
      <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-100/80">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tighter">
            {selectedDistrict.currentTemp}°C
          </span>
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-800">
            {selectedDistrict.condition}
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {selectedDistrict.zone} • <span className="font-semibold text-slate-700">{currentDistrictName}</span>
        </p>
      </div>

      {/* 4-Grid Metrics */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {t.humidityLabel}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-slate-900">{selectedDistrict.humidity}%</span>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {t.rainLabel}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-slate-900">{selectedDistrict.rainMm} mm</span>
            <CloudRain className="w-4 h-4 text-indigo-500" />
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {t.windLabel}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-slate-900">{selectedDistrict.windSpeed} km/h</span>
            <Wind className="w-4 h-4 text-teal-500" />
          </div>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
            {t.soilMoistureLabel}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-lg font-black text-slate-900">{selectedDistrict.soilMoisture}%</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Reservoir / Canal Water Telemetry (Vibrant Royal Blue Slide) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-4 border border-blue-500/40 space-y-2 shadow-md">
        <div className="flex items-center justify-between text-xs font-bold text-sky-200">
          <span className="flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-sky-400" />
            {t.canalStatusTitle}
          </span>
          <span className="text-[11px] bg-blue-500/30 text-sky-200 border border-blue-400/40 px-2 py-0.5 rounded-full font-black">
            {t.canalStatusValue}
          </span>
        </div>
        <div className="w-full bg-blue-950 h-2 rounded-full overflow-hidden border border-blue-800">
          <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-full rounded-full w-[93%]" />
        </div>
        <p className="text-[11px] text-blue-100 leading-snug">
          {selectedDistrict.zone.includes('Delta')
            ? (language === 'ta'
                ? 'கல்லணை நீர் திறப்பு: 12,000 கனஅடி. குறுவை / சம்பா சாகுபடிக்கு கால்வாய் பாசனம் திறந்துவிடப்பட்டுள்ளது.'
                : 'Grand Anicut (Kallanai) discharge: 12,000 cusecs. Canal irrigation open for Kuruvai / Samba.')
            : (language === 'ta'
                ? `${currentDistrictName} பாசன ஏரிகள் மற்றும் கண்மாய்களுக்கு நீர்வரத்து சீராக உள்ளது.`
                : `Water discharge normal for ${selectedDistrict.nameEn} basin tanks and micro-reservoirs.`)}
        </p>
      </div>

      {/* 5-Day Forecast Strip */}
      <div className="space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          {t.forecast5DayTitle}
        </span>
        <div className="grid grid-cols-5 gap-1 text-center">
          {[
            { day: dayLabels[0], temp: `${selectedDistrict.currentTemp}°`, rain: `${selectedDistrict.rainMm > 5 ? '60%' : '20%'}` },
            { day: dayLabels[1], temp: `${selectedDistrict.currentTemp + 1}°`, rain: '30%' },
            { day: dayLabels[2], temp: `${selectedDistrict.currentTemp - 1}°`, rain: '45%' },
            { day: dayLabels[3], temp: `${selectedDistrict.currentTemp}°`, rain: '15%' },
            { day: dayLabels[4], temp: `${selectedDistrict.currentTemp + 2}°`, rain: '10%' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-1.5 text-xs">
              <span className="block text-[10px] font-semibold text-slate-500 truncate">{item.day}</span>
              <span className="block font-black text-slate-900 text-xs my-0.5">{item.temp}</span>
              <span className="block text-[9px] font-bold text-blue-600">{item.rain}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TNAU Agro-Advisory Bulletin (Ruby Red Alert Slide) */}
      <div className="bg-gradient-to-br from-rose-950 via-red-950 to-slate-950 text-white rounded-2xl p-4 text-xs space-y-1.5 shadow-md border border-rose-500/40">
        <div className="flex items-center gap-1.5 text-rose-300 font-bold">
          <AlertCircle className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>{t.advisoryAlertTitle}</span>
        </div>
        <p className="text-rose-100 leading-relaxed text-[11px]">
          {language === 'ta'
            ? `${currentDistrictName} மாவட்ட விவசாயிகளுக்கு: மண் வெப்பநிலை சாதகமாக உள்ளது. முக்கிய நில உழவுக்கு முன் ஏக்கருக்கு 2 கிலோ அசோஸ்பைரில்லம் மற்றும் பாஸ்போபாக்டீரியா இடுவது சிறந்தது.`
            : `Soil temperatures in ${selectedDistrict.nameEn} are optimal. Apply biofertilizers Azospirillum and Phosphobacteria at 2kg/acre before main field preparation.`}
        </p>
      </div>
    </aside>
  );
};
