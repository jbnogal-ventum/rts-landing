import { motion } from 'framer-motion';

/**
 * Componente para animaciones en lista con stagger effect
 * Debe usarse dentro de AnimatedList
 */
const AnimatedItem = ({
  children,
  className = '',
  index = 0,
  staggerDelay = 0.1,
  delay = 0,
  duration = 0.5,
  blurAmount = 5,
  yOffset = 20,
  easing = 'easeOut',
  style = {},
  ...props
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ 
        opacity: 0, 
        y: yOffset, 
        filter: `blur(${blurAmount}px)` 
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true }}
      transition={{
        delay: delay + (index * staggerDelay),
        duration,
        ease: easing,
        opacity: { duration: duration * 0.8 },
        y: { duration, ease: easing },
        filter: { duration: duration * 0.6 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedItem;