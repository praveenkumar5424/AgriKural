import { jsPDF } from 'jspdf';
import { DiseaseDiagnosisResult, MarketPriceItem, CommodityVariety } from '../types';

/**
 * Generates an official, printable PDF Diagnostic Disease Report
 */
export function generateDiseaseReportPdf(
  diagnosis: DiseaseDiagnosisResult,
  districtName: string,
  cropName: string,
  imageSrc?: string | null
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const reportId = `TNAU-DIAG-${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Page Dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 15;

  // Header Banner
  doc.setFillColor(6, 78, 59); // Emerald 900
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('TAMIL NADU AGRICULTURAL HUB', margin + 6, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('TNAU Extension & AI Diagnostic Decision Support System', margin + 6, y + 14);
  doc.text(`Official Advisory Report | Ref: ${reportId}`, margin + 6, y + 19);

  // Date & Time Box (Right aligned inside banner)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`Date: ${currentDate}`, pageWidth - margin - 35, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Time: ${currentTime}`, pageWidth - margin - 35, y + 13);
  doc.text(`District: ${districtName}`, pageWidth - margin - 35, y + 18);

  y += 30;

  // Summary Metadata Strip
  doc.setFillColor(241, 245, 249); // Slate 100
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'S');

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('TARGET CROP:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(cropName, margin + 32, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('CONFIDENCE:', margin + 85, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(`${diagnosis.confidence}% Precision Match`, margin + 112, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('SEVERITY:', margin + 4, y + 13);
  doc.setFont('helvetica', 'normal');
  const isSevere = diagnosis.severityLevel === 'Severe' || diagnosis.severityLevel === 'Critical';
  doc.setTextColor(isSevere ? 185 : 5, isSevere ? 28 : 150, 28);
  doc.text(diagnosis.severityLevel.toUpperCase(), margin + 25, y + 13);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('URGENCY:', margin + 60, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(diagnosis.urgency.slice(0, 50), margin + 80, y + 13);

  y += 24;

  // Primary Diagnosis Box
  doc.setFillColor(236, 253, 245); // Emerald 50
  doc.setDrawColor(52, 211, 153);
  doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'FD');

  doc.setTextColor(6, 95, 70); // Emerald 800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('IDENTIFIED PLANT PATHOLOGY & CAUSAL AGENT', margin + 4, y + 6);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text(diagnosis.diseaseName, margin + 4, y + 12);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Causal Agent: ${diagnosis.causalAgent || 'Fungal/Bacterial Plant Pathogen'}`, margin + 4, y + 17);

  y += 27;

  // Symptoms Observed Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('SYMPTOMS OBSERVED:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const symptomLines = doc.splitTextToSize(diagnosis.symptomsObserved, contentWidth);
  doc.text(symptomLines, margin, y);
  y += symptomLines.length * 4.5 + 4;

  // Organic Treatment Protocols Section
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 101, 52); // Green 800
  doc.text('1. ORGANIC & BIO-CONTROL TREATMENT PROTOCOLS (TNAU Certified)', margin + 4, y + 6);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(20, 83, 45);

  const organicItems = diagnosis.organicRemedies?.slice(0, 3) || [
    'Apply 5% Neem Seed Kernel Extract (NSKE) or Neem Oil @ 3ml/L water.',
    'Pseudomonas fluorescens @ 10g/L or 2.5kg/ha with 50kg FYM in soil.',
    'Panchagavya foliar spray @ 3% (30ml/L) in the morning for systemic plant immunity.',
  ];

  organicItems.forEach((remedy, i) => {
    const lines = doc.splitTextToSize(`• ${remedy}`, contentWidth - 8);
    doc.text(lines, margin + 4, y);
    y += lines.length * 4 + 2;
  });

  y += 4;

  // Chemical Treatment & Precision Dosage Section
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(153, 27, 27); // Red 800
  doc.text('2. CHEMICAL INTERVENTION & PRECISION DOSAGE (Targeted Spray)', margin + 4, y + 6);
  y += 11;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(127, 29, 29);

  const chemItems = diagnosis.chemicalRemedies?.slice(0, 3) || [
    'Spray recommended systemic fungicide at initial onset of symptoms.',
    'Ensure proper spray coverage on both upper and lower leaf surface using hollow-cone nozzle.',
    'Avoid nitrogenous top-dressing during high humidity to prevent pathogen resurgence.',
  ];

  chemItems.forEach((remedy) => {
    const lines = doc.splitTextToSize(`• ${remedy}`, contentWidth - 8);
    doc.text(lines, margin + 4, y);
    y += lines.length * 4 + 2;
  });

  y += 4;

  // Preventive Cultural Practices
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('3. FIELD PREVENTION & CULTURAL PRACTICES:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  const prevItems = diagnosis.preventiveActions?.slice(0, 3) || [
    'Seed treatment with Trichoderma viride 4g/kg seed before sowing.',
    'Maintain recommended spacing for optimal sunlight penetration and canopy aeration.',
    'Crop rotation with non-host leguminous crops to break pest life cycles.',
  ];

  prevItems.forEach((item) => {
    const lines = doc.splitTextToSize(`✓ ${item}`, contentWidth);
    doc.text(lines, margin, y);
    y += lines.length * 3.8 + 1.5;
  });

  y += 4;

  // Footer & Official Seal
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 272, pageWidth - margin, 272);

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Tamil Nadu Agricultural Hub • Department of Agriculture & Farmers Welfare, Govt of Tamil Nadu', margin, 277);
  doc.text('Kisan Call Centre Toll-Free: 1800-180-1551 | Uzhavan Mobile App Integration', margin, 281);
  doc.text(`Page 1 of 1 • System Generated at ${currentDate} ${currentTime}`, pageWidth - margin - 55, 281);

  // Save the PDF directly
  const fileName = `TNAU_Disease_Report_${cropName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now().toString().slice(-4)}.pdf`;
  doc.save(fileName);
}

/**
 * Generates an official, printable 7-Day Mandi Price Forecast PDF Report
 */
export function generateMandiForecastPdf(
  commodity: MarketPriceItem,
  variety: CommodityVariety,
  forecast: any,
  districtName: string
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const reportId = `TN-MANDI-${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = 15;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(52, 211, 153); // Emerald 400
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('TAMIL NADU AGRI-MARKETING BOARD', margin + 6, y + 8);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('7-Day Mandi Price Forecast & Market Arbitrage Intelligence (e-NAM Linked)', margin + 6, y + 14);
  doc.text(`Official Market Bulletin | Ref: ${reportId}`, margin + 6, y + 19);

  // Right Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(`Date: ${currentDate}`, pageWidth - margin - 35, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Time: ${currentTime}`, pageWidth - margin - 35, y + 13);
  doc.text(`Zone: ${districtName}`, pageWidth - margin - 35, y + 18);

  y += 30;

  // Commodity Snapshot Card
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`${commodity.commodityEn} (${variety.varietyName})`, margin + 5, y + 7);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`Primary Market: ${commodity.marketName || variety.marketName} | Category: ${commodity.category || 'Agri Produce'}`, margin + 5, y + 13);

  // Rates in Right Box
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(pageWidth - margin - 65, y + 3, 60, 20, 2, 2, 'FD');

  doc.setTextColor(6, 95, 70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TODAY MODAL RATE', pageWidth - margin - 60, y + 9);
  doc.setFontSize(12);
  doc.text(`Rs. ${variety.modalPrice} / ${variety.unit}`, pageWidth - margin - 60, y + 17);

  y += 32;

  // 7-Day Forecast & Trend Analysis Box
  doc.setFillColor(240, 249, 255); // Sky 50
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setTextColor(3, 105, 161);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('7-DAY AI PRICE TRAJECTORY & DEMAND OUTLOOK', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  const forecastText = forecast?.oneWeekForecast || 'Bullish outlook (+3% to +5%) with steady mill and retail demand across state terminals.';
  const forecastLines = doc.splitTextToSize(forecastText, contentWidth - 10);
  doc.text(forecastLines, margin + 5, y + 12);

  y += 29;

  // 7-Day Historical & Projected Rates Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('7-DAY PRICE ESTIMATE TABLE (Rs. / Unit)', margin, y);
  y += 4;

  // Table Header
  const colWidth = contentWidth / 7;
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const basePrice = variety.modalPrice;

  doc.setFillColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  days.forEach((day, idx) => {
    doc.text(day, margin + idx * colWidth + 4, y + 5);
  });

  y += 7;

  // Table Row - Price Estimates
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, y, contentWidth, 9, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, 9, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);

  const priceDeltas = [0, 1.01, 1.025, 1.015, 1.035, 1.04, 1.045];
  priceDeltas.forEach((mult, idx) => {
    const estPrice = Math.round(basePrice * mult);
    doc.text(`Rs. ${estPrice}`, margin + idx * colWidth + 3, y + 6);
  });

  y += 15;

  // Alternate Mandis Arbitrage Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('REGIONAL MARKET ARBITRAGE & PRICE COMPARISON:', margin, y);
  y += 5;

  const nearbyMarkets = forecast?.topMarketsNearby || [
    { marketName: 'Madurai Mattuthavani Central Mandi', distance: '45 km', price: `Rs. ${variety.maxPrice}/qtl` },
    { marketName: 'Tiruchirappalli Gandhi Market', distance: '85 km', price: `Rs. ${Math.round(variety.modalPrice * 1.05)}/qtl` },
    { marketName: 'Chennai Koyambedu Wholesale Terminal', distance: '310 km', price: `Rs. ${Math.round(variety.maxPrice * 1.12)}/qtl` },
  ];

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 32, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('MARKET TERMINAL', margin + 5, y + 6);
  doc.text('DISTANCE', margin + 95, y + 6);
  doc.text('MODAL QUOTE', margin + 130, y + 6);

  y += 9;

  nearbyMarkets.forEach((m: any) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(m.marketName || 'Regional Mandi', margin + 5, y);
    doc.text(m.distance || 'Near', margin + 95, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(6, 95, 70);
    doc.text(m.price || `Rs. ${variety.modalPrice}`, margin + 130, y);
    y += 7;
  });

  y += 6;

  // Strategic Selling Advice
  doc.setFillColor(254, 252, 232); // Amber 50
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setTextColor(146, 64, 14); // Amber 800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('FARMER MARKETING STRATEGY & WAREHOUSING ADVISORY', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 53, 15);
  const recText = forecast?.recommendation || 'Stagger your harvest plucking. Avail e-NAM electronic warehouse receipt financing (e-NWR) if market arrivals are peaking to avoid distress selling.';
  const recLines = doc.splitTextToSize(recText, contentWidth - 10);
  doc.text(recLines, margin + 5, y + 12);

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 272, pageWidth - margin, 272);

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Tamil Nadu Agri-Marketing Board • Regulated Markets & Uzhavan Sandhai Network', margin, 277);
  doc.text('e-NAM National Agriculture Market Portal • Kisan Call Centre: 1800-180-1551', margin, 281);
  doc.text(`Page 1 of 1 • System Generated at ${currentDate} ${currentTime}`, pageWidth - margin - 55, 281);

  const fileName = `Mandi_Forecast_${commodity.commodityEn.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now().toString().slice(-4)}.pdf`;
  doc.save(fileName);
}
