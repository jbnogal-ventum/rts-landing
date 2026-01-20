import { useEffect, useState } from 'react';

export const useScrollPosition = (lenisRef) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!lenisRef?.current) return;

    const handleScroll = ({ scroll }) => {
      setScroll(scroll);
    };

    lenisRef.current.on('scroll', handleScroll);
    
    return () => {
      lenisRef.current?.off('scroll', handleScroll);
    };
  }, [lenisRef]);

  return scroll;
};