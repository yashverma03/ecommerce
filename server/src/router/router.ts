import express from 'express';
import { authenticateUser } from '../controller/authMiddleware.ts';
import { createUser, getUserByEmail, verifyUser } from '../controller/user.ts';
import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByName
} from '../controller/product.ts';
import { addToCart } from '../controller/cart.ts';

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

// TODO
// router.get('/cart/:userId', getCartItems);
// router.patch('/cart/:userId', updateCartItem);
// router.delete('/cart/:userId', removeCartItem);

export default router;
