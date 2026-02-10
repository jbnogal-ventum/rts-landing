// // src/Components/Transition/Transition.jsx
// import { useRef, useImperativeHandle, forwardRef, useContext, createContext, useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const TransitionContext = createContext();
// export const useTransition = () => useContext(TransitionContext);

// const Transition = forwardRef(({ children, enabled, lenisRef }, ref) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAnimating = useRef(false);
//   const pendingNavigation = useRef(null);
//   const pendingCallback = useRef(null);

//   // Función principal de navegación
//   const go = (to, callback) => {
//     if (isAnimating.current || to === location.pathname) return;

//     isAnimating.current = true;
//     pendingNavigation.current = to;
//     pendingCallback.current = callback;

//     if (lenisRef.current) lenisRef.current.stop();

//     // Iniciar animación de entrada
//     setIsVisible(true);
//   };

//   // Manejar el final de la animación de entrada
//   const handleEnterAnimationComplete = () => {
//     if (pendingNavigation.current) {
//       // Navegar a la nueva ruta
//       navigate(pendingNavigation.current);
//       window.scrollTo({ top: 0, behavior: 'instant' });

//       if (lenisRef.current) {
//         lenisRef.current.scrollTo(0, { immediate: true });
//       }

//       // Iniciar animación de salida después de un breve delay
//       setTimeout(() => {
//         setIsVisible(false);
//       }, 300);
//     }
//   };

//   // Manejar el final de la animación de salida
//   const handleExitAnimationComplete = () => {
//     isAnimating.current = false;

//     if (lenisRef.current) lenisRef.current.start();

//     // Ejecutar callback si existe
//     if (pendingCallback.current) {
//       pendingCallback.current();
//     }

//     // Limpiar referencias
//     pendingNavigation.current = null;
//     pendingCallback.current = null;
//   };

//   useImperativeHandle(ref, () => ({ go }));

//   return (
//     <TransitionContext.Provider value={{ go }}>
//       <div className="transition-wrapper" style={{ position: 'relative', zIndex: 2 }}>
//         {children}

//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               className="page-transition-curtain"
//               initial={{ y: '-100%' }}
//               animate={{ y: '0%' }}
//               exit={{ y: '-100%' }}
//               transition={{
//                 duration: 0.4,
//                 ease: [0.65, 0, 0.35, 1], // Curva personalizada similar a power4.inOut
//               }}
//               onAnimationComplete={handleEnterAnimationComplete}
//               style={{
//                 position: 'fixed',
//                 inset: 0,
//                 background: '#000102',
//                 zIndex: 9999,
//                 pointerEvents: 'none',
//               }}
//             />
//           )}
//         </AnimatePresence>

//         {/* Segundo telón para la animación de salida */}
//         <AnimatePresence>
//           {isAnimating.current && !isVisible && (
//             <motion.div
//               key="exit-curtain"
//               initial={{ y: '0%' }}
//               animate={{ y: '-100%' }}
//               transition={{
//                 duration: 0.3,
//                 ease: [0.12, 0, 0.39, 0], // Curva similar a power3.out
//                 delay: 0.1,
//               }}
//               onAnimationComplete={handleExitAnimationComplete}
//               style={{
//                 position: 'fixed',
//                 inset: 0,
//                 background: '#000102',
//                 zIndex: 9998, // Un z-index menor que el telón principal
//                 pointerEvents: 'none',
//               }}
//             />
//           )}
//         </AnimatePresence>
//       </div>
//     </TransitionContext.Provider>
//   );
// });

// export default Transition;

// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx - Versión con desintegración simple
// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx
// src/Components/Transition/Transition.jsx
import { useRef, useImperativeHandle, forwardRef, useContext, createContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionContext = createContext();
export const useTransition = () => useContext(TransitionContext);

const Transition = forwardRef(({ children, enabled, lenisRef }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, curtain-up, dissolving
  const navigate = useNavigate();
  const location = useLocation();
  const isAnimating = useRef(false);
  const pendingNavigation = useRef(null);
  const pendingCallback = useRef(null);
  const completedAnimations = useRef(0);

  const go = (to, callback) => {
    if (isAnimating.current || to === location.pathname) return;

    isAnimating.current = true;
    pendingNavigation.current = to;
    pendingCallback.current = callback;
    completedAnimations.current = 0;

    if (lenisRef.current) lenisRef.current.stop();
    setIsVisible(true);
    setPhase('curtain-up');
  };

  const handleCurtainUpComplete = () => {
    if (pendingNavigation.current) {
      navigate(pendingNavigation.current);
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      setTimeout(() => {
        setPhase('dissolving');
      }, 100);
    }
  };

  const handleAnimationComplete = () => {
    completedAnimations.current += 1;
    const totalAnimations = gridItems.length;
    
    if (completedAnimations.current === totalAnimations) {
      handleAllAnimationsComplete();
    }
  };

  const handleAllAnimationsComplete = () => {
    setIsVisible(false);
    setPhase('idle');
    isAnimating.current = false;

    if (lenisRef.current) lenisRef.current.start();
    pendingCallback.current?.();
    pendingNavigation.current = null;
    pendingCallback.current = null;
  };

  useImperativeHandle(ref, () => ({ go }));

  // Crear la grilla de cuadraditos
  const gridSize = 10; // 10x10 = 100 persianas
  const gridItems = [];
  
  let maxDelay = 0;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let baseDelay = 0;

      // Asignamos delays por patrones de columnas
      if (col % 7 === 0) {
        baseDelay = 0;
      } else if (col % 5 === 0) {
        baseDelay = 0.15;
      } else if (col % 3 === 0) {
        baseDelay = 0.3;
      } else if (col % 2 === 0) {
        baseDelay = 0.45;
      } else {
        baseDelay = 0.6;
      }

      const randomVariation = Math.random() * 0.1;
      const rowFactor = (row / gridSize) * 0.1; // Aumentado para más efecto de fila
      const delay = baseDelay + randomVariation + rowFactor;
      
      if (delay > maxDelay) {
        maxDelay = delay;
      }

      gridItems.push({
        id: `${row}-${col}`,
        row,
        col,
        delay: delay,
      });
    }
  }

  const totalAnimationTime = maxDelay + 1.0 + 0.5; // 1.0s de duración + 0.3s margen

  return (
    <TransitionContext.Provider value={{ go }}>
      <div className="transition-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {children}

        <AnimatePresence>
          {isVisible && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
            >
              {/* Telón negro que sube */}
              <motion.div
                key="curtain"
                initial={{ y: '100%' }}
                animate={{
                  y: '0%',
                  opacity: phase === 'dissolving' ? 0 : 1
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                }}
                onAnimationComplete={handleCurtainUpComplete}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: '#000102',
                  zIndex: 1,
                }}
              />

              {/* Grilla de persianas que se levantan */}
              {phase === 'dissolving' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    gap: '0px',
                    zIndex: 2,
                  }}
                >
                  {gridItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{
                        scaleY: 1,
                        transformOrigin: 'top', // ¡IMPORTANTE! Se enrolla desde arriba
                      }}
                      animate={{
                        scaleY: 0, // Se "aplasta" verticalmente hasta desaparecer
                      }}
                      transition={{
                        duration: 0.7, // Duración del efecto de persiana
                        ease: [0.65, 0, 0.35, 1], // Misma curva que el telón
                        delay: item.delay,
                      }}
                      onAnimationComplete={handleAnimationComplete}
                      style={{
                        background: '#000102',
                        willChange: 'transform',
                        // Opcional: borde para efecto de persiana
                        //borderRight: '1px solid rgba(255,255,255,0.1)',
                        //borderBottom: '1px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Fallback timer */}
              {phase === 'dissolving' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  transition={{
                    duration: 0.1,
                    delay: totalAnimationTime,
                  }}
                  onAnimationComplete={handleAllAnimationsComplete}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 3,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </TransitionContext.Provider>
  );
});

export default Transition;