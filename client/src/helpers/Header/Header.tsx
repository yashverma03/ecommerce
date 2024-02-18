import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import cartIcon from '../../assets/header/cartIcon.svg';
import searchIcon from '../../assets/header/searchIcon.svg';
import { setSearch } from '../../utils/store/reducers/search';
import { useState } from 'react';
import { removeUser } from '../../utils/store/reducers/user';
import type { RootState } from '../../utils/store/store';

const Header = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  // TODO: get cart count from redux
  const cartCount = 0;

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
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

  const getClassName = () => {
    const hideOnPages = ['/login', '/sign-up'];
    const hide = hideOnPages.includes(location.pathname);
    return hide ? 'hide' : styles.main;
  };

  return (
    <header className={getClassName()}>
      <Link to='/'>
        <img className={styles.logo} src={logo} alt='logo' />
      </Link>

      <section className={styles.search}>
        <input
          className={styles.input}
          placeholder='Search for products, brands and more'
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <img
          className={styles.searchIcon}
          src={searchIcon}
          alt='search'
          onClick={() => dispatch(setSearch(input))}
        />
      </section>

      <Link className={styles.cart} to='/cart'>
        <img className={styles.cartIcon} src={cartIcon} alt='cart' />
        <p className={styles.cartCount}>{cartCount}</p>
      </Link>

      {getButtons()}
    </header>
  );
};

export default Header;
