import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import styles from './Product.module.css';
import ratingIcon from '../../assets/products/ratingIcon.svg';
import { addToCart, fetchProductById } from '../../services/api';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import useFeedback from '../../components/hooks/useFeedback';
import Spinner from '../../components/Spinner';
import queryClient from '../../config/queryClient';

const Product = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const user = useSelector((state: RootState) => state.user);
  const [currentImage, setCurrentImage] = useState(0);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductById(id)
  });

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const isVisible = useFeedback([mutation.isSuccess]);

  const getImages = () => {
    return data?.images.map((image, index) => (
      <img
        className={styles.image}
        key={index}
        src={image}
        alt='product image'
        onMouseEnter={() => {
          setCurrentImage(index);
        }}
      />
    ));
  };

  const handleCart = () => {
    if (user === null) {
      navigate('/login');
      return;
    }

    if (data === undefined || data === null) {
      return;
    }

    mutation.mutate({ productId: data.id, price: data.price });
  };

  const getMessage = () => {
    if (mutation.isPending) {
      return <p className={`loading ${styles.message}`}>Adding to cart...</p>;
    }

    if (mutation.isError || (mutation.isSuccess && mutation.data === null)) {
      return <p className={`error ${styles.message}`}>Some error occured</p>;
    }

    if (mutation.data !== undefined) {
      return <p className={`success ${styles.message}`}>Added to cart successfully</p>;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if ((isSuccess && data === null) || isError) {
    return <p className='error-screen'>Some error occured</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.imageSection}>
        <figure className={styles.images}>{getImages()}</figure>

        <div className={styles.imageWrap}>
          <img className={styles.mainImage} src={data?.images[currentImage]} alt='product image' />
          <button className={styles.button} onClick={handleCart}>
            {user !== null ? 'Add to cart' : 'Login to add to cart'}
          </button>
          {isVisible && getMessage()}
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.detail1}>
          <h3 className={styles.brand}>{data?.brand}</h3>
          <p className={styles.category}>{data?.category}</p>
        </div>

        <div className={styles.detail2}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.ratingWrap}>
            <p className={styles.rating}>{data?.rating}</p>
            <img className={styles.ratingIcon} src={ratingIcon} alt='rating' />
          </div>
        </div>

        <h2 className={styles.description}>{data?.description}</h2>

        <div className={styles.detail3}>
          <p className={styles.price}>₹{data?.price}</p>
          <p className={styles.discount}>{data?.discountPercentage}% off</p>
        </div>
      </section>
    </main>
  );
};

export default Product;
