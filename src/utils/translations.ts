import { Language } from '../types';

export interface CategoryTranslation {
  title: string;
  tag: string;
  desc: string;
}

export interface BaseTranslationDictionary {
  // App & Header
  appTitle: string;
  appSubtitle: string;
  activeRegion: string;
  telemetryBadge: string;
  heroTitle: string;
  heroDescription: string;
  spaceLink: string;
  activeStatus: string;
  versionLabel: string;

  // Navigation & Step Controls
  categoriesTitle: string;
  workflowSubtitle: string;
  stepProgress: string;
  currentStep: string;
  nextStep: string;
  prevStep: string;
  all38Districts: string;
  selectDistrict: string;
  viewAllTamilNadu: string;

  // Connectivity & PWA
  offlineModeNotice: string;
  onlineSynced: string;
  preCachedBadge: string;
  simulateOfflineToggle: string;
  offlineStatusTitle: string;
  onlineStatusTitle: string;
  offlineStatusDesc: string;
  onlineStatusDesc: string;
  pwaInstallPrompt: string;
  installAppBtn: string;

  // Voice Assistant
  voiceAssistantButton: string;
  handsFreeBadge: string;
  voiceModalTitle: string;
  voiceModalSubtitle: string;
  voiceListening: string;
  voicePromptHint: string;
  voiceStopListening: string;

  // Weather Sidebar
  weatherTitle: string;
  weatherSubtitle: string;
  quickSelectLabel: string;
  humidityLabel: string;
  rainLabel: string;
  windLabel: string;
  soilMoistureLabel: string;
  canalStatusTitle: string;
  canalStatusValue: string;
  forecast5DayTitle: string;
  advisoryAlertTitle: string;
  advisoryAlertBadge: string;
  advisoryAlertText: string;

  // Crop Advisory
  cropAdvisoryTitle: string;
  cropAdvisorySubtitle: string;
  autofillSatelliteBtn: string;
  soilTypeLabel: string;
  seasonLabel: string;
  irrigationSourceLabel: string;
  landSizeLabel: string;
  soilNutrientsTitle: string;
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  phLabel: string;
  generateRecommendationsBtn: string;
  analyzingSoilProfile: string;
  topRecommendationsTitle: string;
  suitabilityScoreLabel: string;
  expectedYieldLabel: string;
  estimatedProfitLabel: string;
  waterRequirementLabel: string;
  keyRisksLabel: string;
  bestPracticesLabel: string;
  marketProspectLabel: string;
  exportPdfBtn: string;

  // Smart Irrigation
  smartIrrigationTitle: string;
  smartIrrigationSubtitle: string;
  damTelemetryTitle: string;
  canalDischargeTitle: string;
  soilMoistureSensorsTitle: string;
  irrigationScheduleTitle: string;
  waterSavedBadge: string;

  // Disease Scanner
  diseaseScannerTitle: string;
  diseaseScannerSubtitle: string;
  uploadLeafBtn: string;
  takePhotoBtn: string;
  sampleCasesTitle: string;
  analyzeDiagnosisBtn: string;
  analyzingLeafState: string;
  diagnosisReportTitle: string;
  confidenceScoreLabel: string;
  symptomsLabel: string;
  biologicalRemediesLabel: string;
  chemicalRemediesLabel: string;

  // Mandi & Market Prices
  mandiTitle: string;
  mandiSubtitle: string;
  searchCommodityPlaceholder: string;
  allCategoriesLabel: string;
  todayPriceHeader: string;
  modalPriceHeader: string;
  trendHeader: string;
  forecast7DayHeader: string;
  exportMandiPdfBtn: string;
  historical30DayTitle: string;

  // Seasonal Calendar
  calendarTitle: string;
  calendarSubtitle: string;
  kuruvaiSeasonName: string;
  sambaSeasonName: string;
  thaladiSeasonName: string;
  navaraiSeasonName: string;
  sowingPeriodLabel: string;
  harvestPeriodLabel: string;

  // Farm Worker & Labor Operations
  workerProcessTabLabel: string;
  workerProcessTabTamil: string;
  workerProcessTabDesc: string;
  wageCalculatorTitle: string;
  laborDirectoryTitle: string;
  taskTrackerTitle: string;
  dailyWageEstimateLabel: string;
  bookLaborGangBtn: string;

  // Freight, IoT, Schemes, B2B
  freightTitle: string;
  iotTitle: string;
  schemeTitle: string;
  yieldPredictorTitle: string;
  b2bTitle: string;
  govSchemesTitle: string;

  // Category modules map
  categories: Record<string, CategoryTranslation>;
}

export interface TranslationDictionary extends BaseTranslationDictionary {
  // Additional component aliases & localized labels
  agriMitraTitle: string;
  agriMitraSubtitle: string;
  askAssistantPlaceholder: string;
  sendButton: string;
  b2bMarketplaceTitle: string;
  b2bMarketplaceSubtitle: string;
  mandiPricesTitle: string;
  mandiPricesSubtitle: string;
  allCategories: string;
  govSchemesSubtitle: string;
  iotTelemetryTitle: string;
  iotTelemetrySubtitle: string;
  schemeEligibilityTitle: string;
  schemeEligibilitySubtitle: string;
  seasonalCalendarTitle: string;
  seasonalCalendarSubtitle: string;
  smartFreightTitle: string;
  smartFreightSubtitle: string;
  yieldPredictorSubtitle: string;
  farmWorkerProcessTitle: string;
  farmWorkerProcessSubtitle: string;

  agroSeasonLabel: string;
  waterSourceLabel: string;
  farmSizeLabel: string;
  generatingButton: string;
  generateButton: string;
  suitabilityMatch: string;
  durationLabel: string;
  yieldLabel: string;
  profitLabel: string;
  waterNeedLabel: string;

  uploadPhotoPrompt: string;
  analyzingButton: string;
  diagnoseButton: string;
  listenVoice: string;
  exportReport: string;
  organicRemediesTitle: string;
  chemicalRemediesTitle: string;
}

export const TRANSLATIONS: Record<Language, BaseTranslationDictionary> = {
  en: {
    appTitle: 'AgriKural',
    appSubtitle: 'TN Space Link',
    activeRegion: 'ACTIVE REGION ZONE • TAMIL NADU',
    telemetryBadge: '38 DISTRICTS TELEMETRY',
    heroTitle: 'AgriKural (அக்ரிகுரல்) — Tamil Nadu Agricultural Hub',
    heroDescription: 'Comprehensive soil intelligence, agromet advisory, real-time weather analytics, farm labor logistics, and live market mandi rates synchronized across all 38 districts of Tamil Nadu.',
    spaceLink: 'TN Space Link',
    activeStatus: 'Active',
    versionLabel: 'V3.5',

    categoriesTitle: 'Categories & Tools',
    workflowSubtitle: 'Agricultural Workflow Modules',
    stepProgress: 'Step',
    currentStep: 'Current Step',
    nextStep: 'Next Step',
    prevStep: 'Previous Step',
    all38Districts: 'All 38 TN Districts',
    selectDistrict: 'Select District',
    viewAllTamilNadu: 'All 38 Districts Active',

    offlineModeNotice: 'OFFLINE PWA MODE (Offline Caching Active)',
    onlineSynced: 'PWA ACTIVE & LIVE SYNCED',
    preCachedBadge: 'Pre-cached: 38 Districts • Leaf Pathology • Mandi Rates • Labor Gangs',
    simulateOfflineToggle: 'Simulate Low-Connectivity (Offline Mode)',
    offlineStatusTitle: 'Status: Low-Connectivity (Local Cached Mode Active)',
    onlineStatusTitle: 'Status: Online (High-Speed Satellite Connected)',
    offlineStatusDesc: 'Serving pre-cached TNAU crop rules, local soil calculators, and stored mandi data.',
    onlineStatusDesc: 'Continuous synchronization enabled with TN Agri Cloud Hub & TNAU Telemetry.',
    pwaInstallPrompt: 'Install Tamil Nadu Agri App for fast offline field access',
    installAppBtn: 'Install App (PWA)',

    voiceAssistantButton: '🎤 Voice Assistant',
    handsFreeBadge: 'HANDS-FREE AI',
    voiceModalTitle: 'Agri Voice Assistant (குரல் உதவி)',
    voiceModalSubtitle: 'Speak naturally in Tamil or English for instant answers and navigation',
    voiceListening: 'Listening to your voice... Speak now',
    voicePromptHint: 'Say "Coimbatore weather", "நெல் விலை", or "பயிர் ஆலோசனை"',
    voiceStopListening: 'Stop Listening',

    weatherTitle: 'Agromet Weather',
    weatherSubtitle: 'Live Satellite Sensor Sync',
    quickSelectLabel: 'Quick Select District',
    humidityLabel: 'HUMIDITY',
    rainLabel: "TODAY'S RAIN",
    windLabel: 'WIND SPEED',
    soilMoistureLabel: 'SOIL MOISTURE',
    canalStatusTitle: 'Mettur & Basin Canal Status',
    canalStatusValue: '112.4 / 120 ft',
    forecast5DayTitle: '5-Day Agro Forecast',
    advisoryAlertTitle: 'Agromet Advisory Alert (TNAU)',
    advisoryAlertBadge: 'TNAU SATELLITE ADVISORY',
    advisoryAlertText: 'Optimal light conditions for paddy panicle initiation and drip fertigation across district farms.',

    cropAdvisoryTitle: 'Land & Soil Diagnostics',
    cropAdvisorySubtitle: 'Enter your field coordinates, soil measurements, or trigger automated IoT/satellite estimation for Tamil Nadu fertile lands.',
    autofillSatelliteBtn: 'Auto-fill from Satellite',
    soilTypeLabel: 'Soil Type & Texture',
    seasonLabel: 'Agricultural Season',
    irrigationSourceLabel: 'Primary Water Source',
    landSizeLabel: 'Land Holding Size (Acres)',
    soilNutrientsTitle: 'Soil Nutrient Diagnostics (NPK & pH)',
    nitrogenLabel: 'Nitrogen (N)',
    phosphorusLabel: 'Phosphorus (P)',
    potassiumLabel: 'Potassium (K)',
    phLabel: 'Soil pH Level',
    generateRecommendationsBtn: 'Generate AI Crop Recommendations',
    analyzingSoilProfile: 'Analyzing Soil Profile & Weather Matches...',
    topRecommendationsTitle: 'Top Recommended Crops for Your Land',
    suitabilityScoreLabel: 'Suitability Match',
    expectedYieldLabel: 'Expected Yield / Acre',
    estimatedProfitLabel: 'Est. Net Profit / Acre',
    waterRequirementLabel: 'Water Need',
    keyRisksLabel: 'Key Risks & Precautions',
    bestPracticesLabel: 'TNAU Recommended Practices',
    marketProspectLabel: 'Market Prospect & Procurement',
    exportPdfBtn: 'Export Crop Advisory Report (PDF)',

    smartIrrigationTitle: 'Smart Irrigation & Water Management',
    smartIrrigationSubtitle: 'Real-time dam capacity, canal discharge, reservoir levels and crop water budget calculations.',
    damTelemetryTitle: 'Major Reservoirs & Water Levels',
    canalDischargeTitle: 'Live Canal Water Flow & Mettur Release',
    soilMoistureSensorsTitle: 'Sub-surface Soil Moisture Sensors',
    irrigationScheduleTitle: 'Precision Watering Schedule',
    waterSavedBadge: '34% Water Saved via Precision Timing',

    diseaseScannerTitle: 'AI Crop Disease & Pest Scanner',
    diseaseScannerSubtitle: 'Diagnose leaf spots, fungal rust, blast, and viral diseases instantly using high-resolution camera AI.',
    uploadLeafBtn: 'Upload Leaf Photo',
    takePhotoBtn: 'Open Camera',
    sampleCasesTitle: 'Or Test With Pre-Loaded Field Samples',
    analyzeDiagnosisBtn: 'Analyze Crop Health',
    analyzingLeafState: 'Running AI Diagnostic Neural Network...',
    diagnosisReportTitle: 'AI Pathology Diagnosis & Prescription',
    confidenceScoreLabel: 'Diagnosis Confidence',
    symptomsLabel: 'Observed Pathological Symptoms',
    biologicalRemediesLabel: 'Organic & Biological Treatment',
    chemicalRemediesLabel: 'Chemical Intervention (Approved TNAU Dosage)',

    mandiTitle: 'Mandi Market Prices & 30-Day Trends',
    mandiSubtitle: 'Daily price benchmarks, historical trend charts, regulated market arrivals, and 7-day predictive rate models.',
    searchCommodityPlaceholder: 'Search paddy, tomato, turmeric, cotton, banana...',
    allCategoriesLabel: 'All Commodity Categories',
    todayPriceHeader: "Today's Price (₹/Qtl)",
    modalPriceHeader: 'Modal Price',
    trendHeader: '24h Trend',
    forecast7DayHeader: '7-Day AI Forecast',
    exportMandiPdfBtn: 'Download Mandi Price Bulletin (PDF)',
    historical30DayTitle: '30-Day Historical Price Movement & Forecast Analysis',

    calendarTitle: 'Tamil Nadu Seasonal Agro Calendar',
    calendarSubtitle: 'Official TNAU cropping calendar covering Kuruvai, Samba, Thaladi, and Navarai cycles.',
    kuruvaiSeasonName: 'Kuruvai Season (June - September)',
    sambaSeasonName: 'Samba Season (August - January)',
    thaladiSeasonName: 'Thaladi Season (October - February)',
    navaraiSeasonName: 'Navarai Season (December - March)',
    sowingPeriodLabel: 'Sowing Window',
    harvestPeriodLabel: 'Harvest Window',

    workerProcessTabLabel: 'Farm Worker Operations',
    workerProcessTabTamil: 'பண்ணை தொழிலாளர் & கூலி மேலாண்மை',
    workerProcessTabDesc: 'Farm labor gang booking, daily wage calculations, task allocation & crew manager',
    wageCalculatorTitle: 'Daily & Contract Labor Wage Calculator',
    laborDirectoryTitle: 'Verified Agricultural Labor Gangs',
    taskTrackerTitle: 'Active Field Task Progress',
    dailyWageEstimateLabel: 'Total Estimated Labor Budget',
    bookLaborGangBtn: 'Book Labor Crew',

    freightTitle: 'Smart Agri-Freight & Logistics Matching',
    iotTitle: 'IoT Field Telemetry & Sensor Network',
    schemeTitle: 'Crop Insurance & Government Grants',
    yieldPredictorTitle: 'AI Yield & Profit Simulation',
    b2bTitle: 'Direct Farmer to Client (B2C) Marketplace',
    govSchemesTitle: 'Government Schemes & Subsidies (Uzhavan)',

    categories: {
      'crop-advisory': {
        title: 'Crop Advisory',
        tag: 'Soil & Variety',
        desc: 'District soil suitability & seasonal crop recommendations',
      },
      'smart-irrigation': {
        title: 'Smart Irrigation',
        tag: 'Dam & Water',
        desc: 'Dam water levels, canal discharge & soil moisture telemetry',
      },
      'disease-scanner': {
        title: 'Disease Scanner',
        tag: 'AI Vision',
        desc: 'Instant AI camera diagnosis for leaf pests and biological remedies',
      },
      'seasonal-calendar': {
        title: 'Seasonal Calendar',
        tag: 'Sowing Cycle',
        desc: 'TNAU Kuruvai, Samba, Thaladi & Navarai agricultural schedules',
      },
      'agri-mitra-ai': {
        title: 'Agri-Mitra AI',
        tag: 'Gemini AI',
        desc: 'Multilingual Tamil & English voice-enabled agronomy copilot',
      },
      'mandi-prices': {
        title: 'Mandi 30D Trends',
        tag: '30D Trends',
        desc: '30-day historical graphs, rising/falling indicators & 7-day AI forecasts',
      },
      'smart-freight': {
        title: 'Smart Freight Match',
        tag: 'Spatial Logistics',
        desc: 'Spatial distance (KM) routing, per-km lorry rates & toll optimization',
      },
      'iot-telemetry': {
        title: 'IoT Field Telemetry',
        tag: 'LoRaWAN IoT',
        desc: 'Real-time soil moisture %, pH levels, root temp & solenoid valve control',
      },
      'scheme-finder': {
        title: 'Insurance & Subsidies',
        tag: 'Uzhavan Grants',
        desc: 'Automated PMFBY insurance & Tamil Nadu subsidy grant matching',
      },
      'yield-predictor': {
        title: 'AI Yield & Profit',
        tag: 'Gemini Yield',
        desc: 'Gemini AI financial return simulations, cost breakdown & ROI index',
      },
      'farm-worker-process': {
        title: 'Farm Worker Operations',
        tag: 'Labor & Wages',
        desc: 'Farm labor gang booking, daily wage calculations, task allocation & crew manager',
      },
      'b2b-marketplace': {
        title: 'Farmer to Client (B2C)',
        tag: 'Farmer to Client',
        desc: 'Direct farmer-to-client sales, fresh farm-gate produce & zero broker fees',
      },
      'gov-schemes': {
        title: 'Government Directory',
        tag: 'Directory',
        desc: 'Direct subsidies, PM-Kisan, micro-irrigation grants & helpline links',
      },
      'farmer-account': {
        title: 'Farmer Google Account',
        tag: 'Google Login',
        desc: 'Sign in with Google Mail ID, manage farm acreage, subsidies and profile',
      },
    },
  },

  ta: {
    appTitle: 'அக்ரிகுரல் (AgriKural)',
    appSubtitle: 'தமிழ்நாடு விண்வெளி இணைப்பு',
    activeRegion: 'செயலில் உள்ள மண்டலம் • தமிழ்நாடு',
    telemetryBadge: '38 மாவட்ட தரவுகள்',
    heroTitle: 'அக்ரிகுரல் — தமிழ்நாடு உழவர் வழிகாட்டி மற்றும் வேளாண் மையம்',
    heroDescription: 'மண் பரிசோதனை, வானிலை முன்னறிவிப்பு, பூச்சி நோய் கண்டறிதல், பண்ணை தொழிலாளர் கூலி மேலாண்மை மற்றும் 38 மாவட்ட நேரடி சந்தை விலை விவரங்கள்.',
    spaceLink: 'தமிழ்நாடு சாட்டிலைட் இணைப்பு',
    activeStatus: 'செயலில் உள்ளது',
    versionLabel: 'பதிப்பு 3.5',

    categoriesTitle: 'வேளாண் பிரிவுகள் & கருவிகள்',
    workflowSubtitle: 'விவசாய செயல்முறை வழிகாட்டி',
    stepProgress: 'படி',
    currentStep: 'தற்போதைய படி',
    nextStep: 'அடுத்த படி',
    prevStep: 'முந்தைய படி',
    all38Districts: 'அனைத்து 38 மாவட்டங்கள்',
    selectDistrict: 'மாவட்டத்தை தேர்வு செய்க',
    viewAllTamilNadu: '38 மாவட்டங்களும் செயலில் உள்ளன',

    offlineModeNotice: 'இணையமற்ற பயன்முறை (ஆஃப்லைன் சேமிப்பு தயார்)',
    onlineSynced: 'இணைய இணைப்பு & நேரடி ஒத்திசைவு',
    preCachedBadge: 'முன்பதிவு: 38 மாவட்டங்கள் • பயிர் நோய்கள் • சந்தை விலை • கூலி குழுக்கள்',
    simulateOfflineToggle: 'இணையமற்ற பயன்முறை (ஆஃப்லைன் சோதனை)',
    offlineStatusTitle: 'நிலை: இணையமற்ற உள்ளூர் பயன்முறை (ஆஃப்லைன் தயார்)',
    onlineStatusTitle: 'நிலை: அதிவேக செயற்கைக்கோள் நேரடி இணைப்பு',
    offlineStatusDesc: 'முன்பதிவு செய்யப்பட்ட தமிழ்நாடு வேளாண் பல்கலைக்கழக பரிந்துரைகள் & உள்ளூர் சந்தை விவரங்கள் பயன்பாட்டில் உள்ளன.',
    onlineStatusDesc: 'TNAU மற்றும் தமிழ்நாடு வேளாண் மையத்துடன் நேரடி தானியங்கி ஒத்திசைவு செயலில் உள்ளது.',
    pwaInstallPrompt: 'இணையம் இல்லாமலும் பயன்படுத்த செயலியை நிறுவுக (PWA)',
    installAppBtn: 'செயலியை நிறுவுக (PWA)',

    voiceAssistantButton: '🎤 தமிழ் குரல் உதவி',
    handsFreeBadge: 'நேரடி குரல் AI',
    voiceModalTitle: 'உழவர் குரல் உதவி (தமிழ் AI)',
    voiceModalSubtitle: 'தமிழில் பேசி தேவையான தகவல்களையும் வழிகாட்டலையும் உடனே பெறுங்கள்',
    voiceListening: 'உங்கள் குரலைக் கேட்கிறது... இப்போது பேசுங்கள்',
    voicePromptHint: '"கோயம்புத்தூர் வானிலை", "நெல் இன்றைய விலை", அல்லது "மண் பரிசோதனை" என்று கூறுங்கள்',
    voiceStopListening: 'கேட்பதை நிறுத்து',

    weatherTitle: 'வேளாண் வானிலை',
    weatherSubtitle: 'நேரடி செயற்கைக்கோள் தரவு',
    quickSelectLabel: 'விரைவு மாவட்ட தேர்வு',
    humidityLabel: 'ஈரப்பதம்',
    rainLabel: 'இன்றைய மழை',
    windLabel: 'காற்றின் வேகம்',
    soilMoistureLabel: 'மண் ஈரப்பதம்',
    canalStatusTitle: 'மேட்டூர் அணை & கால்வாய் நிலை',
    canalStatusValue: '112.4 / 120 அடி',
    forecast5DayTitle: '5 நாள் வேளாண் வானிலை கணிப்பு',
    advisoryAlertTitle: 'வானிலை எச்சரிக்கை & பரிந்துரை (TNAU)',
    advisoryAlertBadge: 'TNAU செயற்கைக்கோள் எச்சரிக்கை',
    advisoryAlertText: 'நெல் பயிர்களுக்கு தகுந்த சூரிய ஒளி மற்றும் நுண்ணீர்ப்பாசன உரக்கரைசல் இடுவதற்கு ஏற்ற சாதகமான சூழல் நிலவுகிறது.',

    cropAdvisoryTitle: 'மண் பரிசோதனை & பயிர் பரிந்துரை',
    cropAdvisorySubtitle: 'உங்கள் வயல் மண் வகை, ஊட்டச்சத்து மற்றும் பாசன வசதியை உள்ளிட்டு தகுந்த அதிக மகசூல் பயிர்களை தெரிந்துகொள்ளுங்கள்.',
    autofillSatelliteBtn: 'செயற்கைக்கோள் தானியங்கி நிரப்பு',
    soilTypeLabel: 'மண் வகை',
    seasonLabel: 'விவசாய பருவம்',
    irrigationSourceLabel: 'முக்கிய நீர் ஆதாரம்',
    landSizeLabel: 'நிலப்பரப்பு (ஏக்கர்)',
    soilNutrientsTitle: 'மண் ஊட்டச்சத்து நிலவரம் (NPK & pH)',
    nitrogenLabel: 'தழைச்சத்து (N)',
    phosphorusLabel: 'மணிச்சத்து (P)',
    potassiumLabel: 'சாம்பல் சத்து (K)',
    phLabel: 'மண் அமில கார நிலை (pH)',
    generateRecommendationsBtn: 'AI பயிர் பரிந்துரைகளைப் பெறுக',
    analyzingSoilProfile: 'மண் பண்புகள் மற்றும் வானிலையை பகுப்பாய்வு செய்கிறது...',
    topRecommendationsTitle: 'உங்கள் நிலத்திற்கு ஏற்ற சிறந்த பயிர்கள்',
    suitabilityScoreLabel: 'பொருத்தம்',
    expectedYieldLabel: 'எதிர்பார்க்கப்படும் மகசூல் / ஏக்கர்',
    estimatedProfitLabel: 'தோராய நிகர லாபம் / ஏக்கர்',
    waterRequirementLabel: 'நீர் தேவை',
    keyRisksLabel: 'முக்கிய இடர்கள் & தடுப்பு முறைகள்',
    bestPracticesLabel: 'பல்கலைக்கழக சிறந்த நடைமுறைகள்',
    marketProspectLabel: 'சந்தை வாய்ப்பு & கொள்முதல் விலை',
    exportPdfBtn: 'பயிர் வழிகாட்டி அறிக்கை பதிவிறக்கு (PDF)',

    smartIrrigationTitle: 'நுண்ணீர்ப்பாசனம் & நீர் மேலாண்மை',
    smartIrrigationSubtitle: 'அணை நீர்மட்டம், கால்வாய் திறப்பு அளவு, நிலத்தடி நீர் மற்றும் பயிர் வாரியான நீர் ஒதுக்கீட்டு விவரங்கள்.',
    damTelemetryTitle: 'முக்கிய அணைகள் & நீர்மட்டம்',
    canalDischargeTitle: 'நேரடி கால்வாய் நீர் திறப்பு அளவு',
    soilMoistureSensorsTitle: 'மண் ஈரப்பத சென்சார்கள்',
    irrigationScheduleTitle: 'துல்லிய பாசன கால அட்டவணை',
    waterSavedBadge: 'துல்லிய பாசனத்தால் 34% நீர் சேமிப்பு',

    diseaseScannerTitle: 'AI பயிர் நோய் & பூச்சி கண்டறிதல்',
    diseaseScannerSubtitle: 'பயிரின் இலை புகைப்படத்தை எடுத்து உடனடி நோய் கண்டறிதல் மற்றும் அங்கக மருந்து பரிந்துரைகளைப் பெறுங்கள்.',
    uploadLeafBtn: 'இலை படம் பதிவேற்றுக',
    takePhotoBtn: 'கேமராவை திறக்குக',
    sampleCasesTitle: 'அல்லது மாதிரி இலைகளை பரிசோதிக்கவும்',
    analyzeDiagnosisBtn: 'பயிர் நோயை பகுப்பாய்வு செய்க',
    analyzingLeafState: 'AI இலை படத்தை ஆராய்கிறது...',
    diagnosisReportTitle: 'நோயறிதல் அறிக்கை & தீர்வு முறைகள்',
    confidenceScoreLabel: 'துல்லியம்',
    symptomsLabel: 'கண்டறியப்பட்ட நோய் அறிகுறிகள்',
    biologicalRemediesLabel: 'இயற்கை மற்றும் அங்கக தீர்வுகள்',
    chemicalRemediesLabel: 'வேதியியல் மருந்து அளவுகள் (TNAU)',

    mandiTitle: 'சந்தை விலை நிலவரம் & 30 நாள் வரைபடம்',
    mandiSubtitle: 'தினசரி ஒழுங்குமுறை விற்பனைக் கூட விலை, முந்தைய 30 நாள் விலை மாற்ற வரைபடம் மற்றும் 7 நாள் கணிப்புகள்.',
    searchCommodityPlaceholder: 'நெல், தக்காளி, மஞ்சள், பருத்தி, வாழை தேடுக...',
    allCategoriesLabel: 'அனைத்து வேளாண் வகைகள்',
    todayPriceHeader: 'இன்றைய விலை (₹/குவிண்டால்)',
    modalPriceHeader: 'நடுத்தர விலை',
    trendHeader: '24 மணி நேர மாற்றம்',
    forecast7DayHeader: '7 நாள் AI கணிப்பு',
    exportMandiPdfBtn: 'சந்தை விலை அறிக்கை பதிவிறக்கு (PDF)',
    historical30DayTitle: '30 நாள் விலை மாற்ற வரைபடம் & AI கணிப்பு',

    calendarTitle: 'தமிழ்நாடு பருவ கால விவசாய அட்டவணை',
    calendarSubtitle: 'குறுவை, சம்பா, தாளடி மற்றும் நவரை பருவ காலங்களுக்கான அதிகாரப்பூர்வ TNAU வழிகாட்டி.',
    kuruvaiSeasonName: 'குறுவை பருவம் (ஜூன் - செப்டம்பர்)',
    sambaSeasonName: 'சம்பா பருவம் (ஆகஸ்ட் - ஜனவரி)',
    thaladiSeasonName: 'தாளடி பருவம் (அக்டோபர் - பிப்ரவரி)',
    navaraiSeasonName: 'நவரை பருவம் (டிசம்பர் - மார்ச்)',
    sowingPeriodLabel: 'விதைப்பு காலம்',
    harvestPeriodLabel: 'அறுவடை காலம்',

    workerProcessTabLabel: 'பண்ணை தொழிலாளர் & கூலி செயல்முறை',
    workerProcessTabTamil: 'பண்ணை தொழிலாளர் & கூலி மேலாண்மை',
    workerProcessTabDesc: 'விவசாய கூலி ஆட்கள் முன்பதிவு, தினசரி கூலி கணக்கீடு, வேலை பகிர்வு மற்றும் மேஸ்திரி தொடர்பு',
    wageCalculatorTitle: 'தினசரி மற்றும் ஒப்பந்த கூலி கணக்கீட்டாளர்',
    laborDirectoryTitle: 'சரிபார்க்கப்பட்ட விவசாய தொழிலாளர் குழுக்கள்',
    taskTrackerTitle: 'வயல் வேலைகள் நேரடி முன்னேற்றம்',
    dailyWageEstimateLabel: 'மொத்த உத்தேச கூலித் தொகை',
    bookLaborGangBtn: 'கூலி ஆட்களை முன்பதிவு செய்க',

    freightTitle: 'வேளாண் சரக்கு போக்குவரத்து பொருத்தம்',
    iotTitle: 'மண் மற்றும் வயல் சென்சார் மேலாண்மை',
    schemeTitle: 'பயிர் காப்பீடு & அரசு மானியங்கள்',
    yieldPredictorTitle: 'AI மகசூல் & லாப கணிப்பாளர்',
    b2bTitle: 'உழவர் - வாடிக்கையாளர் நேரடி சந்தை (B2C)',
    govSchemesTitle: 'அரசு நலத்திட்டங்கள் (உழவன் செயலி)',

    categories: {
      'crop-advisory': {
        title: 'பயிர் & மண் ஆலோசனை',
        tag: 'மண் & ரகங்கள்',
        desc: 'மண் வகைக்கு ஏற்ற பயிர் தேர்வு மற்றும் உற்பத்தி பரிந்துரைகள்',
      },
      'smart-irrigation': {
        title: 'நுண்ணீர்ப்பாசன மேலாண்மை',
        tag: 'அணை & பாசனம்',
        desc: 'அணை நீர்மட்டம், கால்வாய் திறப்பு மற்றும் மண் ஈரப்பத அளவுகள்',
      },
      'disease-scanner': {
        title: 'பயிர் நோய் கண்டறிதல்',
        tag: 'AI கேமரா',
        desc: 'இலை புகைப்படத்தை கொண்டு உடனடி நோய் கண்டறிதல் மற்றும் தீர்வுகள்',
      },
      'seasonal-calendar': {
        title: 'பருவ கால அட்டவணை',
        tag: 'விதைப்பு பருவம்',
        desc: 'குறுவை, சம்பா, தாளடி மற்றும் நவரை சாகுபடி வழிகாட்டல்',
      },
      'agri-mitra-ai': {
        title: 'அக்ரி-மித்ரா AI உதவியாளர்',
        tag: 'Gemini AI',
        desc: 'தமிழில் பேசி ஆலோசனை பெறக்கூடிய நுண்ணறிவு உதவியாளர்',
      },
      'mandi-prices': {
        title: 'சந்தை விலை நிலவரம் (30D)',
        tag: 'சந்தை நிலவரம்',
        desc: '30 நாள் விலை வரைபடம், ஏற்ற இறக்கங்கள் மற்றும் 7 நாள் கணிப்புகள்',
      },
      'smart-freight': {
        title: 'சரக்கு போக்குவரத்து பொருத்தம்',
        tag: 'சரக்கு லாரி',
        desc: 'தொலைவு கணக்கீடு, கிலோமீட்டர் கட்டணம் மற்றும் லாரி முன்பதிவு',
      },
      'iot-telemetry': {
        title: 'வயல் சென்சார் தகவல் (IoT)',
        tag: 'LoRaWAN IoT',
        desc: 'மண் ஈரப்பதம், கார அமில நிலை மற்றும் மோட்டார் வால்வு கட்டுப்பாடு',
      },
      'scheme-finder': {
        title: 'காப்பீடு & அரசு மானியங்கள்',
        tag: 'உழவன் மானியம்',
        desc: 'பயிர் காப்பீடு (PMFBY) மற்றும் தமிழ்நாடு வேளாண் மானிய தகுதி',
      },
      'yield-predictor': {
        title: 'மகசூல் & லாப கணிப்பாளர்',
        tag: 'AI லாபம்',
        desc: 'செலவு கணக்கீடு, மகசூல் மதிப்பீடு மற்றும் வருமான ஒப்பீடு',
      },
      'farm-worker-process': {
        title: 'பண்ணை தொழிலாளர் & கூலி',
        tag: 'கூலி மேலாண்மை',
        desc: 'விவசாய கூலி ஆட்கள் முன்பதிவு, தினசரி கூலி கணக்கீடு மற்றும் வேலை பகிர்வு',
      },
      'b2b-marketplace': {
        title: 'உழவர் - வாடிக்கையாளர் (B2C)',
        tag: 'நேரடி வாடிக்கையாளர்',
        desc: 'உழவரிடமிருந்து வாடிக்கையாளருக்கு நேரடி விற்பனை மற்றும் இடைத்தரகர் அற்ற கொள்முதல்',
      },
      'gov-schemes': {
        title: 'அரசு நலத்திட்ட கையேடு',
        tag: 'அரசு கையேடு',
        desc: 'மானியம், இலவச மின்சாரம், கடன் திட்டங்கள் மற்றும் உதவி எண்கள்',
      },
      'farmer-account': {
        title: 'உழவர் கூகிள் கணக்கு',
        tag: 'கூகிள் உள்நுழைவு',
        desc: 'கூகிள் மின்னஞ்சல் மூலம் உள்நுழைவு, நில பரப்பளவு மற்றும் சுயவிவர மேலாண்மை',
      },
    },
  },

  hi: {
    appTitle: 'तमिलनाडु कृषि हब',
    appSubtitle: 'टीएन स्पेस लिंक',
    activeRegion: 'सक्रिय क्षेत्र • तमिलनाडु',
    telemetryBadge: '38 जिले टेलीमेट्री',
    heroTitle: 'तमिलनाडु कृषि सलाहकार और किसान हब',
    heroDescription: 'मृदा बुद्धिमत्ता, कृषि मौसम सलाह, वास्तविक समय मौसम विश्लेषण, कृषि श्रमिक प्रबंधन और तमिलनाडु के सभी 38 जिलों के मंडी भाव।',
    spaceLink: 'टीएन स्पेस लिंक',
    activeStatus: 'सक्रिय',
    versionLabel: 'संस्करण 3.5',

    categoriesTitle: 'श्रेणियाँ और उपकरण',
    workflowSubtitle: 'कृषि कार्यप्रवाह मॉड्यूल',
    stepProgress: 'चरण',
    currentStep: 'वर्तमान चरण',
    nextStep: 'अगला चरण',
    prevStep: 'पिछला चरण',
    all38Districts: 'सभी 38 जिले',
    selectDistrict: 'जिला चुनें',
    viewAllTamilNadu: 'सभी 38 जिले सक्रिय',

    offlineModeNotice: 'ऑफ़लाइन मोड (स्थानीय कैश सक्रिय)',
    onlineSynced: 'ऑनलाइन लाइव सिंक किया गया',
    preCachedBadge: 'कैश किया गया: 38 जिले • फसल रोग • मंडी भाव • श्रमिक',
    simulateOfflineToggle: 'ऑफ़लाइन मोड का परीक्षण करें',
    offlineStatusTitle: 'स्थिति: कम कनेक्टिविटी (स्थानीय कैश सक्रिय)',
    onlineStatusTitle: 'स्थिति: उपग्रह से ऑनलाइन कनेक्टेड',
    offlineStatusDesc: 'टीएनएयू फसल नियम और स्थानीय मृदा कैलकुलेटर डेटा उपलब्ध है।',
    onlineStatusDesc: 'तमिलनाडु एग्री क्लाउड के साथ सीधा सिंक्रनाइज़ेशन सक्रिय है।',
    pwaInstallPrompt: 'खेत में ऑफ़लाइन उपयोग के लिए ऐप इंस्टॉल करें (PWA)',
    installAppBtn: 'ऐप इंस्टॉल करें',

    voiceAssistantButton: '🎤 आवाज सहायक',
    handsFreeBadge: 'हैंड्स-फ्री एआई',
    voiceModalTitle: 'कृषि आवाज सहायक (AI)',
    voiceModalSubtitle: 'अपनी भाषा में बोलकर त्वरित उत्तर और नेविगेशन प्राप्त करें',
    voiceListening: 'आपकी आवाज सुन रहा है... अब बोलें',
    voicePromptHint: '"कोयंबटूर मौसम", "चावल का भाव", या "फसल सलाह" कहें',
    voiceStopListening: 'सुनना बंद करें',

    weatherTitle: 'कृषि मौसम',
    weatherSubtitle: 'लाइव सैटेलाइट सिंक',
    quickSelectLabel: 'त्वरित जिला चयन',
    humidityLabel: 'आर्द्रता',
    rainLabel: 'आज की वर्षा',
    windLabel: 'हवा की गति',
    soilMoistureLabel: 'मृदा नमी',
    canalStatusTitle: 'मेट्टूर बांध और नहर की स्थिति',
    canalStatusValue: '112.4 / 120 फीट',
    forecast5DayTitle: '5-दिवसीय कृषि मौसम पूर्वानुमान',
    advisoryAlertTitle: 'कृषि मौसम चेतावनी (TNAU)',
    advisoryAlertBadge: 'टीएनएयू सैटेलाइट एडवाइजरी',
    advisoryAlertText: 'धान की फसल के लिए अनुकूल धूप और ड्रिप फर्टिगेशन हेतु उत्तम परिस्थितियां हैं।',

    cropAdvisoryTitle: 'मृदा स्वास्थ्य और फसल सलाह',
    cropAdvisorySubtitle: 'अपनी मिट्टी का प्रकार और पोषक तत्व दर्ज करें और उपयुक्त उच्च उपज वाली फसलों की जानकारी प्राप्त करें।',
    autofillSatelliteBtn: 'सैटेलाइट से ऑटो-भरें',
    soilTypeLabel: 'मिट्टी का प्रकार',
    seasonLabel: 'कृषि मौसम',
    irrigationSourceLabel: 'मुख्य जल स्रोत',
    landSizeLabel: 'भूमि का आकार (एकड़)',
    soilNutrientsTitle: 'मृदा पोषक तत्व (NPK & pH)',
    nitrogenLabel: 'नाइट्रोजन (N)',
    phosphorusLabel: 'फास्फोरस (P)',
    potassiumLabel: 'पोटेशियम (K)',
    phLabel: 'मृदा पीएच मान (pH)',
    generateRecommendationsBtn: 'एआई फसल सिफारिशें प्राप्त करें',
    analyzingSoilProfile: 'मृदा गुणों का विश्लेषण कर रहा है...',
    topRecommendationsTitle: 'आपकी भूमि के लिए सर्वश्रेष्ठ फसलें',
    suitabilityScoreLabel: 'अनुकूलता स्कोर',
    expectedYieldLabel: 'अपेक्षित उपज / एकड़',
    estimatedProfitLabel: 'अनुमानित शुद्ध लाभ / एकड़',
    waterRequirementLabel: 'जल की आवश्यकता',
    keyRisksLabel: 'प्रमुख जोखिम और सावधानियां',
    bestPracticesLabel: 'टीएनएयू अनुशंसित तरीके',
    marketProspectLabel: 'बाजार संभावना और खरीद मूल्य',
    exportPdfBtn: 'फसल सलाह रिपोर्ट डाउनलोड करें (PDF)',

    smartIrrigationTitle: 'स्मार्ट सिंचाई और जल प्रबंधन',
    smartIrrigationSubtitle: 'बांध जल स्तर, नहर का प्रवाह, भूजल स्तर और फसल अनुसार जल बजट।',
    damTelemetryTitle: 'प्रमुख बांध और जल स्तर',
    canalDischargeTitle: 'नहर से जल प्रवाह दर',
    soilMoistureSensorsTitle: 'मृदा नमी सेंसर',
    irrigationScheduleTitle: 'सटीक सिंचाई अनुसूची',
    waterSavedBadge: 'सटीक सिंचाई से 34% जल बचत',

    diseaseScannerTitle: 'एआई फसल रोग और कीट स्कैनर',
    diseaseScannerSubtitle: 'पत्ती की तस्वीर खींचकर फसल के रोगों की तुरंत पहचान और जैविक उपचार प्राप्त करें।',
    uploadLeafBtn: 'पत्ती का फोटो अपलोड करें',
    takePhotoBtn: 'कैमरा खोलें',
    sampleCasesTitle: 'या नमूना छवियों का परीक्षण करें',
    analyzeDiagnosisBtn: 'फसल रोग का विश्लेषण करें',
    analyzingLeafState: 'एआई पत्ती का विश्लेषण कर रहा है...',
    diagnosisReportTitle: 'रोग निदान रिपोर्ट और उपचार',
    confidenceScoreLabel: 'सटीकता',
    symptomsLabel: 'रोग के लक्षण',
    biologicalRemediesLabel: 'जैविक उपचार',
    chemicalRemediesLabel: 'रासायनिक उपचार खुराक (TNAU)',

    mandiTitle: 'मंडी भाव और 30-दिवसीय रुझान',
    mandiSubtitle: 'दैनिक बाजार दरें, 30-दिवसीय मूल्य ग्राफ और 7-दिवसीय एआई पूर्वानुमान।',
    searchCommodityPlaceholder: 'धान, टमाटर, हल्दी, कपास खोजें...',
    allCategoriesLabel: 'सभी श्रेणियां',
    todayPriceHeader: 'आज का भाव (₹/क्विंटल)',
    modalPriceHeader: 'मॉडल भाव',
    trendHeader: '24 घंटे का बदलाव',
    forecast7DayHeader: '7-दिन का एआई पूर्वानुमान',
    exportMandiPdfBtn: 'मंडी भाव रिपोर्ट डाउनलोड करें (PDF)',
    historical30DayTitle: '30-दिवसीय मूल्य आंदोलन और पूर्वानुमान',

    calendarTitle: 'तमिलनाडु मौसमी कृषि कैलेंडर',
    calendarSubtitle: 'कुरुवई, सांबा, थालाडी और नवरई चक्रों के लिए आधिकारिक टीएनएयू कैलेंडर।',
    kuruvaiSeasonName: 'कुरुवई मौसम (जून - सितंबर)',
    sambaSeasonName: 'सांबा मौसम (अगस्त - जनवरी)',
    thaladiSeasonName: 'थालाडी मौसम (अक्टूबर - फरवरी)',
    navaraiSeasonName: 'नवरई मौसम (दिसंबर - मार्च)',
    sowingPeriodLabel: 'बुवाई की अवधि',
    harvestPeriodLabel: 'कटाई की अवधि',

    workerProcessTabLabel: 'कृषि श्रमिक और मजदूरी प्रक्रिया',
    workerProcessTabTamil: 'फार्म श्रमिक और कार्य आवंटन',
    workerProcessTabDesc: 'खेत मजदूरों की बुकिंग, दैनिक मजदूरी गणना और कार्य प्रबंधन',
    wageCalculatorTitle: 'दैनिक और अनुबंध मजदूरी कैलकुलेटर',
    laborDirectoryTitle: 'सत्यापित कृषि श्रमिक दल',
    taskTrackerTitle: 'सक्रिय कार्य प्रगति',
    dailyWageEstimateLabel: 'कुल अनुमानित मजदूरी बजट',
    bookLaborGangBtn: 'मजदूरों को बुक करें',

    freightTitle: 'स्मार्ट कृषि माल ढुलाई',
    iotTitle: 'आईओटी फील्ड टेलीमेट्री',
    schemeTitle: 'फसल बीमा और सरकारी अनुदान',
    yieldPredictorTitle: 'एआई उपज और लाभ सिमुलेशन',
    b2bTitle: 'किसान से ग्राहक B2C सीधा बाजार',
    govSchemesTitle: 'सरकारी योजनाएं और सब्सिडी (उझावन)',

    categories: {
      'crop-advisory': {
        title: 'फसल और मृदा सलाह',
        tag: 'मिट्टी और किस्में',
        desc: 'मृदा उपयुक्तता और मौसमी फसल सिफारिशें',
      },
      'smart-irrigation': {
        title: 'स्मार्ट सिंचाई प्रबंधन',
        tag: 'बांध और जल',
        desc: 'बांध जल स्तर, नहर प्रवाह और नमी टेलीमेट्री',
      },
      'disease-scanner': {
        title: 'रोग और कीट स्कैनर',
        tag: 'एआई दृष्टि',
        desc: 'पत्तियों के रोगों का तत्काल निदान और उपचार',
      },
      'seasonal-calendar': {
        title: 'मौसमी कृषि कैलेंडर',
        tag: 'बुवाई चक्र',
        desc: 'कुरुवई, सांबा और नवरई फसलों का समयबद्ध कार्यक्रम',
      },
      'agri-mitra-ai': {
        title: 'एग्री-मित्रा एआई सहायक',
        tag: 'Gemini AI',
        desc: 'बहुभाषी वॉयस-सक्षम स्मार्ट कृषि सहायक',
      },
      'mandi-prices': {
        title: 'मंडी 30D रुझान',
        tag: '30D रुझान',
        desc: '30-दिवसीय मूल्य ग्राफ और 7-दिवसीय पूर्वानुमान',
      },
      'smart-freight': {
        title: 'स्मार्ट माल ढुलाई',
        tag: 'लॉजिस्टिक्स',
        desc: 'दूरी गणना, प्रति किमी दर और ट्रक बुकिंग',
      },
      'iot-telemetry': {
        title: 'आईओटी फील्ड टेलीमेट्री',
        tag: 'LoRaWAN IoT',
        desc: 'मृदा नमी %, पीएच और वाल्व नियंत्रण',
      },
      'scheme-finder': {
        title: 'बीमा और सब्सिडी',
        tag: 'सरकारी अनुदान',
        desc: 'पीएमएफबीवाई फसल बीमा और कृषि सब्सिडी मिलान',
      },
      'yield-predictor': {
        title: 'उपज और लाभ कैलकुलेटर',
        tag: 'एआई लाभ',
        desc: 'लागत विश्लेषण, उपज अनुमान और शुद्ध लाभ गणना',
      },
      'farm-worker-process': {
        title: 'श्रमिक और मजदूरी',
        tag: 'मजदूरी प्रबंधन',
        desc: 'खेत मजदूरों की बुकिंग, दैनिक मजदूरी और कार्य आवंटन',
      },
      'b2b-marketplace': {
        title: 'किसान से ग्राहक (B2C)',
        tag: 'सीधा ग्राहक',
        desc: 'किसानों से सीधे ग्राहकों और परिवारों को बिना दलाली के ताजा उपज की बिक्री',
      },
      'gov-schemes': {
        title: 'सरकारी योजना निर्देशिका',
        tag: 'निर्देशिका',
        desc: 'सब्सिडी, पीएम-किसान अनुदान और हेल्पलाइन नंबर',
      },
    },
  },

  te: {
    appTitle: 'తమిళనాడు వ్యవసాయ కేంద్రం',
    appSubtitle: 'స్పేస్ లింక్',
    activeRegion: 'యాక్టివ్ రీజియన్ • తమిళనాడు',
    telemetryBadge: '38 జిల్లాల టెలిమెట్రీ',
    heroTitle: 'తమిళనాడు అగ్రికల్చరల్ హబ్',
    heroDescription: 'నేల పరిజ్ఞానం, వాతావరణ సలహాలు, పంట వ్యాధి గుర్తింపు, వ్యవసాయ కూలీల నిర్వహణ మరియు మార్కెట్ ధరలు.',
    spaceLink: 'స్పేస్ లింక్',
    activeStatus: 'యాక్టివ్',
    versionLabel: 'వెర్షన్ 3.5',

    categoriesTitle: 'కేటగిరీలు & సాధనాలు',
    workflowSubtitle: 'వ్యవసాయ వర్క్‌ఫ్లో మాడ్యూల్స్',
    stepProgress: 'దశ',
    currentStep: 'ప్రస్తుత దశ',
    nextStep: 'తదుపరి దశ',
    prevStep: 'మునుపటి దశ',
    all38Districts: 'అన్ని 38 జిల్లాలు',
    selectDistrict: 'జిల్లాను ఎంచుకోండి',
    viewAllTamilNadu: '38 జిల్లాలు యాక్టివ్‌గా ఉన్నాయి',

    offlineModeNotice: 'ఆఫ్‌లైన్ మోడ్ (లోకల్ కాష్ సక్రియం)',
    onlineSynced: 'ఆన్‌లైన్ సింక్ చేయబడింది',
    preCachedBadge: '38 జిల్లాలు • పంట వ్యాధులు • కూలీ బృందాలు',
    simulateOfflineToggle: 'ఆఫ్‌లైన్ మోడ్ పరీక్ష',
    offlineStatusTitle: 'స్థితి: తక్కువ కనెక్టివిటీ (ఆఫ్‌లైన్ మోడ్)',
    onlineStatusTitle: 'స్థితి: ఆన్‌లైన్ (శాటిలైట్ కనెక్ట్ చేయబడింది)',
    offlineStatusDesc: 'పంట నియమాలు మరియు స్థానిక నేల కాలిక్యులేటర్ అందుబాటులో ఉన్నాయి.',
    onlineStatusDesc: 'క్లౌడ్ హబ్‌తో ప్రత్యక్ష సమకాలీకరణ సక్రియంగా ఉంది.',
    pwaInstallPrompt: 'ఆఫ్‌లైన్ వినియోగం కోసం యాప్‌ను ఇన్‌స్టాల్ చేయండి (PWA)',
    installAppBtn: 'యాప్‌ను ఇన్‌స్టాల్ చేయండి',

    voiceAssistantButton: '🎤 వాయిస్ అసిస్టెంట్',
    handsFreeBadge: 'వాయిస్ AI',
    voiceModalTitle: 'వ్యవసాయ వాయిస్ అసిస్టెంట్',
    voiceModalSubtitle: 'సహజంగా మాట్లాడి తక్షణ సమాధానాలు పొందండి',
    voiceListening: 'మీ వాయిస్ వింటోంది... మాట్లాడండి',
    voicePromptHint: '"కోయంబత్తూర్ వాతావరణం", "వరి ధర", లేదా "పంట సలహా" అనండి',
    voiceStopListening: 'వినడం ఆపండి',

    weatherTitle: 'వ్యవసాయ వాతావరణం',
    weatherSubtitle: 'లైవ్ శాటిలైట్ సింక్',
    quickSelectLabel: 'త్వరిత జిల్లా ఎంపిక',
    humidityLabel: 'తేమ',
    rainLabel: 'నేటి వర్షం',
    windLabel: 'గాలి వేగం',
    soilMoistureLabel: 'నేల తేమ',
    canalStatusTitle: 'మెట్టూరు ఆనకట్ట & కాలువ స్థితి',
    canalStatusValue: '112.4 / 120 అడుగులు',
    forecast5DayTitle: '5-రోజుల వాతావరణ సూచన',
    advisoryAlertTitle: 'వాతావరణ హెచ్చరిక (TNAU)',
    advisoryAlertBadge: 'టీఎన్‌ఏయూ సలహా',
    advisoryAlertText: 'వరి పంటలకు అనుకూలమైన సూర్యకాంతి మరియు బిందు సేద్యం కొరకు అనుకూల పరిస్థితులు ఉన్నాయి.',

    cropAdvisoryTitle: 'నేల పరీక్ష & పంట సలహాలు',
    cropAdvisorySubtitle: 'మీ నేల రకం మరియు పోషకాలను నమోదు చేసి అధిక దిగుబడినిచ్చే పంటలను తెలుసుకోండి.',
    autofillSatelliteBtn: 'శాటిలైట్ నుండి ఆటో-ఫిల్',
    soilTypeLabel: 'నేల రకం',
    seasonLabel: 'వ్యవసాయ కాలం',
    irrigationSourceLabel: 'ప్రధాన నీటి వనరు',
    landSizeLabel: 'భూమి విస్తీర్ణం (ఎకరాలు)',
    soilNutrientsTitle: 'నేల పోషకాలు (NPK & pH)',
    nitrogenLabel: 'నత్రజని (N)',
    phosphorusLabel: 'భాస్వరం (P)',
    potassiumLabel: 'పొటాషియం (K)',
    phLabel: 'నేల pH స్థాయి',
    generateRecommendationsBtn: 'AI పంట సిఫార్సులను పొందండి',
    analyzingSoilProfile: 'నేల ప్రొఫైల్‌ను విశ్లేషిస్తోంది...',
    topRecommendationsTitle: 'మీ నేలకు తగిన ఉత్తమ పంటలు',
    suitabilityScoreLabel: 'సరిపోలిక స్కోరు',
    expectedYieldLabel: 'ఆశించిన దిగుబడి / ఎకరాకు',
    estimatedProfitLabel: 'అంచనా నికర లాభం / ఎకరాకు',
    waterRequirementLabel: 'నీటి అవసరం',
    keyRisksLabel: 'ప్రధాన ప్రమాదాలు & జాగ్రత్తలు',
    bestPracticesLabel: 'సిఫార్సు చేసిన పద్ధతులు',
    marketProspectLabel: 'మార్కెట్ అవకాశాలు & సేకరణ ధర',
    exportPdfBtn: 'పంట నివేదికను డౌన్‌లోడ్ చేయండి (PDF)',

    smartIrrigationTitle: 'స్మార్ట్ ఇరిగేషన్ & నీటి నిర్వహణ',
    smartIrrigationSubtitle: 'ఆనకట్ట నీటి మట్టాలు, కాలువ ప్రవాహం మరియు పంట నీటి బడ్జెట్ గణనలు.',
    damTelemetryTitle: 'ప్రధాన ఆనకట్టలు & నీటి స్థాయిలు',
    canalDischargeTitle: 'కాలువ నీటి ప్రవాహం',
    soilMoistureSensorsTitle: 'నేల తేమ సెన్సార్లు',
    irrigationScheduleTitle: 'ఖచ్చితమైన నీటి షెడ్యూల్',
    waterSavedBadge: '34% నీరు ఆదా చేయబడింది',

    diseaseScannerTitle: 'AI పంట వ్యాధి & తెగులు స్కానర్',
    diseaseScannerSubtitle: 'ఆకు ఫోటో తీసి వ్యాధులను వెంటనే గుర్తించి సేంద్రీయ నివారణలను పొందండి.',
    uploadLeafBtn: 'ఆకు ఫోటో అప్‌లోడ్ చేయండి',
    takePhotoBtn: 'కెమెరా తెరవండి',
    sampleCasesTitle: 'లేదా నమూనా చిత్రాలను పరీక్షించండి',
    analyzeDiagnosisBtn: 'పంట ఆరోగ్యాన్ని విశ్లేషించండి',
    analyzingLeafState: 'AI ఆకును విశ్లేషిస్తోంది...',
    diagnosisReportTitle: 'వ్యాధి నిర్ధారణ నివేదిక & చికిత్స',
    confidenceScoreLabel: 'ఖచ్చితత్వం',
    symptomsLabel: 'గుర్తించబడిన లక్షణాలు',
    biologicalRemediesLabel: 'సేంద్రీయ చికిత్సలు',
    chemicalRemediesLabel: 'రసాయన మందుల మోతాదు (TNAU)',

    mandiTitle: 'మండి ధరలు & 30-రోజుల ట్రెండ్స్',
    mandiSubtitle: 'రోజువారీ మార్కెట్ ధరలు, 30-రోజుల ధరల గ్రాఫ్ మరియు 7-రోజుల AI అంచనాలు.',
    searchCommodityPlaceholder: 'వరి, టమోటా, పసుపు, పత్తి వెతకండి...',
    allCategoriesLabel: 'అన్ని విభాగాలు',
    todayPriceHeader: 'నేటి ధర (₹/క్వింటాల్)',
    modalPriceHeader: 'మోడల్ ధర',
    trendHeader: '24 గంటల మార్పు',
    forecast7DayHeader: '7-రోజుల AI సూచన',
    exportMandiPdfBtn: 'మండి ధరల నివేదిక డౌన్‌లోడ్ (PDF)',
    historical30DayTitle: '30-రోజుల ధరల కదలిక మరియు విశ్లేషణ',

    calendarTitle: 'తమిళనాడు పంటల క్యాలెండర్',
    calendarSubtitle: 'కురువై, సాంబ, తలాడి మరియు నవరై పంట కాలాల అధికారిక క్యాలెండర్.',
    kuruvaiSeasonName: 'కురువై కాలం (జూన్ - సెప్టెంబర్)',
    sambaSeasonName: 'సాంబ కాలం (ఆగస్టు - జనవరి)',
    thaladiSeasonName: 'తలాడి కాలం (అక్టోబర్ - ఫిబ్రవరి)',
    navaraiSeasonName: 'నవరై కాలం (డిసెంబర్ - మార్చి)',
    sowingPeriodLabel: 'విత్తే సమయం',
    harvestPeriodLabel: 'కోత సమయం',

    workerProcessTabLabel: 'వ్యవసాయ కూలీల నిర్వహణ',
    workerProcessTabTamil: 'కూలీల బుకింగ్ & వేతన గణన',
    workerProcessTabDesc: 'కూలీల బుకింగ్, రోజువారీ వేతన కాలిక్యులేటర్ మరియు పని కేటాయింపు',
    wageCalculatorTitle: 'రోజువారీ & కాంట్రాక్ట్ వేతన కాలిక్యులేటర్',
    laborDirectoryTitle: 'ధృవీకరించబడిన వ్యవసాయ కూలీ బృందాలు',
    taskTrackerTitle: 'క్షేత్ర పనుల పురోగతి',
    dailyWageEstimateLabel: 'మొత్తం అంచనా కూలీ బడ్జెట్',
    bookLaborGangBtn: 'కూలీలను బుక్ చేయండి',

    freightTitle: 'స్మార్ట్ సరుకు రవాణా',
    iotTitle: 'IoT ఫీల్డ్ టెలిమెట్రీ',
    schemeTitle: 'పంట బీమా & ప్రభుత్వ సబ్సిడీలు',
    yieldPredictorTitle: 'దిగుబడి & లాభ అంచనా',
    b2bTitle: 'రైతు నుండి వినియోగదారు B2C మార్కెట్',
    govSchemesTitle: 'ప్రభుత్వ పథకాలు (ఉళవన్)',

    categories: {
      'crop-advisory': {
        title: 'పంట & నేల సలహా',
        tag: 'నేల & రకాలు',
        desc: 'నేల అనుకూలత మరియు పంట సిఫార్సులు',
      },
      'smart-irrigation': {
        title: 'స్మార్ట్ ఇరిగేషన్',
        tag: 'ఆనకట్ట & నీరు',
        desc: 'ఆనకట్ట స్థాయిలు మరియు తేమ టెలిమెట్రీ',
      },
      'disease-scanner': {
        title: 'వ్యాధి స్కానర్',
        tag: 'AI కెమెరా',
        desc: 'ఆకు తెగుళ్లు మరియు నివారణల గుర్తింపు',
      },
      'seasonal-calendar': {
        title: 'సీజనల్ క్యాలెండర్',
        tag: 'విత్తే కాలం',
        desc: 'కురువై, సాంబ మరియు నవరై షెడ్యూల్స్',
      },
      'agri-mitra-ai': {
        title: 'అగ్రి-మిత్ర AI',
        tag: 'Gemini AI',
        desc: 'వాయిస్-సహాయక స్మార్ట్ వ్యవసాయ సహాయకుడు',
      },
      'mandi-prices': {
        title: 'మండి 30D ట్రెండ్స్',
        tag: 'ధరల ట్రెండ్స్',
        desc: '30-రోజుల గ్రాఫ్‌లు మరియు 7-రోజుల అంచనాలు',
      },
      'smart-freight': {
        title: 'సరుకు రవాణా',
        tag: 'లాజిస్టిక్స్',
        desc: 'దూర గణన మరియు లారీ బుకింగ్',
      },
      'iot-telemetry': {
        title: 'IoT ఫీల్డ్ టెలిమెట్రీ',
        tag: 'LoRaWAN IoT',
        desc: 'నేల తేమ % మరియు వాల్వ్ నియంత్రణ',
      },
      'scheme-finder': {
        title: 'బీమా & సబ్సిడీలు',
        tag: 'రైతు గ్రాంట్లు',
        desc: 'PMFBY బీమా మరియు సబ్సిడీ సరిపోలిక',
      },
      'yield-predictor': {
        title: 'దిగుబడి & లాభం',
        tag: 'AI లాభం',
        desc: 'ఖర్చు విశ్లేషణ మరియు లాభాల అంచనా',
      },
      'farm-worker-process': {
        title: 'కూలీల నిర్వహణ',
        tag: 'కూలీలు & వేతనం',
        desc: 'కూలీల బుకింగ్ మరియు వేతనాల కాలిక్యులేటర్',
      },
      'b2b-marketplace': {
        title: 'రైతు నుండి క్లయింట్ (B2C)',
        tag: 'డైరెక్ట్ క్లయింట్',
        desc: 'రైతుల నుండి నేరుగా వినియోగదారులకు వ్యవసాయ ఉత్పత్తుల అమ్మకం',
      },
      'gov-schemes': {
        title: 'ప్రభుత్వ పథకాలు',
        tag: 'డైరెక్టరీ',
        desc: 'సబ్సిడీలు మరియు హెల్ప్‌లైన్ వివరాలు',
      },
    },
  },

  bn: {
    appTitle: 'তামিলনাড়ু কৃষি হাব',
    appSubtitle: 'স্পেস লিংক',
    activeRegion: 'সক্রিয় অঞ্চল • তামিলনাড়ু',
    telemetryBadge: '৩৮ জেলা টেলিমেট্রি',
    heroTitle: 'তামিলনাড়ু এগ্রিকালচারাল হাব',
    heroDescription: 'মাটি বিশ্লেষণ, আবহাওয়া পূর্বাভাস, রোগ শনাক্তকরণ, কৃষি শ্রমিক ব্যবস্থাপনা এবং লাইভ বাজার মূল্য।',
    spaceLink: 'স্পেস লিংক',
    activeStatus: 'সক্রিয়',
    versionLabel: 'সংস্করণ ৩.৫',

    categoriesTitle: 'বিভাগ এবং সরঞ্জাম',
    workflowSubtitle: 'কৃষি কর্মপ্রবাহ মডিউল',
    stepProgress: 'ধাপ',
    currentStep: 'বর্তমান ধাপ',
    nextStep: 'পরবর্তী ধাপ',
    prevStep: 'পূর্ববর্তী ধাপ',
    all38Districts: 'সকল ৩৮টি জেলা',
    selectDistrict: 'জেলা নির্বাচন করুন',
    viewAllTamilNadu: '৩৮টি জেলা সক্রিয়',

    offlineModeNotice: 'অফলাইন মোড (লোকাল ক্যাশ সক্রিয়)',
    onlineSynced: 'অনলাইন লাইভ সিঙ্ক সম্পন্ন',
    preCachedBadge: '৩৮ জেলা • ফসলের রোগ • বাজার দর • শ্রমিক',
    simulateOfflineToggle: 'অফলাইন মোড পরীক্ষা',
    offlineStatusTitle: 'স্থিতি: স্বল্প সংযোগ (অফলাইন মোড)',
    onlineStatusTitle: 'স্থিতি: অনলাইনে স্যাটেলাইট সংযুক্ত',
    offlineStatusDesc: 'ফসলের নিয়মাবলী এবং স্থানীয় মাটি ক্যালকুলেটর উপলব্ধ।',
    onlineStatusDesc: 'ক্লাউড হাবের সাথে সরাসরি সিঙ্ক সক্রিয় রয়েছে।',
    pwaInstallPrompt: 'মাঠে অফলাইনে ব্যবহারের জন্য অ্যাপটি ইনস্টল করুন (PWA)',
    installAppBtn: 'অ্যাপ ইনস্টল করুন',

    voiceAssistantButton: '🎤 ভয়েস সহকারী',
    handsFreeBadge: 'ভয়েস এআই',
    voiceModalTitle: 'কৃষি ভয়েস সহকারী',
    voiceModalSubtitle: 'সহজে কথা বলে তাৎক্ষণিক পরামর্শ পান',
    voiceListening: 'আপনার কথা শুনছে... বলুন',
    voicePromptHint: '"আবহাওয়া কেমন", "ধানের দাম", বা "মাটির পরামর্শ" বলুন',
    voiceStopListening: 'শোনা বন্ধ করুন',

    weatherTitle: 'কৃষি আবহাওয়া',
    weatherSubtitle: 'লাইভ স্যাটেলাইট সিঙ্ক',
    quickSelectLabel: 'দ্রুত জেলা নির্বাচন',
    humidityLabel: 'আর্দ্রতা',
    rainLabel: 'আজকের বৃষ্টিপাত',
    windLabel: 'বাতাসের গতি',
    soilMoistureLabel: 'মাটির আর্দ্রতা',
    canalStatusTitle: 'মেত্তুর বাঁধ ও খালের অবস্থা',
    canalStatusValue: '১১২.৪ / ১২০ ফুট',
    forecast5DayTitle: '৫ দিনের আবহাওয়া পূর্বাভাস',
    advisoryAlertTitle: 'কৃষি আবহাওয়া সতর্কবার্তা (TNAU)',
    advisoryAlertBadge: 'টিএনএইউ পরামর্শ',
    advisoryAlertText: 'ধান ফসলের জন্য উপযুক্ত সূর্যালোক এবং ড্রিপ সেচের অনুকূল পরিস্থিতি রয়েছে।',

    cropAdvisoryTitle: 'মাটি পরীক্ষা ও ফসল পরামর্শ',
    cropAdvisorySubtitle: 'আপনার মাটির ধরন ও পুষ্টি উপাদান প্রবেশ করিয়ে সেরা ফসল নির্বাচন করুন।',
    autofillSatelliteBtn: 'স্যাটেলাইট থেকে পূরণ করুন',
    soilTypeLabel: 'মাটির ধরন',
    seasonLabel: 'কৃষি মৌসুম',
    irrigationSourceLabel: 'প্রধান পানির উৎস',
    landSizeLabel: 'জমির পরিমাণ (একর)',
    soilNutrientsTitle: 'মাটির পুষ্টি উপাদান (NPK & pH)',
    nitrogenLabel: 'নাইট্রোজেন (N)',
    phosphorusLabel: 'ফসফরাস (P)',
    potassiumLabel: 'পটাশিয়াম (K)',
    phLabel: 'মাটির pH মাত্রা',
    generateRecommendationsBtn: 'AI ফসল পরামর্শ গ্রহণ করুন',
    analyzingSoilProfile: 'মাটি ও আবহাওয়া বিশ্লেষণ করা হচ্ছে...',
    topRecommendationsTitle: 'আপনার জমির জন্য সেরা ফসল',
    suitabilityScoreLabel: 'উপযুক্ততা স্কোর',
    expectedYieldLabel: 'প্রত্যাশিত ফলন / একর',
    estimatedProfitLabel: 'আনুমানিক নিট লাভ / একর',
    waterRequirementLabel: 'পানির প্রয়োজনীয়তা',
    keyRisksLabel: 'প্রধান ঝুঁকি ও সতর্কতা',
    bestPracticesLabel: 'বিশ্ববিদ্যালয়ের প্রস্তাবিত পদ্ধতি',
    marketProspectLabel: 'বাজার সম্ভাবনা ও ক্রয়মূল্য',
    exportPdfBtn: 'ফসল রিপোর্ট ডাউনলোড করুন (PDF)',

    smartIrrigationTitle: 'স্মার্ট সেচ ও পানি ব্যবস্থাপনা',
    smartIrrigationSubtitle: 'বাঁধের পানির স্তর, খালের পানি প্রবাহ এবং ফসলের পানির বাজেট।',
    damTelemetryTitle: 'প্রধান বাঁধ ও পানির স্তর',
    canalDischargeTitle: 'খালের পানি প্রবাহ',
    soilMoistureSensorsTitle: 'মাটির আর্দ্রতা সেন্সর',
    irrigationScheduleTitle: 'নির্ভুল সেচ সূচি',
    waterSavedBadge: 'নির্ভুল সেচে ৩৪% পানি সাশ্রয়',

    diseaseScannerTitle: 'AI ফসলের রোগ ও পোকা স্ক্যানার',
    diseaseScannerSubtitle: 'পাতার ছবি তুলে তাৎক্ষণিক রোগ শনাক্তকরণ ও জৈব সমাধান পান।',
    uploadLeafBtn: 'পাতার ছবি আপলোড করুন',
    takePhotoBtn: 'ক্যামেরা চালু করুন',
    sampleCasesTitle: 'অথবা নমুনা ছবি দিয়ে পরীক্ষা করুন',
    analyzeDiagnosisBtn: 'ফসলের স্বাস্থ্য বিশ্লেষণ করুন',
    analyzingLeafState: 'AI পাতা বিশ্লেষণ করছে...',
    diagnosisReportTitle: 'রোগ নির্ণয় রিপোর্ট ও চিকিৎসা',
    confidenceScoreLabel: 'নির্ভুলতা',
    symptomsLabel: 'লক্ষিত উপসর্গ',
    biologicalRemediesLabel: 'জৈব প্রতিকার',
    chemicalRemediesLabel: 'রাসায়নিক ওষুধের মাত্রা (TNAU)',

    mandiTitle: 'মান্ডি দর ও ৩০ দিনের ট্রেন্ড',
    mandiSubtitle: 'দৈনিক বাজার দর, ৩০ দিনের চার্ট এবং ৭ দিনের AI পূর্বাভাস।',
    searchCommodityPlaceholder: 'ধান, টমেটো, হলুদ, তুলা খুঁজুন...',
    allCategoriesLabel: 'সব বিভাগ',
    todayPriceHeader: 'আজকের দর (₹/কুইন্টাল)',
    modalPriceHeader: 'গড় মূল্য',
    trendHeader: '২৪ ঘণ্টার পরিবর্তন',
    forecast7DayHeader: '৭ দিনের পূর্বাভাস',
    exportMandiPdfBtn: 'বাজার দর রিপোর্ট ডাউনলোড (PDF)',
    historical30DayTitle: '৩০ দিনের দামের পরিবর্তন ও বিশ্লেষণ',

    calendarTitle: 'তামিলনাড়ু ফসলের বর্ষপঞ্জি',
    calendarSubtitle: 'কুরুভাই, সাম্বা, থালাদি এবং নাভারাই চক্রের অফিশিয়াল বর্ষপঞ্জি।',
    kuruvaiSeasonName: 'কুরুভাই মৌসুম (জুন - সেপ্টেম্বর)',
    sambaSeasonName: 'সাম্বা মৌসুম (আগস্ট - জানুয়ারি)',
    thaladiSeasonName: 'থালাদি মৌসুম (অক্টোবর - ফেব্রুয়ারি)',
    navaraiSeasonName: 'নাভারাই মৌসুম (ডিসেম্বর - মার্চ)',
    sowingPeriodLabel: 'বপনের সময়',
    harvestPeriodLabel: 'ফসল কাটার সময়',

    workerProcessTabLabel: 'কৃষি শ্রমিক এবং মজুরি প্রক্রিয়া',
    workerProcessTabTamil: 'শ্রমিক বুকিং ও ব্যবস্থাপনা',
    workerProcessTabDesc: 'কৃষি শ্রমিক বুকিং, দৈনিক মজুরি গণনা এবং কার্যভার বণ্টন',
    wageCalculatorTitle: 'দৈনিক ও চুক্তিভিত্তিক মজুরি ক্যালকুলেটর',
    laborDirectoryTitle: 'যাচাইকৃত কৃষি শ্রমিক দল',
    taskTrackerTitle: 'মাঠের কাজের অগ্রগতি',
    dailyWageEstimateLabel: 'মোট আনুমানিক মজুরি বাজেট',
    bookLaborGangBtn: 'শ্রমিক দল বুক করুন',

    freightTitle: 'স্মার্ট কৃষি পণ্য পরিবহন',
    iotTitle: 'IoT ফিল্ড টেলিমেট্রি',
    schemeTitle: 'ফসল বীমা ও সরকারি অনুদান',
    yieldPredictorTitle: 'ফলন ও লাভ সিমুলেশন',
    b2bTitle: 'কৃষক থেকে ক্রেতা B2C বাজার',
    govSchemesTitle: 'সরকারি প্রকল্প ও ভর্তুকি',

    categories: {
      'crop-advisory': {
        title: 'ফসল ও মাটি পরামর্শ',
        tag: 'মাটি ও জাত',
        desc: 'মাটি উপযুক্ততা ও ফসলের সুপারিশ',
      },
      'smart-irrigation': {
        title: 'স্মার্ট সেচ ব্যবস্থাপনা',
        tag: 'বাঁধ ও পানি',
        desc: 'বাঁধের পানির স্তর ও খালের প্রবাহ',
      },
      'disease-scanner': {
        title: 'রোগ নির্ণয় স্ক্যানার',
        tag: 'AI ক্যামেরা',
        desc: 'পাতার রোগ ও জৈব চিকিৎসা শনাক্তকরণ',
      },
      'seasonal-calendar': {
        title: 'মৌসুমি বর্ষপঞ্জি',
        tag: 'বপন চক্র',
        desc: 'কুরুভাই, সাম্বা ও নাভারাই সূচি',
      },
      'agri-mitra-ai': {
        title: 'এগ্রি-মিত্র AI সহায়ক',
        tag: 'Gemini AI',
        desc: 'স্মার্ট ভয়েস-সক্ষম কৃষি সহকারী',
      },
      'mandi-prices': {
        title: 'মান্ডি ৩০D ট্রেন্ড',
        tag: 'বাজার ট্রেন্ড',
        desc: '৩০ দিনের দামের গ্রাফ ও পূর্বাভাস',
      },
      'smart-freight': {
        title: 'স্মার্ট পণ্য পরিবহন',
        tag: 'লজিস্টিকস',
        desc: 'দূরত্ব গণনা ও ট্রাক বুকিং',
      },
      'iot-telemetry': {
        title: 'IoT ফিল্ড টেলিমেট্রি',
        tag: 'LoRaWAN IoT',
        desc: 'মাটির আর্দ্রতা ও ভালভ নিয়ন্ত্রণ',
      },
      'scheme-finder': {
        title: 'বীমা ও ভর্তুকি',
        tag: 'কৃষি অনুদান',
        desc: 'PMFBY বীমা ও অনুদান তথ্য',
      },
      'yield-predictor': {
        title: 'ফলন ও লাভ ক্যালকুলেটর',
        tag: 'AI মুনাফা',
        desc: 'খরচ বিশ্লেষণ ও সম্ভাব্য লাভ',
      },
      'farm-worker-process': {
        title: 'শ্রমিক ও মজুরি প্রক্রিয়া',
        tag: 'শ্রমিক ব্যবস্থাপনা',
        desc: 'শ্রমিক বুকিং ও দৈনিক মজুরি গণনা',
      },
      'b2b-marketplace': {
        title: 'কৃষক থেকে ক্লায়েন্ট (B2C)',
        tag: 'সরাসরি ক্লায়েন্ট',
        desc: 'কৃষকদের থেকে সরাসরি খুচরা গ্রাহকদের কাছে মধ্যস্বত্বভোগী ছাড়া ফসল বিক্রি',
      },
      'gov-schemes': {
        title: 'সরকারি প্রকল্প নির্দেশিকা',
        tag: 'নির্দেশিকা',
        desc: 'ভর্তুকি ও হেল্পলাইন বিবরণ',
      },
    },
  },
};

const EXTRA_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    agriMitraTitle: 'AI Agri-Mitra Farm Advisory',
    agriMitraSubtitle: 'TNAU & ICAR synchronized agronomy intelligence in English & Tamil',
    askAssistantPlaceholder: 'Ask Agri-Mitra about pests, fertilizers, crop advisory or water schedules...',
    sendButton: 'Send Query',
    b2bMarketplaceTitle: 'Direct Farmer to Client (B2C) Marketplace',
    b2bMarketplaceSubtitle: 'Sell harvests directly to retail clients, households, and consumers with 0% brokerage fee',
    mandiPricesTitle: 'Mandi Market Prices & 30-Day Trends',
    mandiPricesSubtitle: 'Daily APMC & Uzhavar Sandhai rates across 38 Tamil Nadu districts',
    allCategories: 'All Categories',
    govSchemesSubtitle: 'Verified Tamil Nadu and Central agricultural subsidies & financial aid programs',
    iotTelemetryTitle: 'Smart IoT Field Telemetry',
    iotTelemetrySubtitle: 'Live sensor metrics, automated valve triggers, and solar dam level monitoring',
    schemeEligibilityTitle: 'Crop Insurance & Subsidy Eligibility Finder',
    schemeEligibilitySubtitle: 'Smart recommendations based on acreage and crop category',
    seasonalCalendarTitle: 'Seasonal Agronomy Calendar',
    seasonalCalendarSubtitle: 'Sowing, fertilization, and harvesting timeline for Tamil Nadu agro-climatic zones',
    smartFreightTitle: 'Smart Freight & Transport Logistics',
    smartFreightSubtitle: 'Compare truck routes, fuel economics, and real-time cold chain transport for Tamil Nadu mandis',
    yieldPredictorSubtitle: 'Cost estimation, net profit forecast, and ROI simulation',
    farmWorkerProcessTitle: 'Farm Labor & Worker Operations',
    farmWorkerProcessSubtitle: 'Track labor schedules, manage tasks, and calculate fair agricultural wages',
    agroSeasonLabel: 'Agricultural Season',
    waterSourceLabel: 'Primary Water Source',
    farmSizeLabel: 'Land Holding Size (Acres)',
    generatingButton: 'Generating Recommendations...',
    generateButton: 'Generate AI Recommendations',
    suitabilityMatch: 'Suitability Match',
    durationLabel: 'Duration',
    yieldLabel: 'Expected Yield',
    profitLabel: 'Est. Net Profit',
    waterNeedLabel: 'Water Requirement',
    uploadPhotoPrompt: 'Upload Crop Photo',
    analyzingButton: 'Analyzing Leaf Health...',
    diagnoseButton: 'Diagnose Disease',
    listenVoice: 'Listen to Diagnosis',
    exportReport: 'Export PDF Report',
    organicRemediesTitle: 'Organic & Biological Remedies',
    chemicalRemediesTitle: 'Chemical Remedies (TNAU Prescribed)',
  },
  ta: {
    agriMitraTitle: 'அக்ரி-மித்ரா AI வேளாண் ஆலோசகர்',
    agriMitraSubtitle: 'தமிழ்நாடு வேளாண்மை பல்கலைக்கழக ஆலோசனைகள் நேரலையில்',
    askAssistantPlaceholder: 'பூச்சி, உரம், பயிர் ஆலோசனை குறித்து அக்ரி-மித்ராவிடம் கேளுங்கள்...',
    sendButton: 'கேள்வி அனுப்பு',
    b2bMarketplaceTitle: 'நேரடி உழவர் - வாடிக்கையாளர் B2C சந்தை',
    b2bMarketplaceSubtitle: 'இடைத்தரகர் இல்லாமல் நேரடியாக வாடிக்கையாளர்கள் மற்றும் நுகர்வோரிடம் விற்பனை செய்யுங்கள்',
    mandiPricesTitle: 'மண்டி சந்தை விலைகள் மற்றும் 30 நாள் போக்குகள்',
    mandiPricesSubtitle: '38 மாவட்ட ஒழுங்குமுறை விற்பனைக்கூடங்கள் மற்றும் உழவர் சந்தை நேரலை விலைகள்',
    allCategories: 'அனைத்து பிரிவுகள்',
    govSchemesSubtitle: 'உழவன் செயலி மற்றும் மத்திய/மாநில அரசு மானிய திட்டங்கள்',
    iotTelemetryTitle: 'ஸ்மார்ட் IoT கள தொலை அளவியல்',
    iotTelemetrySubtitle: 'மண் ஈரப்பதம், பாசன வால்வு கட்டுப்பாடு மற்றும் சோலார் நீர்மட்டம்',
    schemeEligibilityTitle: 'பயிர் காப்பீடு மற்றும் மானிய தகுதி கண்டறிதல்',
    schemeEligibilitySubtitle: 'நிலப்பரப்பு மற்றும் பயிர் வகை அடிப்படையில் உகந்த அரசு திட்டங்கள்',
    seasonalCalendarTitle: 'பருவக்கால பயிர் சுழற்சி காலண்டர்',
    seasonalCalendarSubtitle: 'விதைப்பு, உரம் மற்றும் அறுவடைக்கான விரிவான கால அட்டவணை',
    smartFreightTitle: 'ஸ்மார்ட் சரக்கு & போக்குவரத்து மேலாண்மை',
    smartFreightSubtitle: 'குறைந்த செலவில் வாடகை வாகனங்கள் மற்றும் குளிர்பதன லாரி முன்பதிவு',
    yieldPredictorSubtitle: 'செலவு மதிப்பீடு, நிகர லாப முன்னறிவிப்பு மற்றும் ROI கணக்கீடு',
    farmWorkerProcessTitle: 'விவசாய தொழிலாளர் மற்றும் கூலி மேலாண்மை',
    farmWorkerProcessSubtitle: 'தொழிலாளர் முன்பதிவு, தினசரி கூலி கணக்கீடு மற்றும் வேலை திட்டமிடல்',
    agroSeasonLabel: 'விவசாய பருவம்',
    waterSourceLabel: 'முதன்மை நீர் ஆதாரம்',
    farmSizeLabel: 'நிலப்பரப்பு (ஏக்கர்)',
    generatingButton: 'பரிந்துரைகள் உருவாக்கப்படுகின்றன...',
    generateButton: 'AI பயிர் பரிந்துரை பெறுக',
    suitabilityMatch: 'பொருத்தமான அளவு',
    durationLabel: 'கால அளவு',
    yieldLabel: 'எதிர்பார்க்கப்படும் மகசூல்',
    profitLabel: 'மதிப்பிடப்பட்ட நிகர லாபம்',
    waterNeedLabel: 'நீர் தேவை',
    uploadPhotoPrompt: 'இலை புகைப்படத்தை பதிவேற்றவும்',
    analyzingButton: 'இலை ஆரோக்கியம் ஆராயப்படுகிறது...',
    diagnoseButton: 'நோய் கண்டறிதல்',
    listenVoice: 'குரல் வழியே கேட்கவும்',
    exportReport: 'PDF அறிக்கை பதிவிறக்குக',
    organicRemediesTitle: 'இயற்கை மற்றும் உயிரியல் தீர்வுகள்',
    chemicalRemediesTitle: 'ரசாயன சிகிச்சை முறைகள்',
  },
  hi: {
    agriMitraTitle: 'एग्री-मित्रा AI कृषि सलाहकार',
    agriMitraSubtitle: 'TNAU और ICAR से प्रमाणित कृषि बुद्धिमत्ता',
    askAssistantPlaceholder: 'कीट, उर्वरक, फसल सलाह या सिंचाई के बारे में पूछें...',
    sendButton: 'भेजें',
    b2bMarketplaceTitle: 'प्रत्यक्ष किसान से ग्राहक (B2C) बाजार',
    b2bMarketplaceSubtitle: 'बिना बिचौलियों के सीधे खुदरा ग्राहकों और परिवारों को बेचें',
    mandiPricesTitle: 'मंडी बाजार भाव और 30-दिवसीय रुझान',
    mandiPricesSubtitle: 'तमिलनाडु के 38 जिलों के दैनिक APMC और उझावर संधाई भाव',
    allCategories: 'सभी श्रेणियां',
    govSchemesSubtitle: 'तमिलनाडु एवं केंद्र सरकार की कृषि सब्सिडी व योजनाएं',
    iotTelemetryTitle: 'स्मार्ट IoT फील्ड टेलीमेट्री',
    iotTelemetrySubtitle: 'लाइव सेंसर डेटा, स्वचालित वाल्व और बांध जल स्तर निगरानी',
    schemeEligibilityTitle: 'फसल बीमा एवं सब्सिडी पात्रता खोजक',
    schemeEligibilitySubtitle: 'भूमि और फसल के आधार पर स्वचालित योजना सिफारिशें',
    seasonalCalendarTitle: 'मौसमी कृषि कैलेंडर',
    seasonalCalendarSubtitle: 'बुवाई, उर्वरक और कटाई की विस्तृत समय सारिणी',
    smartFreightTitle: 'स्मार्ट माल ढुलाई और रसद प्रबंधन',
    smartFreightSubtitle: 'किफायती ट्रक मार्ग और कोल्ड चेन परिवहन बुकिंग',
    yieldPredictorSubtitle: 'लागत अनुमान, शुद्ध लाभ पूर्वानुमान और ROI सिमुलेशन',
    farmWorkerProcessTitle: 'कृषि मजदूर एवं मजदूरी प्रक्रिया',
    farmWorkerProcessSubtitle: 'मजदूर बुकिंग, कार्य ट्रैकिंग और उचित मजदूरी गणना',
    agroSeasonLabel: 'कृषि मौसम',
    waterSourceLabel: 'मुख्य जल स्रोत',
    farmSizeLabel: 'जमीन का आकार (एकड़)',
    generatingButton: 'सिफारिशें तैयार हो रही हैं...',
    generateButton: 'AI फसल सिफारिशें प्राप्त करें',
    suitabilityMatch: 'उपयुक्तता स्कोर',
    durationLabel: 'अवधि',
    yieldLabel: 'अपेक्षित उपज',
    profitLabel: 'अनुमानित शुद्ध लाभ',
    waterNeedLabel: 'पानी की आवश्यकता',
    uploadPhotoPrompt: 'पत्ती का फोटो अपलोड करें',
    analyzingButton: 'पत्ती स्वास्थ्य का विश्लेषण हो रहा है...',
    diagnoseButton: 'रोग निदान करें',
    listenVoice: 'आवाज में सुनें',
    exportReport: 'PDF रिपोर्ट डाउनलोड करें',
    organicRemediesTitle: 'जैविक एवं प्राकृतिक उपचार',
    chemicalRemediesTitle: 'रासायनिक उपचार',
  },
  te: {
    agriMitraTitle: 'అగ్రి-మిత్ర AI వ్యవసాయ సలహాదారు',
    agriMitraSubtitle: 'TNAU ధృవీకరించిన వ్యవసాయ శాస్త్ర మేధస్సు',
    askAssistantPlaceholder: 'తెగుళ్ళు, ఎరువులు, పంట సలహాలు లేదా నీటి షెడ్యూల్ గురించి అడగండి...',
    sendButton: 'పంపండి',
    b2bMarketplaceTitle: 'రైతుల నుండి వినియోగదారులకు (B2C) మార్కెట్',
    b2bMarketplaceSubtitle: 'దళారులు లేకుండా వినియోగదారులకు మరియు కుటుంబాలకు నేరుగా అమ్మండి',
    mandiPricesTitle: 'మార్కెట్ ధరలు మరియు 30 రోజుల ట్రెండ్లు',
    mandiPricesSubtitle: 'తమిళనాడులోని 38 జిల్లాల రోజువారీ మార్కెట్ ధరలు',
    allCategories: 'అన్ని వర్గాలు',
    govSchemesSubtitle: 'తమిళనాడు మరియు కేంద్ర ప్రభుత్వ వ్యవసాయ పథకాలు',
    iotTelemetryTitle: 'స్మార్ట్ IoT ఫీల్డ్ టెలిమెట్రీ',
    iotTelemetrySubtitle: 'లైవ్ సెన్సార్లు, స్వయంచాలక వాల్వ్ మరియు డ్యామ్ నీటి మట్టం',
    schemeEligibilityTitle: 'పంట బీమా మరియు సబ్సిడీ అర్హత శోధన',
    schemeEligibilitySubtitle: 'భూమి మరియు పంట ప్రకారం ప్రభుత్వ పథకాల సిఫార్సులు',
    seasonalCalendarTitle: 'కాలానుగుణ వ్యవసాయ క్యాలెండర్',
    seasonalCalendarSubtitle: 'విత్తడం, ఎరువులు మరియు పంట కోత సమయ పట్టిక',
    smartFreightTitle: 'స్మార్ట్ సరుకు రవాణా & లాజిస్టిక్స్',
    smartFreightSubtitle: 'సరసమైన ట్రక్ బుకింగ్ మరియు కోల్డ్ చైన్ రవాణా',
    yieldPredictorSubtitle: 'ఖర్చు అంచనా, నికర లాభం మరియు ROI గణన',
    farmWorkerProcessTitle: 'వ్యవసాయ కూలీలు మరియు వేతన నిర్వహణ',
    farmWorkerProcessSubtitle: 'కూలీల బుకింగ్, పనుల ట్రాకింగ్ మరియు రోజువారీ వేతన గణన',
    agroSeasonLabel: 'వ్యవసాయ కాలం',
    waterSourceLabel: 'ప్రధాన నీటి వనరు',
    farmSizeLabel: 'భూమి విస్తీర్ణం (ఎకరాలు)',
    generatingButton: 'సిఫార్సులు రూపొందించబడుతున్నాయి...',
    generateButton: 'AI పంట సిఫార్సులు పొందండి',
    suitabilityMatch: 'సరిపోలిక స్కోరు',
    durationLabel: 'వ్యవధి',
    yieldLabel: 'ఆశించిన దిగుబడి',
    profitLabel: 'అంచనా వేసిన నికర లాభం',
    waterNeedLabel: 'నీటి అవసరం',
    uploadPhotoPrompt: 'ఆకు ఫోటో అప్‌లోడ్ చేయండి',
    analyzingButton: 'ఆకు ఆరోగ్యం విశ్లేషించబడుతోంది...',
    diagnoseButton: 'వ్యాధిని గుర్తించండి',
    listenVoice: 'వాయిస్ వినండి',
    exportReport: 'PDF నివేదిక డౌన్‌లోడ్ చేయండి',
    organicRemediesTitle: 'సేంద్రీయ నివారణ చర్యలు',
    chemicalRemediesTitle: 'రసాయన నివారణ చర్యలు',
  },
  bn: {
    agriMitraTitle: 'এগ্রি-মিত্র AI কৃষি উপদেষ্টা',
    agriMitraSubtitle: 'TNAU ও ICAR অনুমোদিত কৃষি বুদ্ধিমত্তা',
    askAssistantPlaceholder: 'কীটপতঙ্গ, সার, ফসলের যত্ন বা সেচ সম্পর্কে জিজ্ঞাসা করুন...',
    sendButton: 'পাঠান',
    b2bMarketplaceTitle: 'সরাসরি কৃষক থেকে গ্রাহক (B2C) বাজার',
    b2bMarketplaceSubtitle: 'দালাল ছাড়াই সরাসরি খুচরা গ্রাহক এবং পরিবারের কাছে ফসল বিক্রি করুন',
    mandiPricesTitle: 'মান্ডি বাজার দর ও ৩০ দিনের ট্রেন্ড',
    mandiPricesSubtitle: 'তামিলনাড়ুর ৩৮টি জেলার দৈনিক পাইকারি বাজার দর',
    allCategories: 'সব বিভাগ',
    govSchemesSubtitle: 'তামিলনাড়ু ও কেন্দ্রীয় সরকারি কৃষি অনুদান ও প্রকল্প',
    iotTelemetryTitle: 'স্মার্ট IoT ফিল্ড টেলিমেট্রি',
    iotTelemetrySubtitle: 'মাটির আর্দ্রতা, স্বয়ংক্রিয় ভালভ ও বাঁধের পানির স্তর',
    schemeEligibilityTitle: 'ফসল বীমা ও ভর্তুকি যোগ্যতা অনুসন্ধান',
    schemeEligibilitySubtitle: 'জমির পরিমাণ ও ফসলের ভিত্তিতে উপযুক্ত সরকারি প্রকল্প',
    seasonalCalendarTitle: 'মৌসুমি কৃষি ক্যালেন্ডার',
    seasonalCalendarSubtitle: 'বপন, সার প্রয়োগ ও ফসল তোলার সময়সূচি',
    smartFreightTitle: 'স্মার্ট পণ্য পরিবহন ও লজিস্টিকস',
    smartFreightSubtitle: 'সাশ্রয়ী মূল্যে ট্রাক বুকিং ও কোল্ড চেইন পরিবহন',
    yieldPredictorSubtitle: 'খরচ হিসাব, সম্ভাব্য নিট লাভ ও মুনাফার হার',
    farmWorkerProcessTitle: 'কৃষি শ্রমিক ও মজুরি ব্যবস্থাপনা',
    farmWorkerProcessSubtitle: 'শ্রমিক বুকিং, কাজের তালিকা ও দৈনিক মজুরি নির্ধারণ',
    agroSeasonLabel: 'কৃষি মৌসুম',
    waterSourceLabel: 'প্রধান পানির উৎস',
    farmSizeLabel: 'জমির পরিমাণ (একর)',
    generatingButton: 'সুপারিশ তৈরি হচ্ছে...',
    generateButton: 'AI ফসলের সুপারিশ পান',
    suitabilityMatch: 'উপযুক্ততার হার',
    durationLabel: 'সময়কাল',
    yieldLabel: 'প্রত্যাশিত ফলন',
    profitLabel: 'আনুমানিক নিট লাভ',
    waterNeedLabel: 'পানির প্রয়োজন',
    uploadPhotoPrompt: 'পাতার ছবি আপলোড করুন',
    analyzingButton: 'পাতার স্বাস্থ্য পরীক্ষা করা হচ্ছে...',
    diagnoseButton: 'রোগ নির্ণয় করুন',
    listenVoice: 'কণ্ঠস্বরে শুনুন',
    exportReport: 'PDF রিপোর্ট ডাউনলোড করুন',
    organicRemediesTitle: 'জৈব ও প্রাকৃতিক প্রতিকার',
    chemicalRemediesTitle: 'রাসায়নিক প্রতিকার',
  },
};

export const getTranslation = (lang?: string | Language): TranslationDictionary => {
  const selectedLang: Language = (lang && lang in TRANSLATIONS) ? (lang as Language) : 'en';
  const base = TRANSLATIONS[selectedLang] || TRANSLATIONS.en;
  const extra = EXTRA_TRANSLATIONS[selectedLang] || EXTRA_TRANSLATIONS.en;
  return {
    ...base,
    ...extra,
  } as TranslationDictionary;
};
