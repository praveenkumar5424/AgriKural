import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calculator,
  IndianRupee,
  TrendingUp,
  Percent,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  PieChart as PieChartIcon,
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';
import {
  DistrictInfo,
  YieldPredictorInput,
  YieldPredictorOutput,
  Season,
  SoilType,
} from '../types';
import { TN_DISTRICTS } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface YieldPredictorTabProps {
  currentDistrict: DistrictInfo;
}

const CROP_VARIETIES: Record<string, string[]> = {
  'Paddy / Rice': ['BPT-5204 (Andhra Ponni)', 'CO-51', 'CR-1009 Sub-1', 'ADT-43', 'ASD-16'],
  'Turmeric': ['Erode Local Finger', 'IISR Pratibha', 'Salem Local', 'BSR-2'],
  'Cotton': ['MCU-5', 'DCH-32', 'Suraj Bt-Cotton', 'SVPR-6'],
  'Black Gram (Urad)': ['VBN-8', 'ADT-5', 'T-9', 'MDU-1'],
  'Tomato': ['Shivam Hybrid', 'PKM-1', 'CO-3', 'Arka Rakshak'],
  'Banana': ['Poovan', 'Grand Naine (G9)', 'Nendran', 'Rasthali', 'Red Banana'],
  'Groundnut': ['TMV-7', 'VRI-8', 'CO-7', 'Kadiri Lepakshi'],
  'Sugarcane': ['Co-86032', 'Co-0212', 'Co-11015'],
};

export const YieldPredictorTab: React.FC<YieldPredictorTabProps> = ({ currentDistrict }) => {
  const { t, getDistrictName } = useLanguage();
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('Paddy / Rice');
  const [form, setForm] = useState<YieldPredictorInput>({
    cropName: 'Paddy / Rice',
    seedVariety: 'BPT-5204 (Andhra Ponni)',
    district: currentDistrict.nameEn,
    landAreaAcres: 3.0,
    season: 'Samba (Aug - Jan)' as Season,
    soilType: 'Alluvial Soil (Delta & Riverbeds)' as SoilType,
    waterSource: 'River Canal',
    fertilizerRegime: 'Integrated Nutrient (TNAU INM)',
    pestManagement: 'Biological & Pheromone Traps',
    plannedInvestmentBudgetInr: 50000,
  });

  const [result, setResult] = useState<YieldPredictorOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateYield = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/yield/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Yield prediction failed');
      const data = await res.json();
      setResult(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm((p) => ({ ...p, district: currentDistrict.nameEn }));
  }, [currentDistrict.nameEn]);

  useEffect(() => {
    calculateYield();
  }, [
    form.cropName,
    form.seedVariety,
    form.district,
    form.landAreaAcres,
    form.season,
    form.fertilizerRegime,
  ]);

  const handleCropChange = (crop: string) => {
    setSelectedCropCategory(crop);
    const varieties = CROP_VARIETIES[crop] || [];
    setForm((p) => ({
      ...p,
      cropName: crop,
      seedVariety: varieties[0] || 'Standard Variety',
    }));
  };

  const costChartData = result
    ? [
        { name: 'Seed Cost', amount: result.costBreakdown.seedCost, color: '#3b82f6' },
        { name: 'Land Prep & Labor', amount: result.costBreakdown.landPrepLabor, color: '#f59e0b' },
        { name: 'Fertilizer & Compost', amount: result.costBreakdown.fertilizersAndCompost, color: '#10b981' },
        { name: 'Irrigation & Power', amount: result.costBreakdown.irrigationPumping, color: '#06b6d4' },
        { name: 'Pest Management', amount: result.costBreakdown.pestControl, color: '#ec4899' },
        { name: 'Harvest & Threshing', amount: result.costBreakdown.harvestingAndThreshing, color: '#8b5cf6' },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-900/40">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Gemini AI Financial Engine
              </span>
              <span className="bg-white/10 text-white/90 text-xs font-bold px-2.5 py-0.5 rounded-full">
                TNAU Precision Agronomy
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.yieldPredictorTitle}
            </h1>
            <p className="text-sm text-emerald-100/90 max-w-2xl font-medium">
              {t.yieldPredictorSubtitle}
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[170px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block">
              Estimated Net Profit
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-300">
              ₹{result?.netEstimatedProfitInr.toLocaleString('en-IN') || '---'}
            </span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">
              ROI: {result?.roiPercentage || '---'}%
            </span>
          </div>
        </div>
      </div>

      {/* Input Form Configuration Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Cultivation Inputs &amp; Farm Parameters
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Interactive Parameter Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Crop Selection */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Target Crop
            </label>
            <select
              value={selectedCropCategory}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {Object.keys(CROP_VARIETIES).map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Seed Variety */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Seed Variety
            </label>
            <select
              value={form.seedVariety}
              onChange={(e) => setForm((p) => ({ ...p, seedVariety: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {(CROP_VARIETIES[selectedCropCategory] || []).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Land Area */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Cultivated Area (Acres)
            </label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="50"
              value={form.landAreaAcres}
              onChange={(e) =>
                setForm((p) => ({ ...p, landAreaAcres: Math.max(0.5, Number(e.target.value)) }))
              }
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Sowing Season */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Agricultural Season
            </label>
            <select
              value={form.season}
              onChange={(e) => setForm((p) => ({ ...p, season: e.target.value as Season }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Kuruvai (June - Sept)">Kuruvai (June - Sept)</option>
              <option value="Samba (Aug - Jan)">Samba (Aug - Jan)</option>
              <option value="Thaladi (Oct - Feb)">Thaladi (Oct - Feb)</option>
              <option value="Navarai (Dec - March)">Navarai (Dec - March)</option>
              <option value="Sornavari (April - July)">Sornavari (April - July)</option>
            </select>
          </div>

          {/* Water Source */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Irrigation Infrastructure
            </label>
            <select
              value={form.waterSource}
              onChange={(e) => setForm((p) => ({ ...p, waterSource: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="River Canal">Cauvery River Canal / Sluice</option>
              <option value="Borewell Micro-Drip">Borewell with Micro-Drip System</option>
              <option value="Borewell Flood">Borewell Flood Irrigation</option>
              <option value="Rainfed">Rainfed / Monsoon Reliant</option>
            </select>
          </div>

          {/* Fertilizer Practice */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Fertilizer Practice
            </label>
            <select
              value={form.fertilizerRegime}
              onChange={(e) => setForm((p) => ({ ...p, fertilizerRegime: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Integrated Nutrient (TNAU INM)">Integrated Nutrient (TNAU INM)</option>
              <option value="100% Organic (Panchagavya + FYM)">100% Organic (Panchagavya + FYM)</option>
              <option value="High Chemical (NPK)">High Inorganic Chemical (DAP/Urea)</option>
            </select>
          </div>

          {/* Pest Management */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Pest Management Style
            </label>
            <select
              value={form.pestManagement}
              onChange={(e) => setForm((p) => ({ ...p, pestManagement: e.target.value as any }))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="Biological & Pheromone Traps">Biological &amp; Pheromone Traps (IPM)</option>
              <option value="Preventive Neem Oil">Preventive Neem Azadirachtin Oil</option>
              <option value="Conventional Chemical Sprays">Conventional Chemical Sprays</option>
            </select>
          </div>

          {/* Investment Budget */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Planned Working Capital (₹)
            </label>
            <input
              type="number"
              step="5000"
              min="10000"
              value={form.plannedInvestmentBudgetInr}
              onChange={(e) =>
                setForm((p) => ({ ...p, plannedInvestmentBudgetInr: Number(e.target.value) }))
              }
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Yield & Financial Prediction Results */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white rounded-3xl border border-slate-200/90">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-bold text-slate-600">
            Running agronomic yield regression &amp; mandi price projections...
          </p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Expected Yield */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Expected Total Harvest
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900">
                  {result.expectedTotalYieldQuintals}
                </span>
                <span className="text-xs font-bold text-slate-500">Quintals</span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                Yield: {result.expectedYieldQuintalsPerAcreMin} - {result.expectedYieldQuintalsPerAcreMax} Qtl/Acre
              </p>
            </div>

            {/* Gross Revenue */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Gross Farm-Gate Revenue
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{result.grossRevenueEstimateInr.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                @ ₹{result.estimatedSellingPricePerQuintalInr}/Qtl Mandi Rate
              </p>
            </div>

            {/* Total Input Cost */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Total Production Cost
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{result.totalEstimatedInputCostInr.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                ₹{Math.round(result.totalEstimatedInputCostInr / form.landAreaAcres).toLocaleString('en-IN')} / Acre
              </p>
            </div>

            {/* Risk Sensitivity Score */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Risk Sensitivity Index
                </span>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    result.riskSensitivityScore < 35
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {result.riskSensitivityScore < 35 ? 'Low Risk' : 'Moderate'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900">
                  {result.riskSensitivityScore}
                </span>
                <span className="text-xs font-bold text-slate-500">/ 100 Index</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Harvest Window: {result.expectedHarvestDate}
              </p>
            </div>
          </div>

          {/* Cost Allocation Chart & Agronomy Advice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Breakdown Bar Chart */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Input Cost Allocation Breakdown
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Itemized cost distribution across the {form.landAreaAcres}-acre cycle.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                  ₹{result.totalEstimatedInputCostInr.toLocaleString('en-IN')} Total
                </span>
              </div>

              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(v) => `₹${v}`} tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                    <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Cost']} />
                    <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                      {costChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* TNAU Yield Optimization & Selling Advice */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="text-base font-black text-slate-900">
                    TNAU Agronomy &amp; Profit Maximization Guidelines
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  {result.tnauAgronomyAdvices.map((advice, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-semibold text-slate-700 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-200/60 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{advice}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Peak Price Window Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white text-xs space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  📈 Market Timing Recommendation:
                </span>
                <p className="font-semibold text-slate-200">{result.peakPriceWindowAdvice}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
