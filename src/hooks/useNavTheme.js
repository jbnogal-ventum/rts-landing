import { useEffect } from 'react';
import gsap from 'gsap';

export const useNavTheme = (triggerRef, setNavMode) => {
  useEffect(() => {
    if (!triggerRef.current) return;

    const root = document.documentElement;
    
    const handleEnter = () => {
      gsap.to(root, {
        '--color-bg': 'var(--color-bg-light)',
        '--color-text': 'var(--color-text-light)',
        duration: 0.4,
        ease: 'none',
      });
      
      gsap.delayedCall(0.25, () => {
        setNavMode('light');
        window.dispatchEvent(new Event('navLight'));
      });
    };

    const handleLeave = () => {
      gsap.to(root, {
        '--color-bg': '#000000',
        '--color-text': '#ffffff',
        duration: 0.4,
        ease: 'none',
      });
      
      gsap.delayedCall(0.25, () => {
        setNavMode('dark');
        window.dispatchEvent(new Event('navDark'));
      });
    };

    // Usar Intersection Observer como alternativa más moderna
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleEnter();
          } else {
            handleLeave();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(triggerRef.current);
    
    return () => observer.disconnect();
  }, [triggerRef, setNavMode]);
};