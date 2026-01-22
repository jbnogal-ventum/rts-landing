import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroHubBackground from "../../../assets/Backgrounds/heroHubBackground.jpg";
import { FadeInBlur } from "../../../animations/index.js"
export default function HeroHub({ onPhase }) {
    const rootRef = useRef(null);
    return (<section
        id="hero-hub"
        ref={rootRef}
        className="relative w-full h-full min-h-screen"
        style={{
            backgroundImage: `url(${heroHubBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top-center',
            backgroundRepeat: 'no-repeat'
        }}
    >
        {/* Overlay opcional si el texto no se ve bien */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10  w-full h-full md:px-7 py-9 px-3 " >
            <div className="py-9 flex flex-col gap-6 md:gap-4">

                <Typography variant="headline-large" className="md:text-display-lg " >
                    HUB
                </Typography>
                <div className="flex justify-end md:pr-9 pr-3"> {/* flex-1 añadido aquí */}
                    <Typography
                        variant="title-small"
                        className="w-2/3 hidden md:block"
                    >
                        Born from sparks of innovation, RTS HUB embodies the restless spirit of creation — connecting minds, machines, and ideas to redefine what’s possible in industry.
                    </Typography>
                    <Typography
                        variant="title-small"
                        className="w-2/3  md:hidden"
                    >
                        — stands to ensure technical excellence, operational reliability, \nand seamless project execution.
                    </Typography>
                </div>
            </div>
        </div>

    </section>)
}