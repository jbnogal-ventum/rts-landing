import { Typography, Button } from "../../index";
import { useEffect, useRef, useState } from "react";
import heroCultureBackground from "../../../assets/Backgrounds/culture_background.webp";
import { SlideInAnimation } from "../../../animations/index";
import { motion } from "framer-motion";
export default function HeroIndustries() {
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

        return {
            // blur: `${blur}px`,
            brightness,

            transition: isHovering ? 'all 0.7s cubic-bezier(0.23, 1, 0.32, 1)' : 'all 0.7s ease'
        };
    };

    const distortion = getDistortionValues();

    return (
        <section
            id="hero-culture"
            ref={rootRef}
            className="relative w-full h-full min-h-screen overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Imagen de fondo con distorsión dinámica */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={heroCultureBackground}
                    alt="Image of Culture Hero Background"
                    fetchpriority="high"     // Le dice al browser: esto es crítico, cargalo primero
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    style={{
                        filter: `brightness(${distortion.brightness})`,
                        willChange: 'filter',
                        transition: distortion.transition,
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
                <div className="pt-9 flex flex-col gap-6 md:gap-4">
                    <SlideInAnimation y={50} delay={1} repeat={true}><Typography variant="headline-large" className="md:text-display-lg ">
                        CULTURE
                    </Typography>
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