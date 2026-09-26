import { calculateFinancials, BUSINESS_CATEGORIES } from "../config/businessRules";
import { translations } from "../i18n";
import govData from "../data/gov_statistics.json";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const aiService = {
    generateResponse: async (message, context) => {
        const { profile, erpData, language, messages } = context;

        // Sanitize messages: strip React UI state (chips, ids) — only send string key/value pairs
        const cleanMessages = (messages || []).map(m => ({
            from: String(m.from || "user"),
            text: String(m.text || "")
        }));

        const payload = {
            message: message,
            language: language,
            conversationId: context.conversationId || ("conv_" + Date.now()),
            context: { profile, erpData },
            messages: cleanMessages
        };

        const res = await fetch(`${API_BASE}/api/v1/ai/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
            return {
                text: data.message,
                nav: null,
                chips: ["Business Plan", "Govt Schemes", "Dashboard"]
            };
        }

        // Structured error from backend — propagate it properly
        const error = new Error(data.message || "Bandhu AI is temporarily unavailable.");
        error.errorCode = data.errorCode || "UNKNOWN_ERROR";
        error.status = res.status;
        console.error("[Bandhu AI] Request failed:", data);
        throw error;
    },

    checkHealth: async () => {
        try {
            const res = await fetch(`${API_BASE}/api/v1/ai/health`);
            if (res.ok) {
                return await res.json();
            }
            return { available: false, provider: "unknown", model: "unknown" };
        } catch {
            return { available: false, provider: "unreachable", model: "unknown" };
        }
    }
};
