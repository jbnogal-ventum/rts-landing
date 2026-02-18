import { Typography, Button } from "../../index";
import { useEffect, useRef, useState } from "react";
import heroCultureBackground from "../../../assets/Backgrounds/culture_background.png";
import { SlideInAnimation } from "../../../animations/index";

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
        const blur = isHovering ? distance * 7 : 0;
        const brightness = isHovering ? 1 + (distance * 0.5) : 1;
        const scale =  1;

        return {
            blur: `${blur}px`,
            brightness,
            scale,
            // rotateX: `${rotateX}deg`,
            // rotateY: `${rotateY}deg`,
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
            {/* Contenedor de la imagen con efecto */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div
                    className="w-full h-full relative"
                    style={{
                        backgroundImage: `url(${heroCultureBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        filter: `
                            blur(${distortion.blur})
                            brightness(${distortion.brightness})
                        `,
                        transform: `
                            perspective(1000px)
                     
                        `,
                        transformOrigin: 'center center',
                        transition: distortion.transition,
                        willChange: 'transform, filter'
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
        </section>
    )
}