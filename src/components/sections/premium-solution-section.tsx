"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Globe, Smartphone, Code, Building2, Users, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ConnectionMethod {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const connectionMethods: ConnectionMethod[] = [
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

interface PremiumSolutionSectionProps {
  className?: string;
}

export function PremiumSolutionSection({ className }: PremiumSolutionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const methodsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [selectedPath, setSelectedPath] = useState<'instituciones' | 'aliados' | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const methodsEl = methodsRef.current;
    const toggleEl = toggleRef.current;

    if (!section || !titleEl || !subtitleEl || !methodsEl || !toggleEl) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.set([titleEl, subtitleEl, methodsEl, toggleEl], { opacity: 1, y: 0 });
      return;
    }

    // Initial state
    gsap.set([titleEl, subtitleEl, methodsEl, toggleEl], {
      opacity: 0,
      y: 60
    });

    // Entrance animation sequence
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "center center",
        toggleActions: "play none none reverse"
      }
    });

    entranceTl
      .to(titleEl, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .to(subtitleEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6")
      .to(methodsEl, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "-=0.4")
      .to(toggleEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handlePathSelection = (path: 'instituciones' | 'aliados') => {
    setSelectedPath(path);
    
    // Premium interaction feedback
    if (toggleRef.current) {
      gsap.to(toggleRef.current, {
        scale: 0.98,
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
      className={cn("relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-background via-muted/10 to-background", className)}
    >
      {/* Solution Title */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h2 
          ref={titleRef}
          className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent opacity-0"
        >
          Somos La Solución
        </h2>
        
        <p 
          ref={subtitleRef}
          className="text-muted-foreground max-w-3xl mx-auto text-2xl font-medium opacity-0"
        >
          Mas Conexión, Mas Uso, Mas Valor
        </p>
      </div>

      {/* Connection Methods */}
      <div 
        ref={methodsRef}
        className="max-w-6xl mx-auto mb-12 opacity-0"
      >
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
            {connectionMethods.map((method) => (
              <div
                key={method.id}
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

      {/* Premium Toggle Section */}
      <div 
        ref={toggleRef}
        className="text-center max-w-4xl mx-auto opacity-0"
      >
        <h3 className="text-2xl font-bold text-foreground mb-6">
          ¿Cuál es tu enfoque?
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => handlePathSelection('instituciones')}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              "border-2 border-primary/20 hover:border-primary/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              selectedPath === 'instituciones' 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "bg-card text-foreground hover:bg-primary/5"
            )}
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Instituciones
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          <div className="text-muted-foreground font-medium">o</div>

          <button
            onClick={() => handlePathSelection('aliados')}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              "border-2 border-primary/20 hover:border-primary/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
              selectedPath === 'aliados' 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "bg-card text-foreground hover:bg-primary/5"
            )}
          >
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Aliados
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {selectedPath && (
          <div className="mt-8 p-6 bg-muted/30 rounded-xl border">
            <p className="text-muted-foreground text-lg">
              {selectedPath === 'instituciones' 
                ? "Perfecto para instituciones financieras que buscan modernizar sus beneficios corporativos con tecnología avanzada."
                : "Ideal para consultores y partners que quieren ofrecer soluciones de beneficios premium a sus clientes."
              }
            </p>
            <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Continuar como {selectedPath === 'instituciones' ? 'Institución' : 'Aliado'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}