import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": 'application/json',
    },
});

// Interceptor to attach token automatically
api.interceptors.request.use((config) => {
  // Don't attach token on login or signup
  if (!['/login', '/signup'].includes(config.url)) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;