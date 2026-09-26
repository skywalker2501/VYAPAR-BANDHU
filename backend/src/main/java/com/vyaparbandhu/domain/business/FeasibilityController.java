package com.vyaparbandhu.domain.business;

import com.vyaparbandhu.domain.business.dto.FeasibilityReport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/feasibility")
public class FeasibilityController {

    private final FeasibilityEngineService feasibilityEngineService;

    public FeasibilityController(FeasibilityEngineService feasibilityEngineService) {
        this.feasibilityEngineService = feasibilityEngineService;
    }

    @PostMapping("/report")
    public ResponseEntity<FeasibilityReport> generateFeasibilityReport(@RequestBody Map<String, String> request) {
        FeasibilityReport report = feasibilityEngineService.generateReport(request);
        return ResponseEntity.ok(report);
    }
}
