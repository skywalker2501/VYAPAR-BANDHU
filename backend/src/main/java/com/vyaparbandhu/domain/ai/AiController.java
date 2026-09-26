package com.vyaparbandhu.domain.ai;

import com.vyaparbandhu.domain.ai.dto.ChatRequest;
import com.vyaparbandhu.domain.ai.dto.ChatResponse;
import com.vyaparbandhu.domain.ai.service.PollinationsProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private final PollinationsProvider aiProvider;

    public AiController(@Qualifier("pollinationsProvider") PollinationsProvider aiProvider) {
        this.aiProvider = aiProvider;
    }

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody ChatRequest request) {
        String lang = request.getLanguage() != null ? request.getLanguage() : "en";

        String systemInstruction = "You are Bandhu AI, the conversational business companion inside Vyapar Bandhu.\n\n"
                + "Understand the user's actual question and answer it directly.\n\n"
                + "Do not require predefined questions.\n\n"
                + "Users may ask questions in natural language, ask follow-up questions, describe problems, "
                + "request plans, request explanations, or ask unexpected business-related questions.\n\n"
                + "Use available user and business context when relevant.\n\n"
                + "Ask clarifying questions only when necessary.\n\n"
                + "Give practical and actionable answers.\n\n"
                + "Do not invent government schemes, eligibility rules, subsidies, interest rates, "
                + "market statistics, or financial calculations.\n\n"
                + "Use verified data and deterministic tools when required.\n\n"
                + "Clearly distinguish verified facts, user-provided information, estimates, and AI analysis.\n\n"
                + "Always respond in the user's selected application language: " + lang + ".\n";

        try {
            String resultText = aiProvider.generateResponse(request, systemInstruction);

            ChatResponse response = new ChatResponse();
            response.setSuccess(true);
            response.setMessage(resultText);
            response.setLanguage(lang);
            response.setConversationId(
                    request.getConversationId() != null ? request.getConversationId()
                            : UUID.randomUUID().toString());
            response.setSources(new ArrayList<>());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            String errorCode = "AI_PROVIDER_ERROR";
            String errorMessage = e.getMessage();

            if (errorMessage != null) {
                if (errorMessage.startsWith("AI_PROVIDER_UNREACHABLE:")) {
                    errorCode = "AI_PROVIDER_UNREACHABLE";
                } else if (errorMessage.startsWith("AI_PROVIDER_PARSE_ERROR:")) {
                    errorCode = "AI_PROVIDER_PARSE_ERROR";
                } else if (errorMessage.startsWith("AI_PROVIDER_ERROR:")) {
                    errorCode = "AI_PROVIDER_ERROR";
                }
            }

            System.err.println("[Bandhu AI] Chat request failed: " + errorMessage);

            return ResponseEntity.status(502).body(Map.of(
                    "success", false,
                    "errorCode", errorCode,
                    "message", "Bandhu AI is temporarily unavailable. Please try again.",
                    "details", errorMessage != null ? errorMessage : "Unknown error"));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        boolean available = aiProvider.isAvailable();
        return ResponseEntity.ok(Map.of(
                "available", available,
                "provider", "pollinations",
                "model", aiProvider.getModel(),
                "endpoint", aiProvider.getApiUrl()));
    }
}
