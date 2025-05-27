import api from './api';

const BASE_PATH = '/jobs';

export const fetchJobs = () => api.get(BASE_PATH);

export const createJob = (jobData) => api.post(BASE_PATH, jobData);

export const updateJob = (id, jobData) => api.put(`${BASE_PATH}/${id}`, jobData);

export const deleteJob = (id) => api.delete(`${BASE_PATH}/${id}`);

export const getJobById = (id) => api.get(`${BASE_PATH}/${id}`);




