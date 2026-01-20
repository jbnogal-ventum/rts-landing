import { useEffect } from 'react';
import gsap from 'gsap';

export const usePageTransitions = ({ loaderDone, location }) => {
  useEffect(() => {
    if (!loaderDone) return;
    
    const isHome = location.pathname === '/';
    
    if (!isHome) {
      document.documentElement.style.backgroundColor = '#000102';
      document.body.style.backgroundColor = '#000102';
    } else {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    }
    
    return () => {
      // Limpiar solo si es necesario
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, [location.pathname, loaderDone]);
};