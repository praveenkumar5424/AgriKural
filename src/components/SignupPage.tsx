import React, { useState, useEffect } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  ShieldCheck,
  MapPin,
  User,
  KeyRound,
  RotateCcw,
  Sparkles,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { TN_DISTRICTS } from '../data/agriData';
import { DistrictInfo } from '../types';
import farmerSilhouetteBg from '../assets/images/farmer_silhouette_bg_1788848577927.jpg';
import farmerLogoEmblem from '../assets/images/farmer_logo_emblem_1788848539136.jpg';

interface SignupPageProps {
  onNavigate: (path: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const {
    user,
    signup,
    requestVerificationCode,
    verifyAndRegister,
    loginWithSpecificUser
  } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  // Wizard steps: 'details' -> 'verify' -> 'success'
  const [step, setStep] = useState<'details' | 'verify' | 'success'>('details');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('ariyalur');
  const [showPassword, setShowPassword] = useState(false);

  // Verification step states
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCodePreview, setSentCodePreview] = useState<string>('829104');
  const [isRequestingCode, setIsRequestingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState<number>(45);

  // Validation states
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Countdown timer for resending verification code
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verify' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // If user is already verified and active, they can enter the agricultural hub immediately
  if (user && step !== 'success') {
    return (
      <div className="relative min-h-screen text-slate-900 flex flex-col justify-between selection:bg-emerald-200 overflow-x-hidden">
        {/* Farmer Silhouette Logo Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-900">
          <img
            src={farmerSilhouetteBg}
            alt="Farmer Silhouette Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/60" />
        </div>

        <header className="relative z-10 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden ring-2 ring-emerald-600/30">
              <img
                src={farmerLogoEmblem}
                alt="Farmer Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter grayscale contrast-[200%] brightness-[0.70]"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block leading-tight">
                {t.appTitle}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                Tamil Nadu Decision Support System
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Enter Tamil Nadu Agricultural Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </header>

        <main className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-2xl p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Account Already Verified</h2>
              <p className="text-xs text-slate-500 mt-1">
                Logged in as <strong className="text-slate-800">{user.name}</strong> ({user.email}).
              </p>
            </div>

            <button
              onClick={() => onNavigate('/')}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>Enter AgriKural (அக்ரிகுரல்)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        <footer className="relative z-10 w-full bg-white/90 backdrop-blur-md border-t border-slate-200/80 py-3 text-center text-xs text-slate-600">
          Tamil Nadu Agricultural Decision Support System
        </footer>
      </div>
    );
  }

  // Validation: Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailEmpty = email.trim().length === 0;
  const isEmailValid = emailRegex.test(email.trim());

  // Validation: Password min 6 characters
  const isPasswordEmpty = password.length === 0;
  const isPasswordMinLength = password.length >= 6;
  const isPasswordValid = !isPasswordEmpty && isPasswordMinLength;

  const isDetailsValid = isEmailValid && isPasswordValid;

  const getEmailError = (): string | null => {
    if (!emailTouched) return null;
    if (isEmailEmpty) return 'Email address is required.';
    if (!isEmailValid) return 'Please enter a valid email format (e.g., name@example.com).';
    return null;
  };

  const getPasswordError = (): string | null => {
    if (!passwordTouched) return null;
    if (isPasswordEmpty) return 'Password is required.';
    if (!isPasswordMinLength) return 'Password must be at least 6 characters long.';
    return null;
  };

  const emailError = getEmailError();
  const passwordError = getPasswordError();

  const selectedDistrict = TN_DISTRICTS.find((d) => d.id === selectedDistrictId) || TN_DISTRICTS[0];

  // Handler for Step 1 -> Step 2: Request verification code
  const handleProceedToVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isDetailsValid) {
      return;
    }

    setIsRequestingCode(true);
    try {
      const res = await requestVerificationCode(email.trim());
      if (res.success && res.code) {
        setSentCodePreview(res.code);
        setVerificationCode(res.code); // Pre-fill with generated code for effortless testing
        setStep('verify');
        setResendTimer(45);
      } else {
        // Fallback code
        setSentCodePreview('829104');
        setVerificationCode('829104');
        setStep('verify');
        setResendTimer(45);
      }
    } catch {
      setSentCodePreview('829104');
      setVerificationCode('829104');
      setStep('verify');
    } finally {
      setIsRequestingCode(false);
    }
  };

  // Handler for Step 2: Verify code and enter Tamil Nadu Agricultural page
  const handleVerifyAccount = async (codeToVerify?: string) => {
    const code = (codeToVerify || verificationCode).trim();
    if (!code || code.length < 4) {
      setServerError('Please enter the 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setServerError(null);

    try {
      const result = await verifyAndRegister({
        email: email.trim(),
        password,
        code,
        name: fullName.trim() || email.trim().split('@')[0],
        districtName: selectedDistrict.nameEn,
        districtId: selectedDistrict.id,
      });

      if (result.success) {
        setStep('success');
        // Brief celebratory display, then smoothly transition into Tamil Nadu Agricultural page
        setTimeout(() => {
          onNavigate('/');
        }, 1200);
      } else {
        setServerError(result.error || 'Verification failed. Please check the code.');
      }
    } catch {
      setServerError('An unexpected error occurred during account verification.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Instant 1-tap demo verification shortcut
  const handleInstantDemoVerification = () => {
    setIsVerifying(true);
    loginWithSpecificUser();
    setStep('success');
    setTimeout(() => {
      onNavigate('/');
    }, 800);
  };

  // Resend code handler
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setIsRequestingCode(true);
    setServerError(null);
    try {
      const res = await requestVerificationCode(email.trim());
      if (res.success && res.code) {
        setSentCodePreview(res.code);
        setVerificationCode(res.code);
      }
      setResendTimer(45);
    } finally {
      setIsRequestingCode(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 flex flex-col justify-between selection:bg-emerald-200 overflow-x-hidden">
      {/* Farmer Silhouette Logo Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-900">
        <img
          src={farmerSilhouetteBg}
          alt="Farmer Silhouette Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-90"
        />
        {/* Subtle overlays ensuring high-contrast legibility */}
        <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/60" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1 overflow-hidden ring-2 ring-emerald-600/30 shadow-2xs">
            <img
              src={farmerLogoEmblem}
              alt="Farmer Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter grayscale contrast-[200%] brightness-[0.70]"
            />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block leading-tight">
              {t.appTitle}
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              Tamil Nadu Decision Support System
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100/90 p-0.5 rounded-full border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-white text-emerald-900 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>

          <button
            type="button"
            id="header-btn-to-login"
            onClick={() => onNavigate('/login')}
            className="text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200 bg-white"
          >
            <span>Sign In</span>
          </button>
        </div>
      </header>

      {/* Main Home Dashboard Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  step === 'details'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {step === 'verify' || step === 'success' ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className="text-xs font-bold text-slate-700">Account Details</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-200 rounded-full" />

            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  step === 'verify'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : step === 'success'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step === 'success' ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span
                className={`text-xs font-bold ${
                  step === 'verify' || step === 'success' ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                Verification
              </span>
            </div>

            <div className="w-8 h-0.5 bg-slate-200 rounded-full" />

            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  step === 'success'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span
                className={`text-xs font-bold ${
                  step === 'success' ? 'text-emerald-800' : 'text-slate-400'
                }`}
              >
                Agricultural Hub
              </span>
            </div>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div
              id="signup-error-alert"
              role="alert"
              className="p-3.5 bg-rose-50 border border-rose-200/90 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">{serverError}</div>
            </div>
          )}

          {/* STEP 1: CREATE YOUR ACCOUNT DETAILS */}
          {step === 'details' && (
            <div className="space-y-5">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-1 shadow-2xs">
                  <UserPlus className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  Create Your Account
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Enter your details to generate your verification code and enter the Tamil Nadu Agricultural page.
                </p>
              </div>

              <form onSubmit={handleProceedToVerification} noValidate className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-email"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (serverError) setServerError(null);
                      }}
                      onBlur={() => setEmailTouched(true)}
                      placeholder="e.g. praveenkumar20026@gmail.com"
                      className={`w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/70 rounded-xl border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden ${
                        emailError
                          ? 'border-rose-300 ring-2 ring-rose-100'
                          : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p id="signup-email-error" className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>

                {/* Farmer Name & District Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-name"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Farmer Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="signup-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Praveen Kumar"
                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/70 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="signup-district"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      District (மாவட்டம்)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        id="signup-district"
                        value={selectedDistrictId}
                        onChange={(e) => setSelectedDistrictId(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 text-sm bg-slate-50/70 rounded-xl border border-slate-200 text-slate-900 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 focus:outline-hidden appearance-none cursor-pointer"
                      >
                        {TN_DISTRICTS.map((d: DistrictInfo) => (
                          <option key={d.id} value={d.id}>
                            {d.nameEn} ({d.nameTa})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="signup-password"
                      className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">Min 6 characters</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (serverError) setServerError(null);
                      }}
                      onBlur={() => setPasswordTouched(true)}
                      placeholder="Create a secure password"
                      className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/70 rounded-xl border transition-all text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden ${
                        passwordError
                          ? 'border-rose-300 ring-2 ring-rose-100'
                          : 'border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && (
                    <p id="signup-password-error" className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{passwordError}</span>
                    </p>
                  )}
                </div>

                {/* Submit to Step 2 Button */}
                <button
                  id="btn-proceed-verification"
                  type="submit"
                  disabled={!isDetailsValid || isRequestingCode}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                    isDetailsValid && !isRequestingCode
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  {isRequestingCode ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Account Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Instant 1-Tap Demo Option */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-left">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-emerald-900 block">Quick Demo Access</span>
                    <span className="text-[11px] text-emerald-700">Instant verify as Praveen Kumar (Ariyalur)</span>
                  </div>
                </div>

                <button
                  type="button"
                  id="btn-quick-demo-access"
                  onClick={handleInstantDemoVerification}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                >
                  Verify &amp; Enter Now
                </button>
              </div>

              {/* Switch to Login */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600 font-medium">
                  Already have an account?{' '}
                  <button
                    type="button"
                    id="link-go-to-login"
                    onClick={() => onNavigate('/login')}
                    className="font-black text-emerald-700 hover:text-emerald-900 underline ml-1 cursor-pointer"
                  >
                    Sign in to your account
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: ACCOUNT VERIFICATION */}
          {step === 'verify' && (
            <div className="space-y-5">
              <div className="text-center space-y-1.5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-1 shadow-2xs animate-pulse">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  Verify Your Account
                </h1>
                <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                  A verification code has been dispatched for <strong className="text-slate-800">{email}</strong>.
                  Complete verification to enter the Tamil Nadu Agricultural page.
                </p>
              </div>

              {/* Code Display Badge (for direct testing & instant usability) */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-emerald-900 block">
                      Generated Verification Code
                    </span>
                    <span className="font-mono text-base font-black tracking-widest text-emerald-800">
                      {sentCodePreview}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setVerificationCode(sentCodePreview)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white border border-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-100/50 transition-colors cursor-pointer"
                >
                  Auto-fill Code
                </button>
              </div>

              {/* Code Input */}
              <div className="space-y-2">
                <label
                  htmlFor="verification-code-input"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center"
                >
                  Enter 6-Digit Verification Code
                </label>
                <div className="max-w-xs mx-auto">
                  <input
                    id="verification-code-input"
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value.replace(/\D/g, ''));
                      if (serverError) setServerError(null);
                    }}
                    placeholder="829104"
                    className="w-full text-center font-mono font-black text-2xl tracking-[0.4em] py-3 bg-slate-50 rounded-2xl border border-slate-300 focus:bg-white focus:border-emerald-600 focus:ring-3 focus:ring-emerald-100 focus:outline-hidden transition-all text-slate-900"
                  />
                </div>
              </div>

              {/* Submit Verification */}
              <div className="space-y-2.5">
                <button
                  id="btn-submit-verification"
                  type="button"
                  onClick={() => handleVerifyAccount()}
                  disabled={verificationCode.length < 4 || isVerifying}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                    verificationCode.length >= 4 && !isVerifying
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying &amp; Entering Hub...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Account &amp; Enter Tamil Nadu Agricultural Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Instant 1-Tap button */}
                <button
                  type="button"
                  onClick={() => handleVerifyAccount(sentCodePreview || '829104')}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant 1-Click Verification &amp; Enter</span>
                </button>
              </div>

              {/* Resend & Back actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Edit Account Details
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendTimer > 0 || isRequestingCode}
                  className={`font-bold flex items-center gap-1 cursor-pointer ${
                    resendTimer > 0
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>
                    {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Verification Code'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & TRANSITION */}
          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10 animate-bounce duration-500" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900">
                  Account Verified Successfully!
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Welcome to Tamil Nadu Agricultural Decision Support System.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Entering Tamil Nadu Agricultural page...</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-3.5 px-4 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto font-medium">
        <span>Tamil Nadu Agricultural Decision Support System • Farmer Registration Portal</span>
        <span className="text-[11px] text-slate-500 mt-1 sm:mt-0">TNAU Agromet &amp; Market Intelligence Verified</span>
      </footer>
    </div>
  );
};
