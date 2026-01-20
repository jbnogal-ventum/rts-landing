import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollTrigger = (triggerRef, callbacks) => {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger,
      start: 'top center',
      end: 'bottom center',
      scrub: false,
      ...callbacks,
    });

    return () => st.kill();
  }, [triggerRef, callbacks]);
};