import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Story.css";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import { Typography, Button } from "../index";

export default function Story() {
  const storySectionRef = useRef(null);

  // Detectar dispositivos
  // const isDesktop = useMediaQuery('(min-width: 1024px)');
  // const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  // const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: storySectionRef
  });

  // Para el efecto fade in/out más preciso
  const opacityRange = [0, 0.3, 0.7, 1]; // Ajusta estos valores para controlar el timing
  const opacityRangePannel1 = [0, 1, 0, 0];
  const opacityRangePannel2 = [0, 0, 1, 1];

  const opacityPannel1 = useTransform(scrollYProgress, opacityRange, opacityRangePannel1);
  const opacityPannel2 = useTransform(scrollYProgress, opacityRange, opacityRangePannel2);

  // También podrías agregar un pequeño desplazamiento en Y para efecto parallax
  const yOffsetPannel1 = useTransform(scrollYProgress, [0, 0.5], ["0px", "-20px"]);
  const yOffsetPannel2 = useTransform(scrollYProgress, [0.3, 0.8], ["20px", "0px"]);

  return (
    <section id="story-section" className="relative w-full md:h-[500vh] h-[300vh] bg-background-inverse text-text-on-white-primary" ref={storySectionRef}>
      <div className="sticky top-0 h-screen  ">
        <div className="pt-9 px-3 md:px-7">
          <Typography variant="subtitle-md" children={"OUR STORY"} className="text-text-on-white-primary" />
        </div>
        <div className="flex items-center justify-center overflow-hidden ">
          <div className=" flex flex-col gap-4">


            {/* Contenedor para ambos paneles (uno sobre otro) */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-3 md:px-7">
              {/* Panel 1 */}
              <motion.div
                id='panel1'
                className=" w-full absolute "
                style={{
                  opacity: opacityPannel1,
                  y: yOffsetPannel1
                }}
              >
                <div className="flex flex-col justify-between w-full h-screen py-9 px-3 md:px-7 mt-9">

                  <Typography variant="headline-medium" className="text-text-on-white-primary hidden md:block">
                    RTS WAS BORN IN THE <br />
                    WORLD OF OPERATIONAL <br />
                    TECHNOLOGY
                  </Typography>

                  <Typography variant="headline-small" className="text-text-on-white-primary md:hidden">
                    RTS WAS BORN <br />IN THE WORLD OF<br /> OPERATIONAL <br />TECHNOLOGY
                  </Typography>

                  <div className="w-full flex justify-end">
                    <Typography variant="title-medium" className="text-text-on-white-primary hidden md:block font-base pb-9">
                      — and evolved to engineer<br />the future through curated<br />industrial innovation.
                    </Typography>

                    <Typography variant="title-small" className="text-text-on-white-disabled md:hidden font-base pb-9">
                      — and evolved to<br />engineer the future<br />through curated <br />industrial innovation.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Panel 2 */}
              <motion.div
                id='panel2'
                className=" w-full absolute"
                style={{
                  opacity: opacityPannel2,
                  y: yOffsetPannel2
                }}
              >
                <div className="flex flex-col justify-between w-full h-screen py-9 px-3 md:px-7  mt-9 ">
                  <div className="flex flex-col gap-4">
                    <Typography variant="headline-medium" className="text-text-on-white-primary hidden md:block">
                      OUR STORY ISN’T ONE OF CHANGE,<br /> BUT OF CONTINUOS EVOLUTION
                    </Typography>

                    <Typography variant="headline-small" className="text-text-on-white-primary md:hidden">
                      OUR STORY ISN’T<br />ONE OF CHANGE,<br /> BUT OF CONTINUOS<br />EVOLUTION
                    </Typography>

                    <Button children="Learn more about our culture" variant="filled-light" />
                  </div>
                  <div className="w-full flex justify-end">
                    <Typography variant="title-medium" className="text-text-on-white-primary font-base pb-9">
                      — from control systems<br />to intelligent ecosystems.
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