import express from 'express';
import authenticateUser from '../middleware/auth.ts';
import cacheControl from '../middleware/cacheControl.ts';
import { createUser, getUserByEmail, verifyUser } from '../controller/user.ts';
import { getCategories, getProductById, getProducts } from '../controller/product.ts';
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity
} from '../controller/cart.ts';
import { createPayment } from '../controller/payment.ts';

const router = express.Router();

// Routes for user authentication and registration
router.post('/user/sign-up', createUser);
router.post('/user/login', getUserByEmail);
router.get('/user/verify', authenticateUser, verifyUser);

//  Routes for product management
router.get('/products', cacheControl, getProducts);
router.get('/product/:id', cacheControl, getProductById);
router.get('/products/categories', cacheControl, getCategories);

// Routes for shopping cart management
router.post('/cart', authenticateUser, addToCart);
router.get('/cart', authenticateUser, getCartItems);
router.patch('/cart/:productId', authenticateUser, updateCartItemQuantity);
router.delete('/cart/:productId', authenticateUser, deleteCartItem);

// Route for creating payments
router.post('/payment', authenticateUser, createPayment);

export default router;
