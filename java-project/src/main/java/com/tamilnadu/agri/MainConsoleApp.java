package com.tamilnadu.agri;

import com.tamilnadu.agri.model.*;
import com.tamilnadu.agri.service.*;

import java.util.List;
import java.util.Scanner;

/**
 * Standalone runnable console application for Tamil Nadu Smart Agriculture System.
 * Can be compiled and executed directly on any computer with standard Java:
 * 
 * javac com/tamilnadu/agri/MainConsoleApp.java
 * java com.tamilnadu.agri.MainConsoleApp
 */
public class MainConsoleApp {

    public static void main(String[] args) {
        DistrictService districtService = new DistrictService();
        CropAdvisoryService cropService = new CropAdvisoryService();
        MandiPriceService mandiService = new MandiPriceService();
        DiseaseDiagnosisService diseaseService = new DiseaseDiagnosisService();
        GovtSchemeService schemeService = new GovtSchemeService();

        System.out.println("==========================================================================");
        System.out.println("     TAMIL NADU SMART AGRICULTURE DECISION SYSTEM (JAVA EDITION)         ");
        System.out.println("           தமிழ்நாடு உழவன் ஸ்மார்ட் வேளாண்மை வழிகாட்டி                   ");
        System.out.println("==========================================================================");

        List<District> districts = districtService.getAllDistricts();
        System.out.println("\n[1] Available Tamil Nadu Agro-Climatic Districts:");
        for (int i = 0; i < districts.size(); i++) {
            District d = districts.get(i);
            System.out.printf("  %d. %s (%s) - %s | Reservoir: %s%n", 
                (i + 1), d.getNameEn(), d.getNameTa(), d.getZone(), d.getPrimaryReservoir());
        }

        System.out.println("\n[2] Sample AI Crop Recommendation for Thanjavur (Delta Zone, Samba Season):");
        CropAdvisoryRequest sampleReq = new CropAdvisoryRequest("thanjavur", "Clay Loam", "Samba", "Canal / Mettur", 3.5);
        List<CropAdvisoryResponse> recs = cropService.recommendCrops(sampleReq);
        for (CropAdvisoryResponse r : recs) {
            System.out.println("  ------------------------------------------------------------------");
            System.out.printf("  * Crop: %s (%s)%n", r.getCropName(), r.getCropNameTa());
            System.out.printf("    Variety: %s | Match: %d%%%n", r.getRecommendedVariety(), r.getMatchScorePercent());
            System.out.printf("    Yield: %.1f Quintals/Acre | Est. Net Profit: ₹%.2f/Acre%n", 
                r.getExpectedYieldQuintalsPerAcre(), r.getEstimatedNetProfitPerAcre());
            System.out.printf("    NPK Dosage: %s%n", r.getNpkRatioKgPerAcre());
            System.out.println("    Agronomy Advisory:");
            for (String note : r.getAgronomyNotes()) {
                System.out.println("      - " + note);
            }
        }

        System.out.println("\n[3] Real-Time Mandi & Uzhavar Sandhai Prices:");
        List<MandiPrice> prices = mandiService.getLiveMandiPrices("");
        System.out.printf("  %-25s %-15s %-12s %-10s %-8s%n", "Commodity", "Variety", "District", "Modal (₹/kg)", "Trend");
        System.out.println("  ------------------------------------------------------------------------");
        for (MandiPrice p : prices) {
            System.out.printf("  %-25s %-15s %-12s ₹%-9.2f %-8s%n", 
                p.getCommodity(), p.getVariety(), p.getDistrict(), p.getModalPricePerKg(), p.getTrend());
        }

        System.out.println("\n[4] TNAU Pest & Disease Diagnosis Sample (Paddy Leaf Blast):");
        DiseaseDiagnosis diag = diseaseService.diagnoseCropProblem("Paddy", "blast");
        System.out.printf("  Disease: %s (%s)%n", diag.getDiseaseName(), diag.getDiseaseNameTa());
        System.out.printf("  Causal Organism: %s | Severity: %s%n", diag.getCausalOrganism(), diag.getSeverityLevel());
        System.out.println("  Organic Remedy: " + diag.getOrganicRemedies().get(0));
        System.out.println("  Chemical Treatment: " + diag.getChemicalRemedies().get(0));

        System.out.println("\n[5] Verified Tamil Nadu Government Subsidies & Schemes:");
        List<GovtScheme> schemes = schemeService.getAvailableSchemes(2.0, "");
        for (GovtScheme s : schemes) {
            System.out.printf("  * [%s] %s%n", s.getCategory(), s.getTitle());
            System.out.printf("    Subsidy: %s | Portal: %s%n", s.getSubsidyAmount(), s.getApplicationPortal());
        }

        System.out.println("\n==========================================================================");
        System.out.println(" Java application executed successfully.");
        System.out.println("==========================================================================");
    }
}
