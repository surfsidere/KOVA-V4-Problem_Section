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
  
  // Fluid selector animation states
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredOption, setHoveredOption] = useState<'instituciones' | 'aliados' | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const institucionesRef = useRef<HTMLButtonElement>(null);
  const aliadosRef = useRef<HTMLButtonElement>(null);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null);

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

  // Fluid selector animation
  useEffect(() => {
    if (!indicatorRef.current || !institucionesRef.current || !aliadosRef.current || selectedPath) return;

    const indicator = indicatorRef.current;
    const instituciones = institucionesRef.current;
    const aliados = aliadosRef.current;

    // Calculate positions
    const updatePositions = () => {
      const institucionesRect = instituciones.getBoundingClientRect();
      const aliadosRect = aliados.getBoundingClientRect();
      const containerRect = indicator.parentElement?.getBoundingClientRect();
      
      if (!containerRect) return;

      return {
        institucionesX: institucionesRect.left - containerRect.left + institucionesRect.width / 2,
        aliadosX: aliadosRect.left - containerRect.left + aliadosRect.width / 2,
        centerY: institucionesRect.height / 2
      };
    };

    const positions = updatePositions();
    if (!positions) return;

    // Set initial position
    gsap.set(indicator, {
      x: positions.institucionesX,
      y: positions.centerY,
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    // Create oscillating timeline
    animationTimeline.current = gsap.timeline({
      repeat: -1,
      yoyo: true,
      paused: !isAnimating,
      delay: 0.5
    });

    // Fade in and start oscillating
    gsap.to(indicator, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    });

    animationTimeline.current
      .to(indicator, {
        x: positions.aliadosX,
        duration: 3,
        ease: "sine.inOut"
      })
      .to(indicator, {
        x: positions.institucionesX,
        duration: 3,
        ease: "sine.inOut"
      });

    // Breathing glow animation
    gsap.to(indicator, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      animationTimeline.current?.kill();
      gsap.killTweensOf(indicator);
    };
  }, [isAnimating, selectedPath]);

  const handlePathSelection = (path: 'instituciones' | 'aliados') => {
    setSelectedPath(path);
    setIsAnimating(false);
    
    // Lock indicator to selected position
    if (indicatorRef.current && (path === 'instituciones' ? institucionesRef.current : aliadosRef.current)) {
      const targetButton = path === 'instituciones' ? institucionesRef.current : aliadosRef.current;
      const containerRect = indicatorRef.current.parentElement?.getBoundingClientRect();
      const buttonRect = targetButton.getBoundingClientRect();
      
      if (containerRect) {
        gsap.to(indicatorRef.current, {
          x: buttonRect.left - containerRect.left + buttonRect.width / 2,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    }
    
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

  const handleHover = (option: 'instituciones' | 'aliados' | null) => {
    if (selectedPath) return; // Don't animate if already selected
    
    setHoveredOption(option);
    
    if (option) {
      // Pause main animation
      animationTimeline.current?.pause();
      
      // Move indicator to hovered button
      if (indicatorRef.current && (option === 'instituciones' ? institucionesRef.current : aliadosRef.current)) {
        const targetButton = option === 'instituciones' ? institucionesRef.current : aliadosRef.current;
        const containerRect = indicatorRef.current.parentElement?.getBoundingClientRect();
        const buttonRect = targetButton.getBoundingClientRect();
        
        if (containerRect) {
          gsap.to(indicatorRef.current, {
            x: buttonRect.left - containerRect.left + buttonRect.width / 2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    } else {
      // Resume animation
      animationTimeline.current?.play();
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
          <div className="text-center mb-8 kova-card-header-gradient rounded-t-xl -m-6 lg:-m-8 mb-2 p-6 lg:p-8 kova-glow-base">
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
                  <div className="p-4 rounded-full kova-icon-gradient-dark transition-all duration-300 kova-glow-base group-hover:kova-glow-hover">
                    <div className="text-[#FFF9E1]">
                      {method.icon}
                    </div>
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
        
        <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Floating Indicator */}
          {!selectedPath && (
            <div 
              ref={indicatorRef}
              className="kova-fluid-indicator kova-fluid-indicator-glow"
              style={{ top: '50%' }}
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#FFF9E1] opacity-30 blur-xl" />
                <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#FFF9E1] opacity-50 blur-md m-auto" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#FFF9E1] m-auto" />
              </div>
            </div>
          )}
          
          <button
            ref={institucionesRef}
            onClick={() => handlePathSelection('instituciones')}
            onMouseEnter={() => handleHover('instituciones')}
            onMouseLeave={() => handleHover(null)}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              selectedPath === 'instituciones'
                ? "kova-selector-gradient text-[#FFF9E1] shadow-lg scale-105 kova-glow-active"
                : selectedPath
                ? "bg-gray-100 text-gray-600 opacity-50"
                : "kova-selector-gradient text-[#FFF9E1] hover:shadow-lg kova-glow-base hover:kova-glow-hover",
              "focus:outline-none focus:ring-2 focus:ring-[#FFF9E1] focus:ring-offset-2"
            )}
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Instituciones
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          <div className="kova-light-secondary font-medium z-0">o</div>

          <button
            ref={aliadosRef}
            onClick={() => handlePathSelection('aliados')}
            onMouseEnter={() => handleHover('aliados')}
            onMouseLeave={() => handleHover(null)}
            className={cn(
              "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300",
              selectedPath === 'aliados'
                ? "kova-selector-gradient text-[#FFF9E1] shadow-lg scale-105 kova-glow-active"
                : selectedPath
                ? "bg-gray-100 text-gray-600 opacity-50"
                : "kova-selector-gradient text-[#FFF9E1] hover:shadow-lg kova-glow-base hover:kova-glow-hover",
              "focus:outline-none focus:ring-2 focus:ring-[#FFF9E1] focus:ring-offset-2"
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