import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroHubBackground from "../../../assets/Backgrounds/heroHubBackground.webp";
import { SlideInAnimation } from "../../../animations/index";
import { motion } from "framer-motion";
export default function HeroHub() {
    return (<section
        id="hero-hub"
        className="relative w-full h-screen overflow-hidden"

    >

        {/* Imagen de fondo con distorsión dinámica */}
        <div className="hidden md:block absolute inset-0 bg-cover bg-no-repeat bg-center md:scale-110">
            <img    
                src={heroHubBackground}
                alt="Image of Hub Hero Background"
                fetchpriority="high"     // Le dice al browser: esto es crítico, cargalo primero
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{

                }}
            />
        </div>
        {/* Imagen para mobile (posicionada en el fondo) */}

        <div className="md:hidden absolute bottom-0 left-0 right-0 translate-x-50 translate-y-50 h-2/3 bg-cover bg-no-repeat ">
            <img
                src={heroHubBackground}
                alt="Image of Hub Hero Background"
                fetchpriority="high"     // Le dice al browser: esto es crítico, cargalo primero
                decoding="async"
                className="w-full h-full object-cover object-center"
                style={{

                }}
            />
        </div>
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20  w-full h-full md:px-7 py-9 px-3 " >
            <div className="py-9 flex flex-col gap-7 md:gap-4">
                <SlideInAnimation y={50} className="" delay={1}>
                    <Typography variant="headline-large" className="md:text-display-lg " >
                        HUB
                    </Typography>
                </SlideInAnimation>
                <SlideInAnimation className="flex justify-end md:pr-9 pr-3 w-full text-secondary" delay={1.3}>
                    <Typography
                        variant="title-small"
                        className="w-2/3 hidden md:block"
                    >
                        Born from sparks of innovation, RTS HUB embodies the restless spirit of creation — connecting minds, machines, and ideas to redefine what’s possible in industry.
                    </Typography>
                    <Typography
                        variant="title-small"
                        className="w-3/4  md:hidden"
                    >
                        — stands to ensure technical excellence, operational reliability, <br />and seamless project execution.
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
    </section>)
}