import axios from 'axios';
import { getToken } from './authService';

const BASE_API = 'http://localhost:8080/jobs';

const authHeader = () => ({
    headers: { Authorization : `Bearer ${getToken()}`}
});

export const fetchJobs = () => axios.get(BASE_API, authHeader());

export const createJob = (jobData) => axios.post(BASE_API, jobData, authHeader());

export const updateJob = (id, jobData) => axios.put(`${BASE_API}/${id}`, jobData, authHeader());

export const deleteJob = (id) => axios.delete(`${BASE_API}/${id}`, authHeader());




