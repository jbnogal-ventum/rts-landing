import { Button, Typography } from "../index.js";
import { useEffect, useRef, useState } from "react";

import technologyImg from "../../assets/hub/technology.jpg";
import entryCards from "../../assets/hub/entryCards.jpg";
import rockingIndustryImg from "../../assets/hub/rockingIndustryLogo.png";
import pannel from "../../assets/hub/pannel.jpg";
import exposition1 from "../../assets/hub/exposition.jpg";
import exposition2 from "../../assets/hub/exposition2.jpg";
import participants from "../../assets/hub/participants.jpg";
import coders from "../../assets/hub/coders.jpg";
import { CircleCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
//gsap.registerPlugin(ScrollTrigger);
export default function BelowTheLineSection() {
    const sectionRef = useRef(null);
    const horizontalContainerRef = useRef(null);
   
    // Detectar dispositivos
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    const { scrollYProgress } = useScroll({
        target: sectionRef
    });
    
    const xDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-130%"]);
    const xTablet = useTransform(scrollYProgress, [0, 1], ["0%", "-180%"]);
    const xMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-180%"]);
    
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
        <section
            ref={sectionRef}
            className="relative w-full md:h-[500vh] h-[600vh] "
        >   <div className="sticky top-0  h-[780px]  flex items-center overflow-hidden">
                <div className=" md:px-7 px-3 my-9">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-3">
                            <Typography variant="subtitle-large">- 01</Typography>
                            <Typography variant="display-sm">BELOW THE LINE</Typography>
                        </div>

                        {/* Contenedor que será "pinned" */}
                        <div className="relative h-[400px]">


                            {/* Contenedor que se mueve horizontalmente con GSAP */}
                            <motion.div
                                ref={horizontalContainerRef}
                                className="flex gap-6 absolute left-0 top-0 h-full"
                                style={{ x: xValue }}
                            >
                                {/* CONTENIDO DEL CONTAINER HORIZONTAL - NO CAMBIAR ESTO */}
                                <div className="flex-shrink-0 w-[300px] md:w-[450px]">
                                    <div className="flex flex-col gap-3">
                                        <Typography variant={'title-medium'}>
                                            A creative and experiential unit where ideas meet industry.
                                        </Typography>
                                        <Typography variant={'body-md'}>
                                            Through initiatives like Rocking the Industry and the Data-Driven LAB,
                                            we go beyond traditional services to spark interaction, collaboration,
                                            and thought leadership.
                                        </Typography>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-[400px] md:w-[666px]">
                                    <div className="overflow-hidden">
                                        <img
                                            src={technologyImg}
                                            alt="Technology"
                                            className="w-full h-auto transform hover:scale-105 
                                                 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-[300px] md:w-[450px]">
                                    <div className="flex flex-col gap-6 rounded-md">
                                        <Typography variant={'title-medium'}>
                                            What do we deliver
                                        </Typography>
                                        <div className="flex flex-col gap-5">
                                            <div className="flex gap-3 items-start">
                                                <CircleCheck className="text-green-500 flex-shrink-0 mt-1 animate-pulse" />
                                                <Typography variant={'body-sm'}>
                                                    Immersive experiences that connect talent, clients, and partners.
                                                </Typography>
                                            </div>
                                            <div className="flex gap-3 items-start">
                                                <CircleCheck className="text-green-500 flex-shrink-0 mt-1 animate-pulse"
                                                    style={{ animationDelay: '0.2s' }} />
                                                <Typography variant={'body-sm'}>
                                                    Industrial hackathons and symposiums that inspire innovation.
                                                </Typography>
                                            </div>
                                            <div className="flex gap-3 items-start">
                                                <CircleCheck className="text-green-500 flex-shrink-0 mt-1 animate-pulse"
                                                    style={{ animationDelay: '0.4s' }} />
                                                <Typography variant={'body-sm'}>
                                                    A living community where culture, technology, and knowledge converge.
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 ">
                                    <div className="rounded-md overflow-hidden">
                                        <img
                                            src={entryCards}
                                            alt="Entry Cards"
                                            className="w-[192px] h-[192px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="rounded-md bg-background-inverse p-4 flex flex-col gap-4">
                                        <img
                                            src={rockingIndustryImg}
                                            alt="Rocking Industry Logo"
                                            className="w-[227px] h-[51px]"
                                        />
                                        <Typography variant={'body-lg'} className="text-text-on-white-primary font-bold">
                                            Every year, RTS proudly hosts the <br />industrial hackathon "Rocking the Industry"
                                        </Typography>
                                        <Typography variant={'body-md'} className="text-text-on-white-primary">
                                            A two days event that brings together innovation,<br /> collaboration, and cutting-edge solutions to<br /> address the sector's most pressing challenges.
                                        </Typography>
                                        <Button variant="filled-light">
                                            Learn more about the event
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="rounded-md overflow-hidden">
                                        <img
                                            src={pannel}
                                            alt="Panel"
                                            className="w-auto h-[391px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-[300px] md:w-[450px]">
                                    <div className="flex flex-col gap-4">
                                        <Typography variant={'title-medium'} className="">
                                            Inspiring the next <br /> generation of leaders
                                        </Typography>
                                        <Typography variant={'body-md'} className="">
                                            More than just a competition, Rocking The Industry is a strategic platform to inspire the next generation of leaders, establish valuable connections, and position sponsoring brands as leaders committed to innovation and progress <br />in the industry.
                                        </Typography>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="flex flex-col justify-between h-full">

                                        <div className="rounded-md overflow-hidden w-full flex justify-end pr-2">
                                            <img
                                                src={coders}
                                                alt="Programadores"
                                                className="w-auto h-[136px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500 "
                                            />
                                        </div>
                                        <div className="rounded-md overflow-hidden">
                                            <img
                                                src={participants}
                                                alt="Participantes"
                                                className="w-auto h-[172px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="rounded-md bg-background-inverse p-4 flex flex-col gap-4">

                                        <Typography
                                            variant={'headline-small'}
                                            className="font-bold"
                                            style={{
                                                background: 'linear-gradient(90deg, #7513FF 0%, #4348F3 50%, #0093CE 100%)',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text',
                                                color: 'transparent',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            DATA-DRIVEN LAB
                                        </Typography>
                                        <Typography variant={'title-body'} className="text-text-on-white-primary">
                                            A space created to share, analyze, and <br />propose technological strategies in industrial <br />data science.
                                        </Typography>
                                        <Typography variant={'body-default'} className="text-text-on-white-primary">
                                            This symposium, organized by RTS Group, is part of<br /> a series of events taking place with the framework <br />of the Data-Driven LAB.
                                        </Typography>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="flex flex-col justify-between h-full">

                                        <div className="rounded-md overflow-hidden">
                                            <img
                                                src={exposition1}
                                                alt="Exposicion 1"
                                                className="w-auto h-[230px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500 "
                                            />
                                        </div>
                                        <div className="rounded-md overflow-hidden">

                                        </div>
                                    </div>

                                </div>

                                <div className="flex-shrink-0">
                                    <div className="flex flex-col justify-between h-full mr-9">

                                        <div className="rounded-md overflow-hidden w-full flex justify-end ">

                                        </div>
                                        <div className="rounded-md overflow-hidden">
                                            <img
                                                src={exposition2}
                                                alt="Exposicion 2"
                                                className="w-auto h-[161px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                            </motion.div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}