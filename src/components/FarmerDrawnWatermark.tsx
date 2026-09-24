import React from 'react';
import farmerOxPlowImg from '../assets/images/farmer_ox_plow_1788000488778.jpg';
import farmerLogoEmblem from '../assets/images/farmer_logo_emblem_1788848539136.jpg';
import damWatermarkImg from '../assets/images/tn_dam_watermark_1788678981545.jpg';
import plantScanningImg from '../assets/images/plant_scanning_watermark_1788679265519.jpg';
import weatherPredictionImg from '../assets/images/weather_prediction_watermark_1788679530601.jpg';
import agriAiQuestionImg from '../assets/images/agri_ai_tamil_english_watermark_1788685480613.jpg';
import mandiMarketPriceImg from '../assets/images/mandi_tamil_english_watermark_1788684490463.jpg';
import iotTelemetryImg from '../assets/images/iot_telemetry_watermark_1788686713309.jpg';
import insuranceSubsidyImg from '../assets/images/insurance_subsidy_watermark_1788686935104.jpg';
import yieldProfitImg from '../assets/images/yield_profit_watermark_1788687309942.jpg';
import farmerToClientB2cImg from '../assets/images/farmer_to_client_b2c_1788701808255.jpg';

interface FarmerDrawnWatermarkProps {
  activeTab?: string;
}

export const FarmerDrawnWatermark: React.FC<FarmerDrawnWatermarkProps> = ({ activeTab }) => {
  const isSmartIrrigation = activeTab === 'smart-irrigation' || activeTab === 'water-reservoirs';
  const isDiseaseScanner = activeTab === 'disease-scanner' || activeTab === 'crop-doctor';
  const isSeasonalCalendar = activeTab === 'seasonal-calendar';
  const isAgriMitraAi = activeTab === 'agri-mitra-ai';
  const isMandiPrices = activeTab === 'mandi-prices' || activeTab === 'mandi-market';
  const isIoTTelemetry = activeTab === 'iot-telemetry';
  const isInsuranceSubsidies = activeTab === 'scheme-finder' || activeTab === 'insurance-subsidies' || activeTab === 'subsidies-insurance';
  const isYieldProfit = activeTab === 'yield-predictor' || activeTab === 'ai-yield-profit';
  const isB2BMarketplace = activeTab === 'b2b-marketplace' || activeTab === 'b2c-marketplace' || activeTab === 'sell-harvest';
  const isFarmerAccount = activeTab === 'farmer-account' || activeTab === 'farmer-login' || activeTab === 'farm-profile';

  return (
    <div
      id="dashboard-page-watermark"
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center select-none overflow-hidden transition-opacity duration-700"
      aria-hidden="true"
    >
      {isSmartIrrigation ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1320px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={damWatermarkImg}
            alt="Tamil Nadu Dam & Stanley Reservoir Watermark"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isDiseaseScanner ? (
        <div className="relative w-[550px] sm:w-[780px] md:w-[980px] lg:w-[1180px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={plantScanningImg}
            alt="Agronomist Scanning Plant Leaf for Crop Diseases"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isSeasonalCalendar ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1300px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={weatherPredictionImg}
            alt="Seasonal Weather Prediction, Monsoon Clouds and Agromet Forecast"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isAgriMitraAi ? (
        <div className="relative w-[580px] sm:w-[800px] md:w-[1020px] lg:w-[1240px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={agriAiQuestionImg}
            alt="Farmer Asking Questions to AI Agronomy Assistant"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isMandiPrices ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1080px] lg:w-[1280px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={mandiMarketPriceImg}
            alt="Farmer Checking Crop Selling Prices in Mandi Market and Shop"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isIoTTelemetry ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1300px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={iotTelemetryImg}
            alt="Smart IoT Field Telemetry, Soil Probes & Solar LoRaWAN Sensors"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isInsuranceSubsidies ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1300px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={insuranceSubsidyImg}
            alt="Crop Insurance and Government Agricultural Subsidies Protection"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isYieldProfit ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1300px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={yieldProfitImg}
            alt="AI Agricultural Crop Yield and Farm Profit Forecasting"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isB2BMarketplace ? (
        <div className="relative w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1300px] max-w-[96vw] opacity-[0.08] transition-all duration-500">
          <img
            src={farmerToClientB2cImg}
            alt="Direct Farmer to Client B2C Farm Produce Sales Watermark"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : isFarmerAccount ? (
        <div className="relative w-[500px] sm:w-[720px] md:w-[940px] lg:w-[1150px] max-w-[94vw] opacity-[0.08] transition-all duration-500">
          <img
            src={farmerLogoEmblem}
            alt="Farmer Silhouette with Rake and Wheat Emblem Watermark"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      ) : (
        <div className="relative w-[500px] sm:w-[680px] md:w-[860px] lg:w-[1020px] max-w-[92vw] opacity-[0.08] transition-opacity duration-300">
          <img
            src={farmerOxPlowImg}
            alt="Traditional Farmer Plowing Field"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-auto object-contain filter grayscale contrast-[140%] brightness-[0.85]"
          />
        </div>
      )}
    </div>
  );
};
