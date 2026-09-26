package com.vyaparbandhu.domain.ai.service;

import com.vyaparbandhu.domain.ai.service.DocumentService.VerifiedDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RagService {

    private final RestClient restClient;

    @Value("${llm.apiKey:}")
    private String apiKey;

    @Value("${llm.apiUrl:https://api.openai.com/v1/chat/completions}")
    private String apiUrl;

    public RagService() {
        this.restClient = RestClient.builder().build();
    }

    private String buildStrictSystemPrompt(List<VerifiedDocument> context) {
        String jsonContext = context.stream()
                .map(doc -> String.format("{ \"id\": \"%s\", \"content\": %s }", doc.getId(), doc.getContentAsJson()))
                .collect(Collectors.joining(",\n", "[\n", "\n]"));

        return """
                You are Vyapar Bandhu AI, a strict Retrieval-Augmented Generation assistant.
                You must answer the user's question USING ONLY the provided JSON Context.

                10-Point Anti-Hallucination Mandate:
                1. Never invent government schemes.
                2. Never invent eligibility.
                3. Never invent loan limits.
                4. Never invent interest rates.
                5. Never invent subsidies.
                6. Never invent market statistics.
                7. Never invent citations.
                8. If evidence is missing in the JSON Context, you MUST say "This information is unavailable in my verified database."
                9. Always distinguish verified facts from estimates.
                10. Always provide source attributes attached to the context.

                JSON Context:
                """
                + jsonContext;
    }

    public String generateAnswer(String userQuestion, List<VerifiedDocument> contextDocs) {
        String systemPrompt = buildStrictSystemPrompt(contextDocs);

        // Simple prompt construction (Replace with actual OpenAI JSON Schema if live)
        Map<String, Object> payload = new HashMap<>();
        payload.put("model", "gpt-4o");
        payload.put("messages", List.of(
                Map.of("role", "system", "content", systemPrompt),
                Map.of("role", "user", "content", userQuestion)));

        // If the API Key is a mock 'test_key', simulate the response text directly
        // securely without external API call.
        if ("test_key".equals(apiKey)) {
            if (contextDocs.isEmpty()) {
                return "This information is unavailable in my verified database.";
            }
            return "Based on the verified context (ID: " + contextDocs.get(0).getId() +
                    "), the scheme available is restricted strictly to the parameters listed inside the document. " +
                    "Loan limit is capped explicitly at " + contextDocs.get(0).getContentAsJson() + ".";
        }

        try {
            // Live Call
            var response = restClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .body(String.class); // Simplify by taking string payload natively

            return "Generated text: " + response;
        } catch (Exception e) {
            return "AI Generation Error: Unable to securely connect to inference API. Rely on verified context manually.";
        }
    }
}
