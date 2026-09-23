# AgriKural (தமிழ்நாடு வேளாண் மையம்)

An AI-driven agricultural decision support platform and Farmer-to-Client (B2C) agro marketplace empowering farmers across all 38 districts of Tamil Nadu. The platform provides localized crop advisories, soil analysis, agromet weather forecasts, mandi prices, AI plant disease diagnostics, smart irrigation scheduling, Uzhavan government schemes, and direct farm-to-doorstep trade with zero intermediary broker fees.

---

## 🌾 Core Modules & Features

1. **Crop Advisory & Soil Analysis (பயிர் ஆலோசனை)**
   - District-tailored recommendations across Cauvery Delta, Western, Southern, High Rainfall, and North-Eastern agro-climatic zones.
   - Soil nitrogen (N), phosphorus (P), potassium (K), pH, and salinity insights.

2. **Smart Irrigation & Cauvery Water Management (நுண்ணீர் பாசனம்)**
   - Real-time Mettur Dam (Stanley Reservoir), Bhavanisagar, and Vaigai reservoir water storage monitoring.
   - Drip irrigation run-time calculators based on evapotranspiration (ET₀) and soil moisture.

3. **AI Plant Disease Scanner (பயிர் நோய் கண்டறிதல்)**
   - Computer-vision enabled leaf diagnostic tool powered by Gemini AI with actionable organic & chemical treatment remedies.

4. **Seasonal Weather & Agromet Forecast (வானிலை & பயிர் கால அட்டவணை)**
   - 7-day microclimate forecasts, monsoon tracking (South-West & North-East monsoons), and pest outbreak alerts.

5. **AgriMitra Voice & AI Agronomist (உழவன் குரல் உதவி & AI உரையாடல்)**
   - Multilingual voice-driven assistant (Tamil & English) for hands-free queries on field management, subsidies, and pest control.

6. **Mandi Market Prices & Procurement (உழவர் சந்தை விலை நிலவரம்)**
   - Live APMC and Uzhavan Sandhai crop prices across major Tamil Nadu markets with 7-day price trend analysis.

7. **Smart IoT Field Telemetry (மண் & பண்ணை சென்சார்கள்)**
   - LoRaWAN and solar-powered sensor telemetry tracking soil moisture, temperature, electrical conductivity, and leaf wetness.

8. **Government Schemes & Subsidies (அரசு மானியங்கள் & உதவிகள்)**
   - Automated eligibility verification for PM-KISAN, PM Fasal Bima Yojana (PMFBY), Micro Irrigation Subsidies, and TNAU grant schemes.

9. **AI Yield & Profit Forecaster (மகசூல் & லாப கணிப்பாளர்)**
   - Financial return simulations considering input costs (seeds, fertilizer, labor, irrigation) and anticipated harvest market prices.

10. **Farmer to Client B2C Direct Marketplace (உழவர் - வாடிக்கையாளர் நேரடி சந்தை)**
    - Direct farm-to-consumer listings with transparent farm-gate pricing, district delivery options, and contact connectivity.

11. **Farmer Profile & Google Mail ID Authentication (உழவர் கூகிள் கணக்கு)**
    - Secure member accounts linked to Tamil Nadu farm profiles, land holding details, crop registry, and personalized notifications.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite, Framer Motion, Lucide React
- **Backend / Server**: Node.js, Express, tsx
- **AI & Vision**: `@google/genai` (Gemini Flash model for fast diagnostics, multilingual Tamil/English translation, and audio voice assistance)
- **Data**: Curated Tamil Nadu Agro Database covering all 38 districts with soil, rainfall, and mandi metrics

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/praveenkumar5424/Tamil-Nadu-Agricultural-Hub.git
cd Tamil-Nadu-Agricultural-Hub

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Fill in GEMINI_API_KEY if using live Gemini AI capabilities
```

### Development
```bash
# Start the full-stack dev server (Vite + Express backend on port 3000)
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

---

## 📄 License
MIT License
