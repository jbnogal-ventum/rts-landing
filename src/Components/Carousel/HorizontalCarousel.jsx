import React, { useEffect, useRef, useState, useCallback } from "react";
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
import { motion, useTransform, useScroll, useSpring, animate } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import Marquee from "../Marquee/Marquee.jsx";

export default function HorizontalCarousel() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const horizontalContainerRef = useRef(null);
  const animationRef = useRef(null);
  
  const [manualScroll, setManualScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Detectar dispositivos
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { scrollYProgress } = useScroll({
    target: sectionRef
  });

  // Scroll horizontal automático basado en scroll vertical
  const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const xTablet = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);

  // Scroll horizontal manual controlado por botones
  const manualX = useSpring(0, {
    stiffness: 100,
    damping: 20
  });

  // Scroll combinado: automático + manual
  const combinedX = useTransform(
    [manualX, xDesktop, xTablet, xMobile],
    ([manual, autoDesktop, autoTablet, autoMobile]) => {
      // Determinar el valor automático según el dispositivo
      let autoValue;
      if (isDesktop) autoValue = parseFloat(autoDesktop);
      else if (isTablet) autoValue = parseFloat(autoTablet);
      else autoValue = parseFloat(autoMobile);
      
      // Combinar ambos desplazamientos
      return `calc(${autoValue}% + ${manual}px)`;
    }
  );

  // Calcular el desplazamiento máximo
  useEffect(() => {
    const calculateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.scrollWidth;
        const parentWidth = scrollContainerRef.current.parentElement.clientWidth;
        const max = containerWidth - parentWidth;
        setMaxScroll(max);
      }
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    
    return () => window.removeEventListener('resize', calculateMaxScroll);
  }, []);

  // Manejar el scroll con flechas
  const handleScroll = useCallback((direction) => {
    if (isAnimating) return;
    
    const scrollAmount = 700
    
    // Obtener el valor actual
    const currentValue = manualX.get();
    let newValue;
    
    if (direction === 'left') {
      newValue = Math.min(currentValue + scrollAmount, 0);
    } else {
      newValue = Math.max(currentValue - scrollAmount, -maxScroll);
    }
    
    // Animar el desplazamiento
    setIsAnimating(true);
    animationRef.current = animate(manualX, newValue, {
      duration: 0.5,
      ease: "easeOut",
      onComplete: () => setIsAnimating(false)
    });
  }, [manualX, maxScroll, isDesktop, isTablet, isMobile, isAnimating]);

  // Manejar teclas de flecha
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handleScroll('left');
      } else if (e.key === 'ArrowRight') {
        handleScroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleScroll]);

  // Detectar gestos de rueda del mouse
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Solo manejar scroll horizontal
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        
        if (e.deltaX > 0) {
          handleScroll('right');
        } else {
          handleScroll('left');
        }
      }
    };

    //container.addEventListener('wheel', handleWheel, { passive: false });
    //return () => //container.removeEventListener('wheel', handleWheel);
  }, [handleScroll]);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden w-full">
        <div className="px-3 md:px-7 w-full">
          <div className="flex flex-col gap-12 w-full">
            <div className="flex flex-col gap-4 w-full">
              <Typography
                variant="subtitle-medium" 
                className="text-text-primary"
              >
                INDUSTRIES
              </Typography>
              <div className="w-full flex flex-row justify-between">
                <Typography
                  variant="headline-medium"
                  className="hidden md:block"
                >
                  WE NAVIGATE AND SERVE THE MOST <br />COMPLEX{" "}
                  <span className="bg-gradient-to-r from-[#1c56ff] to-[#a463ff] bg-clip-text text-transparent">
                    INDUSTRIAL GALAXIES
                  </span>
                </Typography>
                <Typography
                  variant="headline-small"
                  className="md:hidden"
                >
                  WE NAVIGATE AND SERVE THE MOST <br />COMPLEX{" "}
                  <span className="bg-gradient-to-r from-[#1c56ff] to-[#a463ff] bg-clip-text text-transparent">
                    INDUSTRIAL GALAXIES
                  </span>
                </Typography>
                <div id="buttons" className="flex items-end justify-end md:flex">
                  <Button
                    variant="carruselLeft-dark"
                    className="h-auto"
                    onClick={() => handleScroll('left')}
                    disabled={manualX.get() >= 0 || isAnimating}
                  >
                    <RiArrowLeftLine className="h-4 w-3" />
                  </Button>
                  <Button
                    variant="carruselRight-dark"
                    className="h-auto"
                    onClick={() => handleScroll('right')}
                    disabled={manualX.get() <= -maxScroll || isAnimating}
                  >
                    <RiArrowRightLine className="h-4 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Contenedor del carrusel */}
            <div className="relative h-[410px] ">
              <motion.div
                ref={scrollContainerRef}
                className="flex gap-6 absolute left-0 top-0 h-full"
                style={{ x: combinedX }}
              >
                <Card
                  title="Oil & Gas"
                  to="/industries/oil-and-gas"
                  image={img0}
                  description="We enhance operational reliability and efficiency through OT/IT integration, ensuring safe, data-driven, and continuous performance across upstream, midstream, and downstream operations."
                />
                <Card
                  title="Power Generation"
                  to="/industries/power-generation"
                  image={img1}
                  description="We help power assets improve availability, safety, and performance through automation, monitoring, and optimized operations."
                />
                <Card
                  title="Chemicals & Petrochemicals"
                  to="/industries/chemicals-and-petrochemicals"
                  image={img2}
                  description="We enable smarter, safer, and more efficient operations by digitalizing processes and connecting critical data from field to boardroom."
                />
                <Card
                  title="Pulp & Paper"
                  to="/industries/pulp-and-paper"
                  image={img3}
                  description="We support sustainable production through automation, energy optimization, and process digitalization — driving efficiency and lower environmental impact."
                />
                <Card
                  title="Metals & Mining"
                  to="/industries/metals-and-mining"
                  image={img4}
                  description="We enable efficient and safe mining operations through advanced automation, digital monitoring, and environmental performance tracking."
                />
                <Card
                  title="Pharmaceuticals"
                  to="/industries/pharmaceuticals"
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