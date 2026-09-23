package com.tamilnadu.agri.service;

import com.tamilnadu.agri.model.MandiPrice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MandiPriceService {

    public List<MandiPrice> getLiveMandiPrices(String districtFilter) {
        List<MandiPrice> prices = new ArrayList<>();

        prices.add(new MandiPrice("Paddy (Deluxe Ponni)", "BPT 5204", "Thanjavur", 
            "Kumbakonam Regulated Market", 24.50, 27.20, 26.00, 2.4, "48.5", "UP"));

        prices.add(new MandiPrice("Small Onion / Shallots", "Perambalur Country", "Perambalur", 
            "Perambalur Uzhavar Sandhai", 42.00, 54.00, 48.00, 5.1, "18.2", "UP"));

        prices.add(new MandiPrice("Turmeric (Finger)", "Erode Bold", "Erode", 
            "Perundurai Agmark Mandi", 132.00, 158.00, 145.00, 3.8, "62.0", "UP"));

        prices.add(new MandiPrice("Banana (Poovan)", "Grade A Cluster", "Tiruchirappalli", 
            "Gandhi Market Tiruchy", 22.00, 28.00, 25.00, -1.2, "35.0", "DOWN"));

        prices.add(new MandiPrice("Groundnut Pods", "VRI 2 Pods", "Villupuram", 
            "Tindivanam Regulated Market", 68.00, 76.00, 72.50, 0.5, "28.4", "STABLE"));

        prices.add(new MandiPrice("Tomato (Country)", "Sivam Hybrid", "Dharmapuri", 
            "Palacode Vegetable Market", 16.00, 24.00, 20.00, -4.5, "55.0", "DOWN"));

        prices.add(new MandiPrice("Cotton (MCU-5)", "Long Staple", "Salem", 
            "Konganapuram Cotton Market", 82.00, 94.00, 88.00, 1.8, "40.2", "UP"));

        if (districtFilter != null && !districtFilter.trim().isEmpty()) {
            return prices.stream()
                .filter(p -> p.getDistrict().equalsIgnoreCase(districtFilter) || 
                             p.getCommodity().toLowerCase().contains(districtFilter.toLowerCase()))
                .toList();
        }

        return prices;
    }
}
