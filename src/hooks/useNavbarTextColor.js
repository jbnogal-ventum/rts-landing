// hooks/useNavbarTextColor.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useNavbarTextColor() {
  const [buttonTheme, setButtonTheme] = useState('light');
  const navbarRef = useRef(null);
  const rafRef = useRef(null);

  const checkBackgroundBrightness = useCallback(() => {
  if (!navbarRef.current) return;

  const navbar = navbarRef.current;
  const rect = navbar.getBoundingClientRect();
  
  if (rect.width === 0 || rect.height === 0) return;

  // Usar SOLO el lado izquierdo del navbar (25% desde la izquierda)
  const leftX = rect.left + rect.width * 0.25;
  const centerY = rect.top + rect.height / 2;

  try {
    const findElementBehindNavbar = (x, y) => {
      const elementsAtPoint = document.elementsFromPoint(x, y);
      
      for (const element of elementsAtPoint) {
        if (element === navbar || navbar.contains(element)) continue;
        
        const bgColor = window.getComputedStyle(element).backgroundColor;
        
        if (bgColor !== 'transparent' && bgColor !== 'rgba(0, 0, 0, 0)') {
          return element;
        }
      }
      return document.body;
    };

    const elementBehind = findElementBehindNavbar(leftX, centerY);
    
    let bgColor = window.getComputedStyle(elementBehind).backgroundColor;
    
    let currentElement = elementBehind;
    while ((bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') && currentElement.parentElement) {
      currentElement = currentElement.parentElement;
      bgColor = window.getComputedStyle(currentElement).backgroundColor;
    }
    
    calculateBrightness(bgColor);
    
  } catch (error) {
    console.error('Error detecting background:', error);
  }
}, []);
  const calculateBrightness = (bgColor) => {
    const rgb = bgColor.match(/\d+/g);
    if (rgb && rgb.length >= 3) {
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      console.log('Brightness:', brightness);
      
      const newTheme = brightness < 230 ? 'dark' : 'light';
      console.log('New theme:', newTheme);
      
      setButtonTheme(prevTheme => {
        if (prevTheme !== newTheme) {
          console.log('Theme changed from', prevTheme, 'to', newTheme);
          return newTheme;
        }
        return prevTheme;
      });
    } else {
      // Si no podemos obtener RGB, asumimos light por defecto
      console.log('Could not parse RGB, keeping current theme');
    }
  };

  useEffect(() => {
    // Pequeño delay para asegurar que todo está renderizado
    const timeoutId = setTimeout(() => {
      checkBackgroundBrightness();
    }, 200);

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        checkBackgroundBrightness();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    const observer = new MutationObserver(() => {
      handleScroll();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [checkBackgroundBrightness]);

  return { buttonTheme, navbarRef };
}