import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgOne from "../assets/A&C1.png";
import imgTwo from "../assets/A&C.png";
import { Typography, Button } from "./index";
import { CircleCheck } from "lucide-react";
const imgAlt = "Banner image"


// Panel 1
const kicker = "AUTOMATION & CONTROLS"
const title = "FIELD SERVICES\nDEPARTMENT"
const paragraph = "Our skilled resources are equipped to provide on-site assistance for surveys, maintenance, commissioning, start-up, audits, and performance evaluations, delivering top-tier service to meet your operational needs."
const leftItems = [
  "Factory Acceptance Testing (FAT)",
  "Configuration and Commissioning",
  "Shutdown, Turnaround & Outage Support",
]
const rightItems = ["Start-up Services", "Installation Services", "Site Acceptance Testing (SAT)"]

// Panel 2
const nextKicker = "AUTOMATION & CONTROLS"
const nextTitle = "COMMERCIAL\nDEPARTMENT"
const nextParagraph = "This department regularly conducts product and service presentations tailored to various industrial processes, helping customers adapt to the latest technological advancements.\n\nBy fostering strategic agreements, we aim to maximize value for both our customers and RTS, prioritizing long-term partnerships and focusing on corporate, global, and regional collaborations."

export default function SwapContent() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animaciones para el wipe de imagen
  const clipPathProgress = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Animaciones para los textos
  const contentAOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.8],
    [1, 1, 0, 0]
  );

  const contentAY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0%", "-10%"]
  );

  const contentBOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 0.8],
    [0, 0, 1, 1]
  );

  const contentBY = useTransform(
    scrollYProgress,
    [0.4, 0.6],
    ["10%", "0%"]
  );

  // Animación para la imagen base
  const baseImageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-10%"]
  );

  const renderLists = (l, r) => {
    if (!Array.isArray(l) || !Array.isArray(r) || !l.length || !r.length) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-6.5 ">
        <ul className="space-y-2">
          {l.map((t) => (
            <div key={t} className="flex flex-row items-center gap-3">
              <CircleCheck className="w-icon-sm h-icon-sm text-sentimental-positive" />
              <Typography variant="body-sm" className="">{t}</Typography>
            </div>
          ))}
        </ul>

        <ul className="space-y-2">
          {r.map((t) => (
            <div key={t} className="flex items-start gap-3">
              <CircleCheck className="w-icon-sm h-icon-sm text-sentimental-positive" />
              <Typography variant="body-sm" className="">{t}</Typography>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="min-h-[300vh] w-full bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col pt-9 md:pt-0">
        {/* Contenedor de imágenes */}
        <div className="relative w-[100%]  h-[266px] md:h-[400px] overflow-hidden">
          {/* Imagen base */}
          {imgOne && (
            <motion.img
              src={imgOne}
              alt={imgAlt}
              className="absolute inset-0 w-full h-full object-cover object-top "
              style={{ y: baseImageY }}
            />
          )}

          {/* Imagen con efecto wipe */}
          {imgTwo && (
            <motion.div
              className="absolute inset-0 z-10"
              style={{
                clipPath: clipPathProgress,
                WebkitClipPath: clipPathProgress,
              }}
            >
              <img
                src={imgTwo}
                alt={imgAlt}
                className="w-full h-full object-cover object-top "
              />
            </motion.div>
          )}
        </div>

        {/* Contenedor de contenido */}
        <div className="flex-1 md:flex-auto flex items-center w-full">
          <div className=" w-full relative h-full mt-5">

            {/* Panel A */}
            <motion.div
              className="absolute inset-0  flex items-center "
              style={{
                opacity: contentAOpacity,
                y: contentAY,
              }}
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6.5 px-3 md:px-7 ">
                <div className="text-text-primary flex flex-col gap-3">
                  <Typography variant="subtitle-large">
                    {kicker}
                  </Typography>
                  <Typography variant="headline-small" className="md:text-headline-medium">
                    {title}
                  </Typography>
                </div>

                <div className="md:col-span-2 text-text-secondary flex flex-col gap-5">
                  <Typography variant="body-large">
                    {paragraph}
                  </Typography>
                  {renderLists(leftItems, rightItems)}
                </div>
              </div>
            </motion.div>

            {/* Panel B */}
            <motion.div
              className="absolute inset-0  flex items-start mt-5 "
              style={{
                opacity: contentBOpacity,
                y: contentBY,
              }}
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 px-3 md:px-7 ">
                <div className="text-text-primary flex flex-col gap-3">
                  <Typography variant="subtitle-large">
                    {nextKicker}
                  </Typography>
                  <Typography variant="headline-small" className="md:text-headline-medium">
                    {nextTitle}
                  </Typography>
                </div>

                <div className="md:col-span-2 text-text-secondary flex flex-col gap-5">
                  <Typography variant="body-large">
                    {nextParagraph}
                  </Typography>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}