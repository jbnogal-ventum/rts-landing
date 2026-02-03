// src/Components/LazyLogo.jsx
import { useState, useEffect } from 'react';

export function LazyLogo({ 
  logoImport, 
  alt = "Client logo", 
  className = "",
  // Nuevas props para controlar el estilo
  variant = "default", // "default" | "blurred" | "transparent"
  blurAmount = 20,
  // Props para clases personalizadas
  containerClass = "",
  logoClass = "",
  // Tamaños predefinidos
  size = "medium" // "small" | "medium" | "large" | "xlarge"
}) {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    logoImport().then(module => {
      setLogo(module.default);
    }).catch(error => {
      console.error('Error loading logo:', error);
    });
  }, [logoImport]);

  // Mapeo de tamaños
  const sizeClasses = {
    small: "py-3",
    medium: "py-4",
    large: "py-5",
    xlarge: "py-6"
  };

  const logoSizeClasses = {
    small: "max-h-10",
    medium: "max-h-12",
    large: "max-h-10",
    xlarge: "max-h-12"
  };

  // Estilos según variant
  const variantStyles = {
    default: "bg-background-soft",
    blurred: `backdrop-blur-[${blurAmount}px] bg-white/10`,
    transparent: "bg-transparent",
    glass: `
     backdrop-blur-[${blurAmount}px]
      bg-white/15 
      shadow-lg
    `,
  };

  if (!logo) {
    return (
      <div className={`${variantStyles[variant]} rounded-xs ${sizeClasses[size]} animate-pulse ${containerClass} ${className}`}>
        <div className={`h-10 ${logoSizeClasses[size]} bg-gray-300 rounded mx-4 ${logoClass}`}></div>
      </div>
    );
  }

  return (
    <div className={`${variantStyles[variant]} rounded-xs ${sizeClasses[size]} flex items-center justify-center ${containerClass} ${className}`}>
      <img 
        src={logo} 
        alt={alt} 
        className={`h-auto max-w-[80%] object-contain ${logoClass}`}
        loading="lazy"
      />
    </div>
  );
}