// src/Components/IndustriesTemplatePage.jsx
import { Button, Typography, LazyLogo, ProjectSection } from "./index.js";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CircleCheck, MapPin } from "lucide-react";
import Banner from "./Banner/Banner.jsx";
import bannerImg from "../assets/Banners/moon_20.png";
import { cn } from "../lib/utils.js";
import { SlideInAnimation } from "../animations/index.js";
import { AnimatePresence, motion } from "framer-motion";

export function IndustriesTemplatePage({ content }) {
    const whiteBlockRef = useRef(null);
    const { setTheme } = useTheme();
    const [selectedProject, setSelectedProject] = useState(0);

    // 🟢 1. UN SOLO ESTADO para todas las imágenes
    const [images, setImages] = useState({
        hero: null,
        logos: {},
        projects: {} // Nuevo: almacenar imágenes de proyectos
    });

     // 🟢 2. Cargar TODAS las imágenes (incluyendo proyectos)
    useEffect(() => {
        const loadAllImages = async () => {
            const newImages = {
                hero: null,
                logos: {},
                projects: {}
            };

            // Cargar hero image
            if (content?.hero?.img) {
                try {
                    const heroModule = await content.hero.img();
                    newImages.hero = heroModule.default;
                } catch (error) {
                    console.error("Error loading hero image:", error);
                }
            }

            // Cargar logos en paralelo
            if (content?.clientsSection?.clientsLogos) {
                const logoEntries = Object.entries(content.clientsSection.clientsLogos);
                const logoPromises = logoEntries.map(async ([key, importFn]) => {
                    try {
                        const module = await importFn();
                        return { key, logo: module.default };
                    } catch (error) {
                        console.error(`Error loading logo ${key}:`, error);
                        return { key, logo: null };
                    }
                });

                const loadedLogos = await Promise.all(logoPromises);
                loadedLogos.forEach(({ key, logo }) => {
                    newImages.logos[key] = logo;
                });
            }

            // 🟢 NUEVO: Cargar imágenes de TODOS los proyectos
            if (content?.projectSection?.length > 0) {
                const projectPromises = content.projectSection.map(async (project, index) => {
                    const projectData = {};
                    
                    // Cargar imagen del proyecto
                    if (project?.img) {
                        try {
                            const imgModule = await project.img();
                            projectData.img = imgModule.default;
                        } catch (error) {
                            console.error(`Error loading project ${index} image:`, error);
                        }
                    }
                    
                    // Cargar logo de la empresa del proyecto
                    if (project?.companyLogo) {
                        try {
                            const logoModule = await project.companyLogo();
                            projectData.companyLogo = logoModule.default;
                        } catch (error) {
                            console.error(`Error loading project ${index} logo:`, error);
                        }
                    }
                    
                    return { index, ...projectData };
                });

                const loadedProjects = await Promise.all(projectPromises);
                loadedProjects.forEach(({ index, img, companyLogo }) => {
                    newImages.projects[index] = { img, companyLogo };
                });
            }

            setImages(newImages);
        };

        loadAllImages();
    }, [content]); // Dependencia en content completo
    // 🟢 3. Memoizar el array de logos para evitar recreaciones
    const arrayClientsLogos = useMemo(() => {
        return Object.entries(images.logos).map(([key, logo]) => ({ key, logo }));
    }, [images.logos]);

    // 🟢 4. Memoizar la función de cambio de proyecto
    const handleProjectChange = useCallback((index) => {
        setSelectedProject(index);
    }, []);

    // Observer para el tema (optimizado)
    useEffect(() => {
        if (!whiteBlockRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTheme("light");
                        window.dispatchEvent(new Event("navLight"));
                    } else {
                        setTheme("dark");
                        window.dispatchEvent(new Event("navDark"));
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(whiteBlockRef.current);
        return () => observer.disconnect();
    }, [setTheme]);

    // 🟢 5. Componentes memoizados para secciones estáticas
    const HeroSection = useMemo(() => (
        <section id="hero-industries" className="relative w-full h-[450px] rounded-none">
            <div className="absolute inset-0 w-full h-full">
                {images.hero && (
                    <img
                        src={images.hero}
                        alt="Imagen de header de la industria"
                        fetchpriority="high"
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                        loading="eager"
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-black/0"></div>
            <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                <div className="pt-9 flex gap-6 md:gap-4 h-full items-center">
                    <SlideInAnimation y={50} delay={1}>
                        <Typography
                            variant="headline-large"
                            className="md:text-display-lg"
                            children={content?.hero?.title}
                        />
                    </SlideInAnimation>
                </div>
            </div>
              {/* Scroll indicator - bottom center */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <svg width="26" height="44" viewBox="0 0 20 44" fill="none" className="overflow-visible">
                    <motion.rect
                        x="1"
                        y="1"
                        width="24"
                        height="42"
                        rx="12"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 1.2, delay: 0.5,
                            ease: "easeInOut",
                        }}
                    />
                </svg>
                {/* Puntito animado posicionado encima del SVG */}
                <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ y: [0, 12, 0], opacity: [1, 0, 0] }}
                    transition={{
                        duration: 1.9,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2, // arranca cuando termina de dibujarse el óvalo
                    }}
                />
            </div>
        </section>
    ), [images.hero, content?.hero?.title]);

    // 🟢 6. Clientes section memoizada
    const ClientsSection = useMemo(() => (
        <section id="industry-clients">
            <div className="flex flex-col md:flex-row gap-7 md:gap-9 py-9 px-3 md:px-7 bg-background text-color text-secondary">
                <div className="w-full md:w-2/5 flex flex-col md:gap-7 gap-5">
                    <SlideInAnimation y={50} delay={1.2}>
                        <Typography variant="title-body">
                            {content?.clientsSection?.title}
                        </Typography>
                    </SlideInAnimation>
                    <SlideInAnimation y={50} delay={0.5}>
                        <Button
                            variant="filled-dark"
                            onClick={() => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank")}
                        >
                            Book a meeting now
                        </Button>
                    </SlideInAnimation>
                </div>

                <div className="w-full md:w-3/5 flex flex-col gap-7 md:gap-6.5">
                    <SlideInAnimation y={50} delay={1.3}>
                        <Typography variant={'body-md'}>
                            {content?.clientsSection?.info}
                        </Typography>
                    </SlideInAnimation>

                    <div className="flex flex-col gap-3">
                        <SlideInAnimation y={50} delay={0.7} className="text-center">
                            <Typography variant={'subtitle-lg'} className={'text-center'}>
                                OUR CLIENTS
                            </Typography>
                        </SlideInAnimation>

                        <div className={cn(
                            "flex flex-wrap gap-4 justify-center",
                            arrayClientsLogos.length % 2 === 0 && arrayClientsLogos.length <= 4
                                ? '[&>*]:w-full md:[&>*]:w-[calc(45%-0.5rem)]'
                                : '[&>*]:w-[calc(45%-0.5rem)] lg:[&>*]:w-[calc(30%-0.667rem)]'
                        )}>
                            {arrayClientsLogos.map(({ key, logo }) => (
                                <SlideInAnimation key={key} y={50} delay={0.7}>
                                    <LazyLogo
                                        logoImport={async () => ({ default: logo })}
                                        alt={`${key.replace('Logo', '')} logo`}
                                        size="small"
                                        className={cn(
                                            "h-[150px] md:py-2 hover:shadow-md",
                                            arrayClientsLogos.length > 6 ? 'md:h-[84px]' : ''
                                        )}
                                    />
                                </SlideInAnimation>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ), [content?.clientsSection, arrayClientsLogos]);

    // 🟢 7. Project section memoizada
    const ProjectSectionComponent = useMemo(() => (
        <section id='industry-project' className="relative overflow-hidden bg-background text-color">
            {/* Gradientes (estáticos, no necesitan re-render) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div
                    className="absolute hidden md:block"
                    style={{
                        background: 'radial-gradient(145.3% 70.02% at 45.94% 35.79%, rgba(255, 168, 0, 1) 24.04%, rgba(255, 0, 0, 1) 60.58%, rgba(255, 71, 214, 1) 100%)',
                        transform: 'rotate(-112deg)',
                        width: '50vw',
                        height: '50vh',
                        top: '-20%',
                        left: '30%',
                        filter: 'blur(400px)',
                        mixBlendMode: 'screen',
                    }}
                />
                <div
                    className="absolute md:hidden"
                    style={{
                        background: 'radial-gradient(111.63% 111.63% at 42.64% -5.82%, rgba(255, 168, 0, 1) 33.65%, rgba(255, 0, 0, 1) 44.58%, transparent 100%)',
                        transform: 'rotate(-112deg)',
                        width: '150vw',
                        height: '120vh',
                        top: '-60%',
                        right: '-100%',
                        filter: 'blur(400px)',
                        mixBlendMode: 'screen',
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col gap-6 py-9 px-3 md:px-7">
                <div className="flex flex-col gap-4">
                    <SlideInAnimation y={50} delay={0}>
                        <Typography variant="headline-medium" className="md:text-display-sm">
                            {content?.projectSection?.length > 1 ? 'Recent projects' : 'Recent project'}
                        </Typography>
                    </SlideInAnimation>

                    {content?.projectSection?.length > 1 && (
                        <div className="flex flex-col md:flex-row gap-3">
                            {content?.projectSection?.map((project, index) => (
                                <Button
                                    key={'project-btn-' + index}
                                    variant="carousel-project"
                                    onClick={() => handleProjectChange(index)}
                                    selected={selectedProject === index}
                                    className="w-full md:w-fit min-w-[200px]"
                                >
                                    {project.label || project.location}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                 {content?.projectSection?.length > 1 ? (
                    <div className="flex flex-col">
                        <AnimatePresence initial={false} mode="wait">
                            {/* Pasamos las imágenes precargadas al ProjectSection */}
                            <ProjectSection 
                                key={'project-' + selectedProject} 
                                projectSection={content.projectSection[selectedProject]}
                                preloadedImages={images.projects[selectedProject]} // 🟢 Pasar imágenes precargadas
                            />
                        </AnimatePresence>
                    </div>
                ) : (
                    content?.projectSection?.map((project, index) => (
                        <ProjectSection 
                            key={'project-' + index} 
                            projectSection={project}
                            preloadedImages={images.projects[index]} // 🟢 Pasar imágenes precargadas
                        />
                    ))
                )}
            </div>
        </section>
    ), [content?.projectSection, selectedProject, handleProjectChange]);

    return (
        <section id="industry">
            {HeroSection}
            {ClientsSection}
            <section ref={whiteBlockRef}>
                {ProjectSectionComponent}
            </section>
            <Banner
                backgroundImage={bannerImg}
                overlay={50}
                variantMobile="headline-small"
                variantDesktop="headline-medium"
                titleDesktop={"WOULD YOU LIKE TO KNOW \nMORE ABOUT OUR EXPERIENCE?"}
                titleMobile={"WOULD YOU LIKE TO KNOW MORE ABOUT OUR EXPERIENCE?"}
                backgroundPosition="center"
                buttons={[
                    {
                        children: "Book a meeting now",
                        variant: "filled-dark",
                        onClick: () => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank")
                    },
                ]}
            />
        </section>
    );
}