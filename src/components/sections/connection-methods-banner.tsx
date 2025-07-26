"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Globe, Smartphone, Code } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ConnectionMethod {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultConnectionMethods: ConnectionMethod[] = [
  {
    id: 1,
    title: "API",
    description: "Integración perfecta con tu infraestructura existente",
    icon: <Code className="w-8 h-8" />
  },
  {
    id: 2,
    title: "App White-Label",
    description: "Solución completa personalizada con tu marca",
    icon: <Smartphone className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Web App",
    description: "Plataforma web lista para usar desde el primer día",
    icon: <Globe className="w-8 h-8" />
  }
];

interface ConnectionMethodsBannerProps {
  methods?: ConnectionMethod[];
  className?: string;
}

export function ConnectionMethodsBanner({ 
  methods = defaultConnectionMethods,
  className 
}: ConnectionMethodsBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const methodsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const banner = bannerRef.current;
    const methodElements = methodsRef.current;

    if (!banner || methodElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Show elements immediately without animation
      gsap.set(methodElements, { opacity: 1, y: 0 });
      return;
    }

    // Initial state
    gsap.set(methodElements, {
      opacity: 0,
      y: 60,
      scale: 0.9
    });

    // Staggered fade-in animation
    ScrollTrigger.create({
      trigger: banner,
      start: "top 85%",
      onEnter: () => {
        gsap.to(methodElements, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    });

    // Floating animation for continuous engagement
    methodElements.forEach((method, index) => {
      if (method) {
        gsap.to(method, {
          y: "+=10",
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === banner) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={bannerRef}
      className={cn("relative py-12", className)}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-6 lg:p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Conéctate de la manera que prefieras
            </h3>
            <p className="text-muted-foreground text-lg">
              Múltiples opciones de integración para adaptarse a tu ecosistema tecnológico
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methods.map((method, index) => (
              <div
                key={method.id}
                ref={(el) => {
                  if (el) methodsRef.current[index] = el;
                }}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {method.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {method.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}