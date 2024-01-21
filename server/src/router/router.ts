import express from 'express';
import { createUser, getUserByEmail } from '../controller/user.ts';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByName
} from '../controller/product.ts';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', getUserByEmail);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/products/search', getProductsByName);
router.get('/products/categories', getCategories);
router.get('/products/category/:name', getProductsByCategory);

export default router;
