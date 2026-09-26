import axios from 'axios';

// Default configuration for the Axios client
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // Maps to our Spring Boot Backend
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 second timeout
});

// Interceptor to attach the JWT token to every request if it exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor to handle global errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // Server responded with a status other than 2xx
            if (error.response.status === 401) {
                console.error("Authentication failed. Please log in again.");
                localStorage.removeItem('jwt_token');
                // Could emit an event or force a reload to home screen here
            }
            console.error('API Error:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // No response was received
            console.error('Network Error: Cannot reach backend server');
            return Promise.reject({ error: 'NETWORK_ERROR', message: 'Unable to connect to the server.' });
        }
        return Promise.reject(error);
    }
);

export default apiClient;
