import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './Cart.module.css';
import minusIcon from '../../assets/cart/minusIcon.svg';
import plusIcon from '../../assets/cart/plusIcon.svg';
import { deleteCartItem, fetchCartItems, updateCartItemQuantity } from '../../services/api';
import Spinner from '../../components/Spinner';

const Cart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems
  });

  const updateMutation = useMutation({ mutationFn: updateCartItemQuantity });

  const deleteMutation = useMutation({ mutationFn: deleteCartItem });

  const handleQuantityChange = (productId: number, changeQuantityByAmount: 1 | -1) => () => {
    const request = async () => {
      try {
        await updateMutation.mutateAsync({ productId, quantity: changeQuantityByAmount });
        await query.refetch();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };

    void request();
  };

  const handleDeleteItem = (productId: number) => () => {
    const request = async () => {
      try {
        await deleteMutation.mutateAsync(productId);
        await query.refetch();
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    };

    void request();
  };

  const handleBuy = () => {
    // TODO
  };

  const getCartItems = () => {
    return query.data?.map((cart, index) => (
      <div className={styles.product} key={index}>
        <img className={styles.productImage} src={cart.productDetails.thumbnail} alt='product' />
        <div className={styles.productDetails}>
          <h1 className={styles.productTitle}>{cart.productDetails.title}</h1>
          <p className={styles.productPrice}>₹{cart.productDetails.price}</p>

          <button className={styles.productButton}>
            <img
              className={updateMutation.isPending ? styles.disabled : styles.quantityIcon}
              src={minusIcon}
              alt='minus'
              onClick={handleQuantityChange(cart.productId, -1)}
            />
            <p className={styles.productQuantity}>{cart.quantity}</p>
            <img
              className={styles.quantityIcon}
              src={plusIcon}
              alt='plus'
              onClick={handleQuantityChange(cart.productId, +1)}
            />
          </button>

          <button className={styles.deleteButton} onClick={handleDeleteItem(cart.productId)}>
            Delete
          </button>
        </div>
      </div>
    ));
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
      <div className={styles.main}>
        <article className={styles.cartItems}>{getCartItems()}</article>
        <button className={styles.buyButton} onClick={handleBuy}>
          Proceed to buy
        </button>
      </div>
    </section>
  );
};

export default Cart;