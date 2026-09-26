package com.vyaparbandhu.domain.ai.service;

import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final SourceValidationService sourceValidationService;

    public DocumentService(SourceValidationService sourceValidationService) {
        this.sourceValidationService = sourceValidationService;
    }

    @Data
    @Builder
    public static class VerifiedDocument {
        private String id;
        private String contentAsJson;
        private String sourceUrl;
        private LocalDate lastVerified;
        private boolean isEstimation;
        private SourceValidationService.ConfidenceLevel confidence;
        private String metadataLocation;
        private String metadataBusinessType;
    }

    public List<VerifiedDocument> fetchVerifiedContext(String location, String businessType) {
        // MOCK Retrieval Layer logic. In real execution this hits PostgreSQL Vector
        // DB/Full-text search.
        List<VerifiedDocument> docs = new ArrayList<>();

        docs.add(VerifiedDocument.builder()
                .id("DOC_001")
                .contentAsJson("{ \"scheme\": \"Micro Finance\", \"max_loan\": 125000, \"interest\": 6.5 }")
                .sourceUrl("https://msme.gov.in/micro-finance")
                .lastVerified(LocalDate.now().minusMonths(1))
                .isEstimation(false)
                .metadataLocation("All")
                .metadataBusinessType("General Retail")
                .build());

        docs.add(VerifiedDocument.builder()
                .id("DOC_002")
                .contentAsJson("{ \"marketInsight\": \"High demand during festive season\" }")
                .sourceUrl("Local Chamber of Commerce")
                .lastVerified(LocalDate.now().minusMonths(8)) // Outdated
                .isEstimation(true)
                .metadataLocation(location)
                .metadataBusinessType(businessType)
                .build());

        // Attach Confidence
        docs.forEach(doc -> {
            doc.setConfidence(sourceValidationService.evaluateConfidence(doc.getSourceUrl(), doc.getLastVerified(),
                    doc.isEstimation()));
        });

        // Strict Filtering by Location and Type (Mock rule: 'All' or matches)
        return docs.stream()
                .filter(d -> (d.getMetadataLocation().equals("All")
                        || d.getMetadataLocation().equalsIgnoreCase(location)))
                .filter(d -> (d.getMetadataBusinessType().equals("All")
                        || d.getMetadataBusinessType().equalsIgnoreCase(businessType)))
                .collect(Collectors.toList());
    }
}
