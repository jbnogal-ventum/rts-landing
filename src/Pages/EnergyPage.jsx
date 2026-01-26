// src/Pages/DigitalServicesPage.jsx
import { useRef, useEffect } from "react";
import { Typography, Button } from "../Components/index";
import Accordeon from "../Components/UI/Accordeon";
import Banner from "../Components/Banner/Banner";
import Table from "../Components/UI/Table";

import innovationLabBackgroundImage from "../assets/Backgrounds/innovationLabBackgroung.jpg";
import academyCardBackgroundImage from "../assets/Backgrounds/academyCardBackground.png";
import { Grip, } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import partnersImg from "../assets/pages_items/ds_partners.png";
import HeroEnergy from "../Components/Hero/Energy/HeroEnergy.jsx";
import energy1 from "../assets/pages_items/energy_generation1.png";
import energy2 from "../assets/pages_items/energy_generation2.jpg";
import bannerImg from "../assets/Banners/moon_20.png";

const items = [
  {
    title: "Electrical Systems Engineering",
    body:
      "Design, implementation, and optimization of industrial power systems."
  },
  {
    title: "Energy Management & Efficiency",
    body: "Strategic energy solutions to enhance cost-effectiveness and sustainability."
  },
  {
    title: "Industrial Infrastructure Development ",
    body: "Advanced electrical infrastructure solutions forcomplex industrial environments."
  },
  {
    title: "Automation & Power Integration",
    body: "Seamless integration of power systems withautomation and control technologies."
  }
]
export default function EnergyPage() {
  const whiteBlockRef = useRef(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!whiteBlockRef.current) {
      console.log('⚠️ whiteBlockRef.current aún no existe');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('🔍 IntersectionObserver entry:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            rootBounds: entry.rootBounds,
            time: entry.time
          });

          if (entry.isIntersecting) {
            //console.log('✅ EN VISTA - Cambiando a light');
            setTheme("light");
            window.dispatchEvent(new Event("navLight"));
          } else {
            // console.log('❌ FUERA DE VISTA - Cambiando a dark');
            setTheme("dark");
            window.dispatchEvent(new Event("navDark"));
          }
        });
      },
      {
        threshold: 0.1, // Baja a 10% para más sensibilidad
        rootMargin: "0px", // Quita los márgenes negativos para empezar
      }
    );

    observer.observe(whiteBlockRef.current);

    return () => {
      console.log('🧹 Limpiando observer');
      observer.disconnect();
    };
  }, [setTheme]);

  return (
    <>
      <HeroEnergy />

      <section id='energy-solutions' className="flex flex-col md:flex-row gap-8 pt-9 pb-9 md:pb-7 px-3 md:px-8  bg-background-primary ">

        <div className="flex flex-col gap-5 md:gap-7 w-full md:w-1/2 " >

          <Typography variant="title-medium" className="text-text-secondary font-base" >
            Dedicated to delivering innovative and reliable <br />energy solutions, optimizing power infrastructure,  and supporting industrial and commercial operations with efficient energy management strategies.
          </Typography>

          <Button
            variant="filled-dark"
            children="Book a meeting now"
            className="w-fit"
          />
        </div>
        <div className="flex flex-col gap-4  w-full md:w-1/2">
          <Accordeon items={items} defaultOpen={0} allowCollapse />
        </div>
      </section>

      <div ref={whiteBlockRef}>
        <section id='electrical-energy-solutions' className="flex flex-col md:flex-row px-3 md:px-7 py-9 gap-6 md:gap-4 relative overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Primer gradiente principal */}
            <div
              className="absolute"
              style={{
                background: 'radial-gradient(111.63% 111.63% at 42.64% -5.82%, rgba(89, 255, 0, 0.8) 33.65%, rgba(0, 238, 255, 0.5) 44.58%, transparent 100%)',
                transform: 'rotate(-112deg)',
                width: '150vw',
                height: '50vh',
                top: '-45%',
                left: '-40%',
                filter: 'blur(400px)',
                // Suavizar transiciones
                mixBlendMode: 'screen',
              }}
            />

            {/* Segundo gradiente para suavizar bordes */}
            <div
              className="absolute"
              style={{
                background: 'radial-gradient(145.3% 70.02% at 45.94% 35.79%, rgba(24, 73, 71, 0.5) 24.04%, rgba(49, 89, 15, 0.5) 60.58%, rgba(12, 58, 27, 0.5) 100%)',
                filter: 'blur(400px)',
                opacity: '0.4',
                width: '80vw',
                height: '130vh',
                top: '-15%',
                left: '10%', // Posicionado más a la derecha
                transform: 'rotate(15deg)', // Rotación opcional
                mixBlendMode: 'screen', // Mezcla con el primer gradiente
              }}
            />

            {/* Primer gradiente principal */}
            <div
              className="absolute md:hidden"
              style={{
                background: 'radial-gradient(111.63% 111.63% at 42.64% -5.82%, rgba(89, 255, 0, 0.8) 33.65%, rgba(0, 238, 255, 0.5) 44.58%, transparent 100%)',
                transform: 'rotate(-112deg)',
                width: '150vw',
                height: '120vh',
                top: '-55%',
                left: '-40%',
                filter: 'blur(400px)',
                // Suavizar transiciones
                mixBlendMode: 'screen',
              }}
            />


          </div>

          {/* Contenido existente con z-index para que esté por encima del fondo */}
          <div className="relative z-10 flex flex-col gap-6 w-full md:w-3/5">
            <div className="flex flex-col gap-4">

              <Typography variant="headline-small" className="md:text-headline-medium" >
                HIGH-PERFORMANCE<br /> ELECTRICAL & ENERGY<br />SOLUTIONS
              </Typography>
            </div>
            <div className="flex w-full md:pl-9">
              <Typography variant="body-lg" className="text-text-on-white-secondary " >
                With deep industry expertise and a commitment to engineering excellence, innovation, and operational reliability, RTS Energy & Infrastructure stands as a trusted partner in providing state-of-the-art electrical and energy solutions that meet the highest industry standards.<br /><br />
                The department is dedicated to delivering innovative and reliable energy solutions, optimizing power infrastructure, and supporting industrial and commercial operations with efficient energy management strategies.
              </Typography>
            </div>
          </div>

          {/* Contenedor de imágenes - Ajustado para el posicionamiento específico */}
          <div className="relative z-10 w-full md:w-ds-parteners-img h-[400px] md:h-[500px]">
            {/* Imagen 1: esquina superior izquierda */}
            <img
              src={energy1}
              alt="Energy Generation 1"
              className="absolute top-0 left-0 md:w-[272px] w-[214px] h-auto aspect-square rounded-md z-20"

            />

            {/* Imagen 2: esquina inferior derecha */}
            <img
              src={energy2}
              alt="Energy Generation 2"
              className="absolute bottom-0 right-0 md:w-[272px] w-[214px] h-auto aspect-square rounded-md z-10"

            />
          </div>

        </section>
      </div>
      <Banner
        variant="image"
        backgroundImage={bannerImg}
        overlay={50}
        variantMobile="headline-small"
        variantDesktop="headline-medium"
        titleDesktop={"WOULD YOU LIKE TO KNOW \nMORE ABOUT OUR EXPERIENCE?"}
        titleMobile={"WOULD YOU LIKE TO KNOW MORE ABOUT OUR EXPERIENCE?"}

        buttons={[
          { label: "Download the full document", href: "#contact", variant: "outlined-dark" },
          { label: "Book a meeting now", href: "#book", variant: "filled-dark" },
        ]}
        start="top top"
      />

    </>
  );
}
