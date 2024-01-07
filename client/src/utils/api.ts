import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const { VITE_BASE_URL } = import.meta.env;

export const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const queryClient = new QueryClient();

export default api;
