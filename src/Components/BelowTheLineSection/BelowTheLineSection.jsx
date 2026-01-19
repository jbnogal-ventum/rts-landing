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
gsap.registerPlugin(ScrollTrigger);
export default function BelowTheLineSection() {
    const horizontalContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isSectionActive, setIsSectionActive] = useState(false);

    // Actualizar flechas
    const updateArrows = () => {
        const container = horizontalContainerRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < maxScroll - 10);
    };

    // Scrollear con botones
    const scrollHorizontal = (direction) => {
        const container = horizontalContainerRef.current;
        if (!container) return;

        const scrollAmount = 400;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    // Efecto para detectar cuando la sección está activa (en viewport)
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsSectionActive(entry.isIntersecting);
                });
            },
            {
                threshold: 0.5,
                rootMargin: '-100px 0px'
            }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    // Efecto para manejar scroll con rueda - MEJORADO PARA SUAVIDAD
    useEffect(() => {
        const container = horizontalContainerRef.current;
        if (!container) return;

        let isHorizontalMode = false;
        let wheelTimeout;
        let scrollAnimationId = null;
        let targetScrollLeft = container.scrollLeft;
        const SCROLL_THROTTLE = 8; // REDUCIDO para más respuesta (era 16)
        const SCROLL_SMOOTHNESS = 0.3; // Factor de suavizado (0.1 = muy suave, 0.5 = más rápido)

        // Función para animación suave
        const smoothScroll = () => {
            if (!container) return;

            const currentScroll = container.scrollLeft;
            const diff = targetScrollLeft - currentScroll;

            // Si la diferencia es muy pequeña, detener la animación
            if (Math.abs(diff) < 0.5) {
                container.scrollLeft = targetScrollLeft;
                scrollAnimationId = null;
                return;
            }

            // Interpolación exponencial para suavidad
            container.scrollLeft = currentScroll + diff * SCROLL_SMOOTHNESS;
            scrollAnimationId = requestAnimationFrame(smoothScroll);
        };

        const startSmoothScroll = () => {
            if (scrollAnimationId) {
                cancelAnimationFrame(scrollAnimationId);
            }
            scrollAnimationId = requestAnimationFrame(smoothScroll);
        };

        const handleWheel = (e) => {
            if (!isSectionActive) return;

            // Throttle más permisivo
            const now = Date.now();
            if (now - lastScrollTime < SCROLL_THROTTLE) {
                e.preventDefault();
                return;
            }
            lastScrollTime = now;

            const canScrollLeft = container.scrollLeft > 0;
            const canScrollRight =
                container.scrollLeft < container.scrollWidth - container.clientWidth - 1;

            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            const shouldScrollHorizontal =
                (isScrollingDown && canScrollRight) ||
                (isScrollingUp && canScrollLeft);

            if (shouldScrollHorizontal || isHorizontalMode) {
                e.preventDefault();
                e.stopPropagation();

                // Ajustar velocidad del scroll
                const scrollDelta = e.deltaY * 1; // REDUCIDO para más control (era *2)
                targetScrollLeft = container.scrollLeft + scrollDelta;

                // Limitar el scroll a los límites
                targetScrollLeft = Math.max(0, Math.min(
                    targetScrollLeft,
                    container.scrollWidth - container.clientWidth
                ));

                // Iniciar animación suave
                startSmoothScroll();

                // Actualizar flechas sin throttling extra
                updateArrows();

                isHorizontalMode = true;

                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    isHorizontalMode = false;
                }, 300); // Aumentado para mantener modo más tiempo

                return false;
            }

            if ((isScrollingDown && !canScrollRight) || (isScrollingUp && !canScrollLeft)) {
                isHorizontalMode = false;
                clearTimeout(wheelTimeout);
            }
        };

        let lastScrollTime = 0;

        // También prevenir el scroll vertical cuando el mouse está sobre el contenedor
        const handleGlobalWheel = (e) => {
            if (!isSectionActive) return;

            // Si estamos sobre el contenedor y en modo horizontal, prevenir scroll vertical
            if (isHorizontalMode) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        };

        // Agregar listeners
        container.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('wheel', handleGlobalWheel, { passive: false });
        container.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows);

        // Inicializar
        updateArrows();

        return () => {
            container.removeEventListener('wheel', handleWheel);
            document.removeEventListener('wheel', handleGlobalWheel);
            container.removeEventListener('scroll', updateArrows);
            window.removeEventListener('resize', updateArrows);
            clearTimeout(wheelTimeout);
            if (scrollAnimationId) {
                cancelAnimationFrame(scrollAnimationId);
            }
        };
    }, [isSectionActive]);

    useEffect(() => {
        if (isSectionActive) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }, [isSectionActive]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen py-20"
            style={{ scrollMarginTop: '100px' }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <Typography variant="subtitle-large">- 01</Typography>
                        <Typography variant="display-sm">BELOW THE LINE</Typography>
                    </div>

                    <div className="relative">
                        {isSectionActive && (
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                                         bg-blue-600 text-white text-xs font-medium px-3 py-1 
                                         rounded-full z-30 animate-pulse">
                                ↕ Scroll horizontal activo
                            </div>
                        )}

                        {showLeftArrow && (
                            <button
                                onClick={() => scrollHorizontal('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                                         bg-black/80 text-white p-3 rounded-r-lg 
                                         opacity-0 group-hover:opacity-100 transition-opacity
                                         hover:scale-110 transform duration-200"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {showRightArrow && (
                            <button
                                onClick={() => scrollHorizontal('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                                         bg-black/80 text-white p-3 rounded-l-lg 
                                         opacity-0 group-hover:opacity-100 transition-opacity
                                         hover:scale-110 transform duration-200"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        <div
                            ref={horizontalContainerRef}
                            className="flex gap-6 overflow-x-auto overflow-y-hidden 
                                    scrollbar-hide scroll-smooth will-change-transform"
                            style={{
                                WebkitOverflowScrolling: 'touch',
                                scrollBehavior: 'auto'
                            }}
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

                            <div className="flex-shrink-0">
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
                                        src={entryCards}
                                        alt="Entry Cards"
                                        className="w-[192px] h-[192px] rounded-md transform hover:scale-105 
                                                 transition-transform duration-500"
                                    />
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
                                <div className="flex flex-col justify-between h-full pr-6">

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

                        </div>


                    </div>
                </div>
            </div>

            <style jsx global>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
                
                @keyframes smoothScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(var(--scroll-amount)); }
                }
                
                .will-change-transform {
                    will-change: transform;
                }
            `}</style>
        </section>
    );
}