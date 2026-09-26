package com.vyaparbandhu.domain.ai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vyaparbandhu.domain.ai.dto.ChatRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("pollinationsProvider")
public class PollinationsProvider implements AiProvider {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${llm.apiUrl:https://text.pollinations.ai/openai}")
    private String apiUrl;

    @Value("${llm.model:openai}")
    private String model;

    public PollinationsProvider(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String generateResponse(ChatRequest request, String systemInstruction) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        List<Map<String, String>> chatHistory = request.getMessages() != null ? request.getMessages()
                : new ArrayList<>();

        // Build OpenAI-compatible messages array
        List<Map<String, String>> formattedMessages = new ArrayList<>();

        // System message with business context
        Map<String, String> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        try {
            systemMessage.put("content", systemInstruction + "\n\nVerified Context:\n"
                    + objectMapper.writeValueAsString(request.getContext()));
        } catch (Exception e) {
            systemMessage.put("content", systemInstruction);
        }
        formattedMessages.add(systemMessage);

        // Conversation history
        for (Map<String, String> msg : chatHistory) {
            Map<String, String> histMsg = new HashMap<>();
            histMsg.put("role", "user".equals(msg.get("from")) ? "user" : "assistant");
            histMsg.put("content", msg.getOrDefault("text", ""));
            formattedMessages.add(histMsg);
        }

        // Current user message
        Map<String, String> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", request.getMessage());
        formattedMessages.add(userMessage);

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", model);
        payload.put("messages", formattedMessages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        // Make the API call — do NOT catch and hide errors
        ResponseEntity<String> response;
        try {
            response = restTemplate.postForEntity(apiUrl, entity, String.class);
        } catch (Exception e) {
            System.err.println("[Bandhu AI] Provider request failed: " + e.getMessage());
            throw new RuntimeException("AI_PROVIDER_UNREACHABLE: " + e.getMessage(), e);
        }

        String body = response.getBody();
        if (body == null || body.isBlank()) {
            throw new RuntimeException("AI_PROVIDER_EMPTY_RESPONSE: Provider returned empty body");
        }

        // Parse OpenAI-format JSON response
        try {
            Map<String, Object> parsed = objectMapper.readValue(body, Map.class);

            // Check for provider-level error
            if (parsed.containsKey("error")) {
                String errorMsg = String.valueOf(parsed.get("error"));
                System.err.println("[Bandhu AI] Provider error: " + errorMsg);
                throw new RuntimeException("AI_PROVIDER_ERROR: " + errorMsg);
            }

            List<?> choices = (List<?>) parsed.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<?, ?> choice = (Map<?, ?>) choices.get(0);
                Map<?, ?> msg = (Map<?, ?>) choice.get("message");
                if (msg != null && msg.get("content") != null) {
                    return (String) msg.get("content");
                }
            }
            throw new RuntimeException("AI_PROVIDER_PARSE_ERROR: No content in response choices");
        } catch (RuntimeException e) {
            throw e; // Re-throw our own exceptions
        } catch (Exception e) {
            System.err.println("[Bandhu AI] Failed to parse provider response: " + body);
            throw new RuntimeException("AI_PROVIDER_PARSE_ERROR: " + e.getMessage(), e);
        }
    }

    /**
     * Quick health check — sends a minimal request to verify the provider is
     * reachable.
     */
    public boolean isAvailable() {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> payload = new HashMap<>();
            payload.put("model", model);
            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> msg = new HashMap<>();
            msg.put("role", "user");
            msg.put("content", "ping");
            messages.add(msg);
            payload.put("messages", messages);
            payload.put("max_tokens", 5);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            System.err.println("[Bandhu AI] Health check failed: " + e.getMessage());
            return false;
        }
    }

    public String getModel() {
        return model;
    }

    public String getApiUrl() {
        return apiUrl;
    }
}
