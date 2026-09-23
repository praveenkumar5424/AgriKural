import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { FarmerProfileTab } from './FarmerProfileTab';
import { DistrictInfo } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDistrictSelect?: (district: DistrictInfo) => void;
  onNavigateTab?: (tabId: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onDistrictSelect,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="farmer-login-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="farmer-login-modal-content"
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-4 my-8"
      >
        {/* Close Button */}
        <button
          id="btn-close-login-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer z-10"
          aria-label="Close Login Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Embedded FarmerProfileTab Component */}
        <FarmerProfileTab
          onLoginSuccess={onClose}
          onNavigateTab={(tab) => {
            onClose();
            if (onNavigateTab) onNavigateTab(tab);
          }}
          onDistrictSelect={onDistrictSelect}
        />
      </div>
    </div>
  );
};
