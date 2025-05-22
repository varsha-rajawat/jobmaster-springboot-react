import api from './api';

export const signup = (userData) => api.post(`/signup`, userData);

export const loginUser = (userData) => api.post(`/login`, userData);

export const setToken = (token) => {localStorage.setItem('token', token)};

export const getToken = () => localStorage.getItem('token');


