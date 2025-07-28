"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { InteractiveDiagnosisDeck } from '@/components/interactive-diagnosis-deck';

// Dynamic Light Text Component
const DynamicLightText = ({ baseText, dynamicWords, interval = 3000 }: {
  baseText: string;
  dynamicWords: string[];
  interval?: number;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
        setIsVisible(true);
      }, 250); // Half of transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [dynamicWords.length, interval]);

  return (
    <>
      {baseText}{' '}
      <span 
        className={`inline-block transition-all duration-500 ease-in-out ${
          isVisible 
            ? 'opacity-100 transform translate-y-0' 
            : 'opacity-0 transform translate-y-5'
        }`}
        style={{ color: 'hsl(0 0% 3.9%)' }}
      >
        {dynamicWords[currentWordIndex]}
      </span>
    </>
  );
};

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
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const titleEl = titleRef.current;
    const cardsEl = cardsRef.current;
    const subtitleEl = subtitleRef.current;
    const stickyEl = stickyRef.current;

    if (!container || !titleEl || !cardsEl || !subtitleEl || !stickyEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show elements immediately without animation
      gsap.set([titleEl, cardsEl, subtitleEl], { opacity: 1, y: 0 });
      return;
    }

    // DRAMATIC INITIAL STATE: Set stage for theatrical entrance
    gsap.set(titleEl, { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    });
    
    gsap.set(cardsEl, { 
      opacity: 0,
      y: 60,
      scale: 0.9
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      y: 80 
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

    // Sticky behavior - everything stays fixed during interaction
    ScrollTrigger.create({
      trigger: stickyEl,
      start: "center center",
      end: "+=100vh", // Stay sticky for viewport height
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        // Ensure everything is fully visible and interactive
        gsap.set([titleEl, subtitleEl], {
          opacity: 1,
          y: 0,
          scale: 1
        });
        gsap.set(cardsEl, {
          opacity: 1
        });
        if (cardsEl) {
          cardsEl.style.pointerEvents = 'auto';
        }
      }
    });

    // Vacuum exit - everything gets sucked up together
    ScrollTrigger.create({
      trigger: stickyEl,
      start: "bottom 60%",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Disable card interactions during exit
        if (cardsEl && progress > 0) {
          cardsEl.style.pointerEvents = 'none';
        }
        
        // Professional vacuum effect  
        gsap.to([titleEl, subtitleEl], {
          opacity: Math.max(0, 1 - progress * 1.8),
          y: -progress * 200,
          scale: Math.max(0.2, 1 - progress * 0.8),
          rotation: progress * 10,
          duration: 0.1,
          ease: "power2.in"
        });
        gsap.to(cardsEl, {
          opacity: Math.max(0, 1 - progress * 1.8),
          duration: 0.1,
          ease: "power2.in"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container || trigger.trigger === stickyEl) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className={cn("relative bg-[#F5F5F5] z-10", className)}
    >
      {/* Spacer for proper scroll distance */}
      <div className="h-[50vh]" />
      
      {/* TWO-SCENE THEATER: Full viewport orchestration */}
      <div 
        ref={stickyRef}
        className="relative min-h-screen flex flex-col px-6"
      >
        {/* SCENE 1: Title - Top third of viewport (RESTORED ORIGINAL) */}
        <div className="flex-1 flex items-end justify-center pb-8">
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
        
        {/* SCENE 2: Cards - Center stage with breathing room (RESTORED ORIGINAL) */}
        <div className="flex-1 flex items-center justify-center py-16">
          <div 
            ref={cardsRef}
            className="w-full"
            style={{ pointerEvents: 'auto' }}
          >
            <InteractiveDiagnosisDeck />
          </div>
        </div>
        
        {/* SCENE 3: Subtitle - Bottom third of viewport (RESTORED ORIGINAL) */}
        <div className="flex-1 flex items-start justify-center pt-8">
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
      
      {/* Spacer for vacuum effect */}
      <div className="h-[10vh]" />
    </section>
  );
}