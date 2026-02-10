// src/Components/Transition/Transition.jsx
import { useRef, useImperativeHandle, forwardRef, useContext, createContext, useState } from 'react';
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
            <>
              {/* Cortina izquierda */}
              <motion.div
                className="page-transition-curtain-left"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '-100%' }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: '#000102',
                  zIndex: 9999,
                  pointerEvents: 'none',
                }}
              />
              {/* Cortina derecha */}
              <motion.div
                className="page-transition-curtain-right"
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onAnimationComplete={handleEnterAnimationComplete}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '100%',
                  background: '#000102',
                  zIndex: 9999,
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isAnimating.current && !isVisible && (
            <>
              {/* Cortina izquierda - salida */}
              <motion.div
                key="exit-curtain-left"
                initial={{ x: '0%' }}
                animate={{ x: '-100%' }}
                transition={{
                  duration: 0.7,
                  ease: [0.12, 0, 0.39, 0],
                  delay: 0.3,
                }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: '#000102',
                  zIndex: 9998,
                  pointerEvents: 'none',
                }}
              />
              {/* Cortina derecha - salida */}
              <motion.div
                key="exit-curtain-right"
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 0.7,
                  ease: [0.12, 0, 0.39, 0],
                  delay: 0.3,
                }}
                onAnimationComplete={handleExitAnimationComplete}
                style={{
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  width: '50%',
                  height: '100%',
                  background: '#000102',
                  zIndex: 9998,
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
});

export default Transition;