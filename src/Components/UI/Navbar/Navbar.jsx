// src/Components/Navbar/Navbar.jsx
import logo from "../../../assets/logo-rts.svg";
// src/Components/Navbar/Navbar.jsx
import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, TextAlignStart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { Typography, Button } from "../../index";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
const whatWeDoItems = [
  { label: "Automation & Controls", href: "automation-controls" },
  { label: "Digitalization", href: "digital" },
  { label: "Energy & Infrastructure", href: "energy" },
];

const industriesItems = [
  { label: "Oil & Gas", href: "industries/oil-and-gas" },
  { label: "Power Generation", href: "industries/power-generation" },
  { label: "Mining", href: "industries/mining" },
  { label: "Pharma", href: "industries/pharma" },
  { label: "Chemicals", href: "industries/chemicals" },
  { label: "Pulp & Paper", href: "industries/pulp-and-paper" },
];
export default function Navbar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(null);
  const [ddMobileOpen, setDdMobileOpen] = useState(null);
  // Animaciones para Framer Motion
  const navbarVariants = {
    hidden: { y: -60, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
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

  const handleNavigate = (href) => {
    navigate(href);
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
  return (
    <>
      <div className="fixed top-[30px]  z-[999] flex justify-center w-full bg-transparent px-3  md:px-7">
        <motion.nav
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          className={`flex justify-between items-center w-full h-navbar py-2 pl-3 pr-2 rounded-md backdrop-blur-[20px] backdrop-saturate-[140%] transition-all duration-300 ${theme === "light"
            ? "bg-white/7  text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            : "bg-navbar-background-primary"
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
                style={{
                  filter: theme === "light"
                    ? "invert(0)"
                    : "invert(1)"
                }}
              />
            </a>

            <div className="hidden md:flex flex-row gap-3 ">

              <Button
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                className=""
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
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                className="flex items-center gap-2"
                onClick={() => openDropdown("industries")}
              >
                <span>Industries</span>
                <ChevronDown
                  className={` transition-transform duration-300 ${ddMobileOpen === "what" ? "rotate-180" : ""}`}
                />
              </Button>
              <Button
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                className="flex items-center gap-2"
                onClick={() => handleNavigate('/hub')}
              >
                HUB
              </Button>

              <Button
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                className="flex items-center gap-2"
                onClick={() => handleNavigate('/culture')}
              >
                Culture

              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <Button size="sm" onClick={closeMobileMenuHard}>
              Book a meeting
            </Button>
          </div>

          <button
            className={` md:hidden w-[40px] h-[40px] rounded-xs flex items-center justify-center transition-colors duration-300 ${theme === "light" ? "bg-white" : "bg-white/15"
              }`}
            onClick={toggleMenu}
          >
            <TextAlignStart className={`absolute transition-all duration-500 ${open ? 'rotate-90 opacity-0 ' : 'rotate-0 opacity-100 '}`} />
            <X className={`absolute  transition-all duration-500 ${open ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`} />
          </button>
        </motion.nav>
      </div>

      {/* DROPDOWNS DESKTOP */}
      <div className="fixed top-[30px]  z-[899] flex justify-center w-full bg-transparent px-3  md:px-7">
        <div
          className={`flex justify-between items-center w-full h-navbar py-2 pl-3 pr-2 rounded-md bg-transparent`}
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
                style={{
                  filter: theme === "light"
                    ? "invert(0)"
                    : "invert(1)"
                }}
              />
            </a>

            <div className="hidden md:flex flex-row gap-3 ">
              <div className="relative ">
                <Button
                  variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                  className="flex items-center gap-2"
                >
                  <span>What we do</span>
                  <ChevronDown
                    className={` transition-transform duration-300 ${ddMobileOpen === "what" ? "rotate-180" : ""}`}
                  />
                </Button>
                <AnimatePresence>
                  {ddOpen === "what" && (
                    <div className={`absolute top-full left-0 mt-3 min-w-[330px] rounded-xs`}>
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-2 rounded-xs p-5 
                              backdrop-blur-[25px] backdrop-saturate-[140%]
                              ${theme === "light"
                            ? "bg-white/7  text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            : "bg-navbar-background-primary"
                          }`}
                      >
                        {whatWeDoItems.map((item, index) => renderDropdownItemDesktop(item, index))}
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative ">
                <Button
                  variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                  className="flex items-center gap-2"
                  onClick={() => openDropdown("industries")}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={` transition-transform duration-300 ${ddOpen === "what" ? "rotate-180" : ""}`}
                  />
                </Button>
                <AnimatePresence>
                  {ddOpen === "industries" && (
                    <div className={`absolute ml-2 top-full left-0 mt-3 min-w-[330px] rounded-xs`}>
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={`flex flex-col gap-2 rounded-xs p-5 
                              backdrop-blur-[25px] backdrop-saturate-[140%]
                              ${theme === "light"
                            ? "bg-white/7  text-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                            : "bg-navbar-background-primary"
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
            className={`bg-navbar-menu-primary fixed top-[100px] left-3 right-3 p-5  rounded-md flex flex-col gap-6 z-[199999999] backdrop-blur-[25px] backdrop-saturate-[160%] `}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <Button
                  variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                  className={` ${ddMobileOpen === "what" && "bg-navbar-button-hover-primary"}`}
                  onClick={() => toggleMobileDropdown("what")}
                >
                  <div className="flex flex-row items-center gap-2 ">
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
                  variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                  className={` ${ddMobileOpen === "industries" && "bg-navbar-button-hover-primary"}`}
                  onClick={() => toggleMobileDropdown("industries")}
                >
                  <div className="flex flex-row items-center gap-2 ">

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
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                onClick={() => handleNavigate('/hub')}
              >
                HUB
              </Button>

              <Button
                variant={theme === "light" ? "navbar-light" : "navbar-dark"}
                onClick={() => handleNavigate('/culture')}
              >
                Culture
              </Button>


              <Button
                variant={theme === "light" ? "navbar-filled-light" : "navbar-filled-dark"}
                className=""
                onClick={closeMobileMenuHard}
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