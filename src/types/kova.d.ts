/**
 * KOVA Component Type Definitions
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Card and positioning types
export interface CardPosition {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

export interface PainPoint {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Scroll and animation types
export interface ScrollSection {
  trigger: HTMLElement;
  animation: GSAPTimeline;
  cleanup: () => void;
}

export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  onComplete?: () => void;
}

// Responsive types
export type ViewportSize = 'mobile' | 'tablet' | 'desktop' | 'wide';

export interface ResponsiveBreakpoint {
  min?: number;
  max?: number;
  name: ViewportSize;
}

// Component prop types
export interface FluidScrollHeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface DynamicLightTextProps {
  baseText: string;
  dynamicWords: string[];
  interval?: number;
  className?: string;
}

export interface InteractiveDiagnosisDeckProps {
  painPoints?: PainPoint[];
}

// Toggle types
export type ToggleSelection = 'instituciones' | 'aliados' | null;

export interface KovaToggleProps {
  selected: ToggleSelection;
  onSelectionChange: (selection: 'instituciones' | 'aliados') => void;
  className?: string;
}

// Design system types
export interface SpacingValues {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  containerPadding: string;
  sectionSpacer: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface ColorValues {
  neonGold: string;
  darkText: string;
  lightText: string;
  background: string;
  darkGradient: {
    from: string;
    via: string;
    to: string;
  };
}

export interface AnimationValues {
  duration: {
    fast: number;
    normal: number;
    slow: number;
    entrance: number;
    fadeIn: number;
  };
  ease: {
    default: string;
    in: string;
    out: string;
    entrance: string;
    vacuum: string;
  };
  scrollDuration: {
    short: string;
    normal: string;
    long: string;
  };
}