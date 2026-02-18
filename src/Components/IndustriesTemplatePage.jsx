// src/Components/IndustriesTemplatePage.jsx
import { Button, Typography, LazyLogo } from "./index.js";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CircleCheck, MapPin } from "lucide-react";
import Banner from "./Banner/Banner.jsx";
import bannerImg from "../assets/Banners/moon_20.png";
import { cn } from "../lib/utils.js";
import { SlideInAnimation } from "../animations/index.js";
export function IndustriesTemplatePage({ content }) {
    const whiteBlockRef = useRef(null);
    const { setTheme } = useTheme();

    const [heroImage, setHeroImage] = useState(null);
    const [logos, setLogos] = useState({});
    const [projectImage, setProjectImage] = useState(null);
    const [projectClientLogo, setProjectClientLogo] = useState(null);

    // Cargar imagen del hero
    useEffect(() => {
        content?.hero.img().then(module => setHeroImage(module.default));
    }, [content?.hero.img]);

    // Cargar imagen del proyecto
    useEffect(() => {
        content?.projectSection?.img().then(module => setProjectImage(module.default));
    }, [content?.projectSection?.img]);

    // Cargar logo del proyecto
    useEffect(() => {
        content?.projectSection?.companyLogo().then(module => setProjectClientLogo(module.default));
    }, [content?.projectSection?.companyLogo]);

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
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover', // Cambiado a 'contain'
                    backgroundPosition: 'center center', // Centrado vertical y horizontal
                    backgroundRepeat: 'no-repeat',
                    //backgroundColor: '#f5f5f5' // Agregado para rellenar espacio vacío
                }}
            >
                {/* Overlay opcional si el texto no se ve bien */}
                <div className="absolute inset-0 bg-black/0"></div>
                <div className="relative z-10 w-full h-full md:px-7 py-9 px-3">
                    <div className="pt-9 flex  gap-6 md:gap-4 h-full items-center">
                        <SlideInAnimation y={50} delay={0.2} > <Typography
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
                        <SlideInAnimation y={50} delay={0.4} > <Typography variant="title-body">
                            {content?.clientsSection?.title}
                        </Typography>
                        </SlideInAnimation>
                        <SlideInAnimation y={50} delay={0.5} ><Button variant="filled-dark">Book a meeting now</Button>
                        </SlideInAnimation>
                    </div>

                    <div className="w-full md:w-3/5 flex flex-col gap-7 md:gap-6.5 ">
                        <SlideInAnimation y={50} delay={0.6} ><Typography variant={'body-md'}>
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

                        {/* Segundo gradiente para suavizar bordes */}
                        {/* <div
                            className="absolute"
                            style={{
                                background: 'radial-gradient(145.3% 70.02% at 45.94% 35.79%, rgba(255, 168, 0, 1) 24.04%, rgba(255, 0, 0, 1) 60.58%, rgba(255, 71, 214, 1) 100%)',
                                filter: 'blur(400px)',
                                opacity: '0.4',
                                width: '80vw',
                                height: '130vh',
                                top: '-15%',
                                left: '10%', // Posicionado más a la derecha
                                transform: 'rotate(15deg)', // Rotación opcional
                                mixBlendMode: 'screen', // Mezcla con el primer gradiente
                            }}
                        /> */}

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
                        <SlideInAnimation y={50} delay={0} ><Typography variant="headline-medium" className="md:text-display-sm">
                            Recent project
                        </Typography>
                        </SlideInAnimation>
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
                                        <div className="relative w-full">
                                    <SlideInAnimation y={50} delay={0} >
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
                                                        alt={`${content?.projectSection?.location} logo`}
                                                        className=" 0 w-auto object-contain max-w-[120px] md:max-w-[150px]"
                                                    />

                                                ) : (
                                                    <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-400/30 rounded animate-pulse"></div>
                                                )}
                                            </div>
                                    </SlideInAnimation>
                                        </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-text-on-white-secondary">

                            <div className="flex flex-col gap-3 w-full md:w-2/5">
                                <SlideInAnimation y={50} delay={0} >
                                    <Typography variant="title-body" className="md:text-text-on-white-primary flex flex-row gap-2">
                                        <MapPin /> {content?.projectSection?.location}
                                    </Typography>
                                </SlideInAnimation>
                                <SlideInAnimation y={50} delay={0.2} > <Typography variant="headline-small" >
                                    {content?.projectSection?.sumary}
                                </Typography>
                                </SlideInAnimation>
                            </div>

                            <div className="flex flex-col gap-6 w-full md:w-3/5">
                                <SlideInAnimation y={50} delay={0.3} > <Typography variant="body-lg">
                                    {content?.projectSection?.info}
                                </Typography>
                                </SlideInAnimation>
                                {content?.projectSection?.technicalItems?.length > 0 && (
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <Typography variant="title-body">
                                            Key Technical
                                            Contributions
                                        </Typography>
                                        <div className="flex flex-col gap-2">
                                            {content?.projectSection?.technicalItems?.map((item, index) => (
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
                    { children: "Book a meeting now", variant: "filled-dark" },
                ]}
            />
        </section>
    )
}