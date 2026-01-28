// src/App.jsx
import { useEffect, useRef, useState} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/UI/Navbar/Navbar";
import FloatingNode from "./Components/UI/FloatingNode";
import HomePage from "./Pages/HomePage";
import HubPage from "./Pages/HubPage";
import CulturePage from "./Pages/CulturePage";
import Footer from "./Components/Footer/Footer";
import EnergyPage from "./Pages/EnergyPage";
import AutomationControlsPage from "./Pages/AutomationControlsPage";
import Transition from "./Components/Transition/Transition";
import Molecule from './Components/molecule/Molecule'
import OilGasIndustryPage from "./Pages/OilGasIndustryPage";
import PowerIndustryPage from "./Pages/PowerIndustryPage";
import MiningIndustryPage from "./Pages/MiningIndustryPage";
import ChemicalsIndustryPage from "./Pages/ChemicalsIndustryPage";
import PulpPaperIndustryPage from "./Pages/PulpPaperIndustryPage";
import PharmaceuticalsIndustryPage from "./Pages/PharmaceuticalsIndustryPage";
import "./App.css";
import "./index.css";
import DigitalServicesPage from "./Pages/DigitalServicesPage";
import MoleculePage from "./Pages/MoleculePage";

// Registrar GSAP UNA SOLA VEZ
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Limpiar cualquier instancia previa de GSAP
  if (window.gsap) {
    window.gsap.globalTimeline.clear();
    window.gsap.killTweensOf('*');
  }
}

export default function App() {
    // const { theme } = useTheme();
  // console.log('App theme', theme);
  const location = useLocation();
  const transitionRef = useRef(null);
  
  const [scroll, setScroll] = useState(0);
  const [phase, setPhase] = useState(0);

  const [isReady, setIsReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const lenisRef = useRef(null);
  const rafIdRef = useRef(0);
  const stTickRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };
    rafIdRef.current = requestAnimationFrame(raf);

    //lenis.on("scroll", ({ scroll }) => setScroll(scroll));

    const onTick = () => ScrollTrigger.update();
    stTickRef.current = onTick;
    gsap.ticker.add(onTick);

    ScrollTrigger.scrollerProxy(".scroll-container", {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: ".scroll-container" });
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      if (stTickRef.current) gsap.ticker.remove(stTickRef.current);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loaderDone]);

  useEffect(() => {
    if (!loaderDone) return;
    if (location.pathname !== "/") return;
    gsap.set("#hero", { visibility: "visible" });
    window.__heroEnter = true;
    window.dispatchEvent(new Event("hero:enter"));
  }, [loaderDone]);

  // Eliminamos el useEffect que manejaba el background
  // porque ahora lo maneja el ThemeContext
  useEffect(() => {
    // Resetear scroll al top cuando se monta el componente
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // window.scrollTo(0, 0);
    
    // // Si estás usando Lenis (como en App.jsx), resetea también
    // if (window.lenis) {
    //   window.lenis.scrollTo(0, { immediate: true });
    // }
    
    
    console.log('App mounted, scroll reset');
  }, [location.pathname]);

  return (
    <>
      {!loaderDone && (
        <Loader isReady={isReady} onDone={() => setLoaderDone(true)} />
      )}

      <Molecule />

      <Transition ref={transitionRef} enabled={loaderDone} lenisRef={lenisRef}>
        <Navbar />
        <FloatingNode phase={phase} />

        <div className="main-container" style={{ background: "transparent" }}>
          <div
            className="scroll-container"
            style={{ position: "relative", zIndex: 3, background: "transparent" }}
          >
             <Routes>
              <Route
                path="/"
                element={<HomePage onPhase={setPhase} />}
              />
              <Route path="/molecule" element={<MoleculePage />} />
              <Route
                path="/hub"
                element={<HubPage onPhase={setPhase}  />}
              />
              <Route
                path="/automation-controls"
                element={<AutomationControlsPage key="automation" />}
              />
              <Route
                path="/digital"
                element={<DigitalServicesPage key="digital" />}
              />
              <Route
                path="/energy"
                element={<EnergyPage key="energy" />}
              />
              <Route
                path="/culture"
                element={<CulturePage key="culture" />}
              />
              <Route path="/industries">
                <Route
                  path="oil-and-gas"
                  element={<OilGasIndustryPage key="oil-gas" />}
                />
                <Route
                  path="chemicals"
                  element={<ChemicalsIndustryPage key="chemicals" />}
                />
                <Route
                  path="pulp-and-paper"
                  element={<PulpPaperIndustryPage key="pulp-paper" />}
                />
                <Route
                  path="pharma"
                  element={<PharmaceuticalsIndustryPage key="pharma" />}
                />
                <Route
                  path="power-generation"
                  element={<PowerIndustryPage key="power" />}
                />
                <Route
                  path="mining"
                  element={<MiningIndustryPage key="mining" />}
                />
              </Route>
              <Route
                path="*"
                element={<HomePage onPhase={setPhase} key="default" />}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </Transition>
    </>
  );
}