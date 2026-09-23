import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  MapPin,
  Search,
  Filter,
  IndianRupee,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Download,
} from 'lucide-react';
import { DistrictInfo, MarketPriceItem, CommodityVariety } from '../types';
import { INITIAL_MARKET_PRICES } from '../data/agriData';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { generateMandiForecastPdf } from '../utils/pdfGenerator';
import { Mandi30DayTrendSection } from './Mandi30DayTrendSection';
import { useLanguage } from '../context/LanguageContext';

interface MarketPricesTabProps {
  district: DistrictInfo;
  isOfflineMode: boolean;
}

const CATEGORIES = [
  'All Categories',
  'Cereals & Grains',
  'Vegetables',
  'Fruits',
  'Commercial & Spices',
  'Pulses & Oilseeds',
  'Floriculture',
] as const;

export const MarketPricesTab: React.FC<MarketPricesTabProps> = ({ district, isOfflineMode }) => {
  const { t, getDistrictName, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  
  // Track selected variety ID per commodity { [commodityId]: selectedVarietyId }
  const [selectedVarietyMap, setSelectedVarietyMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    INITIAL_MARKET_PRICES.forEach((item) => {
      initialMap[item.id] = item.varieties?.[0]?.id || 'default';
    });
    return initialMap;
  });

  // Track expanded varieties comparison view per commodity
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Speech recognition voice search for mandi commodities
  const {
    isListening: isVoiceSearching,
    startListening: startVoiceSearch,
    stopListening: stopVoiceSearch,
    transcript: voiceTranscript,
  } = useVoiceRecognition({
    lang: 'ta-IN',
    onResult: (text) => {
      setSearchQuery(text);
    },
  });

  const handleToggleVoiceSearch = () => {
    if (isVoiceSearching) {
      stopVoiceSearch();
    } else {
      startVoiceSearch('ta-IN');
    }
  };

  // AI Insight State
  const [selectedItemForInsight, setSelectedItemForInsight] = useState<{
    commodity: MarketPriceItem;
    variety: CommodityVariety;
  }>(() => ({
    commodity: INITIAL_MARKET_PRICES[0],
    variety: INITIAL_MARKET_PRICES[0].varieties[0],
  }));

  const [insightLoading, setInsightLoading] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<any>({
    commodity: 'Paddy / Rice (BPT 5204 Ponni)',
    market: 'Thanjavur Regulated Market',
    currentRate: '₹2,360 / Quintal (Modal) | ₹2,480 (Peak)',
    oneWeekForecast: 'Bullish (+3% to +5%) due to strong procurement demand and tight seasonal pipeline.',
    recommendation:
      'Direct Purchase Centres (DPCs) and Regulated Mandis are actively buying with instant direct bank transfer. Hold premium high-milling grades for 10-14 days if targeting private rice mills.',
    topMarketsNearby: [
      { marketName: 'Kumbakonam DPC', distance: '18 km', price: '₹2,340/qtl' },
      { marketName: 'Tiruchirappalli Mandi', distance: '48 km', price: '₹2,480/qtl' },
      { marketName: 'Koyambedu Wholesale Terminal', distance: '280 km', price: '₹2,550/qtl' },
    ],
  });

  const clientForecastCache = React.useRef<Record<string, any>>({});

  const handleSelectVariety = (commodity: MarketPriceItem, variety: CommodityVariety) => {
    setSelectedVarietyMap((prev) => ({
      ...prev,
      [commodity.id]: variety.id,
    }));
    setSelectedItemForInsight({ commodity, variety });
    
    // Check if we have cached forecast for this combination
    const cacheKey = `${commodity.id}_${variety.id}`;
    if (clientForecastCache.current[cacheKey]) {
      setAiInsight(clientForecastCache.current[cacheKey]);
    } else {
      // Update with immediate realistic situational telemetry without blocking
      const isUp = variety.trend === 'up';
      setAiInsight({
        commodity: `${commodity.commodityEn} (${variety.varietyName})`,
        market: variety.marketName,
        currentRate: `₹${variety.modalPrice.toLocaleString()} / ${variety.unit} (Modal) | Range: ₹${variety.minPrice} - ₹${variety.maxPrice}`,
        oneWeekForecast: isUp 
          ? `Bullish (+${variety.priceChange}%) driven by steady wholesale demand at ${variety.marketName}.`
          : `Stable / Moderate (${variety.priceChange > 0 ? `+${variety.priceChange}%` : 'Stable'}) with continuous local arrivals.`,
        recommendation: `Optimal realizations available at ${variety.marketName}. Direct grading of premium lots recommended for instant market settlement.`,
        topMarketsNearby: [
          { marketName: variety.marketName, distance: 'Local Mandi', price: `₹${variety.modalPrice}/${variety.unit}` },
          { marketName: 'Regional Terminal Market', distance: '45 km', price: `₹${Math.round(variety.modalPrice * 1.04)}/${variety.unit}` },
          { marketName: 'Koyambedu Wholesale Hub', distance: 'Transit Hub', price: `₹${Math.round(variety.modalPrice * 1.08)}/${variety.unit}` }
        ]
      });
    }
  };

  const toggleExpandCard = (commodityId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [commodityId]: !prev[commodityId],
    }));
  };

  const handleFetchAiForecast = async (commodity: MarketPriceItem, variety: CommodityVariety) => {
    setSelectedItemForInsight({ commodity, variety });
    setInsightLoading(true);
    const cacheKey = `${commodity.id}_${variety.id}`;

    try {
      if (isOfflineMode) {
        setTimeout(() => {
          setInsightLoading(false);
        }, 300);
        return;
      }

      const res = await fetch('/api/gemini/market-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commodity: commodity.commodityEn,
          variety: variety.varietyName,
          market: variety.marketName,
          district: district.nameEn,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        clientForecastCache.current[cacheKey] = data;
        setAiInsight(data);
      }
    } catch (err) {
      console.warn('Market forecast fallback handled:', err);
    } finally {
      setInsightLoading(false);
    }
  };

  const filteredPrices = INITIAL_MARKET_PRICES.filter((item) => {
    // Category filter
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
      return false;
    }

    // Search query matches commodity or any of its varieties
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchesCommodity =
      item.commodityEn.toLowerCase().includes(query) ||
      item.commodityTa.toLowerCase().includes(query);

    const matchesVarieties = item.varieties?.some(
      (v) =>
        v.varietyName.toLowerCase().includes(query) ||
        (v.varietyTamilName && v.varietyTamilName.toLowerCase().includes(query)) ||
        v.marketName.toLowerCase().includes(query) ||
        v.district.toLowerCase().includes(query)
    );

    return matchesCommodity || matchesVarieties;
  });

  return (
    <div id="market-prices-tab" className="space-y-6">
      {/* 30-Day Mandi Price Trend Analytics & Predictions */}
      <Mandi30DayTrendSection district={district} />

      {/* Header & Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t.mandiPricesTitle}
                </h2>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Live Feed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5 font-medium leading-relaxed">
                {t.mandiPricesSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const displayName = cat === 'All Categories' ? t.allCategories : cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Voice Search */}
        <div className="pt-4 space-y-2.5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchCommodityPlaceholder}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-24 py-2.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] text-slate-400 hover:text-slate-700 px-1.5 py-0.5 rounded-md hover:bg-slate-200 cursor-pointer font-bold"
                  >
                    Clear
                  </button>
                )}
                {/* Voice Search Mic Button */}
                <button
                  id="mandi-voice-search-mic-btn"
                  onClick={handleToggleVoiceSearch}
                  className={`p-1.5 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                    isVoiceSearching
                      ? 'bg-rose-600 text-white animate-bounce ring-2 ring-rose-400'
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-900'
                  }`}
                  title={isVoiceSearching ? 'Listening... Click to stop' : 'Tamil Voice Search (குரல் தேடல்)'}
                >
                  {isVoiceSearching ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
              {filteredPrices.length} Products •{' '}
              {filteredPrices.reduce((acc, curr) => acc + (curr.varieties?.length || 0), 0)} Varieties
            </span>
          </div>

          {/* Live Voice Search Indicator & Quick Tamil Spoken Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {isVoiceSearching ? (
              <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-xl flex items-center gap-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                தமிழில் பயிர் பெயரை பேசவும்... (Listening: speak "நெல்", "தக்காளி", "வெங்காயம்")
              </span>
            ) : (
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Mic className="w-3 h-3 text-blue-600" />
                குரல் தேடல் (Voice Search):
              </span>
            )}

            {['நெல் (Paddy)', 'நாட்டு தக்காளி', 'சின்ன வெங்காயம்', 'ஈரோடு மஞ்சள்', 'மதுரை மல்லி'].map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(sample.split(' ')[0])}
                className="px-2.5 py-0.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 text-[11px] font-bold transition-all cursor-pointer"
              >
                🎤 {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Multi-Variety Commodity Cards + AI Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Commodity Cards with Variety Switcher & Comparative Rate Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredPrices.map((item) => {
            const currentVarietyId = selectedVarietyMap[item.id] || item.varieties[0]?.id;
            const currentVariety =
              item.varieties.find((v) => v.id === currentVarietyId) || item.varieties[0];
            const isCardSelectedForAI =
              selectedItemForInsight.commodity.id === item.id &&
              selectedItemForInsight.variety.id === currentVariety.id;
            const isExpanded = !!expandedCards[item.id];

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                  isCardSelectedForAI
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Product Header */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                        {item.commodityEn.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-slate-900 tracking-tight">
                            {item.commodityEn}
                          </h3>
                          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            {item.commodityTa}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">
                          {item.category || 'Agricultural Crop'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                        {item.varieties.length} Varieties
                      </span>
                    </div>
                  </div>

                  {/* Variety Quick Selector Chips */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                      <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                      <span>Select Variety to View Live Rates:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.varieties.map((v) => {
                        const isVarietyActive = currentVariety.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => handleSelectVariety(item, v)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isVarietyActive
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                            }`}
                          >
                            <span>{v.varietyName}</span>
                            <span
                              className={`text-[10px] font-extrabold ${
                                isVarietyActive ? 'text-emerald-200' : 'text-slate-400'
                              }`}
                            >
                              ₹{v.modalPrice}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Active Selected Variety Price Display Panel */}
                <div className="p-5 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          Active Variety:
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900">
                          {currentVariety.varietyName}
                        </h4>
                        {currentVariety.varietyTamilName && (
                          <span className="text-xs font-bold text-slate-500">
                            ({currentVariety.varietyTamilName})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-slate-800">{currentVariety.marketName}</span>
                        <span>•</span>
                        <span className="text-slate-500">{currentVariety.district} District</span>
                      </div>

                      {currentVariety.characteristics && (
                        <p className="text-xs text-slate-600 pt-1 font-medium italic">
                          "{currentVariety.characteristics}"
                        </p>
                      )}
                    </div>

                    {/* Price Figures */}
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-black text-slate-900">
                        ₹{currentVariety.modalPrice.toLocaleString()}{' '}
                        <span className="text-xs font-bold text-slate-500">{currentVariety.unit}</span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 text-xs font-extrabold mt-0.5">
                        {currentVariety.trend === 'up' ? (
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 flex items-center gap-0.5">
                            <TrendingUp className="w-3.5 h-3.5" /> +{currentVariety.priceChange}%
                          </span>
                        ) : currentVariety.trend === 'down' ? (
                          <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/60 flex items-center gap-0.5">
                            <TrendingDown className="w-3.5 h-3.5" /> {currentVariety.priceChange}%
                          </span>
                        ) : (
                          <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Minus className="w-3.5 h-3.5" /> Stable
                          </span>
                        )}
                        <span className="text-slate-500 font-bold ml-1">
                          Range: ₹{currentVariety.minPrice} - ₹{currentVariety.maxPrice}
                        </span>
                      </div>

                      {currentVariety.arrivalStatus && (
                        <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50/70 border border-emerald-100 px-2 py-0.5 rounded-md mt-1.5 inline-block">
                          {currentVariety.arrivalStatus}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions & Expand Toggle */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleFetchAiForecast(item, currentVariety)}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run AI Forecast for {currentVariety.varietyName.split(' ')[0]}</span>
                    </button>

                    <button
                      onClick={() => toggleExpandCard(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 rounded-lg hover:bg-slate-100 transition-all"
                    >
                      <span>{isExpanded ? 'Hide Variety Comparison' : `Compare All ${item.varieties.length} Varieties`}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expandable Side-by-Side Comparison Table of all Varieties */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/90 border-t border-slate-200">
                    <div className="text-xs font-black text-slate-800 mb-2 flex items-center justify-between">
                      <span>Full Variety Rate Card for {item.commodityEn}</span>
                      <span className="text-[10px] text-slate-500 font-medium">Click any variety row to activate</span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100/80 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">Variety</th>
                            <th className="py-2.5 px-3">Primary Mandi</th>
                            <th className="py-2.5 px-3 text-right">Modal Rate</th>
                            <th className="py-2.5 px-3 text-right">Min - Max Range</th>
                            <th className="py-2.5 px-3 text-center">Trend</th>
                            <th className="py-2.5 px-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {item.varieties.map((v) => {
                            const isRowActive = currentVariety.id === v.id;
                            return (
                              <tr
                                key={v.id}
                                onClick={() => handleSelectVariety(item, v)}
                                className={`cursor-pointer transition-colors ${
                                  isRowActive ? 'bg-emerald-50/70 font-semibold' : 'hover:bg-slate-50'
                                }`}
                              >
                                <td className="py-2.5 px-3">
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    {isRowActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                    <span>{v.varietyName}</span>
                                  </div>
                                  {v.varietyTamilName && (
                                    <span className="text-[10px] text-slate-500">{v.varietyTamilName}</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="text-slate-800 font-medium">{v.marketName}</span>
                                  <span className="text-[10px] text-slate-400 block">{v.district}</span>
                                </td>
                                <td className="py-2.5 px-3 text-right font-black text-slate-900">
                                  ₹{v.modalPrice.toLocaleString()}{' '}
                                  <span className="text-[10px] font-normal text-slate-500">{v.unit}</span>
                                </td>
                                <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                                  ₹{v.minPrice} - ₹{v.maxPrice}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  {v.trend === 'up' ? (
                                    <span className="text-emerald-700 font-bold inline-flex items-center gap-0.5">
                                      <TrendingUp className="w-3 h-3" /> +{v.priceChange}%
                                    </span>
                                  ) : v.trend === 'down' ? (
                                    <span className="text-rose-700 font-bold inline-flex items-center gap-0.5">
                                      <TrendingDown className="w-3 h-3" /> {v.priceChange}%
                                    </span>
                                  ) : (
                                    <span className="text-slate-500 font-bold">Stable</span>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectVariety(item, v);
                                    }}
                                    className={`px-2 py-1 rounded text-[10px] font-black transition-all ${
                                      isRowActive
                                        ? 'bg-emerald-700 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                                    }`}
                                  >
                                    {isRowActive ? 'Active' : 'Select'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right 5 Cols: AI Price Intelligence Sidebar / Popped Up Slide */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl border-2 border-blue-500/50 p-5 sm:p-6 shadow-xl shadow-blue-950/20 space-y-4 sticky top-20 relative overflow-hidden">
            {/* Top glowing accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-rose-500" />

            <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
              <div className="flex items-center gap-2 font-black text-sm text-sky-200">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>AI Variety Price Intelligence</span>
              </div>
              {insightLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
              ) : (
                <span className="text-[10px] font-black bg-blue-500/30 text-sky-200 px-2.5 py-0.5 rounded-full border border-blue-400/40 uppercase tracking-wider">
                  Live Telemetry
                </span>
              )}
            </div>

            {aiInsight && (
              <div className="space-y-3.5 text-xs">
                <div className="bg-blue-900/40 p-3.5 rounded-2xl border border-blue-700/50">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                    ACTIVE COMMODITY &amp; VARIETY
                  </span>
                  <p className="text-sm font-black text-white mt-0.5">
                    {aiInsight.commodity}
                  </p>
                  <p className="text-xs font-bold text-blue-200 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{aiInsight.market}</span>
                  </p>
                  <p className="text-xs font-black text-sky-300 mt-1.5 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-400/40 inline-block shadow-inner">
                    {aiInsight.currentRate}
                  </p>
                </div>

                {/* 7-Day Forecast Slide Box (Royal Blue / Sky Blue) */}
                <div className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-4 rounded-2xl border border-blue-400/50 shadow-md space-y-1">
                  <span className="font-black text-sky-200 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-sky-400" />
                    7-Day Price Forecast:
                  </span>
                  <p className="text-blue-50 font-medium leading-relaxed pt-0.5">
                    {aiInsight.oneWeekForecast}
                  </p>
                </div>

                {/* Farmer Action Advisory (Red / Coral Alert Card) */}
                <div className="bg-gradient-to-br from-rose-950/90 to-red-950/90 p-4 rounded-2xl border border-rose-500/50 shadow-md space-y-1">
                  <span className="font-black text-rose-200 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-rose-400" />
                    Farmer Action Advisory:
                  </span>
                  <p className="text-rose-100 font-medium leading-relaxed pt-0.5">
                    {aiInsight.recommendation}
                  </p>
                </div>

                {/* Export 7-Day Forecast PDF Action Button */}
                <button
                  id="export-mandi-pdf-btn"
                  onClick={() => generateMandiForecastPdf(selectedItemForInsight.commodity, selectedItemForInsight.variety, aiInsight, district.name)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs transition-all shadow-md cursor-pointer active:scale-98"
                  title="Export official 7-Day Mandi Price Forecast & Arbitrage PDF Summary"
                >
                  <Download className="w-4 h-4 text-emerald-200" />
                  <span>📄 Export 7-Day Forecast PDF (விலை அறிக்கை)</span>
                </button>

                {aiInsight.topMarketsNearby && aiInsight.topMarketsNearby.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-blue-900">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                      TOP HIGH-RATE ALTERNATIVE MANDIS:
                    </span>
                    <div className="space-y-1.5">
                      {aiInsight.topMarketsNearby.map((m: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-blue-900/40 border border-blue-700/40 hover:border-blue-500 transition-colors"
                        >
                          <div>
                            <span className="font-bold text-white block">{m.marketName}</span>
                            <span className="text-[10px] text-blue-300 font-medium">{m.distance}</span>
                          </div>
                          <span className="font-black text-sky-300 text-xs bg-blue-950 px-2 py-0.5 rounded border border-blue-600/50">
                            {m.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
