import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { KOVA_DESIGN } from '@/lib/design-system';

type AnimationType = 'fadeIn' | 'slideUp' | 'vacuum' | 'entrance';

interface AnimationOptions {
  target: React.RefObject<HTMLElement>;
  type: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  onComplete?: () => void;
}

/**
 * useAnimation Hook
 * Provides common animation patterns with GSAP
 * @param options - Animation configuration
 * @param deps - Dependencies for re-animation
 */
export function useAnimation(
  options: AnimationOptions,
  deps: React.DependencyList = []
) {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!options.target.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(options.target.current, { opacity: 1, y: 0 });
      return;
    }

    const { type, duration, delay = 0, ease, onComplete } = options;
    const element = options.target.current;

    // Animation configurations
    const animations = {
      fadeIn: {
        from: { opacity: 0 },
        to: { 
          opacity: 1, 
          duration: duration || KOVA_DESIGN.animations.duration.fadeIn,
          ease: ease || KOVA_DESIGN.animations.ease.out,
          delay,
          onComplete
        }
      },
      slideUp: {
        from: { opacity: 0, y: 50 },
        to: { 
          opacity: 1, 
          y: 0,
          duration: duration || KOVA_DESIGN.animations.duration.normal,
          ease: ease || KOVA_DESIGN.animations.ease.out,
          delay,
          onComplete
        }
      },
      vacuum: {
        from: { opacity: 1, y: 0, scale: 1 },
        to: { 
          opacity: 0, 
          y: -100,
          scale: 0.8,
          duration: duration || KOVA_DESIGN.animations.duration.slow,
          ease: ease || KOVA_DESIGN.animations.ease.vacuum,
          delay,
          onComplete
        }
      },
      entrance: {
        from: { opacity: 0, y: 100, scale: 0.8 },
        to: { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: duration || KOVA_DESIGN.animations.duration.entrance,
          ease: ease || KOVA_DESIGN.animations.ease.entrance,
          delay,
          onComplete
        }
      }
    };

    const animation = animations[type];
    
    // Set initial state
    gsap.set(element, animation.from);
    
    // Create animation
    tweenRef.current = gsap.to(element, animation.to);

    // Cleanup
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, deps);

  return tweenRef.current;
}