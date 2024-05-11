import Cart from '../model/cart.ts';
import CartItem from '../model/cartItem.ts';
import { getProductByIdService } from './product.ts';

export const addToCartService = async (
  userId: number | undefined,
  productId: number,
  quantity: number
) => {
  try {
    if (userId === undefined) {
      return { error: 'userId is invalid', statusCode: 401 };
    }

    const [activeCart] = await Cart.findOrCreate({ where: { userId, isActive: true } });
    const { cartId } = activeCart;

    const existingCarts = await CartItem.findAll({ where: { cartId } });
    const existingCart = existingCarts.find((cart) => cart.productId === productId);

    const product = await getProductByIdService(productId.toString());

    if (existingCart == null) {
      const newCart = await CartItem.create({ cartId, productId, quantity, price: product.price });
      return { message: 'Product added to cart successfully', cartItem: newCart };
    }

    existingCart.quantity += quantity;
    const updatedCart = await existingCart.save();
    return { message: 'Cart updated successfully', cartItem: updatedCart };
  } catch (error: any) {
    throw new Error(`Error in adding to cart. ${error.message}`);
  }
};

export const getCartItemsService = async (userId: number | undefined) => {
  try {
    if (userId === undefined) {
      return { error: 'userId is invalid', statusCode: 401 };
    }

    const activeCart = await Cart.findOne({ where: { userId, isActive: true } });

    if (activeCart == null) {
      return { message: 'Cart is empty', cartItems: [] };
    }

    const { cartId } = activeCart;
    const cartItems = await CartItem.findAll({ where: { cartId } });

    const cartItemsWithProducts = await Promise.all(
      cartItems.map(async (cartItem) => {
        const productId = cartItem.productId;
        const productDetails = await getProductByIdService(productId.toString());
        return { ...cartItem.toJSON(), productDetails };
      })
    );

    return { message: 'Cart items found', cartItems: cartItemsWithProducts };
  } catch (error: any) {
    throw new Error(`Error in getting cart items. ${error.message}`);
  }
};

export const updateCartItemQuantityService = async (
  userId: number | undefined,
  productId: string,
  quantity: 1 | -1
) => {
  try {
    if (userId === undefined) {
      return { error: 'userId is invalid', statusCode: 401 };
    }

    if (!(quantity === 1 || quantity === -1)) {
      return { error: 'Quantity should be +1 or -1', statusCode: 400 };
    }

    const activeCart = await Cart.findOne({ where: { userId, isActive: true } });

    if (activeCart == null) {
      return { error: 'Cart is empty', statusCode: 404 };
    }

    const { cartId } = activeCart;
    const cartItem = await CartItem.findOne({ where: { cartId, productId: parseInt(productId) } });

    if (cartItem === null) {
      return { error: 'Cart item not found', statusCode: 404 };
    }

    cartItem.quantity += quantity;

    if (cartItem.quantity === 0) {
      await cartItem.destroy();
      return { message: 'Cart item deleted successfully', cartItem };
    }

    const updatedCartItem = await cartItem.save();
    return { message: 'Cart item updated successfully', cartItem: updatedCartItem };
  } catch (error: any) {
    throw new Error(`Error updating cart item. ${error.message}`);
  }
};

export const deleteCartItemService = async (userId: number | undefined, productId: string) => {
  try {
    if (userId === undefined) {
      return { error: 'userId is invalid', statusCode: 401 };
    }

    const activeCart = await Cart.findOne({ where: { userId, isActive: true } });

    if (activeCart == null) {
      return { error: 'Cart is empty', statusCode: 404 };
    }

    const { cartId } = activeCart;
    const cartsDeleted = await CartItem.destroy({
      where: { cartId, productId: parseInt(productId) }
    });

    if (cartsDeleted === 0) {
      return { error: 'Cart item not found', statusCode: 404 };
    }

    return { cartsDeleted };
  } catch (error: any) {
    throw new Error(`Error deleting cart item. ${error.message}`);
  }
};
