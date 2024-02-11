import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './Product.module.css';
import ratingIcon from '../../assets/products/ratingIcon.svg';
import { fetchProductById } from '../../utils/api';
import Spinner from '../../helpers/Spinner';
import { useSelector } from 'react-redux';
import type { RootState } from '../../utils/store/store';

const Product = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductById(id)
  });

  const [currentImage, setCurrentImage] = useState(0);

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

    // TODO: Add API
  };

  if (isLoading) {
    return <Spinner />;
  }

  if ((isSuccess && data === undefined) || isError) {
    return <p className='error-screen'>Some error occured</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.imageSection}>
        <div className={styles.images}>{getImages()}</div>

        <div className={styles.imageWrap}>
          <img className={styles.mainImage} src={data?.images[currentImage]} alt='product image' />
          <button className={styles.button} onClick={handleCart}>
            {user !== null ? 'Add to cart' : 'Login to add to cart'}
          </button>
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.detail1}>
          <h3 className={styles.brand}>{data?.brand}</h3>
          <h5 className={styles.category}>{data?.category}</h5>
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
          <h4 className={styles.price}>₹{data?.price}</h4>
          <p className={styles.discount}>{data?.discountPercentage}% off</p>
        </div>
      </section>
    </main>
  );
};

export default Product;
