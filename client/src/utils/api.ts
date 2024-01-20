import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

const { VITE_BASE_URL } = import.meta.env;
const token = localStorage.getItem('token');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
});

export const loginUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post('login', body);
    return response?.data;
  } catch (error) {
    console.error('Error in logging user: ', error);
  }
};

export const signUpUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post('sign-up', body);
    return response?.data;
  } catch (error) {
    console.error('Error in signing user: ', error);
  }
};
