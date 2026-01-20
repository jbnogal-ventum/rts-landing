import { useEffect } from 'react';
import gsap from 'gsap';

export const useHeroAnimation = (loaderDone) => {
  useEffect(() => {
    if (!loaderDone) return;
    
    gsap.set("#hero", { visibility: "visible" });
    
    // Dispatch custom event para sincronización con otros componentes
    if (!window.__heroEnter) {
      window.__heroEnter = true;
      window.dispatchEvent(new Event("hero:enter"));
    }
  }, [loaderDone]);
};