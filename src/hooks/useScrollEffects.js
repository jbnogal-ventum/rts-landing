import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollEffects = ({ lenisRef, loaderDone, setScroll }) => {
  useEffect(() => {
    if (!loaderDone || !lenisRef?.current) return;

    const lenis = lenisRef.current;

    // Configuración de ScrollTrigger con Lenis
    ScrollTrigger.scrollerProxy(".scroll-container", {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return { 
          top: 0, 
          left: 0, 
          width: window.innerWidth, 
          height: window.innerHeight 
        };
      },
    });

    ScrollTrigger.defaults({ scroller: ".scroll-container" });
    
    // Actualizar ScrollTrigger en cada frame de Lenis
    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on('scroll', updateScrollTrigger);
    
    // Evento de scroll para estado de React
    if (setScroll) {
      const handleScroll = ({ scroll }) => setScroll(scroll);
      lenis.on('scroll', handleScroll);
    }

    // Refresh después de que todo esté listo
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      if (lenis) {
        lenis.off('scroll', updateScrollTrigger);
        if (setScroll) {
          lenis.off('scroll', setScroll);
        }
      }
      // No matar todas las ScrollTriggers aquí para evitar problemas
    };
  }, [loaderDone, lenisRef, setScroll]);
};