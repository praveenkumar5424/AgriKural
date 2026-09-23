import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  BarChart3,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { MandiPriceTrendAnalytics, DistrictInfo } from '../types';

interface Mandi30DayTrendSectionProps {
  district: DistrictInfo;
  defaultCrop?: string;
}

const COMMODITY_OPTIONS = [
  { id: 'Paddy (Ponni)', name: 'Paddy / Rice (Ponni)', tamil: 'நெல் (பொன்னி / சம்பா)' },
  { id: 'Tomato', name: 'Tomato (Hybrid / Country)', tamil: 'தக்காளி' },
  { id: 'Onion', name: 'Shallots & Onion', tamil: 'வெங்காயம் (சின்ன / பெரிய)' },
  { id: 'Turmeric', name: 'Erode Turmeric (Finger / Bulb)', tamil: 'ஈரோடு மஞ்சள்' },
  { id: 'Cotton', name: 'Cotton (MCU-5 / DCH-32)', tamil: 'பருத்தி' },
  { id: 'Black Gram', name: 'Black Gram (VBN-8 Urad)', tamil: 'உளுந்து' },
  { id: 'Banana', name: 'Banana (Poovan / Grand Naine)', tamil: 'வாழை' },
  { id: 'Groundnut', name: 'Groundnut (TMV-7 Pods)', tamil: 'நிலக்கடலை' },
  { id: 'Sugarcane', name: 'Sugarcane (Co-86032)', tamil: 'கரும்பு' },
  { id: 'Coconut', name: 'Copra & Coconut', tamil: 'தேங்காய் (கொப்பரை)' },
];

export const Mandi30DayTrendSection: React.FC<Mandi30DayTrendSectionProps> = ({
  district,
  defaultCrop = 'Paddy (Ponni)',
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>(defaultCrop);
  const [data, setData] = useState<MandiPriceTrendAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMetric, setViewMetric] = useState<'price' | 'volume' | 'combined'>('combined');

  const fetchTrends = async (crop: string, distName: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/mandi-trends-30d?crop=${encodeURIComponent(crop)}&district=${encodeURIComponent(distName)}`
      );
      if (!res.ok) throw new Error('Failed to fetch trend analytics');
      const result = await res.json();
      setData(result);
    } catch {
      // Local fallback
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends(selectedCrop, district.nameEn);
  }, [selectedCrop, district.nameEn]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              AI 30-Day Trend Analytics
            </span>
            <span className="text-xs font-bold text-slate-500">
              {district.nameEn} Regulated Market
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Historical Mandi Price Trends &amp; Predictions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            30-day historical time-series graphs with 7-day predictive AI corridor to optimize harvest sale timing.
          </p>
        </div>

        {/* Crop Selector & Refresh */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl px-3.5 py-2.5 pr-8 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden appearance-none cursor-pointer"
            >
              {COMMODITY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => fetchTrends(selectedCrop, district.nameEn)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 transition-all cursor-pointer"
            title="Refresh Live Trend Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm font-bold text-slate-600">
            Analyzing 30-day regulated mandi records &amp; computing price velocity...
          </p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Top Indicator KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Current Modal Rate */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Current Modal Price
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">
                  ₹{data.currentModalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-slate-500">/ Quintal</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs font-bold">
                {data.priceChangePercent >= 0 ? (
                  <span className="text-emerald-600 flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{data.priceChangePercent}% (30d)
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    {data.priceChangePercent}% (30d)
                  </span>
                )}
                <span className="text-slate-400">vs ₹{data.prev30DayModalPrice}</span>
              </div>
            </div>

            {/* Price Velocity Indicator */}
            <div
              className={`p-4 rounded-2xl border ${
                data.indicatorColor === 'green'
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : data.indicatorColor === 'red'
                  ? 'bg-rose-50/80 border-rose-200 text-rose-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-80">
                Price Trend Direction
              </span>
              <div className="flex items-center gap-2 mt-1">
                {data.trendDirection === 'rising' ? (
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                ) : data.trendDirection === 'falling' ? (
                  <TrendingDown className="w-6 h-6 text-rose-600" />
                ) : (
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                )}
                <span className="text-lg font-black uppercase tracking-wide">
                  {data.trendDirection === 'rising'
                    ? 'Price Rising 🟢'
                    : data.trendDirection === 'falling'
                    ? 'Price Dropping 🔴'
                    : 'Stable / Flat 🟡'}
                </span>
              </div>
              <p className="text-xs font-semibold mt-1 opacity-90">
                {data.trendDirection === 'rising'
                  ? 'Strong procurement demand'
                  : data.trendDirection === 'falling'
                  ? 'High arrival volume pressure'
                  : 'Consolidating near baseline'}
              </p>
            </div>

            {/* Optimal Sell Recommendation */}
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-950">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Optimal Sell Window
              </span>
              <p className="text-base font-black mt-1 text-indigo-900">
                {data.optimalSellRecommendation === 'HOLD_FOR_RISING'
                  ? '⏳ Hold Produce (4-6 Days)'
                  : data.optimalSellRecommendation === 'SELL_WITHIN_3_DAYS'
                  ? '⚡ Sell Now (Next 3 Days)'
                  : '🎯 Direct Trade Window'}
              </p>
              <p className="text-xs font-semibold text-indigo-800/90 mt-1">
                Predicted 7d Avg: ₹{data.forecast7DayAverage.toLocaleString('en-IN')}/qtl
              </p>
            </div>

            {/* 30-Day Range & Volume */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                30-Day High / Low &amp; Arrivals
              </span>
              <div className="text-sm font-black text-slate-900 mt-1">
                ₹{data.lowestPrice30d} — ₹{data.highestPrice30d}
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">
                Total Arrivals: {data.totalArrivalVolume30d.toLocaleString('en-IN')} Quintals
              </div>
            </div>
          </div>

          {/* Sell Advisory Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-black text-xs uppercase tracking-wider">
                  TNSAMB &amp; TNAU Decision Advisory:
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-100">
                {data.recommendationExplanationEn}
              </p>
              <p className="text-xs text-slate-300 font-medium italic">
                {data.recommendationExplanationTa}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-xs">
                Zero Middleman
              </span>
            </div>
          </div>

          {/* Metric Selector Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setViewMetric('combined')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMetric === 'combined'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Price &amp; Volume
              </button>
              <button
                onClick={() => setViewMetric('price')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMetric === 'price'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Price Range Only (₹)
              </button>
              <button
                onClick={() => setViewMetric('volume')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMetric === 'volume'
                    ? 'bg-white text-slate-900 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Arrival Volumes (Qtl)
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                Modal Price (₹)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block border-2 border-dashed border-blue-500" />
                7-Day AI Forecast
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                Govt MSP Baseline
              </span>
            </div>
          </div>

          {/* Interactive Recharts Visualization */}
          <div className="h-[340px] sm:h-[400px] w-full bg-slate-50/50 rounded-2xl p-3 sm:p-4 border border-slate-200">
            <ResponsiveContainer width="100%" height="100%">
              {viewMetric === 'combined' ? (
                <AreaChart
                  data={data.historicalData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="dayLabel"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={window.innerWidth < 640 ? 5 : 2}
                  />
                  <YAxis
                    yAxisId="left"
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tick={{ fontSize: 11, fill: '#0f766e' }}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 'dataMax + 100']}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(v) => `${v}q`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700 min-w-[170px]">
                          <p className="font-black text-emerald-400 border-b border-slate-700 pb-1 flex items-center justify-between">
                            <span>{label}</span>
                            {item.isForecast && (
                              <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase">
                                AI Forecast
                              </span>
                            )}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Modal Price:</span>
                            <span className="font-bold text-white">₹{item.modalPrice}/qtl</span>
                          </div>
                          <div className="flex justify-between gap-4 text-slate-400">
                            <span>Price Range:</span>
                            <span>
                              ₹{item.minPrice} - ₹{item.maxPrice}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 text-slate-400">
                            <span>MSP Baseline:</span>
                            <span className="text-amber-400">₹{item.mspBenchmark}</span>
                          </div>
                          <div className="flex justify-between gap-4 text-slate-400">
                            <span>Arrival Volume:</span>
                            <span>{item.arrivalVolumeQuintals} Qtl</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <ReferenceLine
                    yAxisId="left"
                    y={data.historicalData[0].mspBenchmark}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                    label={{
                      value: `MSP ₹${data.historicalData[0].mspBenchmark}`,
                      fill: '#d97706',
                      fontSize: 11,
                      position: 'insideBottomRight',
                    }}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="arrivalVolumeQuintals"
                    stroke="#94a3b8"
                    fillOpacity={1}
                    fill="url(#volumeGradient)"
                    name="Arrivals (Qtl)"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="modalPrice"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#priceGradient)"
                    name="Modal Price (₹)"
                  />
                </AreaChart>
              ) : viewMetric === 'price' ? (
                <LineChart
                  data={data.historicalData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dayLabel" tick={{ fontSize: 11, fill: '#64748b' }} interval={2} />
                  <YAxis
                    domain={['dataMin - 100', 'dataMax + 100']}
                    tick={{ fontSize: 11, fill: '#0f766e' }}
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine
                    y={data.historicalData[0].mspBenchmark}
                    stroke="#f59e0b"
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="maxPrice"
                    stroke="#059669"
                    strokeWidth={1.5}
                    dot={false}
                    name="Peak Price (₹)"
                  />
                  <Line
                    type="monotone"
                    dataKey="modalPrice"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 2 }}
                    name="Modal Price (₹)"
                  />
                  <Line
                    type="monotone"
                    dataKey="minPrice"
                    stroke="#dc2626"
                    strokeWidth={1.5}
                    dot={false}
                    name="Min Price (₹)"
                  />
                </LineChart>
              ) : (
                <AreaChart
                  data={data.historicalData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="dayLabel" tick={{ fontSize: 11, fill: '#64748b' }} interval={2} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(v) => `${v}q`}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="arrivalVolumeQuintals"
                    stroke="#6366f1"
                    fill="#818cf8"
                    fillOpacity={0.3}
                    name="Mandi Inflow (Quintals)"
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">
          <p className="font-bold">Unable to load live trend data. Please check network connection.</p>
        </div>
      )}
    </div>
  );
};
