// src/Components/Hub/Hub.jsx
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { Typography, Button } from "../index";
import { useTransition } from "../Transition/Transition.jsx";

import OvalPods from '../../assets/pages_items/oval_pods_mono.svg?react';
import CirclePods from '../../assets/pages_items/circle_pods_mono.svg?react';
import DicePods from '../../assets/pages_items/dice_pods_mono.svg?react';

import imgInnovation from "../../assets/hub/innovation.png";
import imgAcademy from "../../assets/hub/academy.png";
import imgBTL from "../../assets/hub/below.png";
export default function Hub() {
  const hubSectionRef = useRef(null);
  const { go } = useTransition();
  // Detectar dispositivos
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: hubSectionRef
  });

  // Ajustar la altura del contenedor según dispositivo
  const containerHeight = isDesktop ? "300vh" : isTablet ? "450vh" : "450vh";

  // Valores de progreso para el scroll (0 a 1)
  // Dividimos el scroll en 3 secciones para las 3 cards
  const card1Range = [0, 0.33]; // Card 1 sticky en primera sección
  const card2Range = [0.33, 0.66]; // Card 2 entra en segunda sección
  const card3Range = [0.66, 1]; // Card 3 entra en tercera sección

  // Posición Y para cada card
  const card1Y = useTransform(scrollYProgress, card1Range, ["0%", "0%"]);
  const card2Y = useTransform(scrollYProgress, card2Range, ["109%", "9%"]); // pt-3 ≈ 3%
  const card3Y = useTransform(scrollYProgress, card3Range, ["218%", "18%"]); // pt-3 * 2 ≈ 6%

  // Opacidad para las cards (aparecen cuando entran)
  const card1Opacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.33, 0.38], [1, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.66, 0.71], [1, 1]);


  return (
    <section
      id="hub-section"
      className="relative w-full text-primary bg-background-inverse"
      ref={hubSectionRef}
      style={{ height: containerHeight }}
    >
      {/* Header: en mobile NO es sticky, se va con el scroll */}
      <div className="md:hidden px-3 pt-5">
        <div className="flex flex-col ">
          <Typography
            variant="headline-small"
          >
            <span className="text-core-violet">RTS HUB</span> IS OUR LABORATORY
            <br />OF IDEAS AND EXECUTION
          </Typography>
          {/* <Button className="h-fit" onClick={() => go('/hub')}>
            Learn more
          </Button> */}
        </div>
      </div>

      {/* Contenedor sticky */}
      <div className="sticky top-0 h-screen overflow-hidden w-full">
        <div className="px-3 md:px-7 h-full w-full lg:py-9 md:py-5 py-3">
          <div className="h-full flex flex-col gap-3 md:gap-5 w-full">

            {/* Header: en tablet/desktop SÍ está dentro del sticky */}
            <div className="hidden md:flex flex-row justify-between">
              <Typography
                variant="headline-small"
                className="md:text-headline-medium"
              >
                <span className="text-core-violet">RTS HUB</span> IS OUR LABORATORY
                <br />OF IDEAS AND EXECUTION
              </Typography>
              <Button className="h-fit" onClick={() => go('/hub')}>
                Learn more
              </Button>
            </div>

            {/* Cards container - en mobile ocupa TODO el h-screen */}
            <div className="relative w-full h-full mb-0 md:mb-9">
              <Button className="h-fit md:hidden my-5" onClick={() => go('/hub')}>
                Learn more
              </Button>
              {/* Card 1 */}
              <motion.div
                className="absolute w-full bg-white rounded-xl shrink-0 border-[1px] border-border-subtle"
                style={{ y: card1Y, opacity: card1Opacity, zIndex: 10 }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <OvalPods className="w-icon-xl h-icon-xl  shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">BELOW THE LINE</span>  </Typography>

                  </div>
                  <img src={imgAcademy} alt="Academy image" className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-secondary items-center align-middle justify-center">
                    <Typography variant="title-body">
                      Below-the-line powerhouse—a creative and experiential unit where ideas meet industry.
                    </Typography>
                    <Typography >
                      Through initiatives like Rocking the Industry and the Data-Driven LAB, we go beyond traditional services to spark interaction, collaboration, and thought leadership.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="absolute w-full bg-white rounded-xl border-[1px] border-border-subtle"
                style={{ y: card2Y, opacity: card2Opacity, zIndex: 20 }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <DicePods className="w-icon-xl h-icon-xl shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">ACADEMY</span>  </Typography>

                  </div>
                  <img src={imgBTL} alt="Below-the-line image" className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-secondary items-center align-middle justify-center">
                    <Typography variant="title-body">
                      Dedicated to advancing technical skills and knowledge in industrial automation, OT/IT convergence, and advanced data analytics.
                    </Typography>
                    <Typography >
                      It serves as a center of excellence
                      both for our internal teams and for clients, helping professionals stay ahead in a
                      rapidly evolving industry.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="absolute w-full bg-white rounded-xl border-[1px] border-border-subtle"
                style={{ y: card3Y, opacity: card3Opacity, zIndex: 100 }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-7 md:justify-between p-5 ">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <CirclePods className="w-icon-xl h-icon-xl shrink-0" />
                    <Typography
                      variant="headline-small"
                      className=" "

                    ><span className="bg-gradient-to-r from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">INNOVATION LAB</span>  </Typography>

                  </div>
                  <img src={imgInnovation} alt="Innovation image" className="hidden md:block w-[252px] h-[252px]" />
                  <div className="flex flex-col gap-2 text-secondary items-center align-middle justify-center">
                    <Typography variant="title-body">
                      Is more than a testing ground—it is a laboratory of ideas and execution.
                    </Typography>
                    <Typography >
                      Here, we develop new technologies, provide industrial tech consulting, and design pilot projects that bring innovation into real practice. It is where  concepts are tested, validated, and transformed into solutions that empower industries.
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