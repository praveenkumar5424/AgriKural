import React, { useState } from 'react';
import { Globe, User, LogOut, ChevronDown, MapPin, Mail } from 'lucide-react';
import { DistrictInfo, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import farmerOxPlowImg from '../assets/images/farmer_ox_plow_1788000488778.jpg';

interface HeaderProps {
  district: DistrictInfo;
  language?: Language;
  onSelectLanguage?: (lang: Language) => void;
  onOpenLogin?: () => void;
  onNavigateTab?: (tabId: string) => void;
  onNavigatePath?: (path: string) => void;
  onOpenDistrictSelector?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  district,
  language: propLanguage,
  onSelectLanguage: propOnSelectLanguage,
  onOpenLogin,
  onNavigateTab,
  onNavigatePath,
  onOpenDistrictSelector,
}) => {
  const { language, setLanguage, getDistrictName } = useLanguage();
  const { user, logout, openLoginModal } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOtherLangMenuOpen, setIsOtherLangMenuOpen] = useState(false);

  const currentLang = propLanguage || language;
  const handleSelectLang = propOnSelectLanguage || setLanguage;

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      openLoginModal();
    }
  };

  const localizedDistrict = getDistrictName(district);

  return (
    <header
      id="top-app-header"
      className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs transition-colors overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: App Logo & Farmer Identity */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            onClick={() => onNavigateTab && onNavigateTab('crop-doctor')}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1 overflow-hidden ring-2 ring-emerald-600/20 shadow-xs shrink-0 cursor-pointer hover:scale-105 transition-transform"
            title="AgriKural Home"
          >
            <img
              src={farmerOxPlowImg}
              alt="AgriKural Tamil Nadu Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter grayscale contrast-[200%] brightness-[0.70]"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 font-sans leading-none truncate">
                AgriKural
              </h1>
              <span className="hidden xs:inline text-emerald-700 text-xs sm:text-base font-bold font-['Noto_Sans_Tamil',sans-serif] leading-none">
                (அக்ரிகுரல்)
              </span>
            </div>
            
            {/* District Quick-Indicator */}
            <button
              onClick={() => onOpenDistrictSelector && onOpenDistrictSelector()}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-600 font-bold mt-0.5 sm:mt-1 hover:text-emerald-700 transition-colors cursor-pointer group text-left max-w-[120px] sm:max-w-none min-h-[30px]"
              title="Change District (மாவட்டம் மாற்றுக)"
            >
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">{localizedDistrict}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0" />
            </button>
          </div>
        </div>

        {/* Right: Bilingual Switcher & Farmer Account */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Primary Language Toggle: Tamil (தமிழ்) & English + More */}
          <div
            className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 shadow-2xs"
            role="group"
            aria-label="Language selection"
          >
            <button
              id="lang-btn-ta"
              onClick={() => handleSelectLang('ta')}
              className={`min-h-[44px] px-2.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 ${
                currentLang === 'ta'
                  ? 'bg-emerald-700 text-white shadow-xs font-extrabold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              aria-pressed={currentLang === 'ta'}
            >
              <span>தமிழ்</span>
            </button>
            <button
              id="lang-btn-en"
              onClick={() => handleSelectLang('en')}
              className={`min-h-[44px] px-2.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 ${
                currentLang === 'en'
                  ? 'bg-slate-900 text-white shadow-xs font-extrabold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              aria-pressed={currentLang === 'en'}
            >
              <span>English</span>
            </button>

            {/* Other Languages Dropdown (Hindi, Telugu, Bengali) with >=44px hit box */}
            <div className="relative">
              <button
                id="lang-globe-btn"
                onClick={() => setIsOtherLangMenuOpen(!isOtherLangMenuOpen)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
                title="More Languages (பிற மொழிகள்)"
                aria-label="More Languages (பிற மொழிகள்)"
              >
                <Globe className="w-4 h-4" />
              </button>

              {isOtherLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      handleSelectLang('hi');
                      setIsOtherLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold min-h-[44px] flex items-center ${
                      currentLang === 'hi' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    हिन्दी (Hindi)
                  </button>
                  <button
                    onClick={() => {
                      handleSelectLang('te');
                      setIsOtherLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold min-h-[44px] flex items-center ${
                      currentLang === 'te' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    తెలుగు (Telugu)
                  </button>
                  <button
                    onClick={() => {
                      handleSelectLang('bn');
                      setIsOtherLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold min-h-[44px] flex items-center ${
                      currentLang === 'bn' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    বাংলা (Bengali)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Account / Profile Button */}
          {user ? (
            <div className="relative">
              <button
                id="header-user-profile-menu-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 py-1 px-1.5 sm:px-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-2xs group min-h-[44px] shrink-0"
                title="Farmer Profile Menu"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center ring-2 ring-emerald-400 shadow-xs shrink-0">
                  {user.avatarLetter || 'P'}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-black text-slate-900 leading-tight group-hover:text-emerald-800">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold truncate max-w-[120px] leading-tight">
                    {user.districtName || district.nameEn}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  id="header-user-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="p-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center">
                        {user.avatarLetter || 'P'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-emerald-700 font-medium truncate max-w-[180px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between">
                      <span>{user.districtName}</span>
                      <span className="font-bold text-emerald-800">{user.landAcres} Acres</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onNavigateTab) onNavigateTab('farmer-account');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-2 min-h-[44px]"
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>{currentLang === 'ta' ? 'எனது பண்ணை விவரம்' : 'My Farm Profile & Land Details'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (onNavigatePath) onNavigatePath('/login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2 min-h-[44px]"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>{currentLang === 'ta' ? 'வேறு கணக்கில் நுழைய' : 'Switch Account'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      id="header-user-signout-btn"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                        if (onNavigatePath) onNavigatePath('/');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-2 min-h-[44px]"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{currentLang === 'ta' ? 'வெளியேறு (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="header-btn-login-route"
              onClick={handleOpenLogin}
              className="flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-2.5 sm:px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer shrink-0"
              title={currentLang === 'ta' ? 'உள்நுழைக / பதிவு' : 'Sign In'}
              aria-label={currentLang === 'ta' ? 'உள்நுழைக / பதிவு' : 'Sign In'}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{currentLang === 'ta' ? 'நுழைக / பதிவு' : 'Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
