package com.vyaparbandhu.domain.scheme;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class EligibilityEngine {

    // Simulating a strict deterministic engine hitting the PostgreSQL DB schema
    // In production, this parses the `eligibilityCriteria` JSON from
    // government_schemes
    public List<String> findEligibleSchemes(String categoryKey, BigDecimal requiredLoan) {
        if (requiredLoan.compareTo(new BigDecimal("1000000")) <= 0) {
            return Arrays.asList("Mudra Loan", "Stand-Up India (If SC/ST/Women)");
        } else if (requiredLoan.compareTo(new BigDecimal("5000000")) <= 0) {
            return Arrays.asList("PMEGP (Prime Minister's Employment Generation Programme)", "CGTMSE");
        } else {
            return Arrays.asList("Stand-Up India", "State Specific SME Subsidy");
        }
    }
}
