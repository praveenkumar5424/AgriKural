import React, { useState } from 'react';
import { Globe, Satellite, User, LogOut, ChevronDown, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';
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
}

export const Header: React.FC<HeaderProps> = ({
  district,
  language: propLanguage,
  onSelectLanguage: propOnSelectLanguage,
  onOpenLogin,
  onNavigateTab,
  onNavigatePath,
}) => {
  const { language, setLanguage, t, getDistrictName } = useLanguage();
  const { user, logout, openLoginModal } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const currentLang = propLanguage || language;
  const handleSelectLang = propOnSelectLanguage || setLanguage;

  const handleOpenLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      openLoginModal();
    }
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'bn', label: 'বাংলা' },
  ];

  const stateNameMap: Record<Language, string> = {
    en: 'Tamil Nadu',
    ta: 'தமிழ்நாடு',
    hi: 'तमिलनाडु',
    te: 'తమిళనాడు',
    bn: 'তামিলনাড়ু',
  };

  const localizedDistrict = getDistrictName(district);
  const localizedState = stateNameMap[currentLang] || 'Tamil Nadu';

  return (
    <header id="top-app-header" className="w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 shadow-2xs">
      {/* Left: App Logo, Title, Active Badge, Satellite Link Info */}
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs p-1 overflow-hidden ring-2 ring-emerald-600/30">
          <img
            src={farmerOxPlowImg}
            alt="Tamil Nadu Agricultural Hub Logo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter grayscale contrast-[250%] brightness-[0.70]"
          />
        </div>
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-sans text-black">
              {t.appTitle}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold tracking-wider bg-emerald-100/90 text-emerald-800 border border-emerald-300/80">
              {t.versionLabel} {t.activeStatus.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-0.5">
            <span className="flex items-center gap-1 text-slate-600">
              <Satellite className="w-3.5 h-3.5 text-emerald-700 inline" />
              {t.spaceLink}
            </span>
            <span>•</span>
            <span className="font-mono text-slate-600">
              {district.lat.toFixed(2)}° N, {district.lng.toFixed(2)}° E
            </span>
            <span>•</span>
            <span className="text-slate-700 font-semibold">
              {localizedDistrict}, {localizedState}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Multi-Language Selector & Google User Account */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Language Selector Pills */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 shadow-2xs">
          <div className="px-2 text-slate-400">
            <Globe className="w-4 h-4" />
          </div>
          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                onClick={() => handleSelectLang(lang.code)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold ring-1 ring-slate-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        {/* Google User Authentication Badge / Login Button */}
        {user ? (
          <div className="relative">
            <button
              id="header-user-profile-menu-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 py-1 px-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/90 transition-all cursor-pointer shadow-2xs group"
              title="Google Mail Farmer Account"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center ring-2 ring-emerald-400 shadow-xs">
                {user.avatarLetter}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-black text-slate-900 leading-tight group-hover:text-emerald-800">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-700 font-mono font-semibold truncate max-w-[150px] leading-tight">
                  {user.email}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div
                id="header-user-dropdown-menu"
                className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="p-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                      {user.avatarLetter}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-emerald-700 font-mono font-medium truncate max-w-[180px]">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                    <span>{user.districtName} District</span>
                    <span className="font-semibold text-emerald-700">{user.landAcres} Acres</span>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onNavigateTab) onNavigateTab('farmer-account');
                      else handleOpenLogin();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Farmer Profile & Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onNavigatePath) onNavigatePath('/login');
                      else handleOpenLogin();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>Log In to Another Account (/login)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onNavigatePath) onNavigatePath('/signup');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Create New Account (/signup)</span>
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
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out (வெளியேறு)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              id="header-btn-login-route"
              onClick={() => {
                if (onNavigatePath) onNavigatePath('/login');
                else handleOpenLogin();
              }}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs shadow-2xs transition-all cursor-pointer"
            >
              <span>Log In</span>
            </button>
            <button
              id="header-btn-signup-route"
              onClick={() => {
                if (onNavigatePath) onNavigatePath('/signup');
                else handleOpenLogin();
              }}
              className="px-3.5 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-xs transition-all cursor-pointer"
            >
              <span>Sign Up</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

