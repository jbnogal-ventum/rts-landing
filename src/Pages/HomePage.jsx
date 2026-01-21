// src/Pages/HomePage.jsx
import { useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";

import HeroHomePage from "../Components/Hero/HeroHomePage/HeroHomePage";
import HorizontalCarousel from "../Components/Carousel/HorizontalCarousel";
import Story from "../Components/Story/Story";
import Banner from "../Components/Banner/Banner";
import Marquee from "../Components/Marquee/Marquee";
import Hub from "../Components/Hub/Hub";
import Location from "../Components/Location/Location";

import bannerImg from "../assets/Banner.jpeg";

export default function HomePage() {
  const whiteBlockRef = useRef(null);
  const { setNavMode, setPhase } = useApp(); // Ahora viene del contexto

  // Efecto para detectar cuando el usuario está en la sección blanca
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando entra en la sección blanca, cambiar a modo light
            setNavMode('light');
          } else {
            // Cuando sale de la sección blanca, volver a modo dark
            setNavMode('dark');
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
        rootMargin: '-100px 0px 0px 0px' // Offset para activar antes
      }
    );

    if (whiteBlockRef.current) {
      observer.observe(whiteBlockRef.current);
    }

    return () => {
      if (whiteBlockRef.current) {
        observer.unobserve(whiteBlockRef.current);
      }
    };
  }, [setNavMode]);

  return (
    <>
      <HeroHomePage onPhase={setPhase} />
      <div style={{ height: '1px' }} />

      <HorizontalCarousel />
      <Marquee />

      <div ref={whiteBlockRef}>
        <Story key="story-component" /> {/* Key única */}

        <Hub />
        <Location />
      </div>

      <Banner
        variant="image"
        backgroundImage={bannerImg}
        titleClassName="display-medium"
        titleDesktop={"LET'S SPARK YOUR\nINDUSTRIAL BRILLIANCE"}
        titleMobile={"LET'S SPARK\nYOUR INDUSTRIAL\nBRILLIANCE"}
        bodyDesktop={
          "Every challenge is an opportunity. Share yours, and\nlet's explore how to bring your vision to life."
        }
        bodyMobile={
          "Every challenge is an opportunity.\nShare yours, and let's explore how to\nbring your vision to life."
        }
        buttons={[
          { label: "Book a meeting now", href: "#book", variant: "primary" },
        ]}
        start="top top"
      />
    </>
  );
}