package com.vyaparbandhu.domain.feedback;

import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OutcomeAnalyticsService {

    private final RecommendationOutcomeRepository repository;

    public OutcomeAnalyticsService(RecommendationOutcomeRepository repository) {
        this.repository = repository;
    }

    public RecommendationOutcomeEntity logOutcome(RecommendationOutcomeEntity outcome) {
        return repository.save(outcome);
    }

    @Data
    @Builder
    public static class AdminOutcomeAnalytics {
        private String businessType;
        private String location;
        private int totalRecommendationsTracked;
        private double acceptanceRatePercentage;
        private double implementationRatePercentage;
        private double averageUserRating;
        private double successfulOutcomesPercentage;
        private BigDecimal averageProfitChange;

        private boolean recommendedForManualRuleValidation;
        private String adminFinding;
    }

    public AdminOutcomeAnalytics generateAnalyticsByCohort(String businessType, String location) {
        List<RecommendationOutcomeEntity> history = repository.findByBusinessTypeAndLocation(businessType, location);

        if (history.isEmpty()) {
            return AdminOutcomeAnalytics.builder()
                    .businessType(businessType)
                    .location(location)
                    .totalRecommendationsTracked(0)
                    .adminFinding("Insufficient data to establish validation patterns.")
                    .build();
        }

        long acceptedCount = history.stream().filter(RecommendationOutcomeEntity::isAccepted).count();
        long implementedCount = history.stream().filter(RecommendationOutcomeEntity::isImplemented).count();

        long successfulCount = history.stream()
                .filter(RecommendationOutcomeEntity::isImplemented)
                .filter(r -> r.getProfitAfter() != null && r.getProfitBefore() != null)
                .filter(r -> r.getProfitAfter().compareTo(r.getProfitBefore()) > 0)
                .count();

        double avgRating = history.stream()
                .filter(r -> r.getRating() != null)
                .mapToInt(RecommendationOutcomeEntity::getRating)
                .average()
                .orElse(0.0);

        BigDecimal averageProfitChange = history.stream()
                .filter(RecommendationOutcomeEntity::isImplemented)
                .filter(r -> r.getProfitAfter() != null && r.getProfitBefore() != null)
                .map(r -> r.getProfitAfter().subtract(r.getProfitBefore()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (implementedCount > 0) {
            averageProfitChange = averageProfitChange.divide(new BigDecimal(implementedCount), 2, RoundingMode.HALF_UP);
        }

        // Logic constraint to prevent auto-training. Flags explicitly for MANAUL review
        // only.
        boolean deservesManualValidation = implementedCount > 10 && (successfulCount * 100.0 / implementedCount) > 75.0;

        return AdminOutcomeAnalytics.builder()
                .businessType(businessType)
                .location(location)
                .totalRecommendationsTracked(history.size())
                .acceptanceRatePercentage((acceptedCount * 100.0) / history.size())
                .implementationRatePercentage((implementedCount * 100.0) / history.size())
                .successfulOutcomesPercentage(implementedCount > 0 ? (successfulCount * 100.0) / implementedCount : 0.0)
                .averageUserRating(avgRating)
                .averageProfitChange(averageProfitChange)
                .recommendedForManualRuleValidation(deservesManualValidation)
                .adminFinding(deservesManualValidation
                        ? "High success rate in cohort. Flagged for admin manual rule ingestion."
                        : "Monitoring.")
                .build();
    }
}
