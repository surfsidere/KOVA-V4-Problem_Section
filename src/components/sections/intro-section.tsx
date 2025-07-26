"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

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
      gsap.set([titleEl, subtitleEl], { opacity: 1, y: 0 });
      return;
    }

    // Initial state
    gsap.set(titleEl, { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    });
    
    gsap.set(subtitleEl, { 
      opacity: 0, 
      y: 50 
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
          duration: 1.2,
          ease: "power3.out"
        });
      }
    });

    // Subtitle animation (delayed)
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(subtitleEl, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
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
      className={cn("relative min-h-screen flex flex-col items-center justify-center px-4", className)}
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-8"
        >
          {title}
        </h1>
        
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