import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Calculator,
  PhoneCall,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  IndianRupee,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  FileSpreadsheet,
} from 'lucide-react';
import { DistrictInfo, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FarmWorkerProcessTabProps {
  currentDistrict: DistrictInfo;
  language?: Language;
}

interface LaborGang {
  id: string;
  leaderName: string;
  leaderTamil: string;
  contactNumber: string;
  location: string;
  crewSize: number;
  specialization: string;
  specializationTamil: string;
  dailyRateEstimate: string;
  experienceYears: number;
  rating: number;
  availableFrom: string;
  verified: boolean;
}

interface WorkerTaskAllocation {
  id: string;
  taskName: string;
  cropName: string;
  fieldAcreage: number;
  laborType: string;
  workerCount: number;
  dailyWagePerPerson: number;
  startDate: string;
  status: 'In Progress' | 'Completed' | 'Scheduled';
  progressPercent: number;
  gangLeader: string;
  totalEstimatedPayout: number;
}

export const FarmWorkerProcessTab: React.FC<FarmWorkerProcessTabProps> = ({
  currentDistrict,
}) => {
  const { t, language, getDistrictName } = useLanguage();
  const isTamil = language === 'ta';
  const districtName = getDistrictName(currentDistrict);

  // Calculator State
  const [maleWorkers, setMaleWorkers] = useState<number>(4);
  const [femaleWorkers, setFemaleWorkers] = useState<number>(8);
  const [specializedOperators, setSpecializedOperators] = useState<number>(1);
  const [workingDays, setWorkingDays] = useState<number>(2);
  const [acreage, setAcreage] = useState<number>(3);
  const [pricingModel, setPricingModel] = useState<'daily' | 'acre'>('daily');
  const [includeFoodAllowance, setIncludeFoodAllowance] = useState<boolean>(true);
  const [overtimeHours, setOvertimeHours] = useState<number>(0);

  // Wage Rates (TN District standard baseline)
  const maleDailyRate = 650;
  const femaleDailyRate = 420;
  const operatorDailyRate = 950;
  const perAcreContractRate = 4800; // Average for transplanting/weeding
  const foodAllowancePerHead = 80;
  const overtimeHourlyRate = 90;

  // Active Allocations List
  const [taskList, setTaskList] = useState<WorkerTaskAllocation[]>([
    {
      id: 'task-101',
      taskName: isTamil ? 'நாற்று நடுதல் (Transplanting)' : 'Paddy Seedling Transplanting',
      cropName: 'CR 1009 Sub 1 Paddy',
      fieldAcreage: 3.5,
      laborType: isTamil ? 'நாற்று நடுதல் குழு (Transplanting Crew)' : 'Transplanting Gang',
      workerCount: 14,
      dailyWagePerPerson: 480,
      startDate: 'Today, 7:00 AM',
      status: 'In Progress',
      progressPercent: 70,
      gangLeader: isTamil ? 'முத்துசாமி மேஸ்திரி (Muthusamy)' : 'Muthusamy Gang Leader',
      totalEstimatedPayout: 13440,
    },
    {
      id: 'task-102',
      taskName: isTamil ? 'பவர் ஸ்பிரேயர் பூச்சிமருந்து தெளிப்பு' : 'Power Sprayer Bio-Pesticide Application',
      cropName: 'Turmeric (மஞ்சள்)',
      fieldAcreage: 2.0,
      laborType: isTamil ? 'இயந்திர தெளிப்பாளர்கள்' : 'Sprayer Specialists',
      workerCount: 3,
      dailyWagePerPerson: 900,
      startDate: 'Yesterday',
      status: 'Completed',
      progressPercent: 100,
      gangLeader: isTamil ? 'முருகேசன் (Murugesan)' : 'Murugesan Crew',
      totalEstimatedPayout: 2700,
    },
    {
      id: 'task-103',
      taskName: isTamil ? 'கை களை எடுத்தல் (Manual Weeding)' : 'Manual Hand Weeding',
      cropName: 'Sugarcane (கரும்பு)',
      fieldAcreage: 4.0,
      laborType: isTamil ? 'களை எடுக்கும் பெண்கள் குழு' : 'Weeding Crew',
      workerCount: 8,
      dailyWagePerPerson: 420,
      startDate: 'Tomorrow, 6:30 AM',
      status: 'Scheduled',
      progressPercent: 0,
      gangLeader: isTamil ? 'செல்வி மேஸ்திரி (Selvi)' : 'Selvi Labor Leader',
      totalEstimatedPayout: 6720,
    },
  ]);

  // Verified Gang Directory for the region
  const verifiedGangs: LaborGang[] = [
    {
      id: 'gang-1',
      leaderName: 'Muthusamy Maistry',
      leaderTamil: 'முத்துசாமி மேஸ்திரி',
      contactNumber: '+91 94432 18765',
      location: `${currentDistrict.nameEn} North Taluk`,
      crewSize: 18,
      specialization: 'Paddy Transplanting & Machine Harvesting',
      specializationTamil: 'நாற்று நடுதல் & நெல் அறுவடை',
      dailyRateEstimate: '₹450 - ₹650 / Day',
      experienceYears: 16,
      rating: 4.9,
      availableFrom: 'Available Now',
      verified: true,
    },
    {
      id: 'gang-2',
      leaderName: 'Periyasamy & Team',
      leaderTamil: 'பெரியசாமி மற்றும் குழுவினர்',
      contactNumber: '+91 98421 99012',
      location: `${currentDistrict.nameEn} Agricultural Belt`,
      crewSize: 12,
      specialization: 'Sugarcane Cutting, Bunding & Loading',
      specializationTamil: 'கரும்பு வெட்டுதல் & வரப்பு கட்டுதல்',
      dailyRateEstimate: '₹600 - ₹750 / Day',
      experienceYears: 12,
      rating: 4.8,
      availableFrom: 'Available Tomorrow',
      verified: true,
    },
    {
      id: 'gang-3',
      leaderName: 'Selvi Women Self-Help Labor Gang',
      leaderTamil: 'செல்வி மகளிர் சுய உதவி கூலி குழு',
      contactNumber: '+91 97890 43210',
      location: `${currentDistrict.nameEn} Rural Block`,
      crewSize: 24,
      specialization: 'Conoweeder Weeding, Cotton & Chilly Picking',
      specializationTamil: 'களை எடுத்தல் & பருத்தி/மிளகாய் பறிப்பு',
      dailyRateEstimate: '₹400 - ₹450 / Day',
      experienceYears: 10,
      rating: 5.0,
      availableFrom: 'Available Now',
      verified: true,
    },
    {
      id: 'gang-4',
      leaderName: 'Karthik Ag-Machinery Operators',
      leaderTamil: 'கார்த்திக் வேளாண் இயந்திர ஓட்டுநர்கள்',
      contactNumber: '+91 94860 11234',
      location: `${currentDistrict.nameEn} Highway Junction`,
      crewSize: 6,
      specialization: 'Tractor Rotavator, Laser Leveler & Drip Laying',
      specializationTamil: 'டிராக்டர் உழவு & சொட்டுநீர் குழாய் பதிப்பு',
      dailyRateEstimate: '₹950 - ₹1,200 / Day',
      experienceYears: 8,
      rating: 4.7,
      availableFrom: 'Available on Booking',
      verified: true,
    },
  ];

  // Calculation Logic
  const totalWorkers = maleWorkers + femaleWorkers + specializedOperators;
  const baseDailyTotal =
    maleWorkers * maleDailyRate +
    femaleWorkers * femaleDailyRate +
    specializedOperators * operatorDailyRate;

  const totalFoodAllowance = includeFoodAllowance ? totalWorkers * foodAllowancePerHead * workingDays : 0;
  const totalOvertime = totalWorkers * overtimeHours * overtimeHourlyRate * workingDays;

  const calculatedTotalPayout =
    pricingModel === 'daily'
      ? baseDailyTotal * workingDays + totalFoodAllowance + totalOvertime
      : perAcreContractRate * acreage + totalFoodAllowance;

  // New task modal / quick booking trigger
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState<string | null>(null);

  const handleBookGang = (gang: LaborGang) => {
    setBookingSuccessMessage(
      isTamil
        ? `✅ ${gang.leaderTamil} குழுவுக்கு உங்கள் முன்பதிவு கோரிக்கை அனுப்பப்பட்டது! மேஸ்திரி உங்களை ${gang.contactNumber} எண்ணிலிருந்து விரைவில் தொடர்புகொள்வார்.`
        : `✅ Booking request sent to ${gang.leaderName} (${gang.crewSize} workers)! Gang leader will call you shortly at ${gang.contactNumber}.`
    );
    setTimeout(() => setBookingSuccessMessage(null), 7000);
  };

  return (
    <div id="farm-worker-process-container" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isTamil ? 'பண்ணை தொழிலாளர் மேலாண்மை செயல்முறை' : 'FARM WORKER OPERATIONS & WAGES'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {districtName} - {t.farmWorkerProcessTitle}
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-medium">
              {t.farmWorkerProcessSubtitle}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700">
            <div className="text-right">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                {isTamil ? 'மாவட்ட கூலி சராசரி' : 'Avg District Wage'}
              </span>
              <span className="text-lg font-black text-amber-400">
                ₹450 - ₹750 <span className="text-xs text-stone-300 font-normal">/ day</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {bookingSuccessMessage && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-emerald-900 font-bold text-sm flex items-center gap-3 animate-fade-in shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{bookingSuccessMessage}</span>
        </div>
      )}

      {/* Main Grid: Left = Wage Calculator & Process, Right = Active Tasks & Gang Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Cols: Wage & Labor Budget Calculator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {isTamil ? 'கூலி & செலவு கணக்கீட்டு கால்குலேட்டர்' : 'Daily Wage & Labor Cost Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {isTamil ? 'வேலை ஆட்கள் மற்றும் நாட்களை அமைத்து கணக்கிடுங்கள்' : 'Estimate total payroll per operation'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-black px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                TNAU Baseline Rates
              </span>
            </div>

            {/* Pricing Model Selector */}
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setPricingModel('daily')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                  pricingModel === 'daily'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTamil ? '📅 தினசரி கூலி முறை (Daily Wage)' : '📅 Daily Wage Basis'}
              </button>
              <button
                onClick={() => setPricingModel('acre')}
                className={`flex-1 py-2 text-xs font-black rounded-xl transition ${
                  pricingModel === 'acre'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isTamil ? '🌾 ஏக்கர் ஒப்பந்த முறை (Contract)' : '🌾 Per Acre Contract'}
              </button>
            </div>

            {/* Controls */}
            {pricingModel === 'daily' ? (
              <div className="space-y-4">
                {/* Male Workers */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {isTamil ? 'ஆண் கூலி தொழிலாளர்கள்' : 'Male Laborers'} (₹{maleDailyRate}/day)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isTamil ? 'உழவு, வரப்பு கட்டுதல், மூட்டை தூக்குதல்' : 'Heavy tillage, bunding, loading'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMaleWorkers(Math.max(0, maleWorkers - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-black text-sm text-slate-900">
                      {maleWorkers}
                    </span>
                    <button
                      onClick={() => setMaleWorkers(maleWorkers + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Female Workers */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {isTamil ? 'பெண் கூலி தொழிலாளர்கள்' : 'Female Laborers'} (₹{femaleDailyRate}/day)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isTamil ? 'நாற்று நடுதல், களை எடுத்தல், கதிர் அறுவடை' : 'Transplanting, weeding, sorting'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFemaleWorkers(Math.max(0, femaleWorkers - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-black text-sm text-slate-900">
                      {femaleWorkers}
                    </span>
                    <button
                      onClick={() => setFemaleWorkers(femaleWorkers + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Specialized Equipment Operators */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {isTamil ? 'இயந்திர / ஸ்பிரேயர் ஓட்டுநர்' : 'Machine / Sprayer Operator'} (₹{operatorDailyRate}/day)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {isTamil ? 'பவர் டில்லர் / பூச்சிமருந்து தெளிப்பாளர்' : 'Power tiller, drone or power spray'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSpecializedOperators(Math.max(0, specializedOperators - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-black text-sm text-slate-900">
                      {specializedOperators}
                    </span>
                    <button
                      onClick={() => setSpecializedOperators(specializedOperators + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Days & Overtime */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                    <label className="text-[11px] font-black text-slate-700 block mb-1">
                      {isTamil ? 'வேலை நாட்கள் (Days)' : 'Total Work Days'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={workingDays}
                      onChange={(e) => setWorkingDays(Number(e.target.value) || 1)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-emerald-600"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                    <label className="text-[11px] font-black text-slate-700 block mb-1">
                      {isTamil ? 'கூடுதல் நேரம் (OT Hours/Day)' : 'Overtime (Hrs/Day)'}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={6}
                      value={overtimeHours}
                      onChange={(e) => setOvertimeHours(Number(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-emerald-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                  <label className="text-xs font-black text-slate-900 block">
                    {isTamil ? 'நிலத்தின் பரப்பளவு (Farm Acreage)' : 'Farm Area in Acres'}
                  </label>
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    max={50}
                    value={acreage}
                    onChange={(e) => setAcreage(Number(e.target.value) || 1)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-emerald-600"
                  />
                  <span className="text-[11px] text-slate-500 block font-medium">
                    {isTamil
                      ? `சராசரி ஒப்பந்த வீதம்: ₹${perAcreContractRate} / ஏக்கர் (முழு நாற்று நடுதல் அல்லது அறுவடை)`
                      : `Standard contract rate: ₹${perAcreContractRate} / acre (Complete gang turnaround)`}
                  </span>
                </div>
              </div>
            )}

            {/* Food Allowance Checkbox */}
            <label className="flex items-center gap-2.5 p-3 bg-amber-50/60 rounded-2xl border border-amber-200/60 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFoodAllowance}
                onChange={(e) => setIncludeFoodAllowance(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="text-xs font-bold text-amber-950">
                {isTamil
                  ? 'தேநீர் & சிற்றுண்டி படி சேர்த்தல் (+₹80 / நபருக்கு)'
                  : 'Include Tea & Snack Allowance (+₹80 / person / day)'}
              </span>
            </label>

            {/* Total Summary Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-4.5 space-y-2.5 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{isTamil ? 'மொத்த தொழிலாளர்கள்' : 'Total Labor Force'}:</span>
                <span className="font-bold text-white">{totalWorkers} Workers</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{isTamil ? 'உணவு படி செலவு' : 'Food / Refreshment Allowance'}:</span>
                <span className="font-bold text-white">₹{totalFoodAllowance.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-wider block">
                    {isTamil ? 'மதிப்பிடப்பட்ட மொத்த கூலி செலவு' : 'Estimated Total Labor Cost'}
                  </span>
                  <span className="text-2xl font-black text-white">
                    ₹{calculatedTotalPayout.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    alert(
                      isTamil
                        ? `✅ கூலி சீட்டு உருவாக்கப்பட்டது: ₹${calculatedTotalPayout.toLocaleString('en-IN')} (${totalWorkers} தொழிலாளர்கள், ${workingDays} நாட்கள்)`
                        : `✅ Labor Wage Sheet Generated: ₹${calculatedTotalPayout.toLocaleString('en-IN')} for ${totalWorkers} workers.`
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{isTamil ? 'கூலி ரசீது சேமிக்க' : 'Save Wage Sheet'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Active Tasks Progress & Gang Directory */}
        <div className="lg:col-span-6 space-y-6">
          {/* Active Field Operations */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  {isTamil ? 'நடப்பு பண்ணை வேலைகள் & முன்னேற்றம்' : 'Active Field Tasks & Progress'}
                </h3>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {taskList.length} Operations
              </span>
            </div>

            <div className="space-y-3">
              {taskList.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 hover:border-slate-300 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {task.taskName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mt-0.5">
                        <span>{task.cropName}</span>
                        <span>•</span>
                        <span>{task.fieldAcreage} Acres</span>
                        <span>•</span>
                        <span className="text-slate-700">{task.workerCount} Workers</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        task.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : task.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>{isTamil ? 'வேலை முன்னேற்றம்' : 'Completion Stage'}: {task.progressPercent}%</span>
                      <span>₹{task.totalEstimatedPayout.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          task.status === 'Completed'
                            ? 'bg-emerald-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${task.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-700">{task.gangLeader}</span>
                    <span>{task.startDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Gang Leader Directory */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {isTamil ? 'உள்ளூர் மேஸ்திரி & கூலி குழுக்கள்' : 'Verified District Gang Leaders'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {currentDistrict.nameEn} Agricultural Consortium
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                Direct Call
              </span>
            </div>

            <div className="space-y-3">
              {verifiedGangs.map((gang) => (
                <div
                  key={gang.id}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900">
                        {isTamil ? gang.leaderTamil : gang.leaderName}
                      </span>
                      {gang.verified && (
                        <span className="text-[9px] font-black px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded">
                          ✓ TNAU Verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-bold text-amber-800">
                      {isTamil ? gang.specializationTamil : gang.specialization}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                      <span>👥 {gang.crewSize} {isTamil ? 'ஆட்கள்' : 'crew'}</span>
                      <span>•</span>
                      <span>⭐ {gang.rating} / 5.0</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{gang.availableFrom}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <a
                      href={`tel:${gang.contactNumber.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs flex items-center gap-1 transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                      <span>{isTamil ? 'அழைக்க' : 'Call'}</span>
                    </a>
                    <button
                      onClick={() => handleBookGang(gang)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-1 transition cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isTamil ? 'முன்பதிவு' : 'Book Crew'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
