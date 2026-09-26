package com.vyaparbandhu.domain.finance;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoanCalculatorService {

    public Map<String, Object> calculateProjectCapacity(BigDecimal ownCapital, BigDecimal setupCost) {
        // Strict Deterministic Math (No AI Hallucination)
        // Rule: Own capital must be at least 10% of total project cost.
        // Therefore, Max Project Capacity = ownCapital / 0.10
        BigDecimal marginRequirement = new BigDecimal("0.10");
        BigDecimal maxCapacity = ownCapital.divide(marginRequirement, 2, RoundingMode.HALF_UP);

        BigDecimal requiredLoan = BigDecimal.ZERO;
        boolean isFeasible = true;

        if (setupCost != null) {
            if (setupCost.compareTo(maxCapacity) > 0) {
                isFeasible = false;
            }
            requiredLoan = setupCost.subtract(ownCapital).max(BigDecimal.ZERO);
        }

        Map<String, Object> report = new HashMap<>();
        report.put("ownCapital", ownCapital);
        report.put("setupCost", setupCost);
        report.put("maxProjectCapacity", maxCapacity);
        report.put("requiredLoan", requiredLoan);
        report.put("isFeasibleWithCurrentCapital", isFeasible);

        // Scheme Routing Logic
        if (requiredLoan.compareTo(new BigDecimal("1000000")) <= 0 && requiredLoan.compareTo(BigDecimal.ZERO) > 0) {
            report.put("recommendedRoute", "Mudra Loan (Tarun/Kishor)");
        } else if (requiredLoan.compareTo(new BigDecimal("1000000")) > 0) {
            report.put("recommendedRoute", "PMEGP or SME Term Loan");
        } else {
            report.put("recommendedRoute", "Self-Funded");
        }

        return report;
    }
}
