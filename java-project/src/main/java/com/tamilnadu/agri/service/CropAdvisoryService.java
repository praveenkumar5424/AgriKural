package com.tamilnadu.agri.service;

import com.tamilnadu.agri.model.CropAdvisoryRequest;
import com.tamilnadu.agri.model.CropAdvisoryResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CropAdvisoryService {

    public List<CropAdvisoryResponse> recommendCrops(CropAdvisoryRequest request) {
        List<CropAdvisoryResponse> recommendations = new ArrayList<>();
        String season = request.getSeason() != null ? request.getSeason().toLowerCase() : "samba";
        String soil = request.getSoilType() != null ? request.getSoilType().toLowerCase() : "clay";

        // Recommendation 1: Paddy (Samba / Kuruvai special)
        if (season.contains("samba") || soil.contains("clay") || soil.contains("alluvial")) {
            recommendations.add(new CropAdvisoryResponse(
                "Samba Paddy (Traditional & Hybrid)",
                "சம்பா நெல் சாகுபடி (பொன்னி / ஆடுதுறை)",
                "ADT 53 / CR 1009 Sub-1 / TKM 13 / BPT 5204",
                96,
                135,
                26.5,
                48500.0,
                "1200 - 1400 mm (Submerged field)",
                "120:50:50 N:P2O5:K2O kg/ha + Azospirillum biofertilizer",
                Arrays.asList(
                    "TNAU Certified seed rate: 12-15 kg/acre for SRI planting.",
                    "Spray Pseudomonas fluorescens 10g/lit at 45th and 65th DAT against blast disease.",
                    "Alternate Wetting and Drying (AWD) saves 30% canal water."
                )
            ));
        }

        // Recommendation 2: Pulses / Blackgram
        recommendations.add(new CropAdvisoryResponse(
            "Blackgram (Rice Fallow / Summer)",
            "உளுந்து (வம்பன் ரகங்கள்)",
            "Vamban 8 / Vamban 11 (Resistant to Yellow Mosaic Virus)",
            91,
            70,
            4.8,
            34200.0,
            "250 - 300 mm (Low water)",
            "25:50:25 N:P2O5:K2O kg/ha + Rhizobium seed inoculation",
            Arrays.asList(
                "Ideal as rice fallow crop broadcasted 7-10 days before paddy harvest in waxy soil moisture.",
                "Foliar spray with 2% DAP at flowering stage increases pod filling by 22%.",
                "Fixes 40 kg atmospheric nitrogen per hectare into the soil."
            )
        ));

        // Recommendation 3: Groundnut / Oilseeds
        recommendations.add(new CropAdvisoryResponse(
            "Groundnut (Spreading & Semi-spreading)",
            "மணிலா பயிர் / நிலக்கடலை (தாராபுரம் / விருதாச்சலம் ரகங்கள்)",
            "VRI 8 / TMV 13 / Kadiri 6",
            87,
            105,
            11.2,
            41800.0,
            "450 - 500 mm (Critical at pegging stage)",
            "17:34:54 N:P2O5:K2O kg/ha + 200 kg Gypsum at 45 DAS",
            Arrays.asList(
                "Gypsum application at 45th day is mandatory for uniform pod filling and high oil content.",
                "TNAU micronutrient mixture 5 kg/acre mixed with 20 kg FYM improves pod weight.",
                "Pheromone traps @ 5/acre for Spodoptera litura control."
            )
        ));

        // Recommendation 4: Horticultural cash crop (Shallots)
        recommendations.add(new CropAdvisoryResponse(
            "Small Onion / Shallots",
            "சின்ன வெங்காயம் (பெரம்பலூர் / தாராபுரம் நாட்டு ரகம்)",
            "Co (On) 5 / Arka Ujjwal",
            89,
            85,
            65.0,
            72000.0,
            "Drip fertigation 400 mm",
            "60:60:30 N:P2O5:K2O kg/ha through drip fertigation",
            Arrays.asList(
                "Bulb treatment with Trichoderma viride 4g/kg seed bulb prevents basal rot.",
                "Drip irrigation saves 45% water and delivers uniform bulb size fetching premium mandi price."
            )
        ));

        return recommendations;
    }
}
