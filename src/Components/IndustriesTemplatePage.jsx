// src/Components/IndustriesTemplatePage.jsx
import { Button, Typography, LazyLogo, ProjectSection } from "./index.js";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CircleCheck, MapPin } from "lucide-react";
import Banner from "./Banner/Banner.jsx";
import bannerImg from "../assets/Banners/moon_20.png";
import { cn } from "../lib/utils.js";
import { SlideInAnimation } from "../animations/index.js";
import { AnimatePresence } from "framer-motion";
export function IndustriesTemplatePage({ content }) {
    const whiteBlockRef = useRef(null);
    const { setTheme } = useTheme();
    const [selectedProject, setSelectedProject] = useState(0); // Selecciona el primer proyecto por defecto
    const [heroImage, setHeroImage] = useState(null);
    const [logos, setLogos] = useState({});

    // Cargar imagen del hero
    useEffect(() => {
        content?.hero.img().then(module => setHeroImage(module.default));
    }, [content?.hero.img]);


    // Cargar todos los logos de clientes
    useEffect(() => {
        const loadLogos = async () => {
            if (!content?.clientsSection?.clientsLogos) return;

            const logoPromises = Object.entries(content?.clientsSection.clientsLogos).map(
                async ([key, importFn]) => {
                    try {
                        const module = await importFn();
                        return { key, logo: module.default };
                    } catch (error) {
                        console.error(`Error loading logo ${key}:`, error);
                        return { key, logo: null };
                    }
                }
            );

            const loadedLogos = await Promise.all(logoPromises);
            const logosMap = {};
            loadedLogos.forEach(({ key, logo }) => {
                logosMap[key] = logo;
            });
            setLogos(logosMap);
        };

        loadLogos();
    }, [content?.clientsSection?.clientsLogos]);

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
            // console.log('🧹 Limpiando observer');
            observer.disconnect();
        };
    }, [setTheme]);

    const arrayClientsLogos = Object.entries(logos).map(([key, logo]) => ({ key, logo }));
    //console.log({ arrayClientsLogos }, arrayClientsLogos.length % 2 === 0 && !arrayClientsLogos.length <= 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3');
    return (
        <section id="industry">

            <section id="hero-industries"
                className="relative w-full h-[450px] rounded-none "
               
            >
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={heroImage}
                        alt="Imagen de header de la industria"
                        fetchpriority="high"     // Le dice al browser: esto es crítico, cargalo primero
                        decoding="async"
                        className="w-full h-full object-cover object-center"
                     
                    />
                </div>
                {/* Overlay opcional si el texto no se ve bien */}
                <div className="absolute inset-0 bg-black/0"></div>
                <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                    <div className="pt-9 flex  gap-6 md:gap-4 h-full items-center">
                        <SlideInAnimation y={50} delay={1} > <Typography
                            variant="headline-large"
                            className="md:text-display-lg"
                            children={content?.hero.title}
                        />
                        </SlideInAnimation>
                    </div>
                </div>
            </section>

            <section id="industry-clients">
                <div className="flex flex-col md:flex-row gap-7 md:gap-9 py-9 px-3 md:px-7 bg-background text-color text-secondary">

                    <div className="w-full md:w-2/5 flex flex-col md:gap-7 gap-5  ">
                        <SlideInAnimation y={50} delay={1.2} > <Typography variant="title-body">
                            {content?.clientsSection?.title}
                        </Typography>
                        </SlideInAnimation>
                        <SlideInAnimation y={50} delay={0.5} ><Button variant="filled-dark" onClick={() => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank")}>Book a meeting now</Button>
                        </SlideInAnimation>
                    </div>

                    <div className="w-full md:w-3/5 flex flex-col gap-7 md:gap-6.5 ">
                        <SlideInAnimation y={50} delay={1.3} ><Typography variant={'body-md'}>
                            {content?.clientsSection?.info}
                        </Typography>
                        </SlideInAnimation>
                        <div className="flex flex-col gap-3">
                            <SlideInAnimation y={50} delay={0.7} className="text-center" ><Typography variant={'subtitle-lg'} className={'text-center'}>
                                OUR CLIENTS
                            </Typography>
                            </SlideInAnimation>
                            {/* Opción A: Grid con logos cargados dinámicamente */}
                            <div className={cn(
                                "flex flex-wrap gap-4 justify-center",
                                arrayClientsLogos.length % 2 === 0 && arrayClientsLogos.length <= 4
                                    ? '[&>*]:w-full md:[&>*]:w-[calc(45%-0.5rem)] '
                                    : '[&>*]:w-[calc(45%-0.5rem)] lg:[&>*]:w-[calc(30%-0.667rem)]'
                            )}>
                                {Object.entries(content?.clientsSection.clientsLogos || {}).map(([logoKey, importFn]) => (
                                    <SlideInAnimation y={50} delay={0.7} ><LazyLogo
                                        key={logoKey}
                                        logoImport={importFn}
                                        alt={`${logoKey.replace('Logo', '')} logo`}
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

            <section ref={whiteBlockRef}>

                <section id='industry-project' className="relative overflow-hidden bg-background text-color">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                        {/* Primer gradiente principal */}
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
                                // Suavizar transiciones
                                mixBlendMode: 'screen',
                            }}
                        />

                        {/* Primer gradiente principal */}
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
                                // Suavizar transiciones
                                mixBlendMode: 'screen',
                            }}
                        />


                    </div>
                    <div className="relative z-10 flex flex-col gap-6 py-9 px-3 md:px-7">
                        <div className="flex flex-col gap-4">
                            <SlideInAnimation y={50} delay={0} ><Typography variant="headline-medium" className="md:text-display-sm">
                                {content?.projectSection?.length > 1 ? 'Recent projects' : 'Recent project'}
                            </Typography>
                            </SlideInAnimation>

                            {content?.projectSection?.length > 1 && (
                                <div className="flex flex-col md:flex-row gap-3">
                                    {content?.projectSection?.map((project, index) => (
                                        <Button key={'project-btn-' + index} variant="carousel-project" onClick={() => setSelectedProject(index)} selected={selectedProject === index} className="w-full md:max-w-[200px]">
                                            Project {index + 1}
                                        </Button>
                                    ))}
                                </div>
                            )
                            }

                        </div>
                        {/* SECCION DE PROYECTOS */}
                        {
                            content?.projectSection?.length > 1 ?
                                (<div className="flex flex-col">
                                    <AnimatePresence initial={false} mode="wait"> <ProjectSection key={'project-' + selectedProject} projectSection={content.projectSection[selectedProject]} />
                                    </AnimatePresence>
                                </div>) :
                                (content?.projectSection?.map((project, index) => (
                                    <ProjectSection key={'project-' + index} projectSection={project} />
                                )))
                        }



                    </div>

                </section>
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
                    { children: "Book a meeting now", variant: "filled-dark", onClick: () => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank") },
                ]}
            />
        </section>
    )
}