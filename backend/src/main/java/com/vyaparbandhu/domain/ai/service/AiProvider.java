package com.vyaparbandhu.domain.ai.service;

import com.vyaparbandhu.domain.ai.dto.ChatRequest;

public interface AiProvider {
    String generateResponse(ChatRequest request, String systemInstruction);
}
