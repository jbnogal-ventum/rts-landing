import { Typography, Button } from "../../index";
import { useEffect, useRef } from "react";
import heroHubBackground from "../../../assets/Backgrounds/heroHubBackground.jpg";
import { FadeInBlur } from "../../../animations/index.js"
export default function HeroDigitalServices() {
    const rootRef = useRef(null);
    return (<section
        id="hero-digital-services"
        ref={rootRef}
        className="relative w-full h-full min-h-screen"
    >
        <div className="relative z-10  w-full h-full md:px-7 py-9 px-3 " >
            <div className="pt-9 flex flex-col gap-6 md:gap-4">

                <Typography variant="headline-large" className="md:text-display-lg " >
                    DIGITAL SKILLS
                </Typography>
                <div className="flex justify-center  pr-3"> {/* flex-1 añadido aquí */}
                    <Typography
                        variant="title-medium"
                        className="w-2/3 md:w-1/3  "
                    >
                        — turns industrial data into actionable intelligence. 
                    </Typography>
                </div>
            </div>
        </div>

    </section>)
}