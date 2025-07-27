"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { InteractiveDiagnosisDeck } from '@/components/interactive-diagnosis-deck';

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

    // Initial state - everything hidden
    gsap.set(titleEl, { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    });
    
    gsap.set(cardsEl, { 
      opacity: 0,
      y: 60
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      y: 40 
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

    // Fluid entrance sequence
    entranceTl
      .to(titleEl, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, 0)
      .to(cardsEl, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          // Enable card interactions after entrance
          if (cardsEl) {
            cardsEl.style.pointerEvents = 'auto';
          }
        }
      }, 0.3)
      .to(subtitleEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 0.6);

    // Sticky behavior - everything stays fixed during interaction
    ScrollTrigger.create({
      trigger: stickyEl,
      start: "center center",
      end: "+=100vh", // Stay sticky for viewport height
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        // Ensure everything is fully visible and interactive
        gsap.set([titleEl, cardsEl, subtitleEl], {
          opacity: 1,
          y: 0,
          scale: 1
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
        gsap.to([titleEl, cardsEl, subtitleEl], {
          opacity: Math.max(0, 1 - progress * 1.8),
          y: -progress * 200,
          scale: Math.max(0.2, 1 - progress * 0.8),
          rotation: progress * 10,
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
    <div 
      ref={containerRef}
      className={cn("relative", className)}
    >
      {/* Spacer for proper scroll distance */}
      <div className="h-[50vh]" />
      
      {/* Sticky content section */}
      <div 
        ref={stickyRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
      >
        {/* Title */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 
            ref={titleRef}
            className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl opacity-0"
          >
            {title}
          </h1>
        </div>
        
        {/* Interactive Cards - Perfect Magic Prompt Version */}
        <div 
          ref={cardsRef}
          className="text-center max-w-4xl mx-auto mb-20"
          style={{ pointerEvents: 'auto' }}
        >
          <InteractiveDiagnosisDeck />
        </div>
        
        {/* Subtitle */}
        <div className="text-center max-w-4xl mx-auto">
          <p 
            ref={subtitleRef}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed opacity-0"
          >
            {subtitle}
          </p>
        </div>
      </div>
      
      {/* Spacer for vacuum effect */}
      <div className="h-[30vh]" />
    </div>
  );
}