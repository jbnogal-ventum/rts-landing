// src/App.jsx
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";


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

export default function App() {
 const location = useLocation();
  const transitionRef = useRef(null);
  const [phase, setPhase] = useState(0);

  const lenisRef = useRef(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    // Inicializar Lenis inmediatamente (sin esperar loader)
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

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // ¡Sin dependencia de loaderDone!

  useEffect(() => {
    // Resetear scroll al cambiar de página
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <Molecule />
      <Transition ref={transitionRef} lenisRef={lenisRef}>
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
                element={<HubPage onPhase={setPhase} />}
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
                  path="metals-and-mining"
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