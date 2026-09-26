package com.vyaparbandhu.domain.business.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeasibilityDataPoint<T> {
    private String label;
    private T value;

    // Strict Source Distinctions
    private DataType dataType; // REAL_DATA, ESTIMATED_DATA, USER_PROVIDED, AI_EXPLANATION

    // Lineage & Verifiability
    private String source;
    private String sourceUrl;
    private LocalDateTime retrievedAt;
    private String dataPeriod;
    private ConfidenceLevel confidence;

    public enum DataType {
        REAL_DATA,
        ESTIMATED_DATA,
        USER_PROVIDED,
        AI_EXPLANATION
    }

    public enum ConfidenceLevel {
        HIGH,
        MEDIUM,
        LOW
    }
}
