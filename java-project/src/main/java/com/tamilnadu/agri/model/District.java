package com.tamilnadu.agri.model;

import java.io.Serializable;
import java.util.List;

public class District implements Serializable {
    private String id;
    private String nameEn;
    private String nameTa;
    private String zone;
    private List<String> majorSoils;
    private List<String> primaryCrops;
    private double annualRainfallMm;
    private String primaryReservoir;

    public District() {}

    public District(String id, String nameEn, String nameTa, String zone, 
                    List<String> majorSoils, List<String> primaryCrops, 
                    double annualRainfallMm, String primaryReservoir) {
        this.id = id;
        this.nameEn = nameEn;
        this.nameTa = nameTa;
        this.zone = zone;
        this.majorSoils = majorSoils;
        this.primaryCrops = primaryCrops;
        this.annualRainfallMm = annualRainfallMm;
        this.primaryReservoir = primaryReservoir;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getNameTa() { return nameTa; }
    public void setNameTa(String nameTa) { this.nameTa = nameTa; }

    public String getZone() { return zone; }
    public void setZone(String zone) { this.zone = zone; }

    public List<String> getMajorSoils() { return majorSoils; }
    public void setMajorSoils(List<String> majorSoils) { this.majorSoils = majorSoils; }

    public List<String> getPrimaryCrops() { return primaryCrops; }
    public void setPrimaryCrops(List<String> primaryCrops) { this.primaryCrops = primaryCrops; }

    public double getAnnualRainfallMm() { return annualRainfallMm; }
    public void setAnnualRainfallMm(double annualRainfallMm) { this.annualRainfallMm = annualRainfallMm; }

    public String getPrimaryReservoir() { return primaryReservoir; }
    public void setPrimaryReservoir(String primaryReservoir) { this.primaryReservoir = primaryReservoir; }

    @Override
    public String toString() {
        return nameEn + " (" + nameTa + ") - " + zone + " | Rainfall: " + annualRainfallMm + "mm";
    }
}
