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
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  Calculator,
  User,
} from 'lucide-react';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

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

export const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'crop-advisory',
    stepNumber: '01',
    stepIndex: 1,
    label: 'Crop Advisory',
    tamilLabel: 'பயிர் மற்றும் மண் ஆலோசனை',
    description: 'Personalized district soil suitability & seasonal crop recommendations',
    tag: 'Soil & Variety',
    icon: Compass,
  },
  {
    id: 'smart-irrigation',
    stepNumber: '02',
    stepIndex: 2,
    label: 'Smart Irrigation',
    tamilLabel: 'நுண்ணீர்ப் பாசன மேலாண்மை',
    description: 'Dam water levels, canal discharge & soil moisture telemetry',
    tag: 'Dam & Water',
    icon: Droplets,
  },
  {
    id: 'disease-scanner',
    stepNumber: '03',
    stepIndex: 3,
    label: 'Disease Scanner',
    tamilLabel: 'பயிர் நோய் கண்டறிதல்',
    description: 'Instant AI camera diagnosis for leaf pests and biological remedies',
    tag: 'AI Vision',
    icon: Camera,
  },
  {
    id: 'seasonal-calendar',
    stepNumber: '04',
    stepIndex: 4,
    label: 'Seasonal Calendar',
    tamilLabel: 'பருவ கால அட்டவணை',
    description: 'TNAU Kuruvai, Samba, Thaladi & Navarai agricultural schedules',
    tag: 'Sowing Cycle',
    icon: Calendar,
  },
  {
    id: 'agri-mitra-ai',
    stepNumber: '05',
    stepIndex: 5,
    label: 'Agri-Mitra AI',
    tamilLabel: 'அக்ரி-மித்ரா AI உதவியாளர்',
    description: 'Multilingual Tamil & English voice-enabled agronomy copilot',
    tag: 'Gemini AI',
    icon: MessageSquare,
  },
  {
    id: 'mandi-prices',
    stepNumber: '06',
    stepIndex: 6,
    label: 'Mandi 30D Trends',
    tamilLabel: 'சந்தை விலை நிலவரம்',
    description: '30-day historical graphs, rising/falling indicators & 7-day AI forecasts',
    tag: '30D Trends',
    icon: TrendingUp,
  },
  {
    id: 'iot-telemetry',
    stepNumber: '07',
    stepIndex: 7,
    label: 'IoT Field Telemetry',
    tamilLabel: 'மண் மற்றும் வயல் சென்சார்',
    description: 'Real-time soil moisture %, pH levels, root temp & solenoid valve control',
    tag: 'LoRaWAN IoT',
    icon: Activity,
  },
  {
    id: 'scheme-finder',
    stepNumber: '08',
    stepIndex: 8,
    label: 'Insurance & Subsidies',
    tamilLabel: 'காப்பீடு & மானியங்கள்',
    description: 'Automated PMFBY insurance & Tamil Nadu subsidy grant matching',
    tag: 'Uzhavan Grants',
    icon: ShieldCheck,
  },
  {
    id: 'yield-predictor',
    stepNumber: '09',
    stepIndex: 9,
    label: 'AI Yield & Profit',
    tamilLabel: 'மகசூல் & லாப கணிப்பாளர்',
    description: 'Gemini AI financial return simulations, cost breakdown & ROI index',
    tag: 'Gemini Yield',
    icon: Calculator,
  },
  {
    id: 'b2b-marketplace',
    stepNumber: '10',
    stepIndex: 10,
    label: 'Farmer to Client (B2C)',
    tamilLabel: 'உழவர் - வாடிக்கையாளர் (B2C)',
    description: 'Direct farmer-to-client sales, fresh farm-gate harvests & zero broker fees',
    tag: 'Farmer to Client',
    icon: Store,
  },
  {
    id: 'farmer-account',
    stepNumber: '11',
    stepIndex: 11,
    label: 'Farmer Google Account',
    tamilLabel: 'உழவர் கூகிள் கணக்கு',
    description: 'Sign in with Google Mail ID, manage farm acreage, subsidies and profile',
    tag: 'Google Login',
    icon: User,
  },
];

interface LeftCategoryNavigationProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  language?: Language;
}

export const LeftCategoryNavigation: React.FC<LeftCategoryNavigationProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const { t, getCategory, isTamil, isEnglish } = useLanguage();
  const activeIndex = CATEGORY_ITEMS.findIndex((c) => c.id === activeTab);
  const activeStep = activeIndex >= 0 ? activeIndex + 1 : 1;

  return (
    <aside
      id="left-category-navigation-menu"
      className="w-full bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col gap-4 sticky top-6"
    >
      {/* Header with Step Progress */}
      <div className="border-b border-slate-100 pb-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider">
                {t.categoriesTitle}
              </h2>
              <p className="text-[11px] font-semibold text-slate-500">
                {t.workflowSubtitle}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-slate-100 text-slate-700 border border-slate-200">
            {t.stepProgress} {activeStep} / {CATEGORY_ITEMS.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{
              width: `${(activeStep / CATEGORY_ITEMS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step by Step Vertical Category Items */}
      <nav
        aria-label="Category Steps Navigation"
        className="flex flex-col gap-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 no-scrollbar"
      >
        {CATEGORY_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const cat = getCategory(item.id);
          const primaryTitle = cat.title || item.label;
          const secondaryTitle = isTamil ? item.label : (isEnglish ? item.tamilLabel : item.label);
          const itemTag = cat.tag || item.tag;
          const itemDesc = cat.desc || item.description;

          return (
            <button
              key={item.id}
              id={`left-menu-step-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full text-left p-3 sm:p-3.5 rounded-2xl transition-all duration-150 cursor-pointer flex items-start gap-3 relative group border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                  : 'bg-white hover:bg-slate-50/90 text-slate-800 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Step Number Badge */}
              <div
                className={`w-7 h-7 shrink-0 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}
              >
                {item.stepNumber}
              </div>

              {/* Center Content */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`text-xs sm:text-sm font-black tracking-tight leading-snug ${
                      isActive ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {primaryTitle}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </div>
                <p
                  className={`text-[11px] font-bold leading-tight mt-0.5 truncate ${
                    isActive ? 'text-emerald-300' : 'text-slate-500'
                  }`}
                >
                  {secondaryTitle}
                </p>
                <p
                  className={`text-[10px] leading-snug mt-1 line-clamp-1 ${
                    isActive ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  {itemDesc}
                </p>
              </div>

              {/* Right Side Icon & Tag */}
              <div className="shrink-0 flex flex-col items-end justify-between self-stretch gap-1">
                <div
                  className={`p-1.5 rounded-lg ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-100 text-slate-500 group-hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive
                      ? 'text-emerald-400 translate-x-0.5'
                      : 'text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Assistance Callout */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-bold">7 Integrated Agro Modules</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 font-bold">
          TN-AGRI-v3
        </span>
      </div>
    </aside>
  );
};
