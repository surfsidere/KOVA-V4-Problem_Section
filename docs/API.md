# 📖 KOVA API Reference

> **Complete TypeScript API documentation for all KOVA components, hooks, utilities, and design system tokens**

---

## 📋 Table of Contents

1. [Design System API](#-design-system-api)
2. [Component APIs](#-component-apis)
3. [Hook APIs](#-hook-apis)  
4. [Utility APIs](#-utility-apis)
5. [Type Definitions](#-type-definitions)
6. [Animation APIs](#-animation-apis)
7. [Provider APIs](#-provider-apis)

---

## 🎨 Design System API

### **KOVA_DESIGN**

Centralized design system tokens with mathematical precision for responsive scaling.

#### **Interface**

```typescript
interface KovaDesignSystem {
  colors: {
    neonGold: string;
    darkText: string;
    lightText: string;
    darkGradient: {
      from: string;
      via: string;
      to: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: {
      sans: string[];
      mono: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  animation: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}
```

#### **Usage Example**

```typescript
import { KOVA_DESIGN } from '@/lib/design-system';

// Access color tokens
const goldColor = KOVA_DESIGN.colors.neonGold;

// Use responsive spacing
const containerPadding = KOVA_DESIGN.spacing.md; // clamp(3rem, 8vw, 4rem)

// Typography scaling
const headingSize = KOVA_DESIGN.typography.fontSize['3xl'];
```

#### **Color Tokens**

| Token | Value | Description |
|-------|-------|-------------|
| `neonGold` | `#FFF9E1` | Primary brand accent color |
| `darkText` | `hsl(0 0% 3.9%)` | Primary text color |
| `lightText` | `#E5E7EB` | Secondary text color |
| `darkGradient.from` | `#0d1b2a` | Gradient start point |
| `darkGradient.via` | `#415a77` | Gradient middle point |
| `darkGradient.to` | `#0d1b2a` | Gradient end point |

#### **Spacing Scale**

| Token | Value | Range |
|-------|-------|-------|
| `xs` | `clamp(1rem, 3vw, 1.5rem)` | 16-24px |
| `sm` | `clamp(1.5rem, 5vw, 2rem)` | 24-32px |
| `md` | `clamp(3rem, 8vw, 4rem)` | 48-64px |
| `lg` | `clamp(4rem, 10vw, 6rem)` | 64-96px |
| `xl` | `clamp(5rem, 12vw, 8rem)` | 80-128px |
| `xxl` | `clamp(6rem, 15vw, 12rem)` | 96-192px |

---

## 🧩 Component APIs

### **FluidScrollHero**

Premium hero section with theatrical scroll-triggered animations.

#### **Props Interface**

```typescript
interface FluidScrollHeroProps {
  /** Main heading text */
  title: string;
  /** Subtitle/description text */
  subtitle: string;
  /** Additional CSS classes */
  className?: string;
}
```

#### **Component Signature**

```typescript
export function FluidScrollHero(props: FluidScrollHeroProps): JSX.Element
```

#### **Example**

```tsx
<FluidScrollHero 
  title="Transform your business experience"
  subtitle="Discover innovative solutions that drive real results"
  className="bg-gradient-to-b from-blue-50 to-white"
/>
```

#### **Animation Lifecycle**

- **Initial State**: Elements start with `opacity: 0`, `y: 100`, `scale: 0.8`
- **Trigger Point**: Animation starts when section reaches 70% viewport
- **Duration**: Title (1.5s), Cards (1.8s), Subtitle (1.2s)
- **GPU Acceleration**: `force3D: true`, `willChange: 'transform, opacity'`

---

### **KovaLiquidToggle**

Interactive toggle with liquid animations and WCAG 2.1 AA compliance.

#### **Props Interface**

```typescript
interface KovaToggleProps {
  /** Current selection state */
  selected: 'instituciones' | 'aliados' | null;
  /** Callback fired when selection changes */
  onSelectionChange: (selection: 'instituciones' | 'aliados') => void;
  /** Additional CSS classes */
  className?: string;
}
```

#### **Component Signature**

```typescript
export function KovaLiquidToggle(props: KovaToggleProps): JSX.Element
```

#### **Event Handlers**

```typescript
// Selection change event
onSelectionChange: (selection: 'instituciones' | 'aliados') => void

// Internal keyboard event handler
handleKeyDown: (event: React.KeyboardEvent, option: string) => void
```

#### **Accessibility Features**

- **Role**: `radiogroup` container with `radio` buttons  
- **ARIA**: `aria-pressed`, `aria-label`, `aria-describedby`
- **Keyboard**: `Enter`, `Space`, `ArrowLeft`, `ArrowRight` support
- **Focus Management**: Visible focus rings with `focus:ring-2`

#### **Animation States**

```typescript
type AnimationState = 'idle' | 'hover' | 'selected' | 'transitioning';

interface AnimationConfig {
  duration: 300; // milliseconds
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
  gpuAcceleration: true;
}
```

---

### **InteractiveDiagnosisDeck**  

Card-based interaction system with Framer Motion animations.

#### **Props Interface**

```typescript
interface PainPoint {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface InteractiveDiagnosisDeckProps {
  /** Array of pain points to display */
  painPoints?: PainPoint[];
  /** Additional CSS classes */
  className?: string;
}
```

#### **Default Pain Points**

```typescript
const DEFAULT_PAIN_POINTS: PainPoint[] = [
  {
    id: 1,
    title: "Experiencia Genérica",
    description: "Las soluciones genéricas no se adaptan a las necesidades específicas...",
    icon: <User className="w-6 h-6" style={{ color: '#FFF9E1' }} />
  },
  // ... additional default points
];
```

#### **Motion Variants**

```typescript
const cardVariants = {
  idle: { 
    scale: 1, 
    rotateY: 0, 
    z: 0,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.05, 
    rotateY: 5, 
    z: 50,
    transition: { duration: 0.3 }
  },
  selected: { 
    scale: 1.1, 
    rotateY: 0, 
    z: 100,
    transition: { duration: 0.5 }
  }
};
```

---

### **DynamicLightText**

Animated text component with rotating words and smooth transitions.

#### **Props Interface**

```typescript
interface DynamicLightTextProps {
  /** Static text that remains constant */
  baseText: string;
  /** Array of words to cycle through */
  dynamicWords: string[];
  /** Milliseconds between word changes */
  interval?: number;
  /** Additional CSS classes */
  className?: string;
}
```

#### **Component Signature**

```typescript
export function DynamicLightText(props: DynamicLightTextProps): JSX.Element
```

#### **Default Values**

```typescript
const defaultProps = {
  interval: 3000, // 3 seconds
  className: ''
};
```

#### **Animation Configuration**

```typescript
const animationConfig = {
  transitionDuration: 500, // milliseconds
  fadeEasing: 'ease-in-out',
  transformOffset: '5px' // translateY offset during transition
};
```

---

### **PremiumSolutionSection**

Sophisticated section showcasing solutions with smooth entrance animations.

#### **Props Interface**

```typescript
interface PremiumSolutionSectionProps {
  /** Additional CSS classes */
  className?: string;
}
```

#### **Component Signature**

```typescript
export function PremiumSolutionSection(props: PremiumSolutionSectionProps): JSX.Element
```

#### **Internal Animation Config**

```typescript
const animationSequence = {
  trigger: "top 70%",
  end: "center center",
  toggleActions: "play none none reverse",
  stagger: 0.2,
  duration: 1.2
};
```

---

## 🎣 Hook APIs

### **useDebounce**

Enhanced debounce hook with TypeScript generics and type safety.

#### **Hook Signature**

```typescript
export function useDebounce<T extends (...args: readonly unknown[]) => unknown>(
  callback: T,
  delay: number
): T
```

#### **Type Parameters**

- `T extends (...args: readonly unknown[]) => unknown` - Function type with preserved parameters

#### **Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | `T` | Function to debounce |
| `delay` | `number` | Delay in milliseconds |

#### **Returns**

Returns the debounced function with the same signature as the input function.

#### **Usage Example**

```typescript
const debouncedSearch = useDebounce((query: string, filters: FilterObject) => {
  performSearch(query, filters);
}, 500);

// Type-safe call - TypeScript knows the parameter types
debouncedSearch("example", { category: "all" });
```

#### **Implementation Details**

```typescript
// Internal cleanup mechanism
useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
}, []);
```

---

### **useScrollTrigger**

Hook for managing GSAP ScrollTrigger lifecycle with automatic cleanup.

#### **Hook Signature**

```typescript
export function useScrollTrigger(
  options: ScrollTriggerOptions,
  deps?: React.DependencyList
): void
```

#### **Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `ScrollTriggerOptions` | GSAP ScrollTrigger configuration |
| `deps` | `React.DependencyList` | Dependencies array (optional) |

#### **ScrollTriggerOptions Interface**

```typescript
interface ScrollTriggerOptions {
  trigger: string | Element;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  scrub?: boolean | number;
  pin?: boolean;
  toggleActions?: string;
  markers?: boolean;
  invalidateOnRefresh?: boolean;
}
```

#### **Usage Example**

```typescript
const elementRef = useRef<HTMLDivElement>(null);

useScrollTrigger({
  trigger: elementRef.current,
  start: "top 80%",
  end: "bottom 20%",
  onEnter: () => {
    gsap.to(elementRef.current, { opacity: 1, y: 0 });
  },
  onLeave: () => {
    gsap.to(elementRef.current, { opacity: 0, y: 50 });
  }
}, []);
```

---

### **useAnimation**

Hook for managing GSAP animation lifecycle with automatic cleanup.

#### **Hook Signature**

```typescript
export function useAnimation(): {
  animate: (target: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.core.Tween;
  timeline: (vars?: gsap.TimelineVars) => gsap.core.Timeline;
  cleanup: () => void;
}
```

#### **Return Object**

| Method | Type | Description |
|--------|------|-------------|
| `animate` | `(target, vars) => Tween` | Create GSAP tween |
| `timeline` | `(vars?) => Timeline` | Create GSAP timeline |
| `cleanup` | `() => void` | Manual cleanup function |

#### **Usage Example**

```typescript
function AnimatedComponent() {
  const { animate, timeline, cleanup } = useAnimation();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const tl = timeline();
      tl.to(elementRef.current, { opacity: 1, duration: 1 })
        .to(elementRef.current, { scale: 1.1, duration: 0.5 });
    }

    return cleanup; // Automatic cleanup on unmount
  }, []);

  return <div ref={elementRef}>Animated content</div>;
}
```

---

## 🛠️ Utility APIs

### **cn (Class Names)**

Utility function for conditionally joining CSS class names with Tailwind CSS support.

#### **Function Signature**

```typescript
export function cn(...inputs: ClassValue[]): string
```

#### **Type Definition**

```typescript
type ClassValue = 
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];
```

#### **Usage Examples**

```typescript
// Basic class joining
cn('px-4', 'py-2', 'bg-blue-500'); 
// → "px-4 py-2 bg-blue-500"

// Conditional classes
cn('base-class', {
  'active-class': isActive,
  'disabled-class': isDisabled
});

// With undefined/null values (automatically filtered)
cn('base-class', someCondition && 'conditional-class', null);

// Complex conditional logic
cn(
  'btn',
  variant === 'primary' && 'btn-primary',
  variant === 'secondary' && 'btn-secondary',
  size === 'large' && 'btn-lg',
  disabled && 'btn-disabled'
);
```

---

### **Animation Utilities**

Collection of animation helper functions for consistent motion design.

#### **performantAnimation**

```typescript
export const performantAnimation = (
  target: gsap.TweenTarget,
  props: gsap.TweenVars
): gsap.core.Tween => {
  return gsap.to(target, {
    ...props,
    force3D: true,
    willChange: 'transform, opacity',
    ease: props.ease || 'power3.out'
  });
};
```

#### **createEntranceAnimation**

```typescript
export const createEntranceAnimation = (
  elements: Element[],
  config?: {
    stagger?: number;
    duration?: number;
    ease?: string;
  }
): gsap.core.Timeline => {
  const tl = gsap.timeline();
  
  elements.forEach((element, index) => {
    tl.fromTo(element, 
      { opacity: 0, y: 100, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: config?.duration || 1.2,
        ease: config?.ease || 'power3.out',
        force3D: true
      },
      index * (config?.stagger || 0.2)
    );
  });
  
  return tl;
};
```

#### **respectMotionPreferences**

```typescript
export const respectMotionPreferences = (
  animation: () => void,
  fallback?: () => void
): void => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    fallback?.();
  } else {
    animation();
  }
};
```

---

## 📝 Type Definitions

### **Core Types**

```typescript
// Selection states for toggle components
type ToggleSelection = 'instituciones' | 'aliados' | null;

// Animation states
type AnimationState = 'idle' | 'hover' | 'active' | 'selected' | 'disabled';

// Responsive breakpoints
type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// Component size variants
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Animation duration presets
type AnimationDuration = 'fast' | 'normal' | 'slow' | number;
```

### **Component Props Types**

```typescript
// Base props for all components
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

// Props with ref forwarding
interface ComponentWithRef<T = HTMLDivElement> extends BaseComponentProps {
  ref?: React.Ref<T>;
}

// Animation-enabled components
interface AnimatedComponentProps extends BaseComponentProps {
  animate?: boolean;
  animationDuration?: AnimationDuration;
  reduceMotion?: boolean;
}

// Interactive components
interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}
```

### **Event Handler Types**

```typescript
// Selection change handlers
type SelectionChangeHandler<T> = (selection: T) => void;

// Animation event handlers
type AnimationEventHandler = (event: {
  target: Element;
  phase: 'start' | 'complete' | 'interrupt';
  duration: number;
}) => void;

// Scroll event handlers
type ScrollEventHandler = (event: {
  progress: number;
  direction: 'up' | 'down';
  velocity: number;
}) => void;
```

### **Configuration Types**

```typescript
// Animation configuration
interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
  repeat?: number;
  yoyo?: boolean;
}

// Responsive configuration
interface ResponsiveConfig<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
}

// Theme configuration
interface ThemeConfig {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: {
    fontFamily: Record<string, string[]>;
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
  };
}
```

---

## ⚡ Animation APIs

### **GSAP Integration**

#### **Animation Presets**

```typescript
export const ANIMATION_PRESETS = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: 'power2.out' }
  },
  slideUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
  },
  staggerChildren: {
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  }
} as const;
```

#### **ScrollTrigger Utilities**

```typescript
export const SCROLL_TRIGGER_PRESETS = {
  onEnter: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse'
  },
  scrubSmooth: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  },
  pinSection: {
    start: 'top top',
    end: 'bottom top',
    pin: true,
    anticipatePin: 1
  }
} as const;
```

### **Framer Motion Integration**

#### **Motion Variants**

```typescript
export const MOTION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },
  card: {
    idle: { scale: 1, rotateY: 0 },
    hover: { scale: 1.05, rotateY: 5 },
    selected: { scale: 1.1, rotateY: 0 }
  }
} as const;
```

#### **Spring Configurations**

```typescript
export const SPRING_CONFIGS = {
  smooth: { type: 'spring', stiffness: 300, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
  gentle: { type: 'spring', stiffness: 100, damping: 20 }
} as const;
```

---

## 🔧 Provider APIs

### **SmoothScrollProvider**

Global provider for Lenis smooth scrolling with GSAP integration.

#### **Props Interface**

```typescript
interface SmoothScrollProviderProps {
  children: React.ReactNode;
  options?: Partial<LenisOptions>;
}

interface LenisOptions {
  duration: number;
  easing: (t: number) => number;
  direction: 'vertical' | 'horizontal';
  gestureDirection: 'vertical' | 'horizontal' | 'both';
  smooth: boolean;
  mouseMultiplier: number;
  smoothTouch: boolean;
  touchMultiplier: number;
  infinite: boolean;
}
```

#### **Default Configuration**

```typescript
const DEFAULT_LENIS_OPTIONS: LenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
};
```

#### **Context Value**

```typescript
interface SmoothScrollContextValue {
  lenis: Lenis | null;
  isEnabled: boolean;
  toggle: () => void;
  scrollTo: (target: string | number, options?: ScrollToOptions) => void;
}
```

#### **Usage Example**

```typescript
// Provider setup
<SmoothScrollProvider options={{ duration: 1.5 }}>
  <App />
</SmoothScrollProvider>

// Using the context
const { scrollTo, toggle } = useSmoothScroll();

// Scroll to element
scrollTo('#section-2', { offset: -100 });

// Toggle smooth scroll
toggle();
```

---

## 🎯 Performance APIs

### **Memory Management**

#### **Animation Cleanup Hook**

```typescript
export function useAnimationCleanup() {
  const animationsRef = useRef<(gsap.core.Tween | gsap.core.Timeline)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const addAnimation = useCallback((animation: gsap.core.Tween | gsap.core.Timeline) => {
    animationsRef.current.push(animation);
  }, []);

  const addScrollTrigger = useCallback((trigger: ScrollTrigger) => {
    scrollTriggersRef.current.push(trigger);
  }, []);

  const cleanup = useCallback(() => {
    animationsRef.current.forEach(anim => anim.kill());
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    animationsRef.current = [];
    scrollTriggersRef.current = [];
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { addAnimation, addScrollTrigger, cleanup };
}
```

#### **Performance Monitoring**

```typescript
export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16.67) { // More than 1 frame
        console.warn(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  });
}
```

---

## 🔍 Testing APIs

### **Test Utilities**

#### **Component Testing Helpers**

```typescript
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: {
    smoothScroll?: boolean;
    theme?: Partial<ThemeConfig>;
  }
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    );
  };

  return render(ui, { wrapper: AllProviders, ...options });
};
```

#### **Animation Testing**

```typescript
export const waitForAnimation = (duration = 1000) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

export const mockGSAP = () => {
  return {
    to: jest.fn().mockReturnValue({ kill: jest.fn() }),
    set: jest.fn(),
    timeline: jest.fn().mockReturnValue({
      to: jest.fn().mockReturnThis(),
      kill: jest.fn()
    })
  };
};
```

---

<div align="center">

**📖 Complete API reference for enterprise-grade development**

[← Development Guide](./DEVELOPMENT.md) | [Back to README](../README.md)

</div>