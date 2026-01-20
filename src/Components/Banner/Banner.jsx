import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../index";
import { cn } from "../../lib/utils";

// Componente para texto multilínea
function Multiline({ text, className = "" }) {
  if (!text) return null;
  const lines = String(text).split("\n");
  
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i !== lines.length - 1 && <br />}
        </span>
      ))}
    </span>
  );
}

// Botón de acción
function ActionButton({ label, href, onClick, variant = "primary", download }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      if (href.startsWith("http")) {
        window.open(href, "_blank");
      } else {
        navigate(href);
      }
    } else if (onClick) {
      onClick();
    }
  };

  const buttonVariants = {
    primary: "bg-core-violet text-white hover:bg-core-violet/90 border-none",
    outline: "bg-transparent text-white border border-white/35 hover:bg-white/10",
    ghost: "bg-white/8 text-white border border-white/12 hover:bg-white/15",
    "filled-dark": "bg-black text-white hover:bg-gray-900 border-none",
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "px-6 py-3 rounded-2xl font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
        buttonVariants[variant]
      )}
      download={download}
    >
      {label}
    </Button>
  );
}

// Componente principal Banner
export default function Banner({
  variant = "image",
  backgroundImage,
  titleDesktop,
  titleMobile,
  bodyDesktop,
  bodyMobile,
  buttons = [],
  start = "top 85%",
  titleClassName = "headline-medium",
  titleMobileClassName = "headline-small",
  bodyClassName = "body-lg",
  bodyMobileClassName = "body-lg",
  actionsDirection = "row",
  overlay = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });
  
  const controls = useAnimation();

  // Animaciones con Framer Motion
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { scale: 1.05 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1], // power3.out equivalente
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2, delay: 0.3 },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(14px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const bodyVariants = {
    hidden: {
      opacity: 0,
      y: 32,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const actionsVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const isGlow = variant === "glow";

  return (
    <motion.section
      ref={ref}
      className={cn(
        "relative w-full min-h-screen flex items-center justify-center",
        "text-white text-center overflow-hidden",
        isGlow ? "bg-black" : ""
      )}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Fondo con imagen */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay sobre la imagen si es glow */}
          {isGlow && (
            <div className="absolute inset-0 bg-black/45" />
          )}
        </div>
      )}

      {/* Efecto glow para variante glow */}
      {isGlow && (
        <>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "min(1200px, 150vw)",
              height: "min(1200px, 150vw)",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at center, rgba(115, 92, 255, 0.55) 0%, rgba(115, 92, 255, 0.25) 35%, rgba(115, 92, 255, 0) 70%)",
                filter: "blur(26px)",
              }}
            />
          </div>
          
          {/* Línea inferior */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, rgba(115,92,255,0), rgba(115,92,255,0.9), rgba(115,92,255,0))",
              opacity: 0.8,
            }}
          />
        </>
      )}

      {/* Overlay adicional (si se solicita) */}
      {overlay && (
        <div className="absolute inset-0 bg-background-primary/80 z-10" />
      )}

      {/* Contenido */}
      <motion.div
        className={cn(
          "relative z-20 mx-auto px-4",
          "flex flex-col items-center gap-5",
          "w-full max-w-6xl"
        )}
        variants={contentVariants}
      >
        {/* Título */}
        <motion.h2 className="flex flex-col gap-2" variants={titleVariants}>
          {/* Desktop */}
          <span className={cn(
            titleClassName,
            "font-display font-bold uppercase tracking-wide",
            "hidden md:block"
          )}>
            <Multiline text={titleDesktop} />
          </span>

          {/* Mobile */}
          <span className={cn(
            titleMobileClassName || titleClassName,
            "font-display font-bold uppercase tracking-wide",
            "block md:hidden"
          )}>
            <Multiline text={titleMobile ?? titleDesktop} />
          </span>
        </motion.h2>

        {/* Cuerpo del texto */}
        {(bodyDesktop || bodyMobile) && (
          <motion.p
            className={cn(
              "max-w-3xl opacity-90",
              "-mt-3"
            )}
            variants={bodyVariants}
          >
            {/* Desktop */}
            <span className={cn(
              bodyClassName,
              "hidden md:block"
            )}>
              <Multiline text={bodyDesktop} />
            </span>

            {/* Mobile */}
            <span className={cn(
              bodyMobileClassName || bodyClassName,
              "block md:hidden"
            )}>
              <Multiline text={bodyMobile ?? bodyDesktop} />
            </span>
          </motion.p>
        )}

        {/* Botones */}
        {buttons.length > 0 && (
          <motion.div
            className={cn(
              "mt-4 flex gap-3 justify-center flex-wrap",
              actionsDirection === "column" && "flex-col items-center"
            )}
            variants={actionsVariants}
          >
            {buttons.map((button, index) => (
              <div
                key={index}
                className={actionsDirection === "column" ? "w-full max-w-xs" : ""}
              >
                <ActionButton {...button} />
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}