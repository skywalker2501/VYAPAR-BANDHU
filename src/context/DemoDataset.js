// Centralized Offline Mock File ensuring Demo Fallbacks never bleed into Live Data securely
export const DemoDataset = {
    businessProfile: {
        name: "Vyapar Bandhu Demo Dairy",
        businessType: "Dairy Farm",
        location: "Example rural/semi-urban location",
        ownCapital: 100000,
        requiredCapital: 600000,
        status: "ACTIVE"
    },
    marketFeasibility: {
        demand: "HIGH",
        competition: "MEDIUM",
        swot: { strengths: "Local sourcing", weaknesses: "Logistics scale", opportunities: "Government Subsidies", threats: "Seasonal shifts" },
        pmv: "High Margin Potential",
        seasonality: "Steady year-round",
        confidence: "HIGH"
    },
    financialCalculation: {
        projectCapacity: 1000000, // Capital / 0.10 margin standard rule
        totalInvestmentNeeded: 600000,
        workingCapitalGap: 50000,
        breakEvenMonths: 8
    },
    loanNeedAssessment: {
        actualGap: 500000,
        recommendation: "PARTIAL_LOAN_REQUIRED",
        explanation: "Based on ₹1,00,000 available capital against ₹6,00,000 requirement, an exact external gap of ₹5,00,000 stands."
    },
    governmentBenefits: [
        {
            id: "MOCK_SCHEME_1",
            scheme_name: "Dairy Entrepreneurship Scheme",
            loan_percentage: 25, // Subsidy portion
            max_loan: 2500000,
            interest_rate: "5.5%",
            status: "VERIFIED"
        }
    ],
    erp: {
        dashboard: {
            totalRevenue: 45000,
            totalExpenses: 28000,
            grossProfit: 17000,
            netProfit: 9500, // minus EMI
            cashBalance: 120000, // capital + net
            totalInventoryValue: 85000,
            totalLoanOutstanding: 450000,
            monthlyGrowth: "15%"
        },
        healthScore: {
            overallScore: 82.5,
            activeWarnings: ["HIGH EXPENSES"],
            revenueHealth: { score: 90.0, reason: "Consistent Sales", recommendedAction: "Maintain distribution" },
            cashFlowHealth: { score: 85.0, reason: "Solid buffer reserves", recommendedAction: "Keep monitoring payables" },
            inventoryHealth: { score: 70.0, reason: "High fodder storage", recommendedAction: "Optimize shelf life" },
            repaymentHealth: { score: 95.0, reason: "EMIs bounded securely below 30% margin", recommendedAction: "Maintain EMI clearance" },
            growthHealth: { score: 72.5, reason: "15% MOM Growth", recommendedAction: "Invest into cold chain logistics" }
        }
    }
};
