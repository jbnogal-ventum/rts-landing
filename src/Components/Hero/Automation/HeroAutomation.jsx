import { Typography, Button } from "../../index";
import { useEffect, useRef, useState } from "react";
import heroHubBackground from "../../../assets/Backgrounds/hero_a_y_c.webp";
import { SlideInAnimation } from "../../../animations";
import { motion } from "framer-motion";
export default function HeroAutomation() {
    const rootRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        if (!rootRef.current) return;

        const rect = rootRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 }); // Vuelve al centro
    };

    // Calculamos los valores de distorsión
    const getDistortionValues = () => {
        const centerX = 0.5;
        const centerY = 0.5;

        // Distancia desde el centro (0 a 0.707 máximo)
        const distanceX = Math.abs(mousePosition.x - centerX);
        const distanceY = Math.abs(mousePosition.y - centerY);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Efectos basados en la posición del mouse
        // const blur = isHovering ? distance * 7 : 0;
        const brightness = isHovering ? 1 + (distance * 0.5) : 1;
        const scale = isHovering ? 1 + (distance * 0.1) : 1;

        // Rotación sutil basada en la posición
        const rotateX = isHovering ? (mousePosition.y - centerY) * 4 : 0;
        const rotateY = isHovering ? (mousePosition.x - centerX) * 4 : 0;

        return {
            //  blur: `${blur}px`,
            brightness,
            scale,
            rotateX: `${rotateX}deg`,
            rotateY: `${rotateY}deg`,
            transition: isHovering ? 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)' : 'all 0.7s ease'
        };
    };

    const distortion = getDistortionValues();

    return (
        <section
            id="hero-automation"
            ref={rootRef}
            className="relative w-full h-full min-h-screen overflow-hidden "
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Imagen de fondo con distorsión dinámica */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={heroHubBackground}
                    alt="Image of Automation & Controls Hero Background"
                    fetchpriority="high"     // Le dice al browser: esto es crítico, cargalo primero
                    decoding="async"
                    className="w-full h-full object-contain object-center"
                    style={{
                        filter: `brightness(${distortion.brightness})`,
                        willChange: 'filter',
                        transition: distortion.transition,
                        transform: `
                                        scale(${distortion.scale})
                                        perspective(1000px)
                                        rotateX(${distortion.rotateX})
                                        rotateY(${distortion.rotateY})
                                    `,
                        transformOrigin: 'center center'
                    }}
                />
            </div>
            {/* Overlay con gradiente dinámico basado en mouse */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                            rgba(0,0,0,0) 0%,
                            rgba(0,0,0,0.3) 30%,
                            rgba(0,0,0,0.6) 70%,
                            rgba(0,0,0,0.8) 100%
                        )
                    `,
                    transition: 'background 0.3s ease'
                }}
            />

            {/* Contenido */}
            <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                <div className="pt-9 flex flex-col gap-8 md:gap-4">
                    <SlideInAnimation y={50} delay={1} ><Typography variant="headline-large" className="md:text-display-lg">
                        AUTOMATION<br />& CONTROLS
                    </Typography>
                    </SlideInAnimation>
                    <SlideInAnimation delay={1.3} className="">
                        <div className="flex justify-end md:justify-center md:mr-5 text-secondary">
                            <Typography
                                variant="title-small"
                                className="w-4/5 md:w-3/5 md:text-title-medium"
                            >
                                — provide expert guidance to<br className="md:block hidden" /> design and integrate control systems

                            </Typography>
                        </div>
                    </SlideInAnimation>
                </div>
            </div>
              {/* Scroll indicator - bottom center */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <svg width="26" height="44" viewBox="0 0 20 44" fill="none" className="overflow-visible">
                    <motion.rect
                        x="1"
                        y="1"
                        width="24"
                        height="42"
                        rx="12"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 1.2, delay: 0.5,
                            ease: "easeInOut",
                        }}
                    />
                </svg>
                {/* Puntito animado posicionado encima del SVG */}
                <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ y: [0, 12, 0], opacity: [1, 0, 0] }}
                    transition={{
                        duration: 1.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2, // arranca cuando termina de dibujarse el óvalo
                    }}
                /> 
            </div>
        </section>
    )
}