"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Clock, Shuffle, Search, TrendingDown, Frown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProblemCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultProblemCards: ProblemCard[] = [
  {
    id: 1,
    title: "Experiencia Genérica",
    description: "Los empleados reciben beneficios estándar que no se adaptan a sus necesidades individuales.",
    icon: <Frown className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Soporte Lento",
    description: "Los procesos de atención al cliente son lentos e ineficientes.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Procesos Confusos",
    description: "La navegación y gestión de beneficios es compleja y poco intuitiva.",
    icon: <Shuffle className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Falta de Transparencia",
    description: "Los empleados no tienen visibilidad clara de sus beneficios disponibles.",
    icon: <Search className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Costos Elevados",
    description: "Los gastos administrativos y operativos son altos debido a procesos manuales.",
    icon: <TrendingDown className="w-6 h-6" />
  }
];

interface ProblemCardsContainerProps {
  cards?: ProblemCard[];
  className?: string;
}

export function ProblemCardsContainer({ 
  cards = defaultProblemCards,
  className 
}: ProblemCardsContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const cardElements = cardsRef.current;

    if (!container || cardElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Simple fade out for reduced motion users
      ScrollTrigger.create({
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          cardElements.forEach((card) => {
            if (card) {
              gsap.to(card, {
                opacity: 1 - self.progress,
                duration: 0.1
              });
            }
          });
        }
      });
      return;
    }

    // Initial shuffling animation - cards appear scattered then arrange
    gsap.set(cardElements, {
      opacity: 0,
      scale: 0.8,
      rotation: () => gsap.utils.random(-20, 20),
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-100, 100)
    });

    // Shuffle to grid animation
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        // First, show cards in scattered positions
        gsap.to(cardElements, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        });

        // Then animate to grid positions
        gsap.to(cardElements, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          delay: 0.5,
          stagger: 0.1,
          ease: "power3.out"
        });
      }
    });

    // Vacuum dissipation effect on scroll
    ScrollTrigger.create({
      trigger: container,
      start: "center center",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        cardElements.forEach((card, index) => {
          if (card) {
            const progress = self.progress;
            const staggeredProgress = Math.max(0, progress - (index * 0.05));
            
            gsap.to(card, {
              opacity: Math.max(0, 1 - staggeredProgress * 2),
              scale: Math.max(0.1, 1 - staggeredProgress),
              y: -staggeredProgress * 200,
              x: gsap.utils.random(-100, 100) * staggeredProgress,
              rotation: gsap.utils.random(-30, 30) * staggeredProgress,
              duration: 0.1,
              ease: "power1.in"
            });
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative min-h-screen flex items-center justify-center py-24", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="problem-card bg-card border rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {card.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}