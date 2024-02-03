import axios from 'axios';
import { getFromLocalStorage } from './localStorageApi';

type User = {
  name: string;
  email: string;
  token: string;
};

type QueryParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  limit?: string;
  skip?: string;
};

type Products = {
  products: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }>;
  total: number;
  skip: number;
  limit: number;
};

const { VITE_BASE_URL } = import.meta.env;
const authToken = getFromLocalStorage('user').token;

const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    limit: 100
  }
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    throw error;
  }
);

export const fetchUserByEmail = async (body: Record<string, string>) => {
  try {
    const response = await api.post('login', body);
    return response?.data.data as User;
  } catch (error) {
    console.error('Error in logging user', error);
  }
};

export const createUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post('sign-up', body);
    return response?.data.data as User;
  } catch (error) {
    console.error('Error in signing user', error);
  }
};

export const fetchProducts = (params?: QueryParams) => async () => {
  try {
    const response = await api.get('products', { params });
    return response?.data?.data as Products;
  } catch (error) {
    console.error('Error in getting products', error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('products/categories');
    return response?.data?.data as string[];
  } catch (error) {
    console.error('Error in getting categories', error);
  }
};
