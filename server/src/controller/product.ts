import type { Request, Response } from 'express';
import api from '../api/thirdPartyApi.ts';

export const getProducts = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { query } = req;
      const response = await api.get('products', { params: query });

      res.status(200).json({ message: 'Products found', data: response.data });
    } catch (error) {
      console.error('Products not found', error);
      res.status(500).json({ error });
    }
  };

  void request();
};

export const getProductById = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { id } = req.params;
      const response = await api.get(`products/${id}`);

      res.status(200).json({ message: 'Product found', data: response.data });
    } catch (error) {
      console.error('Error getting product by id', error);
      res.status(500).json({ error });
    }
  };

  void request();
};

export const getProductsByName = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { query } = req;
      const response = await api.get('products/search', { params: query });

      res.status(200).json({ message: 'Products found', data: response.data });
    } catch (error) {
      console.error('Error getting products by search', error);
      res.status(500).json({ error });
    }
  };

  void request();
};

export const getCategories = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const response = await api.get('products/categories');

      res.status(200).json({ message: 'Categories found', data: response.data });
    } catch (error) {
      console.error('Error getting categories', error);
      res.status(500).json({ error });
    }
  };

  void request();
};

export const getProductsByCategory = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { name } = req.params;
      const { query } = req;
      const response = await api.get(`products/category/${name}`, { params: query });

      res.status(200).json({ message: `Products found for ${name}`, data: response.data });
    } catch (error) {
      console.error('Error in getting products by category', error);
      res.status(500).json({ error });
    }
  };

  void request();
};
