
import api from './api';

const BASE_PATH = '/companies';

// Fetch all companies
export const fetchCompanies = () => api.get(BASE_PATH);