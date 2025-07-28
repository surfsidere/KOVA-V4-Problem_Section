/**
 * KOVA Design System Constants
 * Centralized design tokens for consistent theming and spacing
 */

export const KOVA_DESIGN = {
  // Color System
  colors: {
    // Primary brand colors
    neonGold: '#FFF9E1',
    darkText: 'hsl(0 0% 3.9%)',
    lightText: '#4A4A4A',
    background: '#F5F5F5',
    
    // Gradient systems
    darkGradient: {
      from: '#0d1b2a',
      via: '#415a77',
      to: '#0d1b2a'
    },
    containerGradient: {
      from: 'rgba(13,27,42,0.7)',
      via: 'rgba(65,90,119,0.7)', 
      to: 'rgba(13,27,42,0.7)'
    },
    iconGradient: {
      from: 'rgba(13,27,42,0.3)',
      via: 'rgba(65,90,119,0.3)',
      to: 'rgba(13,27,42,0.3)'
    }
  },
  
  // Spacing System with dramatic responsive scaling
  spacing: {
    xs: 'clamp(1rem, 3vw, 2rem)',      // 16-32px
    sm: 'clamp(2rem, 6vw, 4rem)',      // 32-64px
    md: 'clamp(3rem, 10vw, 8rem)',     // 48-128px
    lg: 'clamp(4rem, 15vw, 12rem)',    // 64-192px
    xl: 'clamp(5rem, 20vw, 16rem)',    // 80-256px
    
    // Container padding
    containerPadding: 'clamp(1.5rem, 4vw, 3rem)',
    
    // Section spacers
    sectionSpacer: {
      sm: 'clamp(10vh, 15vw, 20vh)',
      md: 'clamp(20vh, 30vw, 40vh)',
      lg: 'clamp(30vh, 40vw, 50vh)'
    }
  },
  
  // Animation System
  animations: {
    // Durations
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.2,
      entrance: 1.5,
      fadeIn: 2.0
    },
    
    // Easing functions
    ease: {
      default: 'power3.inOut',
      in: 'power3.in',
      out: 'power3.out',
      entrance: 'power2.out',
      vacuum: 'power2.in'
    },
    
    // Scroll trigger durations
    scrollDuration: {
      short: '+=100%',
      normal: '+=150%',
      long: '+=200%'
    }
  },
  
  // Breakpoints
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1440,
    wide: 1920
  },
  
  // Typography
  typography: {
    fonts: {
      primary: "'Space Grotesk', sans-serif",
      secondary: "Arial, Helvetica, sans-serif",
      body: "'Inter', sans-serif",
      headline: "'Poppins', sans-serif"
    },
    
    // Responsive font sizes
    sizes: {
      base: 'clamp(1rem, 2.5vw, 1.25rem)',
      lg: 'text-xl',
      xl: 'text-4xl tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl'
    }
  },
  
  // Z-index scale
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    popover: 40,
    tooltip: 50
  }
} as const;

// Utility functions
export const getGradient = (gradient: typeof KOVA_DESIGN.colors.darkGradient) => 
  `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.via} 50%, ${gradient.to} 100%)`;

export const getResponsiveValue = (mobile: number, desktop: number, unit = 'px') => 
  `clamp(${mobile}${unit}, ${((desktop - mobile) / 10)}vw, ${desktop}${unit})`;

// Type exports
export type KovaColors = typeof KOVA_DESIGN.colors;
export type KovaSpacing = typeof KOVA_DESIGN.spacing;
export type KovaAnimations = typeof KOVA_DESIGN.animations;
export type KovaBreakpoint = keyof typeof KOVA_DESIGN.breakpoints;