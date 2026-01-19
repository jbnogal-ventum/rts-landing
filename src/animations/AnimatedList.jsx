import { motion } from 'framer-motion';

/**
 * Contenedor para animaciones de lista con stagger effect
 */
const AnimatedList = ({
  children,
  className = '',
  staggerChildren = 0.1,
  delayChildren = 0,
  duration = 0.6,
  blurAmount = 5,
  yOffset = 20,
  easing = 'easeOut',
  style = {},
  ...props
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delayChildren,
        staggerChildren: staggerChildren,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      filter: `blur(${blurAmount}px)` 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      {...props}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedList;