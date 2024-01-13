import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const { VITE_BASE_URL } = import.meta.env;
const token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export const queryClient = new QueryClient();

export default api;
