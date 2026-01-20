import { useEffect } from 'react';
import { useLenis } from '../hooks/useLenis';
import { useScrollEffects } from '../hooks/useScrollEffects';

export const ScrollContainer = ({ children, onScroll, loaderDone }) => {
  const lenisRef = useLenis({}, [loaderDone]);

  // Pasar scroll a callback si es necesario
  useEffect(() => {
    if (!lenisRef.current || !onScroll) return;

    const handleScroll = ({ scroll }) => {
      onScroll(scroll);
    };

    lenisRef.current.on('scroll', handleScroll);
    
    return () => {
      lenisRef.current?.off('scroll', handleScroll);
    };
  }, [lenisRef, onScroll]);

  // Conectar efectos de scroll
  useScrollEffects({ lenisRef, loaderDone, setScroll: onScroll });

  return (
    <div className="scroll-container" style={{ position: 'relative', zIndex: 3 }}>
      {children}
    </div>
  );
};