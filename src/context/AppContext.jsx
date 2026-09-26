import React, { createContext, useContext, useState } from "react";
import { BUSINESS_CATEGORIES } from "../config/businessRules";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Authentication & Onboarding
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNewUser, setIsNewUser] = useState(true);

    // Base Navigation State
    const [activeScreen, setActiveScreen] = useState("home"); // home, intake, feasibility, finance, schemes, dashboard, experts, records, chat
    const [intentGoal, setIntentGoal] = useState("start");

    // App Config
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [lastVoicePrompt, setLastVoicePrompt] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false); // Floating chat bubble state
    const [isDemoMode, setIsDemoMode] = useState(false); // Fallback Offline Flag

    React.useEffect(() => {
        const handleDemoFallback = () => setIsDemoMode(true);
        window.addEventListener('NETWORK_FALLBACK_DEMO', handleDemoFallback);
        return () => window.removeEventListener('NETWORK_FALLBACK_DEMO', handleDemoFallback);
    }, []);

    // User Profile (Multi-Business Paradigm)
    const [businesses, setBusinesses] = useState([
        {
            id: "b_default",
            phone: "",
            name: "",
            location: "",
            businessCategoryKey: "dairy",
            businessType: "new",
            businessSize: "micro",
            products: "",
            ownCapital: 25000,
            currentMonthlyIncome: 12000,
            currentMonthlyExpenses: 8000,
            hasExistingLoan: false,
            existingLoanAmount: 0,
            equipmentCost: 25000,
            stockCost: 15000,
            setupCost: 10000,
            workingCapitalCost: 10000,
            grantSubsidy: 0,
            moratoriumOption: "interest_only",
        }
    ]);
    const [currentBusinessId, setCurrentBusinessId] = useState("b_default");

    const profile = businesses.find(b => b.id === currentBusinessId) || businesses[0];

    // Micro-ERP Data (Simulated Database)
    const [erpData, setErpData] = useState({
        sales: [
            { id: 1, date: "2023-10-01", item: "दूध (Milk)", qty: 20, unit: "L", amount: 1000 },
            { id: 2, date: "2023-10-02", item: "पनीर (Paneer)", qty: 5, unit: "kg", amount: 1500 },
        ],
        purchases: [
            { id: 1, date: "2023-10-01", category: "stock", item: "पशु चारा (Cattle Feed)", amount: 1200 },
            { id: 2, date: "2023-10-03", category: "utilities", item: "बिजली बिल (Electricity)", amount: 500 },
        ],
        inventory: [
            { id: 1, item: "दूध के डिब्बे (Milk Cans)", qty: 5, threshold: 2 },
            { id: 2, item: "चारा बैग (Feed Bags)", qty: 1, threshold: 3 }, // low stock
        ],
        contacts: [
            { id: 1, type: "customer", name: "सुरेश किराना", phone: "9876543210" },
            { id: 2, type: "supplier", name: "रामू चारा भंडार", phone: "9123456789" },
        ],
        ledgers: [
            { id: 1, type: "receivable", name: "सुरेश किराना", amount: 500, dueDate: "2023-10-10", settled: false },
            { id: 2, type: "payable", name: "रामू चारा भंडार", amount: 1200, dueDate: "2023-10-05", settled: true },
        ]
    });

    const selectBusinessCategory = (catKey) => {
        const cat = BUSINESS_CATEGORIES[catKey] || { defaultEquipment: 0, defaultStock: 0, defaultSetup: 0, defaultWorkingCapital: 0 };
        setBusinesses((prev) => prev.map(b => b.id === currentBusinessId ? {
            ...b,
            businessCategoryKey: catKey,
            equipmentCost: cat.defaultEquipment,
            stockCost: cat.defaultStock,
            setupCost: cat.defaultSetup,
            workingCapitalCost: cat.defaultWorkingCapital,
        } : b));
    };

    const updateProfileField = (field, value) => {
        setBusinesses((prev) => prev.map(b => b.id === currentBusinessId ? { ...b, [field]: value } : b));
    };

    const addBusiness = (newBusinessTemplate) => {
        const newId = "b_" + Date.now();
        setBusinesses(prev => [...prev, { ...newBusinessTemplate, id: newId }]);
        setCurrentBusinessId(newId);
    };

    const triggerVoiceModal = (contextHint = "") => {
        setLastVoicePrompt(contextHint);
        setIsVoiceActive(true);
    };

    const login = (isNew) => {
        setIsNewUser(isNew);
        setIsAuthenticated(true);
        setActiveScreen(isNew ? "intake" : "home");
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AppContext.Provider
            value={{
                isAuthenticated, login, logout, isNewUser,
                activeScreen, setActiveScreen,
                intentGoal, setIntentGoal,
                isVoiceActive, setIsVoiceActive,
                lastVoicePrompt, triggerVoiceModal,
                isChatOpen, setIsChatOpen,
                isDemoMode, setIsDemoMode,
                businesses, currentBusinessId, setCurrentBusinessId, addBusiness,
                profile, selectBusinessCategory, updateProfileField,
                erpData, setErpData
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
