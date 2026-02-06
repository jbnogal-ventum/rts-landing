import { useEffect, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { Typography, Button } from "../../index";
import { useNavigate } from "react-router-dom";
export default function HeroHomePage({ onPhase }) {
  const navigate = useNavigate();
  const heroHomeSectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroHomeSectionRef
  });
  // Ajusta los arrays para tener la misma cantidad de elementos
  // Usa 7 puntos para 5 paneles
  const opacityRange = [0, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

  // Todos los arrays deben tener 7 valores
  const opacityRangePannel1 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];    // Visible de 0 a 20%
  const opacityRangePannel2 = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0];    // Visible de 20% a 40%
  const opacityRangePannel3 = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0];    // Visible de 40% a 60%
  const opacityRangePannel4 = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0];    // Visible de 60% a 80%
  const opacityRangePannel5 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1];    // Visible de 80% a 100%

  const opacityPannel1 = useTransform(scrollYProgress, opacityRange, opacityRangePannel1);
  const opacityPannel2 = useTransform(scrollYProgress, opacityRange, opacityRangePannel2);
  const opacityPannel3 = useTransform(scrollYProgress, opacityRange, opacityRangePannel3);
  const opacityPannel4 = useTransform(scrollYProgress, opacityRange, opacityRangePannel4);
  const opacityPannel5 = useTransform(scrollYProgress, opacityRange, opacityRangePannel5);

  // Mejora las animaciones Y para que sean reversibles
  const yOffsetPannel1 = useTransform(scrollYProgress, [0, 0.1, 0.2,1], ["0px", "-50px", "0px", "0px"]);
  const yOffsetPannel2 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.4, 1], ["0px", "20px", "0px", "-50px", "0px"]);
  const yOffsetPannel3 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], ["0px", "0px", "0px", "30px", '0px', "0px", "0px", "0px", "0px", "0px"]);

  return (
    <section id="hero-home-section" className="relative w-full h-[1000vh] " ref={heroHomeSectionRef}>
      <div className="sticky top-0 h-screen bg-gradient-to-b from-transparent via-transparent to-background-primary ">

        <div className="flex items-center justify-center overflow-hidden ">
          <div className=" flex flex-col gap-4">


            {/* Contenedor para ambos paneles (uno sobre otro) */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-3 md:px-7">
              {/* Panel 1 */}
              <motion.div
                id='panel1'
                className=" w-full absolute overflow-hidden"
                style={{
                  opacity: opacityPannel1,
                  y: yOffsetPannel1
                }}
              >
                <div className="flex flex-col gap-9 md:gap-4 w-full h-screen py-9 px-3 md:px-7 mt-9">

                  <Typography variant="display-sm" className="md:text-display-lg md:pr-9 ">
                    SPARK INDUSTRIAL<br/>BRILLANCE
                  </Typography>

                  <div className="w-full justify-items-end text-text-secondary pb-9">
                    <Typography variant="body-md" className="md:text-title-body font-base w-3/4 lg:w-2/5 ">
                      — We merge decades of OT expertise with cutting-edge IT innovation to empower industries with smarter, more efficient, and connected operations.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Panel 2 */}
              <motion.div
                id='panel2'
                className=" w-full absolute"
                style={{
                  opacity: opacityPannel2,
                  y: yOffsetPannel2
                }}
              >
                <div className="flex flex-col  gap-4 w-full md:w-3/5 h-screen py-9 pl-3 pr-3 md:pl-7 md:pr-0 mt-9">
                  <Typography variant="subtitle-medium" className=" hidden md:block">
                    THE APPROACH
                  </Typography>
                  <Typography variant="headline-small" className="text-headline-medium ">
                    EVERY PROJECT BEGINS<br className="hidden lg:block" /> INSIDE A LIVING ECOSYSTEM <br className='hidden lg:block' />OF EXPERTISE
                  </Typography>

                  <div className="w-full justify-items-end text-text-secondary ">
                    <Typography variant="body-md" className="md:text-title-body font-base w-3/4 ">
                      — Three departments working as one to <br className='hidden lg:block' />shape, implement, and evolve the technologies <br className='hidden lg:block' />that move modern industry forward.
                    </Typography>
                  </div>
                </div>
              </motion.div>

              {/* Panel 3 */}
              <motion.div
                id='panel3'
                className=" w-full absolute overflow-hidden"
                style={{
                  opacity: opacityPannel3,
                  y: yOffsetPannel3
                 
                }}
              >
                <div className="flex flex-col  gap-6 w-full md:w-3/5 h-screen py-9 pl-3 pr-3 md:pl-7 md:pr-0 mt-9">
                  <div className="flex flex-row gap-5 mt-9 pt-6 md:pt-0 md:mt-0">
                    <Typography variant="subtitle-medium" className="">
                      OUR DEPARTMENTS
                    </Typography>
                    <div className="flex flex-row gap-3">
                      <Typography variant="subtitle-medium" className=" font-bold">
                        — 01
                      </Typography>
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        02
                      </Typography>
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        03
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="headline-small" className="text-headline-medium ">
                    AUTOMATION <br className="" />& CONTROLS
                  </Typography>

                  <div className="w-full  text-text-secondary ">
                    <div className="flex flex-col gap-2">
                      <Typography variant="body-md" className="md:text-title-body font-base ">
                        We specialize in developing, integrating, building, <br className='' />and analyzing  end-to-end systems to meet the <br className='' />unique automation needs of our clients.
                      </Typography>
                      <Typography variant="body-md" className="md:hidden ">
                        Within this department, we have a specialized Honeywell Elite Team dedicated exclusively to supporting companies implementing Honeywell-based hardware and control systems.
                      </Typography>
                    </div>
                  </div>

                  <Button variant="filled-light" className="" children="Our approach" onClick={() => navigate("/automation-controls")} />
                </div>
              </motion.div>

              {/* Panel 4 */}
              <motion.div
                id='panel4'
                className=" w-full absolute overflow-hidden"
                style={{
                  opacity: opacityPannel4,
                }}
              >
                <div className="flex flex-col  gap-6 w-full md:w-3/5 h-screen py-9 pl-3 pr-3 md:pl-7 md:pr-0 mt-9">
                  <div className="flex flex-row gap-5  mt-9  pt-6 md:pt-0 md:mt-0">
                    <Typography variant="subtitle-medium" className="">
                      OUR DEPARTMENTS
                    </Typography>
                    <div className="flex flex-row gap-3">
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        01
                      </Typography>
                      <Typography variant="subtitle-medium" className=" font-bold">
                        — 02
                      </Typography>
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        03
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="headline-small" className="text-headline-medium ">
                    DIGITAL SKILLS
                  </Typography>

                  <div className="w-full  text-text-secondary ">
                    <Typography variant="body-md" className="md:text-title-body font-base ">
                      In the RTS ecosystem, Digital Skills turns industrial data into actionable intelligence. Through our POD Services framework,  we merge OT experience, process knowledge, and computer  science to engineer <br className='' />the digital core of industrial operations.
                    </Typography>
                  </div>

                  <Button variant="filled-light" className="" children="Our approach" onClick={() => navigate("/digital")} />
                </div>
              </motion.div>


              {/* Panel 5 */}
              <motion.div
                id='panel5'
                className=" w-full absolute overflow-hidden bg-gradient-to-b from-transparent via-transparent to-background-primary"
                style={{
                  opacity: opacityPannel5,
                }}
              >
                <div className="flex flex-col  gap-6 w-full md:w-3/5 h-screen py-9 pl-3 pr-3 md:pl-7 md:pr-0 mt-9">
                  <div className="flex flex-row gap-5  mt-9  pt-6 md:pt-0 md:mt-0">
                    <Typography variant="subtitle-medium" className="">
                      OUR DEPARTMENTS
                    </Typography>
                    <div className="flex flex-row gap-3">
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        01
                      </Typography>
                      <Typography variant="subtitle-medium" className=" text-text-on-white-disabled">
                        02
                      </Typography>
                      <Typography variant="subtitle-medium" className=" font-bold">
                        — 03
                      </Typography>
                    </div>
                  </div>

                  <Typography variant="headline-small" className="text-headline-medium ">
                    ENERGY <br className="" />& INFRASTRUCTURE
                  </Typography>

                  <div className="w-full  text-text-secondary ">
                    <Typography variant="body-md" className="md:text-title-body font-base ">
                      Our mission is to provide innovative, efficient, and reliable energy and infrastructure solutions that enhance operational performance, ensure sustainability, and drive industrial progress.
                    </Typography>
                  </div>

                  <Button variant="filled-light" className="" children="Our approach" onClick={() => navigate("/energy")} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}