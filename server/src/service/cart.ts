import Cart from '../model/cart.ts';

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

    if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
      return { error: 'Invalid productId or quantity', statusCode: 400 };
    }

    const existingCarts = await Cart.findAll({ where: { userId } });
    const existingCart = existingCarts.find((cart) => cart.productId === productId);

    if (existingCart === undefined) {
      const newCart = await Cart.create({ userId, productId, quantity, price });
      return { message: 'Product added to cart successfully', cartItem: newCart };
    }

    existingCart.quantity = quantity;
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
    return { cartItems };
  } catch (error: any) {
    throw new Error(`Error in getting cart items. ${error.message}`);
  }
};
