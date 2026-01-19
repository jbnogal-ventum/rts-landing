// // components/Button.jsx
// import * as React from "react"
// import { cva } from "class-variance-authority"
// import { cn } from "@/lib/utils" // Asegúrate de tener esta utilidad
// import { motion, AnimatePresence } from "framer-motion"

// // Versión SIMPLE y DIRECTA (RECOMENDADA)
// const buttonVariantsSimple = cva(
//   "inline-flex items-center justify-center font-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none",
//   {
//     variants: {
//       variant: {
//         // DARK
//         "filled-dark": "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-disabled py-2 px-3",
//         "outlined-dark": "bg-transparent text-text-primary border border-border-subtle-selected rounded-md hover:bg-background-inverse hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
//         "text-dark": "bg-transparent text-text-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive  disabled:text-text-disabled py-2 px-3",
//         "carruselLeft-dark": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
//         "carruselRight-dark": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        
//         // LIGHT  
//         "filled-light": "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-inverse-disabled disabled:text-text-on-white-disabled py-2 px-3",
//         "outlined-light": "bg-transparent text-text-on-white-primary border border-border-inverse rounded-md hover:bg-background-inverse-hover hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
//         "text-light": "bg-transparent text-text-on-white-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-on-white-disabled py-2 px-3",
//         "carruselLeft-light": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
//         "carruselRight-light": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
//       },
//       // Tamaños extra (opcional)
//       size: {
//         default: "",
//         sm: "py-1 px-2 text-body-sm",
//         lg: "py-3 px-4 text-body-lg",
//       },
//     },
//     defaultVariants: {
//       variant: "filled-dark",
//       size: "default",
//     },
//   }
// )

// // Componente principal
// const Button = React.forwardRef(({
//   className,
//   variant = "filled-dark",
//   size = "default",
//   mode, // Mantenemos por compatibilidad
//   asChild = false,
//   children,
//   ...props
// }, ref) => {
  
//   // Si se usa el modo antiguo (variant + mode), convertimos
//   let finalVariant = variant;
//   if (mode && !variant.includes('-')) {
//     // Ej: variant="filled", mode="light" → "filled-light"
//     finalVariant = `${variant}-${mode}`;
//   }
  
//   const Comp = asChild ? Slot : "button"
  
//   return (
//     <Comp
//       className={cn(
//         buttonVariantsSimple({ variant: finalVariant, size, className })
//       )}
//       ref={ref}
//       {...props}
//     >
//       {children}
//     </Comp>
//   )
// })

// Button.displayName = "Button"

// // Componentes predefinidos para uso fácil
// export const ButtonFilled = (props) => <Button variant="filled-dark" {...props} />
// export const ButtonOutlined = (props) => <Button variant="outlined-dark" {...props} />
// export const ButtonText = (props) => <Button variant="text-dark" {...props} />
// export const ButtonCarruselLeft = (props) => <Button variant="carruselLeft-dark" {...props} />

// export const ButtonFilledLight = (props) => <Button variant="filled-light" {...props} />
// export const ButtonOutlinedLight = (props) => <Button variant="outlined-light" {...props} />
// export const ButtonTextLight = (props) => <Button variant="text-light" {...props} />
// export const ButtonCarruselLeftLight = (props) => <Button variant="carruselLeft-light" {...props} />

// // Exportar todo
// export { Button, buttonVariantsSimple as buttonVariants }
// components/Button.jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Versión con animaciones
const buttonVariants = cva(
  "inline-flex items-center justify-center font-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none relative overflow-hidden",
  {
    variants: {
      variant: {
        // DARK
        "filled-dark": "bg-background-interactive text-text-primary rounded-md disabled:bg-background-disabled py-2 px-3",
        "outlined-dark": "bg-transparent text-text-primary border border-border-subtle-selected rounded-md hover:bg-background-inverse hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
        "text-dark": "bg-transparent text-text-primary relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive disabled:text-text-disabled py-2 px-3",
        "carruselLeft-dark": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        "carruselRight-dark": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        
        // LIGHT  
        "filled-light": "bg-background-interactive text-text-primary rounded-md disabled:bg-background-inverse-disabled disabled:text-text-on-white-disabled py-2 px-3",
        "outlined-light": "bg-transparent text-text-on-white-primary border border-border-inverse rounded-md hover:bg-background-inverse-hover hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
        "text-light": "bg-transparent text-text-on-white-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-on-white-disabled py-2 px-3",
        "carruselLeft-light": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        "carruselRight-light": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
      },
      size: {
        default: "",
        sm: "py-1 px-2 text-body-sm",
        lg: "py-3 px-4 text-body-lg",
      },
    },
    defaultVariants: {
      variant: "filled-dark",
      size: "default",
    },
  }
)

// Colores de hover para cada variante
const hoverColors = {
  "filled-dark": "bg-background-hover",
  "filled-light": "bg-background-hover",
}

const Button = React.forwardRef(({
  className,
  variant = "filled-dark",
  size = "default",
  mode,
  asChild = false,
  children,
  ...props
}, ref) => {
  
  // Si se usa el modo antiguo (variant + mode), convertimos
  let finalVariant = variant;
  if (mode && !variant.includes('-')) {
    finalVariant = `${variant}-${mode}`;
  }
  
  // Estado para controlar la animación
  const [isHovered, setIsHovered] = React.useState(false);
  const [showNewText, setShowNewText] = React.useState(false);
  
  // Manejar el hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Después de que comience la animación del círculo, mostramos el nuevo texto
    setTimeout(() => setShowNewText(true), 100);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowNewText(false);
  };
  
  const Comp = asChild ? Slot : "button";
  
  // Solo aplicamos animación a filled-dark y filled-light
  const isAnimatedVariant = finalVariant === "filled-dark" || finalVariant === "filled-light";
  const hoverColor = hoverColors[finalVariant];
  
  if (!isAnimatedVariant || !hoverColor) {
    // Para variantes sin animación especial
    return (
      <Comp
        className={cn(
          buttonVariants({ variant: finalVariant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
  
  return (
    <Comp
      className={cn(
        buttonVariants({ variant: finalVariant, size, className })
      )}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Capa del círculo que se expande desde abajo */}
      {isAnimatedVariant && (
        <motion.div
          className={`absolute inset-0 ${hoverColor} rounded-full`}
          initial={{ scale: 0, borderRadius: "9999px", y: "100%" }}
          animate={{
            scale: isHovered ? 2 : 0,
            y: isHovered ? "0%" : "100%",
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          style={{
            transformOrigin: "center bottom",
          }}
        />
      )}
      
      {/* Contenedor del texto con overflow hidden */}
      <div className="relative z-10 overflow-hidden h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* Texto original - sale hacia arriba */}
          {!showNewText && (
            <motion.span
              key="original-text"
              initial={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -15,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="inline-block"
            >
              {children}
            </motion.span>
          )}
          
          {/* Texto "nuevo" - entra desde abajo */}
          {showNewText && (
            <motion.span
              key="hover-text"
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              exit={{
                opacity: 0,
                y: -15,
                transition: { duration: 0.2, delay: 0.1 }
              }}
              className="inline-block"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Comp>
  );
});

Button.displayName = "Button";

// Componentes predefinidos
export const ButtonFilled = (props) => <Button variant="filled-dark" {...props} />;
export const ButtonOutlined = (props) => <Button variant="outlined-dark" {...props} />;
export const ButtonText = (props) => <Button variant="text-dark" {...props} />;
export const ButtonCarruselLeft = (props) => <Button variant="carruselLeft-dark" {...props} />;

export const ButtonFilledLight = (props) => <Button variant="filled-light" {...props} />;
export const ButtonOutlinedLight = (props) => <Button variant="outlined-light" {...props} />;
export const ButtonTextLight = (props) => <Button variant="text-light" {...props} />;
export const ButtonCarruselLeftLight = (props) => <Button variant="carruselLeft-light" {...props} />;

export { Button, buttonVariants };