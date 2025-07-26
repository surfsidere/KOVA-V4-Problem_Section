"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { InteractiveDiagnosisDeck } from '@/components/interactive-diagnosis-deck';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntroSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function IntroSection({ 
  title, 
  subtitle, 
  className 
}: IntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const cardsEl = cardsRef.current;
    const subtitleEl = subtitleRef.current;

    if (!section || !titleEl || !cardsEl || !subtitleEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show elements immediately without animation
      gsap.set([titleEl, cardsEl, subtitleEl], { opacity: 1, y: 0 });
      return;
    }

    // Initial state
    gsap.set(titleEl, { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    });
    
    gsap.set(cardsEl, { 
      opacity: 0,
      y: 30
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      y: 30 
    });

    // Title animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(titleEl, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        });
      }
    });

    // Cards animation (delayed)
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(cardsEl, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power2.out"
        });
      }
    });

    // Subtitle animation (after cards)
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      onEnter: () => {
        gsap.to(subtitleEl, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.6,
          ease: "power2.out"
        });
      }
    });

    // Vacuum exit animation on scroll down
    ScrollTrigger.create({
      trigger: section,
      start: "center 30%",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Vacuum cards and title together
        gsap.to([titleEl, cardsEl, subtitleEl], {
          opacity: Math.max(0, 1 - progress * 1.5),
          y: -progress * 150,
          scale: Math.max(0.3, 1 - progress * 0.7),
          duration: 0.1,
          ease: "power1.in"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={cn("relative min-h-screen flex flex-col items-center justify-center px-4 py-12", className)}
    >
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h1 
          ref={titleRef}
          className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-12"
        >
          {title}
        </h1>
      </div>
      
      <div 
        ref={cardsRef}
        className="mb-12 opacity-0"
      >
        <InteractiveDiagnosisDeck />
      </div>
      
      <div className="text-center max-w-4xl mx-auto">
        <p 
          ref={subtitleRef}
          className="text-muted-foreground max-w-2xl mx-auto text-lg opacity-0"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}