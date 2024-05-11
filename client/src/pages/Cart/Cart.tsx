import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './Cart.module.css';
import minusIcon from '../../assets/cart/minusIcon.svg';
import plusIcon from '../../assets/cart/plusIcon.svg';
import {
  createPayment,
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity
} from '../../services/api';
import Spinner from '../../components/Spinner';

const Cart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems
  });

  const updateMutation = useMutation({ mutationFn: updateCartItemQuantity });
  const deleteMutation = useMutation({ mutationFn: deleteCartItem });
  const buyMutation = useMutation({ mutationFn: createPayment });

  const handleQuantityChange = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
    productId: number,
    changeQuantityByAmount: 1 | -1
  ) => {
    const request = async () => {
      try {
        event.preventDefault();
        await updateMutation.mutateAsync({ productId, quantity: changeQuantityByAmount });
        await query.refetch();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };

    void request();
  };

  const handleDeleteItem = (event: React.MouseEvent<HTMLButtonElement>, productId: number) => {
    const request = async () => {
      try {
        event.preventDefault();
        await deleteMutation.mutateAsync(productId);
        await query.refetch();
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    };

    void request();
  };

  const handleCheckout = (event: React.MouseEvent<HTMLButtonElement>) => {
    const request = async () => {
      try {
        event.preventDefault();
        const stripeData = await buyMutation.mutateAsync();
        if (stripeData?.sessionId == null || stripeData.stripe == null) {
          throw new Error('Error in creating payment session');
        }
        await stripeData.stripe.redirectToCheckout({ sessionId: stripeData.sessionId });
      } catch (error) {
        console.error('Error in creating payment session:', error);
      }
    };

    void request();
  };

  const getCartItems = () => {
    return query.data?.map((cart, index) => (
      <div className={styles.product} key={index}>
        <img className={styles.productImage} src={cart.productDetails.thumbnail} alt='product' />
        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>{cart.productDetails.title}</h1>
          <p className={styles.productPrice}>₹{cart.productDetails.price}</p>

          <button className={styles.productButton} disabled={updateMutation.isPending}>
            <img
              className={updateMutation.isPending ? styles.disabled : styles.quantityIcon}
              src={minusIcon}
              alt='minus'
              onClick={(event) => handleQuantityChange(event, cart.productId, -1)}
            />
            <p className={styles.productQuantity}>{cart.quantity}</p>
            <img
              className={updateMutation.isPending ? styles.disabled : styles.quantityIcon}
              src={plusIcon}
              alt='plus'
              onClick={(event) => handleQuantityChange(event, cart.productId, 1)}
            />
          </button>

          <button
            className={styles.deleteButton}
            disabled={deleteMutation.isPending}
            onClick={(event) => handleDeleteItem(event, cart.productId)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const getTotalPrice = () => {
    const price = query.data?.reduce(
      (total, cart) => total + cart.productDetails.price * cart.quantity,
      0
    );
    return price?.toFixed(2);
  };

  const getErrorMessage = () => {
    if (buyMutation.isError || (buyMutation.isSuccess && buyMutation.data == null)) {
      return <p className={`error ${styles.errorMessage}`}>Error in creating payment session</p>;
    }
  };

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError || (query.isSuccess && query.data == null)) {
    return <p className='error-screen'>Some error occured</p>;
  }

  if (query.data?.length === 0) {
    return <p className={`warning-screen ${styles.emptyMessage}`}>No items in cart</p>;
  }

  return (
    <section className={styles.section}>
      <form className={styles.main}>
        <article className={styles.cartItems}>{getCartItems()}</article>
        <p className={styles.price}>
          Total price: <strong className={styles.priceStrong}>₹{getTotalPrice()}</strong>
        </p>
        <button
          className={styles.buyButton}
          disabled={buyMutation.isPending}
          onClick={handleCheckout}
        >
          {buyMutation.isPending ? 'Processing payment...' : 'Proceed to buy'}
        </button>
        {getErrorMessage()}
      </form>
    </section>
  );
};

export default Cart;
