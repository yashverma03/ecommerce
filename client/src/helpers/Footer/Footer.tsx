import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../assets/logo.svg';
import instagramIcon from '../../assets/footer/instagramIcon.svg';
import facebookIcon from '../../assets/footer/facebookIcon.svg';
import twitterIcon from '../../assets/footer/twitterIcon.svg';

const Footer = () => {
  const links = [
    { name: 'Contact Us', url: '#' },
    { name: 'About Us', url: '#' },
    { name: 'Careers', url: '#' }
  ];

  const socialMedias = [
    { icon: instagramIcon, url: 'https://www.instagram.com/' },
    { icon: facebookIcon, url: 'https://www.facebook.com/' },
    { icon: twitterIcon, url: 'https://twitter.com/' }
  ];

  const getLinks = () => {
    return links.map((link, index) => (
      <Link className={styles.link} key={index} to={link.url}>
        {link.name}
      </Link>
    ));
  };

  const getSocialMedias = () => {
    return socialMedias.map((socialMedia, index) => (
      <Link key={index} to={socialMedia.url} target='_blank'>
        <img className={styles.socialMediaIcon} src={socialMedia.icon} alt='social media icon' />
      </Link>
    ));
  };

  const getClassName = () => {
    const hideOnPages = ['/login', '/sign-up'];
    const hide = hideOnPages.includes(location.pathname);
    return hide ? 'hide' : styles.main;
  };

  return (
    <footer className={getClassName()}>
      <section className={styles.logoWrap}>
        <img className={styles.logo} src={logo} alt='logo' />
        <h2 className={styles.copyright}>© Ecommerce 2024, all rights reserved</h2>
      </section>

      <nav className={styles.links}>
        <h1 className={styles.heading}>About</h1>
        {getLinks()}
      </nav>

      <nav className={styles.socialMedias}>
        <h1 className={styles.heading}>Social Media</h1>
        {getSocialMedias()}
      </nav>
    </footer>
  );
};

export default Footer;
