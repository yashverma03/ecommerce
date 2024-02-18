import Cart from '../model/cart.ts';
import { getProductByIdService } from './product.ts';

export const addToCartService = async (
  userId: number | undefined,
  productId: number,
  quantity: number,
  price: number
) => {
  try {
    if (userId === undefined) {
      return { error: 'UserId is invalid', statusCode: 401 };
    }

    if (quantity <= 0 || productId <= 0 || price < 0) {
      return { error: 'Invalid product id, quantity or price', statusCode: 400 };
    }

    const existingCarts = await Cart.findAll({ where: { userId } });
    const existingCart = existingCarts.find((cart) => cart.productId === productId);

    if (existingCart === undefined) {
      const newCart = await Cart.create({ userId, productId, quantity, price });
      return { message: 'Product added to cart successfully', cartItem: newCart };
    }

    existingCart.quantity += quantity;
    existingCart.price = price;
    const updatedCart = await existingCart.save();
    return { message: 'Cart updated successfully', cartItem: updatedCart };
  } catch (error: any) {
    throw new Error(`Error in adding to cart. ${error.message}`);
  }
};

export const getCartItemsService = async (userId: number | undefined) => {
  try {
    if (userId === undefined) {
      return { error: 'UserId is invalid', statusCode: 401 };
    }

    const cartItems = await Cart.findAll({ where: { userId } });

    const cartItemsWithProducts = await Promise.all(
      cartItems.map(async (cartItem) => {
        const productId = cartItem.productId;
        const productDetails = await getProductByIdService(productId.toString());
        return { ...cartItem.toJSON(), productDetails };
      })
    );

    return { cartItems: cartItemsWithProducts };
  } catch (error: any) {
    throw new Error(`Error in getting cart items. ${error.message}`);
  }
};

export const updateCartItemService = async (
  userId: number | undefined,
  productId: string,
  quantity: number
) => {
  try {
    if (userId === undefined) {
      return { error: 'UserId is invalid', statusCode: 401 };
    }

    const productIdNumber = parseInt(productId);

    if (quantity < 0 || productIdNumber <= 0) {
      return { error: 'Invalid product id, quantity or price', statusCode: 400 };
    }

    const cartItem = await Cart.findOne({ where: { userId, productId: productIdNumber } });

    if (cartItem === null) {
      return { error: 'Cart item not found', statusCode: 404 };
    }

    if (quantity === 0) {
      await cartItem.destroy();
      return { message: 'Cart item deleted successfully', cartItem };
    }

    cartItem.quantity = quantity;
    const updatedCartItem = await cartItem.save();
    return { message: 'Cart item updated successfully', cartItem: updatedCartItem };
  } catch (error: any) {
    throw new Error(`Error updating cart item. ${error.message}`);
  }
};

export const deleteCartItemService = async (userId: number | undefined, productId: string) => {
  try {
    if (userId === undefined) {
      return { error: 'UserId is invalid', statusCode: 401 };
    }

    const productIdNumber = parseInt(productId);

    if (productIdNumber <= 0) {
      return { error: 'Invalid product id', statusCode: 400 };
    }

    const cartsDeleted = await Cart.destroy({ where: { userId, productId: productIdNumber } });

    if (cartsDeleted === 0) {
      return { error: 'Cart item not found', statusCode: 404 };
    }

    return { cartsDeleted };
  } catch (error: any) {
    throw new Error(`Error deleting cart item. ${error.message}`);
  }
};
