
// src/content/industries-content.js
export const industriesContent = {
    oilgas: {
        hero: {
            title: "Oil & Gas",
            img: () => import('../assets/Backgrounds/hero_oilgas.png'),
        },
        clientsSection: {
            title: "A dense and high-pressure orbit, where precision and safety define every move.",
            info: "We enhance operational reliability and efficiency through OT/IT integration, ensuring safe, data-driven, and continuous performance across upstream, midstream, and downstream operations.",
            clientsLogos: {
                repsolLogo: () => import('../assets/clients/repsol.png'),
                cepsaLogo: () => import('../assets/clients/cepsa.png'),
                raizenLogo: () => import('../assets/clients/raizen.png'),
                shellLogo: () => import('../assets/clients/shell.png'),
                ypfLogo: () => import('../assets/clients/ypf.png'),
                tgsLogo: () => import('../assets/clients/tgs.png'),
                chevronLogo: () => import('../assets/clients/chevron.png'),
                enapLogo: () => import('../assets/clients/enap.png'),
                axionLogo: () => import('../assets/clients/axion.png'),
                enerflexLogo: () => import('../assets/clients/enerflex.png'),
                pemexLogo: () => import('../assets/clients/pemex.png'),
            }
        },
        projectSection: {
            location: "PAE Argentina",
            sumary: "Maximizing operational insight through PI System & advanced analytics",
            info: "We design and implement cohesive systems where all technologies work \nseamlessly together, tailored to the  client’s specific needs.",
            technicalItems: [
                "Custom PI Vision symbols (Java / HTML)",
                "Advanced analytics in Seeq (Hexane Dry Point, TMT inference, catalytic activity monitoring)",
                "Machine Learning applied to process optimization",
                "Integration across PI System, Honeywell PHD, and Seeq",
                "Automated reporting via Seeq Organizer",
                "Time–depth data transformation to enhance decision-making",
            ],
            img: () => import('../assets/Backgrounds/project_oilgas.jpg'),
            companyLogo: () => import('../assets/clients/ypf.png'),
        }
    },
    power: {
        hero: {
            title: "Power generation",
            img: () => import('../assets/Backgrounds/hero_power.png'),
        },
        clientsSection: {
            title: "Where uptime is currency and control is everything this universe demands robust, adaptive systems.",
            info: "We design and implement high-availability control architectures and digitalization strategies, that maximize efficiency, stability, and asset longevity in both conventional and renewable power plants.",
            clientsLogos: {
                centralPuertoLogo: () => import('../assets/clients/centralPuerto.png'),
                cenLogo: () => import('../assets/clients/cen.png'),
                tmbLogo: () => import('../assets/clients/tmb.png'),
                greenaliaLogo: () => import('../assets/clients/greenalia.png'),
               
            }
        },
        projectSection: {
            location: "Argentina",
            sumary: "Enterprise-level implementation for operational, maintenance, and executive intelligence",
            info: "Comprehensive PI System implementation for data capture, historization, and multi-level information consumption (operations, maintenance, management). Work included full AF modeling, creation of reusable templates, event notifications, and advanced interactive dashboards. Also included Seeq deployment for advance analytics and an AI pilot project developed in Workbench and DataLab.",
            technicalItems: [
                "Full AF modeling across critical equipment and areas considering internarional KKS standard",
                "Centralized historization in PI Data Archive",
                "Template creation for scalable asset onboarding",
                "Event notifications for critical equipment behavior",
                "High-complexity operational dashboards with rich interaction",
                "End-to-end PI System implementation and development",
                "Seeq deployment and AI pilot integration",
                "Foundation for corporate digital transformation",
            ],
            img: () => import('../assets/Backgrounds/project_power.jpg'),
            companyLogo: () => import('../assets/clients/centralPuerto.png'),
        }
    },
    chemicals: {
        hero: {
            title: "Chemicals & Petrochemicals",
            img: () => import('../assets/Backgrounds/hero_chemicals.png'),
        },
        clientsSection: {
            title: "A volatile but high-potential galaxy, where operational efficiency and data intelligence rule.",
            info: "We help petrochemical plants achieve smarter, safer, and more efficient operations by digitalizing processes and connecting critical data from field to boardroom.",
            clientsLogos: {
                dowLogo: () => import('../assets/clients/dow.png'),
                poliresinasLogo: () => import('../assets/clients/poliResinas.png'),
                basfLogo: () => import('../assets/clients/basf.png')                
            }
        },
        projectSection: {
            location: "Argentina – Sierras Blancas,  Bajada de Añelo",
            sumary: "PI System governance, advanced analytics, and remote operations enablement",
            info: "End-to-end PI System and Data Analytics support for Shell’s upstream operations. The project included the commissioning of the ROC (Remote Operations Center), AF structuring, migration and optimization of 450+ PI Vision displays, and data reliability work for future predictive maintenance initiatives.",
            technicalItems: [
                "ROC (Remote Operation Control) enablement",
                "AF hierarchy structuring and template development",
                "Migration and optimization of 450+ PI Vision screens",
                "Standardization across Facilities and WellPads",
                "PI System + Seeq integration within the Data-Driven POD",
                "Data reliability and validation for critical assets",
                "Technical review of databoooks, alarm catalogs, Modbus tables, etc.",
            ],
            img: () => import('../assets/Backgrounds/project_chemicals.png'),
            companyLogo: () => import('../assets/clients/shell.png'),
        }
    },
    pulpPaper: {
        hero: {
            title: "Pulp & Paper",
            img: () => import('../assets/Backgrounds/hero_pulp.png'),
        },
        clientsSection: {
            title: "Heavily industrial terrain requiring resilient networks and smooth modernization paths.",
            info: "We support sustainable pulp and paper production through automation, energy optimization, and process digitalization — driving efficiency, circularity, and lower environmental impact.",
            clientsLogos: {
                enceLogo: () => import('../assets/clients/ence.png'),
                upmLogo: () => import('../assets/clients/upm.png'),
            }
        },
        projectSection: {
            location: "Pilar, Argentina ",
            sumary: "Unified asset modeling and real-time visibility across distributed field operations",
            info: "Recuperation of PlantScape R120 server. R200.1 installation, R120 data  base recuperation. Migration towards  the new installed database release,  screens, menus, users, historization.  Creation of disk image using Norton  Ghost. Start up of plant system. PM tasks for PlantScape R200.1. Firmware revisión of PlantScape with Ntools  modules. Firmware actualization of C200, CNI, AI, DI’s, DO’s. ",
            technicalItems: [],
            img: () => import('../assets/Backgrounds/project_pulp.jpg'),
            companyLogo: () => import('../assets/clients/honeywell.png'),
        }
    },
    mining: {
        hero: {
            title: "Metals & Mining",
            img: () => import('../assets/Backgrounds/hero_mining.png'),
        },
        clientsSection: {
            title: "Harsh environments and remote locations—requiring diagnostics that go deep and networks that endure.",
            info: "We enable sustainable, efficient, and safe mining operations through advanced automation, digital monitoring, and environmental performance tracking that reduce impact and optimize resources.",
            clientsLogos: {
                codelcoLogo: () => import('../assets/clients/codelco.png'),
                rioTintoLogo: () => import('../assets/clients/rio_tinto.png'),
            }
        },
        projectSection: {
            location: "Argentina ",
            sumary: "Unified asset modeling and real-time visibility across distributed field operations",
            info: "Implementation of a centralized asset model in PI System for 25,000+ tags collected through EXEMYS, covering geographically distributed compression units. Hybrid visualization (PI Vision + Ignition) and KPI dashboards were developed to support daily operations, trend analysis, and management decision-making.",
            technicalItems: [
                "Full Asset Framework model for the entire compression fleet",
                "PI Data Archive historization for all process variables",
                "Hybrid visualization: PI Vision + Ignition",
                "Remote queries via PI DAS – RTQP (MySQL)",
                "Customized PI Web API integration",
                "Interfacing with ARIEL compressor software",
                "Unified monitoring for Caterpillar, Waukesha, and other OEMs",
                "Standardized KPIs, analytics and operational dashboards"
            ],
            img: () => import('../assets/Backgrounds/project_mining.jpg'),
            companyLogo: () => import('../assets/clients/enerflex.png'),
        }
    },
    pharmaceuticals: {
        hero: {
            title: <>Pharma<br className="md:hidden" />ceuticals
            </>,
            img: () => import('../assets/Backgrounds/hero_pharmaceuticals.png'),
        },
        clientsSection: {
            title: "An emerging universe with strict laws of motion—traceability, accuracy, and real-time compliance.",
            info: "An emerging universe with strict laws of motion—traceability, accuracy, and real-time compliance.",
            clientsLogos: {
                bayerLogo: () => import('../assets/clients/bayer.png'),
                bagoLogo: () => import('../assets/clients/bago.png'),
            }
        },
        projectSection: {
            location: "Cañuelas, Argentina:",
            sumary: "Unified asset modeling and real-time visibility across distributed field operations",
            info: "Industrial Automation Upgrade – Oil Processing Unit Advanced diagnostics, system enhancement, and control optimization using FactoryLink SCADA and Mystic (OPTO 22 / Intellution) controllers.Performed comprehensive diagnostic, optimization, and maintenance activities within the Oil Section of one of Argentina’s most important agro-industrial facilities. Worked extensively with FactoryLink SCADA development tools and Mystic controllers (OPTO 22 / Intellution) to enhance system stability, refine process logic, and modernize key automation functionalities.\n \nThe role involved deep troubleshooting, reverse engineering of legacy configurations, and deploying improvements that increased operational reliability and ensured consistent production performance. Collaboration with plant engineers and maintenance teams was essential to integrate upgrades seamlessly into live operations without disrupting critical process flows.",
            technicalItems: [],
            img: () => import('../assets/Backgrounds/project_pharmaceuticals.png'),
            companyLogo: () => import('../assets/clients/molinos.png'),
        }
    }

    // otras 3 industrias
}