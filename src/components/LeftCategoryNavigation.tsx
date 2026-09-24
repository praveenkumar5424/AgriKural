import React from 'react';
import {
  Compass,
  Droplets,
  Camera,
  Calendar,
  MessageSquare,
  TrendingUp,
  Store,
  ChevronRight,
  Layers,
  Activity,
  ShieldCheck,
  Calculator,
  User,
  Truck,
  Users,
  Sprout,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

export interface HubSubItem {
  id: string;
  labelEn: string;
  labelTa: string;
  descEn: string;
  descTa: string;
  actionTitleEn: string;
  actionTitleTa: string;
  icon: React.ElementType;
}

export interface FarmerHub {
  id: string;
  hubNumber: string;
  titleEn: string;
  titleTa: string;
  subtitleEn: string;
  subtitleTa: string;
  icon: React.ElementType;
  defaultTabId: string;
  subItems: HubSubItem[];
}

export const FARMER_HUBS: FarmerHub[] = [
  {
    id: 'crop-doctor-hub',
    hubNumber: '01',
    titleEn: 'Crop Doctor & Advisory',
    titleTa: 'பயிர் மருத்துவர் & ஆலோசனை',
    subtitleEn: 'AI Disease Diagnosis, Soil Guide & Seasons',
    subtitleTa: 'நோய் கண்டறிதல், மண் & பருவ அட்டவணை',
    icon: Sprout,
    defaultTabId: 'disease-scanner',
    subItems: [
      {
        id: 'disease-scanner',
        labelEn: 'Crop Disease Scanner',
        labelTa: 'பயிர் நோய் கண்டறிதல்',
        descEn: 'AI camera leaf diagnosis & remedies',
        descTa: 'கேமரா மூலம் இலை நோய் ஆய்வு',
        actionTitleEn: 'Crop Disease Scan',
        actionTitleTa: 'பயிர் நோய் ஆய்வு',
        icon: Camera,
      },
      {
        id: 'crop-advisory',
        labelEn: 'Crop & Soil Advisory',
        labelTa: 'பயிர் & மண் ஆலோசனை',
        descEn: 'District soil & variety recommendations',
        descTa: 'மாவட்ட மண் & பயிர் பரிந்துரை',
        actionTitleEn: 'Crop & Soil Advice',
        actionTitleTa: 'மண் & பயிர் ஆலோசனை',
        icon: Compass,
      },
      {
        id: 'seasonal-calendar',
        labelEn: 'Seasonal Sowing Calendar',
        labelTa: 'பருவ கால அட்டவணை',
        descEn: 'TNAU Kuruvai, Samba & Thaladi dates',
        descTa: 'குறுவை, சம்பா, தாளடி பட்டங்கள்',
        actionTitleEn: 'Seasonal Calendar',
        actionTitleTa: 'பருவ அட்டவணை',
        icon: Calendar,
      },
      {
        id: 'yield-predictor',
        labelEn: 'Yield & Profit Estimator',
        labelTa: 'மகசூல் & லாப கணிப்பாளர்',
        descEn: 'Production cost & return simulation',
        descTa: 'சாகுபடி செலவு & லாபக் கணக்கீடு',
        actionTitleEn: 'Yield / Cost Estimate',
        actionTitleTa: 'மகசூல் & லாபக் கணக்கீடு',
        icon: Calculator,
      },
      {
        id: 'agri-mitra-ai',
        labelEn: 'Agri-Mitra AI Copilot',
        labelTa: 'அக்ரி-மித்ரா குரல் AI',
        descEn: 'Multilingual Tamil agricultural assistant',
        descTa: 'தமிழ் குரல் வழி வேளாண் ஆலோசகர்',
        actionTitleEn: 'Agri-Mitra Voice',
        actionTitleTa: 'அக்ரி-மித்ரா AI',
        icon: MessageSquare,
      },
    ],
  },
  {
    id: 'mandi-market-hub',
    hubNumber: '02',
    titleEn: 'Mandi Market Prices',
    titleTa: 'சந்தை நிலவரம்',
    subtitleEn: 'Daily Market Prices, 30-Day Trends & AI Forecast',
    subtitleTa: 'தினசரி விலை, 30 நாள் வரைபடம் & கணிப்பு',
    icon: TrendingUp,
    defaultTabId: 'mandi-prices',
    subItems: [
      {
        id: 'mandi-prices',
        labelEn: 'Live Mandi Prices & Trends',
        labelTa: 'உள்ளூர் சந்தை விலை நிலவரம்',
        descEn: '30-day graphs, modal prices & forecasts',
        descTa: '30 நாள் விலை மாற்றங்கள் & மாதிரி விலை',
        actionTitleEn: 'Daily Market Prices',
        actionTitleTa: 'இன்றைய சந்தை விலை',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 'water-hub',
    hubNumber: '03',
    titleEn: 'Water & Reservoirs',
    titleTa: 'அணை & பாசனம்',
    subtitleEn: 'Dam Storage Levels, Inflow & Field Telemetry',
    subtitleTa: 'அணை நீர்மட்டம், பாசனம் & வயல் சென்சார்',
    icon: Droplets,
    defaultTabId: 'smart-irrigation',
    subItems: [
      {
        id: 'smart-irrigation',
        labelEn: 'Dam Levels & Smart Irrigation',
        labelTa: 'அணை நீர்மட்டம் & பாசனம்',
        descEn: 'Storage status, canal flow & recommendations',
        descTa: 'அணை கொள்ளளவு & பாசன பரிந்துரை',
        actionTitleEn: 'Dam Levels & Irrigation',
        actionTitleTa: 'அணை நீர் & பாசனம்',
        icon: Droplets,
      },
      {
        id: 'iot-telemetry',
        labelEn: 'Field Soil Sensors',
        labelTa: 'மண் ஈரப்பதம் & சென்சார்',
        descEn: 'Moisture %, pH levels & root temperature',
        descTa: 'மண் ஈரப்பதம், pH & வெப்பநிலை விவரம்',
        actionTitleEn: 'Field Soil Sensors',
        actionTitleTa: 'வயல் மண் சென்சார்',
        icon: Activity,
      },
    ],
  },
  {
    id: 'subsidies-hub',
    hubNumber: '04',
    titleEn: 'Subsidies & Insurance',
    titleTa: 'அரசு மானியங்கள் & காப்பீடு',
    subtitleEn: 'Government Schemes & PMFBY Crop Insurance',
    subtitleTa: 'உழவன் மானியங்கள் & பயிர் காப்பீடு',
    icon: ShieldCheck,
    defaultTabId: 'scheme-finder',
    subItems: [
      {
        id: 'scheme-finder',
        labelEn: 'Scheme Eligibility & Insurance',
        labelTa: 'அரசு மானியம் & காப்பீடு தகுதி',
        descEn: 'Automated TN subsidy grants & PMFBY claims',
        descTa: 'தமிழக அரசு மானியங்கள் & காப்பீடு',
        actionTitleEn: 'Government Grants & Insurance',
        actionTitleTa: 'அரசு மானியம் & காப்பீடு',
        icon: ShieldCheck,
      },
    ],
  },
  {
    id: 'sell-transport-hub',
    hubNumber: '05',
    titleEn: 'Sell Harvest & Transport',
    titleTa: 'விளைபொருள் விற்பனை & லாரி',
    subtitleEn: 'Direct Produce Selling & Freight Truck Matching',
    subtitleTa: 'நேரடி விற்பனை & வாகன முன்பதிவு',
    icon: Store,
    defaultTabId: 'b2b-marketplace',
    subItems: [
      {
        id: 'b2b-marketplace',
        labelEn: 'Direct Produce Selling',
        labelTa: 'நேரடி விளைபொருள் விற்பனை',
        descEn: 'Direct farm-gate buyer connections, zero commission',
        descTa: 'தரகர் இன்றி வாடிக்கையாளருக்கு நேரடி விற்பனை',
        actionTitleEn: 'Sell My Harvest',
        actionTitleTa: 'நேரடி விற்பனை',
        icon: Store,
      },
      {
        id: 'smart-freight',
        labelEn: 'Produce Freight & Trucks',
        labelTa: 'விளைபொருளை எடுத்துச் செல்ல வாகனம்',
        descEn: 'Auto, pickup & truck matching by ton & distance',
        descTa: 'டாடா ஏஸ், லாரி & டிரக் வாடகை முன்பதிவு',
        actionTitleEn: 'Find Transport & Trucks',
        actionTitleTa: 'வாகனம் / லாரி முன்பதிவு',
        icon: Truck,
      },
    ],
  },
  {
    id: 'farm-labor-hub',
    hubNumber: '06',
    titleEn: 'Farm Labor & Wages',
    titleTa: 'வேலை ஆட்கள் & கூலி',
    subtitleEn: 'Harvest Crews, Daily Wage Rates & Task Booking',
    subtitleTa: 'விவசாய ஆட்கள் முன்பதிவு & கூலி விவரம்',
    icon: Users,
    defaultTabId: 'farm-worker',
    subItems: [
      {
        id: 'farm-worker',
        labelEn: 'Farm Workers & Wages',
        labelTa: 'விவசாய வேலை ஆட்கள்',
        descEn: 'Local labor crews, prevailing wages & task scheduling',
        descTa: 'உள்ளூர் ஆட்கள், தினக்கூலி & வேலை ஒதுக்கீடு',
        actionTitleEn: 'Find Labor Gangs & Wages',
        actionTitleTa: 'வேலை ஆட்கள் & கூலி',
        icon: Users,
      },
    ],
  },
];

// Helper to find which hub a tabId belongs to
export function findHubByTabId(tabId: string): FarmerHub {
  for (const hub of FARMER_HUBS) {
    if (hub.defaultTabId === tabId || hub.subItems.some((s) => s.id === tabId)) {
      return hub;
    }
  }
  return FARMER_HUBS[0];
}

// Backward-compatible export for any existing references
export interface CategoryItem {
  id: string;
  stepNumber: string;
  stepIndex: number;
  label: string;
  tamilLabel: string;
  description: string;
  tag: string;
  icon: React.ElementType;
}

export const CATEGORY_ITEMS: CategoryItem[] = FARMER_HUBS.flatMap((hub, hubIdx) =>
  hub.subItems.map((sub, subIdx) => ({
    id: sub.id,
    stepNumber: `${hubIdx + 1}.${subIdx + 1}`,
    stepIndex: hubIdx * 10 + subIdx + 1,
    label: sub.labelEn,
    tamilLabel: sub.labelTa,
    description: sub.descEn,
    tag: hub.titleEn,
    icon: sub.icon,
  }))
);

interface LeftCategoryNavigationProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  language?: Language;
}

export const LeftCategoryNavigation: React.FC<LeftCategoryNavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { isTamil } = useLanguage();
  const activeHub = findHubByTabId(activeTab);

  return (
    <>
      {/* ============================================================== */}
      {/* MOBILE / TABLET NAVIGATION (<1280px): Compact Horizontal Strip  */}
      {/* + Intuitive "What can I do here?" Sub-Tool Discovery Area       */}
      {/* ============================================================== */}
      <nav
        id="mobile-hub-navigation"
        aria-label="Farmer Hub Navigation"
        className="block xl:hidden w-full bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs space-y-2.5"
      >
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#1B5E20] text-white flex items-center justify-center shrink-0">
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              {isTamil ? 'உழவர் வழிகாட்டி மையங்கள்' : 'Farmer Service Hubs'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {activeHub.hubNumber} / 06
          </span>
        </div>

        {/* 6 Primary Hub Buttons: Horizontal Touch-Scroll Row (Scrollbar Hidden) */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1 scroll-smooth">
          {FARMER_HUBS.map((hub) => {
            const Icon = hub.icon;
            const isHubActive = activeHub.id === hub.id;
            const hubTitle = isTamil ? hub.titleTa : hub.titleEn;
            const hubSub = isTamil ? hub.titleEn : hub.titleTa;

            return (
              <button
                key={hub.id}
                onClick={() => onSelectTab(hub.defaultTabId)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer ${
                  isHubActive
                    ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
                title={hubTitle}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isHubActive ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-700 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 pr-1">
                  <div className="text-xs font-extrabold truncate max-w-[130px] leading-tight">
                    {hubTitle}
                  </div>
                  <div
                    className={`text-[10px] truncate max-w-[130px] leading-tight ${
                      isHubActive ? 'text-emerald-200 font-medium' : 'text-slate-500'
                    }`}
                  >
                    {hubSub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* P1 FIX: "What can I do here?" Sub-Tool Discovery Area        */}
        {/* Direct discovery of all tools with >=44px touch targets      */}
        {/* ============================================================ */}
        {activeHub.subItems.length > 1 && (
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black text-slate-700 uppercase tracking-wide flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                {isTamil ? 'இங்கு நீங்கள் செய்யக்கூடியவை:' : 'What can I do here?'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {activeHub.subItems.length} {isTamil ? 'கருவிகள்' : 'Tools'}
              </span>
            </div>

            {/* Direct Tool Actions: Responsive Grid / Wrap with min-h-[44px] */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {activeHub.subItems.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = activeTab === sub.id;
                const actionTitle = isTamil ? sub.actionTitleTa : sub.actionTitleEn;

                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelectTab(sub.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer border text-left ${
                      isSubActive
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-1 ring-emerald-800'
                        : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50 hover:border-emerald-300'
                    }`}
                  >
                    <SubIcon
                      className={`w-4 h-4 shrink-0 ${
                        isSubActive ? 'text-white' : 'text-emerald-700'
                      }`}
                    />
                    <span className="truncate leading-tight">{actionTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================== */}
      {/* DESKTOP NAVIGATION (>=1280px): Dignified Left Sidebar Cards    */}
      {/* ============================================================== */}
      <aside
        id="desktop-farmer-hub-navigation"
        aria-label="Farmer Service Hubs Navigation"
        className="hidden xl:flex w-full bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex-col gap-4 sticky top-6"
      >
        {/* Hub Header */}
        <div className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center shadow-xs">
                <Sprout className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  {isTamil ? 'உழவர் வழிகாட்டி மையங்கள்' : 'Farmer Service Hubs'}
                </h2>
                <p className="text-[11px] font-medium text-slate-500">
                  {isTamil ? '6 முக்கிய வேளாண் சேவைகள்' : '6 Core Agricultural Workspaces'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200">
              {activeHub.hubNumber} / 06
            </span>
          </div>
        </div>

        {/* 6 Farmer Hub Cards */}
        <nav
          aria-label="Farmer Service Hubs Navigation"
          className="flex flex-col gap-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 no-scrollbar"
        >
          {FARMER_HUBS.map((hub) => {
            const Icon = hub.icon;
            const isHubActive = activeHub.id === hub.id;
            const primaryTitle = isTamil ? hub.titleTa : hub.titleEn;
            const secondaryTitle = isTamil ? hub.titleEn : hub.titleTa;
            const subtitle = isTamil ? hub.subtitleTa : hub.subtitleEn;

            return (
              <div
                key={hub.id}
                className={`w-full rounded-2xl border transition-all duration-150 overflow-hidden ${
                  isHubActive
                    ? 'border-[#1B5E20] bg-emerald-50/40 shadow-xs ring-1 ring-[#1B5E20]/20'
                    : 'bg-white hover:bg-slate-50/90 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Main Hub Header Button */}
                <button
                  id={`hub-header-${hub.id}`}
                  onClick={() => onSelectTab(hub.defaultTabId)}
                  className="w-full text-left p-3.5 flex items-start gap-3 cursor-pointer group min-h-[48px]"
                >
                  {/* Hub Number Badge */}
                  <div
                    className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                      isHubActive
                        ? 'bg-[#1B5E20] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {hub.hubNumber}
                  </div>

                  {/* Center Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-sm font-black tracking-tight leading-snug ${
                          isHubActive ? 'text-[#1B5E20]' : 'text-slate-900'
                        }`}
                      >
                        {primaryTitle}
                      </span>
                      {isHubActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      )}
                    </div>
                    <p
                      className={`text-[11px] font-bold leading-tight mt-0.5 truncate ${
                        isHubActive ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {secondaryTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-snug mt-1 line-clamp-1">
                      {subtitle}
                    </p>
                  </div>

                  {/* Right Icon */}
                  <div className="shrink-0 flex items-center justify-center self-center">
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isHubActive
                          ? 'bg-[#1B5E20] text-emerald-200'
                          : 'bg-slate-100 text-slate-500 group-hover:text-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Sub-tools for active hub with "What can I do here?" */}
                {isHubActive && hub.subItems.length > 1 && (
                  <div className="px-3 pb-3 pt-2 border-t border-emerald-100/80 flex flex-col gap-1.5 bg-white/80">
                    <span className="text-[11px] font-black text-emerald-900 uppercase tracking-wider px-1 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-emerald-700" />
                      {isTamil ? 'இங்கு நீங்கள் செய்யக்கூடியவை:' : 'What can I do here?'}
                    </span>
                    {hub.subItems.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeTab === sub.id;
                      const subTitle = isTamil ? sub.labelTa : sub.labelEn;
                      const subDesc = isTamil ? sub.descTa : sub.descEn;

                      return (
                        <button
                          key={sub.id}
                          id={`sub-item-${sub.id}`}
                          onClick={() => onSelectTab(sub.id)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-2 transition-all cursor-pointer border min-h-[44px] ${
                            isSubActive
                              ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                              : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border-slate-200/70'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <SubIcon
                              className={`w-4 h-4 shrink-0 ${
                                isSubActive ? 'text-white' : 'text-emerald-700'
                              }`}
                            />
                            <div className="min-w-0">
                              <span className="text-xs font-bold truncate block">
                                {subTitle}
                              </span>
                              <span
                                className={`text-[10px] truncate block ${
                                  isSubActive ? 'text-emerald-100' : 'text-slate-400'
                                }`}
                              >
                                {subDesc}
                              </span>
                            </div>
                          </div>
                          {isSubActive && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Secondary Account / Profile Button */}
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => onSelectTab('farmer-account')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer min-h-[48px] ${
              activeTab === 'farmer-account'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeTab === 'farmer-account' ? 'bg-slate-800 text-emerald-400' : 'bg-white text-slate-600'
                }`}
              >
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block">
                  {isTamil ? 'உழவர் சுயவிவரம் & நிலம்' : 'Farm Profile & Land Records'}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {isTamil ? 'அமைப்புகள் & விபரங்கள்' : 'Settings & Field Information'}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
        </div>
      </aside>
    </>
  );
};
