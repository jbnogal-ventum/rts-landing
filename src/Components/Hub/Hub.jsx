import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import CardHub from "../UI/CardHub";
import ApproachButton from "../UI/ApproachButton";
import { cn } from "../../lib/utils";

import iconInnovation from "../../assets/hub/icon1.png";
import iconAcademy from "../../assets/hub/icon1.png";
import iconBTL from "../../assets/hub/icon1.png";

import imgInnovation from "../../assets/hub/innovation.png";
import imgAcademy from "../../assets/hub/academy.png";
import imgBTL from "../../assets/hub/below.png";

export default function Hub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const cardData = [
    {
      title: "BELOW THE LINE",
      icon: iconBTL,
      image: imgBTL,
      description:
        "Below-the-line powerhouse — a creative and experiential unit where ideas meet industry.",
      descriptionLight:
        "Through initiatives like Rocking the Industry and the Data-Driven LAB, we go beyond traditional services to spark interaction, collaboration, and thought leadership.",
    },
    {
      title: "ACADEMY",
      icon: iconAcademy,
      image: imgAcademy,
      description:
        "Dedicated to advancing technical skills and knowledge in industrial automation, OT/IT convergence, and analytics.",
      descriptionLight:
        "It serves as a center of excellence both for our internal teams and for clients, helping professionals stay ahead in a rapidly evolving industry.",
    },
    {
      title: "INNOVATION LAB",
      icon: iconInnovation,
      image: imgInnovation,
      description:
        "Is more than a testing ground — it is a laboratory of ideas and execution where we develop new technologies.",
      descriptionLight:
        "Here, we develop new technologies, provide industrial tech consulting, and design pilot projects that bring innovation into real practice.",
    },
  ];

  // Animaciones de entrada
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] // power3.out
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#ebeef0] pt-10vh"
      id="hub"
    >
      <motion.div
        className={cn(
          "relative z-20 mt-6vh mx-desktop",
          "flex items-center justify-between gap-6",
          "mr-[10%]"
        )}
        variants={headerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex-1">
          {/* Desktop */}
          <h2 className="hidden md:block font-display headline-medium leading-[110%]">
            <span className="text-gradient">RTS HUB</span> IS OUR LABORATORY
            <br />
            OF IDEAS AND EXECUTION
          </h2>

          {/* Mobile */}
          <h2 className="md:hidden font-display headline-small leading-[110%]">
            <span className="text-gradient">RTS HUB</span> IS OUR LABORATORY
            <br />
            OF IDEAS AND EXECUTION
          </h2>
        </div>

        <div className="hidden xl:flex">
          <ApproachButton label="Learn more" href="#approach" />
        </div>
      </motion.div>

      <motion.div
        className={cn(
          "relative mt-10vh mx-desktop",
          "flex flex-col gap-8",
          "w-[calc(100%-var(--margin-desktop)*2)]"
        )}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {cardData.map((item, index) => (
          <motion.div
            key={index}
            className="relative w-full"
            variants={cardVariants}
            style={{ zIndex: cardData.length - index }}
          >
            <CardHub {...item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}