package com.vyaparbandhu.domain.scheme;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SchemeResponseDto {
    private UUID id;
    private String schemeName;
    private String description;

    // Financial Bounds
    private BigDecimal minProjectCost;
    private BigDecimal maxProjectCost;
    private BigDecimal maxLoan;

    // Strict Reporting Fields
    private String sourceName;
    private String sourceUrl;
    private String officialUrl;
    private LocalDateTime lastVerified;
    private String status; // 'ACTIVE' or 'NEEDS_VERIFICATION'

    // Dynamically evaluated by Rule Engine
    private String eligibilityStatus; // 'ELIGIBLE', 'NOT_ELIGIBLE', 'MAYBE'
    private String confidence; // 'HIGH', 'LOW'
}
