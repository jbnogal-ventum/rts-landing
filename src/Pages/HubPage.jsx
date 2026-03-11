// src/Pages/HubPage.jsx
import { useRef, useEffect } from "react";
import { Typography, Button } from "../Components/index";
import HeroHub from "../Components/Hero/Hub/HeroHub.jsx";
import Banner from "../Components/Banner/Banner";
import BelowTheLineSection from "../Components/BelowTheLineSection/BelowTheLineSection.jsx";

import bannerImg from "../assets/Banners/HubBanner.png";
import innovationLabBackgroundImage from "../assets/Backgrounds/innovationLabBackgroung.jpg";
import academyCardBackgroundImage from "../assets/Backgrounds/academyCardBackground.png";
import { Brain, DatabaseZap, GraduationCap, Grip, GripHorizontal, GripVertical, Sprout, Telescope } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import OvalPods from '../assets/pages_items/oval_pods_mono.svg?react'; // Nota el ?react
import CirclePods from '../assets/pages_items/circle_pods_mono.svg?react';
import DicePods from '../assets/pages_items/dice_pods_mono.svg?react';
import { SlideInAnimation, FadeInScaleAnimation } from "../animations/index";
export default function HubPage() {
  const location = useLocation();
  const whiteBlockRef = useRef(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!whiteBlockRef.current) {
      //console.log('⚠️ whiteBlockRef.current aún no existe');
      return;
    }



    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // console.log('🔍 IntersectionObserver entry:', {
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
      //console.log('🧹 Limpiando observer');
      observer.disconnect();
    };
  }, [setTheme]);

  return (
    <>
      <HeroHub />
      <div className="hero-outro-spacer" />

      <section id='laboratory' className="relative overflow-hidden ">
        <div className="md:px-7 py-9 px-3 relative flex flex-col  gap-7" style={{ zIndex: 2 }}>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 " >
            <div className="flex flex-row md:w-2/3">
              <SlideInAnimation y={50} repeat={true}>
                <Typography
                  variant="headline-medium"
                  className="md:text-headline-large"

                >OUR <span className="text-core-violet">LABORATORY</span> OF IDEAS AND EXECUTION</Typography>
              </SlideInAnimation>
            </div>
            <div className="md:w-1/2 flex md:justify-end md:items-end">
              <SlideInAnimation delay={0}>
                <Typography variant={'body-md'} children={"It brings together a single ecosystem where knowledge, experimentation, and collaboration converge. Here, learning becomes practice, innovation turns into solutions, and communities spark industrial brilliance."} />
              </SlideInAnimation>
            </div>

          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Primera fila de 3 cards */}
              {[
                { title: 'Bellow The Line', icon: OvalPods, info: 'A creative and experiential \nunit where ideas meet industry.' },
                { title: 'Academy', icon: DicePods, info: 'Training and development  \narm of RTS Group.' },
                { title: 'Innovation Lab', icon: CirclePods, info: 'More than a testing ground—it is a laboratory of ideas and execution.' },
              ].map((card, index) => (
                <FadeInScaleAnimation key={`hub-card-laboratory-${index}`} delay={(index + 1) * 0.2} repeat={true} >
                  <div

                    className="rounded-md shadow-md p-5 flex flex-col justify-between h-hub-card border border-assistant-prompt bg-background-primary"
                  >
                    <div className="flex flex-col gap-3">
                      <card.icon
                        className="w-icon-xl h-icon-xl text-core-violet fill-current"
                      />
                      <Typography
                        variant="title-small"
                        className="font-bold"
                        children={card.title}
                      />
                    </div>
                    <Typography variant="body-sm" children={card.info} />
                  </div>
                </FadeInScaleAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BelowTheLineSection key={location.key} />
      <div ref={whiteBlockRef}>
        <section id='academy' className="relative overflow-hidden ">
          <div className="absolute inset-0">
            <div
              className="bg-gradient-to-b from-background-inverse to-gradient-soft-violet absolute inset-0"
              aria-hidden="true"
            />

          </div>
          {/* Contenido (titulos y cards) */}
          <div className="md:px-7 py-9 px-3 relative flex flex-col  gap-7" style={{ zIndex: 2 }}>
            <div className="flex flex-col md:flex-row md:justify-between gap-7 " >
              <div className="flex flex-col gap-3 md:w-1/2">
                <SlideInAnimation y={50} repeat={true}>
                  <Typography
                    variant="subtitle-large"
                    className=""
                    children="- 02"
                  />
                  <Typography
                    variant="headline-medium"
                    className="text-display-small"
                    children="ACADEMY"
                  />
                </SlideInAnimation>
              </div>
              <div className="md:w-1/2 flex md:justify-end md:items-end">
                <SlideInAnimation delay={0.3} >
                  <Typography variant={'body-md'} children={"Dedicated to enhancing technical skills and knowledge in the fields of industrial automation, IT-OT convergence, and advanced data analytics."} />
                </SlideInAnimation>
              </div>

            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Primera fila de 3 cards */}
                {[
                  { title: 'Innovation Learning Center', icon: <Telescope className="w-5 h-5 text-primary-500" />, info: 'Community and knowledge sharing through webinars, forums, and events that foster innovation across the RTS ecosystem' },
                  { title: 'Technical Growth Programs', icon: <Sprout className="w-5 h-5 text-primary-500" />, info: 'Workshops and tailored courses to support customers and partners in adopting best practices' },
                  { title: 'Technical Excellence Hub', icon: <DatabaseZap className="w-5 h-5 text-primary-500" />, info: 'Technical training programs in automation, controls, data integration, analytics, and visualization tools.' },
                ].map((card, index) => (
                  <SlideInAnimation key={`hub-card-academy-1-${index}`} delay={(index + 1) * 0.2} >
                    <div
                      className="bg-white rounded-md border border-surface-primary p-5 flex flex-col justify-between h-hub-card"
                    >
                      <div className="flex flex-col gap-3">
                        {card.icon}
                        <Typography
                          variant="title-small"
                          className="font-bold"
                          children={card.title}
                        />
                      </div>
                      <Typography variant="body-sm" children={card.info} />
                    </div>
                  </SlideInAnimation>
                ))}

                {/* Segunda fila de 3 cards */}
                {[
                  { title: 'Engineering Skills Development', icon: <Brain className="w-5 h-5 text-primary-500" />, info: 'E-learning and on-demand content \n(modules, video tutorials, virtual labs) \nfor flexible, remote access.' },
                  { title: 'Professional Training \n& Certification', icon: <GraduationCap className="w-5 h-5 text-primary-500" />, info: 'Industry-recognized certifications \nfor engineers and technicians' },
                ].map((card, index) => (
                  <SlideInAnimation key={`hub-card-academy-2-${index}`} delay={(index + 1) * 0.2} >
                    <div

                      className="bg-white rounded-md border border-surface-primary p-5 flex flex-col justify-between h-hub-card"
                    >
                      <div className="flex flex-col gap-3">
                        {card.icon}
                        <Typography
                          variant="title-small"
                          className="font-bold"
                          children={card.title}
                        />
                      </div>
                      <Typography variant="body-sm" children={card.info} />
                    </div>
                  </SlideInAnimation>
                ))}

                {/* Imagen como última card */}
                <SlideInAnimation delay={3 * 0.2} >
                  <div
                    key={'image-hub-academy'}
                    className="bg-white rounded-md shadow-md h-hub-card"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center rounded-md"
                      style={{ backgroundImage: `url(${academyCardBackgroundImage})` }}
                    ></div>
                  </div>
                </SlideInAnimation>
              </div>
            </div>
          </div>

        </section>
      </div>


      <section id='innovation-lab' className="relative overflow-hidden">
        <div className="absolute inset-0">
          {innovationLabBackgroundImage && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${innovationLabBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              aria-hidden="true"
            />
          )}

          {/* Overlay - DEBE estar sobre la imagen pero debajo del texto */}
          <div
            className="absolute inset-0 bg-background-primary opacity-80"
            style={{ zIndex: 1 }}
          />
        </div> {/* ← AQUÍ FALTABA ESTE CIERRE */}

        {/* Contenido (texto y botones) */}
        <div className="md:px-7 py-9 px-3 relative flex flex-col md:flex-row gap-6.5 md:gap-0 text-text-primary " style={{ zIndex: 2 }}>
          <div className="md:w-1/2 flex flex-col gap-3">
            <SlideInAnimation y={50} repeat={true} >
              <Typography
                variant="subtitle-large"
                className=""
                children="- 03"
              />
              <Typography
                variant="display-sm"
                className=""
                children="INNOVATION LAB"
              />
            </SlideInAnimation>
          </div>
          <div className="md:w-1/2 flex flex-col gap-6">
            <SlideInAnimation delay={0}>
              <Typography variant={'title-medium'} children={'More than a testing ground\n—it is a laboratory of ideas and execution.'} className="font-base" />
            </SlideInAnimation>
            <SlideInAnimation delay={0.2}>
              <Typography variant={'body-md'} children={"Here, we develop new technologies, provide industrial tech consulting, \nand design pilot projects that bring innovation into real practice. It is \nwhere concepts are tested, validated, and transformed into solutions \nthat empower industries."} />
            </SlideInAnimation>
            <SlideInAnimation delay={0.3}>
              <Typography variant={'title-medium'} children={'The LAB Infrastructure'} className="font-base" />
            </SlideInAnimation>
            <SlideInAnimation delay={0.4}><Typography variant={'body-md'} children={`The most effective strategy for delivering a high-security on-site service \nis to thoroughly test deployments in-house, ensuring their robustness \nand reliability. Additionally, preparing resources to handle any potential uncertainties equips the team to respond proactively and maintain seamless operations under any circumstances.
               \nWe developed the RTS LAB, a cyber-physical environment where our\nglobal resources can emulate and deploy projects.`} />
            </SlideInAnimation>
          </div>

        </div>

      </section>

      <Banner
        backgroundImage={bannerImg}
        overlay={80}
        variantDesktop="headline-medium"
        variantMobile="headline-small"
        titleDesktop={"WOULD YOU LIKE TO KNOW\nMORE ABOUT OUR EXPERIENCE?"}
        titleMobile={"WOULD YOU LIKE TO KNOW MORE ABOUT OUR EXPERIENCE?"}

        buttons={[
          { children: "Book a meeting now", variant: "filled-dark", onClick: () => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank") },
        ]}
        backgroundPosition="center scale-150 md:scale-100 "
      />

    </>
  );
}
