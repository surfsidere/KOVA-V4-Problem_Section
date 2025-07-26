"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { ChevronRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FinalCTASectionProps {
  className?: string;
}

export function FinalCTASection({ className }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const ctaEl = ctaRef.current;
    const toggleEl = toggleRef.current;

    if (!section || !ctaEl || !toggleEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set([ctaEl, toggleEl], { opacity: 1, y: 0 });
      return;
    }

    // Initial state
    gsap.set([ctaEl, toggleEl], {
      opacity: 0,
      y: 50
    });

    // Entrance animation
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(ctaEl, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        });
        
        gsap.to(toggleEl, {
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

  const handleToggle = () => {
    setIsToggled(!isToggled);
    
    // Add satisfying toggle animation
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={cn("relative min-h-[60vh] flex flex-col items-center justify-center px-4 bg-gradient-to-t from-muted/30 to-background", className)}
    >
      <div 
        ref={ctaRef}
        className="text-center max-w-4xl mx-auto mb-12 opacity-0"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary font-medium text-lg">
            Descubre el poder de la conexión
          </span>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        
        <h3 className="font-headline text-3xl font-bold text-foreground mb-6">
          ¿Listo para transformar tu experiencia?
        </h3>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Únete a las empresas que ya están revolucionando sus beneficios corporativos con KOVA
        </p>
      </div>

      <button
        ref={toggleRef}
        onClick={handleToggle}
        className={cn(
          "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 opacity-0",
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
          "hover:from-primary/90 hover:to-primary/70 hover:scale-105",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          "active:scale-95",
          isToggled && "scale-110 shadow-lg shadow-primary/25"
        )}
      >
        <span className="flex items-center gap-2">
          {isToggled ? "¡Perfecto! Contactemos" : "Empezar Ahora"}
          <ChevronRight className={cn(
            "w-5 h-5 transition-transform duration-300",
            isToggled && "translate-x-1"
          )} />
        </span>
        
        {/* Pulse effect when toggled */}
        {isToggled && (
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
      </button>

      {isToggled && (
        <div className="mt-6 text-center text-sm text-muted-foreground max-w-md mx-auto">
          <p>
            Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas 
            para una demostración personalizada.
          </p>
        </div>
      )}
    </section>
  );
}