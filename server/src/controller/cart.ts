import type { NextFunction, Response } from 'express';
import type { AuthRequest, AddToCartBody, UpdateCartBody } from '../utils/types';
import {
  addToCartService,
  deleteCartItemService,
  getCartItemsService,
  updateCartItemQuantityService
} from '../service/cart.ts';

export const addToCart = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId, quantity }: AddToCartBody = req.body;
      const { message, cartItem, statusCode, error } = await addToCartService(
        userId,
        productId,
        quantity
      );

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({ message, data: cartItem });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const getCartItems = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { cartItems, message, statusCode, error } = await getCartItemsService(userId);

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({
        message,
        data: {
          cartItems,
          total: cartItems.length
        }
      });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const updateCartItemQuantity = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId } = req.params;
      const { quantity }: UpdateCartBody = req.body;
      const { message, cartItem, statusCode, error } = await updateCartItemQuantityService(
        userId,
        productId,
        quantity
      );

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({ message, data: { cartItem } });
    } catch (error) {
      next(error);
    }
  };

  void request();
};

export const deleteCartItem = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId } = req.params;
      const { cartsDeleted, statusCode, error } = await deleteCartItemService(userId, productId);

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({ message: 'Cart item deleted successfully', data: { cartsDeleted } });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
