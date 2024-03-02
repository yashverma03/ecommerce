import type { NextFunction, Request, Response } from 'express';
import {
  getCategoriesService,
  getProductByIdService,
  getProductsService
} from '../service/product.ts';
import cache from '../config/nodeCache.ts';
import type { Categories, Product, Products } from '../utils/types.ts';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { query } = req;
      const cacheKey = 'products' + JSON.stringify(query);
      const cachedProducts = cache.get<Products>(cacheKey);

      if (cachedProducts != null) {
        return res.status(200).json({ message: 'Products found (cached)', data: cachedProducts });
      }

      const products = await getProductsService(query);
      cache.set(cacheKey, products);
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
      const cacheKey = 'product' + id;
      const cachedProduct = cache.get<Product>(cacheKey);

      if (cachedProduct != null) {
        return res.status(200).json({ message: 'Product found (cached)', data: cachedProduct });
      }

      const product = await getProductByIdService(id);
      cache.set(cacheKey, product);
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
      const cacheKey = 'categories';
      const cachedCategories = cache.get<Categories>(cacheKey);

      if (cachedCategories != null) {
        return res.status(200).json({
          message: 'Categories found (cached)',
          data: cachedCategories
        });
      }

      const categories = await getCategoriesService();
      cache.set(cacheKey, categories);
      res.status(200).json({ message: 'Categories found', data: categories });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
