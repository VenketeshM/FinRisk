import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to allow for the page transition
    const timeoutId = setTimeout(() => {
      // Only scroll if we're not already at the top
      if (window.scrollY === 0) return;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
};
