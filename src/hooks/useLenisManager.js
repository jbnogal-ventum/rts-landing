// src/hooks/useLenisManager.js
import { useEffect, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';

export const useLenisManager = () => {
  const { setScroll, setLenis } = useApp();

  const initLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    setLenis(lenis);

    // Configurar ScrollTrigger
    ScrollTrigger.scrollerProxy(".scroll-container", {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.defaults({ scroller: ".scroll-container" });

    // RAF loop
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Evento de scroll
    lenis.on('scroll', ({ scroll }) => {
      setScroll(scroll);
      ScrollTrigger.update();
    });

    return lenis;
  }, [setScroll, setLenis]);

  useEffect(() => {
    const lenis = initLenis();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [initLenis]);
};