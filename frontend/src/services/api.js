import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiService = {
    // Authentication
    auth: {
        signup: (data) => api.post('/auth/signup', data),
        login: (data) => api.post('/auth/login', data),
        getMe: () => api.get('/auth/me')
    },

    // APIs
    getAllApis: () => api.get('/apis'),
    getApiById: (id) => api.get(`/apis/${id}`),
    createApi: (data) => api.post('/apis', data),
    updateApi: (id, data) => api.put(`/apis/${id}`, data),
    deleteApi: (id) => api.delete(`/apis/${id}`),
    revealApiKey: (id) => api.get(`/apis/${id}/reveal-key`),
    removeApiKey: (id) => api.delete(`/apis/${id}/api-key`),

    // Usage
    logApiCall: (data) => api.post('/usage', data),
    getAllApiCalls: (params) => api.get('/usage', { params }),
    getUsageStats: (params) => api.get('/usage/stats', { params }),

    // Billing
    getBillingSummary: () => api.get('/billing/summary'),
    getSettings: () => api.get('/billing/settings'),
    updateSettings: (data) => api.put('/billing/settings', data)
};

export default api;
