import { useState, useRef, useEffect } from "react";
import mapImg from "../../assets/map.png";
import { Typography, Button } from "../index";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useTheme } from "../../contexts/ThemeContext";
const markerData = [
  {
    name: "BUENOS AIRES",
    positions: `top-[62%] left-[60%] sm:left-[35%] md:left-[50%] lg:left-[35%]`,
    tooltipPosition: "left" // Especial: tooltip a la izquierda en móvil
  },
  {
    name: "HUSTON",
    positions: `top-[35%] left-[40%] sm:left-[22%] md:left-[32%] lg:left-[22%]`,
    tooltipPosition: "top"
  },
  {
    name: "BAHÍA BLANCA",
    positions: `top-[68%] sm:left-[30%] left-[55%] md:left-[45%] lg:left-[32%]`,
    tooltipPosition: "left" // Especial: tooltip a la izquierda en móvil
  },
  {
    name: "TAMPICO",
    positions: `top-[42%] left-[35%] sm:left-[20%] md:left-[30%] lg:left-[20%]`,
    tooltipPosition: "top"
  },
  {
    name: "MADRID",
    positions: `top-[26%] left-[84%] sm:left-[50%] md:left-[70%] lg:left-[50%]`,
    tooltipPosition: "top"
  },
  {
    name: "SANTIAGO DE CHILE",
    positions: `top-[64%] left-[49%] sm:left-[29%] md:left-[40%] lg:left-[29%]`,
    tooltipPosition: "top"
  },
];

export default function Location() {
  const whiteBlockRef = useRef(null);
  const markersRef = useRef([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { setTheme } = useTheme();

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
            //window.dispatchEvent(new Event("navLight"));
          } else {
            // Si está yendo para abajo, cambia a dark
            if (entry.boundingClientRect.y > 0) return;
            //console.log('❌ FUERA DE VISTA - Cambiando a dark');
            setTheme("dark");
            //window.dispatchEvent(new Event("navDark"));
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
      //console.log('🧹 Limpiando observer');
      observer.disconnect();
    };
  }, [setTheme]);
  return (
    <section className="presence-section bg-background-inverse" id="location" ref={whiteBlockRef}>
      <div className="py-9 flex flex-col md:flex-row gap-3 md:gap-0 pt-0 sm:pt-9">
        <div className="w-full md:w-2/5 pt-4 flex flex-col gap-3 md:gap-4 text-text-on-white-primary pl-3 md:pl-7">
          <Typography variant="subtitle-md">LOCATION</Typography>
          <Typography variant="headline-small" className="text-headline-medium">
            GLOBAL PRESENCE
          </Typography>
          <Typography variant="body-md" className="text-body-lg">
            From America to Europe, we deliver world-class engineering, integration, and field services. With offices and partners across key regions, we combine global experience with local insight to support every stage of your industrial automation journey
          </Typography>
          <Button>Book a meeting now</Button>
        </div>

        <div className="w-full md:w-3/5 relative overflow-hidden">
          <div className="relative h-full w-full">
            <div className="relative h-[459px] md:h-[500px] lg:h-[600px] w-auto min-w-[100vw] md:min-w-[120vw]">
              <img
                src={mapImg}
                alt="Global map"
                className="h-full w-auto max-w-none"
              />
            </div>

            {markerData.map((item, i) => (
              <div
                key={i}
                ref={(el) => (markersRef.current[i] = el)}
                className={`rounded-full w-[29px] h-[29px] bg-background-inverse absolute ${item.positions} flex items-center justify-center`}
                onMouseEnter={() => setHoveredMarker(i)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                <div className="rounded-full w-[23px] h-[23px] bg-background-interactive flex items-center justify-center">
                  <div className="rounded-full w-[5px] h-[5px] bg-background-inverse" />
                </div>

                {/* TOOLTIP */}
                <div
                  className={`
    absolute z-10 w-fit rounded-xs bg-background-inverse py-0.5 px-2
    transition-all duration-600 whitespace-nowrap ease-in-out
    ${
                    // En móvil (768px o menos)
                    isMobile
                      ? // Si es tooltip izquierdo (Buenos Aires o Bahía Blanca)
                      item.tooltipPosition === "left"
                        ? 'left-full top-1/2 -translate-y-1/2 mr-1' // A la izquierda del dot
                        : 'bottom-full left-1/2 -translate-x-1/2 mb-1' // Arriba del dot (default)
                      : // En desktop (768px o más)
                      'bottom-full left-1/2 -translate-x-1/2 mb-1' // Siempre arriba
                    }
    ${
                    // Control de visibilidad
                    (i === hoveredMarker || isMobile)
                      ? 'opacity-100 visible'
                      : 'opacity-0 invisible'
                    }
  `}
                >
                  <Typography
                    variant="subtitle-md"
                    className="text-text-on-white-primary text-nowrap"
                  >
                    {item.name}
                  </Typography>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}