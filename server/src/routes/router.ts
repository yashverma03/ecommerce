import express from 'express';
import { authenticateUser } from '../middleware/auth.ts';
import { createUser, getUserByEmail, verifyUser } from '../controller/user.ts';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByName
} from '../controller/product.ts';
import { addToCart, getCartItems, updateCartItem } from '../controller/cart.ts';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/login', getUserByEmail);
router.get('/verify-user', authenticateUser, verifyUser);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/products/search', getProductsByName);
router.get('/products/categories', getCategories);
router.get('/products/category/:name', getProductsByCategory);

router.post('/cart', authenticateUser, addToCart);
router.get('/cart', authenticateUser, getCartItems);
router.patch('/cart/:productId', authenticateUser, updateCartItem);
// router.delete('/cart/:userId', authenticateUser, removeCartItem);

export default router;
