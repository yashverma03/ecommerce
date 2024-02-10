import type { Response } from 'express';
import type { AuthRequest } from '../utils/types';
import Cart from '../model/cart.ts';

type CartBody = {
  productId: number;
  quantity: number;
};

export const addToCart = (req: AuthRequest, res: Response) => {
  const request = async () => {
    try {
      const { userId } = req;
      const { productId, quantity }: CartBody = req.body;

      if (userId === undefined) {
        return res.status(401).json({ error: 'UserId is invalid' });
      }

      if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid productId or quantity' });
      }

      const existingCarts = await Cart.findAll({ where: { userId } });
      const existingCart = existingCarts.find((cart) => cart.productId === productId);

      if (existingCart === undefined) {
        const newCart = await Cart.create({ userId, productId, quantity });
        return res.status(201).json({
          message: 'Product added to cart successfully',
          cartItem: newCart
        });
      }

      existingCart.quantity += quantity;
      const updatedCart = await existingCart.save();
      res.status(200).json({ message: 'Cart updated successfully', cartItem: updatedCart });
    } catch (error) {
      console.error('Error in adding to cart', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  void request();
};
