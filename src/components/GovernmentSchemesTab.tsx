import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Droplets,
  Tractor,
  Sun,
  Sprout,
  Calculator,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
  Clock,
  PhoneCall,
  Download,
  AlertCircle,
  HelpCircle,
  IndianRupee,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Building,
  Smartphone,
} from 'lucide-react';
import { DistrictInfo, GovtScheme, SchemeApplicationRecord, SchemeCategory } from '../types';
import { TN_GOVT_SCHEMES, SAMPLE_SCHEME_APPLICATIONS } from '../data/schemeData';
import { useLanguage } from '../context/LanguageContext';

interface GovernmentSchemesTabProps {
  district: DistrictInfo;
  isOfflineMode: boolean;
}

const CATEGORY_TABS: { id: string; label: string; labelTa: string; icon: any }[] = [
  { id: 'all', label: 'All Schemes', labelTa: 'அனைத்து திட்டங்கள்', icon: Landmark },
  { id: 'crop_insurance', label: 'Crop Insurance (PMFBY)', labelTa: 'பயிர் காப்பீடு', icon: ShieldCheck },
  { id: 'micro_irrigation', label: 'Micro Irrigation (100% Drip)', labelTa: 'சொட்டு நீர் மானியம்', icon: Droplets },
  { id: 'mechanization', label: 'Machinery & Tractor', labelTa: 'வேளாண் இயந்திரங்கள்', icon: Tractor },
  { id: 'solar_energy', label: 'Solar Pumps (PM-KUSUM)', labelTa: 'சோலார் பம்புசெட்', icon: Sun },
  { id: 'input_subsidies', label: 'Seeds & Fertilizers', labelTa: 'விதை & இடுபொருட்கள்', icon: Sprout },
];

export const GovernmentSchemesTab: React.FC<GovernmentSchemesTabProps> = ({
  district,
  isOfflineMode,
}) => {
  const { t, getDistrictName, language } = useLanguage();
  const districtName = getDistrictName(district);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'calculator' | 'tracker' | 'uzhavan_hub'>('directory');

  // Selected scheme for detailed modal or checklist
  const [selectedScheme, setSelectedScheme] = useState<GovtScheme | null>(TN_GOVT_SCHEMES[0]);

  // Eligibility Calculator State
  const [calcSchemeType, setCalcSchemeType] = useState<string>('micro_irrigation');
  const [calcFarmerType, setCalcFarmerType] = useState<'small_marginal' | 'other'>('small_marginal');
  const [calcLandAcres, setCalcLandAcres] = useState<number>(2.5);
  const [calcCropType, setCalcCropType] = useState<string>('Paddy / Banana / Vegetables');

  // Application Tracker State
  const [trackerSearchId, setTrackerSearchId] = useState<string>('TN-APP-88491');
  const [activeTrackResult, setActiveTrackResult] = useState<SchemeApplicationRecord | null>(SAMPLE_SCHEME_APPLICATIONS[0]);
  const [trackError, setTrackError] = useState<string | null>(null);

  // Filter schemes based on category & search
  const filteredSchemes = TN_GOVT_SCHEMES.filter((scheme) => {
    const matchCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      scheme.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nameTa.includes(searchQuery) ||
      scheme.schemeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.taglineTa.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  // Calculate Subsidy Math
  const calculateSubsidy = () => {
    if (calcSchemeType === 'micro_irrigation') {
      const baseCostPerAcre = 45000;
      const totalCost = baseCostPerAcre * calcLandAcres;
      const subsidyPct = calcFarmerType === 'small_marginal' ? 1.0 : 0.75;
      const subsidyAmount = totalCost * subsidyPct;
      const farmerShare = totalCost - subsidyAmount;
      return {
        totalCost,
        subsidyAmount,
        farmerShare,
        subsidyLabel: calcFarmerType === 'small_marginal' ? '100% Full Govt Subsidy (Small/Marginal)' : '75% Govt Subsidy (General Farmers)',
        guidance: 'Includes ISI grade drip laterals, screen filter, venturi fertigation unit, and 5-year warranty.',
      };
    } else if (calcSchemeType === 'solar_pump') {
      const hp = calcLandAcres > 3 ? 7.5 : 5.0;
      const totalCost = hp === 7.5 ? 380000 : 275000;
      const subsidyAmount = totalCost * 0.70; // 70%
      const farmerShare = totalCost - subsidyAmount;
      return {
        totalCost,
        subsidyAmount,
        farmerShare,
        subsidyLabel: '70% Total Subsidy (30% Central + 40% State Govt)',
        guidance: `${hp} HP Solar Standalone Photovoltaic system with RMS controller, zero monthly power bills.`,
      };
    } else if (calcSchemeType === 'tractor_machinery') {
      const totalCost = 650000; // Average 45 HP Tractor
      const subsidyAmount = calcFarmerType === 'small_marginal' ? 200000 : 160000;
      const farmerShare = totalCost - subsidyAmount;
      return {
        totalCost,
        subsidyAmount,
        farmerShare,
        subsidyLabel: calcFarmerType === 'small_marginal' ? '50% Subsidy (Capped at ₹2.00 Lakhs)' : '40% Subsidy (Capped at ₹1.60 Lakhs)',
        guidance: 'Available for TNAU/Govt empanelled tractor and farm machinery brands with DBT transfer.',
      };
    } else {
      // Crop Insurance PMFBY
      const sumInsuredPerAcre = 38500;
      const totalInsuredSum = sumInsuredPerAcre * calcLandAcres;
      const farmerPremiumRate = 0.015; // 1.5% for Rabi/Samba
      const farmerShare = Math.round(totalInsuredSum * farmerPremiumRate);
      const govtSubsidyShare = Math.round(totalInsuredSum * 0.185); // Govt pays the rest of actuarial rate ~18.5%
      return {
        totalCost: totalInsuredSum,
        subsidyAmount: govtSubsidyShare,
        farmerShare: farmerShare,
        subsidyLabel: 'Govt Pays ~92% Actuarial Premium (Farmer pays only 1.5% for Samba)',
        guidance: `Complete loss coverage up to ₹${totalInsuredSum.toLocaleString('en-IN')} for ${calcLandAcres} acres in case of drought, cyclone, or pests.`,
      };
    }
  };

  const calcResult = calculateSubsidy();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError(null);
    const found = SAMPLE_SCHEME_APPLICATIONS.find(
      (app) =>
        app.id.toLowerCase() === trackerSearchId.trim().toLowerCase() ||
        app.mobileNumber.includes(trackerSearchId.trim()) ||
        app.surveyNo.toLowerCase() === trackerSearchId.trim().toLowerCase()
    );

    if (found) {
      setActiveTrackResult(found);
    } else {
      // Generate a simulated active entry
      setActiveTrackResult({
        id: trackerSearchId.toUpperCase(),
        schemeId: 'pmfby-samba-insurance',
        schemeName: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        farmerName: 'Thiru. Shanmugam (Verified Aadhaar)',
        mobileNumber: '98421XXXXX',
        district: district.name,
        taluk: 'Central Taluk',
        surveyNo: '118/2',
        appliedDate: '18 Oct 2025',
        currentStage: 'under_inspection',
        statusDescription: `Application received at ${district.name} Agricultural Extension Office. Field officer scheduled for physical crop verification.`,
        statusDescriptionTa: `${district.name} வட்டார வேளாண்மை விரிவாக்க மையத்தில் விண்ணப்பம் பரிசீலனையில் உள்ளது. விரைவில் நேரடி கள ஆய்வு நடைபெறும்.`,
        estimatedSanctionAmount: '₹54,000 (Insured Sum)',
        lastUpdated: 'Today at 10:45 AM',
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      {/* Top Banner with Scheme Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800/60 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5" />
                TAMIL NADU GOVT & UZHAVAN APP LINKAGE
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2 py-0.5 rounded-full">
                Direct Benefit Transfer (DBT)
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.govSchemesTitle}
            </h2>
            <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
              {t.govSchemesSubtitle}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex sm:flex-col gap-3 bg-emerald-950/70 border border-emerald-700/50 p-3.5 rounded-xl text-center sm:text-right shrink-0">
            <div>
              <span className="text-xs text-emerald-300 block">Drip Subsidy for Small Farmers</span>
              <span className="text-xl font-black text-amber-300">100% FREE</span>
            </div>
            <div className="border-l sm:border-l-0 sm:border-t border-emerald-800/80 pl-3 sm:pl-0 sm:pt-2">
              <span className="text-xs text-emerald-300 block">Kisan Toll-Free Helpline</span>
              <a href="tel:18001801551" className="text-sm font-bold text-white hover:text-emerald-300 flex items-center sm:justify-end gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                1800-180-1551
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-emerald-800/60">
          <button
            id="subtab-directory"
            onClick={() => setActiveSubTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'directory'
                ? 'bg-white text-emerald-950 shadow-md scale-102'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>SCHEME DIRECTORY (திட்டங்கள் பட்டியல்)</span>
          </button>

          <button
            id="subtab-calculator"
            onClick={() => setActiveSubTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'calculator'
                ? 'bg-white text-emerald-950 shadow-md scale-102'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>SUBSIDY CALCULATOR (மானியக் கணக்கீடு)</span>
          </button>

          <button
            id="subtab-tracker"
            onClick={() => setActiveSubTab('tracker')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'tracker'
                ? 'bg-white text-emerald-950 shadow-md scale-102'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>APPLICATION TRACKER (நிலை அறிதல்)</span>
          </button>

          <button
            id="subtab-uzhavan-hub"
            onClick={() => setActiveSubTab('uzhavan_hub')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'uzhavan_hub'
                ? 'bg-white text-emerald-950 shadow-md scale-102'
                : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UZHAVAN APP GATEWAY (உழவன் செயலி)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SCHEME DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-5">
          {/* Filter & Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {CATEGORY_TABS.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    id={`cat-filter-${cat.id}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-sm font-semibold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search scheme, crop, or subsidy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                id={`scheme-card-${scheme.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="bg-slate-50/90 border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-300 px-2 py-0.5 rounded">
                        {scheme.schemeCode}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {scheme.status}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-md">
                      {scheme.subsidyPercentage}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition">
                        {scheme.nameTa}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">
                        {scheme.nameEn}
                      </p>
                      <p className="text-xs text-emerald-800 bg-emerald-50/80 border-l-2 border-emerald-600 pl-2.5 py-1 mt-2 rounded-r">
                        {scheme.taglineTa}
                      </p>
                    </div>

                    {/* Deadline Notice if any */}
                    {scheme.deadlineNotice && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/80 border border-amber-200 p-2 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-medium">{scheme.deadlineNotice}</span>
                      </div>
                    )}

                    {/* Key Features */}
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                        முக்கிய நன்மைகள் (Key Benefits):
                      </span>
                      {scheme.keyFeaturesTa.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Eligibility & Documents Snippet */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 block mb-1">
                          தகுதி (Eligibility):
                        </span>
                        <p className="text-slate-600">{scheme.eligibilityCriteriaTa[0]}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="font-semibold text-slate-900 block mb-1">
                          தேவையான ஆவணங்கள் (Documents):
                        </span>
                        <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                          {scheme.requiredDocuments.map((doc, i) => (
                            <span key={i} className="bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50 border-t border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 block">உழவன் செயலி பிரிவு:</span>
                    <span className="text-emerald-700 font-medium">{scheme.uzhavanModule}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedScheme(scheme);
                        setActiveSubTab('calculator');
                        if (scheme.category === 'micro_irrigation') setCalcSchemeType('micro_irrigation');
                        else if (scheme.category === 'solar_energy') setCalcSchemeType('solar_pump');
                        else if (scheme.category === 'mechanization') setCalcSchemeType('tractor_machinery');
                        else setCalcSchemeType('crop_insurance');
                      }}
                      className="flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-2xs"
                    >
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Estimate Subsidy</span>
                    </button>

                    <a
                      href={scheme.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs"
                    >
                      <span>Apply Online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: SUBSIDY CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>வேளாண் மானியக் கணக்கீடு (Subsidy & Net Farmer Share Calculator)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your scheme, land acreage, and category to calculate the exact government grant and direct beneficiary share.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  1. தேர்ந்தெடுக்கப்பட்ட திட்டம் (Select Scheme)
                </label>
                <select
                  value={calcSchemeType}
                  onChange={(e) => setCalcSchemeType(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="micro_irrigation">Micro Irrigation (100% Drip / Sprinkler - PMKSY)</option>
                  <option value="solar_pump">PM-KUSUM 70% Solar Agriculture Pumpset</option>
                  <option value="tractor_machinery">SMAM Farm Machinery & Tractor Subsidy (Up to 50%)</option>
                  <option value="crop_insurance">PMFBY Samba Crop Insurance Scheme</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  2. விவசாயி வகை (Farmer Category)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcFarmerType('small_marginal')}
                    className={`p-3 rounded-xl border text-left transition ${
                      calcFarmerType === 'small_marginal'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs'
                    }`}
                  >
                    <span className="block text-xs font-bold">சிறு / குறு விவசாயி</span>
                    <span className="text-[11px] text-slate-500 font-normal">Small / Marginal (&lt;5.0 Acres)</span>
                    <span className="block mt-1 text-[11px] text-emerald-700 font-bold">100% Subsidy Eligible</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcFarmerType('other')}
                    className={`p-3 rounded-xl border text-left transition ${
                      calcFarmerType === 'other'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs'
                    }`}
                  >
                    <span className="block text-xs font-bold">இதர விவசாயி</span>
                    <span className="text-[11px] text-slate-500 font-normal">Other / Medium Farmer (&gt;5.0 Acres)</span>
                    <span className="block mt-1 text-[11px] text-emerald-700 font-bold">75% Subsidy Eligible</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    3. சாகுபடி பரப்பளவு (Cultivation Land Size)
                  </label>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {calcLandAcres} Acres ({Math.round(calcLandAcres * 0.4046 * 10) / 10} Hectares)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={calcLandAcres}
                  onChange={(e) => setCalcLandAcres(parseFloat(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.5 Acre</span>
                  <span>2.5 Acres</span>
                  <span>5.0 Acres</span>
                  <span>10.0 Acres</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  4. பயிர் வகை (Crop Type)
                </label>
                <select
                  value={calcCropType}
                  onChange={(e) => setCalcCropType(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Paddy (Rice)">Paddy / Rice (நெல்)</option>
                  <option value="Sugarcane">Sugarcane (கரும்பு)</option>
                  <option value="Banana / Orchards">Banana / Mango / Guava (வாழை, மா, கொய்யா)</option>
                  <option value="Vegetables (Tomato/Chilli)">Vegetables - Tomato, Brinjal, Chilli (காய்கறிகள்)</option>
                  <option value="Coconut">Coconut Grove (தென்னை தோப்பு)</option>
                </select>
              </div>
            </div>

            {/* Output Calculation Result Box */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 rounded-2xl border border-emerald-800/80 shadow-md flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
                    ESTIMATED SUBSIDY BREAKDOWN
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                    District: {district.name}
                  </span>
                </div>

                {/* Major Subsidy Number */}
                <div className="my-5 space-y-1">
                  <span className="text-xs text-slate-300">அரசு மானியத் தொகை (Govt Subsidy Grant):</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 flex items-center">
                    <IndianRupee className="w-8 h-8 mr-1 text-emerald-400" />
                    {Math.round(calcResult.subsidyAmount).toLocaleString('en-IN')}
                  </div>
                  <span className="text-xs text-amber-300 font-semibold block">
                    {calcResult.subsidyLabel}
                  </span>
                </div>

                {/* Detail Breakdown Table */}
                <div className="space-y-2 text-xs bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-800/70">
                  <div className="flex justify-between text-slate-300">
                    <span>மொத்த திட்ட மதிப்பீடு (Total Project Cost):</span>
                    <span className="font-bold text-white">₹{Math.round(calcResult.totalCost).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-300 font-semibold">
                    <span>அரசு வழங்கும் மானியம் (Government Grant):</span>
                    <span>- ₹{Math.round(calcResult.subsidyAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold pt-2 border-t border-emerald-800">
                    <span>விவசாயி செலுத்த வேண்டிய பங்கு (Farmer Share):</span>
                    <span className="text-base">₹{Math.round(calcResult.farmerShare).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 mt-3 italic">
                  💡 {calcResult.guidance}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-emerald-800">
                <a
                  href="https://tnhorticulture.tn.gov.in/mimis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Apply on Uzhavan Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => alert(`Official Subsidy Estimate Sheet saved for ${calcLandAcres} Acres ${calcCropType} in ${district.name}. You can present this at your Block Agricultural Extension Centre (AEC).`)}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs py-2.5 px-3 rounded-xl border border-slate-700 transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: APPLICATION & CLAIM TRACKER */}
      {activeSubTab === 'tracker' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>விண்ணப்ப நிலை & பயிர் காப்பீடு கோரிக்கை அறிதல் (Application & Claim Tracker)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your Application Reference Number, Mobile Number, or Survey Number to trace live status with VAO, ADA, and DBT disbursement.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="E.g. TN-APP-88491 or 98421XXXXX or 142/3B"
                value={trackerSearchId}
                onChange={(e) => setTrackerSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Track Application (தேடுக)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo ID Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Sample Records:</span>
            {SAMPLE_SCHEME_APPLICATIONS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setTrackerSearchId(sample.id);
                  setActiveTrackResult(sample);
                }}
                className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 px-2 py-1 rounded text-[11px] font-mono transition"
              >
                {sample.id} ({sample.schemeName.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Result Card */}
          {activeTrackResult && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-6 animate-fadeIn">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {activeTrackResult.id}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {activeTrackResult.schemeName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Applicant: <strong className="text-slate-800">{activeTrackResult.farmerName}</strong> • Survey No: <strong className="text-slate-800">{activeTrackResult.surveyNo}</strong> ({activeTrackResult.district}, {activeTrackResult.taluk})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Sanction / Insured Amount</span>
                  <span className="text-lg font-extrabold text-emerald-700">
                    {activeTrackResult.estimatedSanctionAmount}
                  </span>
                </div>
              </div>

              {/* Progress Milestones Timeline */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  நிகழ்வுக்கோடு (Application Progress Timeline):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                  {[
                    { stage: 'submitted', label: '1. Submitted', labelTa: 'விண்ணப்பிக்கப்பட்டது' },
                    { stage: 'under_inspection', label: '2. Field Check', labelTa: 'கள ஆய்வு' },
                    { stage: 'verified_by_vao', label: '3. VAO Certified', labelTa: 'அடங்கல் சரிபார்ப்பு' },
                    { stage: 'approved_by_ada', label: '4. ADA Approved', labelTa: 'அங்கீகரிக்கப்பட்டது' },
                    { stage: 'dbt_credited', label: '5. DBT Credited', labelTa: 'வங்கி வரவு' },
                  ].map((step, idx) => {
                    const stagesOrder = ['submitted', 'under_inspection', 'verified_by_vao', 'approved_by_ada', 'dbt_credited'];
                    const currentIdx = stagesOrder.indexOf(activeTrackResult.currentStage);
                    const stepIdx = stagesOrder.indexOf(step.stage);
                    const isDone = stepIdx <= currentIdx;
                    const isCurrent = stepIdx === currentIdx;

                    return (
                      <div
                        key={step.stage}
                        className={`p-3 rounded-xl border text-center transition ${
                          isCurrent
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-white text-slate-400 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {isDone ? (
                            <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-300" />
                          )}
                        </div>
                        <span className="block text-xs font-bold leading-tight">{step.label}</span>
                        <span className="block text-[10px] opacity-85 mt-0.5">{step.labelTa}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Details Box */}
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>தற்போதைய நிலை (Current Status Note):</span>
                  </span>
                  <span className="text-slate-400 text-[11px]">{activeTrackResult.lastUpdated}</span>
                </div>
                <p className="text-xs text-slate-800 font-medium">
                  {activeTrackResult.statusDescriptionTa}
                </p>
                <p className="text-xs text-slate-500">
                  {activeTrackResult.statusDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: UZHAVAN APP GATEWAY */}
      {activeSubTab === 'uzhavan_hub' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <span>உழவன் செயலி & நேரடி இணைய நுழைவு வாயில் (Uzhavan App Direct Gateway)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct access to all 14 official e-services of the Tamil Nadu Department of Agriculture, Horticulture, and Agricultural Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'பயிர் காப்பீடு விவரம் (Crop Insurance)',
                desc: 'PMFBY insurance premium payment, cut-off dates, and claim status tracking.',
                url: 'https://pmfby.gov.in',
                badge: 'PMFBY Portal',
              },
              {
                title: 'மானிய திட்டங்கள் பதிவு (Subsidy Schemes)',
                desc: 'Apply for seeds, bio-fertilizers, micro-nutrients, and farm machinery subsidies.',
                url: 'https://agrisnet.tn.gov.in',
                badge: 'Agrisnet TN',
              },
              {
                title: 'சொட்டு நீர் பாசன பதிவு (Micro Irrigation)',
                desc: 'Directorate of Horticulture 100% subsidy scheme registration and vendor selection.',
                url: 'https://tnhorticulture.tn.gov.in/mimis',
                badge: 'MIMIS Portal',
              },
              {
                title: 'வேளாண் இயந்திர வாடகை மையம் (Machinery Hiring)',
                desc: 'Book tractors, power tillers, and harvesters from government Custom Hiring Centres.',
                url: 'https://agrimachinery.nic.in',
                badge: 'AED Hiring',
              },
              {
                title: 'சந்தை நிலவரம் & உழவர் சந்தை (Mandi Prices)',
                desc: 'Daily wholesale and retail market price intelligence from Uzhavar Sandhai.',
                url: 'https://enam.gov.in',
                badge: 'e-NAM / TNAMB',
              },
              {
                title: 'அணை நீர்மட்டம் & வானிலை (Dam & Weather)',
                desc: 'Mettur Stanley Dam, Bhavanisagar, and Vaigai reservoir water release updates.',
                url: 'https://tnagriculture.in',
                badge: 'TNAU Agritech',
              },
            ].map((srv, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
                      {srv.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{srv.title}</h4>
                  <p className="text-xs text-slate-600">{srv.desc}</p>
                </div>

                <a
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Uzhavan App Mobile Download Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold">உழவன் செயலியை உங்கள் மொபைலில் பதிவிறக்கம் செய்க</h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                Available on Google Play Store for Android devices • Official Govt of Tamil Nadu App
              </p>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.uzhavan&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-950 font-extrabold text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>Download Uzhavan App</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
