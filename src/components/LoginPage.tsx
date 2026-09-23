import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import farmerSilhouetteBg from '../assets/images/farmer_silhouette_bg_1788848577927.jpg';
import farmerLogoEmblem from '../assets/images/farmer_logo_emblem_1788848539136.jpg';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, user } = useAuth();
  const { t } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field touch tracking for clean inline error displays
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Email format validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email.trim());
  const isEmailEmpty = email.trim().length === 0;

  // Password validation: must be non-empty
  const isPasswordEmpty = password.length === 0;
  const isPasswordValid = !isPasswordEmpty;

  // Form validity for disabling the submit button
  const isFormValid = isEmailValid && isPasswordValid;

  // Inline error messages
  const getEmailError = (): string | null => {
    if (!emailTouched) return null;
    if (isEmailEmpty) return 'Email address is required.';
    if (!isEmailValid) return 'Please enter a valid email format (e.g., name@example.com).';
    return null;
  };

  const getPasswordError = (): string | null => {
    if (!passwordTouched) return null;
    if (isPasswordEmpty) return 'Password is required.';
    return null;
  };

  const emailError = getEmailError();
  const passwordError = getPasswordError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setEmailTouched(true);
    setPasswordTouched(true);

    // Strict validation guard: do NOT authenticate or redirect if invalid
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        // Redirect to homepage / dashboard on success
        onNavigate('/');
      } else {
        // Keep on /login and show clear error without revealing whether email or password was wrong
        setServerError(result.error || 'Invalid email or password. Please check your credentials and try again.');
      }
    } catch (err) {
      setServerError('An unexpected error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
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

      {/* Top Simple Header */}
      <header className="relative z-10 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
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

        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer bg-white border border-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home Dashboard</span>
        </button>
      </header>

      {/* Main Login Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Header Title */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-1 shadow-2xs">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Enter your registered email and password to access the platform.
            </p>
          </div>

          {/* Already Logged In Notice if applicable */}
          {user && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Currently active session:</span>{' '}
                <span className="font-mono text-emerald-800 font-semibold">{user.email}</span>.
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="underline font-extrabold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                  >
                    Go to Dashboard →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Server Error Alert Banner */}
          {serverError && (
            <div
              id="login-error-alert"
              role="alert"
              className="p-3.5 bg-rose-50 border border-rose-200/90 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-150"
            >
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="font-semibold leading-relaxed">
                {serverError}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
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
              {/* Inline error for email */}
              {emailError && (
                <p id="login-email-error" className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (serverError) setServerError(null);
                  }}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="Enter your password"
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
              {/* Inline error for password */}
              {passwordError && (
                <p id="login-password-error" className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordError}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-button"
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                isFormValid && !isSubmitting
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper Hint */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Farm Credentials</span>
            </div>
            <p className="text-slate-500">
              Enter any registered email and password. For immediate testing, you can use:
            </p>
            <div className="font-mono text-emerald-800 bg-white border border-slate-200 px-2 py-1 rounded-md text-[11px] flex justify-between items-center">
              <span>praveenkumar20026@gmail.com</span>
              <span className="text-slate-400">/</span>
              <span>Farmer@123</span>
            </div>
          </div>

          {/* Switch to Signup Link */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600 font-medium">
              Don't have an account?{' '}
              <button
                type="button"
                id="link-go-to-signup"
                onClick={() => onNavigate('/signup')}
                className="font-black text-emerald-700 hover:text-emerald-900 underline ml-1 cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-3.5 text-center text-xs text-slate-600 font-medium">
        Tamil Nadu Agricultural Decision Support System • Secure Session Authentication
      </footer>
    </div>
  );
};
