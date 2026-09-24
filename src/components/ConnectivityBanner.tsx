import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ConnectivityBannerProps {
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  language?: Language;
}

export const ConnectivityBanner: React.FC<ConnectivityBannerProps> = ({
  isOfflineMode,
  onToggleOfflineMode,
}) => {
  const { language, isTamil } = useLanguage();

  return (
    <>
      {/* ============================================================== */}
      {/* MOBILE / TABLET (<1280px): Ultra-Compact Slim Indicator        */}
      {/* Visually secondary, takes minimal ~32px vertical space         */}
      {/* ============================================================== */}
      <div
        id="connectivity-banner-mobile"
        className="block xl:hidden w-full bg-slate-100/90 border border-slate-200/90 rounded-xl px-3 py-1.5 transition-all text-xs"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOfflineMode ? 'bg-amber-500' : 'bg-emerald-600 animate-pulse'
              }`}
            />
            <span className="font-semibold text-slate-700 truncate text-[11px] sm:text-xs">
              {isOfflineMode
                ? (isTamil ? 'உள்ளூர் முறை (ஆஃப்லைன் தயார்)' : 'Offline Cached Mode')
                : (isTamil ? 'இணைய இணைப்பு: செயல்பாட்டில் உள்ளது' : 'Online: Live Data Connected')}
            </span>
          </div>

          <button
            onClick={onToggleOfflineMode}
            className="text-[10px] font-bold text-slate-600 hover:text-emerald-800 bg-white px-2 py-1 rounded-md border border-slate-200 cursor-pointer shrink-0 min-h-[32px] flex items-center"
          >
            {isOfflineMode
              ? (isTamil ? 'மீண்டும் ஆன்லைன்' : 'Go Online')
              : (isTamil ? 'ஆஃப்லைன் சோதனை' : 'Test Offline')}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP (>=1280px): Clean, Non-Technical Status Bar            */}
      {/* ============================================================== */}
      <div
        id="connectivity-banner-desktop"
        className="hidden xl:flex w-full bg-white rounded-2xl border border-slate-200/90 px-5 py-3 shadow-2xs items-center justify-between gap-4 transition-all"
      >
        {/* Left Icon & Text */}
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              isOfflineMode
                ? 'bg-amber-100 text-amber-700'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                {isOfflineMode
                  ? (isTamil ? 'நிலை: உள்ளூர் சேமிப்பு முறை (ஆஃப்லைன் தயார்)' : 'Status: Local Cached Mode Active')
                  : (isTamil ? 'நிலை: இணைய இணைப்பு செயல்பாட்டில் உள்ளது' : 'Status: Online (Live Data Connected)')}
              </h3>
              {!isOfflineMode && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isOfflineMode
                ? (isTamil ? 'முன்பதிவு செய்யப்பட்ட பயிர் பரிந்துரைகள் & உள்ளூர் சந்தை விவரங்கள் பயன்பாட்டில் உள்ளன.' : 'Serving cached TNAU advisory rules, local calculators, and stored mandi records.')
                : (isTamil ? 'TNAU வழிகாட்டுதல்கள் மற்றும் தமிழ்நாடு சந்தை விலை நேரடி ஒத்திசைவு.' : 'Direct data synchronization enabled for Tamil Nadu mandis, reservoirs, and TNAU advisories.')}
            </p>
          </div>
        </div>

        {/* Right Toggle Switch */}
        <div className="flex items-center gap-2.5">
          <label
            htmlFor="offline-toggle"
            className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
          >
            {isTamil ? 'ஆஃப்லைன் பயன்முறை' : 'Offline Mode'}
          </label>
          <button
            id="offline-toggle"
            role="switch"
            aria-checked={isOfflineMode}
            onClick={onToggleOfflineMode}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer min-h-[32px] ${
              isOfflineMode ? 'bg-amber-600' : 'bg-slate-300'
            }`}
            title="Toggle Offline Mode"
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                isOfflineMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </>
  );
};
