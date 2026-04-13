// src/Components/Navbar/Navbar.jsx
import logo from "../../../assets/logo-rts.svg";
import { preloadImage, routeImageMap } from "../../../lib/utils";
import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, TextAlignStart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransition } from "../../Transition/Transition";
import { useTheme } from "../../../contexts/ThemeContext";
import { Typography, Button } from "../../index";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useNavbarTextColor } from "../../../hooks/useNavbarTextColor";
import { cn } from "../../../lib/utils";
const whatWeDoItems = [
  { label: "Automation & Controls", href: "automation-controls" },
  { label: "Digital Skills", href: "digital" },
  { label: "Energy & Infrastructure", href: "energy" },
];

const industriesItems = [
  { label: "Oil & Gas", href: "industries/oil-and-gas" },
  { label: "Power Generation", href: "industries/power-generation" },
  { label: "Mining", href: "industries/metals-and-mining" },
  { label: "Pharma", href: "industries/pharmaceuticals" },
  { label: "Chemicals", href: "industries/chemicals" },
  { label: "Pulp & Paper", href: "industries/pulp-and-paper" },
];
export default function Navbar() {
  const { go } = useTransition();
  const { theme } = useTheme();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const { buttonTheme, navbarRef } = useNavbarTextColor()
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(null);
  const [ddMobileOpen, setDdMobileOpen] = useState(null);
  // Animaciones para Framer Motion
  const navbarVariants = {
    hidden: {  opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.98,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      filter: "blur(20px)",
      transition: {
        duration: 0.4
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { y: -6, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.22,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  // console.log({buttonTheme})
  // Determinar qué variante usar para cada botón
  const getNavbarVariant = () => {
    // Priorizamos el tema adaptativo para el navbar
    const themeForNavbar = buttonTheme; // 'light' o 'dark'
    return themeForNavbar === 'light' ? 'navbar-light' : 'navbar-dark';
  };

  const getNavbarTextVariant = () => {
    const themeForNavbar = buttonTheme;
    return themeForNavbar === 'light' ? 'navbar-text-light' : 'navbar-text-dark';
  };

  const getNavbarFilledVariant = () => {
    const themeForNavbar = buttonTheme;
    return themeForNavbar === 'light' ? 'navbar-filled-light' : 'navbar-filled-dark';
  };
  const handleNavigate = (href) => {
    go(href);
    closeDropdowns();
    closeMobileMenuHard();
  };

  const closeDropdowns = () => {
    setDdOpen(null);
  };

  const openDropdown = (key) => {
    if (ddOpen === key) {
      setDdOpen(null);
    } else {
      setDdOpen(key);
    }

  };
  // Funciones para el menu mobile


  const toggleMobileDropdown = (key) => {
    setDdMobileOpen((prev) => (prev === key ? null : key));
  };

  const closeMobileMenuHard = () => {
    setDdMobileOpen(null);
    closeDropdowns();
    setOpen(false);
  };

  const toggleMenu = () => {
    setDdMobileOpen(null);
    setOpen(!open);
  };

  const renderDropdownItemDesktop = (item, index) => (
    <motion.a
      key={item.label + item.href + "desktop"}
      custom={index}
      variants={dropdownItemVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center "
      onClick={() => handleNavigate(item.href)}
      onMouseEnter={() => {
        const img = routeImageMap[item.href];
        if (img) preloadImage(img);
      }}
    >
      <Button
        key={item.label + item.href + "mobile"}
        variant={theme === "light" ? "navbar-text-light" : "navbar-text-dark"}
        className="flex items-center "
        onClick={() => handleNavigate(item.href)}
      >
        ↳
        <span className="text-sm ml-2">{item.label}</span>
      </Button>
    </motion.a>
  );

  const renderDropdownItemMobile = (item) => (
    <Button
      key={item.label + item.href + "mobile"}
      variant={theme === "light" ? "navbar-text-light" : "navbar-text-dark"}
      className="flex items-center "
      onClick={() => handleNavigate(item.href)}
       onMouseEnter={() => {
      const img = routeImageMap[item.href];
      if (img) preloadImage(img);
    }}
    >
      ↳
      <span className="text-sm ml-2">{item.label}</span>
    </Button>
  );
  // Un use effect para que si el viewport cambia ls cierre el menu mobile utilizando el hook useMediaQuery
  useEffect(() => {
    if (isTablet) {
      closeMobileMenuHard();
    }
  }, [isTablet]);
  const logoFilter = buttonTheme === 'light' ? 'invert(0)' : 'invert(1)';
  return (
    <>
      <div className="fixed top-[30px]  z-[990] flex justify-center w-full bg-transparent px-3  md:px-7">
        <motion.nav
          ref={navbarRef} // Añadimos la ref aquí
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          className={`flex justify-between items-center w-full h-navbar py-2 pl-3 pr-2 rounded-md backdrop-blur-[8px] backdrop-saturate-[140%] backdrop-brightness-[100%]  transition-all duration-300 ${theme === "light"
            ? "bg-white/30   shadow-sm "
            : "bg-navbar-background-primary "
            }`}
        >
          <div className="flex flex-row  items-center gap-4">
            <a
              className="cursor-pointer shrink-0"
              onClick={() => handleNavigate("/")}
            >
              <img
                src={logo}
                className="w-[44px] h-[21px] "
                alt="RTS Logo"
                style={{ filter: logoFilter }}
              />
            </a>

            <div className="hidden md:flex flex-row gap-3 ">

              <Button
                variant={getNavbarVariant()}
                className={`${ddOpen === "what" ? "!bg-navbar-background-primary" : ""}`}
                onClick={() => openDropdown("what")}
              >
                <div className="flex flex-row items-center gap-2 ">
                  <Typography>What we do</Typography>
                  <ChevronDown
                    className={` transition-transform duration-300 ${ddOpen === "what" ? "rotate-180" : ""}`}
                  />
                </div>
              </Button>

              <Button
                variant={getNavbarVariant()}
                className={`${ddOpen === "industries" ? "!bg-navbar-background-primary" : ""}`}
                onClick={() => openDropdown("industries")}
              >
                <span>Industries</span>
                <ChevronDown
                  className={` transition-transform duration-300 ${ddOpen === "industries" ? "rotate-180" : ""}`}
                />
              </Button>
              <Button
                variant={getNavbarVariant()}
                className="flex items-center gap-2"
                onClick={() => handleNavigate('/hub')}
                onMouseEnter={() => {
                  const img = routeImageMap['/hub'];
                  if (img) preloadImage(img);
                }}
              >
                HUB
              </Button>

              <Button
                variant={getNavbarVariant()}
                className="flex items-center gap-2"
                onClick={() => handleNavigate('/culture')}
                onMouseEnter={() => {
                  const img = routeImageMap['/culture'];
                  if (img) preloadImage(img);
                }}
              >
                Culture

              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button size="sm" onClick={() => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank")}>
              Book a meeting
            </Button>
          </div>

          <button
            className={` md:hidden w-[40px] h-[40px] rounded-xs flex items-center justify-center transition-colors duration-300 ${buttonTheme === "light" ? "bg-white" : "bg-white/15"
              }`}
            onClick={toggleMenu}
          >
            <TextAlignStart className={`absolute transition-all duration-500 ${open ? 'rotate-90 opacity-0 ' : 'rotate-0 opacity-100 '} ${buttonTheme === "light" ? "text-black" : "text-white"}`} />
            <X className={`absolute  transition-all duration-500 ${open ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
          </button>
        </motion.nav>
      </div>

      {/* DROPDOWNS DESKTOP */}
      <div className="fixed top-[30px]  z-[899] flex justify-center w-full bg-transparent px-3  md:px-7">
        <div
          className={`flex justify-between items-center w-full h-navbar py-2 pl-3 pr-2 rounded-md bg-transparent text-transparent`}
        >
          <div className="flex flex-row  items-center gap-4">
            <div className="w-[44px]" />

            <div className="hidden md:flex flex-row gap-3 ">
              <div className="relative ">

                <AnimatePresence>
                  {ddOpen === "what" && (
                    <div className={`absolute top-[20px] left-0 mt-3 min-w-[330px] rounded-xs`}>
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-2 rounded-xs p-5 
                             
                              ${theme === "light"
                            ? "bg-background-inverse  text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            : "bg-background-primary"
                          }`}
                      >
                        {whatWeDoItems.map((item, index) => renderDropdownItemDesktop(item, index))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative ">

                <AnimatePresence>
                  {ddOpen === "industries" && (
                    <div className={`absolute ml-2 top-[20px] left-[140px] mt-3 min-w-[330px] rounded-xs`}>
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-2 rounded-xs p-5 
                              
                              ${theme === "light"
                            ? "bg-background-inverse  text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            : "bg-background-primary"
                          }`}
                      >
                        {industriesItems.map((item, index) => renderDropdownItemDesktop(item, index))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>


      </div >
      {/* MOBILE MENU */}
      < AnimatePresence >
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`${theme === "light" ? "bg-background-inverse text-text-on-white-primary" : "bg-background-primary text-text-primary"} transition-colors duration-300 fixed top-[100px] left-3 right-3 p-5  rounded-md flex flex-col gap-6 z-[199999999] `}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Button
                  variant={getNavbarVariant()}
                  className={` ${ddMobileOpen === "what" && "bg-navbar-button-hover-primary"}`}
                  onClick={() => toggleMobileDropdown("what")}
                >
                  <div className={cn("flex flex-row items-center gap-2 ", theme === "light" ? "text-text-on-white-primary" : "text-text-primary")}>
                    <Typography>What we do</Typography>
                    <ChevronDown
                      className={` transition-transform duration-500 ${ddMobileOpen === "what" ? "rotate-180" : ""}`}
                    />
                  </div>
                </Button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${ddMobileOpen === "what"
                    ? "max-h-[320px] opacity-100 translate-y-0 p-5 "
                    : "max-h-0 opacity-0 -translate-y-1"
                    }`}
                >
                  <div className="flex flex-col gap-4">
                    {whatWeDoItems.map(renderDropdownItemMobile)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  variant={getNavbarVariant()}
                  className={` ${ddMobileOpen === "industries" && "bg-navbar-button-hover-primary"} ${theme === "light" ? "text-text-on-white-primary" : "text-text-primary"}`}
                  onClick={() => toggleMobileDropdown("industries")}
                >
                  <div className={cn("flex flex-row items-center gap-2 ", theme === "light" ? "text-text-on-white-primary" : "text-text-primary")}>
                    <span>Industries</span>
                    <ChevronDown
                      className={` transition-transform duration-500 ${ddMobileOpen === "industries" ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </Button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${ddMobileOpen === "industries"
                    ? "max-h-[320px] opacity-100 translate-y-0 p-5 "
                    : "max-h-0 opacity-0 -translate-y-1"
                    }`}
                >
                  <div className="flex flex-col gap-4">
                    {industriesItems.map(renderDropdownItemMobile)}
                  </div>
                </div>
              </div>

              <Button
                variant={getNavbarVariant()}
                onClick={() => handleNavigate('/hub')}
                onMouseEnter={() => {
                  const img = routeImageMap['/hub'];
                  if (img) preloadImage(img);
                }}
              >
                <Typography className={`${theme === 'light' ? "text-text-on-white-primary" : "text-text-primary"}`}>HUB</Typography>
              </Button>

              <Button
                variant={getNavbarVariant()}
                onClick={() => handleNavigate('/culture')}
                onMouseEnter={() => {
                  const img = routeImageMap['/culture'];
                  if (img) preloadImage(img);
                }}
              >
                <Typography className={`${theme === 'light' ? "text-text-on-white-primary" : "text-text-primary"}`}>Culture</Typography>
              </Button>


              <Button
                variant={theme === "light" ? "navbar-filled-light" : "navbar-filled-dark"}
                className=""
                onClick={() => window.open("https://outlook.office.com/book/IntroducingRTSSparkIndustrialBrilliance@gruports.com/?ismsaljsauthenabled=true", "_blank")}
              >
                Book a meeting
              </Button>
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >
    </>
  );
}