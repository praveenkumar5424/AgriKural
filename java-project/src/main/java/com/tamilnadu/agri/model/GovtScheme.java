package com.tamilnadu.agri.model;

import java.io.Serializable;
import java.util.List;

public class GovtScheme implements Serializable {
    private String id;
    private String title;
    private String titleTa;
    private String category;
    private String subsidyAmount;
    private String eligibleAcreageLimit;
    private String applicationPortal;
    private List<String> requiredDocuments;

    public GovtScheme() {}

    public GovtScheme(String id, String title, String titleTa, String category, 
                      String subsidyAmount, String eligibleAcreageLimit, 
                      String applicationPortal, List<String> requiredDocuments) {
        this.id = id;
        this.title = title;
        this.titleTa = titleTa;
        this.category = category;
        this.subsidyAmount = subsidyAmount;
        this.eligibleAcreageLimit = eligibleAcreageLimit;
        this.applicationPortal = applicationPortal;
        this.requiredDocuments = requiredDocuments;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getTitleTa() { return titleTa; }
    public void setTitleTa(String titleTa) { this.titleTa = titleTa; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubsidyAmount() { return subsidyAmount; }
    public void setSubsidyAmount(String subsidyAmount) { this.subsidyAmount = subsidyAmount; }

    public String getEligibleAcreageLimit() { return eligibleAcreageLimit; }
    public void setEligibleAcreageLimit(String eligibleAcreageLimit) { this.eligibleAcreageLimit = eligibleAcreageLimit; }

    public String getApplicationPortal() { return applicationPortal; }
    public void setApplicationPortal(String applicationPortal) { this.applicationPortal = applicationPortal; }

    public List<String> getRequiredDocuments() { return requiredDocuments; }
    public void setRequiredDocuments(List<String> requiredDocuments) { this.requiredDocuments = requiredDocuments; }
}
