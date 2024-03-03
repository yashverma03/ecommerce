import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component for React Router.
 * This component scrolls to the top of the page whenever the route changes (except when only language is changed).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const previousLocation = useRef('');

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    if (previousLocation.current.substring(4) !== pathname.substring(4)) {
      scrollToTop();
    }

    previousLocation.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
