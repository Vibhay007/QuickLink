import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const urlAPI = {
  getAll: () => api.get('/urls'),
  create: (data) => api.post('/urls', data),
  delete: (id) => api.delete(`/urls/${id}`),
  getAnalytics: () => api.get('/urls/analytics'),
  checkAlias: (code) => api.get(`/urls/check-alias/${code}`),
};

export default api;