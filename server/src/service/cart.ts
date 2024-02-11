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
      return { error: 'Invalid product id or quantity', statusCode: 400 };
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

    if (isNaN(productIdNumber) || isNaN(quantity) || quantity < 0) {
      return { error: 'Invalid product id or quantity', statusCode: 400 };
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

    if (isNaN(productIdNumber)) {
      return { error: 'Invalid productId', statusCode: 400 };
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
