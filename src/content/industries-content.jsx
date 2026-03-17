
// src/content/industries-content.js
export const industriesContent = {
    oilgas: {
        hero: {
            title: "Oil & Gas",
            img: () => import('../assets/Backgrounds/hero_oilgas.webp'),
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
        projectSection: [{
            label: "Downstream",
            sumary: "Maximizing operational insight through PI System & advanced analytics",
            location: "PAE Argentina",
            info: "Development of advanced PI System solutions for specialized visualization and deep analytics in downstream operations. Work included custom PI Vision symbols, angular vs. depth visual analysis, and the implementation of advanced analytics and machine learning models in Seeq to optimize critical process variables and maintenance strategies.",
            technicalItems: [
                "Custom PI Vision symbols (Java / HTML)",
                "Advanced analytics in Seeq (Hexane Dry Point, TMT inference, catalytic activity monitoring)",
                "Machine Learning applied to process optimization",
                "Integration across PI System, Honeywell PHD, and Seeq",
                "Automated reporting via Seeq Organizer",
                "Time–depth data transformation to enhance decision-making",
            ],
            img: () => import('../assets/Backgrounds/project_oilgas_1.webp'),
            companyLogo: null,//() => import('../assets/clients/ypf.png'),
        },
        {
            label: "Midstream",
            location: "Argentina",
            sumary: "Unified asset modeling and real-time visibility across distributed field operations",
            info: "Implementation of a centralized asset model in PI System for 25,000+ tags collected through EXEMYS, covering geographically distributed compression units. Hybrid visualization (PI Vision + Ignition) and KPI dashboards were developed to support daily operations, trend analysis, and management decision-making.",
            technicalItems: [
                "Full Asset Framework model for the entire compression fleet",
                "PI Data Archive historization for all process variables",
                "Hybrid visualization: PI Vision + Ignition",
                "Remote queries via PI DAS – RTQP (MySQL)",
                "ACustomized PI Web API integration",
                "Unified monitoring for Caterpillar, Waukesha, and other OEMs",
                "Standardized KPIs, analytics and operational dashboards"
            ],
            img: () => import('../assets/Backgrounds/project_oilgas_2.webp'),
     
            companyLogo: () => import('../assets/clients/enerflex.png'),
        },
        {
                label: "Upstream",
            location: "Argentina – Sierras Blancas, CASO, Cruz de Lorena, Bajada de Añelo",
            sumary: "PI System governance, advanced analytics, and remote operations enablement",
            info: "End-to-end PI System and Data Analytics support for Shell’s upstream operations. The project included the commissioning of the ROC (Remote Operations Center), AF structuring, migration and optimization of 450+ PI Vision displays, and data reliability work for future predictive maintenance initiatives.",
            technicalItems: [
                 "ROC (Remote Operation Control) enablement AF hierarchy structuring and template development",
                "Migration and optimization of 450+ PI Vision screens",
                "Standardization across Facilities and WellPads",
                "PI System + Seeq integration within the Data-Driven POD",
                "Data reliability and validation for critical assets",
                "Technical review of databoooks, alarm catalogs, Modbus tables",
                "Technical reports supporting future predictive maintenance"
            ],
            img: () => import('../assets/Backgrounds/project_oilgas_3.webp'),
            companyLogo: () => import('../assets/clients/shell.png'),
        }
        ]
    },
    power: {
        hero: {
            title: "Power generation",
            img: () => import('../assets/Backgrounds/hero_power.webp'),
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
        projectSection: [{
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
            img: () => import('../assets/Backgrounds/project_power.webp'),
            objectPosition: "top",
            companyLogo: () => import('../assets/clients/centralPuerto.png'),
        }]
    },
    chemicals: {
        hero: {
            title: "Chemicals & Petrochemicals",
            img: () => import('../assets/Backgrounds/hero_chemicals.webp'),
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
        projectSection: [{
            location: "Poliresinas – San Luis, Argentina",
            sumary: "Long-Term Honeywell DCS Operations & Maintenance",
            info: "RTS has delivered long-term contracts for the comprehensive operation and maintenance of Honeywell control systems, including Distributed Control Systems (DCS) and associated platforms, in continuous process and mission-critical environments. \n\nOur service integrates preventive, corrective, and predictive maintenance with advanced technical analysis, system health monitoring, and full lifecycle management of the control platform.",
            technicalItems: [
                "Maximizing DCS availability and operational reliability",
                "Anticipating system degradation and preventing failures",
                "Reducing unplanned shutdowns and critical events",
                "Protecting industrial assets and ensuring process stability",
                "With more than a decade sustaining critical operations, RTS has established itself as a specialized Honeywell technology partner, combining deep industrial process knowledge with a strong commitment to operational continuity.",

            ],
            img: () => import('../assets/Backgrounds/project_chemicals.webp'),
            companyLogo: null,//() => import('../assets/clients/shell.png'),
        }]
    },
    pulpPaper: {
        hero: {
            title: "Pulp & Paper",
            img: () => import('../assets/Backgrounds/hero_pulp.webp'),
        },
        clientsSection: {
            title: "Heavily industrial terrain requiring resilient networks and smooth modernization paths.",
            info: "We support sustainable pulp and paper production through automation, energy optimization, and process digitalization — driving efficiency, circularity, and lower environmental impact.",
            clientsLogos: {
                enceLogo: () => import('../assets/clients/ence.png'),
                upmLogo: () => import('../assets/clients/upm.png'),
            }
        },
        projectSection: [{
            label: "Botnia",
            location: "Argentina – Sierras Blancas",
            sumary: "Full DCS program management & commissioning at one  of latin america’s largest pulp mills.",
            info: "RTS played a strategic and mission-critical role in the development of the BOTNIA pulp mill, a flagship facility in the region.",
            technicalItems: [
                "Led a 25 elite RTS team, providing project management, technical leadership, and execution across the entire DCS deployment",
                "Delivered full configuration of the Honeywell Experion PKS R301 system, ensuring seamless integration across all plant areas.",
                "Conducted comprehensive FAT, SAT, loop-checking, and hot commissioning, minimizing plant downtime and ensuring a stable production startup.",
                "Acted as a technical bridge between the client, EPCs, and technology suppliers—RTS became the operational backbone of the automation environment.",
                "Ensured operational reliability, safety, and alignment with global pulp-and-paper best practices."
            ],
            img: () => import('../assets/Backgrounds/project_pulp_1.webp'),
            companyLogo: null,//() => import('../assets/clients/honeywell.png'),
        },
        {
            label: "UPM",
            location: "UPM (Finland & Uruguay)",
            sumary: "Advanced DCS Integration in Two of the World’s Most High-Tech Pulp Mills",
            info: "RTS contributed engineering expertise to UPM/Metso Botnia facilities in Finland (Varkaus) and Uruguay, both recognized as benchmark plants in the global pulp industry. These projects demonstrate that RTS performs successfully within top-tier global industrial ecosystems, integrating complex systems and aligning with international engineering norms.",
            technicalItems: [
                "Provided advanced integration and engineering services on Honeywell systems in environments with extreme quality, safety, and performance requirements.",
                "Worked under European engineering methodologies, ensuring compliance with rigorous industrial and environmental standards.",
                "Delivered configuration, database management, process graphics, communication setup, and on-site validation.",
                "Supported commissioning and operational readiness with a strong focus on availability, reliability, and long-term maintainability.",
                "Ensured operational reliability, safety, and alignment with global pulp-and-paper best practices."

            ],
            img: () => import('../assets/Backgrounds/project_pulp_2.webp'),
            objectPosition: "top",
            companyLogo: null,//() => import('../assets/clients/upm.png'),
        }
        ]
    },
    mining: {
        hero: {
            title: "Metals & Mining",
            img: () => import('../assets/Backgrounds/hero_mining.webp'),
        },
        clientsSection: {
            title: "Harsh environments and remote locations—requiring diagnostics that go deep and networks that endure.",
            info: "We enable sustainable, efficient, and safe mining operations through advanced automation, digital monitoring, and environmental performance tracking that reduce impact and optimize resources.",
            clientsLogos: {
                codelcoLogo: () => import('../assets/clients/codelco.png'),
                rioTintoLogo: () => import('../assets/clients/rio_tinto.png'),
            }
        },
        projectSection: [
            {
                label: "Flotation cells",
                location: "CODELCO – Santiago, Chile",
                sumary: "New Outokumpu Flotation Cells Integration",
                info: "RTS led the control strategy development and advanced visualization configuration for the integration of new Outokumpu flotation cells within one of the world’s largest underground copper operations.",
                technicalItems: [
                    "Design and implementation of optimized control strategies within Honeywell DCS.",
                    "Engineering and configuration of operator graphics for high-performance visualization.",
                    "Serial interface integration for real-time communication with blower controllers.",
                    "Commissioning and stabilization of the new flotation control architecture.",
                    "The project required deep understanding of mineral processing dynamics, tight integration with legacy control infrastructure, and zero-disruption implementation in a high-demand production environment.",
                ],
                img: () => import('../assets/Backgrounds/project_mining_1.webp'),
                companyLogo: null,//() => import('../assets/clients/codelco.png'),
            },
            {
                label: "Infrastructure",
                location: "CODELCO – Santiago, Chile",
                sumary: "Enterprise Control Access &amp; Monitoring Infrastructure Enhancement",
                info: "RTS executed the modernization and stabilization of CODELCO’s control access and central visualization systems.",
                technicalItems: [
                    "Engineering and deployment of secure control access architecture",
                    "Enhancement of central office visualization and operational monitoring",
                    "Repair and optimization of monitoring system databases",
                    "Reconfiguration and hardening of system architecture to improve reliability and performance",
                    "This engagement strengthened operational transparency, improved system resilience, and ensured reliable data availability for decision-making across critical mining operations."
                ],
                img: () => import('../assets/Backgrounds/project_mining_2.webp'),
                
                companyLogo: null,//() => import('../assets/clients/codelco.png'),
            }
        ]
    },
    pharmaceuticals: {
        hero: {
            title: <span>Pharma<br className="md:hidden" />ceuticals
            </span>,
            img: () => import('../assets/Backgrounds/hero_pharmaceuticals.webp'),
        },
        clientsSection: {
            title: "An emerging universe with strict laws of motion—traceability, accuracy, and real-time compliance.",
            info: "An emerging universe with strict laws of motion—traceability, accuracy, and real-time compliance.",
            clientsLogos: {
                bayerLogo: () => import('../assets/clients/bayer.png'),
                bagoLogo: () => import('../assets/clients/bago.png'),
            }
        },
        projectSection: [
            {
                label: "Wyeth Pharmaceutical",
                location: "Guaynabo, Puerto Rico",
                sumary: "Wyeth Pharmaceutical",
                info: "RTS engineered and configured the environmental control architecture for GMP-regulated pharmaceutical production facilities. \n\nThe project demanded strict environmental stability, compliance alignment, and zero-tolerance operational performance within regulated manufacturing environments",
                technicalItems: [
                    "Cleanroom atmospheric control systems",
                    "Filtration and air handling integration",
                    "Pressure cascade control",
                    "Temperature, airflow, and humidity regulation",
                    "Full Honeywell system configuration and validation support"
                ],
                img: () => import('../assets/Backgrounds/project_pharmaceuticals_1.webp'),
                objectPosition: "top",
                companyLogo: null,//() => import('../assets/clients/molinos.png'),
            },
            {
                label: "Pfizer Argentina",
                location: "Buenos Aires, Argentina",
                sumary: "Pfizer Argentina.",
                info: "Honeywell Control & EBI (Excel 5000) Platform Management. RTS executed configuration, maintenance, and optimization of control and EBI systems based on Honeywell Excel 5000 controllers.",
                technicalItems: [
                    "Database engineering and system configuration",
                    "Control logic development",
                    "Schematic design and documentation",
                    "Continuous operational support in GMP production environments"
                ],
                img: () => import('../assets/Backgrounds/project_pharmaceuticals_2.webp'),
                objectPosition: "top",
                companyLogo: null,//() => import('../assets/clients/molinos.png'),
            },
        ]
    }

    // otras 3 industrias
}