package com.tamilnadu.agri.model;

import java.io.Serializable;
import java.util.List;

public class DiseaseDiagnosis implements Serializable {
    private String cropName;
    private String diseaseName;
    private String diseaseNameTa;
    private String causalOrganism;
    private double confidencePercent;
    private String severityLevel; // Low, Moderate, High, Critical
    private List<String> symptoms;
    private List<String> organicRemedies;
    private List<String> chemicalRemedies;

    public DiseaseDiagnosis() {}

    public DiseaseDiagnosis(String cropName, String diseaseName, String diseaseNameTa, 
                            String causalOrganism, double confidencePercent, String severityLevel, 
                            List<String> symptoms, List<String> organicRemedies, List<String> chemicalRemedies) {
        this.cropName = cropName;
        this.diseaseName = diseaseName;
        this.diseaseNameTa = diseaseNameTa;
        this.causalOrganism = causalOrganism;
        this.confidencePercent = confidencePercent;
        this.severityLevel = severityLevel;
        this.symptoms = symptoms;
        this.organicRemedies = organicRemedies;
        this.chemicalRemedies = chemicalRemedies;
    }

    public String getCropName() { return cropName; }
    public void setCropName(String cropName) { this.cropName = cropName; }

    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }

    public String getDiseaseNameTa() { return diseaseNameTa; }
    public void setDiseaseNameTa(String diseaseNameTa) { this.diseaseNameTa = diseaseNameTa; }

    public String getCausalOrganism() { return causalOrganism; }
    public void setCausalOrganism(String causalOrganism) { this.causalOrganism = causalOrganism; }

    public double getConfidencePercent() { return confidencePercent; }
    public void setConfidencePercent(double confidencePercent) { this.confidencePercent = confidencePercent; }

    public String getSeverityLevel() { return severityLevel; }
    public void setSeverityLevel(String severityLevel) { this.severityLevel = severityLevel; }

    public List<String> getSymptoms() { return symptoms; }
    public void setSymptoms(List<String> symptoms) { this.symptoms = symptoms; }

    public List<String> getOrganicRemedies() { return organicRemedies; }
    public void setOrganicRemedies(List<String> organicRemedies) { this.organicRemedies = organicRemedies; }

    public List<String> getChemicalRemedies() { return chemicalRemedies; }
    public void setChemicalRemedies(List<String> chemicalRemedies) { this.chemicalRemedies = chemicalRemedies; }
}
