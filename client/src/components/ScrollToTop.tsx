import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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
