import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroEnergyBackground from "../../../assets/Backgrounds/hero_energy.png";


export default function HeroEnergy() {
    const rootRef = useRef(null);

    return (
        <section
            id="hero-energy"
            ref={rootRef}
            className="relative w-full h-full min-h-screen"
            style={{
                backgroundImage: `url(${heroEnergyBackground})`,
                backgroundSize: 'contain', // Cambiado a 'contain'
                backgroundPosition: 'center center', // Centrado vertical y horizontal
                backgroundRepeat: 'no-repeat',
                //backgroundColor: '#f5f5f5' // Agregado para rellenar espacio vacío
            }}
        >
            {/* Overlay opcional si el texto no se ve bien */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                <div className="pt-9 flex flex-col gap-6 md:gap-4">
                    <Typography variant="headline-large" className="md:text-display-lg hidden md:block">
                        ENERGY  & <br /> INFRASTRUCTURE
                    </Typography>
                    <Typography variant="headline-large" className="md:hidden">
                        ENERGY
                        & <br /> INFRA-
                        STRUCTURE
                    </Typography>
                    <div className="flex justify-end pr-3  md:mr-9">
                        <Typography
                            variant="title-small"
                            className="w-2/3 md:w-3/5 md:text-title-medium"
                        >
                            — stands to ensure technical excellence, operational reliability, and seamless project execution.
                        </Typography>
                    </div>
                </div>
            </div>
        </section>
    )
}