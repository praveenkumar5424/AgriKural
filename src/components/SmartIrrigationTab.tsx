import React, { useState, useMemo } from 'react';
import {
  Droplets,
  Gauge,
  Waves,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Compass,
  Search,
  SlidersHorizontal,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  MapPin,
  Activity,
  CloudRain,
} from 'lucide-react';
import { DistrictInfo, ReservoirTelemetry } from '../types';
import {
  TN_RESERVOIRS,
  TN_CANAL_TELEMETRY,
  CROP_WATER_SPECS,
} from '../data/waterData';
import { speakText } from '../hooks/useVoiceRecognition';
import { useLanguage } from '../context/LanguageContext';
import metturDamBg from '../assets/images/mettur_dam_reservoir_1788678620727.jpg';

interface SmartIrrigationTabProps {
  district: DistrictInfo;
  isOfflineMode: boolean;
}

export const SmartIrrigationTab: React.FC<SmartIrrigationTabProps> = ({
  district,
  isOfflineMode,
}) => {
  const { t, getDistrictName, language } = useLanguage();
  // Input State
  const [acreage, setAcreage] = useState<number>(2);
  const [selectedCropKey, setSelectedCropKey] = useState<string>('paddy');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(1);
  const [irrigationMethod, setIrrigationMethod] = useState<
    'Drip' | 'Alternate Wetting & Drying (AWD)' | 'Micro-Sprinkler' | 'Furrow / Ridge'
  >('Alternate Wetting & Drying (AWD)');
  const [waterSource, setWaterSource] = useState<string>('Mettur / Cauvery Canal Water');
  const [soilType, setSoilType] = useState<string>(district.majorSoil || 'Alluvial Clay Loam');

  // AI & Calculation State
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingDamId, setSpeakingDamId] = useState<string | null>(null);
  const [aiEnhancedResult, setAiEnhancedResult] = useState<any | null>(null);

  // Selected Reservoir for Detailed Inspection
  const [selectedReservoirId, setSelectedReservoirId] = useState<string>('mettur-stanley');

  // All Dam Explorer Filter State
  const [damSearchQuery, setDamSearchQuery] = useState<string>('');
  const [selectedBasinFilter, setSelectedBasinFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [damSortBy, setDamSortBy] = useState<'storage' | 'levelPct' | 'inflow' | 'ayacut'>('storage');

  const selectedCrop = CROP_WATER_SPECS[selectedCropKey] || CROP_WATER_SPECS.paddy;
  const currentStage = selectedCrop.stages[selectedStageIndex] || selectedCrop.stages[0];

  // Auto-switch recommended irrigation method on crop change
  const handleCropChange = (cropKey: string) => {
    setSelectedCropKey(cropKey);
    setSelectedStageIndex(0);
    const newCrop = CROP_WATER_SPECS[cropKey];
    if (newCrop) {
      setIrrigationMethod(newCrop.recommendedMethod);
    }
  };

  // Statewide Aggregated Reservoir Telemetry Summary
  const stateReservoirSummary = useMemo(() => {
    const totalCapacityTmc = TN_RESERVOIRS.reduce((sum, r) => sum + r.fullCapacityTmc, 0);
    const currentTotalStorageTmc = TN_RESERVOIRS.reduce((sum, r) => sum + r.currentStorageTmc, 0);
    const totalInflow = TN_RESERVOIRS.reduce((sum, r) => sum + r.inflowCusecs, 0);
    const totalOutflow = TN_RESERVOIRS.reduce((sum, r) => sum + r.outflowCusecs, 0);
    const totalAyacut = TN_RESERVOIRS.reduce((sum, r) => sum + (r.ayacutAcres || 0), 0);
    const overallPercentage = ((currentTotalStorageTmc / totalCapacityTmc) * 100).toFixed(1);

    const surplusCount = TN_RESERVOIRS.filter((r) => r.status === 'Surplus').length;
    const adequateCount = TN_RESERVOIRS.filter((r) => r.status === 'Adequate').length;
    const moderateCount = TN_RESERVOIRS.filter((r) => r.status === 'Moderate').length;
    const criticalCount = TN_RESERVOIRS.filter((r) => r.status === 'Critical').length;

    return {
      totalCapacityTmc: +totalCapacityTmc.toFixed(2),
      currentTotalStorageTmc: +currentTotalStorageTmc.toFixed(2),
      overallPercentage,
      totalInflow,
      totalOutflow,
      totalAyacut,
      surplusCount,
      adequateCount,
      moderateCount,
      criticalCount,
      totalDamsCount: TN_RESERVOIRS.length,
    };
  }, []);

  // Filtered and Sorted Dams List
  const filteredDams = useMemo(() => {
    return TN_RESERVOIRS.filter((dam) => {
      // Basin Filter
      if (selectedBasinFilter !== 'all') {
        if (selectedBasinFilter === 'cauvery' && !dam.riverBasin.toLowerCase().includes('cauvery') && !dam.riverBasin.toLowerCase().includes('bhavani') && !dam.riverBasin.toLowerCase().includes('amaravathi') && !dam.id.includes('veeranam')) {
          return false;
        }
        if (selectedBasinFilter === 'pap' && !dam.riverBasin.toLowerCase().includes('pap') && !dam.riverBasin.toLowerCase().includes('bharathapuzha') && !dam.riverBasin.toLowerCase().includes('chalakudi') && !dam.riverBasin.toLowerCase().includes('palar')) {
          return false;
        }
        if (selectedBasinFilter === 'vaigai' && !dam.riverBasin.toLowerCase().includes('vaigai') && !dam.riverBasin.toLowerCase().includes('periyar') && !dam.riverBasin.toLowerCase().includes('kodayar') && !dam.riverBasin.toLowerCase().includes('paralayar') && !dam.riverBasin.toLowerCase().includes('chittar')) {
          return false;
        }
        if (selectedBasinFilter === 'thamirabarani' && !dam.riverBasin.toLowerCase().includes('thamirabarani')) {
          return false;
        }
        if (selectedBasinFilter === 'thenpennai' && !dam.riverBasin.toLowerCase().includes('thenpennai') && !dam.riverBasin.toLowerCase().includes('vellar') && !dam.riverBasin.toLowerCase().includes('varahanadhi')) {
          return false;
        }
        if (selectedBasinFilter === 'chennai' && !dam.riverBasin.toLowerCase().includes('kosasthalaiyar') && !dam.riverBasin.toLowerCase().includes('adyar') && !dam.district.toLowerCase().includes('chennai') && !dam.district.toLowerCase().includes('tiruvallur') && !dam.district.toLowerCase().includes('kanchipuram')) {
          return false;
        }
      }

      // Status Filter
      if (selectedStatusFilter !== 'all' && dam.status !== selectedStatusFilter) {
        return false;
      }

      // Search Query
      if (damSearchQuery.trim()) {
        const query = damSearchQuery.toLowerCase();
        const matchesName = dam.name.toLowerCase().includes(query);
        const matchesTamil = dam.tamilName.toLowerCase().includes(query);
        const matchesDistrict = dam.district.toLowerCase().includes(query);
        const matchesBasin = dam.riverBasin.toLowerCase().includes(query);
        const matchesCanals = dam.majorCanals?.some((c) => c.toLowerCase().includes(query));
        const matchesBeneficiary = dam.beneficiaryDistricts?.some((b) => b.toLowerCase().includes(query));

        if (!matchesName && !matchesTamil && !matchesDistrict && !matchesBasin && !matchesCanals && !matchesBeneficiary) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (damSortBy === 'storage') {
        return b.currentStorageTmc - a.currentStorageTmc;
      }
      if (damSortBy === 'levelPct') {
        const pctA = (a.currentStorageTmc / a.fullCapacityTmc) * 100;
        const pctB = (b.currentStorageTmc / b.fullCapacityTmc) * 100;
        return pctB - pctA;
      }
      if (damSortBy === 'inflow') {
        return b.inflowCusecs - a.inflowCusecs;
      }
      if (damSortBy === 'ayacut') {
        return (b.ayacutAcres || 0) - (a.ayacutAcres || 0);
      }
      return 0;
    });
  }, [damSearchQuery, selectedBasinFilter, selectedStatusFilter, damSortBy]);

  // Deterministic FAO-56 / TNAU Water Technology Centre calculation
  const calculatedBudget = useMemo(() => {
    // Reference evapotranspiration ET0 baseline for TN (approx 4.6 to 5.6 mm/day)
    const baseET0 = 4.8 + (district.currentTemp > 32 ? 0.6 : 0) - (district.humidity > 70 ? 0.4 : 0);
    const kc = currentStage.kcFactor;
    const cropET = baseET0 * kc;

    // Rain telemetry compensation (effective rainfall Peff = rainMm * 0.75 if rain > 3mm)
    const effectiveRain = district.rainMm > 3 ? Math.min(cropET, district.rainMm * 0.75) : 0;
    const netDepthMm = Math.max(0.8, cropET - effectiveRain);

    // Method application efficiency factor
    let efficiencyFactor = 1.0;
    let savingsPct = 35;
    if (irrigationMethod === 'Drip') {
      efficiencyFactor = 1.11; // 90% field application efficiency
      savingsPct = selectedCrop.dripEfficiencyGain || 45;
    } else if (irrigationMethod === 'Alternate Wetting & Drying (AWD)') {
      efficiencyFactor = 1.25; // 80% AWD efficiency
      savingsPct = 35;
    } else if (irrigationMethod === 'Micro-Sprinkler') {
      efficiencyFactor = 1.22; // 82% efficiency
      savingsPct = 40;
    } else {
      efficiencyFactor = 1.82; // 55% traditional furrow efficiency
      savingsPct = 0;
    }

    // 1 acre-mm = 4,047 Litres of water
    const dailyLitres = Math.round(acreage * netDepthMm * 4047 * (efficiencyFactor / 1.11));
    const weeklyLitres = dailyLitres * 7;

    // 5 HP agricultural pump standard discharge rate: ~35,000 to 40,000 Litres/hr
    const pumpDischargeLph = 36000;
    const pumpRunTimeHours = +(dailyLitres / pumpDischargeLph).toFixed(2);

    // Baseline traditional flood volume for savings comparison
    const traditionalDailyLitres = Math.round(acreage * cropET * 4047 * 1.82);
    const dailyWaterSaved = Math.max(0, traditionalDailyLitres - dailyLitres);
    const seasonDays = 100;
    const waterSavedPerSeasonLitres = dailyWaterSaved * seasonDays;

    // Power savings: 5HP motor = 3.73 kW
    const pumpHoursSavedPerDay = Math.max(0, traditionalDailyLitres / pumpDischargeLph - pumpRunTimeHours);
    const electricitySavedKwh = Math.round(pumpHoursSavedPerDay * 3.73 * seasonDays);

    // Two split schedules (Morning / Evening)
    const morningLitres = Math.round(dailyLitres * 0.55);
    const eveningLitres = dailyLitres - morningLitres;
    const morningMinutes = Math.round((morningLitres / pumpDischargeLph) * 60);
    const eveningMinutes = Math.round((eveningLitres / pumpDischargeLph) * 60);

    return {
      dailyLitres,
      weeklyLitres,
      netDepthMm: +netDepthMm.toFixed(1),
      pumpRunTimeHours,
      savingsPct,
      waterSavedPerSeasonLitres,
      electricitySavedKwh,
      effectiveRain: +effectiveRain.toFixed(1),
      morningMinutes,
      eveningMinutes,
      morningLitres,
      eveningLitres,
    };
  }, [acreage, selectedCrop, currentStage, irrigationMethod, district]);

  // Handle AI Precision Optimization
  const handleAIOptimize = async () => {
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/water/optimize-budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          acreage,
          cropName: selectedCrop.cropNameEn,
          stageName: currentStage.stageName,
          irrigationMethod,
          waterSource,
          district: `${district.nameEn} (${district.zone})`,
          soilType,
          rainMm: district.rainMm,
          tempC: district.currentTemp,
          humidity: district.humidity,
        }),
      });
      const data = await response.json();
      if (data && data.success) {
        setAiEnhancedResult(data);
      }
    } catch {
      // Keep calculated budget fallback
    } finally {
      setIsOptimizing(false);
    }
  };

  // Toggle Text-to-Speech in Tamil for overall tab
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setSpeakingDamId(null);
    } else {
      setIsSpeaking(true);
      const textToSpeak = `${district.nameTa} மாவட்டத்திற்கு ${selectedCrop.cropNameTa} பயிருக்கு ${acreage} ஏக்கர் பரப்பளவில் தினசரி ${calculatedBudget.dailyLitres.toLocaleString()} லிட்டர் நீர் தேவைப்படுகிறது. 5 எச்.பி மோட்டாரை காலை ${calculatedBudget.morningMinutes} நிமிடங்களும், மாலை ${calculatedBudget.eveningMinutes} நிமிடங்களும் இயக்க பரிந்துரைக்கப்படுகிறது. தமிழ்நாட்டில் உள்ள ${TN_RESERVOIRS.length} முக்கிய அணைகளின் மொத்த நீர் இருப்பு ${stateReservoirSummary.currentTotalStorageTmc} டி.எம்.சி ஆகும். இதில் மேட்டூர் அணை நீர்மட்டம் 104.85 அடியாக உள்ளது.`;
      speakText(textToSpeak, 'ta-IN');
    }
  };

  // Toggle Speech for a specific Dam
  const handleSpeakDam = (dam: ReservoirTelemetry) => {
    if (speakingDamId === dam.id) {
      window.speechSynthesis?.cancel();
      setSpeakingDamId(null);
    } else {
      setSpeakingDamId(dam.id);
      const damText = `${dam.tamilName}. மாவட்டம்: ${dam.district}. தற்போதைய நீர்மட்டம் ${dam.currentLevelFeet} அடி. மொத்தக் கொள்ளளவு ${dam.fullLevelFeet} அடி. நீர் இருப்பு ${dam.currentStorageTmc} டி.எம்.சி. நீர் வரத்து வினாடிக்கு ${dam.inflowCusecs} கனஅடி. நீர் வெளியேற்றம் வினாடிக்கு ${dam.outflowCusecs} கனஅடி. பாசன கால்வாய் திறப்பு: ${dam.canalReleaseSchedule}.`;
      speakText(damText, 'ta-IN');
    }
  };

  const selectedReservoir =
    TN_RESERVOIRS.find((r) => r.id === selectedReservoirId) || TN_RESERVOIRS[0];

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & Live Reservoir Status Bar with Dam Background */}
      <div className="text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-500/30 relative overflow-hidden group">
        {/* Scenic Tamil Nadu Dam & Reservoir Photographic Background */}
        <img
          src={metturDamBg}
          alt="Tamil Nadu Dam Reservoir (Mettur & Cauvery Basin)"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-1000 filter brightness-[0.75] contrast-110"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-blue-950/80 to-slate-950/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Subtle decorative water glow accents */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/30 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-lg backdrop-blur-md">
                <Droplets className="w-6 h-6 animate-pulse text-cyan-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase bg-blue-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-xs shadow-xs">
                    TNAU Water Technology Centre Protocol
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/85 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    {TN_RESERVOIRS.length} Dams Live Telemetry
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight drop-shadow-md">
                  {t.smartIrrigationTitle}
                </h2>
                <p className="text-xs sm:text-sm text-cyan-100 font-medium drop-shadow-xs">
                  {t.smartIrrigationSubtitle}
                </p>
              </div>
            </div>

            {/* Audio Readout & AI Optimize Action */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="listen-irrigation-tamil-btn"
                onClick={handleToggleSpeak}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md backdrop-blur-md ${
                  isSpeaking
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-cyan-200 border border-cyan-500/40 hover:border-cyan-400'
                }`}
                title="Listen to Water Schedule in Tamil"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? 'நிறுத்து (Stop Audio)' : '🔊 தமிழில் கேட்க'}</span>
              </button>

              <button
                id="ai-optimize-irrigation-btn"
                onClick={handleAIOptimize}
                disabled={isOptimizing || isOfflineMode}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'Calculating Budget...' : 'AI Precision Optimize'}</span>
              </button>
            </div>
          </div>

          {/* Quick Telemetry Chips Bar with Glassmorphic Backdrop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 backdrop-blur-md border border-white/15 hover:border-cyan-400/40 rounded-2xl p-3.5 shadow-lg transition-all">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Mettur Dam Storage
              </div>
              <div className="text-sm sm:text-base font-black text-cyan-300 mt-0.5">
                71.42 TMC{' '}
                <span className="text-[11px] font-semibold text-slate-300">(104.85 ft / 120 ft)</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
                Inflow: 14,850 cusecs • Outflow: 12,000 cusecs
              </div>
            </div>

            <div className="bg-slate-950/80 backdrop-blur-md border border-white/15 hover:border-emerald-400/40 rounded-2xl p-3.5 shadow-lg transition-all">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                TN Total Dam Storage
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-300 mt-0.5">
                {stateReservoirSummary.currentTotalStorageTmc} TMC{' '}
                <span className="text-[11px] font-semibold text-emerald-400/90">({stateReservoirSummary.overallPercentage}%)</span>
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Total Capacity: {stateReservoirSummary.totalCapacityTmc} TMC (23 Dams)
              </div>
            </div>

            <div className="bg-slate-950/80 backdrop-blur-md border border-white/15 hover:border-cyan-400/40 rounded-2xl p-3.5 shadow-lg transition-all">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                District Rain Offset
              </div>
              <div className="text-sm sm:text-base font-black text-cyan-300 mt-0.5">
                {district.rainMm > 0 ? `-${calculatedBudget.effectiveRain} mm rain saved` : '0 mm (Dry)'}
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                {district.nameEn} Telemetry: {district.rainMm} mm
              </div>
            </div>

            <div className="bg-slate-950/80 backdrop-blur-md border border-white/15 hover:border-amber-400/40 rounded-2xl p-3.5 shadow-lg transition-all">
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Total Ayacut Supported
              </div>
              <div className="text-sm sm:text-base font-black text-amber-300 mt-0.5">
                {(stateReservoirSummary.totalAyacut / 100000).toFixed(1)} Lakh Acres
              </div>
              <div className="text-[10px] text-slate-300 font-medium mt-0.5">
                Across Tamil Nadu Irrigation Command
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION: ALL TAMIL NADU DAMS COMPREHENSIVE STORAGE DIRECTORY */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
        {/* Section Header with Statewide Aggregate KPI Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  WRD / PWD Tamil Nadu Hydro-Telemetry
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {filteredDams.length} Dams Displayed
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                All Tamil Nadu Dams Storage &amp; Telemetry (அனைத்து அணைகளின் முழு விவரங்கள்)
              </h3>
            </div>
          </div>

          {/* Quick Basin Aggregate Tags */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-xl">
              Surplus: {stateReservoirSummary.surplusCount}
            </span>
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-xl">
              Adequate: {stateReservoirSummary.adequateCount}
            </span>
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl">
              Moderate: {stateReservoirSummary.moderateCount}
            </span>
          </div>
        </div>

        {/* Search, River Basin Filter Tabs & Sorting Toolbar */}
        <div className="space-y-3.5">
          {/* River Basin Filter Pill Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all', label: 'All Basins (அனைத்து அணைகள்)', count: TN_RESERVOIRS.length },
              { id: 'cauvery', label: 'Cauvery & Delta (காவிரி படுகை)' },
              { id: 'pap', label: 'PAP & Western Ghats (பரம்பிக்குளம் - ஆழியாறு)' },
              { id: 'vaigai', label: 'Vaigai & Southern (வைகை & தென் மாவட்டங்கள்)' },
              { id: 'thamirabarani', label: 'Thamirabarani (தாமிரபரணி)' },
              { id: 'thenpennai', label: 'Thenpennai & North (தென்பெண்ணை)' },
              { id: 'chennai', label: 'Chennai Metro & Lakes (சென்னை ஏரிகள்)' },
            ].map((basin) => {
              const isSelected = selectedBasinFilter === basin.id;
              return (
                <button
                  key={basin.id}
                  onClick={() => setSelectedBasinFilter(basin.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {basin.label}
                </button>
              );
            })}
          </div>

          {/* Search Input, Status Filter & Sorting Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={damSearchQuery}
                onChange={(e) => setDamSearchQuery(e.target.value)}
                placeholder="Search dam by name, தமிழ் பெயர், district or river basin..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {damSearchQuery && (
                <button
                  onClick={() => setDamSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Storage Status</option>
                <option value="Surplus">Surplus (உபரி நீர் &gt;85%)</option>
                <option value="Adequate">Adequate (போதுமான நீர் 60-85%)</option>
                <option value="Moderate">Moderate (மிதமான நீர் 40-60%)</option>
                <option value="Critical">Critical (குறைந்த நீர் &lt;40%)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={damSortBy}
                onChange={(e) => setDamSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="storage">Sort: Highest Storage (TMC)</option>
                <option value="levelPct">Sort: Storage Percentage (%)</option>
                <option value="inflow">Sort: Highest Inflow (cusecs)</option>
                <option value="ayacut">Sort: Largest Ayacut Command</option>
              </select>
            </div>
          </div>
        </div>

        {/* All Dams Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-2">
          {filteredDams.map((dam) => {
            const storagePct = +((dam.currentStorageTmc / dam.fullCapacityTmc) * 100).toFixed(1);
            const levelPct = +((dam.currentLevelFeet / dam.fullLevelFeet) * 100).toFixed(1);
            const isSpeakingThisDam = speakingDamId === dam.id;

            return (
              <div
                key={dam.id}
                className="bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                {/* Dam Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {dam.riverBasin}
                      </span>
                      <h4 className="text-base font-black text-slate-900 mt-1 leading-snug">
                        {dam.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-600">
                        {dam.tamilName}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                          dam.status === 'Surplus'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : dam.status === 'Adequate'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : dam.status === 'Moderate'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300'
                        }`}
                      >
                        {dam.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        📍 {dam.district}
                      </span>
                    </div>
                  </div>

                  {/* Storage Progress Gauge */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Storage Capacity:</span>
                      <span className="text-blue-900 font-black">
                        {dam.currentStorageTmc} TMC / {dam.fullCapacityTmc} TMC{' '}
                        <span className="text-blue-600 font-bold">({storagePct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          storagePct > 80
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500'
                            : storagePct > 50
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                            : 'bg-gradient-to-r from-amber-500 to-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, storagePct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Water Level in Feet Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-600">Water Level (அடி):</span>
                      <span className="text-slate-900 font-black">
                        {dam.currentLevelFeet} ft / {dam.fullLevelFeet} ft{' '}
                        <span className="text-slate-500 text-[11px]">({levelPct}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-slate-700 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, levelPct)}%` }}
                      />
                    </div>
                  </div>

                  {/* Telemetry Metrics: Inflow, Outflow & Rainfall */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="bg-white border border-slate-200/80 rounded-xl p-2">
                      <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-0.5">
                        <ArrowDownRight className="w-3 h-3 text-emerald-600" /> Inflow
                      </div>
                      <div className="text-xs font-black text-emerald-700 mt-0.5">
                        {dam.inflowCusecs.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-slate-400">cusecs</div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-2">
                      <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-0.5">
                        <ArrowUpRight className="w-3 h-3 text-rose-600" /> Outflow
                      </div>
                      <div className="text-xs font-black text-rose-700 mt-0.5">
                        {dam.outflowCusecs.toLocaleString()}
                      </div>
                      <div className="text-[9px] text-slate-400">cusecs</div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-2">
                      <div className="text-[9px] font-bold text-slate-400 uppercase flex items-center justify-center gap-0.5">
                        <CloudRain className="w-3 h-3 text-blue-600" /> Rain
                      </div>
                      <div className="text-xs font-black text-blue-800 mt-0.5">
                        {dam.catchmentRainfallMm || 0} mm
                      </div>
                      <div className="text-[9px] text-slate-400">Catchment</div>
                    </div>
                  </div>

                  {/* Ayacut & Major Canals */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-500">Irrigation Ayacut:</span>
                      <span className="font-black text-emerald-800">
                        {dam.ayacutAcres ? `${dam.ayacutAcres.toLocaleString()} Acres` : 'Regional Command'}
                      </span>
                    </div>

                    {dam.powerGenerationMw ? (
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-medium text-slate-500">Hydel Power:</span>
                        <span className="font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          ⚡ {dam.powerGenerationMw} MW
                        </span>
                      </div>
                    ) : null}

                    {dam.majorCanals && dam.majorCanals.length > 0 && (
                      <div className="pt-1 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">
                          Major Canals (பிரதான கால்வாய்கள்):
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {dam.majorCanals.map((canal, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                            >
                              {canal}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Beneficiary Districts */}
                    {dam.beneficiaryDistricts && dam.beneficiaryDistricts.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">
                          Beneficiary Districts (பயனடையும் மாவட்டங்கள்):
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {dam.beneficiaryDistricts.map((dist, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded"
                            >
                              {dist}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Canal Release Schedule */}
                    <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-700 leading-snug">
                      <span className="font-black text-blue-900">Release Note: </span>
                      {dam.canalReleaseSchedule}
                    </div>
                  </div>
                </div>

                {/* Card Actions: Speech Audio & Select for Budget Calculator */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => handleSpeakDam(dam)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSpeakingThisDam
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200'
                    }`}
                  >
                    {isSpeakingThisDam ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeakingThisDam ? 'Stop Audio' : '🔊 அணை விவரம் கேட்க'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setWaterSource(`${dam.name} Canal Water`);
                      setSelectedReservoirId(dam.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-blue-900 text-white rounded-xl text-xs font-black transition-all cursor-pointer"
                    title="Select this Dam as Primary Irrigation Source for Budget Calculator"
                  >
                    Use as Source
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDams.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <Waves className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="text-sm font-black text-slate-800">No Dams Found matching "{damSearchQuery}"</div>
            <p className="text-xs text-slate-500 mt-1">Try resetting the basin filter or search term.</p>
            <button
              onClick={() => {
                setDamSearchQuery('');
                setSelectedBasinFilter('all');
                setSelectedStatusFilter('all');
              }}
              className="mt-3 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-black cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 3. Interactive Input Panel: Acreage, Crop, Stage, Method & Source */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-black text-slate-900">
              Farm &amp; Crop Parameters (நிலம் மற்றும் பயிர் விவரங்கள்)
            </h3>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            District: {district.nameEn} ({district.zone})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Acreage Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Field Acreage (பரப்பளவு)</span>
              <span className="text-blue-700 font-black">{acreage} Acres</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={acreage}
                onChange={(e) => setAcreage(parseFloat(e.target.value))}
                className="flex-1 accent-blue-600 cursor-pointer"
              />
              <input
                type="number"
                min="0.25"
                max="100"
                step="0.25"
                value={acreage}
                onChange={(e) => setAcreage(Math.max(0.1, parseFloat(e.target.value) || 1))}
                className="w-20 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 text-center focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Crop Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Crop Cultivated (பயிர் வகை)
            </label>
            <select
              value={selectedCropKey}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(CROP_WATER_SPECS).map(([key, crop]) => (
                <option key={key} value={key}>
                  {crop.cropNameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Growth Stage Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Growth Stage (பயிர் வளர்ச்சிப் பருவம்)
            </label>
            <select
              value={selectedStageIndex}
              onChange={(e) => setSelectedStageIndex(parseInt(e.target.value, 10))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              {selectedCrop.stages.map((stage, idx) => (
                <option key={idx} value={idx}>
                  {stage.stageName} ({stage.durationDays})
                </option>
              ))}
            </select>
          </div>

          {/* Irrigation Method */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Irrigation System (பாசன முறை)
            </label>
            <select
              value={irrigationMethod}
              onChange={(e) => setIrrigationMethod(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alternate Wetting & Drying (AWD)">
                AWD - Alternate Wetting &amp; Drying (Pani Pipe)
              </option>
              <option value="Drip">Drip Irrigation (சொட்டு நீர் பாசனம்)</option>
              <option value="Micro-Sprinkler">Micro-Sprinkler (தெளிப்பு நீர் பாசனம்)</option>
              <option value="Furrow / Ridge">Ridge &amp; Furrow Flood (மரபு வாய்க்கால்)</option>
            </select>
          </div>

          {/* Primary Water Source */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Primary Water Source (நீர் ஆதாரம்)
            </label>
            <select
              value={waterSource}
              onChange={(e) => setWaterSource(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mettur / Cauvery Canal Water">Mettur Dam Canal Water (Cauvery)</option>
              <option value="Bhavanisagar Dam (Lower Bhavani) Canal Water">Bhavanisagar Dam Canal (LBP)</option>
              <option value="Amaravathi Dam Canal Water">Amaravathi Dam Canal Water</option>
              <option value="Vaigai Dam Canal Water">Vaigai Dam Canal Water</option>
              <option value="Mullaperiyar Dam Canal Water">Mullaperiyar Dam / Periyar Main Canal</option>
              <option value="Sathanur Dam Canal Water">Sathanur Dam Canal Water</option>
              <option value="Aliyar Dam (PAP) Canal Water">Aliyar Dam (PAP) Canal Water</option>
              <option value="Thirumoorthy Dam (PAP) Canal Water">Thirumoorthy Dam (PAP PMC Canal)</option>
              <option value="Papanasam Dam Canal Water">Papanasam Dam (Karaiyar / Thamirabarani)</option>
              <option value="Manimuthar Dam Canal Water">Manimuthar Dam Canal Water</option>
              <option value="Pechiparai Dam Canal Water">Pechiparai Dam Canal (Kodayar)</option>
              <option value="Veeranam Lake Canal Water">Veeranam Lake Canal (Vadavar)</option>
              <option value="Borewell Groundwater (ஆழ்துளை கிணறு)">Borewell Groundwater (ஆழ்துளை கிணறு)</option>
              <option value="Open Well & Farm Pond (திறந்தவெளி கிணறு / பண்ணைக் குட்டை)">
                Open Well &amp; Farm Pond (திறந்தவெளி கிணறு / பண்ணைக் குட்டை)
              </option>
            </select>
          </div>

          {/* Soil Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider block">
              Soil Type (மண் வகை)
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alluvial Clay Loam (Delta)">Alluvial Clay Loam (Delta &amp; Riverbeds)</option>
              <option value="Red Sandy Loam">Red Sandy Loam</option>
              <option value="Black Cotton Soil (Regur)">Black Cotton Soil (கரிசல் மண்)</option>
              <option value="Laterite & Gravelly">Laterite &amp; Gravelly Soil</option>
            </select>
          </div>
        </div>

        {/* Current Stage Critical Advisory Note */}
        <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-3.5 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700">
            <span className="font-black text-blue-900">
              {currentStage.stageName} ({currentStage.stageNameTa}):{' '}
            </span>
            <span>{currentStage.tips}</span>
            {currentStage.sensitivity === 'Very High' && (
              <span className="ml-1.5 font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md inline-block">
                ⚠️ Critical Water Stress Stage (அதிக நீர் உணர்திறன் பருவம்)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Output Calculated Water Budget & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Water Requirement Metric Cards + Daily Pump Run-Time Schedule */}
        <div className="lg:col-span-7 space-y-6">
          {/* High-Impact Water Budget Metrics */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">
                  Daily Water Requirement &amp; Pump Budget
                </h3>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                {calculatedBudget.savingsPct}% Water Saved
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-black text-blue-800 uppercase tracking-wider">
                  Daily Water Volume
                </div>
                <div className="text-xl sm:text-2xl font-black text-blue-950 mt-1">
                  {calculatedBudget.dailyLitres.toLocaleString()}{' '}
                  <span className="text-xs font-bold text-blue-700">Litres/day</span>
                </div>
                <div className="text-[11px] font-bold text-blue-600 mt-0.5">
                  {(calculatedBudget.dailyLitres / 1000).toFixed(1)} m³ / day for {acreage} acres
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 rounded-2xl p-4">
                <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">
                  5 HP Pump Run-Time
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">
                  {calculatedBudget.pumpRunTimeHours}{' '}
                  <span className="text-xs font-bold text-emerald-700">Hours/day</span>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 mt-0.5">
                  Split into 2 shifts (Morning/Evening)
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50/50 border border-indigo-200/80 rounded-2xl p-4 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-black text-indigo-800 uppercase tracking-wider">
                  Water Depth Required
                </div>
                <div className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
                  {calculatedBudget.netDepthMm}{' '}
                  <span className="text-xs font-bold text-indigo-700">mm / day</span>
                </div>
                <div className="text-[11px] font-bold text-indigo-600 mt-0.5">
                  ETc: {(calculatedBudget.netDepthMm + calculatedBudget.effectiveRain).toFixed(1)} mm - Rain: {calculatedBudget.effectiveRain} mm
                </div>
              </div>
            </div>

            {/* Savings & Conservation Stats */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Season Water Conserved</div>
                  <div className="text-xs sm:text-sm font-black text-slate-900">
                    {(calculatedBudget.waterSavedPerSeasonLitres / 100000).toFixed(2)} Lakh Litres
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Electricity Saved</div>
                  <div className="text-xs sm:text-sm font-black text-slate-900">
                    {calculatedBudget.electricitySavedKwh} kWh / Season
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Timed Irrigation Schedule Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900">
                  Recommended Daily Pump Schedule (நேர அட்டவணை)
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                2 Optimal Shift Timings
              </span>
            </div>

            <div className="space-y-3">
              {/* Morning Shift */}
              <div className="bg-gradient-to-r from-blue-50/70 via-white to-cyan-50/40 border border-blue-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    06:30
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <span>Shift 1: Morning Primary Irrigation</span>
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                      Timing: 06:30 AM – 07:15 AM • Volume:{' '}
                      <span className="font-bold text-blue-900">{calculatedBudget.morningLitres.toLocaleString()} Litres</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-blue-950 bg-white border border-blue-200 px-3 py-1.5 rounded-xl shadow-2xs">
                    ⏱️ Run: {calculatedBudget.morningMinutes} mins
                  </span>
                </div>
              </div>

              {/* Evening Shift */}
              <div className="bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 border border-indigo-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-black text-xs shadow-xs">
                    17:00
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <span>Shift 2: Evening Soil Maintenance</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                      Timing: 05:00 PM – 05:45 PM • Volume:{' '}
                      <span className="font-bold text-indigo-900">{calculatedBudget.eveningLitres.toLocaleString()} Litres</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-indigo-950 bg-white border border-indigo-200 px-3 py-1.5 rounded-xl shadow-2xs">
                    ⏱️ Run: {calculatedBudget.eveningMinutes} mins
                  </span>
                </div>
              </div>
            </div>

            {/* AWD Pani Pipe Guide for Paddy */}
            {selectedCropKey === 'paddy' && (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>AWD Pani Pipe (பானைக் குழாய்) Threshold Guide</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  Insert a perforated PVC tube 15cm into the soil. Irrigate only when water disappears and drops to{' '}
                  <span className="font-black underline">
                    {currentStage.awdThresholdCm || 5}cm below ground level
                  </span>
                  . During flowering phase, maintain 2cm standing water continuously to avoid unfilled grains.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Selected Dam Focus Telemetry & Canal Distribution */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reservoir Telemetry Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">
                  Focus Reservoir Telemetry (அணை நிலவரம்)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Live Feed
              </span>
            </div>

            {/* Reservoir Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {TN_RESERVOIRS.slice(0, 8).map((res) => {
                const isSelected = res.id === selectedReservoirId;
                return (
                  <button
                    key={res.id}
                    onClick={() => setSelectedReservoirId(res.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {res.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Active Reservoir Gauge Card */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 space-y-4 border border-blue-900/50 shadow-inner">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    {selectedReservoir.riverBasin}
                  </span>
                  <h4 className="text-base font-black text-white mt-0.5">
                    {selectedReservoir.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-medium">
                    {selectedReservoir.tamilName} • {selectedReservoir.district}
                  </p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedReservoir.status}
                </span>
              </div>

              {/* Visual Water Level Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-black">
                  <span className="text-slate-300">Water Level:</span>
                  <span className="text-cyan-300">
                    {selectedReservoir.currentLevelFeet} ft / {selectedReservoir.fullLevelFeet} ft
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3.5 p-0.5 border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (selectedReservoir.currentLevelFeet / selectedReservoir.fullLevelFeet) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Storage in TMC & Flow Telemetry */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-center">
                <div className="bg-slate-800/60 rounded-xl p-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Storage</div>
                  <div className="text-xs font-black text-cyan-300">
                    {selectedReservoir.currentStorageTmc} TMC
                  </div>
                  <div className="text-[9px] text-slate-400">/ {selectedReservoir.fullCapacityTmc} TMC</div>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Inflow</div>
                  <div className="text-xs font-black text-emerald-400">
                    {selectedReservoir.inflowCusecs.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">cusecs</div>
                </div>

                <div className="bg-slate-800/60 rounded-xl p-2">
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Outflow</div>
                  <div className="text-xs font-black text-rose-400">
                    {selectedReservoir.outflowCusecs.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">cusecs</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="font-bold text-cyan-400">Release Schedule: </span>
                {selectedReservoir.canalReleaseSchedule}
              </div>
            </div>

            {/* Canal Discharge Telemetry Feed */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-black text-slate-900 flex items-center justify-between">
                <span>Local Canal Discharges (கால்வாய் திறப்பு நிலவரம்)</span>
                <span className="text-[10px] text-slate-500 font-bold">PWD Command</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {TN_CANAL_TELEMETRY.map((canal) => (
                  <div
                    key={canal.id}
                    className="bg-slate-50 hover:bg-blue-50/40 border border-slate-200 rounded-2xl p-3 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-black text-slate-900">{canal.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {canal.tamilName} • {canal.commandAreaDistricts.join(', ')}
                        </div>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 shrink-0">
                        {canal.currentDischargeCusecs.toLocaleString()} cusecs
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-slate-600">
                      <span>Status: {canal.rotationStatus}</span>
                      <span className="text-blue-700">{canal.nextTurnDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. AI-Enhanced Precision Water Optimization Card (when activated) */}
      {aiEnhancedResult && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-7 border border-indigo-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                TNAU WTC Engine Simulation
              </div>
              <h3 className="text-lg font-black text-white">
                AI Precision Irrigation &amp; Reservoir Contingency Plan
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-cyan-100 font-medium leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {aiEnhancedResult.tamilSummary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-black text-cyan-300">Reservoir Impact Advisory</div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                {aiEnhancedResult.reservoirImpactAdvisory}
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-xs font-black text-emerald-300">Soil Moisture &amp; Mulching Tip</div>
              <p className="text-xs text-slate-300 font-medium mt-1">
                {aiEnhancedResult.soilMoistureOptimization}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
