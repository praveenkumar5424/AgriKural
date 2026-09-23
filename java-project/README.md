# Tamil Nadu Smart Agriculture System (Uzhavan Agri-Mitra) - Java Edition

Enterprise Java backend & standalone console program for the Tamil Nadu Agricultural Decision Support System.

## Project Structure

```
java-project/
├── pom.xml                                      # Maven configuration (Spring Boot 3.2.x, Java 17+)
├── README.md                                    # Setup & execution instructions
└── src/main/java/com/tamilnadu/agri/
    ├── AgriApplication.java                     # Spring Boot Main Application
    ├── MainConsoleApp.java                      # Standalone Runnable Java Program (Zero-dependency)
    ├── controller/
    │   └── AgriController.java                  # REST API Endpoints (/api/districts, /api/mandi/prices, etc.)
    ├── model/
    │   ├── District.java                        # Tamil Nadu 38 District Profiles & Zones
    │   ├── CropAdvisoryRequest.java             # Soil, Season, & Water input DTO
    │   ├── CropAdvisoryResponse.java            # AI Crop Matching & NPK Recommendation
    │   ├── MandiPrice.java                      # APMC & Uzhavan Sandhai Commodity Rates
    │   ├── DiseaseDiagnosis.java                # TNAU Pest & Leaf Disease Diagnostics
    │   └── GovtScheme.java                      # PMFBY, Drip Subsidy, & PM-KISAN grants
    └── service/
        ├── DistrictService.java                 # District agro-climatic zone repository
        ├── CropAdvisoryService.java             # Crop-soil matching & yield estimation
        ├── MandiPriceService.java               # Live market price analytics & trends
        ├── DiseaseDiagnosisService.java         # Crop pathology & remedies
        └── GovtSchemeService.java               # Subsidy eligibility engine
```

## How to Run the Java Program

### Option 1: Standalone Java (No Maven required)
From the root of this project:
```bash
cd java-project/src/main/java
javac com/tamilnadu/agri/model/*.java com/tamilnadu/agri/service/*.java com/tamilnadu/agri/MainConsoleApp.java
java com.tamilnadu.agri.MainConsoleApp
```

### Option 2: Spring Boot REST API (with Maven)
```bash
cd java-project
mvn clean spring-boot:run
```
Once started, the REST API endpoints will be accessible at:
- `GET http://localhost:8080/api/districts` - List all Tamil Nadu agro-climatic zones
- `POST http://localhost:8080/api/advisory/recommend` - Crop & fertilizer advisory
- `GET http://localhost:8080/api/mandi/prices` - Daily market rates
- `GET http://localhost:8080/api/disease/diagnose?crop=Paddy&symptoms=blast` - Disease diagnostic
- `GET http://localhost:8080/api/schemes?acreage=2.5` - Subsidies & insurance

### How to Export from Google AI Studio:
1. Open the top-right project menu in Google AI Studio.
2. Select **Export to ZIP** or **Export to GitHub**.
3. Open the downloaded folder in **IntelliJ IDEA**, **Eclipse**, or **VS Code** with the Java Extension Pack.
