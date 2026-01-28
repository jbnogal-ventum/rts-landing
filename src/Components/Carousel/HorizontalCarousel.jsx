import React, { useEffect, useRef } from "react";
import "./HorizontalCarousel.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "../UI/Card";
import { Typography, Button } from "../index";

import img0 from "../../assets/carousel/RTS_Industries.png";
import img1 from "../../assets/carousel/RTS_Industries-1.png";
import img2 from "../../assets/carousel/RTS_Industries-2.png";
import img3 from "../../assets/carousel/RTS_Industries-3.png";
import img4 from "../../assets/carousel/RTS_Industries-4.png";
import img5 from "../../assets/carousel/RTS_Industries-5.png";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";

export default function HorizontalCarousel() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const horizontalContainerRef = useRef(null);

  // Detectar dispositivos
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: sectionRef
  });

  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const xTablet = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  // Seleccionar el valor de x según el dispositivo
  let xValue;
  if (isDesktop) {
    xValue = xDesktop;
  } else if (isTablet) {
    xValue = xTablet;
  } else {
    xValue = xMobile;
  }

  return (
    <section ref={sectionRef} className="relative h-[300vh] " >
      <div className="sticky top-0  h-[780px]  flex items-center overflow-hidden w-full">
        <div className=" px-3 md:px-7 w-full">


          <div className="flex flex-col gap-12 w-full">
            <div className="">
              <div className="flex flex-col gap-4 w-full">
                <Typography
                  variant="subtitle-medium" className=" text-text-primary">INDUSTRIES</Typography>
                <div className="w-full flex flex-row justify-between">
                  <Typography
                    variant="headline-medium"
                    className=" hidden md:block       "        >
                    WE NAVIGATE AND SERVE THE MOST <br />COMPLEX{" "}
                    <span className="      bg-gradient-to-r from-[#1c56ff] to-[#a463ff]      bg-clip-text text-transparent    ">
                      INDUSTRIAL GALAXIES
                    </span>
                  </Typography>
                  <Typography
                    variant="headline-small"
                    className=" md:hidden        "        >
                    WE NAVIGATE AND SERVE THE MOST <br />COMPLEX{" "}
                    <span className="      bg-gradient-to-r from-[#1c56ff] to-[#a463ff]      bg-clip-text text-transparent    ">
                      INDUSTRIAL GALAXIES
                    </span>
                  </Typography>
                  <div id={"buttons"} className="flex items-end justify-end md:flex     ">
                    <Button
                      variant="carruselLeft-dark"
                      className="h-auto"       /* Esto evita que tome altura completa */
                      onClick={() => scrollContainerRef.current.scrollLeft -= 400}
                    >
                      <RiArrowLeftLine className="h-4 w-3" />
                    </Button>
                    <Button
                      variant="carruselRight-dark"
                      className="h-auto"       /* Esto evita que tome altura completa */
                      onClick={() => scrollContainerRef.current.scrollLeft += 400}
                    >
                      <RiArrowRightLine className="h-4 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>



            {/* Contenedor que será "pinned" */}
            <div className="relative h-[410px]">
              <motion.div
                // className="relative h-[410px] "
                ref={scrollContainerRef}
                className="flex gap-6 absolute left-0 top-0 h-full"
                style={{ x: xValue }}
              >
                <Card
                  title="Oil & Gas"
                  image={img0}
                  description="We enhance operational reliability and efficiency through OT/IT integration, ensuring safe, data-driven, and continuous performance across upstream, midstream, and downstream operations."
                />
                <Card
                  title="Power Generation"
                  image={img1}
                  description="We help power assets improve availability, safety, and performance through automation, monitoring, and optimized operations."
                />
                <Card
                  title="Chemicals & Petrochemicals"
                  image={img2}
                  description="We enable smarter, safer, and more efficient operations by digitalizing processes and connecting critical data from field to boardroom."
                />
                <Card
                  title="Pulp & Paper"
                  image={img3}
                  description="We support sustainable production through automation, energy optimization, and process digitalization — driving efficiency and lower environmental impact."
                />
                <Card
                  title="Metals & Mining"
                  image={img4}
                  description="We enable efficient and safe mining operations through advanced automation, digital monitoring, and environmental performance tracking."
                />
                <Card
                  title="Pharmaceuticals"
                  image={img5}
                  description="An emerging universe with strict laws of motion—traceability, accuracy, and real-time compliance."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
