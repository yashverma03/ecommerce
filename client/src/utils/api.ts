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

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    limit: 100
  }
});

api.interceptors.request.use(
  (config) => {
    const authToken = getFromLocalStorage('user')?.token;
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
    const user: User = response.data?.data;
    return user;
  } catch (error) {
    console.error('Error in logging user', error);
  }
};

export const createUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post('sign-up', body);
    const user: User = response.data?.data;
    return user;
  } catch (error) {
    console.error('Error in signing user', error);
  }
};

export const fetchProducts = (params?: QueryParams) => async () => {
  try {
    const response = await api.get('products', { params });
    const products: Products = response.data?.data;
    return products;
  } catch (error) {
    console.error('Error in getting products', error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get('products/categories');
    const categories: string[] = response.data?.data;
    return categories;
  } catch (error) {
    console.error('Error in getting categories', error);
  }
};
