package com.vyaparbandhu.domain.business.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class FeasibilityReport {
    // Top Level Identity
    private FeasibilityDataPoint<String> reportGeneratedFor;
    private FeasibilityDataPoint<String> locationPinpoint;

    // 9 Modules
    private Map<String, FeasibilityDataPoint<?>> marketReach;
    private Map<String, FeasibilityDataPoint<?>> opportunityAnalysis;
    private Map<String, FeasibilityDataPoint<?>> swot;
    private Map<String, FeasibilityDataPoint<?>> threats;
    private Map<String, FeasibilityDataPoint<?>> competitorMapping;
    private Map<String, FeasibilityDataPoint<?>> productMarketValue;
    private Map<String, FeasibilityDataPoint<?>> seasonality;
    private Map<String, FeasibilityDataPoint<?>> demandEstimate;
    private Map<String, FeasibilityDataPoint<?>> supplyChainRisks;
}
