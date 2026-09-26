package com.vyaparbandhu.domain.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class LoanNecessityResponse {
    private BigDecimal totalFundingRequirement;
    private BigDecimal totalAvailableFunds;

    private BigDecimal actualFundingGap;

    private String recommendationCategory; // NO_LOAN_REQUIRED, PARTIAL_LOAN_REQUIRED, LOAN_REQUIRED
    private BigDecimal maximumEligibleLoan; // Can be pulled from Scheme integration if passed, or strictly calculated
                                            // based on 90%
    private String recommendedBorrowingRange;

    private String generatedExplanation;
}
