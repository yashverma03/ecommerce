import styles from './Order.module.css';

const Order = () => {
  return (
    <section className={styles.section}>
      <div className={styles.main}>
        <h1 className={styles.title}>Order Successfully Purchased!</h1>
        <p className={styles.message}>
          Thank you for your purchase. Your order has been successfully processed.
        </p>
      </div>
    </section>
  );
};

export default Order;
