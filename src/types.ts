export type Language = 'en' | 'hi' | 'bn' | 'te' | 'ta';

export type AgroZone =
  | 'Cauvery Delta Zone'
  | 'Western Zone'
  | 'Southern Zone'
  | 'North Eastern Zone'
  | 'North Western Zone'
  | 'High Rainfall Zone'
  | 'High Altitude & Hilly Zone';

export interface DistrictInfo {
  id: string;
  nameEn: string;
  nameTa: string;
  nameHi?: string;
  lat: number;
  lng: number;
  zone: AgroZone;
  airLinkCode: string;
  majorSoil: string;
  primaryCrops: string[];
  rainfallAvgMm: number;
  currentTemp: number;
  condition: string;
  humidity: number;
  rainMm: number;
  windSpeed: number;
  soilMoisture: number;
}

export type SoilType =
  | 'Alluvial Soil (Delta & Riverbeds)'
  | 'Red Loam & Sandy Soil'
  | 'Black Cotton Soil (Regur)'
  | 'Laterite & Gravelly Soil'
  | 'Coastal Sandy & Saline Soil'
  | 'Clayey Loam Soil';

export type Season =
  | 'Kuruvai (June - Sept)'
  | 'Samba (Aug - Jan)'
  | 'Thaladi (Oct - Feb)'
  | 'Navarai (Dec - March)'
  | 'Sornavari (April - July)'
  | 'Perennial / All Season';

export interface CropRecommendation {
  cropName: string;
  tamilName: string;
  suitabilityScore: number;
  durationDays: string;
  expectedYieldPerAcre: string;
  estimatedProfitPerAcre: string;
  waterRequirement: 'Low' | 'Medium' | 'High';
  keyRisks: string;
  bestPractices: string;
  marketProspect: string;
}

export interface DiseaseDiagnosisResult {
  diseaseName: string;
  tamilName: string;
  confidence: number;
  severityLevel: 'Low' | 'Moderate' | 'Severe' | 'Critical';
  symptomsObserved: string;
  causalAgent: string;
  organicRemedies: string[];
  chemicalRemedies: string[];
  preventiveActions: string[];
  urgency: string;
}

export interface SampleLeafCase {
  id: string;
  title: string;
  crop: string;
  tamilName: string;
  imageUrl: string;
  description: string;
}

export interface CommodityVariety {
  id: string;
  varietyName: string;
  varietyTamilName?: string;
  marketName: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  priceChange: number;
  trend: 'up' | 'down' | 'stable';
  characteristics?: string;
  arrivalStatus?: string;
  updatedAt: string;
}

export interface MarketPriceItem {
  id: string;
  commodityEn: string;
  commodityTa: string;
  category?: 'Cereals & Grains' | 'Vegetables' | 'Fruits' | 'Commercial & Spices' | 'Pulses & Oilseeds' | 'Floriculture';
  variety: string;
  marketName: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  priceChange: number;
  trend: 'up' | 'down' | 'stable';
  updatedAt: string;
  selectedVarietyId?: string;
  varieties: CommodityVariety[];
}

export interface SeasonalCropGuide {
  seasonName: string;
  tamilName: string;
  months: string;
  targetDistricts: string;
  recommendedCrops: {
    crop: string;
    variety: string;
    duration: string;
    specialTip: string;
  }[];
  waterAdvisory: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

export interface ReservoirTelemetry {
  id: string;
  name: string;
  tamilName: string;
  district: string;
  riverBasin: string;
  fullLevelFeet: number;
  currentLevelFeet: number;
  fullCapacityTmc: number;
  currentStorageTmc: number;
  inflowCusecs: number;
  outflowCusecs: number;
  status: 'Surplus' | 'Adequate' | 'Moderate' | 'Critical';
  canalReleaseSchedule: string;
  lastUpdated: string;
  ayacutAcres?: number;
  majorCanals?: string[];
  beneficiaryDistricts?: string[];
  catchmentRainfallMm?: number;
  powerGenerationMw?: number;
  damType?: string;
}

export interface CanalDischargeTelemetry {
  id: string;
  name: string;
  tamilName: string;
  commandAreaDistricts: string[];
  headWorks: string;
  currentDischargeCusecs: number;
  designedCapacityCusecs: number;
  rotationStatus: 'Turn Open (விருப்ப முறை திறப்பு)' | 'Turn Closed' | 'Continuous Supply';
  nextTurnDate: string;
}

export interface IrrigationScheduleItem {
  timeSlot: string;
  durationMinutes: number;
  volumeLitres: number;
  fertigationRecommended: boolean;
  notes: string;
}

export interface IrrigationBudgetResult {
  dailyWaterRequirementLitres: number;
  weeklyWaterRequirementLitres: number;
  waterDepthMmPerDay: number;
  pumpRunTimeHoursPerDay: number;
  recommendedFrequency: string;
  awdThresholdCm?: number;
  waterSavedPercentage: number;
  waterSavedLitresPerSeason: number;
  electricitySavedKwh: number;
  reservoirImpactAdvisory: string;
  tamilSummary: string;
  schedule: IrrigationScheduleItem[];
  criticalIrrigationStages: { stage: string; waterSensitivity: 'High' | 'Very High' | 'Medium'; tip: string }[];
  soilMoistureOptimization: string;
}

export type AgroAlertCategory =
  | 'weather_emergency'
  | 'mandi_price_drop'
  | 'pest_outbreak'
  | 'water_canal_release'
  | 'government_subsidy';

export type AgroAlertSeverity = 'Critical' | 'High' | 'Advisory' | 'Informational';

export interface AgroAlert {
  id: string;
  category: AgroAlertCategory;
  severity: AgroAlertSeverity;
  titleEn: string;
  titleTa: string;
  district: string;
  affectedCrop?: string;
  alertSummaryEn: string;
  alertSummaryTa: string;
  actionSteps: string[];
  actionStepsTa: string[];
  timestamp: string;
  smsCompactText: string;
  whatsAppRichText: string;
  helplineNumber?: string;
  sourceAgency: string;
}

export interface AlertSubscription {
  id: string;
  phoneNumber: string;
  farmerName?: string;
  district: string;
  crops: string[];
  channels: ('whatsapp' | 'sms')[];
  categories: AgroAlertCategory[];
  language: 'ta' | 'en' | 'bilingual';
  registeredAt: string;
  isActive: boolean;
}

export interface AlertDispatchRecord {
  id: string;
  alertId: string;
  alertTitle: string;
  recipientPhone: string;
  channel: 'whatsapp' | 'sms' | 'direct_wa';
  status: 'delivered' | 'sent_via_twilio' | 'triggered_via_client' | 'failed' | 'simulated';
  messagePreview: string;
  timestamp: string;
  twilioSid?: string;
}

export type SchemeCategory =
  | 'crop_insurance'
  | 'micro_irrigation'
  | 'mechanization'
  | 'solar_energy'
  | 'input_subsidies'
  | 'organic_farming'
  | 'horticulture_credit';

export interface GovtScheme {
  id: string;
  schemeCode: string;
  nameEn: string;
  nameTa: string;
  taglineTa: string;
  category: SchemeCategory;
  department: string;
  subsidyPercentage: string;
  maxBenefitAmount: string;
  targetBeneficiaries: string;
  eligibilityCriteria: string[];
  eligibilityCriteriaTa: string[];
  requiredDocuments: string[];
  requiredDocumentsTa: string[];
  applicationPortalName: string;
  portalUrl: string;
  uzhavanModule: string;
  helpline: string;
  status: 'Active / Open' | 'Enrolling' | 'Upcoming';
  deadlineNotice?: string;
  keyFeatures: string[];
  keyFeaturesTa: string[];
}

export interface SchemeApplicationRecord {
  id: string;
  schemeId: string;
  schemeName: string;
  farmerName: string;
  mobileNumber: string;
  district: string;
  taluk: string;
  surveyNo: string;
  appliedDate: string;
  currentStage: 'submitted' | 'under_inspection' | 'verified_by_vao' | 'approved_by_ada' | 'dbt_credited';
  statusDescription: string;
  statusDescriptionTa: string;
  estimatedSanctionAmount: string;
  lastUpdated: string;
}

// ================= Farmer to Client (B2C) Marketplace Types =================

export type UserRole = 'farmer' | 'client' | 'admin';

export interface B2BUser {
  _id: string;
  name: string;
  phone: string;
  role: UserRole;
  district: string;
  businessType: string;
  locationCoordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  verified: boolean;
  activeListingsCount?: number;
  completedOrdersCount?: number;
  badge?: string;
}

export type CropCategory = 'Grains' | 'Vegetables' | 'Fruits' | 'Spices' | 'Oilseeds' | 'Commercial';

export type ListingStatus = 'active' | 'sold-out' | 'pending-approval';

export interface CropListing {
  _id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerDistrict: string;
  cropName: string;
  tamilName: string;
  category: CropCategory;
  variety: string;
  quantityAvailable: number;
  unit: string;
  pricePerUnit: number;
  mandiBenchmarkPrice: number;
  district: string;
  villageLocation: string;
  harvestDate: string;
  qualityGrade: 'Grade-A (Export / Premium)' | 'Grade-B (Standard Mandi)' | 'Organic Certified' | 'Commercial Grade';
  organicCertified: boolean;
  fpoName?: string;
  status: ListingStatus;
  description: string;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'dispatched' | 'completed' | 'cancelled';

export interface B2BOrder {
  _id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientCompany: string;
  clientDistrict: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  listingId: string;
  cropName: string;
  tamilName?: string;
  quantityRequested: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  estimatedFreightInr: number;
  middlemanSavingsInr: number;
  distanceKm: number;
  deliveryDistrict: string;
  deliveryAddress: string;
  status: OrderStatus;
  inquiryMessage: string;
  paymentTerms: string;
  createdAt: string;
  updatedAt: string;
}

export type B2CUser = B2BUser;
export type B2COrder = B2BOrder;
export type ClientUser = B2BUser;
export type ClientOrder = B2BOrder;

// ================= 30-Day Mandi Price Trends & Forecast =================

export interface MandiHistoricalPoint {
  date: string;
  dayLabel: string;
  minPrice: number;
  modalPrice: number;
  maxPrice: number;
  mspBenchmark: number;
  arrivalVolumeQuintals: number;
  predictedFuturePrice?: number;
  isForecast?: boolean;
}

export interface MandiPriceTrendAnalytics {
  commodity: string;
  tamilName: string;
  district: string;
  currentModalPrice: number;
  prev30DayModalPrice: number;
  priceChangePercent: number;
  trendDirection: 'rising' | 'falling' | 'stable';
  indicatorColor: 'green' | 'red' | 'amber';
  optimalSellRecommendation: 'SELL_NOW_PEAK' | 'HOLD_FOR_RISING' | 'SELL_WITHIN_3_DAYS' | 'NEUTRAL_MARKET';
  recommendationExplanationEn: string;
  recommendationExplanationTa: string;
  forecast7DayAverage: number;
  highestPrice30d: number;
  lowestPrice30d: number;
  totalArrivalVolume30d: number;
  historicalData: MandiHistoricalPoint[];
}

// ================= Smart Distance-Based Freight Matching =================

export interface SpatialGeoPoint {
  district: string;
  hubName: string;
  lat: number;
  lng: number;
  highwayCorridor: string;
  avgLoadingTimeHrs: number;
}

export type VehicleType =
  | 'Three-Wheeler / Auto (1 Ton)'
  | 'Tata Ace / Pickup (2.5 Tons)'
  | '6-Tyre Truck (7.5 Tons)'
  | '10-Tyre Heavy Multiaxle (16 Tons)'
  | 'Reefer Cold Chain Container (10 Tons)';

export interface TransporterPartner {
  id: string;
  name: string;
  phone: string;
  baseDistrict: string;
  fleetType: VehicleType;
  baseRatePerKm: number;
  rating: number;
  verifiedGst: boolean;
  insuranceCovered: boolean;
  availableVehiclesCount: number;
}

export interface FreightMatchResult {
  origin: SpatialGeoPoint;
  destination: SpatialGeoPoint;
  distanceKm: number;
  transitHoursEstimate: number;
  vehicleType: VehicleType;
  fuelRatePerKm: number;
  baseTransportFare: number;
  tollGateEstimate: number;
  loadingUnloadingCost: number;
  totalEstimatedFreightInr: number;
  freightCostPerQuintalInr: number;
  returnLoadDiscountApplied: boolean;
  returnLoadSavingsInr: number;
  highwayRouteName: string;
  co2EmissionsKg: number;
  recommendedPartners: TransporterPartner[];
}

// ================= IoT Sensor Telemetry & Field Monitoring =================

export interface IoTNodeInfo {
  nodeId: string;
  farmName: string;
  farmerName: string;
  district: string;
  cropPlanted: string;
  soilType: string;
  installedDate: string;
  batteryPercent: number;
  solarVoltage: number;
  loraSignalRssi: number;
  irrigationValveOpen: boolean;
  pumpStatus: 'RUNNING' | 'STANDBY' | 'AUTO_SCHEDULED';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IoTTelemetryReading {
  timestamp: string;
  soilMoisturePercent: number; // 0 - 100%
  soilMoistureStatus: 'OPTIMAL' | 'LOW_DROUGHT_RISK' | 'EXCESS_WATERLOGGED';
  soilPh: number; // 0 - 14 (ideal 6.5 - 7.5)
  soilPhStatus: 'ACIDIC' | 'OPTIMAL' | 'ALKALINE';
  groundTempCelsius: number;
  canopyHumidityPercent: number;
  ambientTempCelsius: number;
  nitrogenMgKg: number;
  phosphorusMgKg: number;
  potassiumMgKg: number;
  npkStatus: 'BALANCED' | 'NITROGEN_DEFICIENT' | 'POTASSIUM_SURPLUS' | 'DEPLETED';
  batteryVolt: number;
}

export interface IoTHistoricalPoint {
  time: string;
  soilMoisture: number;
  groundTemp: number;
  soilPh: number;
  ambientHumidity: number;
}

// ================= Crop Insurance & Subsidy Finder =================

export type FarmerLandCategory = 'Marginal (< 1 Ha / 2.5 Acres)' | 'Small (1 - 2 Ha / 5 Acres)' | 'Medium (2 - 5 Ha)' | 'Large (> 5 Ha)';

export interface FarmEligibilityInput {
  farmerName: string;
  district: string;
  landHoldingAcres: number;
  farmerCategory: 'General' | 'SC/ST' | 'Women Farmer' | 'FPO Member / Smallholder';
  landOwnership: 'Owner-Cultivator' | 'Tenant / Lessee Farmer';
  waterSource: 'Canal Irrigated' | 'Borewell / Open Well' | 'Rainfed / Dryland';
  cropCategory: 'Paddy / Grains' | 'Millets / Minor Cereals' | 'Pulses' | 'Horticulture & Vegetables' | 'Sugarcane & Commercial' | 'Oilseeds';
  annualIncomeRange: 'Below ₹1 Lakh' | '₹1 - 2.5 Lakhs' | '₹2.5 - 5 Lakhs' | 'Above ₹5 Lakhs';
  hasKisanCreditCard: boolean;
  hasSoilHealthCard: boolean;
}

export interface MatchedScheme {
  schemeId: string;
  schemeName: string;
  tamilName: string;
  category: 'Insurance' | 'Direct Benefit' | 'Machinery & Solar' | 'Input Subsidy' | 'Micro-Irrigation';
  matchConfidenceScore: number; // 0 - 100%
  eligibilityStatus: 'EL_HIGHLY_ELIGIBLE' | 'EL_ELIGIBLE' | 'EL_CONDITIONAL';
  estimatedGrantValueInr: number;
  annualBenefitLabel: string;
  coverageDetailsEn: string;
  coverageDetailsTa: string;
  requiredDocuments: string[];
  department: string;
  applyPortalUrl: string;
  helplinePhone: string;
}

// ================= AI Yield & Financial Projections Predictor =================

export interface YieldPredictorInput {
  cropName: string;
  seedVariety: string;
  district: string;
  landAreaAcres: number;
  season: Season;
  soilType: SoilType;
  waterSource: 'River Canal' | 'Borewell Micro-Drip' | 'Borewell Flood' | 'Rainfed';
  fertilizerRegime: '100% Organic (Panchagavya + FYM)' | 'Integrated Nutrient (TNAU INM)' | 'High Chemical (NPK)';
  pestManagement: 'Biological & Pheromone Traps' | 'Conventional Chemical Sprays' | 'Preventive Neem Oil';
  plannedInvestmentBudgetInr: number;
}

export interface YieldPredictorOutput {
  expectedYieldQuintalsPerAcreMin: number;
  expectedYieldQuintalsPerAcreMax: number;
  expectedTotalYieldQuintals: number;
  expectedHarvestDate: string;
  estimatedSellingPricePerQuintalInr: number;
  grossRevenueEstimateInr: number;
  totalEstimatedInputCostInr: number;
  netEstimatedProfitInr: number;
  roiPercentage: number;
  riskSensitivityScore: number; // 0 - 100 (lower is safer)
  costBreakdown: {
    seedCost: number;
    landPrepLabor: number;
    fertilizersAndCompost: number;
    irrigationPumping: number;
    pestControl: number;
    harvestingAndThreshing: number;
  };
  tnauAgronomyAdvices: string[];
  peakPriceWindowAdvice: string;
}



