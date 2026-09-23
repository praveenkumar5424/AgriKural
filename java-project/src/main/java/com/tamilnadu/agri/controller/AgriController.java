package com.tamilnadu.agri.controller;

import com.tamilnadu.agri.model.*;
import com.tamilnadu.agri.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AgriController {

    private final DistrictService districtService;
    private final CropAdvisoryService cropAdvisoryService;
    private final MandiPriceService mandiPriceService;
    private final DiseaseDiagnosisService diseaseDiagnosisService;
    private final GovtSchemeService govtSchemeService;

    public AgriController(DistrictService districtService,
                          CropAdvisoryService cropAdvisoryService,
                          MandiPriceService mandiPriceService,
                          DiseaseDiagnosisService diseaseDiagnosisService,
                          GovtSchemeService govtSchemeService) {
        this.districtService = districtService;
        this.cropAdvisoryService = cropAdvisoryService;
        this.mandiPriceService = mandiPriceService;
        this.diseaseDiagnosisService = diseaseDiagnosisService;
        this.govtSchemeService = govtSchemeService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "Tamil Nadu Smart Agriculture Java Backend",
            "system", "Uzhavan Agri-Mitra Enterprise Edition"
        ));
    }

    @GetMapping("/districts")
    public ResponseEntity<List<District>> getAllDistricts() {
        return ResponseEntity.ok(districtService.getAllDistricts());
    }

    @GetMapping("/districts/{id}")
    public ResponseEntity<District> getDistrictById(@PathVariable String id) {
        return districtService.getDistrictById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/advisory/recommend")
    public ResponseEntity<List<CropAdvisoryResponse>> getCropAdvisory(@RequestBody CropAdvisoryRequest request) {
        return ResponseEntity.ok(cropAdvisoryService.recommendCrops(request));
    }

    @GetMapping("/mandi/prices")
    public ResponseEntity<List<MandiPrice>> getMandiPrices(@RequestParam(required = false) String district) {
        return ResponseEntity.ok(mandiPriceService.getLiveMandiPrices(district));
    }

    @GetMapping("/disease/diagnose")
    public ResponseEntity<DiseaseDiagnosis> diagnoseDisease(
            @RequestParam(defaultValue = "Paddy") String crop,
            @RequestParam(defaultValue = "brown spot") String symptoms) {
        return ResponseEntity.ok(diseaseDiagnosisService.diagnoseCropProblem(crop, symptoms));
    }

    @GetMapping("/schemes")
    public ResponseEntity<List<GovtScheme>> getSchemes(
            @RequestParam(defaultValue = "2.5") double acreage,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(govtSchemeService.getAvailableSchemes(acreage, category));
    }
}
