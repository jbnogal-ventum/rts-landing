import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "../lib/utils";
// left -> left: -100%
// right -> left: 100%
// top -> top: -100%
// bottom -> top: 100%
const SlideInAnimation = ({ 
  children,
  x = 0,
  y = 40,
  duration = 0.8,
  delay = 0,
  className = '',
  repeat = false,
  props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !repeat });
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('down');
  const isAnimating = useRef(false);
  const previousInView = useRef(false);

  // Detectar dirección del scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection.current = currentScrollY < lastScrollY.current ? 'up' : 'down';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto principal para manejar animaciones
  useEffect(() => {
    if (isInView && !isAnimating.current) {
      isAnimating.current = true;
      
      const fromTop = scrollDirection.current === 'down';
      
      // Si estamos scrolleando hacia abajo OR es la primera vez
      if (fromTop || !previousInView.current) {
        // Animación normal: desde abajo hacia arriba
        controls.start({
          opacity: 1,
          x: 0,
          y: 0,
          transition: { 
            opacity: { duration, delay, ease: "easeOut" },
            x: { duration, delay, ease: "easeOut" },
            y: { duration, delay, ease: "easeOut" }
          }
        });
      } else {
        // Animación inversa: desde arriba hacia abajo
        // Primero seteamos el estado inicial (fuera de pantalla arriba)
        controls.set({
          opacity: 0,
          x: x,
          y: -Math.abs(y)
        });
        
        // Luego animamos hacia el centro
        controls.start({
          opacity: 1,
          x: 0,
          y: 0,
          transition: { 
            opacity: { duration, delay, ease: "easeOut" },
            x: { duration, delay, ease: "easeOut" },
            y: { duration, delay, ease: "easeOut" }
          }
        });
      }
      
      // Resetear flag después de la animación
      setTimeout(() => {
        isAnimating.current = false;
      }, (duration + delay) * 1000 + 50);
    }
    
    // Cuando el componente sale de vista y repeat es true
    if (!isInView && previousInView.current && repeat) {
      // Preparar para la próxima animación según la dirección del scroll
      if (scrollDirection.current === 'down') {
        // Vamos hacia abajo, preparar animación desde arriba
        controls.set({
          opacity: 0,
          x: x,
          y: -Math.abs(y)
        });
      } else {
        // Vamos hacia arriba, preparar animación desde abajo
        controls.set({
          opacity: 0,
          x: x,
          y: y
        });
      }
    }
    
    previousInView.current = isInView;
  }, [isInView, controls, repeat, delay, duration, x, y]);

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div
        initial={{ opacity: 0, x, y }}
        animate={controls}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </div>
  );
};

export { SlideInAnimation };