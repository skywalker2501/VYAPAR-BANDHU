package com.vyaparbandhu.domain.health;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private final BusinessHealthEngine healthEngine;

    public HealthController(BusinessHealthEngine healthEngine) {
        this.healthEngine = healthEngine;
    }

    @GetMapping
    public ResponseEntity<BusinessHealthResponse> getHealthScore(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(healthEngine.calculateHealthScore(userId));
    }
}
