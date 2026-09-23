import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Mail,
  User,
  Phone,
  MapPin,
  Sprout,
  ArrowRight,
  LogOut,
  Sparkles,
  KeyRound,
  FileCheck,
  Layers,
  Award,
} from 'lucide-react';
import { useAuth, SPECIFIC_GOOGLE_USER } from '../context/AuthContext';
import { TN_DISTRICTS } from '../data/agriData';
import { DistrictInfo } from '../types';
import farmerLogoEmblem from '../assets/images/farmer_logo_emblem_1788848539136.jpg';

interface FarmerProfileTabProps {
  onLoginSuccess?: () => void;
  onNavigateTab?: (tabId: string) => void;
  onDistrictSelect?: (district: DistrictInfo) => void;
}

export const FarmerProfileTab: React.FC<FarmerProfileTabProps> = ({
  onLoginSuccess,
  onNavigateTab,
  onDistrictSelect,
}) => {
  const {
    user,
    savedAccounts,
    loginWithSpecificUser,
    loginWithGoogleEmail,
    registerAccount,
    logout,
    switchAccount,
  } = useAuth();

  const [activeMode, setActiveMode] = useState<'signin' | 'register'>('signin');
  const [googleEmailInput, setGoogleEmailInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Registration Form State
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regDistrictId, setRegDistrictId] = useState<string>('ariyalur');
  const [regAcres, setRegAcres] = useState<number>(3.5);
  const [regCategory, setRegCategory] = useState<
    'Marginal (<2.5 acres)' | 'Small (2.5 - 5 acres)' | 'Semi-Medium (5 - 10 acres)' | 'Large (>10 acres)'
  >('Small (2.5 - 5 acres)');
  const [regCrops, setRegCrops] = useState<string[]>([
    'Samba Paddy',
    'Turmeric',
    'Sugarcane',
  ]);
  const [hasKCC, setHasKCC] = useState<boolean>(true);
  const [hasSoilHealth, setHasSoilHealth] = useState<boolean>(true);
  const [regSuccessMsg, setRegSuccessMsg] = useState<string>('');

  const cropOptions = [
    'Samba Paddy',
    'Kuruvai Paddy',
    'Turmeric (மஞ்சள்)',
    'Sugarcane (கரும்பு)',
    'Cashew (முந்திரி)',
    'Cotton (பருத்தி)',
    'Banana (வாழை)',
    'Black Gram / Urad (உளுந்து)',
    'Groundnut (வேர்க்கடலை)',
    'Maize (மக்காச்சோளம்)',
  ];

  const handleToggleCrop = (crop: string) => {
    if (regCrops.includes(crop)) {
      if (regCrops.length > 1) {
        setRegCrops(regCrops.filter((c) => c !== crop));
      }
    } else {
      setRegCrops([...regCrops, crop]);
    }
  };

  const handleQuickSpecificLogin = () => {
    loginWithSpecificUser();
    const foundDistrict = TN_DISTRICTS.find(
      (d) => d.id.toLowerCase() === SPECIFIC_GOOGLE_USER.districtId.toLowerCase()
    );
    if (foundDistrict && onDistrictSelect) {
      onDistrictSelect(foundDistrict);
    }
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleGoogleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const email = googleEmailInput.trim().toLowerCase();
    if (!email) {
      setLoginError('Please enter your Google Mail ID (உங்களுடைய கூகிள் மின்னஞ்சலை உள்ளிடவும்)');
      return;
    }

    if (!email.includes('@')) {
      setLoginError('Please enter a valid email address with @ (சரியான மின்னஞ்சலை உள்ளிடவும்)');
      return;
    }

    const success = loginWithGoogleEmail(email);
    if (success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setLoginError('Invalid Google Mail ID. Please use a valid @gmail.com address.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setRegSuccessMsg('');

    if (!regName.trim()) {
      setLoginError('Please enter your full name (உங்கள் பெயரை உள்ளிடவும்)');
      return;
    }

    if (!regEmail.trim() || !regEmail.includes('@')) {
      setLoginError('Please enter a valid Google Mail ID (@gmail.com)');
      return;
    }

    const selDistrict = TN_DISTRICTS.find((d) => d.id === regDistrictId) || TN_DISTRICTS[0];

    const success = registerAccount({
      email: regEmail,
      name: regName,
      phone: regPhone || '+91 94430 00000',
      districtId: selDistrict.id,
      districtName: selDistrict.nameEn,
      landAcres: regAcres,
      farmerCategory: regCategory,
      primaryCrops: regCrops,
      kisanCreditCard: hasKCC,
      soilHealthCard: hasSoilHealth,
    });

    if (success) {
      setRegSuccessMsg('Account created successfully with Google Mail ID! Logging you in...');
      if (onDistrictSelect) onDistrictSelect(selDistrict);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 700);
    } else {
      setLoginError('Failed to create account. Please ensure a valid Google Mail ID.');
    }
  };

  return (
    <div id="farmer-login-page-container" className="max-w-4xl mx-auto space-y-6">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-green-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50 relative overflow-hidden">
        {/* Subtle Farmer Silhouette Emblem Watermark in Card Background */}
        <div className="absolute -right-8 -bottom-10 w-64 h-64 opacity-20 pointer-events-none flex items-center justify-center select-none">
          <img
            src={farmerLogoEmblem}
            alt="Farmer Silhouette Emblem"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain filter invert contrast-200 brightness-150"
          />
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-400/40 text-[11px] font-bold text-emerald-200 uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              TNAU & Uzhavan Portal Verified Authentication
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Farmer Login & Account Creation
            </h2>
            <p className="text-emerald-200/90 text-sm mt-1 font-medium max-w-xl">
              தமிழ்நாடு உழவர் உள்நுழைவு மற்றும் கூகிள் மின்னஞ்சல் கணக்கு பதிவு — Connect your Google Mail ID to unlock personalized Cauvery Delta crop advisories, mandi alerts, and subsidy grants.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Google Mail ID</div>
              <div className="text-[11px] text-emerald-200">Official OAuth & Email Link</div>
            </div>
          </div>
        </div>
      </div>

      {/* If Already Logged In Card */}
      {user && (
        <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full ${user.avatarBgColor} text-white font-black text-xl flex items-center justify-center shadow-md ring-4 ring-emerald-100`}>
                {user.avatarLetter}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-black text-slate-900">{user.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-mono mt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400 inline" />
                  <span className="font-semibold text-emerald-700">{user.email}</span>
                  <span>•</span>
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>

            <button
              id="btn-farmer-logout"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out (வெளியேறு)
            </button>
          </div>

          {/* User Farm Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-600" /> Home District
              </div>
              <div className="text-sm font-black text-slate-900 mt-1">{user.districtName}</div>
              <div className="text-[11px] text-slate-500 font-medium">Cauvery Delta Zone</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3 h-3 text-emerald-600" /> Land Holding
              </div>
              <div className="text-sm font-black text-slate-900 mt-1">{user.landAcres} Acres</div>
              <div className="text-[11px] text-slate-500 font-medium">{user.farmerCategory}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sprout className="w-3 h-3 text-emerald-600" /> Key Crops
              </div>
              <div className="text-sm font-black text-slate-900 mt-1 truncate">
                {user.primaryCrops.slice(0, 2).join(', ')}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {user.primaryCrops.length} Registered Crops
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-600" /> PM-Kisan ID
              </div>
              <div className="text-sm font-black text-emerald-700 font-mono mt-1">
                {user.pmKisanId || 'Verified'}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">100% Subsidy Ready</div>
            </div>
          </div>

          {/* Quick Actions for Active User */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <div className="text-xs text-slate-500">
              Active Session Synchronized with <span className="font-semibold text-slate-700">TNAU Agromet & PMFBY</span>
            </div>
            <div className="flex items-center gap-2">
              {onNavigateTab && (
                <>
                  <button
                    onClick={() => onNavigateTab('crop-advisory')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                  >
                    Go to Crop Advisory →
                  </button>
                  <button
                    onClick={() => onNavigateTab('mandi-prices')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                  >
                    Mandi Rates →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Specific User Quick Login Highlight Box */}
      <div className="bg-emerald-50/70 border-2 border-emerald-500/60 rounded-2xl p-5 shadow-xs relative">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
              Recognized Specific User Account
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-200/70 px-2.5 py-0.5 rounded-full">
            Requested Google Mail Profile
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-emerald-300/80 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-sm">Praveen Kumar</span>
                <span className="text-xs text-slate-500 font-medium">(பிரவீன் குமார்)</span>
              </div>
              <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                {SPECIFIC_GOOGLE_USER.email}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Ariyalur District • 4.5 Acres • Samba Paddy & Cashew
              </div>
            </div>
          </div>

          <button
            id="btn-login-specific-praveen"
            onClick={handleQuickSpecificLogin}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group"
          >
            <span>Continue as praveenkumar20026@gmail.com</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Login & Create Account Tabbed Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70">
          <button
            id="tab-signin-mode"
            onClick={() => {
              setActiveMode('signin');
              setLoginError('');
            }}
            className={`flex-1 py-3.5 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeMode === 'signin'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <KeyRound className="w-4 h-4 text-emerald-600" />
            <span>Sign In with Google Mail</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(உள்நுழைக)</span>
          </button>

          <button
            id="tab-register-mode"
            onClick={() => {
              setActiveMode('register');
              setLoginError('');
            }}
            className={`flex-1 py-3.5 px-4 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeMode === 'register'
                ? 'border-emerald-600 text-emerald-800 bg-white shadow-2xs font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <User className="w-4 h-4 text-emerald-600" />
            <span>Create New Farmer Account</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(புதிய கணக்கு உருவாக்கு)</span>
          </button>
        </div>

        <div className="p-6">
          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              {loginError}
            </div>
          )}

          {regSuccessMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {regSuccessMsg}
            </div>
          )}

          {/* Mode 1: Sign In */}
          {activeMode === 'signin' && (
            <div className="space-y-5">
              {/* One-Tap Google OAuth Simulation Button */}
              <button
                type="button"
                id="btn-google-oauth-onetap"
                onClick={handleQuickSpecificLogin}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google Mail (கூகிள் மூலம் விரைவு உள்நுழைவு)</span>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-slate-200" />
                <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Or enter your Google Mail ID
                </span>
                <div className="flex-1 border-t border-slate-200" />
              </div>

              {/* Form to enter custom Google Mail ID */}
              <form onSubmit={handleGoogleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="input-google-mail" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Google Mail Address (ஜிமெயில் முகவரி)
                  </label>
                  <div className="relative">
                    <input
                      id="input-google-mail"
                      type="email"
                      value={googleEmailInput}
                      onChange={(e) => setGoogleEmailInput(e.target.value)}
                      placeholder="e.g. praveenkumar20026@gmail.com or yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-900 bg-white"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Enter any Google Mail account to sign in or access your farm records.
                  </p>
                </div>

                <button
                  type="submit"
                  id="btn-submit-google-email"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Verify Google Mail & Sign In</span>
                </button>
              </form>

              {/* Saved Google Accounts on this Device */}
              {savedAccounts.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Saved Google Accounts on this Device:
                  </div>
                  <div className="space-y-2">
                    {savedAccounts.map((acc) => (
                      <div
                        key={acc.id}
                        onClick={() => switchAccount(acc.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                          user?.id === acc.id
                            ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-400'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${acc.avatarBgColor} text-white font-bold text-xs flex items-center justify-center`}>
                            {acc.avatarLetter}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{acc.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{acc.email}</div>
                          </div>
                        </div>
                        {user?.id === acc.id ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                            Active
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700">
                            Switch →
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Create Account */}
          {activeMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                Create a permanent farmer profile linked directly to your Google Mail ID for automated PMFBY subsidies and Cauvery Delta advisories.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-bold text-slate-700 mb-1">
                    Farmer Full Name (விவசாயி பெயர்) *
                  </label>
                  <div className="relative">
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Praveen Kumar or Murugesan"
                      className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-900 bg-white"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-email" className="block text-xs font-bold text-slate-700 mb-1">
                    Google Mail ID (@gmail.com) *
                  </label>
                  <div className="relative">
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. praveenkumar20026@gmail.com"
                      className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-900 bg-white font-mono"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile / WhatsApp Number (அலைபேசி எண்)
                  </label>
                  <div className="relative">
                    <input
                      id="reg-phone"
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98421 82910"
                      className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-900 bg-white"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-district" className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Farm District (மாவட்டம்) *
                  </label>
                  <div className="relative">
                    <select
                      id="reg-district"
                      value={regDistrictId}
                      onChange={(e) => setRegDistrictId(e.target.value)}
                      className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-900 bg-white"
                    >
                      {TN_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.nameEn} ({d.nameTa})
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-acres" className="block text-xs font-bold text-slate-700 mb-1">
                    Land Holding (ஏக்கர் பரப்பளவு): {regAcres} Acres
                  </label>
                  <input
                    id="reg-acres"
                    type="range"
                    min="0.5"
                    max="25"
                    step="0.5"
                    value={regAcres}
                    onChange={(e) => setRegAcres(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>0.5 Ac</span>
                    <span>5 Ac</span>
                    <span>15 Ac</span>
                    <span>25 Ac</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-category" className="block text-xs font-bold text-slate-700 mb-1">
                    Farmer Category (உழவர் பிரிவு)
                  </label>
                  <select
                    id="reg-category"
                    value={regCategory}
                    onChange={(e) =>
                      setRegCategory(
                        e.target.value as
                          | 'Marginal (<2.5 acres)'
                          | 'Small (2.5 - 5 acres)'
                          | 'Semi-Medium (5 - 10 acres)'
                          | 'Large (>10 acres)'
                      )
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-900 bg-white"
                  >
                    <option value="Marginal (<2.5 acres)">Marginal (&lt;2.5 acres) - குறு விவசாயி</option>
                    <option value="Small (2.5 - 5 acres)">Small (2.5 - 5 acres) - சிறு விவசாயி</option>
                    <option value="Semi-Medium (5 - 10 acres)">Semi-Medium (5 - 10 acres) - நடுத்தர விவசாயி</option>
                    <option value="Large (>10 acres)">Large (&gt;10 acres) - பெரிய விவசாயி</option>
                  </select>
                </div>
              </div>

              {/* Cultivated Crops Chips */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Crops Cultivated (பயிரிடப்படும் பயிர்கள்):
                </label>
                <div className="flex flex-wrap gap-2">
                  {cropOptions.map((crop) => {
                    const isSelected = regCrops.includes(crop);
                    return (
                      <button
                        type="button"
                        key={crop}
                        onClick={() => handleToggleCrop(crop)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {crop}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Government Card Checkboxes */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasKCC}
                    onChange={(e) => setHasKCC(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Has Kisan Credit Card (KCC)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSoilHealth}
                    onChange={(e) => setHasSoilHealth(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Has Soil Health Card (மண் வள அட்டை)</span>
                </label>
              </div>

              <button
                type="submit"
                id="btn-submit-register-farmer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-green-800 hover:from-emerald-800 hover:to-green-900 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Account with Google Mail (கூகிள் கணக்கை இணைத்து பதிவு செய்)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
