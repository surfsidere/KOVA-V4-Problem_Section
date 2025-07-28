"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { InteractiveDiagnosisDeck } from '@/components/interactive-diagnosis-deck';
import { DynamicLightText } from '@/components/shared/dynamic-light-text';
import { KOVA_DESIGN } from '@/lib/design-system';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FluidScrollHeroProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function FluidScrollHero({ 
  title, 
  subtitle, 
  className 
}: FluidScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const titleEl = titleRef.current;
    const cardsEl = cardsRef.current;
    const subtitleEl = subtitleRef.current;
    if (!container || !titleEl || !cardsEl || !subtitleEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show elements immediately without animation
      gsap.set([titleEl, cardsEl, subtitleEl], { opacity: 1, y: 0 });
      return;
    }

    // DRAMATIC INITIAL STATE: Set stage for theatrical entrance with GPU acceleration
    gsap.set(titleEl, { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      force3D: true,
      willChange: 'transform, opacity'
    });
    
    gsap.set(cardsEl, { 
      opacity: 0,
      y: 60,
      scale: 0.9,
      force3D: true,
      willChange: 'transform, opacity'
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      y: 80,
      force3D: true,
      willChange: 'transform, opacity'
    });

    // Create main timeline for fluid entrance
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "center center",
        scrub: 1
      }
    });

    // THEATRICAL CHOREOGRAPHY: Three-act performance
    entranceTl
      // ACT 1: Title entrance with dramatic scale
      .to(titleEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, 0)
      // ACT 2: Cards dramatic reveal with stagger
      .to(cardsEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
        onComplete: () => {
          // Enable card interactions after entrance
          if (cardsEl) {
            cardsEl.style.pointerEvents = 'auto';
          }
        }
      }, 2.0)  // Cards appear with dramatic pause
      // ACT 3: Subtitle elegant entrance
      .to(subtitleEl, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 3.5);  // Final subtitle completes the story

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className={cn("relative bg-[#F5F5F5] z-10", className)}
      aria-label="Presentación principal de KOVA"
    >
      {/* Responsive spacer for proper scroll distance */}
      <div style={{ height: KOVA_DESIGN.spacing.sectionSpacer.lg }} />
      
      {/* TWO-SCENE THEATER: Full viewport orchestration */}
      <div 
        className="relative flex flex-col"
        style={{ minHeight: '100vh', padding: `0 ${KOVA_DESIGN.spacing.containerPadding}` }}
      >
        {/* SCENE 1: Title - Top third of viewport with responsive spacing */}
        <div className="flex-1 flex items-end justify-center" style={{ paddingBottom: KOVA_DESIGN.spacing.md }}>
          <div className="text-center max-w-5xl">
            <h1 
              ref={titleRef}
              className="kova-light-primary text-4xl tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl opacity-0"
            >
              <DynamicLightText 
                baseText="Las asistencias tradicionales se han quedado"
                dynamicWords={["atrás.", "obsoletas.", "limitadas.", "superadas."]}
                interval={3000}
              />
            </h1>
          </div>
        </div>
        
        {/* SCENE 2: Cards - Center stage with responsive breathing room */}
        <div className="flex-1 flex items-center justify-center" style={{ padding: `${KOVA_DESIGN.spacing.lg} 0` }}>
          <div 
            ref={cardsRef}
            className="w-full"
            style={{ pointerEvents: 'auto' }}
          >
            <InteractiveDiagnosisDeck />
          </div>
        </div>
        
        {/* SCENE 3: Subtitle - Bottom third of viewport with responsive spacing */}
        <div className="flex-1 flex items-start justify-center" style={{ paddingTop: KOVA_DESIGN.spacing.md }}>
          <div className="text-center max-w-4xl">
            <p 
              ref={subtitleRef}
              className="kova-light-secondary text-xl opacity-0"
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}