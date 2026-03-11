// src/Components/Location/Location.jsx
import { useState, useRef, useEffect } from "react";
import mapImg from "../../assets/map.png";
import { Typography, Button } from "../index";
import { useTheme } from "../../contexts/ThemeContext";

const markerData = [
  { name: "BUENOS AIRES",      x: 33.5, y: 62.0, tooltipSide: "right"  },
  { name: "HOUSTON",            x: 25.0, y: 32.0 },
  { name: "TAMPICO",           x: 19.0, y: 39.0 },
  { name: "SANTIAGO DE CHILE", x: 27.5, y: 63.5 },
  { name: "MADRID",            x: 48.0, y: 29.0 },
  { name: "BAHÍA BLANCA",      x: 31.0, y: 70.0, tooltipSide: "right"  },
];

export default function Location() {
  const whiteBlockRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [markerPositions, setMarkerPositions] = useState([]);
  const { setTheme } = useTheme();

  const calcMarkerPositions = () => {
    const container = containerRef.current;
    if (!container) return;

    // El contenedor define el alto visible
    const containerH = container.clientHeight;

    // La imagen ocupa el 100% del alto y se extiende hacia la derecha
    // manteniendo su aspect ratio natural (igual que object-fit: cover con object-position: left)
    // Necesitamos saber cuánto ancho ocupa la imagen renderizada
    const img = container.querySelector("img");
    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    // La imagen se escala para llenar el alto del contenedor
    const renderedH = containerH;
    const renderedW = (naturalW / naturalH) * renderedH;

    // Origen de la imagen: anclada arriba-izquierda (0, 0) del contenedor
    const offsetX = 0;
    const offsetY = 0;

    const positions = markerData.map((item) => ({
      left: offsetX + (item.x / 100) * renderedW,
      top:  offsetY + (item.y / 100) * renderedH,
    }));

    setMarkerPositions(positions);
  };

  useEffect(() => {
    const img = containerRef.current?.querySelector("img");
    if (!img) return;

    if (img.complete) calcMarkerPositions();
    else img.addEventListener("load", calcMarkerPositions);

    const ro = new ResizeObserver(calcMarkerPositions);
    ro.observe(containerRef.current);

    return () => {
      img.removeEventListener("load", calcMarkerPositions);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!whiteBlockRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTheme("light");
          } else {
            if (entry.boundingClientRect.y > 0) return;
            setTheme("dark");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    observer.observe(whiteBlockRef.current);
    return () => observer.disconnect();
  }, [setTheme]);

  return (
    <section className="bg-background-inverse" id="location" ref={whiteBlockRef}>
      <div className="py-9 flex flex-col md:flex-row gap-3 md:gap-0 pt-9">
        {/* Panel izquierdo */}
        <div className="w-full md:w-2/5 pt-4 flex flex-col gap-3 md:gap-4 text-text-on-white-primary pl-3 md:pl-7">
          <Typography variant="subtitle-md">LOCATION</Typography>
          <Typography variant="headline-small" className="text-headline-medium">
            GLOBAL PRESENCE
          </Typography>
          <Typography variant="body-md" className="text-body-lg">
            From America to Europe, we deliver world-class engineering, integration,
            and field services. With offices and partners across key regions, we
            combine global experience with local insight to support every stage of
            your industrial automation journey
          </Typography>
          <Button className="hidden md:block">Book a meeting now</Button>
        </div>

        {/* Panel derecho: overflow-hidden para hacer el crop */}
        <div className="w-full md:w-3/5 overflow-hidden">
          {/*
            Contenedor con altura fija — la imagen se escala al alto
            y se desborda por la derecha naturalmente
          */}
          <div
            ref={containerRef}
            className="relative h-[500px] md:h-[450px] lg:h-[550px]"
          >
            <img
              src={mapImg}
              alt="Global map"
              className="h-full w-auto max-w-none ml-[-25%] sm:ml-0"
              style={{ display: "block" }}
            />

            {markerPositions.map((pos, i) => (
              <div
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2  ml-[-25%] sm:ml-0"
                style={{ left: pos.left, top: pos.top }}
                onMouseEnter={() => setHoveredMarker(i)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Dot */}
                <div className="rounded-full w-[29px] h-[29px] bg-background-inverse flex items-center justify-center ">
                  <div className="rounded-full w-[23px] h-[23px] bg-background-interactive flex items-center justify-center">
                    <div className="rounded-full w-[5px] h-[5px] bg-background-inverse" />
                  </div>
                </div>

                {/* Tooltip */}
                <div
                  className={`
                    absolute 
                    z-10 w-fit rounded-xs bg-background-inverse py-0.5 px-2
                    transition-all duration-300 whitespace-nowrap ease-in-out
                     ${markerData[i].tooltipSide === "right"
      ? "top-1/2 -translate-y-1/2 left-1/2 ml-3 md:bottom-full md:left-1/2 md:-translate-x-1/2 md:translate-y-0 md:top-auto md:ml-0 md:mb-1"
      : "bottom-full left-1/2 -translate-x-1/2 mb-1"
    }
                    ${hoveredMarker === i ? "opacity-100 visible" : "md:opacity-0 md:invisible"}
                  `}
                >
                  <Typography
                    variant="subtitle-md"
                    className="text-text-on-white-primary text-nowrap"
                  >
                    {markerData[i].name}
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