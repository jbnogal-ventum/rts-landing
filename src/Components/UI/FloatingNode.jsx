// // src/Components/UI/FloatingNode.jsx
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import "./FloatingNode.css";

// export default function FloatingNode() {
//   const nodeRef = useRef(null);

//   useEffect(() => {
//     const node = nodeRef.current;
//     if (!node) return;

//     const isDesktop = window.innerWidth > 820;

//     // ✅ Estado base: colapsado y oculto (antes del loader)
//     node.classList.add("collapsed");
//     node.classList.remove("expanded");

//     gsap.set(node, {
//       autoAlpha: 0,
//       y: 40,
//       filter: "blur(14px)",
//       // opcional: aseguramos geometría colapsada (match a tu collapseNode del Hero)
//       height: 60,
//       bottom: 32,
//       right: 32,
//       xPercent: 0,
//       pointerEvents: "none",
//     });

//     let introPlayed = false;

//     const playIntro = () => {
//       if (introPlayed) return;
//       introPlayed = true;

//       // dejamos un flag por si querés gatear cosas desde Hero
//       window.__nodeReady = true;

//       gsap.fromTo(
//         node,
//         { y: 40, autoAlpha: 0, filter: "blur(14px)" },
//         {
//           y: 0,
//           autoAlpha: 1,
//           filter: "blur(0px)",
//           duration: 1.15,
//           ease: "power3.out",
//           onComplete: () => {
//             gsap.set(node, { pointerEvents: "auto" });
//           },
//         }
//       );
//     };

//     // Si el loader terminó antes que el nodo monte
//     if (window.__heroEnter) requestAnimationFrame(playIntro);

//     // Escuchamos el mismo evento del loader
//     const onEnter = () => playIntro();
//     window.addEventListener("hero:enter", onEnter);

//     // HOVER (solo desktop)
//     let hoverIn, hoverOut;
//     if (isDesktop) {
//       hoverIn = () => {
//         gsap.to(node, {
//           y: -6,
//           duration: 0.95,
//           ease: "power3.out",
//           overwrite: "auto",
//         });
//       };

//       hoverOut = () => {
//         gsap.to(node, {
//           y: 0,
//           duration: 0.95,
//           ease: "power3.inOut",
//           overwrite: "auto",
//         });
//       };

//       node.addEventListener("mouseenter", hoverIn);
//       node.addEventListener("mouseleave", hoverOut);
//     }

//     return () => {
//       window.removeEventListener("hero:enter", onEnter);
//       if (isDesktop) {
//         node.removeEventListener("mouseenter", hoverIn);
//         node.removeEventListener("mouseleave", hoverOut);
//       }
//     };
//   }, []);

//   return (
//     <button className="floating-node collapsed" type="button" ref={nodeRef}>
//       <div className="fn-outer-circle">
//         <div className="fn-ring"></div>
//       </div>
//       <div className="fn-text body-sm">What technical challenge are you facing today?</div>
//     </button>
//   );
// }
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

const FloatingNode = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { loaderDone, phase, scroll } = useApp();

  // 1. Controlar visibilidad basado en loader y eventos
  useEffect(() => {
    if (!loaderDone) {
      setIsVisible(false);
      return;
    }

    // Mostrar cuando se dispara hero:enter
    const handleHeroEnter = () => {
      setIsVisible(true);
    };

    if (window.__heroEnter) {
      setTimeout(() => setIsVisible(true), 100);
    }

    window.addEventListener('hero:enter', handleHeroEnter);
    return () => window.removeEventListener('hero:enter', handleHeroEnter);
  }, [loaderDone]);

  // 2. Controlar expansión/colapsado basado en scroll y fase (similar al original)
  useEffect(() => {
    if (!isVisible) return;

    const shouldExpand = phase < 0.3 && scroll < 500;
    setIsExpanded(shouldExpand);
  }, [phase, scroll, isVisible]);

  // 3. Manejar hover (solo desktop)
  const handleMouseEnter = () => {
    if (window.innerWidth > 820) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // 4. Click handler (alternar manualmente)
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Animaciones para Framer Motion
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: 'blur(14px)',
      pointerEvents: 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      pointerEvents: 'auto',
      transition: {
        duration: 1.15,
        ease: [0.16, 1, 0.3, 1], // power3.out equivalente
      },
    },
    hover: {
      y: -6,
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1], // power3.out
      },
    },
  };

  const ringVariants = {
    collapsed: {
      width: 32,
      height: 32,
      '--ring-width': '4px',
      transition: { duration: 0.3, ease: 'power3.out' },
    },
    expanded: {
      width: 48,
      height: 48,
      '--ring-width': '7px',
      transition: { duration: 0.3, ease: 'power3.out' },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      width: 0,
      marginLeft: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      width: 'auto',
      marginLeft: 16,
      transition: {
        opacity: { duration: 0.3, delay: 0.1 },
        width: { duration: 0.25 },
        marginLeft: { duration: 0.25 },
      },
    },
  };

  const outerCircleVariants = {
    collapsed: {
      width: '100%',
      height: '100%',
      transition: { duration: 0.3, ease: 'power3.out' },
    },
    expanded: {
      width: 48,
      height: 48,
      transition: { duration: 0.3, ease: 'power3.out' },
    },
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        className={cn(
          // Posición base
          'fixed bottom-8 right-8 z-[999999]',
          'flex items-center justify-center',
          'border-none cursor-pointer',
          'overflow-hidden',
          
          // Estado collapsed (por defecto)
          !isExpanded && [
            'w-[60px] h-[60px]',
            'rounded-full',
            'p-0',
          ],
          
          // Estado expanded
          isExpanded && [
            'h-[60px]',
            'px-4',
            'rounded-full',
            'gap-4',
            'bg-[rgba(60,60,60,0.8)] backdrop-blur-md',
          ]
        )}
        variants={containerVariants}
        initial="hidden"
        animate={hovered ? ['visible', 'hover'] : 'visible'}
        exit="hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer Circle */}
        <motion.div
          className={cn(
            'rounded-full',
            'flex items-center justify-center',
            !isExpanded && 'bg-[rgba(60,60,60,0.5)] backdrop-blur-sm',
            isExpanded && 'bg-transparent'
          )}
          variants={outerCircleVariants}
          animate={isExpanded ? 'expanded' : 'collapsed'}
        >
          {/* Ring con gradiente cónico */}
          <motion.div
            className="rounded-full"
            style={{
              background: 'conic-gradient(#33d6ff, #2d9dff, #4f47ff, #9b1fff, #33d6ff)',
              mask: 'radial-gradient(circle, transparent calc(50% - var(--ring-width)), black calc(50% - var(--ring-width) + 1px)), radial-gradient(circle, black 50%, transparent 51%)',
              WebkitMask: 'radial-gradient(circle, transparent calc(50% - var(--ring-width)), black calc(50% - var(--ring-width) + 1px)), radial-gradient(circle, black 50%, transparent 51%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
            variants={ringVariants}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            custom={isExpanded}
          />
        </motion.div>

        {/* Texto (solo visible en expanded) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="text-body-sm text-[#eeeeee] whitespace-nowrap pointer-events-none font-regular leading-[1.3]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              What technical challenge are you facing today?
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingNode;