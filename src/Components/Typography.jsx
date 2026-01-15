// components/Typography.jsx
import React from 'react';
import { cn } from '@/lib/utils'; // Si usas clsx/tailwind-merge


// Mapeo de variantes a clases Tailwind
const variantClasses = {
  // Display
  'display-lg': 'text-display-lg font-display-lg leading-display-lg tracking-display-lg font-display',
  'display-md': 'text-display-md font-display-md leading-display-md tracking-display-md font-display',
  'display-sm': 'text-display-sm font-display-sm leading-display-sm tracking-display-sm font-display',
  
  // Headlines
  'headline-large': 'text-headline-large font-headline-large leading-headline-large font-display',
  'headline-medium': 'text-headline-medium font-headline-medium leading-headline-medium tracking-headline-medium font-display',
  'headline-small': 'text-headline-small font-headline-small leading-headline-small tracking-headline-small font-display',
  
  // Titles
  'title-large': 'text-title-large leading-title-large font-title-large font-base',
  'title-medium': 'text-title-medium leading-title-medium font-title-medium',
  'title-small': 'text-title-small leading-title-small tracking-title-small font-title-small font-base',
  'title-body': 'text-title-body leading-title-body tracking-title-body font-semibold font-base',
  
  // Body
  'body-lg': 'text-body-lg leading-body-lg font-body-lg',
  'body-md': 'text-body-md leading-body-md font-body-md',
  'body-sm': 'text-body-sm leading-body-sm font-body-sm',
  'body-default': 'font-base text-body-default leading-body-default',
  'body-default-white': 'font-base text-body-default leading-body-default text-on-white',
  
  // Subtitle
  'subtitle-lg': 'text-subtitle-lg leading-subtitle-lg font-subtitle-lg',
  'subtitle-md': 'text-subtitle-md leading-subtitle-md tracking-subtitle-md font-subtitle-md',
  'subtitle-sm': 'text-subtitle-sm leading-subtitle-sm font-subtitle-sm',
};

// Mapeo de font families disponibles
const fontFamilies = {
  'base': 'font-base',        // Geist
  'display': 'font-display',  // Neue Power Ultra
  'sans': 'font-sans',        // Por si necesitas otras
  'serif': 'font-serif',
  'mono': 'font-mono',
};

// Elementos semánticos por defecto
const defaultElements = {
  'display-lg': 'h1',
  'display-md': 'h1',
  'display-sm': 'h1',
  'headline-large': 'h1',
  'headline-medium': 'h2',
  'headline-small': 'h3',
  'title-large': 'h3',
  'title-medium': 'h4',
  'title-small': 'h5',
  'title-body': 'h6',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  'body-default': 'p',
  'body-default-white': 'p',
  'subtitle-lg': 'span',
  'subtitle-md': 'span',
  'subtitle-sm': 'span',
};

export const Typography = ({
  variant,
  weight = null,
  lineHeight = null,
  letterSpacing = null,
  color = null,
  fontFamily = null, // Nueva prop para font family
  className = '',
  as,
  children,
  ...props
}) => {
  // Determinar el elemento HTML
  const Element = as || defaultElements[variant] || 'div';
  
  // Clases base según la variante
  const baseClasses = variantClasses[variant] || '';
  
  // Construir clases dinámicamente
  const classes = cn(
    baseClasses,
    
    // Sobrescritura de peso
    weight && (typeof weight === 'string' ? `font-${weight}` : `font-[${weight}]`),
    
    // Sobrescritura de line-height
    lineHeight && `leading-[${lineHeight}]`,
    
    // Sobrescritura de letter-spacing
    letterSpacing && `tracking-[${letterSpacing}]`,
    
    // Sobrescritura de color
    color && (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('var')
      ? `[color:${color}]` // Para colores personalizados
      : `text-${color}`), // Para clases Tailwind
    
    // Sobrescritura de font family (nueva)
    fontFamily && (
      fontFamilies[fontFamily] 
        ? fontFamilies[fontFamily] // Si es una familia predefinida
        : `[font-family:${fontFamily}]` // Si es un valor personalizado
    ),
    
    // Clases adicionales
    className
  );

  return React.createElement(Element, {
    className: classes,
    ...props
  }, children);
};
