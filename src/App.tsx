import React, { useState } from 'react';
import {
  Mic,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DistrictInfo, Language } from './types';
import { TN_DISTRICTS } from './data/agriData';
import { Header } from './components/Header';
import { ConnectivityBanner } from './components/ConnectivityBanner';
import { HeroBanner } from './components/HeroBanner';
import { WeatherSidebar } from './components/WeatherSidebar';
import { LeftCategoryNavigation, CATEGORY_ITEMS } from './components/LeftCategoryNavigation';
import { CropAdvisoryTab } from './components/CropAdvisoryTab';
import { SmartIrrigationTab } from './components/SmartIrrigationTab';
import { DiseaseScannerTab } from './components/DiseaseScannerTab';
import { SeasonalCalendarTab } from './components/SeasonalCalendarTab';
import { AgriMitraAITab } from './components/AgriMitraAITab';
import { MarketPricesTab } from './components/MarketPricesTab';
import { B2BMarketplaceTab } from './components/B2BMarketplaceTab';
import { IoTTelemetryDashboard } from './components/IoTTelemetryDashboard';
import { SchemeEligibilityFinder } from './components/SchemeEligibilityFinder';
import { YieldPredictorTab } from './components/YieldPredictorTab';
import { FarmerProfileTab } from './components/FarmerProfileTab';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { LoginModal } from './components/LoginModal';
import { FarmerDrawnWatermark } from './components/FarmerDrawnWatermark';
import { TamilVoiceModal } from './components/TamilVoiceModal';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(TN_DISTRICTS[0]); // Coimbatore default
  const { language, setLanguage, t, getDistrictName, getCategory } = useLanguage();
  const { user, isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('crop-advisory');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  // Browser path routing for /login and /signup
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/login' || path === '/signup') {
        return path;
      }
    }
    return '/';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path === '/login' || path === '/signup' ? path : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', path);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route: /login (for returning users)
  if (currentPath === '/login') {
    return <LoginPage onNavigate={navigate} />;
  }

  // If user is not yet verified, "Create Your Account" is the Home Dashboard
  // Once account verification is completed, user is populated and enters the Tamil Nadu Agricultural page
  if (!user) {
    return <SignupPage onNavigate={navigate} />;
  }

  // Explicit /signup route for an already authenticated user wanting to register another account
  if (currentPath === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  const handleNavigateFromVoice = (tabId: string) => {
    setActiveTab(tabId);
  };

  const currentIndex = CATEGORY_ITEMS.findIndex((c) => c.id === activeTab);
  const currentCategory = CATEGORY_ITEMS[currentIndex] || CATEGORY_ITEMS[0];
  const prevCategory = currentIndex > 0 ? CATEGORY_ITEMS[currentIndex - 1] : null;
  const nextCategory = currentIndex < CATEGORY_ITEMS.length - 1 ? CATEGORY_ITEMS[currentIndex + 1] : null;

  const currentCategoryLabel = getCategory(currentCategory.id).title;
  const prevCategoryLabel = prevCategory ? getCategory(prevCategory.id).title : '';
  const nextCategoryLabel = nextCategory ? getCategory(nextCategory.id).title : '';
  const districtName = getDistrictName(selectedDistrict);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col antialiased selection:bg-blue-200 relative overflow-x-hidden">
      {/* Hand-Drawn Dashboard Watermark (Farmer Plowing or Dam Reservoir) */}
      <FarmerDrawnWatermark activeTab={activeTab} />

      {/* Top Main Navigation Header */}
      <Header
        district={selectedDistrict}
        language={language}
        onSelectLanguage={setLanguage}
        onOpenLogin={openLoginModal}
        onNavigateTab={setActiveTab}
        onNavigatePath={navigate}
      />

      {/* Tamil Voice Assistant Hands-Free Modal */}
      <TamilVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        district={selectedDistrict}
        language={language}
        onNavigateTab={handleNavigateFromVoice}
      />

      {/* Google Mail Farmer Login & Account Creation Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onDistrictSelect={setSelectedDistrict}
        onNavigateTab={setActiveTab}
      />

      {/* Floating Bottom-Right Voice Assistant Action Button */}
      <button
        id="floating-tamil-voice-assistant-fab"
        onClick={() => setIsVoiceModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-900 text-white font-black text-xs shadow-2xl flex items-center gap-2.5 border-2 border-emerald-400/60 hover:scale-105 hover:shadow-emerald-900/50 transition-all cursor-pointer group animate-bounce duration-1000"
        title="Open Voice Assistant & Search (குரல் உதவி)"
      >
        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
          <Mic className="w-4 h-4" />
        </span>
        <div className="text-left pr-1">
          <span className="block text-[10px] text-emerald-200 font-extrabold uppercase tracking-wider">
            {t.handsFreeBadge}
          </span>
          <span className="text-xs font-black text-white">
            {t.voiceAssistantButton}
          </span>
        </div>
      </button>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1 relative z-10">
        {/* Connectivity / Satellite Telemetry Banner */}
        <ConnectivityBanner
          isOfflineMode={isOfflineMode}
          onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
          language={language}
        />

        {/* Hero Active Region Zone Banner */}
        <HeroBanner language={language} />

        {/* 2-Column Main Workspace with Step-by-Step Left Menu & Scrollable Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Categories Step-by-Step Menu & Weather Forecast */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6">
            {/* Step-by-Step Categories Left Menu */}
            <LeftCategoryNavigation
              activeTab={activeTab}
              language={language}
              onSelectTab={(tabId) => {
                setActiveTab(tabId);
                const detailEl = document.getElementById('details-scroll-container');
                if (detailEl) {
                  detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            />

            {/* Weather & Agro Forecast District Sidebar */}
            <WeatherSidebar
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />
          </div>

          {/* Right Column: Scrollable Details Workspace */}
          <div
            id="details-scroll-container"
            className="lg:col-span-8 xl:col-span-8 space-y-5"
          >
            {/* Active Category Header Bar with Step Navigation */}
            <div
              id="active-category-header"
              className="w-full bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-xs">
                  {currentCategory.stepNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {currentCategoryLabel}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                      {currentCategory.tag}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {currentCategory.tamilLabel} • {districtName} ({selectedDistrict.zone})
                  </p>
                </div>
              </div>

              {/* Step Navigation Controls (Prev / Next) */}
              <div className="flex items-center gap-2">
                {prevCategory && (
                  <button
                    id="prev-step-category-btn"
                    onClick={() => setActiveTab(prevCategory.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200/80"
                    title={`Previous Step: ${prevCategoryLabel}`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.stepProgress} {prevCategory.stepNumber}</span>
                  </button>
                )}
                {nextCategory && (
                  <button
                    id="next-step-category-btn"
                    onClick={() => setActiveTab(nextCategory.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                    title={`Next Step: ${nextCategoryLabel}`}
                  >
                    <span>{t.nextStep}: {nextCategoryLabel}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Details View (Scrollable Container) */}
            <div
              id="category-details-view"
              className="transition-all duration-200"
            >
              {activeTab === 'crop-advisory' && (
                <CropAdvisoryTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {activeTab === 'smart-irrigation' && (
                <SmartIrrigationTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {activeTab === 'disease-scanner' && (
                <DiseaseScannerTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {activeTab === 'seasonal-calendar' && (
                <SeasonalCalendarTab district={selectedDistrict} />
              )}

              {activeTab === 'agri-mitra-ai' && (
                <AgriMitraAITab
                  district={selectedDistrict}
                  language={language}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {activeTab === 'mandi-prices' && (
                <MarketPricesTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {activeTab === 'iot-telemetry' && (
                <IoTTelemetryDashboard currentDistrict={selectedDistrict} />
              )}

              {activeTab === 'scheme-finder' && (
                <SchemeEligibilityFinder currentDistrict={selectedDistrict} />
              )}

              {activeTab === 'yield-predictor' && (
                <YieldPredictorTab currentDistrict={selectedDistrict} />
              )}

              {activeTab === 'b2b-marketplace' && (
                <B2BMarketplaceTab
                  selectedDistrict={selectedDistrict.nameEn}
                  onDistrictSelect={(dName) => {
                    const found = TN_DISTRICTS.find(
                      (d) => d.nameEn.toLowerCase() === dName.toLowerCase()
                    );
                    if (found) setSelectedDistrict(found);
                  }}
                />
              )}

              {activeTab === 'farmer-account' && (
                <FarmerProfileTab
                  onDistrictSelect={setSelectedDistrict}
                  onNavigateTab={setActiveTab}
                />
              )}
            </div>

            {/* Bottom Step Advancement Bar */}
            <div className="w-full bg-slate-50 rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-500">
                {t.currentStep}: <strong className="text-slate-900">{currentCategory.stepNumber}. {currentCategoryLabel}</strong>
              </span>
              <div className="flex items-center gap-2">
                {prevCategory && (
                  <button
                    onClick={() => setActiveTab(prevCategory.id)}
                    className="font-bold text-slate-700 hover:text-slate-900 underline cursor-pointer"
                  >
                    ← {prevCategoryLabel}
                  </button>
                )}
                {prevCategory && nextCategory && <span>•</span>}
                {nextCategory && (
                  <button
                    onClick={() => setActiveTab(nextCategory.id)}
                    className="font-black text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                  >
                    {t.nextStep}: {nextCategoryLabel} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4 px-4 sm:px-8 mt-12 text-xs text-slate-500 text-center flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Tamil Nadu Agricultural Decision Support System</span>
          <span>•</span>
          <span>In technical alignment with TNAU &amp; Department of Agriculture</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          Telemetry Feed: 38 Districts Synchronized • Build v3.5
        </div>
      </footer>
    </div>
  );
}

