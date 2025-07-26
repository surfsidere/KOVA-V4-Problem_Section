"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SolutionSectionProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function SolutionSection({ 
  title, 
  subtitle, 
  className 
}: SolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;

    if (!section || !titleEl || !subtitleEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show elements immediately without animation
      gsap.set([titleEl, subtitleEl], { opacity: 1, x: 0 });
      return;
    }

    // Initial state
    gsap.set(titleEl, { 
      opacity: 0, 
      x: -100,
      scale: 0.9
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      x: 100 
    });

    // Title slide-in from left
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(titleEl, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        });
      }
    });

    // Subtitle slide-in from right (delayed)
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(subtitleEl, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.out"
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
      className={cn("relative min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-background via-muted/20 to-background", className)}
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          {title}
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-muted-foreground max-w-3xl mx-auto text-xl opacity-0"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}