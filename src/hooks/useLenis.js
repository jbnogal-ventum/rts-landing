import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = (options = {}, deps = []) => {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  const initLenis = useCallback(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      ...options,
    });

    lenisRef.current = lenis;

    // RAF loop
    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return lenis;
  }, [options, ...deps]);

  const destroyLenis = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
  }, []);

  useEffect(() => {
    const lenis = initLenis();
    
    return () => {
      destroyLenis();
    };
  }, [initLenis, destroyLenis]);

  return lenisRef;
};