import type { NextFunction, Response } from 'express';
import type { AuthRequest, CartBody } from '../utils/types';
import { addToCartService } from '../service/cart.ts';

export const addToCart = (req: AuthRequest, res: Response, next: NextFunction) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId, quantity }: CartBody = req.body;
      const { message, cartItem } = await addToCartService(userId, productId, quantity);
      res.status(200).json({ message, cartItem });
    } catch (error) {
      next(error);
    }
  };

  void request();
};
