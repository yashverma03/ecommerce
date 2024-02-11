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

export type QueryParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: `${string}-${'asc' | 'desc'}`;
  limit?: string;
  skip?: string;
};

export type Products = Array<{
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

export type CartBody = {
  productId: number;
  quantity: number;
};
