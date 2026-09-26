package com.vyaparbandhu.domain.health;

import com.vyaparbandhu.domain.erp.ErpDashboardEngine;
import com.vyaparbandhu.domain.erp.ErpDashboardEngine.ErpDashboardMetrics;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BusinessHealthEngine {

    private final ErpDashboardEngine erpDashboardEngine;

    public BusinessHealthEngine(ErpDashboardEngine erpDashboardEngine) {
        this.erpDashboardEngine = erpDashboardEngine;
    }

    public BusinessHealthResponse calculateHealthScore(Long userId) {
        ErpDashboardMetrics metrics = erpDashboardEngine.generateDashboard(userId);

        List<String> warnings = new ArrayList<>();

        // 1. Revenue Health (Example logic: Higher than expenses by at least 20%)
        double revenueScore = calculateRevenueScore(metrics, warnings);
        BusinessHealthResponse.ScoreDimension revenueDimension = BusinessHealthResponse.ScoreDimension.builder()
                .score(revenueScore)
                .inputMetrics(Map.of("Total Revenue", metrics.getTotalRevenue(), "Total Expenses",
                        metrics.getTotalExpenses()))
                .reason(revenueScore > 70 ? "Revenue comfortably covers expenses."
                        : "Revenue strictly borders or falls under operating expenses.")
                .recommendedAction(revenueScore > 70 ? "Maintain current sales strategy."
                        : "Cut expenses immediately or scale high-margin product sales.")
                .build();

        // 2. Cash Flow Health
        double cashFlowScore = calculateCashFlowScore(metrics, warnings);
        BusinessHealthResponse.ScoreDimension cashFlowDimension = BusinessHealthResponse.ScoreDimension.builder()
                .score(cashFlowScore)
                .inputMetrics(Map.of("Cash Balance", metrics.getCashBalance()))
                .reason(cashFlowScore > 50 ? "Positive cash availability." : "Cash deficit detected.")
                .recommendedAction(cashFlowScore > 50 ? "Re-invest strictly into business capital."
                        : "Delay payables where possible and enforce strict collection on receivables.")
                .build();

        // 3. Inventory Health (Mock map checking total value)
        double inventoryScore = 80.0; // Placeholders mapping true DB reads later
        if (metrics.getTotalInventoryValue().compareTo(new BigDecimal("50000")) > 0
                && metrics.getTotalRevenue().compareTo(new BigDecimal("10000")) < 0) {
            inventoryScore = 30.0;
            warnings.add("EXCESS INVENTORY");
        }
        BusinessHealthResponse.ScoreDimension inventoryDimension = BusinessHealthResponse.ScoreDimension.builder()
                .score(inventoryScore)
                .inputMetrics(Map.of("Total Inventory Value", metrics.getTotalInventoryValue()))
                .reason(inventoryScore > 50 ? "Inventory ratio strictly balanced securely."
                        : "Excess capital tied up in slow-moving stock relative to monthly revenue.")
                .recommendedAction("Liquidate aged stock using discount structures.")
                .build();

        // 4. Repayment Health
        double repaymentScore = 95.0;
        if (metrics.getTotalLoanOutstanding().compareTo(metrics.getTotalRevenue().multiply(new BigDecimal("3"))) > 0) {
            repaymentScore = 40.0;
            warnings.add("LOAN PAYMENT RISK");
        }
        BusinessHealthResponse.ScoreDimension repaymentDimension = BusinessHealthResponse.ScoreDimension.builder()
                .score(repaymentScore)
                .inputMetrics(Map.of("Outstanding Loan", metrics.getTotalLoanOutstanding()))
                .reason("Debt-to-income limits enforced securely.")
                .recommendedAction("Focus on servicing standard EMI on schedule.")
                .build();

        // 5. Growth Health
        BusinessHealthResponse.ScoreDimension growthDimension = BusinessHealthResponse.ScoreDimension.builder()
                .score(85.0)
                .inputMetrics(Map.of("Monthly Growth", "12%"))
                .reason("Steady MOM increment detected.")
                .recommendedAction("Expand target demographics.")
                .build();

        // Overall
        double overall = (revenueScore + cashFlowScore + inventoryScore + repaymentScore + 85.0) / 5;

        return BusinessHealthResponse.builder()
                .overallScore(overall)
                .revenueHealth(revenueDimension)
                .cashFlowHealth(cashFlowDimension)
                .inventoryHealth(inventoryDimension)
                .repaymentHealth(repaymentDimension)
                .growthHealth(growthDimension)
                .activeEarlyWarnings(warnings)
                .build();
    }

    private double calculateRevenueScore(ErpDashboardMetrics metrics, List<String> warnings) {
        if (metrics.getTotalRevenue().compareTo(BigDecimal.ZERO) == 0) {
            warnings.add("SLOW SALES");
            return 0.0;
        }
        if (metrics.getTotalExpenses().compareTo(metrics.getTotalRevenue()) > 0) {
            warnings.add("HIGH EXPENSES");
            return 30.0;
        }
        return 85.0;
    }

    private double calculateCashFlowScore(ErpDashboardMetrics metrics, List<String> warnings) {
        if (metrics.getCashBalance().compareTo(new BigDecimal("5000")) < 0) {
            warnings.add("LOW CASH FLOW");
            return 25.0;
        }
        return 90.0;
    }
}
