package com.tamilnadu.agri.model;

import java.io.Serializable;
import java.util.List;

public class CropAdvisoryResponse implements Serializable {
    private String cropName;
    private String cropNameTa;
    private String recommendedVariety;
    private int matchScorePercent;
    private int durationDays;
    private double expectedYieldQuintalsPerAcre;
    private double estimatedNetProfitPerAcre;
    private String waterNeed;
    private String npkRatioKgPerAcre;
    private List<String> agronomyNotes;

    public CropAdvisoryResponse() {}

    public CropAdvisoryResponse(String cropName, String cropNameTa, String recommendedVariety, 
                                int matchScorePercent, int durationDays, 
                                double expectedYieldQuintalsPerAcre, double estimatedNetProfitPerAcre, 
                                String waterNeed, String npkRatioKgPerAcre, List<String> agronomyNotes) {
        this.cropName = cropName;
        this.cropNameTa = cropNameTa;
        this.recommendedVariety = recommendedVariety;
        this.matchScorePercent = matchScorePercent;
        this.durationDays = durationDays;
        this.expectedYieldQuintalsPerAcre = expectedYieldQuintalsPerAcre;
        this.estimatedNetProfitPerAcre = estimatedNetProfitPerAcre;
        this.waterNeed = waterNeed;
        this.npkRatioKgPerAcre = npkRatioKgPerAcre;
        this.agronomyNotes = agronomyNotes;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getCropNameTa() { return cropNameTa; }
    public void setCropNameTa(String cropNameTa) { this.cropNameTa = cropNameTa; }

    public String getRecommendedVariety() { return recommendedVariety; }
    public void setRecommendedVariety(String recommendedVariety) { this.recommendedVariety = recommendedVariety; }

    public int getMatchScorePercent() { return matchScorePercent; }
    public void setMatchScorePercent(int matchScorePercent) { this.matchScorePercent = matchScorePercent; }

    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }

    public double getExpectedYieldQuintalsPerAcre() { return expectedYieldQuintalsPerAcre; }
    public void setExpectedYieldQuintalsPerAcre(double expectedYieldQuintalsPerAcre) { this.expectedYieldQuintalsPerAcre = expectedYieldQuintalsPerAcre; }

    public double getEstimatedNetProfitPerAcre() { return estimatedNetProfitPerAcre; }
    public void setEstimatedNetProfitPerAcre(double estimatedNetProfitPerAcre) { this.estimatedNetProfitPerAcre = estimatedNetProfitPerAcre; }

    public String getWaterNeed() { return waterNeed; }
    public void setWaterNeed(String waterNeed) { this.waterNeed = waterNeed; }

    public String getNpkRatioKgPerAcre() { return npkRatioKgPerAcre; }
    public void setNpkRatioKgPerAcre(String npkRatioKgPerAcre) { this.npkRatioKgPerAcre = npkRatioKgPerAcre; }

    public List<String> getAgronomyNotes() { return agronomyNotes; }
    public void setAgronomyNotes(List<String> agronomyNotes) { this.agronomyNotes = agronomyNotes; }
}
