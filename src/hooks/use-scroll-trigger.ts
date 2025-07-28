import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTriggerOptions {
  trigger: React.RefObject<HTMLElement>;
  start?: string;
  end?: string;
  pin?: boolean;
  pinSpacing?: boolean;
  scrub?: boolean | number;
  invalidateOnRefresh?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
  onEnter?: (self: ScrollTrigger) => void;
  onLeave?: (self: ScrollTrigger) => void;
  onEnterBack?: (self: ScrollTrigger) => void;
  onLeaveBack?: (self: ScrollTrigger) => void;
}

/**
 * useScrollTrigger Hook
 * Manages ScrollTrigger lifecycle with proper cleanup
 * @param options - ScrollTrigger configuration options
 * @param deps - Dependencies array for re-creation
 */
export function useScrollTrigger(
  options: ScrollTriggerOptions,
  deps: React.DependencyList = []
) {
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!options.trigger.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create ScrollTrigger instance
    triggerRef.current = ScrollTrigger.create({
      trigger: options.trigger.current,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      pin: options.pin || false,
      pinSpacing: options.pinSpacing ?? true,
      scrub: options.scrub || false,
      invalidateOnRefresh: options.invalidateOnRefresh ?? true,
      onUpdate: options.onUpdate,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    });

    // Cleanup function
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, deps);

  return triggerRef.current;
}