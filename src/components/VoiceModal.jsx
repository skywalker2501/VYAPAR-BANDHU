import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { speechService } from "../services/speechService";
import { Mic, X, Volume2, RefreshCw, Sparkles, CheckCircle } from "lucide-react";

export default function VoiceModal() {
    const { isVoiceActive, setIsVoiceActive, lastVoicePrompt, language } = useApp();
    const { t } = useLanguage();
    const [phase, setPhase] = useState("listening"); // listening, processing, done, error
    const [transcript, setTranscript] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const samples = [
        t("q.businessType"),
        t("q.capital"),
        t("q.location")
    ];

    useEffect(() => {
        if (isVoiceActive) {
            setPhase("listening");
            setTranscript("");
            setErrorMessage("");

            speechService.startListening(
                language,
                (text) => {
                    setTranscript(text);
                    setPhase("done");
                },
                (err) => {
                    setErrorMessage(t(err));
                    setPhase("error");
                },
                () => {
                    if (phase === "listening") setPhase("error");
                }
            );

            return () => speechService.stopListening();
        }
    }, [isVoiceActive, language]);

    if (!isVoiceActive) return null;

    return (
        <div className="fixed inset-0 z-50 bg-charcoal-700/50 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in">
            <div className="bg-white rounded-4xl p-6 max-w-md w-full shadow-warm-lg relative border border-warmgray-200">
                <button
                    onClick={() => setIsVoiceActive(false)}
                    className="absolute top-4 right-4 p-2 text-charcoal-300 hover:text-charcoal-500 rounded-full bg-warmgray-100 hover:bg-warmgray-200 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Mic icon */}
                <div className="text-center mb-5">
                    <div className="w-20 h-20 rounded-full bg-terra-500/10 border-2 border-terra-500/30 flex items-center justify-center mx-auto mb-3">
                        {phase === "listening" ? (
                            <Mic className="w-9 h-9 text-terra-500 animate-pulse" />
                        ) : (
                            <CheckCircle className="w-9 h-9 text-forest-500" />
                        )}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-charcoal-600">
                        {phase === "listening" && t("voice.listening")}
                        {phase === "processing" && t("voice.understanding")}
                        {phase === "done" && "✓"}
                        {phase === "error" && t("voice.error")}
                    </h3>
                    <p className="text-sm text-charcoal-300 mt-1">{lastVoicePrompt || t("voice.tapToSpeak")}</p>
                </div>

                {/* Wave */}
                {phase === "listening" && (
                    <div className="flex items-center justify-center gap-1.5 py-4 mb-4">
                        {[6, 10, 14, 10, 6].map((h, i) => (
                            <span
                                key={i}
                                className="rounded-full bg-terra-500 animate-bounce"
                                style={{
                                    width: 6, height: h * 2.5,
                                    animationDelay: `${i * 0.12}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Transcript */}
                {transcript && (
                    <div className="bg-cream-100 rounded-2xl p-4 border border-terra-500/20 mb-5">
                        <p className="text-xs text-terra-500 font-semibold uppercase tracking-wider mb-1 font-body">
                            {t("voice.youSaid")}
                        </p>
                        <p className="text-base text-charcoal-600 font-medium font-body">"{transcript}"</p>
                    </div>
                )}

                {/* Quick samples */}
                <p className="text-xs text-charcoal-300 mb-2 font-body font-medium">{t("voice.orChoose")}</p>
                <div className="space-y-2 mb-5">
                    {samples.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => { setPhase("done"); setTranscript(s); }}
                            className="w-full text-left p-3 rounded-2xl bg-warmgray-100 hover:bg-warmgray-200 border border-warmgray-200 text-xs text-charcoal-400 hover:text-charcoal-600 transition-all flex items-center justify-between group"
                        >
                            <span>{s}</span>
                            <Sparkles className="w-3.5 h-3.5 text-warmgray-300 group-hover:text-terra-500 transition-colors" />
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={() => { setPhase("listening"); setTranscript(""); setErrorMessage(""); }}
                        className="btn-subtle flex-1 flex items-center justify-center gap-2 text-sm"
                    >
                        <RefreshCw className="w-4 h-4" /> {t("phrase.speakShort")}
                    </button>
                    <button onClick={() => setIsVoiceActive(false)} className="btn-primary flex-1 text-sm">
                        {t("btn.continue")} →
                    </button>
                </div>
            </div>
        </div>
    );
}
