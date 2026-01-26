import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroCultureBackground from "../../../assets/Backgrounds/culture_background.png";


export default function HeroCulture() {
    const rootRef = useRef(null);

    return (
        <section
            id="hero-energy"
            ref={rootRef}
            className="relative w-full h-screen min-h-screen"
            style={{
                backgroundImage: `url(${heroCultureBackground})`,
                backgroundSize: 'cover', // Cambiado a 'contain'
                backgroundPosition: 'center center', // Centrado vertical y horizontal
                backgroundRepeat: 'no-repeat',
                //backgroundColor: '#f5f5f5' // Agregado para rellenar espacio vacío
            }}
        >
            {/* Overlay opcional si el texto no se ve bien */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                <div className="pt-9 flex flex-col gap-6 md:gap-4">
                    <Typography variant="headline-large" className="md:text-display-lg ">
                       CULTURE
                    </Typography>
                    
                </div>
            </div>
        </section>
    )
}