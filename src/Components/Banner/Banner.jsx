
import "./Banner.css";
import { Typography, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";



function ActionButton({ label, href, onClick, variant = "filled-dark", download }) {
  const navigate = useNavigate();
  const className = `banner-cta banner-cta--${variant}`;

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
  variant = "image",
  backgroundImage,

  titleDesktop,
  titleMobile,
  bodyDesktop,
  bodyMobile,

  buttons = [],
  start = "top 85%",

  variantDesktop = 'headline-medium',
  variantMobile = 'headline-small',

  bodyClassName = "body-lg",
  bodyMobileClassName = "body-lg",

  actionsDirection = "row",
  overlay = 0,
}) {

  return (
    <section className={`relative min-h-[600px]`}>
      {/* Contenedor para la imagen de fondo - FONDO COMPLETO */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat'
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
          <h2 className="text-center text-text-primary">
            <span className={`hidden md:block`}>
              <Typography variant={variantDesktop} children={titleDesktop} />
            </span>

            <span className={`block md:hidden`}>
              <Typography variant={variantMobile} children={titleMobile} />
            </span>
          </h2>

          {(bodyDesktop || bodyMobile) && (
            <p className="banner-body">
              <span className={`banner-bodyDesktop desktop ${bodyClassName}`}>
                <Multiline text={bodyDesktop} />
              </span>

              <span className={`banner-bodyMobile mobile ${bodyMobileClassName}`}>
                <Multiline text={bodyMobile ?? bodyDesktop} />
              </span>
            </p>
          )}

          {buttons?.length > 0 && (
            <div className="flex flex-col gap-3 items-center" >
              {buttons.map((b, idx) => (
                <ActionButton key={idx} {...b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

