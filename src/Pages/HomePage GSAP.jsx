import { useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

import HeroHomePage from "../Components/Hero/HeroHomePage/HeroHomePage";
import HorizontalCarousel from "../Components/Carousel/HorizontalCarousel";
import Story from "../Components/Story/Story";
import Banner from "../Components/Banner/Banner";
import Marquee from "../Components/Marquee/Marquee";
import Hub from "../Components/Hub/Hub";
import Location from "../Components/Location/Location";

import bannerImg from "../assets/Banner.jpeg";

export default function HomePage({ onPhase }) {
  const whiteBlockRef = useRef(null);
  const { setTheme } = useTheme();

useEffect(() => {
    if (!whiteBlockRef.current) {
      console.log('⚠️ whiteBlockRef.current aún no existe');
      return;
    }

    // console.log('🎯 Observando elemento:', whiteBlockRef.current);
    // console.log('🎯 Altura del elemento:', whiteBlockRef.current.offsetHeight);
    // console.log('🎯 Posición top:', whiteBlockRef.current.offsetTop);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //console.log('🔍 IntersectionObserver entry:', {
          //   isIntersecting: entry.isIntersecting,
          //   intersectionRatio: entry.intersectionRatio,
          //   boundingClientRect: entry.boundingClientRect,
          //   rootBounds: entry.rootBounds,
          //   time: entry.time
          // });
          
          if (entry.isIntersecting) {
            //console.log('✅ EN VISTA - Cambiando a light');
            setTheme("light");
            window.dispatchEvent(new Event("navLight"));
          } else {
            //console.log('❌ FUERA DE VISTA - Cambiando a dark');
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
      <HeroHomePage onPhase={onPhase} />
      <div className="hero-outro-spacer" />

      <HorizontalCarousel />
      <Marquee />

      <div ref={whiteBlockRef}>
        <Story />
        <Hub />
        <Location/>
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