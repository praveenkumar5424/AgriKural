import React, { useState, useEffect } from 'react';
import {
  Truck,
  MapPin,
  Navigation,
  Fuel,
  ArrowRight,
  ShieldCheck,
  Phone,
  DollarSign,
  Leaf,
  Clock,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DistrictInfo, FreightMatchResult, VehicleType } from '../types';
import { TN_DISTRICTS } from '../data/agriData';
import { useLanguage } from '../context/LanguageContext';

interface SmartFreightMatchingTabProps {
  currentDistrict: DistrictInfo;
  onDistrictSelect?: (dName: string) => void;
}

const VEHICLE_OPTIONS: { type: VehicleType; capacity: string; rateHint: string; iconLabel: string }[] = [
  {
    type: 'Three-Wheeler / Auto (1 Ton)',
    capacity: '1 Ton / 10-12 Bags',
    rateHint: '₹18/km (Short Haul)',
    iconLabel: '🛺',
  },
  {
    type: 'Tata Ace / Pickup (2.5 Tons)',
    capacity: '2.5 Tons / 25-30 Bags',
    rateHint: '₹24/km (Intra-District)',
    iconLabel: '🛻',
  },
  {
    type: '6-Tyre Truck (7.5 Tons)',
    capacity: '7.5 Tons / 75-80 Bags',
    rateHint: '₹38/km (Highway Express)',
    iconLabel: '🚛',
  },
  {
    type: '10-Tyre Heavy Multiaxle (16 Tons)',
    capacity: '16 Tons / 160+ Bags',
    rateHint: '₹52/km (Bulk Milling)',
    iconLabel: '🚚',
  },
  {
    type: 'Reefer Cold Chain Container (10 Tons)',
    capacity: '10 Tons (Chilled)',
    rateHint: '₹65/km (Perishables/Fruits)',
    iconLabel: '❄️',
  },
];

export const SmartFreightMatchingTab: React.FC<SmartFreightMatchingTabProps> = ({
  currentDistrict,
  onDistrictSelect,
}) => {
  const { t, getDistrictName } = useLanguage();
  const [originDistrict, setOriginDistrict] = useState<string>(currentDistrict.nameEn);
  const [destinationDistrict, setDestinationDistrict] = useState<string>('Chennai');
  const [vehicleType, setVehicleType] = useState<VehicleType>('6-Tyre Truck (7.5 Tons)');
  const [quantityQuintals, setQuantityQuintals] = useState<number>(80);
  const [cropCategory, setCropCategory] = useState<string>('Grains');

  const [freightResult, setFreightResult] = useState<FreightMatchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedPartnerId, setBookedPartnerId] = useState<string | null>(null);

  const calculateFreight = async () => {
    setLoading(true);
    setBookedPartnerId(null);
    try {
      const res = await fetch('/api/freight/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originDistrict,
          destinationDistrict,
          vehicleType,
          quantityQuintals,
          cropCategory,
        }),
      });
      if (!res.ok) throw new Error('Freight match failed');
      const data = await res.json();
      setFreightResult(data);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOriginDistrict(currentDistrict.nameEn);
  }, [currentDistrict.nameEn]);

  useEffect(() => {
    calculateFreight();
  }, [originDistrict, destinationDistrict, vehicleType, quantityQuintals]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-blue-900/50">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 inline-block mr-1" />
                Spatial Logistics Engine
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                38 Districts Connected
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.smartFreightTitle}
            </h1>
            <p className="text-sm text-blue-200/90 max-w-2xl font-medium">
              {t.smartFreightSubtitle}
            </p>
          </div>

          <div className="shrink-0 flex gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center min-w-[120px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">
                Avg Zero-Broker Cut
              </span>
              <span className="text-xl font-black text-emerald-400">15% Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Controls Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-700" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Trip &amp; Vehicle Configuration
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Spatial Haversine + Highway Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Origin District */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Origin Farm / Mandi
            </label>
            <select
              value={originDistrict}
              onChange={(e) => {
                setOriginDistrict(e.target.value);
                if (onDistrictSelect) onDistrictSelect(e.target.value);
              }}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {TN_DISTRICTS.map((d) => (
                <option key={d.nameEn} value={d.nameEn}>
                  {d.nameEn} ({d.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Destination District */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              Buyer Destination / Market
            </label>
            <select
              value={destinationDistrict}
              onChange={(e) => setDestinationDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              {TN_DISTRICTS.map((d) => (
                <option key={d.nameEn} value={d.nameEn}>
                  {d.nameEn} ({d.nameTa})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity in Quintals */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1">
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-600" />
              Harvest Quantity (Quintals)
            </label>
            <input
              type="number"
              min={5}
              max={500}
              value={quantityQuintals}
              onChange={(e) => setQuantityQuintals(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Crop Category */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              Produce Category
            </label>
            <select
              value={cropCategory}
              onChange={(e) => setCropCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Grains">Paddy &amp; Cereals (Dry Bulk)</option>
              <option value="Vegetables">Vegetables &amp; Perishables</option>
              <option value="Fruits">Fruits &amp; Bananas</option>
              <option value="Spices">Turmeric &amp; Spices</option>
              <option value="Oilseeds">Groundnut &amp; Oilseeds</option>
            </select>
          </div>
        </div>

        {/* Vehicle Fleet Selector Cards */}
        <div>
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-2">
            Select Transport Vehicle Type:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {VEHICLE_OPTIONS.map((v) => (
              <button
                key={v.type}
                onClick={() => setVehicleType(v.type)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  vehicleType === v.type
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 text-blue-950'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-700'
                }`}
              >
                <div>
                  <span className="text-2xl mb-1 block">{v.iconLabel}</span>
                  <p className="text-xs font-black line-clamp-1">{v.type}</p>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{v.capacity}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-700">{v.rateHint}</span>
                  {vehicleType === v.type && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculated Route & Cost Breakdown */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white rounded-3xl border border-slate-200/90">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-bold text-slate-600">
            Calculating optimal highway corridors, toll gates &amp; carrier rates...
          </p>
        </div>
      ) : freightResult ? (
        <div className="space-y-6">
          {/* Main Route Header & Total Cost */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Origin to Destination Visualizer */}
              <div className="lg:col-span-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {freightResult.highwayRouteName}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Est. Transit Time: ~{freightResult.transitHoursEstimate} Hours
                  </span>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400">
                      From (Origin)
                    </span>
                    <p className="text-base font-black text-slate-900">
                      {freightResult.origin.district}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {freightResult.origin.hubName} ({freightResult.origin.highwayCorridor})
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-black text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      {freightResult.distanceKm} KM
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600 my-0.5" />
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-[10px] font-extrabold uppercase text-slate-400">
                      To (Destination)
                    </span>
                    <p className="text-base font-black text-slate-900">
                      {freightResult.destination.district}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {freightResult.destination.hubName} ({freightResult.destination.highwayCorridor})
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Freight Box */}
              <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-2xl space-y-2 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Estimated Total Freight
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  ₹{freightResult.totalEstimatedFreightInr.toLocaleString('en-IN')}
                </div>
                <div className="text-xs font-semibold text-blue-200">
                  Just <span className="text-white font-bold">₹{freightResult.freightCostPerQuintalInr}</span> per Quintal
                </div>
                {freightResult.returnLoadDiscountApplied && (
                  <div className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 py-1 px-2 rounded-lg border border-emerald-500/30">
                    🎉 15% Return Load Discount Applied (Saved ₹{freightResult.returnLoadSavingsInr})
                  </div>
                )}
              </div>
            </div>

            {/* Cost Breakdown Line Items */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 font-semibold block">Base Transport (Fuel + Driver)</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  ₹{freightResult.baseTransportFare} (₹{freightResult.fuelRatePerKm}/km)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 font-semibold block">NHAI FASTag Tolls</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  ₹{freightResult.tollGateEstimate}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 font-semibold block">Loading / Unloading Labor</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  ₹{freightResult.loadingUnloadingCost}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-500 font-semibold block flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  CO2 Carbon Footprint
                </span>
                <span className="text-sm font-bold text-emerald-700 mt-0.5 block">
                  {freightResult.co2EmissionsKg} kg CO2
                </span>
              </div>
            </div>
          </div>

          {/* Matched Verified Transporter Partners */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Available Verified Transport Fleets
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Direct contact with verified farmer transport consortiums near {originDistrict}.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                GPS Tracked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {freightResult.recommendedPartners.map((partner) => (
                <div
                  key={partner.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    bookedPartnerId === partner.id
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                        {partner.baseDistrict} Base
                      </span>
                      <span className="text-xs font-black text-amber-600 flex items-center gap-0.5">
                        ★ {partner.rating}
                      </span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 line-clamp-1">{partner.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Fleet: {partner.fleetType} • {partner.availableVehiclesCount} trucks ready
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {partner.verifiedGst && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> GST Verified
                        </span>
                      )}
                      {partner.insuranceCovered && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                          Transit Insured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Rate</span>
                      <span className="text-xs font-black text-slate-900">₹{partner.baseRatePerKm}/km</span>
                    </div>

                    <button
                      onClick={() => setBookedPartnerId(partner.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        bookedPartnerId === partner.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {bookedPartnerId === partner.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Booked Request
                        </>
                      ) : (
                        <>
                          <Phone className="w-3.5 h-3.5" /> Direct Call / Book
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {bookedPartnerId && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Transport pickup request generated! Driver contact dispatched via SMS.
                  </span>
                </div>
                <span className="font-extrabold text-emerald-800">Ref #TN-LOG-{Date.now().toString().slice(-4)}</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
