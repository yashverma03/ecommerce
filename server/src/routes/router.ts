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
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity
} from '../controller/cart.ts';
import { createPayment } from '../controller/payment.ts';

const router = express.Router();

router.post('/user/sign-up', createUser);
router.post('/user/login', getUserByEmail);
router.get('/user/verify', authenticateUser, verifyUser);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/products/search', getProductsByName);
router.get('/products/categories', getCategories);
router.get('/products/category/:id', getProductsByCategory);

router.post('/cart', authenticateUser, addToCart);
router.get('/cart', authenticateUser, getCartItems);
router.patch('/cart/:productId', authenticateUser, updateCartItemQuantity);
router.delete('/cart/:productId', authenticateUser, deleteCartItem);

router.post('/payment', authenticateUser, createPayment);

export default router;
