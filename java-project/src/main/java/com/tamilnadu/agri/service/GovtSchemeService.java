package com.tamilnadu.agri.service;

import com.tamilnadu.agri.model.GovtScheme;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class GovtSchemeService {

    public List<GovtScheme> getAvailableSchemes(double acreageAcres, String categoryFilter) {
        List<GovtScheme> schemes = new ArrayList<>();

        schemes.add(new GovtScheme(
            "PMFBY-TN",
            "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
            "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம்",
            "Crop Insurance",
            "Up to 100% loss compensation against flood, drought, or cyclone",
            "All farmers (Loanee & Non-loanee, Small/Marginal/Large)",
            "Uzhavan App / TN Agriculture Portal / Common Service Centre (CSC)",
            Arrays.asList("Aadhaar Card", "Land Chitta / Adangal copy", "Bank Passbook with IFSC", "Sowing Certificate issued by VAO")
        ));

        schemes.add(new GovtScheme(
            "TN-MICRO-IRR",
            "PMKSY Micro-Irrigation Drip & Sprinkler Scheme",
            "பிரதம மந்திரி நுண்ணீர்ப் பாசனத் திட்டம் (100% மானியம்)",
            "Irrigation Subsidy",
            "100% Subsidy for Small & Marginal farmers (<5 acres); 75% for Other farmers",
            "Up to 5 Acres for full 100% subsidy",
            "tnhorticulture.tn.gov.in / Assistant Director of Horticulture (ADH)",
            Arrays.asList("Aadhaar", "Small/Marginal Farmer Certificate from Tahsildar", "Field sketch (FMB)", "Soil & Water testing report")
        ));

        schemes.add(new GovtScheme(
            "TN-FARM-MECH",
            "Sub-Mission on Agricultural Mechanization (SMAM)",
            "வேளாண் இயந்திரமயமாக்கல் இயக்கம்",
            "Machinery Grant",
            "50% subsidy up to ₹1,50,000 for Power Tillers, Paddy Transplanters, Brush Cutters",
            "Individual Farmers, Custom Hiring Centres, FPOs",
            "aed.tn.gov.in / Uzhavan App",
            Arrays.asList("Aadhaar Card", "Quotation from authorized dealer", "Land ownership proof", "Bank account verification")
        ));

        schemes.add(new GovtScheme(
            "PM-KISAN",
            "PM-KISAN Samman Nidhi & Kalaignarin All-Village Agri Dev Programme",
            "பிரதம மந்திரி கிசான் சம்மான் நிதி & கலைஞரின் ஒருங்கிணைந்த வேளாண் வளர்ச்சி திட்டம்",
            "Direct Income Support",
            "₹6,000 / year direct bank transfer in 3 installments of ₹2,000",
            "Landholding farmer families with cultivable land",
            "pmkisan.gov.in / Uzhavan Mobile App",
            Arrays.asList("Aadhaar linked to Mobile", "Land document (Patta)", "Bank Account with NPCI mapping")
        ));

        return schemes;
    }
}
