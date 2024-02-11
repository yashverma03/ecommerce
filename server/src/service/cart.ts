import Cart from '../model/cart.ts';
import CustomError from '../utils/CustomError.ts';

export const addToCartService = async (
  userId: number | undefined,
  productId: number,
  quantity: number,
  price: number
) => {
  try {
    if (userId === undefined) {
      throw new CustomError('UserId is invalid', 401);
    }

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
      throw new CustomError('Invalid productId or quantity', 400);
    }

    const existingCarts = await Cart.findAll({ where: { userId } });
    const existingCart = existingCarts.find((cart) => cart.productId === productId);

    if (existingCart === undefined) {
      const newCart = await Cart.create({ userId, productId, quantity, price });
      return { message: 'Product added to cart successfully', cartItem: newCart };
    }

    existingCart.quantity = quantity;
    const updatedCart = await existingCart.save();
    return { message: 'Cart updated successfully', cartItem: updatedCart };
  } catch (error: any) {
    throw new CustomError(`Error in adding to cart. ${error.message}`, error.statusCode as number);
  }
};
