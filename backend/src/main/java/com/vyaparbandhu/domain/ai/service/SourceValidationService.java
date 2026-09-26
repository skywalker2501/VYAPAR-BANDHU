package com.vyaparbandhu.domain.ai.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
public class SourceValidationService {

    public enum ConfidenceLevel {
        HIGH, MEDIUM, LOW, NEEDS_VERIFICATION
    }

    public ConfidenceLevel evaluateConfidence(String sourceUrl, LocalDate lastVerifiedDate, boolean isEstimation) {
        if (isEstimation) {
            return ConfidenceLevel.LOW;
        }

        if (lastVerifiedDate == null) {
            return ConfidenceLevel.NEEDS_VERIFICATION;
        }

        long monthsSinceVerification = ChronoUnit.MONTHS.between(lastVerifiedDate, LocalDate.now());

        if (monthsSinceVerification > 6) {
            return ConfidenceLevel.NEEDS_VERIFICATION;
        } else if (monthsSinceVerification > 3) {
            return ConfidenceLevel.MEDIUM;
        } else if (sourceUrl != null && sourceUrl.contains(".gov.in")) {
            return ConfidenceLevel.HIGH;
        }

        return ConfidenceLevel.MEDIUM;
    }
}
