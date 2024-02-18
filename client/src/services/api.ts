import axios from 'axios';
import { getFromLocalStorage } from '../utils/localStorage';

interface BaseResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  stack?: any;
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

interface AddToCartBody {
  productId: number;
  price: number;
  quantity?: number;
}

interface CartModel {
  cartId: number;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
}

interface CartItem extends CartModel {
  productDetails: Product;
}

interface CartItems {
  cartItems: CartItem[];
  total: number;
}

interface UpdateCartItemBody {
  productId: number;
  price: number;
  quantity: number;
}

interface DeleteCartItem {
  cartsDeleted: number;
}

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
    const user = response.data.data ?? null;
    return user;
  } catch (error) {
    console.error('Error in logging user:', error);
    return null;
  }
};

export const createUser = async (body: CreateUserBody) => {
  try {
    const response = await api.post<BaseResponse<User>>('sign-up', body);
    const user = response.data.data ?? null;
    return user;
  } catch (error) {
    console.error('Error in signing user:', error);
    return null;
  }
};

export const verfiyUser = async () => {
  try {
    const user = getFromLocalStorage('user');

    if (user === null) {
      return true;
    }

    const response = await api.get<BaseResponse<VerfiyUser>>('verify-user');
    const isUserValid = response.data.data?.isUserValid ?? false;
    return isUserValid;
  } catch (error) {
    console.error('Error in verify user:', error);
    return false;
  }
};

export const fetchProducts = (params?: QueryParams) => async () => {
  try {
    const response = await api.get<BaseResponse<Products>>('products', { params });
    const products = response.data.data ?? null;
    return products;
  } catch (error) {
    console.error('Error in getting products:', error);
    return null;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get<BaseResponse<Categories>>('products/categories');
    const categories = response.data.data ?? null;
    return categories;
  } catch (error) {
    console.error('Error in getting categories:', error);
    return null;
  }
};

export const fetchProductById = (id: string) => async () => {
  try {
    const response = await api.get<BaseResponse<Product>>(`product/${id}`);
    const product = response.data.data ?? null;
    return product;
  } catch (error) {
    console.error('Error in getting products:', error);
    return null;
  }
};

export const addToCart = async (cartItem: AddToCartBody) => {
  try {
    const body = {
      productId: cartItem.productId,
      price: cartItem.price,
      quantity: cartItem.quantity ?? 1
    };

    const response = await api.post<BaseResponse<CartModel>>('cart', body);
    const cart = response.data.data ?? null;
    return cart;
  } catch (error) {
    console.error('Error in adding to cart:', error);
    return null;
  }
};

export const fetchCartItems = async () => {
  try {
    const response = await api.get<BaseResponse<CartItems>>('cart');
    const cartItems = response.data.data?.cartItems ?? null;
    return cartItems;
  } catch (error) {
    console.error('Error in getting cart items:', error);
    return null;
  }
};

export const updateCartItem = async (cartItems: UpdateCartItemBody) => {
  try {
    const { productId, price, quantity } = cartItems;
    const body = {
      price,
      quantity
    };

    const response = await api.patch<BaseResponse<CartModel>>(`cart/${productId}`, body);
    const cartItemsDetails = response.data.data ?? null;
    return cartItemsDetails;
  } catch (error) {
    console.error('Error in updating cart items:', error);
    return null;
  }
};

export const deleteCartItem = async (productId: number) => {
  try {
    const response = await api.delete<BaseResponse<DeleteCartItem>>(`cart/${productId}`);
    const cartsDeleted = response.data.data ?? null;
    return cartsDeleted;
  } catch (error) {
    console.error('Error in deleting cart items:', error);
    return null;
  }
};
