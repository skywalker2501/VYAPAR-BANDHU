package com.vyaparbandhu.domain.ai;

import com.vyaparbandhu.domain.finance.LoanCalculatorService;
import com.vyaparbandhu.domain.scheme.EligibilityEngine;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class AssistantControllerService {

    private final RAGIntegrationService ragService;
    private final LoanCalculatorService loanCalculator;
    private final EligibilityEngine eligibilityEngine;

    public AssistantControllerService(RAGIntegrationService ragService,
            LoanCalculatorService loanCalculator,
            EligibilityEngine eligibilityEngine) {
        this.ragService = ragService;
        this.loanCalculator = loanCalculator;
        this.eligibilityEngine = eligibilityEngine;
    }

    public String handleIntent(String userQuery, BigDecimal userCapital) {
        if (userQuery.toLowerCase().contains("loan") || userQuery.toLowerCase().contains("scheme")) {
            // AI is NOT the source of truth, so we run the deterministic math FIRST
            Map<String, Object> mathReport = loanCalculator.calculateProjectCapacity(userCapital,
                    userCapital.multiply(new BigDecimal("2")));
            List<String> schemes = eligibilityEngine.findEligibleSchemes("generic",
                    (BigDecimal) mathReport.get("requiredLoan"));

            // Pass the strict math as context to the AI
            String verifiedFact = "Max Project Capacity is " + mathReport.get("maxProjectCapacity")
                    + " and eligible schemes are: " + String.join(", ", schemes);

            return ragService.generateResponse(userQuery, Collections.singletonList(verifiedFact));
        }

        return ragService.generateResponse(userQuery, Collections.singletonList("No specific context available."));
    }
}
