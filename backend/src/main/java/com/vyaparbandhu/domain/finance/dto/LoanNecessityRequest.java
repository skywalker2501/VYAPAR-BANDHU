package com.vyaparbandhu.domain.finance.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class LoanNecessityRequest {
    private BigDecimal availableOwnCapital;
    private BigDecimal expectedInternalCashGeneration;
    private BigDecimal confirmedGovernmentSubsidy;

    private BigDecimal requiredBusinessInvestment;
    private BigDecimal workingCapitalRequirement;
    private BigDecimal emergencyReserve;
}
