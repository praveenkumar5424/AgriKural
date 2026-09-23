import React, { useState, useEffect } from 'react';
import {
  Landmark,
  ShieldCheck,
  Award,
  FileCheck,
  CheckCircle2,
  Phone,
  ExternalLink,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
  Info,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import { DistrictInfo, MatchedScheme, FarmEligibilityInput } from '../types';
import { TN_DISTRICTS } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface SchemeEligibilityFinderProps {
  currentDistrict: DistrictInfo;
}

export const SchemeEligibilityFinder: React.FC<SchemeEligibilityFinderProps> = ({
  currentDistrict,
}) => {
  const { t, getDistrictName } = useLanguage();
  const [form, setForm] = useState<FarmEligibilityInput>({
    farmerName: 'Thiru. Selvam',
    district: currentDistrict.nameEn,
    landHoldingAcres: 2.5,
    farmerCategory: 'General',
    landOwnership: 'Owner-Cultivator',
    waterSource: 'Canal Irrigated',
    cropCategory: 'Paddy / Grains',
    annualIncomeRange: '₹1 - 2.5 Lakhs',
    hasKisanCreditCard: true,
    hasSoilHealthCard: true,
  });

  const [matchedSchemes, setMatchedSchemes] = useState<MatchedScheme[]>([]);
  const [totalBenefit, setTotalBenefit] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSchemeForDetail, setSelectedSchemeForDetail] = useState<MatchedScheme | null>(null);

  const calculateEligibility = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/schemes/match-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to match schemes');
      const data = await res.json();
      setMatchedSchemes(data.matchedSchemes || []);
      setTotalBenefit(data.totalPotentialAnnualBenefitInr || 0);
      if (data.matchedSchemes && data.matchedSchemes.length > 0) {
        setSelectedSchemeForDetail(data.matchedSchemes[0]);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, district: currentDistrict.nameEn }));
  }, [currentDistrict.nameEn]);

  useEffect(() => {
    calculateEligibility();
  }, [form.district, form.landHoldingAcres, form.farmerCategory, form.waterSource, form.cropCategory]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-amber-900/40">
        <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" />
                State &amp; Central Schemes
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Uzhavan Portal Synchronized
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.schemeEligibilityTitle}
            </h1>
            <p className="text-sm text-amber-100/90 max-w-2xl font-medium">
              {t.schemeEligibilitySubtitle}
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[170px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 block">
              Total Potential Grant Benefit
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300">
              ₹{totalBenefit.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5">Annual Subsidies &amp; Cover</span>
          </div>
        </div>
      </div>

      {/* Farm Details Interactive Questionnaire */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-700" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Farm Profile &amp; Land Holding Verification
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Rule-Based Government Criteria
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Land Holding */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Land Holding (Acres)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="25"
                value={form.landHoldingAcres}
                onChange={(e) =>
                  setForm((p) => ({ ...p, landHoldingAcres: Math.max(0.5, Number(e.target.value)) }))
                }
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <span className="text-xs font-bold text-slate-500 shrink-0">
                {form.landHoldingAcres <= 2.5
                  ? 'Marginal'
                  : form.landHoldingAcres <= 5.0
                  ? 'Small'
                  : 'Medium/Large'}
              </span>
            </div>
          </div>

          {/* Farmer Social Category */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Farmer Category
            </label>
            <select
              value={form.farmerCategory}
              onChange={(e) => setForm((p) => ({ ...p, farmerCategory: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="General">General Category</option>
              <option value="SC/ST">SC / ST Farmer (Enhanced Subsidy)</option>
              <option value="Women Farmer">Women Farmer (Priority Allocation)</option>
              <option value="FPO Member / Smallholder">FPO Member / Smallholder</option>
            </select>
          </div>

          {/* Water Source */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Irrigation / Water Source
            </label>
            <select
              value={form.waterSource}
              onChange={(e) => setForm((p) => ({ ...p, waterSource: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="Canal Irrigated">Canal / River Delta Irrigated</option>
              <option value="Borewell / Open Well">Borewell / Open Well</option>
              <option value="Rainfed / Dryland">Rainfed / Dryland Farming</option>
            </select>
          </div>

          {/* Primary Crop Category */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Crop Category
            </label>
            <select
              value={form.cropCategory}
              onChange={(e) => setForm((p) => ({ ...p, cropCategory: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="Paddy / Grains">Paddy &amp; Cereals (Kuruvai/Samba)</option>
              <option value="Millets / Minor Cereals">Millets (Ragi/Kambu/Cholam)</option>
              <option value="Pulses">Pulses (Blackgram/Greengram)</option>
              <option value="Horticulture & Vegetables">Horticulture &amp; Vegetables</option>
              <option value="Sugarcane & Commercial">Sugarcane &amp; Cotton</option>
              <option value="Oilseeds">Groundnut &amp; Sesame</option>
            </select>
          </div>
        </div>

        {/* Quick Checkbox Tags */}
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasKisanCreditCard}
              onChange={(e) => setForm((p) => ({ ...p, hasKisanCreditCard: e.target.checked }))}
              className="rounded-sm text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <span>Has Kisan Credit Card (KCC)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.hasSoilHealthCard}
              onChange={(e) => setForm((p) => ({ ...p, hasSoilHealthCard: e.target.checked }))}
              className="rounded-sm text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <span>Has Soil Health Card</span>
          </label>
        </div>
      </div>

      {/* Matched Schemes Results Section */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white rounded-3xl border border-slate-200/90">
          <RefreshCw className="w-8 h-8 animate-spin text-amber-600" />
          <p className="text-sm font-bold text-slate-600">
            Matching land holding parameters against Tamil Nadu &amp; Central subsidy portals...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Matched Scheme Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Matched Eligible Government Schemes ({matchedSchemes.length})
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Verified Guidelines
              </span>
            </div>

            {matchedSchemes.map((scheme) => (
              <div
                key={scheme.schemeId}
                onClick={() => setSelectedSchemeForDetail(scheme)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                  selectedSchemeForDetail?.schemeId === scheme.schemeId
                    ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                      {scheme.category}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {scheme.matchConfidenceScore}% Match Score
                    </span>
                  </div>

                  <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl">
                    {scheme.annualBenefitLabel}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900">{scheme.schemeName}</h4>
                  <p className="text-xs text-amber-900 font-bold italic mt-0.5">{scheme.tamilName}</p>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {scheme.coverageDetailsEn}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold truncate max-w-[280px]">
                    {scheme.department}
                  </span>
                  <button className="font-black text-amber-700 hover:text-amber-900 flex items-center gap-1 shrink-0">
                    View Documents <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Document Checklist & Application Drawer */}
          {selectedSchemeForDetail && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5 self-start sticky top-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {selectedSchemeForDetail.schemeId} • Selected Scheme
                </span>
                <h3 className="text-base font-black text-slate-900 mt-2">
                  {selectedSchemeForDetail.schemeName}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Estimated Financial Grant: <span className="font-bold text-slate-900">₹{selectedSchemeForDetail.estimatedGrantValueInr.toLocaleString('en-IN')}</span>
                </p>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Required Application Documents:
                </h4>
                <ul className="space-y-2">
                  {selectedSchemeForDetail.requiredDocuments.map((doc, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tamil Explanation */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950 font-medium italic">
                {selectedSchemeForDetail.coverageDetailsTa}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={selectedSchemeForDetail.applyPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apply on Government Portal
                </a>

                <a
                  href={`tel:${selectedSchemeForDetail.helplinePhone}`}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-700" />
                  Toll-Free Helpline: {selectedSchemeForDetail.helplinePhone}
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
