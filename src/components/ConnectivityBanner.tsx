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
  const { language } = useLanguage();

  const titleMap: Record<Language, { online: string; offline: string }> = {
    en: {
      online: 'Status: Online (High-Speed Satellite Connected)',
      offline: 'Status: Low-Connectivity (Local Cached Mode Active)',
    },
    ta: {
      online: 'நிலை: அதிவேக செயற்கைக்கோள் நேரடி இணைப்பு',
      offline: 'நிலை: இணையமற்ற உள்ளூர் பயன்முறை (ஆஃப்லைன் தயார்)',
    },
    hi: {
      online: 'स्थिति: ऑनलाइन (हाई-स्पीड सैटेलाइट कनेक्टेड)',
      offline: 'स्थिति: कम-इंटरनेट (स्थानीय कैश्ड मोड सक्रिय)',
    },
    te: {
      online: 'స్థితి: ఆన్‌లైన్ (హై-స్పీడ్ శాటిలైట్ కనెక్ట్ అయింది)',
      offline: 'స్థితి: తక్కువ కనెక్టివిటీ (లోకల్ క్యాష్డ్ మోడ్ యాక్టివ్)',
    },
    bn: {
      online: 'স্থিতি: অনলাইন (উচ্চ গতির উপগ্রহ সংযুক্ত)',
      offline: 'স্থিতি: কম-সংযোগ (স্থানীয় ক্যাশড মোড সক্রিয়)',
    },
  };

  const subtitleMap: Record<Language, { online: string; offline: string }> = {
    en: {
      online: 'Continuous synchronization enabled with TN Agri Cloud Hub & TNAU Telemetry.',
      offline: 'Serving pre-cached TNAU crop rules, local soil calculators, and stored mandi data.',
    },
    ta: {
      online: 'TNAU மற்றும் தமிழ்நாடு வேளாண் மையத்துடன் நேரடி தானியங்கி ஒத்திசைவு செயலில் உள்ளது.',
      offline: 'முன்பதிவு செய்யப்பட்ட தமிழ்நாடு வேளாண் பல்கலைக்கழக பரிந்துரைகள் & உள்ளூர் சந்தை விவரங்கள் பயன்பாட்டில் உள்ளன.',
    },
    hi: {
      online: 'तमिलनाडु कृषि क्लाउड हब और टीएनएयू टेलीमेट्री के साथ लाइव सिंक्रोनाइज़ेशन सक्रिय।',
      offline: 'टीएनएयू फसल नियम, स्थानीय मिट्टी कैलकुलेटर और मंडी डेटा ऑफ़लाइन उपलब्ध हैं।',
    },
    te: {
      online: 'తమిళనాడు అగ్రి క్లౌడ్ హబ్ & TNAU టెలిమెట్రీతో లైవ్ సమకాలీకరణ సక్రియం.',
      offline: 'ముందుగా నిల్వ చేసిన TNAU పంట నియమాలు, స్థానిక నేల కాలిక్యులేటర్ మరియు మండి డేటా అందుబాటులో ఉన్నాయి.',
    },
    bn: {
      online: 'তামিলনাড়ু এগ্রি ক্লাউড হাব এবং টিএনএইউ টেলিমেট্রির সাথে লাইভ সিঙ্ক সক্রিয়।',
      offline: 'সংরক্ষিত TNAU ফসলের নিয়ম, স্থানীয় মাটির ক্যালকুলেটর এবং মান্ডি ডেটা উপলব্ধ।',
    },
  };

  const toggleLabelMap: Record<Language, string> = {
    en: 'Simulate Low-Connectivity (Offline Mode)',
    ta: 'இணையமற்ற பயன்முறை (ஆஃப்லைன் சோதனை)',
    hi: 'कम-इंटरनेट अनुकरण (ऑफ़लाइन मोड)',
    te: 'తక్కువ కనెక్టివిటీని అనుకరించండి (ఆఫ్‌లైన్ మోడ్)',
    bn: 'কম-সংযোগ পরীক্ষা করুন (অফলাইন মোড)',
  };

  const currentTitle = titleMap[language] || titleMap.en;
  const currentSubtitle = subtitleMap[language] || subtitleMap.en;
  const toggleLabel = toggleLabelMap[language] || toggleLabelMap.en;

  return (
    <div
      id="connectivity-banner"
      className="w-full bg-white rounded-2xl border border-slate-200/90 p-4 sm:px-6 sm:py-4 shadow-xs flex flex-wrap items-center justify-between gap-4 transition-all"
    >
      {/* Left Icon & Text */}
      <div className="flex items-center gap-3.5">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isOfflineMode
              ? 'bg-amber-100 text-amber-700 ring-4 ring-amber-50'
              : 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50'
          }`}
        >
          {isOfflineMode ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isOfflineMode ? currentTitle.offline : currentTitle.online}
            </h3>
            {!isOfflineMode && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {isOfflineMode ? currentSubtitle.offline : currentSubtitle.online}
          </p>
        </div>
      </div>

      {/* Right Toggle Switch */}
      <div className="flex items-center gap-3 self-end sm:self-center">
        <label
          htmlFor="offline-toggle"
          className="text-xs font-semibold text-slate-600 cursor-pointer select-none"
        >
          {toggleLabel}
        </label>
        <button
          id="offline-toggle"
          role="switch"
          aria-checked={isOfflineMode}
          onClick={onToggleOfflineMode}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
            isOfflineMode ? 'bg-amber-600' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              isOfflineMode ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
