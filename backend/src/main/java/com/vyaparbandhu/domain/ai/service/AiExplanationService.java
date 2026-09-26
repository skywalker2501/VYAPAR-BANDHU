package com.vyaparbandhu.domain.ai.service;

import com.vyaparbandhu.domain.ai.service.DocumentService.VerifiedDocument;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AiExplanationService {

    @Data
    @Builder
    public static class RagResponse {
        private String answer;
        private List<SourceReference> sources;
        private List<String> verificationWarnings;
    }

    @Data
    @Builder
    public static class SourceReference {
        private String documentId;
        private String url;
        private String lastVerifiedDate;
        private String confidence;
    }

    public RagResponse packageResponse(String aiAnswer, List<VerifiedDocument> contextUsed) {

        List<SourceReference> sources = contextUsed.stream()
                .map(doc -> SourceReference.builder()
                        .documentId(doc.getId())
                        .url(doc.getSourceUrl())
                        .lastVerifiedDate(doc.getLastVerified() != null ? doc.getLastVerified().toString() : "UNKNOWN")
                        .confidence(doc.getConfidence().name())
                        .build())
                .collect(Collectors.toList());

        List<String> warnings = contextUsed.stream()
                .filter(doc -> doc.getConfidence() == SourceValidationService.ConfidenceLevel.LOW ||
                        doc.getConfidence() == SourceValidationService.ConfidenceLevel.NEEDS_VERIFICATION)
                .map(doc -> "Warning: Source " + doc.getId() + " is marked as " + doc.getConfidence().name()
                        + " and should not be treated as a verified absolute fact.")
                .collect(Collectors.toList());

        return RagResponse.builder()
                .answer(aiAnswer)
                .sources(sources)
                .verificationWarnings(warnings)
                .build();
    }
}
