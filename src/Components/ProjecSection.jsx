import { useState, useEffect } from "react";
import { Typography } from "./Typography";
import { MapPin, CircleCheck } from "lucide-react";
import { SlideInAnimation } from "../animations/index";
import { motion, AnimatePresence } from "framer-motion";
export function ProjectSection({ projectSection, key }) {
    const [projectImage, setProjectImage] = useState(null);
    const [projectClientLogo, setProjectClientLogo] = useState(null);

    // Cargar imagen del proyecto
    useEffect(() => {
        projectSection?.img().then(module => setProjectImage(module.default));
    }, [projectSection?.img]);

    // Cargar logo del proyecto
    useEffect(() => {
        if (projectSection?.companyLogo) {
            projectSection?.companyLogo().then(module => setProjectClientLogo(module.default));
        } else {
            setProjectClientLogo(null);
        }
    }, [projectSection?.companyLogo]);
    return (
        <motion.div key={key} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{opacity:0, duration: 0.2, x: -60}}
                            transition={{ duration: 0.5 }} className="relative flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-md flex justify-center w-full">
                {/* Imagen principal */}
                <img
                    src={projectImage}
                    alt="Project Image"
                    className="w-full  h-[400px] rounded-md  object-cover"
                />

                {/* Overlay con gradiente */}
                <div
                    className="absolute inset-0 rounded-md"
                    style={{
                        background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 81.81%), rgba(0, 0, 0, 0)`,
                        opacity: '0.5', transition: 'opacity 0.3s ease',
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 md:right-auto md:bottom-4 md:left-4 p-4 md:p-0">
                    <div className="flex justify-center md:justify-start w-full">
                        {/* Logo con efecto glass que funciona */}
                        {projectClientLogo && <div className="relative w-full">
                                {/* Fondo glass que SÍ funciona */}
                                <div className="
                                            h-[135px]
                                                         bg-white/20 
                                                            backdrop-blur-sm
                                                            rounded-xs
                                                            p-5
                                                            shadow-lg
                                                            flex justify-center
                                                            
                                                        ">
                                    {projectClientLogo ? (
                                        <img
                                            src={projectClientLogo}
                                            alt={`${projectSection?.location} logo`}
                                            className=" 0 w-auto object-contain max-w-[120px] md:max-w-[150px]"
                                        />

                                    ) : (
                                        <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-400/30 rounded animate-pulse"></div>
                                    )}
                                </div>
                        </div>}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-text-on-white-secondary">

                <div className="flex flex-col gap-3 w-full md:w-2/5">
                    <SlideInAnimation y={50} delay={0} >
                        <Typography variant="title-body" className="md:text-text-on-white-primary flex flex-row gap-2">
                            <MapPin /> {projectSection?.location}
                        </Typography>
                    </SlideInAnimation>
                    <SlideInAnimation y={50} delay={0.2} > <Typography variant="headline-small" >
                        {projectSection?.sumary}
                    </Typography>
                    </SlideInAnimation>
                </div>

                <div className="flex flex-col gap-6 w-full md:w-3/5">
                    <SlideInAnimation y={50} delay={0.3} > <Typography variant="body-lg">
                        {projectSection?.info}
                    </Typography>
                    </SlideInAnimation>
                    {projectSection?.technicalItems?.length > 0 && (
                        <div className="flex flex-col md:flex-row gap-6">
                            <Typography variant="title-body">
                                Key Technical
                                Contributions
                            </Typography>
                            <div className="flex flex-col gap-2">
                                {projectSection?.technicalItems?.map((item, index) => (
                                    <SlideInAnimation key={index + 'item-info-industries'} y={50} delay={index * 0.1} >
                                        <div className="flex flex-row gap-2 items-center">
                                            <CircleCheck className="text-core-violet h-icon-sm w-icon-sm flex-shrink-0" />
                                            <Typography variant="body-sm">{item}</Typography>
                                        </div>
                                    </SlideInAnimation>
                                ))}

                            </div>
                        </div>)}
                </div>
            </div>
        </motion.div>
    )
}