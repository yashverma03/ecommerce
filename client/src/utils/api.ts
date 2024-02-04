import axios from 'axios';
import { getFromLocalStorage } from './localStorageApi';

type User = {
  message: string;
  data?: {
    name: string;
    email: string;
    token: string;
  };
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
  message: string;
  data?: {
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
};

type Categories = {
  message: string;
  data?: string[];
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
    const response = await api.post<User>('login', body);
    return response.data.data;
  } catch (error) {
    console.error('Error in logging user', error);
  }
};

export const createUser = async (body: Record<string, string>) => {
  try {
    const response = await api.post<User>('sign-up', body);
    return response.data.data;
  } catch (error) {
    console.error('Error in signing user', error);
  }
};

export const fetchProducts = (params?: QueryParams) => async () => {
  try {
    const response = await api.get<Products>('products', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error in getting products', error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get<Categories>('products/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error in getting categories', error);
  }
};
