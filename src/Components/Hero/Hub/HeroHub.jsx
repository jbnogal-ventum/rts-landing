import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroHubBackground from "../../../assets/Backgrounds/heroHubBackground.jpg";
import { SlideInAnimation } from "../../../animations/index";
export default function HeroHub() {
    return (<section
        id="hero-hub"
        className="relative w-full h-screen overflow-hidden"

    >
        {/* Imagen de fondo para desktop (oculta en mobile) */}
        <div
            className="hidden md:block absolute inset-0 bg-cover bg-no-repeat bg-center md:scale-110"
            style={{
                backgroundImage: `url(${heroHubBackground})`,
                zIndex: 1
            }}
        ></div>

        {/* Imagen para mobile (posicionada en el fondo) */}
        <div
            className="md:hidden absolute bottom-0 left-0 right-0 translate-x-50 translate-y-50 h-2/3 bg-cover bg-no-repeat "
            style={{
                backgroundImage: `url(${heroHubBackground})`,
                backgroundPosition: '43% center',
                zIndex: 1
            }}
        ></div>

        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20  w-full h-full md:px-7 py-9 px-3 " >
            <div className="py-9 flex flex-col gap-7 md:gap-4">
                <SlideInAnimation y={50} className="" repeat={true}>
                    <Typography variant="headline-large" className="md:text-display-lg " >
                        HUB
                    </Typography>
                </SlideInAnimation>
                <SlideInAnimation className="flex justify-end md:pr-9 pr-3 w-full" delay={0.7}>
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

    </section>)
}