package com.tamilnadu.agri.service;

import com.tamilnadu.agri.model.DiseaseDiagnosis;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class DiseaseDiagnosisService {

    public DiseaseDiagnosis diagnoseCropProblem(String cropName, String observedSymptoms) {
        String crop = (cropName != null) ? cropName.toLowerCase() : "paddy";
        String symptoms = (observedSymptoms != null) ? observedSymptoms.toLowerCase() : "";

        if (crop.contains("rice") || crop.contains("paddy")) {
            if (symptoms.contains("brown") || symptoms.contains("spot") || symptoms.contains("oval")) {
                return new DiseaseDiagnosis(
                    "Paddy (Oryza sativa)",
                    "Brown Spot Disease",
                    "நெல் பழுப்பு புள்ளி நோய்",
                    "Helminthosporium oryzae (Bipolaris oryzae)",
                    94.5,
                    "Moderate",
                    Arrays.asList(
                        "Dark brown to reddish oval spots with grey centre on leaf blades.",
                        "Severe infection causes seedling blight and unfilled chaffy grains.",
                        "Prevalent in soils deficient in potash and organic matter."
                    ),
                    Arrays.asList(
                        "Foliar spray of Panchagavya 3% or Neem oil 3% at early stage.",
                        "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed.",
                        "Apply balanced potash fertilizer (MOP) to enhance cellular wall resistance."
                    ),
                    Arrays.asList(
                        "TNAU recommendation: Spray Mancozeb 75 WP @ 1000g/ha (2g/litre).",
                        "Alternatively spray Carbendazim + Mancozeb (Saaf) @ 2g/litre of water.",
                        "Repeat spray after 12-15 days during cloudy weather."
                    )
                );
            } else {
                return new DiseaseDiagnosis(
                    "Paddy (Oryza sativa)",
                    "Blast Disease (Leaf & Neck Blast)",
                    "நெல் குலை நோய்",
                    "Magnaporthe oryzae (Pyricularia oryzae)",
                    96.0,
                    "High",
                    Arrays.asList(
                        "Spindle-shaped elliptical lesions with greyish ash centre and brownish margin.",
                        "Black neck lesions causing drooping and broken panicles (Neck blast).",
                        "Rapid spread during high humidity (>90%) and cool night temperatures (20-22°C)."
                    ),
                    Arrays.asList(
                        "Spray Pseudomonas fluorescens @ 2.5 kg/ha in 500 litres water.",
                        "Avoid excess nitrogenous urea application in single split."
                    ),
                    Arrays.asList(
                        "Tricyclazole 75% WP @ 1g/litre or Isoprothiolane 40% EC @ 1.5ml/litre.",
                        "Spray at early tillering and panicle emergence stages."
                    )
                );
            }
        } else if (crop.contains("banana")) {
            return new DiseaseDiagnosis(
                "Banana (Musa paradisiaca)",
                "Sigatoka Leaf Spot",
                "வாழை சிகடோகா இலைப்புள்ளி நோய்",
                "Pseudocercospora musae",
                91.0,
                "Moderate",
                Arrays.asList(
                    "Linear spindle-shaped reddish-brown streaks parallel to leaf veins.",
                    "Premature drying and defoliation of leaves resulting in smaller bunches."
                ),
                Arrays.asList(
                    "Cut and burn severely infected lower dried leaves to reduce inoculum.",
                    "Spray mineral oil @ 1% or copper oxychloride formulation."
                ),
                Arrays.asList(
                    "Propiconazole 25 EC @ 1 ml/litre with sticker/spreader agent (Teepol 1ml/l).",
                    "Repeat at 25-30 day intervals during monsoon months."
                )
            );
        }

        // Generic fallback diagnosis
        return new DiseaseDiagnosis(
            cropName,
            "Early Blight / Foliar Leaf Spot",
            "இலைக்கருகல் மற்றும் புள்ளி நோய்",
            "Alternaria spp.",
            88.0,
            "Moderate",
            Arrays.asList(
                "Concentric dark brown circular rings with target-board appearance on older leaves.",
                "Marginal leaf yellowing leading to early defoliation."
            ),
            Arrays.asList(
                "Soil application of Trichoderma viride enriched with Farmyard Manure.",
                "Spray 5% Neem Seed Kernel Extract (NSKE) early morning."
            ),
            Arrays.asList(
                "Spray Chlorothalonil 75 WP @ 2g/litre or Azoxystrobin 23 SC @ 1 ml/litre water."
            )
        );
    }
}
