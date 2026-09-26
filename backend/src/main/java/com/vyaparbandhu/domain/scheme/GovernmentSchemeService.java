package com.vyaparbandhu.domain.scheme;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GovernmentSchemeService {

    private final GovernmentSchemeRepository schemeRepository;

    public GovernmentSchemeService(GovernmentSchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<SchemeResponseDto> getAllSchemes() {
        return schemeRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public SchemeResponseDto getSchemeById(UUID id) {
        return schemeRepository.findById(id).map(this::mapToDto).orElse(null);
    }

    public List<SchemeResponseDto> getSchemesByCategory(String category) {
        return schemeRepository.findByCategoryIgnoreCase(category).stream().map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<SchemeResponseDto> matchSchemes(SchemeMatchRequest request) {
        List<GovernmentSchemeEntity> allSchemes = schemeRepository.findAll();

        return allSchemes.stream().map(scheme -> {
            SchemeResponseDto dto = mapToDto(scheme);

            // STRICT DETERMINISTIC RULE ENGINE (NO AI USAGE)
            boolean isEligible = true;
            String status = "ELIGIBLE";
            String confidence = "HIGH";

            // 1. Check Cost Limits
            if (scheme.getMinProjectCost() != null && request.getProjectCost() != null) {
                if (request.getProjectCost().compareTo(scheme.getMinProjectCost()) < 0) {
                    isEligible = false;
                }
            }
            if (scheme.getMaxProjectCost() != null && request.getProjectCost() != null) {
                if (request.getProjectCost().compareTo(scheme.getMaxProjectCost()) > 0) {
                    isEligible = false;
                }
            }

            // 2. Check State
            if (scheme.getState() != null && !scheme.getState().equalsIgnoreCase("All")
                    && request.getLocationState() != null) {
                if (!scheme.getState().equalsIgnoreCase(request.getLocationState())) {
                    isEligible = false;
                }
            }

            // 3. Mark old schemes as needing verification
            if (scheme.getLastVerified() != null
                    && scheme.getLastVerified().isBefore(LocalDateTime.now().minusMonths(6))) {
                dto.setStatus("NEEDS_VERIFICATION");
                confidence = "LOW";
            }

            dto.setEligibilityStatus(isEligible ? "ELIGIBLE" : "NOT_ELIGIBLE");
            dto.setConfidence(confidence);

            return dto;
        }).filter(dto -> dto.getEligibilityStatus().equals("ELIGIBLE")).collect(Collectors.toList());
    }

    private SchemeResponseDto mapToDto(GovernmentSchemeEntity entity) {
        SchemeResponseDto dto = new SchemeResponseDto();
        dto.setId(entity.getId());
        dto.setSchemeName(entity.getSchemeName());
        dto.setDescription(entity.getDescription());
        dto.setMinProjectCost(entity.getMinProjectCost());
        dto.setMaxProjectCost(entity.getMaxProjectCost());
        dto.setMaxLoan(entity.getMaxLoan());
        dto.setSourceName(entity.getSourceName() != null ? entity.getSourceName() : "Official Government Portal");
        dto.setSourceUrl(entity.getSourceUrl());
        dto.setOfficialUrl(entity.getOfficialUrl());
        dto.setLastVerified(entity.getLastVerified());

        // Auto-tag older than 6 months
        if (entity.getLastVerified() != null && entity.getLastVerified().isBefore(LocalDateTime.now().minusMonths(6))) {
            dto.setStatus("NEEDS_VERIFICATION");
        } else {
            dto.setStatus(entity.getStatus() != null ? entity.getStatus() : "ACTIVE");
        }

        dto.setEligibilityStatus("NOT_EVALUATED");
        dto.setConfidence("UNKNOWN");
        return dto;
    }
}
