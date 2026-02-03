
// src/Pages/AutomationControls.jsx

import { useEffect, useRef } from "react";
import { Typography, Button } from "../Components/index";
import ApproachButton from "../Components/UI/ApproachButton";
import Accordeon from "../Components/UI/Accordeon";
import SwapContent from "../Components/SwapContent";
import Table from "../Components/UI/Table";
import Banner from "../Components/Banner/Banner";
import { useTheme } from "../contexts/ThemeContext";

import bannerImg from "../assets/Content.png";
import HeroAutomation from "../Components/Hero/Automation/HeroAutomation";
import ovalPods from "../assets/pages_items/oval_pods.svg";
import circlePods from "../assets/pages_items/circle_pods.svg";
import dicePods from "../assets/pages_items/dice_pods.svg";

import integrationsImg from "../assets/integrations.png";
import expertiseBackground from "../assets/Backgrounds/innovationLabBackgroung.jpg";
import "./AutomationControls.css";


const items = [
  {
    id: "p1",
    title: "Process Automation & Control",
    body:
      "Our core capabilities include process automation, data management, programming and configuration, system design, implementation, and project management.",
  },
  {
    id: "p2",
    title: "Control System Design & Integration",
    body:
      "We provide expert guidance to help clients select, design, and integrate control systems that align with best industry practices. Our expertise covers all DCS and PLC platforms, robust system architectures, and network communications based on industry-standard protocols.",
  },
  {
    id: "p3",
    title: "System Migration & Virtualization",
    body:
      "We deliver migration strategies and virtualization solutions that extend system lifecycles, reduce risks, and optimize performance.",
  },
  {
    id: "p4",
    title: "HMI Design & Virtualization",
    body:
      "We design and implement high-performance HMI solutions tailored to the specific needs of each industry and process environment.",
  },
];

const tableRows = [
  [
    { children: "Experion Architecture\n& Control System", variant: "title-small" },
    { children: "We provide expert guidance to help clients select, design, and ", variant: "title-body" },
    { children: "From system design to logic configuration and safety integration, RTS engineers ensure seamless performance across PKS, TPS, and ControlEdge environments.", variant: "body-sm" },

    { children: ["Experion PKS", "TPS", "Control Edge", "Safety Manager"], variant: "body-sm" },
  ],
  [
    { children: "System Migration\n& Virtualization", variant: "title-small" },
    { children: "We modernize legacy Honeywell systems without losing their DNA.", variant: "title-body" },
    { children: "RTS specializes in migration from TPS to PKS, virtualization of legacy nodes, and upgrade projects across all HPS layers — preserving knowledge while unlocking new performance.", variant: "body-sm" },
    { children: ["TPS migration", "Virtualization", "Experion upgrade", "Backup recovery"], variant: "body-sm" },
  ],
  [
    { children: "Data Integration\n& Operational Intelligence", variant: "title-small" },
    { children: "We extend the value of Honeywell Process Solutions into the digital layer.", variant: "title-body" },
    { children: "Integrating Experion with PI System, Edge gateways, and cloud analytics, RTS connects process control to enterprise intelligence — making operations measurable, visible, and adaptive.", variant: "body-sm" },
    {
      children: [
        "Experion-to-PI integration",
        "Honeywell Digital Twin",
        "Edge/Historian",
        "Secure Remote Access",
      ], variant: "body-sm"
    },
  ],
  [
    { children: "SCADA, Visualization\n& Field Implementation", variant: "title-small" },
    { children: "We bring HPS technology to life in the field.", variant: "title-body" },
    { children: "From SCADA configuration to commissioning and validation (FAT/SAT), RTS delivers end-to-end implementation aligned with Honeywell engineering standards and methodologies.", variant: "body-sm" },
    { children: ["Experion SCADA", "Honeywell RTU2020", "HC900", "Experion HS"], variant: "body-sm" },
  ],
];

const engineeringCards = [
  {
    title: "Dedicated Pods",
    body:
      "Multidisciplinary RTS teams (automation, IT/OT, data analytics, commissioning) assigned to targeted objectives — from system migrations to full lifecycle projects.",
    icon: ovalPods,
  },
  {
    title: "Embedded Engineers",
    body:
      "Individual RTS specialists integrated into client teams, supporting specific project tasks or long-term maintenance in hybrid or remote modes.",
    icon: circlePods,
  },
  {
    title: "Hybrid Workforce\nas-a-Service",
    body:
      "A combined model with onsite engineers and remote RTS Global Operations support, ensuring 24/7 responsiveness and access to global expertise.",
    icon: dicePods,
  },
];

const itemsExpertice = [
  {
    id: "e1",
    title: "Areas of expertise",
    body: <ul className="flex flex-col list-disc pl-4">
      <li >
        <Typography
          children={`Process Control Systems (Honeywell, Siemens, Rockwell, ABB)`}
        />
      </li>
      <li >
        <Typography
          children={`AVEVA PI System & Industrial Data Infrastructure`}
        />
      </li>
      <li >
        <Typography
          children={`OT Networking & Cybersecurity`}
        />
      </li>
      <li >
        <Typography
          children={`SCADA & Edge Computing`}
        />
      </li>
      <li >
        <Typography
          children={`Energy Management & Power Systems`}
        />
      </li>
      <li >
        <Typography
          children={`Process Optimization & Industrial Analytics`}
        />
      </li>
      <li >
        <Typography
          children={`Digital Twin Development`}
        />
      </li>
      <li >
        <Typography
          children={`FAT/SAT, Commissioning & Field Services`}
        />
      </li>
    </ul>
  },
  {
    id: "e2",
    title: "Cost-Effective Planning",
    body: "Convert fixed costs into variable ones. Scale your engineering capacity to match project demand without long-term overhead."
  },
  {
    id: "e3",
    title: "On-Demand Expertise",
    body: "Access highly qualified professionals in automation, networking, cybersecurity, PI System, IT/OT convergence, energy systems, commissioning, and more — instantly."
  },
  {
    id: "e4",
    title: "Process Optimization",
    body: "Our engineers bring RTS’s proven methodologies to enhance process performance and operational efficiency from day one."
  },
  {
    id: "e5",
    title: "Integrated Knowledge Transfer",
    body: "We ensure full documentation and skill transfer, so your organization retains expertise even after the engagement ends."
  },
  {
    id: "e6",
    title: "Unlock More Projects — Without More Headcount",
    body: "Increase your execution bandwidth, pursue new contracts, and meet deadlines without expanding internal teams."
  }
]

export default function AutomationControlsPage({ setNavMode }) {

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
    <main id="automation-page">
      <HeroAutomation />

      <section id="automation-expertise" className="relative"
      >
        {/* Contenedor para la imagen de fondo - FONDO COMPLETO */}
        <div className="absolute inset-0 z-0 hidden md:block">
          {expertiseBackground && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${expertiseBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat'
              }}
              aria-hidden="true"
            />
          )}

          {/* Overlay */}
          <div
            className=" absolute inset-0 bg-gradient-to-b from-[#030108] to-transparent h-1/2"
            style={{
              zIndex: 1
            }}
          />
          <div
            className="absolute inset-0 bg-background-primary"
            style={{
              opacity: 0.8, // Convertir 50 a 0.5
              zIndex: 2
            }}
          />
        </div>


        <div className="flex flex-col pt-9 pb-9 md:pb-7 px-3 md:px-7 gap-7 relative z-10 ">
          <div className="flex flex-col md:flex-row  gap-7 ">
            <div className="flex flex-col gap-5 md:gap-7 w-full md:w-1/2">
              <Typography variant="title-medium">
                Devoted to maintaining, innovating, and enhancing industrial control systems, <br className="md:hidden" />we engineer projects across various industries.
              </Typography>

              <Button variant="filled-dark" className="w-fit">
                Book a meeting now
              </Button>
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <Typography variant="subtitle-lg" className="text-text-secondary">
                Key areas of expertise
              </Typography>
              <Accordeon items={items} defaultOpen={0} allowCollapse />
            </div>
          </div>
          <div className="hidden md:block pt-9">
            <Typography
              variant="headline-large"
              className="text-center"
            >
              WE ARE COMMITTED <br />TO DELIVERING {" "}
              <span className="bg-gradient-to-br from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">
                EFFICIENT<br /> AND RELIABLE
              </span> SOLUTIONS
            </Typography>
          </div>
        </div>
      </section>
            <SwapContent />

      <div ref={whiteBlockRef}>
        <section id="honey-well" className="relative overflow-hidden ">
          {/* GRADIENTE BACKGROUND */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* DESKTOP: Primer gradiente principal */}
            <div
              className="absolute hidden md:block"
              style={{
                background: 'radial-gradient(145.3% 70.02% at 45.94% 35.79%, rgba(255, 168, 0, 1) 24.04%, rgba(255, 0, 0, 1) 60.58%, rgba(255, 71, 214, 1) 100%)',
                transform: 'rotate(-112deg)',
                width: '50vw',
                height: '50vh',
                top: '-30%',
                left: '30%',
                filter: 'blur(400px)',
                // Suavizar transiciones
                mixBlendMode: 'screen',
              }}
            />

            {/* MOBILE: Primer gradiente principal */}
            <div
              className="absolute md:hidden"
              style={{
                background: 'radial-gradient(111.63% 111.63% at 42.64% -5.82%, rgba(255, 168, 0, 1) 33.65%, rgba(255, 0, 0, 1) 44.58%, transparent 100%)',
                transform: 'rotate(-90deg)',
                width: '100vw',
                height: '100vh',
                top: '-50%',
                right: '0%',
                filter: 'blur(400px)',
                // Suavizar transiciones
                mixBlendMode: 'screen',
              }}
            />
            {/* DEGRADADO Bottom*/}
            <div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-b to-background-inverse from-transparent h-1/2"
              style={{
                zIndex: 1
              }}
            />
          </div>


          <div className="relative z-10 px-3 md:px-7 pt-9 ">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col gap-6 md:gap-4 w-full md:w-1/2">
                <Typography variant="headline-medium" className="md:text-headline-medium">
                  <span className="bg-gradient-to-br from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">
                    HONEYWELL
                  </span> <br />
                  ELITE TEAM WORLDWIDE
                </Typography>
                <img
                  className="w-full h-auto"
                  src={integrationsImg}
                  alt="Honeywell integrations diagram"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-6 w-full md:w-1/2 text-text-on-white-secondary">

                <Typography variant="title-medium" className="">
                  This team ensures that every customer using Honeywell technologies benefits from world-class expertise and global support.
                </Typography>

                <Typography className="">
                  At RTS, we support end customers operating with Honeywell technologies by providing integration, configuration, and lifecycle services that ensure safe, reliable, and optimized operations.
                  <br /><br />
                  To meet the highest quality standards, we established the Honeywell Elite Team — a specialized group of engineers focused on Honeywell Process Solutions (HPS) and the seamless integration of Honeywell platforms with third-party systems.
                </Typography>

                <Typography variant="title-body" className="">
                  Engineering Services Abroad Department
                </Typography>

                <Typography className="">
                  To further extend our reach, we created the Engineering Services Abroad Department, delivering high-performance back-office engineering and implementation support for Honeywell-based operations around the world.
                  <br /> <br />
                  As a Value Added Reseller (VAR) for Honeywell Process Solutions, <br className="hidden md:block" />RTS is also authorized to offer, distribute, and integrate HPS products <br className="hidden md:block" />and hardware, from controllers and field instruments to advanced automation systems.
                </Typography>

                <Button children="Book a meeting now" />

              </div>

            </div>

          </div>


        </section>

        <section id="honey-well-technologies" className="px-3 md:px-7 py-9">

          <div className="flex flex-col md:gap-5 gap-6">
            <Typography variant="title-large" className="text-center">
              Capabilities with Honeywell technologies
            </Typography>

            <Table columns={['Service', 'Focus', 'Description', 'Main technologies']} rows={tableRows} />
          </div>


        </section>
      </div>


      <section id="industrial-intelligence">
        <div className="flex flex-col md:flex-row gap-6 py-9 px-3 md:px-7">
          <div className="w-full md:hidden flex flex-col gap-6 ">
            <Typography variant="headline-small">
              ENGINEERING<br />SERVICES ABROAD
            </Typography>
            <Button children="Book a meeting now" />
          </div>
          <div className="hidden md:flex w-1/2  flex-col gap-7">
            <Typography variant="title-medium">
              RTS Engineering Workforce
            </Typography>
            <Typography variant="headline-medium">
              AUGMENTING<br />
              <span className="bg-gradient-to-br from-[#7513FF] via-[#4348F3] to-[#0093CE] bg-clip-text text-transparent">INDUSTRIAL</span><br />
              INTELLIGENCE
            </Typography>
            <Typography variant="body-default">
              A flexible, cost-effective solution designed to expand your operational and technical capabilities without increasing permanent headcount.
            </Typography>
          </div>

          <div className="w-full md:w-1/2">
            <Accordeon items={itemsExpertice} defaultOpen={0} allowCollapse />
          </div>

        </div>

      </section>

      <section id={'engineering-cards'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-3 md:px-7 pt-4 pb-9">

          {engineeringCards.map((card, index) => (
            <div key={`engineering-card-${index}`} className="flex flex-col justify-between p-5 bg-background-white border border-1 border-surface-primary rounded-md text-text-on-white-primary h-hub-card">
              <div className="">
                <img
                  className="w-icon-xl h-icon-xl"
                  src={card.icon}
                  alt={card.title}
                  loading="lazy"
                />
                <Typography variant="title-small" className="mt-3">
                  {card.title}
                </Typography>
              </div>
              <Typography variant="body-small" className="">
                {card.body}
              </Typography>
            </div>
          ))}
        </div>

      </section>
      <Banner
        titleClassName="headline-medium"
        backgroundImage={bannerImg}
        titleDesktop={"WOULD YOU LIKE TO KNOW\nMORE ABOUT OUR EXPERIENCE?"}
         overlay={50}
        buttons={[
          {
            children: "Download the full document",
            variant: "outlined-dark",
          },
          { children: "Book a meeting now", variant: "filled-dark", className: "w-full" },
        ]}
      />
    </main>
  );
}

