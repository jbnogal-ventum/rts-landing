// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
//import { useLenisManager } from "./hooks/useLenisManager";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/UI/Navbar/Navbar";
import FloatingNode from "./Components/UI/FloatingNode";
import HomePage from "./Pages/HomePage";
import HubPage from "./Pages/HubPage";
import Footer from "./Components/Footer/Footer";
import AutomationControls from "./Pages/AutomationControls";
import Transition from "./Components/Transition/Transition";

import "./index.css";

// Componente interno que usa el contexto
const AppContent = () => {
  const location = useLocation();
  const { loaderDone, setNavMode, setLoaderDone, setIsReady } = useApp();

  // Efecto para marcar cuando la app está lista
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [setIsReady]);

  // Inicializar Lenis
  // useLenisManager();

  // Manejar cambio de tema basado en ruta
  useEffect(() => {
    if (!loaderDone) return;

    const isHome = location.pathname === "/";
   // setNavMode(isHome ? "light" : "dark");
  }, [location.pathname, loaderDone, setNavMode]);

 useEffect(() => {
  if (!loaderDone) return;

  const refreshTimer = setTimeout(() => {
    console.log("=== SCROLLTRIGGER ORDER DEBUG ===");
    
    const allTriggers = ScrollTrigger.getAll();
    allTriggers.forEach((st, i) => {
      const triggerEl = st.trigger || st.vars?.trigger;
      console.log(`${i}: ${triggerEl?.className || triggerEl?.tagName || 'unknown'}`, {
        start: Math.round(st.start),
        end: Math.round(st.end),
        pinned: st.pin,
        isActive: st.isActive
      });
    });
    
    ScrollTrigger.refresh();
  }, 1000);

  return () => clearTimeout(refreshTimer);
}, [loaderDone]);

  useEffect(() => {
    if (!loaderDone) return;

    // Refrescar ScrollTrigger después de que todo esté montado
    const refreshTimer = setTimeout(() => {
      console.log("App: Refreshing ScrollTrigger");
      ScrollTrigger.refresh();

      // Ordenar ScrollTriggers por prioridad si es necesario
      const allTriggers = ScrollTrigger.getAll();
      console.log(`Total ScrollTriggers: ${allTriggers.length}`);
    }, 800);

    return () => clearTimeout(refreshTimer);
  }, [loaderDone]);

  return (
    <>
      {!loaderDone && (
        <Loader onDone={() => setLoaderDone(true)} />
      )}

      <Transition enabled={loaderDone}>
        <Navbar />
        <FloatingNode />

        <div className="main-container">
          <div className="scroll-container relative z-30">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hub" element={<HubPage />} />
              <Route path="/automation-controls" element={<AutomationControls />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </Transition>
    </>
  );
};

// App principal envuelto en proveedor
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}