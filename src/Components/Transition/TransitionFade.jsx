import { useRef, useImperativeHandle, forwardRef, useContext, createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext();
export const useTransition = () => useContext(TransitionContext);

const Transition = forwardRef(({ children, enabled, lenisRef }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAnimating = useRef(false);
  const pendingNavigation = useRef(null);
  const pendingCallback = useRef(null);

  const go = (to, callback) => {
    if (isAnimating.current || to === location.pathname) return;
    
    isAnimating.current = true;
    pendingNavigation.current = to;
    pendingCallback.current = callback;
    
    if (lenisRef.current) lenisRef.current.stop();
    setIsVisible(true);
  };

  const handleEnterAnimationComplete = () => {
    if (pendingNavigation.current) {
      navigate(pendingNavigation.current);
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  const handleExitAnimationComplete = () => {
    isAnimating.current = false;
    if (lenisRef.current) lenisRef.current.start();
    pendingCallback.current?.();
    pendingNavigation.current = null;
    pendingCallback.current = null;
  };

  useImperativeHandle(ref, () => ({ go }));

  return (
    <TransitionContext.Provider value={{ go }}>
      <div className="transition-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {children}
        
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="page-transition-fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleEnterAnimationComplete}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000102',
                zIndex: 9999,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isAnimating.current && !isVisible && (
            <motion.div
              key="exit-fade"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.1,
              }}
              onAnimationComplete={handleExitAnimationComplete}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000102',
                zIndex: 9998,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
});

export default Transition;