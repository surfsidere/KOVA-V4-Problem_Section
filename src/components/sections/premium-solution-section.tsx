"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Globe, Smartphone, Code, Building2, Users, ChevronRight } from 'lucide-react';

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
      className={cn("relative min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#F5F5F5] z-10", className)}
    >
      {/* Solution Title */}
      <div className="text-center max-w-4xl mx-auto mb-8">
        <h2 
          ref={titleRef}
          className="kova-light-primary text-5xl tracking-tight sm:text-6xl lg:text-7xl mb-6 opacity-0"
        >
          Somos La Solución
        </h2>
        
        <p 
          ref={subtitleRef}
          className="kova-light-secondary max-w-3xl mx-auto text-2xl opacity-0"
        >
          <DynamicLightText 
            baseText="Mas Conexión, Mas Uso, Mas"
            dynamicWords={["Valor", "Impacto", "Resultados", "Beneficios"]}
            interval={3500}
          />
        </p>
      </div>

      {/* Connection Methods */}
      <div 
        ref={methodsRef}
        className="max-w-6xl mx-auto mb-12 opacity-0"
      >
        <div className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="kova-light-primary text-2xl mb-4">
              Conéctate de la manera que prefieras
            </h3>
            <p className="kova-light-secondary text-lg">
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
                  <div className="p-4 rounded-full kova-icon-gradient-dark transition-colors duration-300">
                    {method.icon}
                  </div>
                </div>
                <h4 className="kova-light-primary text-xl mb-2">
                  {method.title}
                </h4>
                <p className="kova-light-secondary text-sm">
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
        <h3 className="kova-light-primary text-2xl mb-6">
          ¿Cuál es tu enfoque?
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => handlePathSelection('instituciones')}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              "border-2 border-gray-200 hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
              selectedPath === 'instituciones' 
                ? "bg-white kova-light-primary shadow-lg scale-105 border-gray-400" 
                : "bg-white kova-light-primary hover:bg-gray-50"
            )}
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Instituciones
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          <div className="kova-light-secondary font-medium">o</div>

          <button
            onClick={() => handlePathSelection('aliados')}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              "border-2 border-gray-200 hover:border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2",
              selectedPath === 'aliados' 
                ? "bg-white kova-light-primary shadow-lg scale-105 border-gray-400" 
                : "bg-white kova-light-primary hover:bg-gray-50"
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
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="kova-light-secondary text-lg">
              {selectedPath === 'instituciones' 
                ? "Perfecto para instituciones financieras que buscan modernizar sus beneficios corporativos con tecnología avanzada."
                : "Ideal para consultores y partners que quieren ofrecer soluciones de beneficios premium a sus clientes."
              }
            </p>
            <button className="mt-4 px-6 py-2 bg-white border border-gray-300 kova-light-primary rounded-lg hover:bg-gray-50 transition-colors">
              Continuar como {selectedPath === 'instituciones' ? 'Institución' : 'Aliado'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}