import axios from 'axios';
import { getFromLocalStorage } from './localStorageApi';

interface BaseResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  [key: string]: any;
}

interface FetchUserBody {
  email: string;
  password: string;
}

interface CreateUserBody extends FetchUserBody {
  name: string;
}

interface User {
  userId: number;
  name: string;
  email: string;
  token: string;
}

interface VerfiyUser {
  userId: number;
  isUserValid: boolean;
}

interface QueryParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  limit?: string;
  skip?: string;
}

interface Product {
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
}

interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

type Categories = string[];

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

export const fetchUserByEmail = async (body: FetchUserBody) => {
  try {
    const response = await api.post<BaseResponse<User>>('login', body);
    const user = response.data.data;
    return user;
  } catch (error) {
    console.error('Error in logging user', error);
  }
};

export const createUser = async (body: CreateUserBody) => {
  try {
    const response = await api.post<BaseResponse<User>>('sign-up', body);
    const user = response.data.data;
    return user;
  } catch (error) {
    console.error('Error in signing user', error);
  }
};

export const verfiyUser = async () => {
  try {
    const user = getFromLocalStorage('user');

    if (user === null) {
      return true;
    }

    const response = await api.get<BaseResponse<VerfiyUser>>('verify-user');
    const isUserValid = response.data.data?.isUserValid;
    return isUserValid;
  } catch (error) {
    console.error('Error in verify user', error);
    return false;
  }
};

export const fetchProducts = (params?: QueryParams) => async () => {
  try {
    const response = await api.get<BaseResponse<Products>>('products', { params });
    const products = response.data.data;
    return products;
  } catch (error) {
    console.error('Error in getting products', error);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get<BaseResponse<Categories>>('products/categories');
    const categories = response.data.data;
    return categories;
  } catch (error) {
    console.error('Error in getting categories', error);
  }
};

export const fetchProductById = (id: string) => async () => {
  try {
    const response = await api.get<BaseResponse<Product>>(`product/${id}`);
    const product = response.data.data;
    return product;
  } catch (error) {
    console.error('Error in getting products', error);
  }
};
