package com.tamilnadu.agri.model;

import java.io.Serializable;

public class MandiPrice implements Serializable {
    private String commodity;
    private String variety;
    private String district;
    private String marketName;
    private double minPricePerKg;
    private double maxPricePerKg;
    private double modalPricePerKg;
    private double priceChangePercent;
    private String arrivalVolumeTonnes;
    private String trend; // "UP", "DOWN", "STABLE"

    public MandiPrice() {}

    public MandiPrice(String commodity, String variety, String district, String marketName, 
                      double minPricePerKg, double maxPricePerKg, double modalPricePerKg, 
                      double priceChangePercent, String arrivalVolumeTonnes, String trend) {
        this.commodity = commodity;
        this.variety = variety;
        this.district = district;
        this.marketName = marketName;
        this.minPricePerKg = minPricePerKg;
        this.maxPricePerKg = maxPricePerKg;
        this.modalPricePerKg = modalPricePerKg;
        this.priceChangePercent = priceChangePercent;
        this.arrivalVolumeTonnes = arrivalVolumeTonnes;
        this.trend = trend;
    }

    public String getCommodity() { return commodity; }
    public void setCommodity(String commodity) { this.commodity = commodity; }

    public String getVariety() { return variety; }
    public void setVariety(String variety) { this.variety = variety; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getMarketName() { return marketName; }
    public void setMarketName(String marketName) { this.marketName = marketName; }

    public double getMinPricePerKg() { return minPricePerKg; }
    public void setMinPricePerKg(double minPricePerKg) { this.minPricePerKg = minPricePerKg; }

    public double getMaxPricePerKg() { return maxPricePerKg; }
    public void setMaxPricePerKg(double maxPricePerKg) { this.maxPricePerKg = maxPricePerKg; }

    public double getModalPricePerKg() { return modalPricePerKg; }
    public void setModalPricePerKg(double modalPricePerKg) { this.modalPricePerKg = modalPricePerKg; }

    public double getPriceChangePercent() { return priceChangePercent; }
    public void setPriceChangePercent(double priceChangePercent) { this.priceChangePercent = priceChangePercent; }

    public String getArrivalVolumeTonnes() { return arrivalVolumeTonnes; }
    public void setArrivalVolumeTonnes(String arrivalVolumeTonnes) { this.arrivalVolumeTonnes = arrivalVolumeTonnes; }

    public String getTrend() { return trend; }
    public void setTrend(String trend) { this.trend = trend; }
}
