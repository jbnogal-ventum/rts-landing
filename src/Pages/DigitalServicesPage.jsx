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
import HeroDigitalServices from "../Components/Hero/DigitalServices/HeroDigitalServices.jsx";
import blueNebulosa from "../assets/Backgrounds/nebulosa_blue.png";
import bannerImg from "../assets/Banners/moon_20.png";
import OvalPods from '../assets/pages_items/oval_pods_mono.svg?react'; // Nota el ?react
import CirclePods from '../assets/pages_items/circle_pods_mono.svg?react';
import DicePods from '../assets/pages_items/dice_pods_mono.svg?react';
import TrianglePods from '../assets/pages_items/triangle_pods_mono.svg?react';
const tableRows = [
  [
    { children: "Data-Driven", variant: "title-small", Icon: (<CirclePods className="w-icon-xl h-icon-xl text-core-violet md:text-text-primary  fill-current" />) },
    { children: "From initial data gathering \nto final value creation", variant: "title-body" },
    { children: "By focusing on defined objectives, advanced analytics,  and measurable impact, we turn overwhelming data streams into powerful tools for decision-making and business growth.", variant: "body-sm" },

    {
      children: ["Smart Data Gathering",
        "Advanced Data Processing",
        "Value Creation at Scale"], variant: "body-sm"
    },
  ],
  [
    { children: "Networking", variant: "title-small", Icon: (<DicePods className="w-icon-xl h-icon-xl text-core-violet md:text-text-primary  fill-current" />) },
    { children: "Connecting systems, \nempowering industries", variant: "title-body" },
    { children: "Designed to establish, optimize, and maintain robust communication infrastructures that enable seamless connectivity across industrial systems. Its focus is on ensuring reliable, secure, and efficient data exchange  for modern industrial operations.", variant: "body-sm" },
    {
      children: ["Network design & architecture",
        "Protocol integration",
        "Secure connectivity",
        "Real-Time communication",
        "System optimization & troubleshooting",
        "Industrial IoT integration",], variant: "body-sm"
    },
  ],
  [
    { children: "IT/OT\n Convergence", variant: "title-small", Icon: (<OvalPods className="w-icon-xl h-icon-xl text-core-violet md:text-text-primary  fill-current" />) },
    { children: "Bridging operational\nand digital worlds with \nculture approach", variant: "title-body" },
    { children: "Guiding organizations in developing a culture that bridges the gap between Information Technology (IT)  and Operational Technology (OT). This POD emphasizes fostering collaboration, shared goals, and mutual understanding between teams, unlocking \nthe full potential of digital transformation.", variant: "body-sm" },
    {
      children: [
        " Cultural alignment",
        "Organizational change management",
        "Consultative roadmap development",
        "Skill development & training",
        "Governance & Best practices",
        "Strategic alignment with business goals",

      ], variant: "body-sm"
    },
  ],
  [
    { children: "AVEVA PI System", variant: "title-small", Icon: (<TrianglePods className="w-icon-xl h-icon-xl text-core-violet md:text-text-primary  fill-current" />) },
    { children: "Maximizing the value of your AVEVA PI System", variant: "title-body" },
    { children: "Specializes in providing comprehensive services for AVEVA PI System, the industry-leading platform for real-time operational data management. Our focus is on helping organizations fully leverage the capabilities of their PI System to drive operational efficiency, enhance decision- making, and unlock the power of their data.", variant: "body-sm" },
    {
      children: ["Design and Implementation",
        "Migration and Upgrade",
        " Integration with Third-Party Systems",
        " Data Integration and Connectivity",
        "Advanced Analytics and Process Optimization",
        " Support and Maintenance",
        "Training and Knowledge Transfer",
        "Cloud and Edge Integration",], variant: "body-sm"
    },
  ],
];
const items = [
  {
    title: "What is a POD?",
    body:
      "A POD is a multidisciplinary team designed to collaborate and consolidate diverse skills to meet client requirements. Each POD operates autonomously, setting short-term, reviewable goals based on defined objectives and specifications. ",
  },
  {
    title: "What's the impact on project execution?",
    body: "This systematic and agile approach ensures efficient project execution while adhering to all documentation and programming requirements. Our POD Services strategy ensures we achieve project objectives with maximum agility and precision, delivering exceptional results every time."
  },
  {
    title: "What is the technology advantage?",
    body: "We bring deep expertise in the entire technological stack available to our clients, leveraging this knowledge to develop services and deploy the most efficient solutions for each project. "
  }
]
export default function DigitalServicesPage() {
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
      <HeroDigitalServices />

      <section id='digital-pod' className="flex flex-col md:flex-row gap-8 pt-9 pb-9 md:pb-7 px-3 md:px-8  bg-background-primary ">

        <div className="flex flex-col gap-5 md:gap-7 w-full md:w-1/2 " >

          <Typography variant="title-medium" className="text-secondary font-base" >
            Through our POD services framework, we merge OT experience, process knowledge, and computer science to engineer the digital core of industrial operations.
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
      <section id='meet-our-pods' className='felx flex-col py-9 px-3 md:px-7 bg-background'>

        <Typography
          variant="headline-medium"
          className="md:text-display-sm md:text-center text-text-primary pb-4  md:pb-7">
          MEET <br className="md:hidden" /> OUR {" "}
          <span className="      bg-gradient-to-b  from-[#6343f3]  to-[#0093CE]      bg-clip-text text-transparent    ">
            PODS
          </span>
        </Typography>
        <Table rows={tableRows} columns={["Service", "Focus", "Description", "Main technologies"]} mode='dark' />

      </section>
      <div ref={whiteBlockRef}>
        <section id='partners' className="flex flex-col md:flex-row px-3 md:px-7 py-9 gap-6 md:gap-4 relative overflow-hidden ">
          {/* Imagen de fondo con las especificaciones requeridas */}
          <div
            className="absolute block md:hidden"
            style={{
              backgroundImage: `url(${blueNebulosa})`,
              backgroundSize: '650px auto', // Ancho exacto, alto automático
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(-45deg)',
              opacity: '40%',
              width: '650px',
              height: '718px',
              top: '-35%',
              left: '-70%',
              // Si necesitas recortar específicamente
              backgroundPosition: 'center',
            }}
          />

          {/* Contenido existente con z-index para que esté por encima del fondo */}
          <div className="relative z-10 flex flex-col gap-6 w-full md:w-3/5">
            <div className="flex flex-col gap-4">
              <Typography variant="subtitle-md" className="text-secondary" >
                DIGITAL SOLUTIONS
              </Typography>
              <Typography variant="headline-small" className="md:text-headline-medium" >
                WE CAREFULLY SELECT AND IMPLEMENT CUTTING-EDGE PLATFORMS
              </Typography>
            </div>
            <div className="flex w-full md:justify-center">
              <Typography variant="body-lg" className="text-tsecondary md:w-ds-parteners-img" >
                At RTS Group, we seamlessly integrate industry-leading technology solutions into our PODs to achieve the specific outcomes of each project.
              </Typography>
            </div>
          </div>

          <div className="relative z-10">
            <img src={partnersImg} alt="Partners" className="md:h-ds-parteners-img md:w-ds-parteners-img w-full h-auto" />
          </div>

        </section>
      </div>
      <Banner
        variantDesktop="headline-medium"
        variantMobile="headline-small"
        backgroundImage={bannerImg}
        backgroundPosition="center"
        titleDesktop={"WOULD YOU LIKE TO KNOW\nMORE ABOUT OUR EXPERIENCE?"}
        titleMobile={"WOULD YOU LIKE TO KNOW MORE ABOUT OUR EXPERIENCE?"}
        overlay={50}
        buttons={[
          {
            children: "Download the full document",
            variant: "outlined-dark",
          },
          { children: "Book a meeting now", variant: "filled-dark", className: "w-full" },
        ]}
      />

    </>
  );
}
