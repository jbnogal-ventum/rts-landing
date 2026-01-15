// components/Button.jsx
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils" // Asegúrate de tener esta utilidad

const buttonVariants = cva(
  // Estilos base que se aplican a TODOS los botones
  "inline-flex items-center justify-center font-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none py-2 px-3",
  {
    variants: {
      variant: {
        // ===== MODE: DARK =====
        filled: "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-disabled",
        outlined: "bg-transparent text-text-primary border border-border-subtle-selected rounded-md hover:bg-background-inverse hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled",
        text: "bg-transparent text-text-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-disabled",
        carruselLeft: "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled",
        
        // ===== MODE: LIGHT =====
        filledLight: "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-inverse-disabled disabled:text-text-on-white-disabled",
        outlinedLight: "bg-transparent text-text-on-white-primary border border-border-inverse rounded-md hover:bg-background-inverse-hover hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled",
        textLight: "bg-transparent text-text-on-white-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-on-white-disabled",
        
        // Carrusel para mode light (si es diferente)
        carruselLeftLight: "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled",
      },
      // Tamaños (si necesitas más opciones)
      size: {
        default: "py-2 px-3 text-body-md",
        sm: "py-1 px-2 text-body-sm",
        lg: "py-3 px-4 text-body-lg",
        icon: "p-2", // Para botones solo con icono
      },
      // Radio de bordes (extra si lo necesitas)
      radius: {
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
        left: "rounded-l-md rounded-r-none",
        right: "rounded-r-md rounded-l-none",
      },
    },
    // Variantes por defecto
    defaultVariants: {
      variant: "filled",
      size: "default",
      radius: "md",
    },
  }
)

// O si prefieres separar mode como prop aparte:
const buttonVariantsWithMode = cva(
  "inline-flex items-center justify-center font-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none py-2 px-3",
  {
    variants: {
      variant: {
        filled: "rounded-md",
        outlined: "bg-transparent border rounded-md",
        text: "bg-transparent rounded-md relative",
        carruselLeft: "rounded-l-md rounded-r-none border-r-0",
      },
      mode: {
        dark: "",
        light: "",
      },
      size: {
        default: "py-2 px-3 text-body-md",
        sm: "py-1 px-2 text-body-sm",
        lg: "py-3 px-4 text-body-lg",
      },
    },
    // Esto es más complejo, mejor usar la primera opción
    compoundVariants: [
      // Dark mode
      { variant: "filled", mode: "dark", className: "bg-background-interactive text-text-primary hover:bg-background-hover disabled:bg-background-disabled" },
      { variant: "outlined", mode: "dark", className: "text-text-primary border-border-subtle-selected hover:bg-background-inverse hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled" },
      { variant: "text", mode: "dark", className: "text-text-primary hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-disabled" },
      { variant: "carruselLeft", mode: "dark", className: "bg-assistant-hover text-background-white hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled" },
      
      // Light mode
      { variant: "filled", mode: "light", className: "bg-background-interactive text-text-primary hover:bg-background-hover disabled:bg-background-inverse-disabled disabled:text-text-on-white-disabled" },
      { variant: "outlined", mode: "light", className: "text-text-on-white-primary border-border-inverse hover:bg-background-inverse-hover hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled" },
      { variant: "text", mode: "light", className: "text-text-on-white-primary hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-on-white-disabled" },
      { variant: "carruselLeft", mode: "light", className: "bg-assistant-hover text-background-white hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled" },
    ],
    defaultVariants: {
      variant: "filled",
      mode: "dark",
      size: "default",
    },
  }
)

// Versión SIMPLE y DIRECTA (RECOMENDADA)
const buttonVariantsSimple = cva(
  "inline-flex items-center justify-center font-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-border-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // DARK
        "filled-dark": "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-disabled py-2 px-3",
        "outlined-dark": "bg-transparent text-text-primary border border-border-subtle-selected rounded-md hover:bg-background-inverse hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
        "text-dark": "bg-transparent text-text-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive  disabled:text-text-disabled py-2 px-3",
        "carruselLeft-dark": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        "carruselRight-dark": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        
        // LIGHT  
        "filled-light": "bg-background-interactive text-text-primary rounded-md hover:bg-background-hover disabled:bg-background-inverse-disabled disabled:text-text-on-white-disabled py-2 px-3",
        "outlined-light": "bg-transparent text-text-on-white-primary border border-border-inverse rounded-md hover:bg-background-inverse-hover hover:text-text-on-white-primary disabled:text-text-disabled disabled:border-border-disabled py-2 px-3",
        "text-light": "bg-transparent text-text-on-white-primary rounded-md relative hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-border-interactive hover:after:rounded-full disabled:text-text-on-white-disabled py-2 px-3",
        "carruselLeft-light": "bg-assistant-hover text-background-white rounded-l-md rounded-r-none border-r-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
        "carruselRight-light": "bg-assistant-hover text-background-white rounded-r-md rounded-l-none border-l-0 hover:bg-assistant-prompt hover:text-background-inverse disabled:bg-assistant-background disabled:text-background-disabled py-2 px-3",
      },
      // Tamaños extra (opcional)
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

// Componente principal
const Button = React.forwardRef(({
  className,
  variant = "filled-dark",
  size = "default",
  mode, // Mantenemos por compatibilidad
  asChild = false,
  children,
  ...props
}, ref) => {
  
  // Si se usa el modo antiguo (variant + mode), convertimos
  let finalVariant = variant;
  if (mode && !variant.includes('-')) {
    // Ej: variant="filled", mode="light" → "filled-light"
    finalVariant = `${variant}-${mode}`;
  }
  
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      className={cn(
        buttonVariantsSimple({ variant: finalVariant, size, className })
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  )
})

Button.displayName = "Button"

// Componentes predefinidos para uso fácil
export const ButtonFilled = (props) => <Button variant="filled-dark" {...props} />
export const ButtonOutlined = (props) => <Button variant="outlined-dark" {...props} />
export const ButtonText = (props) => <Button variant="text-dark" {...props} />
export const ButtonCarruselLeft = (props) => <Button variant="carruselLeft-dark" {...props} />

export const ButtonFilledLight = (props) => <Button variant="filled-light" {...props} />
export const ButtonOutlinedLight = (props) => <Button variant="outlined-light" {...props} />
export const ButtonTextLight = (props) => <Button variant="text-light" {...props} />
export const ButtonCarruselLeftLight = (props) => <Button variant="carruselLeft-light" {...props} />

// Exportar todo
export { Button, buttonVariantsSimple as buttonVariants }