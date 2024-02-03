import type { Request, Response } from 'express';
import api from '../api/thirdPartyApi.ts';
import { getFormattedNumber } from '../utils/utils.ts';

type QueryParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: `${string}-${'asc' | 'desc'}`;
  limit?: string;
  skip?: string;
};

type Products = Array<{
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

export const getProducts = (req: Request, res: Response) => {
  const request = async () => {
    try {
      const { search, category, minPrice, maxPrice, sort, limit, skip }: QueryParams = req.query;
      const response = await api.get('products', { params: { limit: 100 } });
      const products: Products = response.data.products;
      let filteredProducts = products;

      if (category !== undefined && category.trim() !== '') {
        filteredProducts = filteredProducts.filter((product) => product.category === category);
      }

      if (minPrice !== undefined && minPrice.trim() !== '') {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= parseInt(minPrice)
        );
      }

      if (maxPrice !== undefined && maxPrice.trim() !== '') {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= parseInt(maxPrice)
        );
      }

      if (search !== undefined && search.trim() !== '') {
        const searchKeyword = search.toLowerCase();

        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchKeyword) ||
            product.description.toLowerCase().includes(searchKeyword) ||
            product.brand.toLowerCase().includes(searchKeyword)
        );
      }

      if (sort !== undefined && sort.trim() !== '') {
        const [field, order] = sort.split('-');

        const sortingField =
          field === 'price' || field === 'rating' || field === 'discountPercentage' ? field : 'id';

        filteredProducts.sort((a, b) => {
          if (order === 'asc') {
            return a[sortingField] - b[sortingField];
          }

          if (order === 'desc') {
            return b[sortingField] - a[sortingField];
          }

          return 0;
        });
      }

      const total = filteredProducts.length;
      const formattedSkip = getFormattedNumber(skip, 0);
      const formattedLimit = getFormattedNumber(limit, total);

      const startIndex = formattedSkip;
      const endIndex = startIndex + formattedLimit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      res.status(200).json({
        message: 'Products found',
        data: {
          products: paginatedProducts,
          total,
          skip: formattedSkip,
          limit: formattedLimit
        }
      });
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
