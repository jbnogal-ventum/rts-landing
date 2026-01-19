// src/animations/FadeInBlur.jsx
import { motion } from 'framer-motion';

const FadeInBlur = ({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    blurAmount = 5,
    yOffset = 20,
    once = true,
    easing = 'easeOut',
    style = {},
    onAnimationComplete,
    mode = 'onView', // 'onView' o 'onMount'
    viewThreshold = 0.1,
    ...props
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: yOffset,
            filter: `blur(${blurAmount}px)`,
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                delay,
                duration,
                ease: easing,
                opacity: { duration: duration * 0.8 },
                y: { duration, ease: easing },
                filter: { duration: duration * 0.6 },
            },
        },
    };

    // Modo 1: Animar al montar (para Hero)
    if (mode === 'onMount') {
        return (
            <motion.div
                className={className}
                style={style}
                initial="hidden"
                animate="visible"
                variants={variants}
                onAnimationComplete={onAnimationComplete}
                {...props}
            >
                {children}
            </motion.div>
        );
    }

    // Modo 2: Animar al entrar en viewport (default)
    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="visible"
            viewport={{ 
                once, 
                amount: viewThreshold,
                margin: '-50px 0px -50px 0px'
            }}
            variants={variants}
            onAnimationComplete={onAnimationComplete}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default FadeInBlur;