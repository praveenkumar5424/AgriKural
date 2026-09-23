package com.tamilnadu.agri.model;

import java.io.Serializable;
import java.util.List;

public class CropAdvisoryRequest implements Serializable {
    private String districtId;
    private String soilType;
    private String season; // Kuruvai, Samba, Thaladi, Navarai, Kodai
    private String waterSource; // Canal / River, Open Well, Borewell, Rainfed
    private double landAreaAcres;

    public CropAdvisoryRequest() {}

    public CropAdvisoryRequest(String districtId, String soilType, String season, String waterSource, double landAreaAcres) {
        this.districtId = districtId;
        this.soilType = soilType;
        this.season = season;
        this.waterSource = waterSource;
        this.landAreaAcres = landAreaAcres;
    }

    public String getDistrictId() { return districtId; }
    public void setDistrictId(String districtId) { this.districtId = districtId; }

    public String getSoilType() { return soilType; }
    public void setSoilType(String soilType) { this.soilType = soilType; }

    public String getSeason() { return season; }
    public void setSeason(String season) { this.season = season; }

    public String getWaterSource() { return waterSource; }
    public void setWaterSource(String waterSource) { this.waterSource = waterSource; }

    public double getLandAreaAcres() { return landAreaAcres; }
    public void setLandAreaAcres(double landAreaAcres) { this.landAreaAcres = landAreaAcres; }
}
