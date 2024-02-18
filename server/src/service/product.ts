import api from '../config/productApi.ts';
import type { Products, QueryParams } from '../utils/types.ts';
import { getFormattedNumber } from '../utils/utils.ts';
import type { ParsedQs } from 'qs';

export const getProductsService = async (queryParams: QueryParams) => {
  try {
    const { search, category, minPrice, maxPrice, sort, limit, skip }: QueryParams = queryParams;
    const response = await api.get('products', { params: { limit: 100 } });
    const products: Products = response.data.products;
    let filteredProducts = products;

    if (category !== undefined && category.trim() !== '') {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    if (minPrice !== undefined && minPrice.trim() !== '') {
      filteredProducts = filteredProducts.filter((product) => product.price >= parseInt(minPrice));
    }

    if (maxPrice !== undefined && maxPrice.trim() !== '') {
      filteredProducts = filteredProducts.filter((product) => product.price <= parseInt(maxPrice));
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

    return {
      products: paginatedProducts,
      total,
      skip: formattedSkip,
      limit: formattedLimit
    };
  } catch (error: any) {
    throw new Error(`Error getting products. ${error.message}`);
  }
};

export const getProductByIdService = async (id: string) => {
  try {
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error getting product by id. ${error.message}`);
  }
};

export const getProductsByNameService = async (query: ParsedQs) => {
  try {
    const response = await api.get('products/search', { params: query });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error getting by search. ${error.message}`);
  }
};

export const getCategoriesService = async () => {
  try {
    const response = await api.get('products/categories');
    return response.data;
  } catch (error: any) {
    throw new Error(`Error getting categories. ${error.message}`);
  }
};

export const getProductsByCategoryService = async (name: string, query: any) => {
  try {
    const response = await api.get(`products/category/${name}`, { params: query });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error getting products by category. ${error.message}`);
  }
};
