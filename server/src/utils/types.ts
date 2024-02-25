import type { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
}

export interface UserBody {
  email: string;
  password: string;
}

export interface CreateUserBody extends UserBody {
  name: string;
}

export interface QueryParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: `${string}-${'asc' | 'desc'}`;
  limit?: string;
  skip?: string;
}

export interface Product {
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

export interface Products {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Categories = string[];

export interface AddToCartBody {
  productId: number;
  quantity: number;
  price: number;
}

export interface UpdateCartBody {
  quantity: 1 | -1;
}
