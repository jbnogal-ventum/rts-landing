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

export default function HubPage() {
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
      <HeroHub  />
      <div className="hero-outro-spacer" />

      <section id='laboratory' className="relative overflow-hidden ">
        <div className="md:px-7 py-9 px-3 relative flex flex-col  gap-7" style={{ zIndex: 2 }}>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 " >
            <div className="flex flex-row md:w-2/3">

              <Typography
                variant="headline-medium"
                className="md:text-headline-large"

              >OUR <span className="text-core-violet">LABORATORY</span> OF IDEAS AND EXECUTION</Typography>
            </div>
            <div className="md:w-1/2 flex md:justify-end md:items-end">

              <Typography variant={'body-md'} children={"It brings together a single ecosystem where knowledge, experimentation, and collaboration converge. Here, learning becomes practice, innovation turns into solutions, and communities spark industrial brilliance."} />

            </div>

          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Primera fila de 3 cards */}
              {[
                { title: 'Bellow The Line', icon: <GripHorizontal className="w-5 h-5 text-core-violet" />, info: 'A creative and experiential \nunit where ideas meet industry.' },
                { title: 'Academy', icon: <Grip className="w-5 h-5 text-core-violet" />, info: 'Training and development  \narm of RTS Group.' },
                { title: 'Innovation Lab', icon: <GripVertical className="w-5 h-5 text-core-violet" />, info: 'More than a testing ground—it is a laboratory of ideas and execution.' },
              ].map((card, index) => (
                <div
                  key={`hub-card-laboratory-${index}`}
                  className="rounded-md shadow-md p-5 flex flex-col justify-between h-hub-card border border-assistant-prompt bg-background-primary"
                >
                  <div className="flex flex-col gap-3">
                    {card.icon}
                    <Typography
                      variant="title-body"
                      className="font-bold"
                      children={card.title}
                    />
                  </div>
                  <Typography variant="body-md" children={card.info} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BelowTheLineSection />
      <div ref={whiteBlockRef}>
        <section id='academy' className="relative overflow-hidden ">
          <div className="absolute inset-0">
            <div
              className="banner-bg absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(180deg, #EBEEF0 0%, #E5DAFF 100%)'
              }}
              aria-hidden="true"
            />


          </div>

          {/* Contenido (titulos y cards) */}
          <div className="md:px-7 py-9 px-3 relative flex flex-col  gap-7" style={{ zIndex: 2 }}>
            <div className="flex flex-col md:flex-row md:justify-between gap-7 " >
              <div className="flex flex-col gap-3 md:w-1/2">
                <Typography
                  variant="subtitle-large"
                  className=""
                  children="- 02"
                />
                <Typography
                  variant="display-sm"
                  className=""
                  children="ACADEMY"
                />
              </div>
              <div className="md:w-1/2 flex md:justify-end md:items-end">

                <Typography variant={'body-md'} children={"Dedicated to enhancing technical skills and knowledge in the fields of industrial automation, IT-OT convergence, and advanced data analytics."} />

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
                  <div
                    key={`hub-card-academy-1-${index}`}
                    className="bg-white rounded-md shadow-md p-5 flex flex-col justify-between h-hub-card"
                  >
                    <div className="flex flex-col gap-3">
                      {card.icon}
                      <Typography
                        variant="title-body"
                        className="font-bold"
                        children={card.title}
                      />
                    </div>
                    <Typography variant="body-md" children={card.info} />
                  </div>
                ))}

                {/* Segunda fila de 3 cards */}
                {[
                  { title: 'Engineering Skills Development', icon: <Brain className="w-5 h-5 text-primary-500" />, info: 'E-learning and on-demand content \n(modules, video tutorials, virtual labs) \nfor flexible, remote access.' },
                  { title: 'Professional Training \n& Certification', icon: <GraduationCap className="w-5 h-5 text-primary-500" />, info: 'Industry-recognized certifications \nfor engineers and technicians' },
                ].map((card, index) => (
                  <div
                    key={`hub-card-academy-2-${index}`}
                    className="bg-white rounded-md shadow-md p-5 flex flex-col justify-between h-hub-card"
                  >
                    <div className="flex flex-col gap-3">
                      {card.icon}
                      <Typography
                        variant="title-body"
                        className="font-bold"
                        children={card.title}
                      />
                    </div>
                    <Typography variant="body-md" children={card.info} />
                  </div>
                ))}

                {/* Imagen como última card */}
                <div
                  key={'image-hub-academy'}
                  className="bg-white rounded-md shadow-md h-hub-card"
                >
                  <div
                    className="w-full h-full bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(${academyCardBackgroundImage})` }}
                  ></div>
                </div>
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
          </div>
          <div className="md:w-1/2 flex flex-col gap-6">
            <Typography variant={'title-medium'} children={'More than a testing ground\n—it is a laboratory of ideas and execution.'} className="font-base" />
            <Typography variant={'body-md'} children={"Here, we develop new technologies, provide industrial tech consulting, \nand design pilot projects that bring innovation into real practice. It is \nwhere concepts are tested, validated, and transformed into solutions \nthat empower industries"} />

            <Typography variant={'title-medium'} children={'The LAB Infrastructure'} className="font-base" />
            <Typography variant={'body-md'} children={`The most effective strategy for delivering a high-security on-site service \nis to thoroughly test deployments in-house, ensuring their robustness \nand reliability. Additionally, preparing resources to handle any potential uncertainties equips the team to respond proactively and maintain seamless operations under any circumstances.
               \nWe developed the RTS LAB, a cyber-physical environment where our\nglobal resources can emulate and deploy projects.`} />
          </div>

        </div>

      </section>

      <Banner
        variant="image"
        backgroundImage={bannerImg}
        overlay={true}
        titleClassName="display-medium"
        titleDesktop={"WOULD YOU LIKE TO KNOW\nMORE ABOUT OUR EXPERIENCE?"}
        titleMobile={"WOULD YOU LIKE TO KNOW MORE ABOUT OUR EXPERIENCE?"}

        buttons={[
          { label: "Book a meeting now", href: "#book", variant: "filled-dark" },
        ]}
        start="top top"
      />

    </>
  );
}
