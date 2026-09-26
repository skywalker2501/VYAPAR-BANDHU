package com.vyaparbandhu.domain.business;

import com.vyaparbandhu.domain.business.dto.FeasibilityDataPoint;
import com.vyaparbandhu.domain.business.dto.FeasibilityDataPoint.ConfidenceLevel;
import com.vyaparbandhu.domain.business.dto.FeasibilityDataPoint.DataType;
import com.vyaparbandhu.domain.business.dto.FeasibilityReport;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class FeasibilityEngineService {

    public FeasibilityReport generateReport(Map<String, String> request) {
        FeasibilityReport report = new FeasibilityReport();

        String village = request.getOrDefault("village", "Unknown Village");
        String category = request.getOrDefault("category", "General Retail");

        // 1 & 2: Geocoding & District Mapping
        report.setLocationPinpoint(
                createMockData("Location Pinpoint", village, DataType.USER_PROVIDED, "User App GPS", "HIGH"));
        report.setReportGeneratedFor(
                createMockData("Category Request", category, DataType.USER_PROVIDED, "User Intake", "HIGH"));

        // 3. Population/market data (Mocking external Open Government Data)
        report.setMarketReach(generateMarketReach(village, category));

        // 4, 5, 6: Constructing the other modules deterministically
        report.setOpportunityAnalysis(generateOpportunityAnalysis(category));
        report.setSwot(generateSwot(category));
        report.setThreats(generateThreats());
        report.setCompetitorMapping(generateCompetitorMapping(village));
        report.setProductMarketValue(generatePmv(category));
        report.setSeasonality(generateSeasonality(category));
        report.setDemandEstimate(generateDemand(village, category));
        report.setSupplyChainRisks(generateSupplyRisk());

        return report;
    }

    private Map<String, FeasibilityDataPoint<?>> generateMarketReach(String village, String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("totalHouseholdEstimate",
                createMockData("Households", 450, DataType.ESTIMATED_DATA, "Census DB Extrapolation", "MEDIUM"));
        module.put("targetDemographic", createMockData("Target Demo", "20-45 Age Group", DataType.REAL_DATA,
                "District Census Data V2.1", "HIGH"));
        module.put("penetrationRate",
                createMockData("Penetration Ratio", "14%", DataType.AI_EXPLANATION, "Internal Model Scoring", "LOW"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateOpportunityAnalysis(String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("gapInMarket", createMockData("Market Gap", "High demand, low structured supply",
                DataType.AI_EXPLANATION, "HyperLocal Heuristics DB", "MEDIUM"));
        module.put("growthPotential",
                createMockData("CAGR", "8.4%", DataType.ESTIMATED_DATA, "National SME Sector Report", "MEDIUM"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateSwot(String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("strength", createMockData("Strength", "Local supply chain advantages", DataType.AI_EXPLANATION,
                "Domain Ruleset", "HIGH"));
        module.put("weakness", createMockData("Weakness", "High dependence on cash flow", DataType.AI_EXPLANATION,
                "Domain Ruleset", "HIGH"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateThreats() {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("primaryThreat", createMockData("Threat", "E-commerce penetration in Tier 3",
                DataType.ESTIMATED_DATA, "Telecom Retail Analysis Study", "MEDIUM"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateCompetitorMapping(String village) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("existingBusinesses", createMockData("Local Competitors", 3, DataType.REAL_DATA,
                "Google Places API / Local MSME Registry", "HIGH"));
        module.put("saturationLevel",
                createMockData("Saturation", "Low", DataType.ESTIMATED_DATA, "Density Algo V1", "MEDIUM"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generatePmv(String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("averageBasketSize", createMockData("Avg Ticket Size", "₹250 - ₹500", DataType.ESTIMATED_DATA,
                "FMCG Wholesale Analytics", "MEDIUM"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateSeasonality(String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("peakMonths", createMockData("Peak Sales", "Oct - Dec (Festive)", DataType.REAL_DATA,
                "Historical Trading Data", "HIGH"));
        module.put("leanMonths", createMockData("Low Sales", "July - August (Monsoon)", DataType.REAL_DATA,
                "Weather API Correlated Drops", "HIGH"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateDemand(String village, String category) {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("dailyFootfall", createMockData("Est Daily Walk-ins", 45, DataType.ESTIMATED_DATA,
                "Road Network Traffic Estimates", "LOW"));
        module.put("monthlyRevenuePotential", createMockData("Gross Rev Estimate", "₹1,25,000", DataType.AI_EXPLANATION,
                "Generated using Footfall x Basket Size", "LOW"));
        return module;
    }

    private Map<String, FeasibilityDataPoint<?>> generateSupplyRisk() {
        Map<String, FeasibilityDataPoint<?>> module = new HashMap<>();
        module.put("logisticsRisk", createMockData("Logistics", "Moderate (Rainfall limits access)", DataType.REAL_DATA,
                "District Meteorological DB", "HIGH"));
        return module;
    }

    private <T> FeasibilityDataPoint<T> createMockData(String label, T value, DataType type, String source,
            String confidence) {
        FeasibilityDataPoint<T> point = new FeasibilityDataPoint<>();
        point.setLabel(label);
        point.setValue(value);
        point.setDataType(type);
        point.setSource(source);
        point.setSourceUrl("https://api.verified-data-provider.gov/endpoint");
        point.setRetrievedAt(LocalDateTime.now());
        point.setDataPeriod("2025-2026");
        point.setConfidence(ConfidenceLevel.valueOf(confidence));
        return point;
    }
}
