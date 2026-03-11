import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const FadeInScaleAnimation = ({ children, className, delay, duration=0.5, ...props}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {});
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
const FadeInAnimation = ({ children, className, delay, duration=0.6,  ...props}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {});
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView]);

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
export {FadeInScaleAnimation, FadeInAnimation};
