/**
 * GraminSaathi Config & Rule Engine
 * All business logic, scheme parameters, category defaults, and financial math rules
 * are centralized here for easy maintenance and SIH hackathon demonstration.
 */

// 1. SCHEME ROUTER TIER CONSTANTS
export const SCHEME_TIERS = {
    MICRO_FINANCE: {
        id: "micro_finance",
        name: "Micro Finance Scheme (सूक्ष्म वित्त योजना)",
        shortName: "Micro Finance Scheme",
        maxProjectCost: 140000, // ₹1.40 Lakh
        financingCapRatio: 0.90, // Up to 90% financing
        maxLoanAmount: 125000,  // Max ₹1.25 Lakh
        interestRate: 6.5,      // 6.5% Annual Interest
        tenureYears: 3,         // 3 Years (36 Months)
        moratoriumMonths: 3,    // 3 Months Moratorium
        targetAudience: "Small village shops, home artisans, individual vendors",
        keyBenefits: [
            "Low 6.5% interest rate",
            "90% government backed financing",
            "No collateral required",
            "3-month initial grace period"
        ]
    },
    TERM_LOAN: {
        id: "term_loan",
        name: "Term Loan Scheme (सावधि ऋण योजना)",
        shortName: "Term Loan Scheme",
        minProjectCost: 140000,  // ₹1.40 Lakh
        maxProjectCost: 5000000, // ₹50.00 Lakh
        financingCapRatio: 0.90, // Up to 90% financing
        maxLoanAmount: 4500000,  // Max ₹45.00 Lakh
        interestRate: 8.0,      // 8.0% Annual Interest
        tenureYears: 7,         // 7 Years (84 Months)
        moratoriumMonths: 6,    // 6 Months Moratorium
        targetAudience: "Small processing units, expanded retail shops, dairy farms",
        keyBenefits: [
            "8.0% competitive interest rate",
            "Longer 7-year repayment window",
            "Up to ₹45 Lakh financing capacity",
            "6-month grace period for machine setup"
        ]
    }
};

// 2. BUSINESS CATEGORIES & SAMPLE FEASIBILITY DATA
export const BUSINESS_CATEGORIES = {
    dairy: {
        id: "dairy",
        name: "Dairy & Animal Husbandry",
        hindiName: "डेयरी एवं पशुपालन",
        icon: "🐄",
        defaultEquipment: 25000,
        defaultStock: 15000,
        defaultSetup: 10000,
        defaultWorkingCapital: 10000,
        priceRange: "₹55 - ₹65 / Liter milk, ₹320 - ₹380 / kg Paneer",
        suggestedStartingPrice: "₹60 per Liter milk, ₹340 per kg Fresh Paneer",
        competitorDensity: "Medium",
        densityBadgeColor: "yellow",
        mockPopulationReach: 2400, // estimated customers in 5-10km
        opportunities: [
            "Fresh Paneer & Curd production (Village gap: High demand during festival season)",
            "Chilled milk collection center for nearby town dairies"
        ],
        swot: {
            good: "Daily cash flow with morning/evening sales. High local demand.",
            difficult: "Requires early morning labor, feed management, and cold storage care.",
            opportunity: "Convert raw milk into Paneer/Ghee for 40% higher profit margins.",
            wrong: "Cattle health risks and sudden fodder price increases."
        },
        seasonality: [
            { month: "Jan", level: "High", score: 90 },
            { month: "Feb", level: "High", score: 85 },
            { month: "Mar", level: "Normal", score: 70 },
            { month: "Apr", level: "Normal", score: 65 },
            { month: "May", level: "Risk", score: 45 },
            { month: "Jun", level: "Risk", score: 40 },
            { month: "Jul", level: "Normal", score: 60 },
            { month: "Aug", level: "High", score: 80 },
            { month: "Sep", level: "High", score: 85 },
            { month: "Oct", level: "High", score: 95 },
            { month: "Nov", level: "High", score: 95 },
            { month: "Dec", level: "High", score: 90 }
        ]
    },
    tailoring: {
        id: "tailoring",
        name: "Tailoring & Garments",
        hindiName: "सिलाई एवं कपड़े",
        icon: "🧵",
        defaultEquipment: 18000,
        defaultStock: 12000,
        defaultSetup: 8000,
        defaultWorkingCapital: 7000,
        priceRange: "₹120 - ₹350 per alteration/blouse, ₹450 - ₹1200 per suit",
        suggestedStartingPrice: "₹180 for standard tailoring, ₹500 for full dress stitching",
        competitorDensity: "Low",
        densityBadgeColor: "green",
        mockPopulationReach: 3100,
        opportunities: [
            "School uniform stitching contract for local block schools",
            "Ready-made festival kids clothing & embroidery services"
        ],
        swot: {
            good: "Low capital requirement; work can be done from home.",
            difficult: "Peak workload during wedding & festival seasons; slow in monsoon.",
            opportunity: "Tie up with school administration & local cloth merchants.",
            wrong: "Design trend shifts and competition from low-cost ready-mades."
        },
        seasonality: [
            { month: "Jan", level: "Normal", score: 60 },
            { month: "Feb", level: "Normal", score: 65 },
            { month: "Mar", level: "High", score: 85 },
            { month: "Apr", level: "High", score: 90 },
            { month: "May", level: "High", score: 95 },
            { month: "Jun", level: "Risk", score: 40 },
            { month: "Jul", level: "Risk", score: 35 },
            { month: "Aug", level: "Normal", score: 65 },
            { month: "Sep", level: "High", score: 80 },
            { month: "Oct", level: "High", score: 100 },
            { month: "Nov", level: "High", score: 100 },
            { month: "Dec", level: "High", score: 85 }
        ]
    },
    grocery: {
        id: "grocery",
        name: "Grocery & Kirana Store",
        hindiName: "किराना दुकान",
        icon: "🛒",
        defaultEquipment: 30000,
        defaultStock: 45000,
        defaultSetup: 15000,
        defaultWorkingCapital: 10000,
        priceRange: "Average customer spend ₹150 - ₹400 per visit",
        suggestedStartingPrice: "MRP with 8-15% retail margin on daily essentials",
        competitorDensity: "High",
        densityBadgeColor: "red",
        mockPopulationReach: 4200,
        opportunities: [
            "Home delivery for elderly households & digital payments via UPI",
            "Bulk packaging of local spices & pulses under your own brand"
        ],
        swot: {
            good: "Constant daily essential demand regardless of economic weather.",
            difficult: "Requires tight inventory control and handling village credit (udhaar).",
            opportunity: "Stock fast-moving regional snacks & mobile recharge/micro-banking.",
            wrong: "Inventory spoilage and cash flow blockage due to pending credits."
        },
        seasonality: [
            { month: "Jan", level: "High", score: 85 },
            { month: "Feb", level: "Normal", score: 75 },
            { month: "Mar", level: "High", score: 80 },
            { month: "Apr", level: "Normal", score: 75 },
            { month: "May", level: "Normal", score: 70 },
            { month: "Jun", level: "Normal", score: 70 },
            { month: "Jul", level: "Normal", score: 70 },
            { month: "Aug", level: "High", score: 85 },
            { month: "Sep", level: "High", score: 85 },
            { month: "Oct", level: "High", score: 95 },
            { month: "Nov", level: "High", score: 95 },
            { month: "Dec", level: "High", score: 90 }
        ]
    },
    snacks: {
        id: "snacks",
        name: "Snacks & Food Processing",
        hindiName: "नाश्ता एवं खाद्य प्रसंस्करण",
        icon: "🍲",
        defaultEquipment: 20000,
        defaultStock: 15000,
        defaultSetup: 10000,
        defaultWorkingCapital: 8000,
        priceRange: "₹10 - ₹40 per dish/pack (Samosa, Namkeen, Poha)",
        suggestedStartingPrice: "₹15 per Samosa/Tea combo, ₹120/kg fresh Namkeen",
        competitorDensity: "Medium",
        densityBadgeColor: "yellow",
        mockPopulationReach: 2800,
        opportunities: [
            "Hygienic packed Namkeen/Mathri for weekly village haat markets",
            "Morning tea & fresh breakfast point near bus stand or panchayat center"
        ],
        swot: {
            good: "Very high gross profit margin (35% to 50%) on prepared items.",
            difficult: "Strict cleanliness required; daily raw material prep needed.",
            opportunity: "Supply snacks in sealed packs to nearby small kirana stores.",
            wrong: "Raw oil/gas price fluctuations and perishable wastage."
        },
        seasonality: [
            { month: "Jan", level: "High", score: 95 },
            { month: "Feb", level: "High", score: 85 },
            { month: "Mar", level: "Normal", score: 70 },
            { month: "Apr", level: "Normal", score: 65 },
            { month: "May", level: "Risk", score: 50 },
            { month: "Jun", level: "Risk", score: 45 },
            { month: "Jul", level: "High", score: 80 },
            { month: "Aug", level: "High", score: 85 },
            { month: "Sep", level: "Normal", score: 75 },
            { month: "Oct", level: "High", score: 90 },
            { month: "Nov", level: "High", score: 90 },
            { month: "Dec", level: "High", score: 95 }
        ]
    },
    handicrafts: {
        id: "handicrafts",
        name: "Handicrafts & Artisans",
        hindiName: "हस्तशिल्प एवं कारीगरी",
        icon: "🎨",
        defaultEquipment: 12000,
        defaultStock: 18000,
        defaultSetup: 6000,
        defaultWorkingCapital: 6000,
        priceRange: "₹80 - ₹800 per item (Pottery, Baskets, Jute items)",
        suggestedStartingPrice: "₹150 for handcrafted home decor item",
        competitorDensity: "Low",
        densityBadgeColor: "green",
        mockPopulationReach: 1800,
        opportunities: [
            "Selling online via government rural e-marketplaces (ONDC / TRIFED)",
            "Custom decorative items for festive exhibitions & wedding return gifts"
        ],
        swot: {
            good: "Unique cultural identity; zero dependence on expensive machines.",
            difficult: "Finding steady bulk buyers outside the immediate village.",
            opportunity: "Link with SHG (Self Help Group) clusters for export orders.",
            wrong: "Cheap plastic alternatives undercutting traditional crafts."
        },
        seasonality: [
            { month: "Jan", level: "Normal", score: 65 },
            { month: "Feb", level: "Normal", score: 65 },
            { month: "Mar", level: "Normal", score: 60 },
            { month: "Apr", level: "Risk", score: 45 },
            { month: "May", level: "Risk", score: 40 },
            { month: "Jun", level: "Risk", score: 35 },
            { month: "Jul", level: "Normal", score: 55 },
            { month: "Aug", level: "High", score: 85 },
            { month: "Sep", level: "High", score: 90 },
            { month: "Oct", level: "High", score: 100 },
            { month: "Nov", level: "High", score: 95 },
            { month: "Dec", level: "High", score: 80 }
        ]
    }
};

// 3. FINANCIAL CALCULATOR & EXACT MATHEMATICAL ENGINE (MODULE 2)
/**
 * Calculates Project Capacity, Max Financing Cap, Loan Need Gap, Scheme Tier,
 * Safe Borrowing Recommendation, and EMI Amortization Schedule.
 */
export function calculateFinancials({ ownCapital = 0, equipment = 0, stock = 0, setup = 0, workingCapital = 0, subsidy = 0, moratoriumOption = "interest_only" }) {
    const capital = Math.max(0, Number(ownCapital) || 0);
    const eq = Math.max(0, Number(equipment) || 0);
    const st = Math.max(0, Number(stock) || 0);
    const se = Math.max(0, Number(setup) || 0);
    const wc = Math.max(0, Number(workingCapital) || 0);
    const sub = Math.max(0, Number(subsidy) || 0);

    // 10% Margin Capital Rule: Max Project Cost Capacity = Own Capital / 0.10
    const maxProjectCostCapacity = capital > 0 ? capital / 0.10 : 0;

    // 90% Max Financing Cap
    const maxFinancingCapacity = maxProjectCostCapacity * 0.90;

    // Actual Need calculated from explicit breakdown
    const actualNeed = eq + st + se + wc;

    // Net Need after applying government grant/subsidy
    const netNeedAfterSubsidy = Math.max(0, actualNeed - sub);

    // Loan Need Gap = Net Need - Own Capital
    const loanNeedGap = Math.max(0, netNeedAfterSubsidy - capital);

    // Determine Loan Need Category & Color
    let loanDecisionCategory = "no_loan";
    let loanDecisionText = "No loan needed (कोई लोन की आवश्यकता नहीं)";
    let loanDecisionBadge = "green";

    if (loanNeedGap > 0) {
        if (capital >= netNeedAfterSubsidy * 0.70) {
            loanDecisionCategory = "small_loan";
            loanDecisionText = "Small loan needed (छोटे लोन की आवश्यकता)";
            loanDecisionBadge = "yellow";
        } else {
            loanDecisionCategory = "full_loan";
            loanDecisionText = "Loan needed (ऋण की आवश्यकता)";
            loanDecisionBadge = "orange";
        }
    }

    // Scheme Router Tier Determination:
    // Base tier on the higher of actual project cost or minimum threshold
    const projectCostForScheme = actualNeed > 0 ? actualNeed : maxProjectCostCapacity;
    let selectedScheme = SCHEME_TIERS.MICRO_FINANCE;

    if (projectCostForScheme > SCHEME_TIERS.MICRO_FINANCE.maxProjectCost) {
        selectedScheme = SCHEME_TIERS.TERM_LOAN;
    }

    // Safe Borrowing Engine Recommendation:
    // Recommend borrowing ONLY what is needed (loanNeedGap), capped by scheme maximum
    const maxAllowedByScheme = Math.min(
        selectedScheme.maxLoanAmount,
        projectCostForScheme * selectedScheme.financingCapRatio
    );

    const recommendedBorrowing = Math.min(loanNeedGap, maxAllowedByScheme);

    // Exact EMI & Amortization Schedule Calculation
    const annualRate = selectedScheme.interestRate;
    const monthlyRate = annualRate / 100 / 12;
    const totalTenureMonths = selectedScheme.tenureYears * 12;
    const moratoriumMonths = selectedScheme.moratoriumMonths;
    const repaymentMonths = Math.max(1, totalTenureMonths - moratoriumMonths);

    let standardEMI = 0;
    let moratoriumMonthlyPayment = 0;

    if (recommendedBorrowing > 0) {
        // Standard Amortization Formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
        if (monthlyRate > 0) {
            standardEMI = (recommendedBorrowing * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
                (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
        } else {
            standardEMI = recommendedBorrowing / repaymentMonths;
        }

        if (moratoriumOption === "interest_only") {
            // Pay interest only during moratorium
            moratoriumMonthlyPayment = recommendedBorrowing * monthlyRate;
        } else {
            // Deferred: 0 payment during moratorium
            moratoriumMonthlyPayment = 0;
        }
    }

    const totalRepaymentDuringMoratorium = moratoriumMonthlyPayment * moratoriumMonths;
    const totalRepaymentRegular = standardEMI * repaymentMonths;
    const totalTotalPaid = totalRepaymentDuringMoratorium + totalRepaymentRegular;
    const totalInterestPaid = Math.max(0, totalTotalPaid - recommendedBorrowing);

    return {
        capital,
        actualNeed,
        subsidy: sub,
        netNeedAfterSubsidy,
        maxProjectCostCapacity,
        maxFinancingCapacity,
        loanNeedGap,
        loanDecisionCategory,
        loanDecisionText,
        loanDecisionBadge,
        selectedScheme,
        maxAllowedByScheme,
        recommendedBorrowing,
        annualRate,
        tenureYears: selectedScheme.tenureYears,
        totalTenureMonths,
        moratoriumMonths,
        repaymentMonths,
        standardEMI: Math.round(standardEMI),
        moratoriumMonthlyPayment: Math.round(moratoriumMonthlyPayment),
        totalInterestPaid: Math.round(totalInterestPaid),
        totalTotalPaid: Math.round(totalTotalPaid),
        moratoriumOption
    };
}

// 4. MOCK GOVERNMENT SCHEMES LIST (MODULE 3)
export const GOVERNMENT_SCHEMES_LIST = [
    {
        id: "mudra_kishor",
        name: "PMMY - MUDRA (Kishor / Tarun)",
        hindiName: "प्रधानमंत्री मुद्रा योजना",
        category: "general",
        maxLoan: "₹50,000 - ₹10,000,00",
        subsidy: "Up to 15-25% margin support",
        interest: "7.5% - 8.5%",
        eligibility: "Any rural artisan, shopkeeper, or micro-trader. Age 18+.",
        documents: ["Aadhaar Card", "PAN / Voter ID", "Bank Passbook", "Business Plan Note"],
        officialLink: "https://www.mudra.org.in/"
    },
    {
        id: "pmegp",
        name: "PMEGP (PM Employment Generation Programme)",
        hindiName: "प्रधानमंत्री रोजगार सृजन कार्यक्रम",
        category: "manufacturing_service",
        maxLoan: "Up to ₹50 Lakh (Manufacturing) / ₹20 Lakh (Service)",
        subsidy: "25% - 35% Capital Subsidy for Rural areas",
        interest: "8.0% standard bank rate",
        eligibility: "Educational qualification 8th pass for projects > ₹10L. Rural residents.",
        documents: ["Aadhaar", "Cast Certificate (for higher subsidy)", "Project Report", "EDP Training Certificate"],
        officialLink: "https://www.kviconline.gov.in/pmegp/"
    },
    {
        id: "lakhpati_didi",
        name: "Lakhpati Didi SHG Micro Enterprise",
        hindiName: "लखपति दीदी योजना (स्वयं सहायता समूह)",
        category: "women_shg",
        maxLoan: "Up to ₹5,00,000 collateral-free",
        subsidy: "0% - 3% Interest Subvention for prompt repayment",
        interest: "4.0% effective interest rate",
        eligibility: "Women members of active Self Help Groups (SHG) in rural villages.",
        documents: ["SHG Resolution Note", "Aadhaar Card", "Bank Account Details"],
        officialLink: "https://nrlm.gov.in/"
    },
    {
        id: "standup_india",
        name: "Stand-Up India Scheme",
        hindiName: "स्टैंड-अप इंडिया योजना",
        category: "sc_st_women",
        maxLoan: "₹10 Lakh to ₹1 Crore",
        subsidy: "Credit Guarantee Support + Low Margin Money",
        interest: "Lowest applicable bank rate",
        eligibility: "SC/ST and/or Woman entrepreneur setting up greenfield enterprise.",
        documents: ["Category Certificate", "Proof of Premises", "Bank Statements", "Project Blueprint"],
        officialLink: "https://www.standupmitra.in/"
    }
];

// 5. EXISTING BUSINESS HEALTH CALCULATOR
export function calculateBusinessHealth(monthlySales = 0, monthlyExpenses = 0, cashBufferMonths = 1) {
    const sales = Math.max(0, Number(monthlySales) || 0);
    const expenses = Math.max(0, Number(monthlyExpenses) || 0);
    const profit = sales - expenses;

    if (sales === 0) {
        return {
            profit: 0,
            marginPercent: 0,
            score: 50,
            status: "Neutral",
            statusColor: "yellow",
            alerts: ["Enter your sales to calculate your business health score."]
        };
    }

    const marginPercent = Math.round((profit / sales) * 100);
    let score = 50;
    const alerts = [];

    // Profit Margin Component (40 points)
    if (marginPercent >= 25) score += 35;
    else if (marginPercent >= 15) score += 25;
    else if (marginPercent > 0) score += 15;
    else {
        score -= 20;
        alerts.push("⚠️ Alert: Expenses exceed income! You are currently operating at a loss.");
    }

    // Cash Buffer Component (30 points)
    if (cashBufferMonths >= 3) score += 25;
    else if (cashBufferMonths >= 2) score += 15;
    else alerts.push("💡 Tip: Try building a 2-3 month cash reserve for low season months.");

    // Sales Volume & Stability (30 points)
    if (sales >= 40000) score += 25;
    else if (sales >= 20000) score += 15;

    score = Math.max(10, Math.min(99, score));

    let status = "Healthy";
    let statusColor = "green";

    if (score < 45) {
        status = "Needs Attention";
        statusColor = "red";
    } else if (score < 70) {
        status = "Stable & Growing";
        statusColor = "yellow";
    }

    return {
        profit,
        marginPercent,
        score,
        status,
        statusColor,
        alerts
    };
}
