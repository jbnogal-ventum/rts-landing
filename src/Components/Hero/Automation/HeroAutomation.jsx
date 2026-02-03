import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroHubBackground from "../../../assets/Backgrounds/hero_a_y_c.png";

export default function HeroAutomation() {
    const rootRef = useRef(null);
    
    return (
        <section
            id="hero-automation"
            ref={rootRef}
            className="relative w-full h-full min-h-screen"
            style={{
                backgroundImage: `url(${heroHubBackground})`,
                backgroundSize: 'contain', // Cambiado a 'contain'
                backgroundPosition: 'center center', // Centrado vertical y horizontal
                backgroundRepeat: 'no-repeat',
                //backgroundColor: '#f5f5f5' // Agregado para rellenar espacio vacío
            }}
        >
             {/* Overlay opcional si el texto no se ve bien */}
        <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                <div className="pt-9 flex flex-col gap-7 md:gap-4">
                    <Typography variant="headline-large" className="md:text-display-lg">
                        AUTOMATION<br/>& CONTROLS
                    </Typography>
                    <div className="flex justify-end md:justify-center md:mr-5 ">
                        <Typography
                            variant="title-small"
                            className="w-3/4 md:w-3/5 md:text-title-medium"
                        >
                            — provide expert guidance to<br className="md:block hidden"/> design and integrate control systems
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    )
}