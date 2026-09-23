package com.tamilnadu.agri.service;

import com.tamilnadu.agri.model.District;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DistrictService {
    private final Map<String, District> districtMap = new LinkedHashMap<>();

    public DistrictService() {
        initDistricts();
    }

    private void initDistricts() {
        addDistrict("thanjavur", "Thanjavur", "தஞ்சாவூர்", "Cauvery Delta Zone", 
            Arrays.asList("Clay Loam", "Alluvial", "Deep Black"), 
            Arrays.asList("Paddy (CR 1009, CO 51, ADT 43)", "Blackgram", "Sugarcane", "Banana"), 
            1065.0, "Mettur Dam / Kallanai");

        addDistrict("coimbatore", "Coimbatore", "கோயம்புத்தூர்", "Western Zone", 
            Arrays.asList("Red Sandy Loam", "Black Soil", "Laterite"), 
            Arrays.asList("Cotton", "Maize (COH(M) 8)", "Groundnut", "Turmeric"), 
            680.0, "Bhavanisagar / Aliyar");

        addDistrict("madurai", "Madurai", "மதுரை", "Southern Zone", 
            Arrays.asList("Red Soil", "Clay Loam", "Alluvial"), 
            Arrays.asList("Jasmine (Malligai)", "Paddy (ADT 45)", "Sorghum", "Banana"), 
            840.0, "Vaigai Dam");

        addDistrict("salem", "Salem", "சேலம்", "North Western Zone", 
            Arrays.asList("Red Gravelly Loam", "Black Soil"), 
            Arrays.asList("Tapioca / Cassava", "Turmeric", "Mango (Salem Gundu)", "Ragi"), 
            870.0, "Mettur Stanley Reservoir");

        addDistrict("tiruchirappalli", "Tiruchirappalli", "திருச்சிராப்பள்ளி", "Cauvery Delta Zone", 
            Arrays.asList("Alluvial", "Red Sandy", "Black Soil"), 
            Arrays.asList("Paddy", "Banana (Robusta, Poovan)", "Sugarcane", "Onion"), 
            818.0, "Kallanai / Upper Anaicut");

        addDistrict("tirunelveli", "Tirunelveli", "திருநெல்வேலி", "Southern Zone", 
            Arrays.asList("Deep Black Cotton", "Red Loam"), 
            Arrays.asList("Paddy (Ambasamudram ASD varieties)", "Banana", "Pulses", "Chillies"), 
            814.0, "Manimuthar / Papanasam");

        addDistrict("kanchipuram", "Kanchipuram", "காஞ்சிபுரம்", "North Eastern Zone", 
            Arrays.asList("Sandy Clay Loam", "Red Soil"), 
            Arrays.asList("Paddy (BPT 5204)", "Groundnut", "Watermelon", "Vegetables"), 
            1210.0, "Palar River Sub-basin");

        addDistrict("erode", "Erode", "ஈரோடு", "Western Zone", 
            Arrays.asList("Red Loam", "Black Cotton Soil"), 
            Arrays.asList("Turmeric (Erode Local)", "Sugarcane", "Paddy", "Maize"), 
            700.0, "Bhavanisagar Reservoir");
    }

    private void addDistrict(String id, String nameEn, String nameTa, String zone, 
                             List<String> soils, List<String> crops, double rainfall, String reservoir) {
        District d = new District(id, nameEn, nameTa, zone, soils, crops, rainfall, reservoir);
        districtMap.put(id, d);
    }

    public List<District> getAllDistricts() {
        return new ArrayList<>(districtMap.values());
    }

    public Optional<District> getDistrictById(String id) {
        return Optional.ofNullable(districtMap.get(id.toLowerCase()));
    }
}
