import React, { useState } from 'react';
import {
  Mic,
  ChevronLeft,
  ChevronRight,
  Sprout,
  TrendingUp,
  Droplets,
  ShieldCheck,
  Store,
  Users,
} from 'lucide-react';
import { DistrictInfo } from './types';
import { TN_DISTRICTS } from './data/agriData';
import { Header } from './components/Header';
import { ConnectivityBanner } from './components/ConnectivityBanner';
import { HeroBanner } from './components/HeroBanner';
import { WeatherSidebar } from './components/WeatherSidebar';
import {
  LeftCategoryNavigation,
  FARMER_HUBS,
  findHubByTabId,
} from './components/LeftCategoryNavigation';
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
import { FarmWorkerProcessTab } from './components/FarmWorkerProcessTab';
import { SmartFreightMatchingTab } from './components/SmartFreightMatchingTab';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { LoginModal } from './components/LoginModal';
import { FarmerDrawnWatermark } from './components/FarmerDrawnWatermark';
import { TamilVoiceModal } from './components/TamilVoiceModal';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(TN_DISTRICTS[0]); // Coimbatore default
  const { language, setLanguage, getDistrictName, isTamil } = useLanguage();
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useAuth();
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('disease-scanner');
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

  // Explicit /signup route
  if (currentPath === '/signup') {
    return <SignupPage onNavigate={navigate} />;
  }

  // Normalize aliases
  const effectiveActiveTab =
    activeTab === 'crop-doctor'
      ? 'disease-scanner'
      : activeTab === 'farm-labor'
      ? 'farm-worker'
      : activeTab;

  const handleNavigateFromVoice = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Current Hub calculation
  const currentHub = findHubByTabId(effectiveActiveTab);
  const currentHubIndex = FARMER_HUBS.findIndex((h) => h.id === currentHub.id);
  const prevHub = currentHubIndex > 0 ? FARMER_HUBS[currentHubIndex - 1] : null;
  const nextHub = currentHubIndex < FARMER_HUBS.length - 1 ? FARMER_HUBS[currentHubIndex + 1] : null;

  // Active sub-item info
  const activeSubItem = currentHub.subItems.find((s) => s.id === effectiveActiveTab) || currentHub.subItems[0];
  const activeToolTitle = isTamil ? activeSubItem.labelTa : activeSubItem.labelEn;
  const activeToolDesc = isTamil ? activeSubItem.descTa : activeSubItem.descEn;
  const hubTitle = isTamil ? currentHub.titleTa : currentHub.titleEn;
  const districtName = getDistrictName(selectedDistrict);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col antialiased selection:bg-emerald-200 relative overflow-x-hidden">
      {/* Hand-Drawn Dashboard Watermark (Farmer Plowing - subtle 8% opacity) */}
      <FarmerDrawnWatermark activeTab={effectiveActiveTab} />

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

      {/* Desktop-Only Floating Voice Assistant Button (Hidden on Mobile to Prevent Overlapping) */}
      <button
        id="desktop-floating-voice-assistant-fab"
        onClick={() => setIsVoiceModalOpen(true)}
        className="hidden xl:flex fixed bottom-8 right-8 z-40 px-4 py-3 rounded-full bg-[#1B5E20] hover:bg-[#144718] text-white font-extrabold text-xs shadow-xl items-center gap-2.5 border border-emerald-400/50 hover:shadow-2xl transition-all cursor-pointer group active:scale-95"
        title="குரல் உதவி / Tamil Voice Assistant"
        aria-label="குரல் உதவி / Tamil Voice Assistant"
      >
        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <Mic className="w-4 h-4" />
        </span>
        <div className="text-left pr-1">
          <span className="block text-[10px] text-emerald-200 font-extrabold uppercase tracking-wider">
            {isTamil ? 'குரல் வழி உதவி' : 'Hands-Free Voice'}
          </span>
          <span className="text-xs font-black text-white">
            {isTamil ? 'பேசி அறியவும்' : 'Tamil Voice Copilot'}
          </span>
        </div>
      </button>

      {/* Main Container - P0 Mobile First-Viewport Optimized */}
      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-3 sm:space-y-5 flex-1 relative z-10 pb-28 xl:pb-12">
        {/* Compact Status Indicator (Collapsed on mobile, slim on desktop) */}
        <ConnectivityBanner
          isOfflineMode={isOfflineMode}
          onToggleOfflineMode={() => setIsOfflineMode(!isOfflineMode)}
          language={language}
        />

        {/* Hero Contextual Strip on Mobile / Clean Banner on Desktop */}
        <HeroBanner language={language} district={selectedDistrict} />

        {/* 2-Column Desktop (>=1280px) & 1-Column Responsive Mobile/Tablet (<1280px) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Hubs Navigation & Weather Forecast */}
          <div className="xl:col-span-4 space-y-4 sm:space-y-5">
            {/* 6 Farmer Hubs Navigation with 'What can I do here?' discovery */}
            <LeftCategoryNavigation
              activeTab={effectiveActiveTab}
              language={language}
              onSelectTab={(tabId) => {
                setActiveTab(tabId);
                const detailEl = document.getElementById('details-scroll-container');
                if (detailEl) {
                  detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            />

            {/* Weather & Agro Forecast District Sidebar (Desktop-only in sidebar) */}
            <div className="hidden xl:block">
              <WeatherSidebar
                selectedDistrict={selectedDistrict}
                onSelectDistrict={setSelectedDistrict}
              />
            </div>
          </div>

          {/* Operational Details Workspace */}
          <div
            id="details-scroll-container"
            className="xl:col-span-8 space-y-4 sm:space-y-5"
          >
            {/* Contextual Workspace Header (No linear step wizard language) */}
            <div
              id="active-category-header"
              className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-3.5 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-xs shrink-0">
                  {React.createElement(currentHub.icon, { className: 'w-5 h-5 text-emerald-200' })}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      {activeToolTitle}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shrink-0">
                      {hubTitle}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
                    {activeToolDesc} • <strong className="text-slate-700">{districtName}</strong> ({selectedDistrict.zone})
                  </p>
                </div>
              </div>

              {/* Contextual Hub Switcher (Farmer-friendly navigation) */}
              <div className="flex items-center gap-2 shrink-0">
                {prevHub && (
                  <button
                    id="prev-hub-btn"
                    onClick={() => setActiveTab(prevHub.defaultTabId)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200/80 min-h-[44px]"
                    title={isTamil ? prevHub.titleTa : prevHub.titleEn}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {isTamil ? prevHub.titleTa : prevHub.titleEn}
                    </span>
                  </button>
                )}
                {nextHub && (
                  <button
                    id="next-hub-btn"
                    onClick={() => setActiveTab(nextHub.defaultTabId)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-white bg-[#1B5E20] hover:bg-[#144718] transition-all shadow-xs cursor-pointer min-h-[44px]"
                    title={isTamil ? nextHub.titleTa : nextHub.titleEn}
                  >
                    <span>{isTamil ? nextHub.titleTa : nextHub.titleEn}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Workspace View */}
            <div
              id="category-details-view"
              className="transition-all duration-200"
            >
              {/* Hub 1: Crop Doctor & Advisory */}
              {effectiveActiveTab === 'disease-scanner' && (
                <DiseaseScannerTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {effectiveActiveTab === 'crop-advisory' && (
                <CropAdvisoryTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {effectiveActiveTab === 'seasonal-calendar' && (
                <SeasonalCalendarTab district={selectedDistrict} />
              )}

              {effectiveActiveTab === 'yield-predictor' && (
                <YieldPredictorTab currentDistrict={selectedDistrict} />
              )}

              {effectiveActiveTab === 'agri-mitra-ai' && (
                <AgriMitraAITab
                  district={selectedDistrict}
                  language={language}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {/* Hub 2: Mandi Market */}
              {effectiveActiveTab === 'mandi-prices' && (
                <MarketPricesTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {/* Hub 3: Water & Reservoirs */}
              {effectiveActiveTab === 'smart-irrigation' && (
                <SmartIrrigationTab
                  district={selectedDistrict}
                  isOfflineMode={isOfflineMode}
                />
              )}

              {effectiveActiveTab === 'iot-telemetry' && (
                <IoTTelemetryDashboard currentDistrict={selectedDistrict} />
              )}

              {/* Hub 4: Subsidies & Insurance */}
              {effectiveActiveTab === 'scheme-finder' && (
                <SchemeEligibilityFinder currentDistrict={selectedDistrict} />
              )}

              {/* Hub 5: Sell Harvest & Transport */}
              {effectiveActiveTab === 'b2b-marketplace' && (
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

              {effectiveActiveTab === 'smart-freight' && (
                <SmartFreightMatchingTab
                  currentDistrict={selectedDistrict}
                  onDistrictSelect={(dName) => {
                    const found = TN_DISTRICTS.find(
                      (d) => d.nameEn.toLowerCase() === dName.toLowerCase()
                    );
                    if (found) setSelectedDistrict(found);
                  }}
                />
              )}

              {/* Hub 6: Farm Labor & Wages */}
              {effectiveActiveTab === 'farm-worker' && (
                <FarmWorkerProcessTab
                  currentDistrict={selectedDistrict}
                  language={language}
                />
              )}

              {/* Secondary: Farm Profile & Account */}
              {effectiveActiveTab === 'farmer-account' && (
                <FarmerProfileTab
                  onDistrictSelect={setSelectedDistrict}
                  onNavigateTab={setActiveTab}
                />
              )}
            </div>

            {/* Bottom Hub Navigator (Contextual, No "Step 01 of 11") */}
            <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 flex items-center justify-between gap-3 text-xs text-slate-600 shadow-2xs">
              <span className="font-semibold text-slate-500">
                {isTamil ? 'வேளாண் சேவை மையம்' : 'Agricultural Hub'}:{' '}
                <strong className="text-slate-900">
                  {currentHub.hubNumber}. {hubTitle}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                {prevHub && (
                  <button
                    onClick={() => setActiveTab(prevHub.defaultTabId)}
                    className="font-bold text-slate-700 hover:text-emerald-800 underline cursor-pointer min-h-[44px] flex items-center px-1"
                  >
                    ← {isTamil ? prevHub.titleTa : prevHub.titleEn}
                  </button>
                )}
                {prevHub && nextHub && <span>•</span>}
                {nextHub && (
                  <button
                    onClick={() => setActiveTab(nextHub.defaultTabId)}
                    className="font-black text-[#1B5E20] hover:text-emerald-800 underline cursor-pointer min-h-[44px] flex items-center px-1"
                  >
                    {isTamil ? nextHub.titleTa : nextHub.titleEn} →
                  </button>
                )}
              </div>
            </div>

            {/* Mobile/Tablet Secondary Weather Section (Positioned below the active tool workspace) */}
            <div className="block xl:hidden pt-4 border-t border-slate-200/80">
              <WeatherSidebar
                selectedDistrict={selectedDistrict}
                onSelectDistrict={setSelectedDistrict}
              />
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================== */}
      {/* MOBILE STICKY BOTTOM BAR WITH INTEGRATED VOICE ASSISTANT ACTION */}
      {/* Target: [Doctor] [Mandi] [🎤 Voice] [Water] [Sell] [Labor]     */}
      {/* Zero overlap of active tab forms or buttons                   */}
      {/* ============================================================== */}
      <nav
        id="mobile-sticky-bottom-bar"
        aria-label="Quick Action Bottom Bar"
        className="xl:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1.5 py-1.5 flex items-center justify-around shadow-lg"
      >
        {/* Hub 1: Crop Doctor */}
        <button
          onClick={() => setActiveTab('disease-scanner')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl min-w-[50px] min-h-[48px] transition-colors cursor-pointer ${
            currentHub.id === 'crop-doctor-hub' ? 'text-[#1B5E20] font-black' : 'text-slate-500'
          }`}
          title={isTamil ? 'பயிர் மருத்துவர்' : 'Crop Doctor'}
        >
          <Sprout className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {isTamil ? 'மருத்துவர்' : 'Doctor'}
          </span>
        </button>

        {/* Hub 2: Mandi */}
        <button
          onClick={() => setActiveTab('mandi-prices')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl min-w-[50px] min-h-[48px] transition-colors cursor-pointer ${
            currentHub.id === 'mandi-market-hub' ? 'text-[#1B5E20] font-black' : 'text-slate-500'
          }`}
          title={isTamil ? 'சந்தை நிலவரம்' : 'Mandi'}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {isTamil ? 'சந்தை' : 'Mandi'}
          </span>
        </button>

        {/* Integrated Dedicated Voice Action in Bottom Bar */}
        <button
          id="mobile-bottom-bar-voice-action"
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex flex-col items-center justify-center p-1 rounded-2xl min-w-[54px] min-h-[48px] bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all cursor-pointer active:scale-95 mx-0.5"
          title={isTamil ? 'குரல் உதவி' : 'Voice Assistant'}
          aria-label={isTamil ? 'குரல் உதவி' : 'Voice Assistant'}
        >
          <Mic className="w-5 h-5 text-emerald-200" />
          <span className="text-[10px] font-black mt-0.5 text-white">
            {isTamil ? 'குரல்' : 'Voice'}
          </span>
        </button>

        {/* Hub 3: Water */}
        <button
          onClick={() => setActiveTab('smart-irrigation')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl min-w-[50px] min-h-[48px] transition-colors cursor-pointer ${
            currentHub.id === 'water-hub' ? 'text-[#1B5E20] font-black' : 'text-slate-500'
          }`}
          title={isTamil ? 'அணை & பாசனம்' : 'Water'}
        >
          <Droplets className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {isTamil ? 'பாசனம்' : 'Water'}
          </span>
        </button>

        {/* Hub 5: Sell Harvest */}
        <button
          onClick={() => setActiveTab('b2b-marketplace')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl min-w-[50px] min-h-[48px] transition-colors cursor-pointer ${
            currentHub.id === 'sell-transport-hub' ? 'text-[#1B5E20] font-black' : 'text-slate-500'
          }`}
          title={isTamil ? 'விளைபொருள் விற்பனை' : 'Sell Harvest'}
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {isTamil ? 'விற்பனை' : 'Sell'}
          </span>
        </button>

        {/* Hub 6: Labor */}
        <button
          onClick={() => setActiveTab('farm-worker')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl min-w-[50px] min-h-[48px] transition-colors cursor-pointer ${
            currentHub.id === 'farm-labor-hub' ? 'text-[#1B5E20] font-black' : 'text-slate-500'
          }`}
          title={isTamil ? 'விவசாய வேலை ஆட்கள்' : 'Farm Labor'}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">
            {isTamil ? 'ஆட்கள்' : 'Labor'}
          </span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-4 px-4 sm:px-8 text-xs text-slate-500 text-center flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#1B5E20]" />
          <span>தமிழ்நாடு வேளாண் வழிகாட்டி (AgriKural)</span>
          <span>•</span>
          <span>In technical alignment with TNAU &amp; Department of Agriculture</span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          38 Districts • TNAU Agro Support
        </div>
      </footer>
    </div>
  );
}
