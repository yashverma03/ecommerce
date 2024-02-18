import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './Cart.module.css';
import minusIcon from '../../assets/cart/minusIcon.svg';
import plusIcon from '../../assets/cart/plusIcon.svg';
import { deleteCartItem, fetchCartItems, updateCartItem } from '../../services/api';

const Cart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartItems
  });

  const updateMutation = useMutation({ mutationFn: updateCartItem });

  const deleteMutation = useMutation({ mutationFn: deleteCartItem });

  const handleQuantityChange = (productId: number, type: 'increase' | 'decrease') => () => {
    // TODO
  };

  const handleDeleteItem = (productId: number) => () => {
    // TODO
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
          <p className={styles.productPrice}>{cart.productDetails.price}</p>

          <button className={styles.productButton}>
            <img
              className={styles.minusIcon}
              src={minusIcon}
              alt='minus'
              onClick={handleQuantityChange(cart.productId, 'decrease')}
            />
            <p className={styles.productQuantity}>{cart.quantity}</p>
            <img
              className={styles.plusIcon}
              src={plusIcon}
              alt='plus'
              onClick={handleQuantityChange(cart.productId, 'increase')}
            />
          </button>

          <button className={styles.deleteButton} onClick={handleDeleteItem(cart.productId)}>
            Delete this product
          </button>
        </div>
      </div>
    ));
  };

  return (
    <main className={styles.main}>
      <section className={styles.cartItems}>{getCartItems()}</section>
      <button className={styles.buyButton} onClick={handleBuy}>
        Proceed to buy
      </button>
    </main>
  );
};

export default Cart;
