import axios from 'axios';

// Support both Vite and CRA-style env vars
const viteUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined;
const API_BASE_URL = viteUrl || process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  demo: () => api.post('/auth/demo'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile'),
};

// Chat API
export const chatAPI = {
  createSession: (module) => api.post('/chat/session', { module }),
  sendMessage: (sessionId, message, module) => 
    api.post('/chat/message', { sessionId, message, module }),
  getSessions: () => api.get('/chat/sessions'),
  getSession: (sessionId) => api.get(`/chat/session/${sessionId}`),
  updateSession: (sessionId, status) => 
    api.put(`/chat/session/${sessionId}`, { status }),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getInsights: () => api.get('/users/insights'),
  updateInsights: (insightsData) => api.put('/users/insights', insightsData),
  getDashboard: () => api.get('/users/dashboard'),
};

// Insights API
export const insightsAPI = {
  getAnalytics: () => api.get('/insights/analytics'),
  getRecommendations: () => api.get('/insights/recommendations'),
  getProgress: () => api.get('/insights/progress'),
};

// Network API
export const networkAPI = {
  getSuggested: () => api.get('/network/suggested'),
  search: (q) => api.get('/network/search', { params: { q } }),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api; 