// src/lib/utils.js
import heroHubBackground from "../assets/Backgrounds/heroHubBackground.webp";
import heroCultureBackground from "../assets/Backgrounds/culture_background.webp";
import heroEnergyBackground from "../assets/Backgrounds/hero_energy.webp";
import heroAutomationBackground from "../assets/Backgrounds/hero_a_y_c.webp";
import heroDigitalServicesBackground from "../assets/Backgrounds/heroDigitalServices.webp";
import heroOilAndGasBackground from '../assets/Backgrounds/hero_oilgas.webp';
import heroMiningBackground from '../assets/Backgrounds/hero_mining.webp';
import heroChemicalsBackground from '../assets/Backgrounds/hero_chemicals.webp';
import heroPulpPaperBackground from '../assets/Backgrounds/hero_pulp.webp';
import heroPharmaBackground from '../assets/Backgrounds/hero_pharmaceuticals.webp';
import heroPowerGenerationBackground from '../assets/Backgrounds/hero_power.webp';
import { parseAssistantMessage } from "./parseAssistantMessage";
export const cn = (...classes) => classes.filter(Boolean).join(" ");

const preloadCache = new Set();

export function preloadImage(src) {
  if (preloadCache.has(src)) return; // No descarga dos veces
  preloadCache.add(src);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
}

export const routeImageMap = {
  "/hub": heroHubBackground,
  "/culture": heroCultureBackground,
  "/energy": heroEnergyBackground,
  "/automation-controls": heroAutomationBackground,
  "/digital": heroDigitalServicesBackground,
    "/industries/oil-and-gas": heroOilAndGasBackground,
    "/industries/power-generation": heroPowerGenerationBackground,
    "/industries/metals-and-mining": heroMiningBackground,
    "/industries/chemicals": heroChemicalsBackground,
    "/industries/pulp-and-paper": heroPulpPaperBackground,
    "/industries/pharma": heroPharmaBackground
  // etc...
};

export { parseAssistantMessage };