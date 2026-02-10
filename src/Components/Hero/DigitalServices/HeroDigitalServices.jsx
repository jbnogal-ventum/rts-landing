import { Typography } from "../../index";
import { useRef, useState } from "react";
import heroHubBackground from "../../../assets/Backgrounds/HeroDigitalServices.png";
import { SlideInAnimation } from "../../../animations";

export default function HeroDigitalServices() {
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
        const scale = isHovering ? 1 + (distance * 0.5) : 1;

        // Rotación sutil basada en la posición
        const rotateX = isHovering ? (mousePosition.y - centerY) * 4 : 0;
        const rotateY = isHovering ? (mousePosition.x - centerX) * 4 : 0;

        return {
            blur: `${blur}px`,
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
            id="hero-digital-services"
            ref={rootRef}
            className="relative w-full h-full min-h-screen overflow-hidden cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Contenedor de la imagen con efecto */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div
                    className="w-full h-full md:max-w-[90%] md:max-h-[90%] relative"
                    style={{
                        backgroundImage: `url(${heroHubBackground})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        filter: `
                            blur(${distortion.blur})
                            brightness(${distortion.brightness})
                        `,
                        transform: `
                            scale(${distortion.scale})
                            perspective(1000px)
                            rotateX(${distortion.rotateX})
                            rotateY(${distortion.rotateY})
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
                <div className="pt-9 flex flex-col gap-9 md:gap-4">
                    <SlideInAnimation y={50} delay={0.5}><Typography variant="headline-large" className="md:text-display-lg">
                        DIGITAL SKILLS
                    </Typography>
                    </SlideInAnimation>
                    <SlideInAnimation delay={0.8}>
                        <div className="flex md:justify-center justify-end pr-3 text-secondary">
                            <Typography
                                variant="title-small"
                                className="w-2/3 md:w-1/3 md:text-title-medium"
                            >
                                — turns industrial data into actionable intelligence.
                            </Typography>
                        </div>
                    </SlideInAnimation>
                </div>
            </div>
        </section>
    )
}
