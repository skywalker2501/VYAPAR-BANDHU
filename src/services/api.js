import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Base Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to append JWT token natively
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Resiliency: Global Error handling wrapper and Offline hooks
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Intercept network failures or explicit timeouts gracefully dropping to Offline Mode
        if (!error.response || !navigator.onLine || error.code === 'ERR_NETWORK') {
            console.warn("Network Error: Backend unreachable. Shifting to Offline Fallback Demo Mode.");
            window.dispatchEvent(new Event('NETWORK_FALLBACK_DEMO'));
        }
        if (error.response && error.response.status === 401) {
            // Unauthorized, forcefully flush token
            localStorage.removeItem('jwtToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


// ----------------------------------------------------------------------
// Reusable API Services Mapping Spring Boot domain-driven controllers
// ----------------------------------------------------------------------

// Auth API mapped to AuthController
export const authApi = {
    sendOtp: (phone) => apiClient.post('/auth/send-otp', { phone }),
    verifyOtp: (phone, otp) => apiClient.post('/auth/verify', { phone, otp }),
};

// Profile API mapped to Profile controller
export const profileApi = {
    getProfile: () => apiClient.get('/profile'),
    createOrUpdate: (profileData) => apiClient.post('/profile', profileData),
};

// ERP Services API mapped to ErpController
export const businessApi = { // Mapping ERP endpoints
    getDashboard: (userId) => apiClient.get(`/erp/dashboard?userId=${userId}`),
    getSales: (userId) => apiClient.get(`/erp/sales?userId=${userId}`),
    addSale: (sale) => apiClient.post('/erp/sales', sale),
    getExpenses: (userId) => apiClient.get(`/erp/expenses?userId=${userId}`),
    addExpense: (expense) => apiClient.post('/erp/expenses', expense),
    getLoans: (userId) => apiClient.get(`/erp/loans?userId=${userId}`),
    addLoan: (loan) => apiClient.post('/erp/loans', loan),
    getCustomers: (userId) => apiClient.get(`/erp/customers?userId=${userId}`),
    addCustomer: (customer) => apiClient.post('/erp/customers', customer),
    getSuppliers: (userId) => apiClient.get(`/erp/suppliers?userId=${userId}`),
    addSupplier: (supplier) => apiClient.post('/erp/suppliers', supplier),
    getInventory: (businessId) => apiClient.get(`/erp/inventory?businessId=${businessId}`),
    addInventory: (item) => apiClient.post('/erp/inventory', item),
};

// Market / Feasibility mapped to FeasibilityController
export const marketApi = {
    getFeasibilityReport: (payload) => apiClient.post('/feasibility/report', payload),
};

// Finance Logic mapped to FinanceController (Displaces Javascript businessRules internally)
export const financeApi = {
    calculateCapacity: (payload) => apiClient.post('/finance/calculate', payload),
    calculateLoanNeeded: (payload) => apiClient.post('/finance/loan-needed', payload),
    calculateEmi: (payload) => apiClient.post('/finance/emi', payload),
    generateRepaymentSchedule: (payload) => apiClient.post('/finance/repayment-schedule', payload),
    checkLoanNecessity: (payload) => apiClient.post('/finance/loan-necessity', payload),
};

// Scheme Module mapped to SchemeController
export const schemeApi = {
    getAllSchemes: () => apiClient.get('/schemes'),
    getSchemeById: (id) => apiClient.get(`/schemes/${id}`),
    matchSchemes: (businessParams) => apiClient.post('/schemes/match', businessParams),
};

// Feedback and Outcomes mapped to OutcomeController
export const feedbackApi = {
    trackOutcome: (outcome) => apiClient.post('/outcomes/track', outcome),
    getAnalytics: (businessType, location) => apiClient.get(`/outcomes/analytics/${businessType}/${location}`),
};

// AI/Expert Knowledge mapped to our AiController RAG engine
export const expertApi = {
    askQuestion: (query, location, businessType) => apiClient.post('/ai/ask', { query, location, businessType }),
};

// Transparent Business Health mapped to HealthController
export const recommendationApi = {
    getHealthScore: (userId) => apiClient.get(`/health?userId=${userId}`),
};

export default apiClient;
