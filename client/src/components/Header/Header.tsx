import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import cartIcon from '../../assets/header/cartIcon.svg';
import searchIcon from '../../assets/header/searchIcon.svg';
import { setSearch } from '../../store/reducers/search';
import { useState } from 'react';
import { removeUser } from '../../store/reducers/user';
import type { RootState } from '../../store/store';

const Header = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(removeUser());
    navigate('/login');
  };

  const getButtons = () => {
    return user !== null ? (
      <article className={styles.userWrap}>
        <h1 className={styles.user}>{user?.name}</h1>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </article>
    ) : (
      <article className={styles.signUpWrap}>
        <Link className={styles.signUp} to='/sign-up'>
          Sign Up
        </Link>
      </article>
    );
  };

  const getClassName = () => {
    const hideOnPages = ['/login', '/sign-up'];
    const hide = hideOnPages.includes(location.pathname);
    return hide ? 'hide' : styles.main;
  };

  const handleSearch = () => {
    dispatch(setSearch(input));
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className={getClassName()}>
      <Link
        to='/'
        onClick={() => {
          dispatch(setSearch(''));
          setInput('');
        }}
      >
        <img className={styles.logo} src={logo} alt='logo' />
      </Link>

      <article className={styles.search}>
        <input
          className={styles.input}
          placeholder='Search for products, brands and more'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleEnter}
        />
        <img className={styles.searchIcon} src={searchIcon} alt='search' onClick={handleSearch} />
      </article>

      <Link to='/cart' className={styles.cartWrap}>
        <img className={styles.cartIcon} src={cartIcon} alt='cart' />
        <p className={styles.cart}>Cart</p>
      </Link>

      {getButtons()}
    </header>
  );
};

export default Header;
