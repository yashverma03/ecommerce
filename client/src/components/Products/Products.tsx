import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Products.module.css';
import { fetchCategories, fetchProducts } from '../../utils/api';
import { ITEMS_PER_PAGE } from '../../utils/utils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../utils/store/store';
import Spinner from '../../helpers/Spinner';
import ratingIcon from '../../assets/products/ratingIcon.svg';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = parseInt(searchParams.get('page') ?? '1');

  const search = useSelector((state: RootState) => state.search.value);
  const [sort, setSort] = useState('');
  const [price, setPrice] = useState({ minPrice: '', maxPrice: '' });
  const [category, setCategory] = useState('');

  const productQuery = useQuery({
    queryKey: ['products', category, sort, pageNumber, search],
    queryFn: fetchProducts({
      search,
      category,
      minPrice: price.minPrice,
      maxPrice: price.maxPrice,
      sort,
      limit: ITEMS_PER_PAGE.toString(),
      skip: ((pageNumber - 1) * ITEMS_PER_PAGE).toString()
    })
  });

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const getSortFilter = () => {
    const options = [
      { id: 'price-asc', name: 'Price: Low to High' },
      { id: 'price-desc', name: 'Price: High to Low' },
      { id: 'rating-asc', name: 'Rating: Low to High' },
      { id: 'rating-desc', name: 'Rating: High to Low' }
    ];

    return (
      <select
        className={styles.sortSelect}
        value={sort}
        onChange={(event) => {
          setSort(event.target.value);
        }}
      >
        <option value='' hidden>
          Sort by
        </option>

        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  const handlePriceFilter = () => {
    const request = async () => {
      await productQuery.refetch();
    };

    void request();
  };

  const getPriceFilter = () => {
    return (
      <article className={styles.priceFilter}>
        <input
          className={styles.priceInput}
          value={price.minPrice}
          type='number'
          placeholder='Min'
          onChange={(event) => {
            setPrice({ ...price, minPrice: event.target.value });
          }}
        />
        <p className={styles.priceText}>To</p>
        <input
          className={styles.priceInput}
          value={price.maxPrice}
          type='number'
          placeholder='Max'
          onChange={(event) => {
            setPrice({ ...price, maxPrice: event.target.value });
          }}
        />
        <button className={styles.priceButton} onClick={handlePriceFilter}>
          Search
        </button>
      </article>
    );
  };

  const getCategories = () => {
    return (
      <select
        className={styles.categorySelect}
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value='' hidden>
          Select a category
        </option>

        {categoryQuery.data?.map((category, index) => {
          const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
          const formattedCategory = capitalizedCategory.replace(/-/g, ' ');

          return (
            <option key={index} value={category}>
              {formattedCategory}
            </option>
          );
        })}
      </select>
    );
  };

  const getProducts = () => {
    return productQuery?.data?.products?.map((product) => (
      <Link className={styles.product} to={`/product/${product.id}`} key={product.id}>
        <img className={styles.image} src={product.thumbnail} alt='thumbnail' />

        <div className={styles.details}>
          <div className={styles.detail1}>
            <h4 className={styles.brand}>{product.brand}</h4>
            <h5 className={styles.category}>{product.category}</h5>
          </div>

          <div className={styles.detail2}>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.ratingWrap}>
              <p className={styles.rating}>{product?.rating}</p>
              <img className={styles.ratingIcon} src={ratingIcon} alt='rating' />
            </div>
          </div>

          <h2 className={styles.description}>{product.description}</h2>
          <h3 className={styles.price}>₹{product.price}</h3>
        </div>
      </Link>
    ));
  };

  const handlePagination = (page: number) => () => {
    setSearchParams({ ...searchParams, page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPagination = () => {
    if (productQuery?.data?.total === undefined) {
      return null;
    }

    const totalPages = Math.ceil(productQuery?.data?.total / ITEMS_PER_PAGE);
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pages.map((page) => (
      <button
        className={page === pageNumber ? `${styles.page} ${styles.selected}` : styles.page}
        key={page}
        onClick={handlePagination(page)}
      >
        {page}
      </button>
    ));
  };

  if (productQuery.isLoading) {
    return <Spinner />;
  }

  if ((productQuery.isSuccess && productQuery.data === undefined) || productQuery.isError) {
    return <p className='error-screen'>Some error occured</p>;
  }

  if (productQuery.isSuccess && productQuery.data?.products.length === 0) {
    return <p className='warning-screen'>No Products were found</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {getSortFilter()}
        {getPriceFilter()}
        {getCategories()}
      </section>
      <section className={styles.products}>{getProducts()}</section>
      <div className={styles.pagination}>{getPagination()}</div>
    </main>
  );
};

export default Products;
