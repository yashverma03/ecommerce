import type { NextFunction, Response } from 'express';
import type { AuthRequest, CartBody } from '../utils/types';
import { addToCartService, getCartItemsService } from '../service/cart.ts';

export const addToCart = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId, quantity, price }: CartBody = req.body;
      const { message, cartItem, statusCode, error } = await addToCartService(
        userId,
        productId,
        quantity,
        price
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
      const { cartItems, statusCode, error } = await getCartItemsService(userId);

      if (error !== undefined) {
        return res.status(statusCode).json({ error });
      }

      res.status(200).json({
        message: 'Cart items found',
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
