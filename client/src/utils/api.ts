import axios from 'axios';
import { getFromLocalStorage } from './localStorageApi';

const { VITE_BASE_URL } = import.meta.env;
const authToken = getFromLocalStorage('user').token;

const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  }
});

export const getUserByEmail = async (body: Record<string, string>) => {
  try {
    const response = await api.post('login', body);
    return response?.data;
  } catch (error) {
    console.error('Error in logging user: ', error);
  }
};

export const createUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post('sign-up', body);
    return response?.data;
  } catch (error) {
    console.error('Error in signing user: ', error);
  }
};
