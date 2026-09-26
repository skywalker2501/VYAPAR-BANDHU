const speechLocales = {
    en: "en-IN",
    hi: "hi-IN",
    mr: "mr-IN",
    ta: "ta-IN",
    te: "te-IN",
    bn: "bn-IN",
    gu: "gu-IN",
    kn: "kn-IN"
};

class SpeechService {
    constructor() {
        // Handle browser prefixes
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = null;
        this.isSupported = !!this.SpeechRecognition;
    }

    startListening(languageCode, onResult, onError, onEnd) {
        if (!this.isSupported) {
            onError("Speech Recognition API is not supported in this browser.");
            return;
        }

        if (this.recognition) {
            this.stopListening();
        }

        try {
            this.recognition = new this.SpeechRecognition();
            this.recognition.lang = speechLocales[languageCode] || "en-IN";
            this.recognition.continuous = false; // Stop automatically when user stops speaking
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (onResult) onResult(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                let message = "error.speech.unrecognized";
                if (event.error === 'not-allowed') {
                    message = "error.speech.notAllowed";
                }
                if (onError) onError(message, event.error);
            };

            this.recognition.onend = () => {
                if (onEnd) onEnd();
            };

            this.recognition.start();

        } catch (err) {
            console.error("Failed to start speech recognition:", err);
            if (onError) onError("error.speech.failedStart", "unknown");
        }
    }

    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {
                console.error("Error stopping recognition", e);
            }
            this.recognition = null;
        }
    }
}

export const speechService = new SpeechService();
