import { getCartItemsService } from './cart.ts';
import Stripe from 'stripe';

const { DOMAIN } = process.env;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export const createPaymentService = async (userId: number | undefined) => {
  try {
    if (userId === undefined) {
      return { error: 'userId is invalid', statusCode: 401 };
    }

    const cartItemsData = await getCartItemsService(userId);

    if (cartItemsData.error != null) {
      return { error: cartItemsData.error, statusCode: 401 };
    }

    const cartItems = cartItemsData.cartItems;

    const lineItems = cartItems.map((product) => ({
      price_data: {
        currency: 'INR',
        product_data: {
          name: product.productDetails.title
        },
        unit_amount: product.productDetails.price * 100
      },
      quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${DOMAIN}/order`,
      cancel_url: `${DOMAIN}/cart`
    });

    return { sessionId: session.id };
  } catch (error: any) {
    throw new Error(`Error in adding to cart. ${error.message}`);
  }
};
