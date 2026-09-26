import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useLanguage } from "../context/LanguageContext";
import { calculateBusinessHealth } from "../config/businessRules";
import {
    TrendingUp, AlertTriangle, CheckSquare, Square,
    ShieldCheck, DollarSign, Bell
} from "lucide-react";

export default function DashboardExisting() {
    const { profile, updateProfileField, triggerVoiceModal } = useApp();
    const { t } = useLanguage();
    const health = calculateBusinessHealth(profile.currentMonthlyIncome, profile.currentMonthlyExpenses, 2);
    const [salesTrend, setSalesTrend] = useState("declining");

    const [actions, setActions] = useState([
        { id: 1, title: t("dash.action.upiTitle"), sub: t("dash.action.upiSub"), done: true, priority: "high" },
        { id: 2, title: t("dash.action.marginTitle"), sub: t("dash.action.marginSub"), done: false, priority: "high" },
        { id: 3, title: t("dash.action.creditTitle"), sub: t("dash.action.creditSub"), done: false, priority: "medium" },
        { id: 4, title: t("dash.action.mudraTitle"), sub: t("dash.action.mudraSub"), done: false, priority: "medium" },
    ]);

    const toggle = (id) => setActions((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));

    const scoreColor = health.score >= 70 ? "#2E7D52" : health.score >= 45 ? "#E89B1C" : "#DC2626";

    return (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 animate-fade-up">
            {/* Header */}
            <div className="card-warm p-6 flex items-center gap-3">
                <span className="text-4xl">🏬</span>
                <div>
                    <h1 className="font-heading text-xl font-extrabold text-charcoal-600">{t("dash.title")}</h1>
                    <p className="text-xs text-charcoal-300 font-body">{t("dash.sub")}</p>
                </div>
            </div>

            {/* Early warning */}
            <div className="space-y-2">
                <div className="flex items-center justify-between px-1 text-xs font-body">
                    <span className="font-bold text-red-500 flex items-center gap-1"><Bell className="w-3.5 h-3.5 animate-bounce" /> {t("dash.warning.title")}</span>
                    <button onClick={() => setSalesTrend(salesTrend === "declining" ? "growing" : "declining")}
                        className="text-charcoal-300 hover:text-charcoal-500 underline">
                        {salesTrend === "declining" ? t("dash.warning.statusGrowing") : t("dash.warning.statusDeclining")}
                    </button>
                </div>

                {salesTrend === "declining" ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-heading font-bold text-red-600">{t("dash.warning.declineTitle")}</h4>
                            <p className="text-xs text-charcoal-400 font-body mt-0.5">{t("dash.warning.declineSub")}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-forest-500/5 border border-forest-400/20 rounded-2xl p-4 flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-forest-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-heading font-bold text-forest-600">{t("dash.warning.growTitle")}</h4>
                            <p className="text-xs text-charcoal-400 font-body mt-0.5">{t("dash.warning.growSub")}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Sales inputs + health gauge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 card-warm p-5 space-y-4">
                    <h3 className="font-heading text-sm font-bold text-charcoal-500 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-forest-500" /> {t("dash.incomeTitle")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-charcoal-300 mb-1 font-body">{t("dash.monthlySales")}</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-forest-500 font-bold text-sm">₹</span>
                                <input type="number" value={profile.currentMonthlyIncome}
                                    onChange={(e) => updateProfileField("currentMonthlyIncome", Number(e.target.value))}
                                    className="w-full bg-warmgray-100 border border-warmgray-200 rounded-xl pl-7 pr-3 py-2.5 text-charcoal-600 font-bold text-base font-body focus:outline-none focus:ring-2 focus:ring-terra-500/20"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-charcoal-300 mb-1 font-body">{t("dash.monthlyExpenses")}</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-red-500 font-bold text-sm">₹</span>
                                <input type="number" value={profile.currentMonthlyExpenses}
                                    onChange={(e) => updateProfileField("currentMonthlyExpenses", Number(e.target.value))}
                                    className="w-full bg-warmgray-100 border border-warmgray-200 rounded-xl pl-7 pr-3 py-2.5 text-charcoal-600 font-bold text-base font-body focus:outline-none focus:ring-2 focus:ring-terra-500/20"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-cream-100 p-3 rounded-2xl border border-warmgray-200 flex items-center justify-between text-xs font-body">
                        <div>
                            <span className="text-charcoal-300">{t("dash.netProfit")}:</span>
                            <p className="text-lg font-heading font-extrabold text-forest-600">₹{health.profit.toLocaleString("en-IN")} ({health.marginPercent}%)</p>
                        </div>
                        <div className="text-right">
                            <span className="text-charcoal-300">{t("dash.annual")}:</span>
                            <p className="text-sm font-bold text-charcoal-600 font-heading">₹{(health.profit * 12).toLocaleString("en-IN")}</p>
                        </div>
                    </div>
                </div>

                {/* Circular gauge */}
                <div className="card-warm p-5 flex flex-col items-center justify-center text-center space-y-2">
                    <span className="text-xs font-bold text-charcoal-300 uppercase tracking-wider font-body">{t("dash.healthScore")}</span>
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#EDE5D8" strokeWidth="10" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke={scoreColor} strokeWidth="10"
                                strokeDasharray={`${health.score * 3.14} 1000`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-heading font-extrabold text-charcoal-600">{health.score}</span>
                            <span className="text-[10px] text-charcoal-300 font-body">/100</span>
                        </div>
                    </div>
                    <span className={`badge border ${health.statusColor === "green" ? "bg-forest-500/10 text-forest-600 border-forest-400/30" : health.statusColor === "yellow" ? "bg-marigold-500/10 text-marigold-600 border-marigold-400/30" : "bg-red-50 text-red-600 border-red-200"}`}>
                        {t(`dash.healthStatus.${health.statusColor}`) || health.status}
                    </span>
                </div>
            </div>

            {/* Action cards */}
            <div className="card-warm p-6 space-y-4">
                <h3 className="font-heading text-base font-bold text-charcoal-600 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-forest-500" /> {t("dash.actionTitle")}
                </h3>
                <div className="space-y-2.5">
                    {actions.map((a) => (
                        <div key={a.id} onClick={() => toggle(a.id)}
                            className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all active:scale-[0.98] ${a.done ? "bg-warmgray-100 border-warmgray-200 opacity-70" : "bg-white border-warmgray-200 shadow-warm-sm hover:shadow-warm"
                                }`}>
                            {a.done ? <CheckSquare className="w-5 h-5 text-forest-500 shrink-0 mt-0.5" /> : <Square className="w-5 h-5 text-charcoal-300 shrink-0 mt-0.5" />}
                            <div className="flex-1">
                                <h4 className={`text-sm font-heading font-bold ${a.done ? "line-through text-charcoal-300" : "text-charcoal-600"}`}>{a.title}</h4>
                                <p className="text-xs text-charcoal-300 font-body mt-0.5">{a.sub}</p>
                            </div>
                            {a.priority === "high" && !a.done && (
                                <span className="badge bg-red-50 text-red-500 border border-red-200 text-[10px]">{t("dash.priorityHigh")}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
