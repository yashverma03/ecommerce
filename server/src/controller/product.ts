import type { NextFunction, Request, Response } from 'express';
import {
  getCategoriesService,
  getProductByIdService,
  getProductsByCategoryService,
  getProductsByNameService,
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

export const getProductsByName = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const products = await getProductsByNameService(req.query);
      res.status(200).json({ message: 'Products found', data: products });
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

export const getProductsByCategory = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { id } = req.params;
      const { query } = req;
      const products = await getProductsByCategoryService(id, query);
      res.status(200).json({ message: `Products found for ${id}`, data: products });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
