// src/Components/Loader/Loader.jsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import "./Loader.css";

export default function Loader({ isReady, onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | finishing | leaving | done
  const [isVisible, setIsVisible] = useState(true);
  
  const contentControls = useAnimation();
  const curtainControls = useAnimation();
  const rootControls = useAnimation();
  
  const hasRealProgressRef = useRef(false);
  const progressIntervalRef = useRef(null);
  const simProgressRef = useRef(0);

  /* =====================================================
     SCROLL LOCK mientras el Loader está montado
  ===================================================== */
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY || 0;

    const prev = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const prevent = (e) => e.preventDefault();
    const preventKeys = (e) => {
      const keys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (keys.includes(e.code)) e.preventDefault();
    };

    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", preventKeys);

      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      body.style.overflow = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;

      window.scrollTo(0, scrollY);
    };
  }, []);
  /* =====================================================
     Intro animation (aparece loader)
  ===================================================== */
  useEffect(() => {
    const startIntro = async () => {
      // Inicializamos estados
      await curtainControls.start({ 
        y: "0%", 
        transition: { duration: 0 }
      });
      
      await rootControls.start({ 
        opacity: 1, 
        transition: { duration: 0 }
      });
      
      // Animación del contenido
      await contentControls.start({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1], // power3.out aproximado
          delay: 0.12,
        }
      });
    };
    
    startIntro();
  }, [contentControls, curtainControls, rootControls]);

  /* =====================================================
     Fallback progress simulation
  ===================================================== */
  useEffect(() => {
    if (phase !== "loading") return;
    
    const timeoutId = setTimeout(() => {
      if (hasRealProgressRef.current) return;
      
      // Limpiar intervalo previo
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      // Simular progreso hasta 92%
      simProgressRef.current = progress;
      const targetProgress = 92;
      const duration = 2200; // 2.2 segundos
      const steps = 60;
      const increment = (targetProgress - progress) / steps;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      progressIntervalRef.current = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(progressIntervalRef.current);
          return;
        }
        
        simProgressRef.current += increment;
        setProgress(Math.min(92, Math.round(simProgressRef.current)));
        currentStep++;
      }, stepTime);
      
    }, 300);
    
    return () => {
      clearTimeout(timeoutId);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [phase, progress]);

  /* =====================================================
     Finish + Exit when isReady
  ===================================================== */
  useEffect(() => {
    if (!isReady || phase !== "loading") return;
    
    // Limpiar simulación
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    setPhase("finishing");
    
    // Animación para llegar a 100%
    const animateTo100 = async () => {
      const duration = 550; // 0.55 segundos
      const steps = 30;
      const startProgress = progress;
      const increment = (100 - startProgress) / steps;
      const stepTime = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep >= steps) {
          clearInterval(interval);
          setProgress(100);
          startExitAnimation();
          return;
        }
        
        const newProgress = startProgress + (increment * (currentStep + 1));
        setProgress(Math.min(100, Math.round(newProgress)));
        currentStep++;
      }, stepTime);
    };
    
    animateTo100();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, phase]);

  /* =====================================================
     Exit animation
  ===================================================== */
  const startExitAnimation = async () => {
    setPhase("leaving");
    
    // Animación de salida
    await contentControls.start({
      opacity: 0,
      y: -10,
      filter: "blur(10px)",
      transition: {
        duration: 0.35,
        ease: [0.64, 0, 0.78, 0], // power3.in aproximado
      }
    });
    
    // Cortina sube y root desaparece
    await Promise.all([
      curtainControls.start({
        y: "-110%",
        transition: {
          duration: 1.05,
          ease: [0.76, 0, 0.24, 1], // power4.inOut aproximado
          delay: 0.05,
        }
      }),
      rootControls.start({
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "linear",
          delay: 0.87, // 1.05 - 0.18
        }
      })
    ]);
    
    // Finalizar
    setPhase("done");
    setIsVisible(false);
    onDone?.();
  };

  if (!isVisible || phase === "done") return null;

  return (
    <motion.div
      className="loader-root"
      aria-hidden={false}
      initial={{ opacity: 0 }}
      animate={rootControls}
      style={{ opacity: 0 }}
    >
      <motion.div
        className="loader-curtain"
        initial={{ y: "0%" }}
        animate={curtainControls}
      />

      <motion.div
        className="loader-content"
        ref={(el) => {
          if (el) contentControls.set({
            opacity: 0,
            y: 12,
            filter: "blur(10px)"
          });
        }}
        animate={contentControls}
      >
        <div className="loader-title">Loading</div>

        <div className="loader-meter">
          <div className="loader-bar">
            <motion.div 
              className="loader-barFill" 
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ 
                type: "tween",
                ease: "easeOut",
                duration: 0.2 
              }}
            />
          </div>
          <div className="loader-pct">{progress}%</div>
        </div>
      </motion.div>
    </motion.div>
  );
}