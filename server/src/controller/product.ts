import type { NextFunction, Request, Response } from 'express';
import {
  getCategoriesService,
  getProductByIdService,
  getProductsService
} from '../service/product.ts';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const products = await getProductsService(req.query);
      res.status(200).json({ message: 'Products found', data: products });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const getProductById = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { id } = req.params;
      const product = await getProductByIdService(id);
      res.status(200).json({ message: 'Product found', data: product });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const categories = await getCategoriesService();
      res.status(200).json({ message: 'Categories found', data: categories });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
