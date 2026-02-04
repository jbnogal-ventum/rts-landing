

import { Typography, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";



function ActionButton({ label, href, onClick, variant = "filled-dark", download }) {
  const navigate = useNavigate();

  if (href) {
    return (
      <Button variant={variant} onClick={() => {
        if (href.startsWith("http")) {
          window.open(href, "_blank");
        } else {
          navigate(href);
        }
      }} download={download}
        className='w-fit'>
        {label}
      </Button>
    );
  }

  return (
    <Button onClick={onClick} variant={variant} className='w-fit' >
      {label}
    </Button>
  );
}

export default function Banner({
  backgroundImage,
  backgroundPosition = "top-center",

  titleDesktop,
  titleMobile,
  bodyDesktop,
  bodyMobile,

  buttons = [],
  start = "top 85%",

  variantDesktop = 'headline-medium',
  variantMobile = 'headline-small',

  variantBody = "body-lg",
  variantBodyMobile = "body-lg",

  actionsDirection = "row",
  overlay = 0,
}) {

  return (
    <section className={`relative min-h-[600px]`}>
      {/* Contenedor para la imagen de fondo - FONDO COMPLETO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImage && (
          <div
            className={`absolute inset-0 bg-cover  bg-no-repeat bg-${backgroundPosition}`}
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Overlay */}
        {!!overlay && (
          <div
            className="absolute inset-0 bg-background-primary"
            style={{
              opacity: overlay / 100, // Convertir 50 a 0.5
              zIndex: 1
            }}
          />
        )}
      </div>


      {/* Contenido (texto y botones) */}
      <div className="relative z-10 min-h-[600px] flex flex-col items-center justify-center">
        <div className="py-9 px-3 md:px-7 flex flex-col gap-6 " >
          <div className="text-center text-text-primary flex flex-col gap-2">
            <Typography variant={variantDesktop} children={titleDesktop} className="hidden md:block" />
            <Typography variant={variantMobile} children={titleMobile ?? titleDesktop} className="md:hidden " />


            {(bodyDesktop) && (
              <Typography variant={variantBody} children={bodyDesktop} className="hidden md:block" />)
            }

            {(bodyMobile || bodyDesktop) && (
              <Typography variant={variantBodyMobile} children={bodyMobile ?? bodyDesktop} className="block md:hidden" />
            )}
          </div>



          {buttons?.length > 0 && (
            <div className=" w-full flex flex-col items-center " >
              <div className="flex flex-col gap-3 items-center w-fit">
              {buttons.map((b, idx) => (
                
                <Button key={`button-${idx}-${b.label}`} {...b} />
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

