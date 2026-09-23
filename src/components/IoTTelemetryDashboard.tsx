import React, { useState, useEffect } from 'react';
import {
  Activity,
  Droplets,
  Thermometer,
  Zap,
  Radio,
  Power,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  MapPin,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Clock,
  Sliders,
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
  CartesianGrid,
} from 'recharts';
import { IoTNodeInfo, IoTTelemetryReading, IoTHistoricalPoint, DistrictInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface IoTTelemetryDashboardProps {
  currentDistrict: DistrictInfo;
}

export const IoTTelemetryDashboard: React.FC<IoTTelemetryDashboardProps> = ({
  currentDistrict,
}) => {
  const { t, getDistrictName } = useLanguage();
  const [nodes, setNodes] = useState<IoTNodeInfo[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('NODE-TN-01');
  const [telemetry, setTelemetry] = useState<IoTTelemetryReading | null>(null);
  const [historical, setHistorical] = useState<IoTHistoricalPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [valveState, setValveState] = useState<boolean>(false);
  const [valveTriggering, setValveTriggering] = useState<boolean>(false);

  const fetchTelemetry = async (nodeId: string) => {
    try {
      const res = await fetch(`/api/iot/telemetry?nodeId=${encodeURIComponent(nodeId)}`);
      if (!res.ok) throw new Error('Failed to fetch IoT telemetry');
      const data = await res.json();
      setNodes(data.allNodes || []);
      setTelemetry(data.currentReading);
      setHistorical(data.historicalLogs || []);
      setValveState(data.node?.irrigationValveOpen || false);
    } catch {
      // Keep state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry(selectedNodeId);
  }, [selectedNodeId]);

  // Periodic simulated live streaming pulse
  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      fetchTelemetry(selectedNodeId);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLiveStreaming, selectedNodeId]);

  const handleToggleValve = () => {
    setValveTriggering(true);
    setTimeout(() => {
      setValveState((prev) => !prev);
      setValveTriggering(false);
    }, 800);
  };

  const activeNode = nodes.find((n) => n.nodeId === selectedNodeId) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-900/50">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                IoT Sensor Telemetry
              </span>
              <span className="bg-white/10 text-white/90 text-xs font-bold px-2.5 py-0.5 rounded-full">
                LoRaWAN 868MHz
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.iotTelemetryTitle}
            </h1>
            <p className="text-sm text-emerald-100/90 max-w-2xl font-medium">
              {t.iotTelemetrySubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveStreaming((p) => !p)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
                isLiveStreaming
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Activity className={`w-4 h-4 ${isLiveStreaming ? 'animate-pulse' : ''}`} />
              {isLiveStreaming ? 'Live Stream Active (4s)' : 'Stream Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* Node Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => (
          <button
            key={node.nodeId}
            onClick={() => setSelectedNodeId(node.nodeId)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedNodeId === node.nodeId
                ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 text-emerald-950'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {node.nodeId}
                </span>
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-500" />
                  {node.batteryPercent}%
                </span>
              </div>
              <p className="text-xs font-black text-slate-900 mt-2 line-clamp-1">{node.farmName}</p>
              <p className="text-[11px] font-semibold text-slate-500">
                {node.cropPlanted} • {node.district}
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-bold text-slate-500">
              <span>{node.soilType}</span>
              {selectedNodeId === node.nodeId && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>

      {telemetry && (
        <div className="space-y-6">
          {/* Main Sensor Gauge Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Soil Moisture */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    Soil Moisture
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                      telemetry.soilMoistureStatus === 'OPTIMAL'
                        ? 'bg-emerald-100 text-emerald-800'
                        : telemetry.soilMoistureStatus === 'LOW_DROUGHT_RISK'
                        ? 'bg-rose-100 text-rose-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {telemetry.soilMoistureStatus === 'OPTIMAL' ? 'Optimal Field Capacity' : telemetry.soilMoistureStatus}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">
                    {telemetry.soilMoisturePercent}%
                  </span>
                  <span className="text-xs font-bold text-slate-500">Volumetric (VWC)</span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      telemetry.soilMoisturePercent < 40
                        ? 'bg-amber-500'
                        : telemetry.soilMoisturePercent > 80
                        ? 'bg-blue-600'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, telemetry.soilMoisturePercent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Wilting (25%)</span>
                  <span>Target (50-75%)</span>
                  <span>Saturation (90%)</span>
                </div>
              </div>
            </div>

            {/* Soil pH */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    Soil pH Level
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase bg-emerald-100 text-emerald-800">
                    {telemetry.soilPhStatus}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{telemetry.soilPh}</span>
                  <span className="text-xs font-bold text-slate-500">pH Index (6.5-7.5 Ideal)</span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 text-xs font-medium text-slate-600">
                {telemetry.soilPh >= 6.5 && telemetry.soilPh <= 7.5
                  ? '✨ Nutrient availability is at peak bioavailability for Tamil Nadu crops.'
                  : telemetry.soilPh < 6.5
                  ? '⚠️ Slightly acidic. Recommend 150kg/acre agricultural lime application.'
                  : '⚠️ Alkaline tendency. Apply gypsum with farmyard manure compost.'}
              </div>
            </div>

            {/* Ground Temperature & Canopy Humidity */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-rose-600" />
                    Root-Zone Temp
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Depth: 15 cm</span>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">
                    {telemetry.groundTempCelsius}°C
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Ambient: {telemetry.ambientTempCelsius}°C
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Canopy Humidity:</span>
                <span className="font-black text-blue-700">{telemetry.canopyHumidityPercent}% RH</span>
              </div>
            </div>

            {/* Smart Solenoid Valve Control */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <Power className="w-4 h-4" />
                    Smart Irrigation Valve
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase bg-white/10 text-white">
                    {activeNode?.pumpStatus || 'AUTO'}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      valveState ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                    }`}
                  />
                  <div>
                    <p className="text-xl font-black">
                      {valveState ? 'VALVE OPEN (IRRIGATING)' : 'VALVE CLOSED (STANDBY)'}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">Solonoid Relay #01</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold">
                  Solar Battery: {telemetry.batteryVolt}V
                </span>
                <button
                  onClick={handleToggleValve}
                  disabled={valveTriggering}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    valveState
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {valveTriggering ? 'Switching...' : valveState ? 'Turn Valve OFF' : 'Trigger Drip ON'}
                </button>
              </div>
            </div>
          </div>

          {/* NPK Nutrient Telemetry Strip */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Electrochemical N-P-K Soil Fertility Telemetry
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Optical NPK sensor readings calibrated to TNAU soil testing standards.
                </p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                Status: {telemetry.npkStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500">Available Nitrogen (N)</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {telemetry.nitrogenMgKg} <span className="text-xs text-slate-500">mg/kg</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                  Adequate vegetative tillering level
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500">Available Phosphorus (P)</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {telemetry.phosphorusMgKg} <span className="text-xs text-slate-500">mg/kg</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                  Optimal root elongation density
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500">Available Potassium (K)</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {telemetry.potassiumMgKg} <span className="text-xs text-slate-500">mg/kg</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                  High disease resistance index
                </span>
              </div>
            </div>
          </div>

          {/* 24-Hour Continuous Telemetry Trend Chart */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  24-Hour Field Moisture &amp; Temperature Profile
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Hourly sensor readings synced across LoRaWAN gateway.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  Soil Moisture (%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  Ground Temp (°C)
                </span>
              </div>
            </div>

            <div className="h-[280px] w-full bg-slate-50/50 rounded-2xl p-3 border border-slate-200">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historical} margin={{ top: 10, right: 15, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis yAxisId="left" domain={[20, 100]} tick={{ fontSize: 11, fill: '#2563eb' }} />
                  <YAxis yAxisId="right" orientation="right" domain={[15, 45]} tick={{ fontSize: 11, fill: '#e11d48' }} />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="soilMoisture"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 2 }}
                    name="Soil Moisture (%)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="groundTemp"
                    stroke="#e11d48"
                    strokeWidth={2}
                    dot={false}
                    name="Ground Temp (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
