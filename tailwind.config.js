// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== FUENTES =====
      fontFamily: {
        'base': ['"Geist"', 'sans-serif'],          // Uso: font-base
        'display': ['"Neue Power Ultra"', 'sans-serif'], // Uso: font-display
        'haffer': ['"Haffer"', 'sans-serif'],       // Uso: font-haffer
      },

      // ===== COLORES (Reorganizados para mejor acceso) =====
      colors: {
        // Colores planos individuales (mantener para compatibilidad)
        'bg': '#09070c',                     // Uso: bg-bg (obsoleto - usar bg-background-primary)
        'bg-light': '#ffffff',               // Uso: bg-bg-light
        'text-light': '#000000',             // Uso: text-text-light
        'on-white': '#8c8c8c',               // Uso: text-on-white (obsoleto - usar text-text-on-white)
        'gradient-violet': '#6a5cff',        // Uso: text-gradient-violet / bg-gradient-violet
        'gradient-blue': '#2e86ff',          // Uso: text-gradient-blue / bg-gradient-blue

        // Sistema de colores organizado
        core: {
          violet: '#5B25D4',                 // Uso: text-core-violet / bg-core-violet / border-core-violet
          blue: '#04CBFE',                   // Uso: text-core-blue / bg-core-blue / border-core-blue
        },

        sentimental: {
          positive: '#CDFFBE',               // Uso: text-sentimental-positive / bg-sentimental-positive
        },

        text: {
          primary: '#FFFFFF',                // Uso: text-text-primary
          secondary: '#DADADA',              // Uso: text-text-secondary
          disabled: '#C2C2C2',               // Uso: text-text-disabled
          error: '#0b0909',                  // Uso: text-text-error
          helper: '#717072',                 // Uso: text-text-helper
          'on-white': '#8c8c8c',             // Uso: text-text-on-white
        },

        'text-on-white': {                    // Uso: text-text-on-white-primary (sugiero renombrar a 'on-white')
          primary: '#212121',                // Uso: text-text-on-white-primary
          secondary: '#353535',              // Uso: text-text-on-white-secondary
          disabled: '#8C8C8C',               // Uso: text-text-on-white-disabled
        },

        background: {
          primary: '#030108',                // Uso: bg-background-primary (antes: bg-bg)
          interactive: '#5B25D4',            // Uso: bg-background-interactive
          hover: '#4F00FF',                  // Uso: bg-background-hover
          disabled: '#7F7F7F',               // Uso: bg-background-disabled
          inverse: '#EBEEF0',                // Uso: bg-background-inverse
          'inverse-hover': '#E4E5EE',        // Uso: bg-background-inverse-hover
          'inverse-disabled': '#C6C6C6',     // Uso: bg-background-inverse-disabled
          white: '#FFFFFF',                  // Uso: bg-background-white
        },

        border: {
          interactive: '#5B25D4',            // Uso: border-border-interactive
          subtle: '#E0E0E0',                 // Uso: border-border-subtle
          'subtle-selected': '#C6C6C6',      // Uso: border-border-subtle-selected
          strong: '#8D8D8D',                 // Uso: border-border-strong
          inverse: '#090415',                // Uso: border-border-inverse
          disabled: '#646464',               // Uso: border-border-disabled
        },

        surface: {
          primary: '#E3E8FF',                // Uso: bg-surface-primary
          hover: '#C6D0FD',                  // Uso: bg-surface-hover
          disabled: '#C6C6C6',               // Uso: bg-surface-disabled
        },

        assistant: {                          // Corregí el typo: 'assitant' → 'assistant'
          background: '#3C3C3C',             // Uso: bg-assistant-background
          hover: '#4B4B4B',                  // Uso: bg-assistant-hover
          prompt: '#5A5A5A',                 // Uso: bg-assistant-prompt
        },
      },

      // ===== ESPACIADO (Spacing System) =====
      spacing: {
        'none': '0px',                       // Uso: p-none / m-none / gap-none
        '0': '0px',                         // Uso: p-0 / m-0 / gap-0
        '0.5': '4px',                        // Uso: p-0.5 / m-0.5 / gap-0.5
        '1': '8px',                          // Uso: p-1 / m-1 / gap-1
        '2': '12px',                         // Uso: p-2 / m-2 / gap-2
        '3': '16px',                         // Uso: p-3 / m-3 / gap-3
        '4': '24px',                         // Uso: p-4 / m-4 / gap-4
        '5': '32px',                         // Uso: p-5 / m-5 / gap-5
        '6': '40px',                         // Uso: p-6 / m-6 / gap-6
        '6.5': '60px',                       // Uso: p-6.5 / m-6.5 / gap-6.5
        '7': '80px',                         // Uso: p-7 / m-7 / gap-7
        '8': '100px',                        // Uso: p-8 / m-8 / gap-8
        '9': '120px',                        // Uso: p-9 / m-9 / gap-9
        'desktop': '5vw',
        'laptop': '5vw',
        'tablet': '6vw',
        'mobile': '7vw',
      },

      // ===== BORDES REDONDEADOS =====
      borderRadius: {
        none: "0",                           // Uso: rounded-none
        xs: "8px",                           // Uso: rounded-xs
        md: "12px",                          // Uso: rounded-md
        xl: "16px",                          // Uso: rounded-xl
        xxl: "24px",                         // Uso: rounded-xxl
        "3xl": "32px",                       // Uso: rounded-3xl
      },

      // ===== SISTEMA DE GRID (Recomiendo simplificar) =====
      // NOTA: Tailwind ya tiene sistema grid integrado, esto podría ser redundante
      gridTemplateColumns: {
        // Para desktop
        '12': 'repeat(12, minmax(0, 1fr))',  // Uso: grid-cols-12
        '10': 'repeat(10, 10%)',             // Uso: grid-cols-10 (personalizado)
        // Para mobile
        '4': 'repeat(4, minmax(0, 1fr))',    // Uso: grid-cols-4
      },

      gap: {
        'none': '0px',                       // Uso: p-none / m-none / gap-none
        '0.5': '4px',                        // Uso: p-0.5 / m-0.5 / gap-0.5
        '1': '8px',                          // Uso: p-1 / m-1 / gap-1
        '2': '12px',                         // Uso: p-2 / m-2 / gap-2
        '3': '16px',                         // Uso: p-3 / m-3 / gap-3
        '4': '24px',                         // Uso: p-4 / m-4 / gap-4
        '5': '32px',                         // Uso: p-5 / m-5 / gap-5
        '6': '40px',                         // Uso: p-6 / m-6 / gap-6
        '7': '80px',                         // Uso: p-7 / m-7 / gap-7
      },

      // ===== TIPOGRAFÍA - TAMAÑOS =====
      fontSize: {
        // Display
        'display-lg': '84px',                // Uso: text-display-lg
        'display-md': '60px',                // Uso: text-display-md
        'display-sm': '52px',                // Uso: text-display-sm

        // Headlines
        'headline-large': '46px',            // Uso: text-headline-large
        'headline-medium': '40px',           // Uso: text-headline-medium
        'headline-small': '28px',            // Uso: text-headline-small

        // Titles
        'title-large': '30px',               // Uso: text-title-large
        'title-medium': '26px',              // Uso: text-title-medium
        'title-small': '22px',               // Uso: text-title-small
        'title-body': '18px',                // Uso: text-title-body

        // Body
        'body-lg': '18px',                   // Uso: text-body-lg
        'body-md': '16px',                   // Uso: text-body-md (también text-body-default)
        'body-sm': '14px',                   // Uso: text-body-sm
        'body-default': '16px',              // Uso: text-body-default

        // Subtitle
        'subtitle-lg': '14px',               // Uso: text-subtitle-lg
        'subtitle-md': '12px',               // Uso: text-subtitle-md
        'subtitle-sm': '10px',               // Uso: text-subtitle-sm
      },

      // ===== TIPOGRAFÍA - ALTURA DE LÍNEA =====
      lineHeight: {
        'display-lg': '100%',                // Uso: leading-display-lg
        'display-md': '100%',                // Uso: leading-display-md
        'display-sm': '100%',                // Uso: leading-display-sm

        'headline-small': '108%',            // Uso: leading-headline-small
        'headline-medium': '120%',           // Uso: leading-headline-medium

        'title-large': '110%',               // Uso: leading-title-large
        'title-medium': '120%',              // Uso: leading-title-medium
        'title-small': '110%',               // Uso: leading-title-small
        'title-body': '140%',                // Uso: leading-title-body

        'body-lg': '140%',                   // Uso: leading-body-lg
        'body-md': '140%',                   // Uso: leading-body-md
        'body-sm': '140%',                   // Uso: leading-body-sm
        'body-default': '140%',              // Uso: leading-body-default

        'subtitle-md': '140%',               // Uso: leading-subtitle-md
        'subtitle-lg': '140%',               // Uso: leading-subtitle-lg (agregar si falta)
        'subtitle-sm': '140%',               // Uso: leading-subtitle-sm (agregar si falta)
      },

      // ===== TIPOGRAFÍA - ESPACIADO DE LETRAS =====
      letterSpacing: {
        'display-lg': '0.05em',              // Uso: tracking-display-lg
        'display-md': '-0.03em',             // Uso: tracking-display-md
        'display-sm': '-0.02em',             // Uso: tracking-display-sm

        'headline-small': '0.05em',          // Uso: tracking-headline-small
        'headline-medium': '0.05em',         // Uso: tracking-headline-medium

        'title-small': '-0.02em',            // Uso: tracking-title-small
        'title-body': '-2%',                 // Uso: tracking-title-body

        'subtitle-md': '0.05em',             // Uso: tracking-subtitle-md
        'subtitle-lg': '0.05em',             // Uso: tracking-subtitle-lg (agregar si falta)
        'subtitle-sm': '0.05em',             // Uso: tracking-subtitle-sm (agregar si falta)
      },

      // ===== TIPOGRAFÍA - PESOS =====
      fontWeight: {
        // Display
        'display-lg': '800',                 // Uso: font-display-lg
        'display-md': '700',                 // Uso: font-display-md
        'display-sm': '600',                 // Uso: font-display-sm

        // Headlines
        'headline-small': '700',             // Uso: font-headline-small
        'headline-medium': '700',            // Uso: font-headline-medium

        // Titles
        'title-large': '600',                // Uso: font-title-large
        'title-medium': '600',               // Uso: font-title-medium
        'title-small': '600',                // Uso: font-title-small
        'title-bold': '800',                 // Uso: font-title-bold
        'title-weight': '800',               // Uso: font-title-weight (redundante)

        // Body
        'body-lg': '400',                    // Uso: font-body-lg
        'body-md': '400',                    // Uso: font-body-md
        'body-sm': '400',                    // Uso: font-body-sm

        // Subtitle
        'subtitle-lg': '700',                // Uso: font-subtitle-lg
        'subtitle-md': '600',                // Uso: font-subtitle-md
        'subtitle-sm': '400',                // Uso: font-subtitle-sm

        // Pesos generales
        'bold': '700',                       // Uso: font-bold
        'semibold': '600',                   // Uso: font-semibold
        'medium': '500',                     // Uso: font-medium
        'regular': '400',                    // Uso: font-regular
      },

      // ===== GRADIENTES =====
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #7513FF, #4348F3, #0093CE)',
        'gradient-data-lab': 'linear-gradient(90deg, #7513FF 0%, #4348F3 50%, #0093CE 100%)',
        // Uso: bg-gradient-text (para fondos) o bg-gradient-text bg-clip-text text-transparent (para texto)
      },

      // ===== HEIGHT Y WIDTH PERSONALIZADOS =====
      height: {
        'header': '64px',                    // Uso: h-header,
        'logo-md': '59px',                   // Uso: h-logo-md
        'logo-lg': '124px',                  // Uso: h-logo-lg
        'hub-card': '304px',                // Uso: h-hub-card
        'icon-sm': '20px',                   // Uso: h-icon-sm
      },
      width: {
        'logo-md': '59px',                   // Uso: w-logo-md
        'logo-lg': '124px',                  // Uso: w-logo-lg
        'hub-card': '357px',                 // Uso: w-hub-card
      },
    },
    plugins: [
      require("tailwindcss-animate"),
      function ({ addUtilities }) {
        const newUtilities = {
          '.text-gradient': {
            background: 'linear-gradient(90deg, #7513FF 0%, #4348F3 50%, #0093CE 100%)',
            '-webkit-background-clip': 'text',
            'background-clip': 'text',
            'color': 'transparent',
            '-webkit-text-fill-color': 'transparent',
          },
        }
        addUtilities(newUtilities)
      }
    ],
  }
}