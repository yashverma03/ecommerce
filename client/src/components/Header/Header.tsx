import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import cartIcon from '../../assets/header/cartIcon.svg';
import searchIcon from '../../assets/header/searchIcon.svg';
import type { RootState } from '../../utils/store/store';
import { setSearch } from '../../utils/store/reducers/search';
import { getFromLocalStorage } from '../../utils/localStorageApi';

const Header = () => {
  const search = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getFromLocalStorage('user');

  // TODO: get cart count from redux
  const cartCount = 0;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getButtons = () => {
    return user !== null ? (
      <section className={styles.userWrap}>
        <h1 className={styles.user}>{user?.name}</h1>
        <Link className={styles.profile} to='/profile'>
          Profile
        </Link>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </section>
    ) : (
      <section className={styles.signUpWrap}>
        <Link className={styles.signUp} to='/sign-up'>
          Sign Up
        </Link>
      </section>
    );
  };

  return (
    <main className={styles.main}>
      <Link to='/'>
        <img className={styles.logo} src={logo} alt='logo' />
      </Link>

      <section className={styles.search}>
        <input
          className={styles.input}
          placeholder='Search for products, brands and more'
          value={search}
          onChange={handleInputChange}
        />
        <img className={styles.searchIcon} src={searchIcon} alt='search' />
      </section>

      <Link className={styles.cart} to='/cart'>
        <img className={styles.cartIcon} src={cartIcon} alt='cart' />
        <p className={styles.cartCount}>{cartCount}</p>
      </Link>

      {getButtons()}
    </main>
  );
};

export default Header;
