// src/Components/Hub/Hub.jsx
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { Typography, Button } from "../index";
import { Grip } from "lucide-react";

import iconInnovation from "../../assets/hub/icon1.png";
import iconAcademy from "../../assets/hub/icon1.png";
import iconBTL from "../../assets/hub/icon1.png";

import imgInnovation from "../../assets/hub/innovation.png";
import imgAcademy from "../../assets/hub/academy.png";
import imgBTL from "../../assets/hub/below.png";
export default function Hub() {
  const hubSectionRef = useRef(null);

  // Detectar dispositivos
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: hubSectionRef
  });

  // Ajustar la altura del contenedor según dispositivo
  const containerHeight = isDesktop ? "400vh" : isTablet ? "500vh" : "600vh";

  // Valores de progreso para el scroll (0 a 1)
  // Dividimos el scroll en 3 secciones para las 3 cards
  const card1Range = [0, 0.33]; // Card 1 sticky en primera sección
  const card2Range = [0.33, 0.66]; // Card 2 entra en segunda sección
  const card3Range = [0.66, 1]; // Card 3 entra en tercera sección

  // Posición Y para cada card
  const card1Y = useTransform(scrollYProgress, card1Range, ["0%", "0%"]);
  const card2Y = useTransform(scrollYProgress, card2Range, ["100%", "9%"]); // pt-3 ≈ 3%
  const card3Y = useTransform(scrollYProgress, card3Range, ["100%", "18%"]); // pt-3 * 2 ≈ 6%

  // Opacidad para las cards (aparecen cuando entran)
  const card1Opacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.33, 0.38], [0, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.66, 0.71], [0, 1]);


  return (
    <section
    id="hub-section"
      className="relative w-full bg-background-inverse text-text-on-white-primary"
      ref={hubSectionRef}
      style={{ height: containerHeight }}
    >
      {/* Contenedor sticky que mantiene las cards en vista */}
      <div className="sticky top-0 h-screen overflow-hidden w-full ">
        <div className=" px-3 md:px-7 h-full w-full py-9">
          <Typography
            variant="headline-medium"
            className="md:text-headline-large "

          ><span className="text-core-violet">RTS HUB</span> S OUR LABORATORY  <br />OF IDEAS AND EXECUTION</Typography>
          <div className=" h-full flex items-center justify-center py-5 w-full ">
            {/* Contenedor relativo para las cards superpuestas */}
            <div className="relative w-full h-full">

              {/* Card 1 - Sticky inicial */}
              <motion.div
                className="absolute w-full  bg-white rounded-xl shadow-2xl "
                style={{
                  y: card1Y,
                  opacity: card1Opacity,
                  //scale: card1Scale,
                  zIndex: 10
                }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <Grip className="w-6 h-6 text-background-interactive shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">BELOW THE LINE</span>  </Typography>

                  </div>
                  <img src={imgInnovation} className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-text-on-white-secondary">
                    <Typography variant="title-body">
                      Below-the-line powerhouse—a creative and experiential unit where ideas meet industry.
                    </Typography>
                    <Typography >
                      Through initiatives like Rocking the Industry and the Data-Driven LAB, we go beyond traditional services to spark interaction, collaboration, and thought leadership.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Entra desde abajo */}
              <motion.div
                className="absolute w-full  bg-white rounded-xl shadow-2xl "
                style={{
                  y: card2Y,
                  opacity: card2Opacity,
                  //scale: card2Scale,
                  zIndex: 20
                }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <Grip className="w-6 h-6 text-background-interactive shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">ACADEMY</span>  </Typography>

                  </div>
                  <img src={imgAcademy} className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-text-on-white-secondary">
                    <Typography variant="title-body">
                      Below-the-line powerhouse—a creative and experiential unit where ideas meet industry.
                    </Typography>
                    <Typography >
                      Through initiatives like Rocking the Industry and the Data-Driven LAB, we go beyond traditional services to spark interaction, collaboration, and thought leadership.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Entra desde abajo */}
              <motion.div
                className="absolute w-full  bg-white rounded-xl shadow-2xl"
                style={{
                  y: card3Y,
                  opacity: card3Opacity,
                  //scale: card3Scale,
                  zIndex: 30
                }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <Grip className="w-6 h-6 text-background-interactive shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">INNOVATION LAB</span>  </Typography>

                  </div>
                  <img src={imgInnovation} className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-text-on-white-secondary">
                    <Typography variant="title-body">
                      Below-the-line powerhouse—a creative and experiential unit where ideas meet industry.
                    </Typography>
                    <Typography >
                      Through initiatives like Rocking the Industry and the Data-Driven LAB, we go beyond traditional services to spark interaction, collaboration, and thought leadership.
                    </Typography>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}