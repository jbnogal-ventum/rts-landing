// src/Components/Story/Story.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./Story.css";

export default function Story({ setNavMode }) {
  const rootRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2MobileRef = useRef(null);
  const panel2DesktopRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const rafId = useRef(null);
  const lastScrollY = useRef(0);

  // Asegurar que el componente esté montado
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Función de animación manual
  const animatePanels = useCallback(() => {
    if (!isMounted) return;

    const root = rootRef.current;
    const panel1 = panel1Ref.current;
    const panel2 = window.innerWidth <= 820 
      ? panel2MobileRef.current 
      : panel2DesktopRef.current;

    if (!root || !panel1 || !panel2) return;

    // Calcular posición del componente
    const rect = root.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Cuando el TOP del componente llega al 40% del viewport
    const triggerStart = viewportHeight * 0.4;
    
    // Solo animar cuando el componente esté visible
    if (rect.top > viewportHeight || rect.bottom < 0) {
      // Fuera de pantalla, mantener estado
      rafId.current = requestAnimationFrame(animatePanels);
      return;
    }

    // Calcular progreso (0 a 1)
    let progress = 0;
    if (rect.top <= triggerStart) {
      // El componente ya pasó el punto de inicio
      const distanceFromStart = triggerStart - rect.top;
      const totalAnimationDistance = viewportHeight * 0.8; // 80% del viewport para la animación
      progress = Math.min(1, distanceFromStart / totalAnimationDistance);
    }

    console.log("Story progress:", progress);

    // ANIMACIÓN PANEL 1: Desaparece en su lugar
    gsap.to(panel1, {
      autoAlpha: Math.max(0, 1 - (progress * 1.5)), // Más rápido
      y: 0, // IMPORTANTE: NO se mueve verticalmente
      filter: `blur(${12 * progress}px)`,
      duration: 0,
      overwrite: "auto"
    });

    // ANIMACIÓN PANEL 2: Aparece en su lugar
    gsap.to(panel2, {
      autoAlpha: Math.min(1, progress * 1.3), // Aparece un poco después
      y: 0, // IMPORTANTE: Empieza y termina en su posición
      filter: `blur(${14 * (1 - progress)}px)`,
      duration: 0,
      overwrite: "auto"
    });

    // Control de fondo (basado en progreso)
    if (progress > 0.5) {
      // Más de 50% de progreso = fondo claro
      gsap.to(root, {
        backgroundColor: "#ebeef0",
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
      setNavMode?.("light");
    } else {
      // Menos de 50% = fondo oscuro
      gsap.to(root, {
        backgroundColor: "#000102",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
      setNavMode?.("dark");
    }

    // Continuar animación
    rafId.current = requestAnimationFrame(animatePanels);
  }, [isMounted, setNavMode]);

  // Configuración principal
  useEffect(() => {
    if (!isMounted) return;

    console.log("Story: Mounted, setting up animation");

    const root = rootRef.current;
    const panel1 = panel1Ref.current;
    const panel2 = window.innerWidth <= 820 
      ? panel2MobileRef.current 
      : panel2DesktopRef.current;
    
    if (!root || !panel1 || !panel2) {
      console.warn("Story: Missing elements");
      return;
    }

    // ESTADO INICIAL
    gsap.set(root, { backgroundColor: "#000102" });
    
    // Panel 1: completamente visible
    gsap.set(panel1, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      position: "absolute",
      top: "26vh",
      left: "var(--margin-desktop)",
      width: "calc(100% - 2 * var(--margin-desktop))"
    });

    // Panel 2: completamente oculto pero EN LA MISMA POSICIÓN
    gsap.set(panel2, {
      autoAlpha: 0, // Invisible
      y: 0, // Misma posición Y que panel1
      filter: "blur(14px)",
      position: "absolute",
      top: "26vh", // MISMA posición que panel1
      left: "var(--margin-desktop)",
      width: "calc(100% - 2 * var(--margin-desktop))"
    });

    // Iniciar loop de animación
    rafId.current = requestAnimationFrame(animatePanels);

    // Manejar resize - importante recalcular
    const handleResize = () => {
      console.log("Story: Window resized");
      
      // Detener animación actual
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Resetear posiciones
      gsap.set(panel1, {
        top: window.innerWidth <= 820 ? "22vh" : "26vh",
        left: window.innerWidth <= 820 ? "var(--margin-mobile)" : "var(--margin-desktop)",
        width: window.innerWidth <= 820 
          ? "calc(100% - 2 * var(--margin-mobile))" 
          : "calc(100% - 2 * var(--margin-desktop))"
      });

      gsap.set(panel2, {
        top: window.innerWidth <= 820 ? "22vh" : "26vh",
        left: window.innerWidth <= 820 ? "var(--margin-mobile)" : "var(--margin-desktop)",
        width: window.innerWidth <= 820 
          ? "calc(100% - 2 * var(--margin-mobile))" 
          : "calc(100% - 2 * var(--margin-desktop))"
      });

      // Reiniciar animación
      setTimeout(() => {
        rafId.current = requestAnimationFrame(animatePanels);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      console.log("Story: Cleaning up");
      
      // Detener animación
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      
      // Remover event listener
      window.removeEventListener("resize", handleResize);
      
      // Resetear estilos GSAP
      gsap.killTweensOf([panel1, panel2, root]);
      
      if (panel1) gsap.set(panel1, { clearProps: "all" });
      if (panel2) gsap.set(panel2, { clearProps: "all" });
      if (root) gsap.set(root, { clearProps: "backgroundColor" });
    };
  }, [isMounted, animatePanels]);

  // Si no está montado, renderizar placeholder
  if (!isMounted) {
    return (
      <section className="story-section" ref={rootRef}>
        <div className="story-wrapper">
          <h4 className="story-subtitle">OUR STORY</h4>
        </div>
      </section>
    );
  }

  return (
    <section className="story-section bg-background-inverse text-text-on-white-primary" ref={rootRef}>
      <div className="story-wrapper">
        <h4 className="story-subtitle">OUR STORY</h4>

        {/* Panel 1 - Visible inicialmente */}
        <div className="story-panel panel-1" ref={panel1Ref}>
          <h2 className="story-title desktop headline-medium">
            RTS WAS BORN IN THE <br />
            WORLD OF OPERATIONAL <br />
            TECHNOLOGY
          </h2>

          <h2 className="story-title mobile headline-small">
            RTS WAS BORN IN THE <br />
            WORLD OF OPERATIONAL <br />
            TECHNOLOGY
          </h2>

          <p className="story-body desktop">
            — and evolved to 
            engineer <br />the future 
            through curated <br />
            industrial innovation.
          </p>

          <p className="story-body mobile">
            — and evolved to <br />
            engineer the future <br />
            through curated <br />
            industrial innovation.
          </p>
        </div>

        {/* Panel 2 Mobile - EN LA MISMA POSICIÓN que Panel 1 */}
        <div className="story-panel panel-2 story-mobile" ref={panel2MobileRef}>
          <h2 className="story-title headline-medium desktop">
            OUR STORY ISN'T <br /> ONE OF CHANGE, <br />
            BUT OF CONTINUOUS <br />
            EVOLUTION
          </h2>

          <h2 className="story-title headline-small mobile">
            OUR STORY ISN'T <br /> ONE OF CHANGE, <br />
            BUT OF CONTINUOUS <br />
            EVOLUTION
          </h2>

          <p className="story-body">
            — from control systems <br />
            to intelligent ecosystems.
          </p>
        </div>

        {/* Panel 2 Desktop - EN LA MISMA POSICIÓN que Panel 1 */}
        <div className="story-panel panel-2 story-desktop" ref={panel2DesktopRef}>
          <h2 className="story-title headline-medium">
            OUR STORY ISN'T ONE OF CHANGE, <br />
            BUT OF CONTINUOUS EVOLUTION
          </h2>

          <p className="story-body">
            — from control systems <br />
            to intelligent ecosystems.
          </p>
        </div>
      </div>
    </section>
  );
}