import axios from 'axios';

const BASE_API = 'http://localhost:8080';

export const register = (userData) => axios.post(`${BASE_API}/signup`, userData);

export const login = (userData) => axios.post(`${BASE_API}/login`, userData);

export const setToken = (token) => {localStorage.setItem('token', token)};

export const getToken = () => localStorage.getItem('token');


