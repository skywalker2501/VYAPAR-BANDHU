package com.vyaparbandhu.domain.feedback;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/outcomes")
public class OutcomeController {

    private final OutcomeAnalyticsService outcomeAnalyticsService;

    public OutcomeController(OutcomeAnalyticsService outcomeAnalyticsService) {
        this.outcomeAnalyticsService = outcomeAnalyticsService;
    }

    @PostMapping("/track")
    public ResponseEntity<RecommendationOutcomeEntity> trackOutcome(@RequestBody RecommendationOutcomeEntity outcome) {
        return ResponseEntity.ok(outcomeAnalyticsService.logOutcome(outcome));
    }

    @GetMapping("/analytics/{businessType}/{location}")
    public ResponseEntity<OutcomeAnalyticsService.AdminOutcomeAnalytics> getAnalytics(
            @PathVariable String businessType,
            @PathVariable String location) {
        return ResponseEntity.ok(outcomeAnalyticsService.generateAnalyticsByCohort(businessType, location));
    }
}
