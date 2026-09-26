package com.vyaparbandhu.domain.health;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class BusinessHealthResponse {

    private double overallScore; // Out of 100

    private ScoreDimension revenueHealth;
    private ScoreDimension cashFlowHealth;
    private ScoreDimension inventoryHealth;
    private ScoreDimension repaymentHealth;
    private ScoreDimension growthHealth;

    private List<String> activeEarlyWarnings;

    @Data
    @Builder
    public static class ScoreDimension {
        private double score; // Out of 100
        private Map<String, Object> inputMetrics;
        private String reason;
        private String recommendedAction;
    }
}
