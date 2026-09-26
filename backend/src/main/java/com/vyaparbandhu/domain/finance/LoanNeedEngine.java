package com.vyaparbandhu.domain.finance;

import com.vyaparbandhu.domain.finance.dto.LoanNecessityRequest;
import com.vyaparbandhu.domain.finance.dto.LoanNecessityResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class LoanNeedEngine {

    /**
     * Determines whether a loan is strictly necessary without artificially
     * maximizing the eligibility.
     */
    public LoanNecessityResponse evaluateLoanNecessity(LoanNecessityRequest request) {
        BigDecimal availableOwnCapital = request.getAvailableOwnCapital() != null ? request.getAvailableOwnCapital()
                : BigDecimal.ZERO;
        BigDecimal cashGen = request.getExpectedInternalCashGeneration() != null
                ? request.getExpectedInternalCashGeneration()
                : BigDecimal.ZERO;
        BigDecimal subsidy = request.getConfirmedGovernmentSubsidy() != null ? request.getConfirmedGovernmentSubsidy()
                : BigDecimal.ZERO;

        BigDecimal businessInv = request.getRequiredBusinessInvestment() != null
                ? request.getRequiredBusinessInvestment()
                : BigDecimal.ZERO;
        BigDecimal workingCapital = request.getWorkingCapitalRequirement() != null
                ? request.getWorkingCapitalRequirement()
                : BigDecimal.ZERO;
        BigDecimal emergencyReserve = request.getEmergencyReserve() != null ? request.getEmergencyReserve()
                : BigDecimal.ZERO;

        BigDecimal totalFunds = availableOwnCapital.add(cashGen).add(subsidy);
        BigDecimal totalRequirement = businessInv.add(workingCapital).add(emergencyReserve);

        BigDecimal gap = totalRequirement.subtract(totalFunds).max(BigDecimal.ZERO);

        LoanNecessityResponse response = new LoanNecessityResponse();
        response.setTotalAvailableFunds(totalFunds);
        response.setTotalFundingRequirement(totalRequirement);
        response.setActualFundingGap(gap);

        // Maximum eligible loan is arbitrarily calculated based on typical 90% of
        // eligible project cost limit constraint passed in standard finance engine
        // Let's assume eligible project cost is just businessInv + workingCapital for
        // typical term
        BigDecimal maxEligible = (businessInv.add(workingCapital)).multiply(new BigDecimal("0.90")).setScale(2,
                RoundingMode.HALF_UP);
        response.setMaximumEligibleLoan(maxEligible);

        String category;
        String recommendedRange;

        if (gap.compareTo(BigDecimal.ZERO) == 0) {
            category = "NO_LOAN_REQUIRED";
            recommendedRange = "₹0 (Fully Funded)";
            response.setMaximumEligibleLoan(BigDecimal.ZERO); // Override to prevent borrowing temptation
        } else if (gap.compareTo(maxEligible) < 0) {
            category = "PARTIAL_LOAN_REQUIRED";
            recommendedRange = "₹" + gap.toPlainString() + " (Strict Gap Cover)";
        } else {
            category = "LOAN_REQUIRED";
            recommendedRange = "₹" + maxEligible.toPlainString() + " (Max Eligibility)";
        }

        response.setRecommendationCategory(category);
        response.setRecommendedBorrowingRange(recommendedRange);

        // Deterministic AI-style explanation
        StringBuilder explanation = new StringBuilder();
        explanation.append("Your estimated business requirement is ₹").append(totalRequirement.toPlainString())
                .append(". ");
        explanation.append("You already have ₹").append(totalFunds.toPlainString())
                .append(" in available funds and verified capital. ");

        if (gap.compareTo(BigDecimal.ZERO) > 0) {
            explanation.append("Estimated funding gap: ₹").append(gap.toPlainString()).append(". ");
            if (category.equals("PARTIAL_LOAN_REQUIRED")) {
                explanation.append("You may be eligible for a larger loan of up to ₹")
                        .append(maxEligible.toPlainString())
                        .append(", but the system does not recommend borrowing the maximum automatically.");
            } else {
                explanation.append("We recommend limiting your loan strictly to your gap or the maximum ₹")
                        .append(maxEligible.toPlainString()).append(" eligibility.");
            }
        } else {
            explanation.append(
                    "You do not have a funding gap. Borrowing is mathematically not recommended as it unnecessarily increases debt liability.");
        }

        response.setGeneratedExplanation(explanation.toString());

        return response;
    }
}
