"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { KOVA_DESIGN } from '@/lib/design-system';

interface ContentData {
  title: string;
  subtitle: string;
}

interface ToggleContentSectionProps {
  selected: 'instituciones' | 'aliados' | null;
  className?: string;
}

// Content data following the user's specifications
const CONTENT_DATA: Record<'instituciones' | 'aliados', ContentData> = {
  instituciones: {
    title: "La Arquitectura de la Lealtad Moderna.",
    subtitle: "Evolucionar tu programa de lealtad nunca fue tan fácil. Ofrece experiencias digitales relevantes y personalizables que conectan con cada cliente."
  },
  aliados: {
    title: "El Canal de Crecimiento que tu Marca Merece.",
    subtitle: "Accede al canal de distribución más valioso de LATAM. Posicionamos tu marca dentro de un ecosistema exclusivo de beneficios digitales, conectándote directamente con millones de usuarios de alto valor sin costo de adquisición."
  }
};

// Framer Motion variants for smooth content transitions
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function ToggleContentSection({ selected, className }: ToggleContentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // GPU acceleration and performance optimization
  useEffect(() => {
    if (containerRef.current) {
      // Apply GPU acceleration hints
      gsap.set(containerRef.current, {
        force3D: true,
        willChange: 'transform, opacity'
      });
    }
  }, []);

  // Don't render anything if no selection
  if (!selected) return null;

  const contentData = CONTENT_DATA[selected];

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full max-w-4xl mx-auto",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          {/* Content Card with Premium Styling */}
          <div className={cn(
            // Base card styling following KOVA design system
            "relative overflow-hidden",
            "bg-gradient-to-br from-white via-gray-50 to-white",
            "border border-gray-200/80",
            "rounded-xl lg:rounded-2xl",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300 ease-out",
            
            // Spacing using design tokens
            "p-6 lg:p-8",
            
            // Premium effects
            "backdrop-blur-sm",
            "before:absolute before:inset-0",
            "before:bg-gradient-to-br before:from-transparent before:via-white/50 before:to-transparent",
            "before:opacity-60 before:pointer-events-none"
          )}>
            
            {/* Selection Indicator */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "absolute top-0 left-0 right-0 h-1",
                "bg-gradient-to-r",
                selected === 'instituciones' 
                  ? "from-blue-500 via-indigo-500 to-purple-500"
                  : "from-emerald-500 via-teal-500 to-cyan-500"
              )}
            />

            {/* Content Container */}
            <div className="relative z-10">
              
              {/* Title */}
              <motion.h3
                variants={itemVariants}
                className={cn(
                  // Typography using design system
                  "font-semibold leading-tight mb-4",
                  "text-2xl sm:text-3xl lg:text-4xl",
                  
                  // Color system
                  "text-gray-900",
                  
                  // Responsive spacing
                  "tracking-tight"
                )}
                // Accessibility
                role="heading"
                aria-level={3}
              >
                {contentData.title}
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className={cn(
                  // Typography scaling
                  "text-base sm:text-lg lg:text-xl",
                  "leading-relaxed",
                  
                  // Color and spacing
                  "text-gray-600",
                  "max-w-3xl"
                )}
                // Accessibility
                aria-describedby={`content-${selected}`}
              >
                {contentData.subtitle}
              </motion.p>

              {/* Interactive Element Hint */}
              <motion.div
                variants={itemVariants}
                className={cn(
                  "mt-6 flex items-center gap-3",
                  "text-sm text-gray-500"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br",
                  selected === 'instituciones'
                    ? "from-blue-100 to-indigo-100 text-blue-600"
                    : "from-emerald-100 to-teal-100 text-emerald-600"
                )}>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {selected === 'instituciones' 
                    ? "Soluciones para Instituciones Financieras"
                    : "Oportunidades para Partners y Aliados"
                  }
                </span>
              </motion.div>
            </div>

            {/* Subtle Glow Effect */}
            <div className={cn(
              "absolute inset-0 rounded-xl lg:rounded-2xl",
              "bg-gradient-to-br opacity-5 pointer-events-none",
              selected === 'instituciones'
                ? "from-blue-500 via-indigo-500 to-purple-500"
                : "from-emerald-500 via-teal-500 to-cyan-500"
            )} />
          </div>

          {/* Accessibility Enhancement */}
          <div 
            id={`content-${selected}`}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            Content updated for {selected === 'instituciones' ? 'instituciones' : 'aliados'} section
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}