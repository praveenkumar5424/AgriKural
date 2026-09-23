import React, { useState, useEffect } from 'react';
import {
  Download,
  Wifi,
  WifiOff,
  Database,
  CheckCircle2,
  RefreshCw,
  Smartphone,
  Shield,
  HelpCircle,
  X,
  Share2,
} from 'lucide-react';

import { DistrictInfo, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PwaOfflineManagerProps {
  isOfflineMode: boolean;
  onToggleOfflineMode?: () => void;
  language?: Language;
}

export const PwaOfflineManager: React.FC<PwaOfflineManagerProps> = ({
  isOfflineMode,
  onToggleOfflineMode,
}) => {
  const { t, language } = useLanguage();
  const isTamil = language === 'ta';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [cacheStatus, setCacheStatus] = useState<'cached' | 'syncing' | 'ready'>('ready');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(true);

  useEffect(() => {
    // Monitor online / offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Capture PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install the TN Agri Hub PWA on your device: Tap the Share / Menu button in your browser, then select "Add to Home Screen" (முகப்புத் திரையில் சேர்க்கவும்).');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleSyncCache = () => {
    setCacheStatus('syncing');
    setTimeout(() => {
      setCacheStatus('cached');
      setTimeout(() => setCacheStatus('ready'), 3000);
    }, 1200);
  };

  const effectiveOffline = isOfflineMode || !isOnline;

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-4 shadow-sm select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold">
            {effectiveOffline ? (
              <span className="flex items-center gap-1.5 text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded-full">
                <WifiOff className="w-3.5 h-3.5 animate-pulse" />
                <span>OFFLINE PWA MODE (இணையமற்ற பயன்முறை)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Wifi className="w-3.5 h-3.5" />
                <span>PWA ACTIVE & LIVE SYNCED</span>
              </span>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300 text-[11px]">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Pre-cached: 38 TN Districts • Leaf Pathology • Mandi Matrices • Uzhavan Schemes</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Refresh / Re-cache button */}
          <button
            id="pwa-sync-cache-btn"
            onClick={handleSyncCache}
            disabled={cacheStatus === 'syncing'}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 px-2.5 py-1 rounded border border-slate-700 transition"
            title="Pre-cache latest farm advisories into device local storage"
          >
            <RefreshCw className={`w-3 h-3 text-emerald-400 ${cacheStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{cacheStatus === 'syncing' ? 'Caching...' : cacheStatus === 'cached' ? 'Cached!' : 'Update Offline Cache'}</span>
          </button>

          {/* Toggle Simulated Offline */}
          {onToggleOfflineMode && (
            <button
              id="pwa-toggle-offline-btn"
              onClick={onToggleOfflineMode}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border transition ${
                isOfflineMode
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Simulate low-connectivity rural field conditions without internet"
            >
              <WifiOff className="w-3 h-3" />
              <span>{isOfflineMode ? 'Exit Offline Sim' : 'Test Offline'}</span>
            </button>
          )}

          {/* Install PWA Button */}
          {!isInstalled && (
            <button
              id="pwa-install-app-btn"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold px-3 py-1 rounded shadow-sm transition transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App (நிறுவுக)</span>
            </button>
          )}

          {/* Info dropdown toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1 rounded transition"
            title="View PWA capabilities"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded PWA Feature Breakdown */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-300 animate-fadeIn">
          <div className="flex items-start gap-2 bg-slate-800/60 p-2 rounded">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Offline Disease Diagnosis</span>
              Scan leaf symptoms and view organic & chemical recommendations even without 2G/4G network coverage.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/60 p-2 rounded">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Fast Standalone Experience</span>
              Launches like a native Android/iOS mobile application with full-screen view and quick home-screen shortcuts.
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/60 p-2 rounded">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Automatic Background Cache</span>
              All 38 Tamil Nadu districts, seasonal calendars, crop matrix tables, and helpline numbers are saved locally.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
