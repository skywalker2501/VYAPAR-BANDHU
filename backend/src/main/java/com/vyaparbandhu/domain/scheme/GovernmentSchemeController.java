package com.vyaparbandhu.domain.scheme;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/schemes")
public class GovernmentSchemeController {

    private final GovernmentSchemeService schemeService;

    public GovernmentSchemeController(GovernmentSchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping
    public ResponseEntity<List<SchemeResponseDto>> getAllSchemes() {
        return ResponseEntity.ok(schemeService.getAllSchemes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchemeResponseDto> getSchemeById(@PathVariable UUID id) {
        SchemeResponseDto dto = schemeService.getSchemeById(id);
        if (dto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<SchemeResponseDto>> getSchemesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(schemeService.getSchemesByCategory(category));
    }

    @PostMapping("/match")
    public ResponseEntity<List<SchemeResponseDto>> matchSchemes(@RequestBody SchemeMatchRequest request) {
        // Enforces strict deterministic constraints on eligibility
        return ResponseEntity.ok(schemeService.matchSchemes(request));
    }
}
