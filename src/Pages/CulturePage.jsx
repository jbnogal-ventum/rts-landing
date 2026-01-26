// src/Pages/HubPage.jsx
import { useRef, useEffect } from "react";
import { Typography, Button } from "../Components/index";
import HeroCulture from "../Components/Hero/Culture/HeroCulture.jsx";
import Banner from "../Components/Banner/Banner";
import approachBackgroundImage from "../assets/Backgrounds/approach_background.jpg";
import bannerImg from "../assets/Banners/HubBanner.png";
import innovationLabBackgroundImage from "../assets/Backgrounds/innovationLabBackgroung.jpg";
import academyCardBackgroundImage from "../assets/Backgrounds/academyCardBackground.png";
import { Brain, DatabaseZap, Goal, GraduationCap, Grip, GripHorizontal, GripVertical, Handshake, PackageCheck, Play, PlayIcon, Pyramid, RadioTower, Sprout, Telescope, View } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import pannel from "../assets/hub/pannel.jpg";
import { RiPlayFill } from "@remixicon/react";
import card1 from '../assets/pages_items/card1.jpg';
import card2 from '../assets/pages_items/card2.png';
import card3 from '../assets/pages_items/card3.jpg';
import card4 from '../assets/pages_items/card4.png';


export default function CulturePage() {
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
      console.log('🧹 Limpiando observer');
      observer.disconnect();
    };
  }, [setTheme]);

  return (
    <>
      <HeroCulture />
      <div className="hero-outro-spacer" />

      <section id='industrial-tech' className="">
        <div className="md:px-9 lg:mx-9 py-9 px-3 flex flex-col  gap-6.5" >
          <Typography
            variant="headline-medium"
            className=""

          >EMPOWERING INDUSTRIES BY <br className="md:block hidden" /> MASTERING THE ART OF {" "} <span className="      bg-gradient-to-b  from-[#7513FF] via-[#4348F3]  to-[#0093CE]      bg-clip-text text-transparent    ">INDUSTRIAL  <br className="md:block hidden" /> TECHNOLOGY </span> CURATION</Typography>

          <div className="flex justify-center w-full ">
            <div className="flex flex-col gap-4 text-text-secondary w-full md:px-9 lg:mx-9">
              <Typography
                variant="title-body">
                At RTS Group, we view technology as only the beginning<br /> — our true value lies in integrating it into holistic solutions <br />that transform the way our clients operate.
              </Typography>

              <Typography
                variant="body-md">
                Whether it’s through our PODs or customized projects, we combine the best tools in the industry to deliver unmatched value, efficiency, and performance. This approach enables our clients to thrive in a competitive, data- driven world.
              </Typography>

              <Typography
                variant="title-body">
                What do we expect about our future?
              </Typography>

              <Typography
                variant="body-md">
                To be the global leader in industrial automation, data-driven solutions, <br />and IT/OT convergence, setting the benchmark for innovation, operational excellence, and sustainability.<br /><br />

                We envision a future where industries achieve unparalleled efficiency <br />and resilience through advanced technology, guided by our expertise <br />and commitment to delivering transformative solutions.
              </Typography>

            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl flex justify-center group">
            {/* Imagen principal */}
            <img
              src={pannel}
              alt="Technology"
              className="w-full  min-h-[500px] md:h-[550px] rounded-xl  object-cover"
            />

            {/* Overlay con gradiente */}
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: `
        linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 81.81%),
        linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))
      `,
                opacity: '0.8',
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Botón de play centrado */}
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               w-16 h-16 md:w-20 md:h-20 bg-background-inverse bg-opacity-40 rounded-full 
               flex items-center justify-center shadow-lg 
               hover:scale-110 transition-all duration-300 
               hover:shadow-2xl "
              aria-label="Play video"
              onClick={() => {/* Tu función para reproducir video */ }}
            >
              {/* Icono de play */}
              <RiPlayFill className="w-icon-sm h-icon-sm md:w-10 md:h-10 text-white " />
            </button>

            {/* Efecto de pulso opcional */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  w-20 h-20 md:w-24 md:h-24 bg-white/30 rounded-full 
                  animate-pulse pointer-events-none" /> */}
          </div>
        </div>
      </section>

      <section id='our-approach' className="relative overflow-hidden bg-background-primary">
        {/* Contenedor para la imagen de fondo */}
        <div className="absolute inset-0 hidden md:block">
          <img
            src={approachBackgroundImage}
            alt="Background"
            style={{
              position: 'absolute',
              bottom: '-35%',
              right: '-10%',
              width: '100%',
              //minWidth: '100%', // Fuerza el ancho mínimo
              height: 'auto',
              //maxHeight: '60%',
              //transform: 'scaleX(1.1)', // Escala horizontalmente si es necesario
              transformOrigin: 'bottom center',
            }}
          />
        </div>
        {/* Overlay opcional si el texto no se ve bien */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="md:px-7 py-9 px-3 relative flex flex-col  gap-7" style={{ zIndex: 2 }}>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 " >
            <div className="flex flex-row md:w-2/3">

              <Typography
                variant="headline-medium"
                className="md:text-headline-large"

              >OUR APPROACH</Typography>
            </div>
            <div className="md:w-1/2 flex md:justify-end md:items-end text-text-secondary">

              <Typography variant={'body-md'} children={"We approach digital transformation in Industry 4.0 with a proven, strategic framework designed to deliver impactful and sustainable results. "} />

            </div>

          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-text-on-white-primary">
              {/* Primera fila de 3 cards */}
              {[
                { title: 'Creating a Sense of Urgency', icon: <View className="w-5 h-5 text-primary-500" />, info: 'Identify critical opportunities or challenges to ignite momentum and commitment.' },
                { title: 'Building a Guiding Coalition', icon: <Goal className="w-5 h-5 text-primary-500" />, info: 'Assemble a leadership team with \nthe authority and expertise to champion \nthe project.' },
                { title: 'Crafting a Clear Vision', icon: <Telescope className="w-5 h-5 text-primary-500" />, info: 'Define an ambitious yet achievable vision, paired with actionable strategies to drive results.' },
                { title: 'Communicating the Vision', icon: <RadioTower className="w-5 h-5 text-primary-500" />, info: 'Identify critical opportunities or challenges to ignite momentum and commitment.' },
                { title: 'Empowering Collaboration', icon: <Handshake className="w-5 h-5 text-primary-500" />, info: "Foster active client engagement, enabling them to co-create and contribute to the project's success." },
                { title: 'Achieving Early Wins', icon: <PackageCheck className="w-5 h-5 text-primary-500" />, info: 'Focus on quick, tangible outcomes to build confidence, momentum, and proof of success.' },
              ].map((card, index) => (
                <div
                  key={`culture-card-1-${index}`}
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

              <div className="bg-white rounded-md shadow-md p-5 flex flex-col justify-between h-hub-card"
              >
                <div className="flex flex-col gap-3">
                  <Pyramid className="w-5 h-5 " />
                  <Typography
                    variant="title-body"
                    className="font-bold"
                    children={'Embedding Lasting Change'}
                  />
                </div>
                <Typography variant="body-md" children={"Integrate the project’s outcomes into the client’s processes, ensuring long-term value and transformation."} />
              </div>

              <div className="rounded-md bg-transparent p-5  h-hub-card hidden md:flex"
              >
              </div>

              {/* Texto como última card */}
              <div
                className=" rounded-md h-auto md:h-hub-card flex flex-col justify-end md:p-5 "
              >
                <Typography
                  variant="title-small"
                  className="text-text-primary"
                  children={'This structured approach ensures every project not only achieves its objectives but also creates lasting change for our clients.'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <div ref={whiteBlockRef}>
        <section id='operation' className="relative overflow-hidden ">
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

            <Typography
              variant="headline-small"
              className="md:text-headline-large md:text-center"
              children={"SOLUTIONS THAT TRANSFORM \nTHE WAY OUR CLIENTS OPAREATE"}
            />
            <div className="flex flex-col gap-4">

              {/* Primera fila de 3 cards */}
              {[
                { title: "UNIFIED ECOSYSTEMS", img: card1, info: "We design and implement cohesive \nsystems where all technologies work \nseamlessly together, tailored to the \nclient’s specific needs." },
                { title: "INNOVATION \nAT THE CORE", img: card2 , info: "By integrating industry-leading tools into\nour PODs, we ensure our clients stay at the forefront of industrial innovation." },
                { title: "SCALABILITY AND FUTURE-READINESS", img: card3, info: "Our solutions are built to adapt and \nscaleas client operations grow, ensuring long-term value." },
                { title: "EXPERT IMPLEMENTATION", img: card4 , info: "Our team’s deep expertise with these \nplatforms guarantees smooth integration, minimal disruption, and maximum ROI." },
              ].map((card, index) => (
                <div
                  key={`culture-card-1-${index}`}
                  className="bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 md:items-center w-full p-5"
                >
                  
                    
                    <Typography
                      variant="headline-small"
                      className="  bg-gradient-to-b  from-[#7513FF] via-[#4348F3]  to-[#0093CE]      bg-clip-text text-transparent   "
                      children={card.title}
                    />
                   
                <img className="w-[252px] h-[252px] object-cover rounded-xs" src={card.img} alt="" />

                  <Typography variant="body-md" children={card.info} />
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>

      <Banner
        variant="image"
        backgroundImage={card1}
        overlay={80}
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
