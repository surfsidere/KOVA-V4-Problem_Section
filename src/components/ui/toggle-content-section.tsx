"use client";

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { KOVA_DESIGN } from '@/lib/design-system';
import { Building2, Users, ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContentData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  theme: {
    gradient: string;
    glow: string;
    accent: string;
  };
}

interface ToggleContentSectionProps {
  selected: 'instituciones' | 'aliados' | null;
  className?: string;
  onDiscoverMore?: () => void;
}

// Enhanced content data with premium theming and iconography
const CONTENT_DATA: Record<'instituciones' | 'aliados', ContentData> = {
  instituciones: {
    title: "La Arquitectura de la Lealtad Moderna.",
    subtitle: "Evolucionar tu programa de lealtad nunca fue tan fácil. Ofrece experiencias digitales relevantes y personalizables que conectan con cada cliente.",
    icon: <Building2 className="w-6 h-6" style={{ color: '#FFF9E1' }} />,
    theme: {
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      glow: "rgba(99, 102, 241, 0.3)",
      accent: "text-indigo-600"
    }
  },
  aliados: {
    title: "El Canal de Crecimiento que tu Marca Merece.",
    subtitle: "Accede al canal de distribución más valioso de LATAM. Posicionamos tu marca dentro de un ecosistema exclusivo de beneficios digitales, conectándote directamente con millones de usuarios de alto valor sin costo de adquisición.",
    icon: <Users className="w-6 h-6" style={{ color: '#FFF9E1' }} />,
    theme: {
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      glow: "rgba(20, 184, 166, 0.3)",
      accent: "text-teal-600"
    }
  }
};

// Enhanced Framer Motion variants for sophisticated content transitions
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 40,
    scale: 0.96
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.2,
      delayChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const itemVariants = {
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
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    scaleX: 0,
    transformOrigin: "left"
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.2
    }
  }
};

const discoverButtonVariants = {
  idle: { 
    y: 0,
    scale: 1
  },
  hover: { 
    y: -2,
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { 
    y: 0,
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export function ToggleContentSection({ selected, className, onDiscoverMore }: ToggleContentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const discoverButtonRef = useRef<HTMLButtonElement>(null);

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

  // Smooth scroll functionality for "Descubre Más"
  const handleDiscoverMore = useCallback(() => {
    if (onDiscoverMore) {
      onDiscoverMore();
    } else {
      // Default behavior: smooth scroll to next section
      const nextSection = document.querySelector('[data-next-section]');
      if (nextSection) {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    // Premium interaction feedback
    if (discoverButtonRef.current) {
      gsap.to(discoverButtonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  }, [onDiscoverMore]);

  // Don't render anything if no selection
  if (!selected) return null;

  const contentData = CONTENT_DATA[selected];

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.article
          key={selected}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          {/* Premium Editorial Card */}
          <div className={cn(
            // Base card styling with banking aesthetic
            "relative overflow-hidden",
            "bg-gradient-to-br from-white via-gray-50/50 to-white",
            "border border-gray-200/60",
            "rounded-2xl lg:rounded-3xl",
            "shadow-xl hover:shadow-2xl",
            "transition-all duration-500 ease-out",
            
            // Editorial spacing - generous padding
            "p-12 lg:p-16",
            
            // Premium backdrop effects
            "backdrop-blur-lg",
            "before:absolute before:inset-0",
            "before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-white/60",
            "before:pointer-events-none"
          )}>
            
            {/* Sophisticated Header with KOVA Icon Gradient */}
            <motion.header
              variants={headerVariants}
              className="relative mb-8 lg:mb-12"
            >
              {/* Premium Gradient Header */}
              <div className={cn(
                "h-3 rounded-full kova-icon-gradient-dark kova-glow-base",
                "relative overflow-hidden",
                "mb-6"
              )}>
                {/* Animated accent overlay */}
                <motion.div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r",
                    contentData.theme.gradient,
                    "opacity-20"
                  )}
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              </div>

              {/* Icon and Path Indicator */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mb-6"
              >
                <div className={cn(
                  "p-3 rounded-xl kova-icon-gradient-dark kova-glow-base",
                  "shadow-lg"
                )}>
                  {contentData.icon}
                </div>
                <div className={cn(
                  "px-4 py-2 rounded-lg",
                  "bg-gradient-to-r",
                  contentData.theme.gradient,
                  "text-white text-sm font-medium tracking-wide",
                  "shadow-md"
                )}>
                  {selected === 'instituciones' ? 'INSTITUCIONES' : 'ALIADOS'}
                </div>
              </motion.div>
            </motion.header>

            {/* Content Container */}
            <div className="relative z-10 space-y-8">
              
              {/* Premium Title */}
              <motion.h3
                variants={itemVariants}
                className={cn(
                  // KOVA typography integration
                  "kova-light-primary",
                  "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl",
                  "font-semibold leading-tight tracking-tight",
                  "mb-6"
                )}
                role="heading"
                aria-level={3}
              >
                {contentData.title}
              </motion.h3>

              {/* Editorial Subtitle */}
              <motion.p
                variants={itemVariants}
                className={cn(
                  // KOVA typography classes
                  "kova-light-secondary",
                  "text-lg sm:text-xl lg:text-2xl",
                  "leading-relaxed",
                  "max-w-4xl",
                  "font-light"
                )}
                aria-describedby={`content-${selected}`}
              >
                {contentData.subtitle}
              </motion.p>

              {/* Call-to-Action Section */}
              <motion.div
                variants={itemVariants}
                className="pt-8 border-t border-gray-200/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      "bg-gradient-to-r",
                      contentData.theme.gradient
                    )} />
                    <span className={cn(
                      "text-sm font-medium tracking-wide uppercase",
                      contentData.theme.accent
                    )}>
                      {selected === 'instituciones' 
                        ? "Soluciones Empresariales"
                        : "Oportunidades de Crecimiento"
                      }
                    </span>
                  </div>

                  {/* Premium "Descubre Más" Button */}
                  <motion.button
                    ref={discoverButtonRef}
                    onClick={handleDiscoverMore}
                    variants={discoverButtonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    className={cn(
                      // Premium button styling
                      "group flex items-center gap-3",
                      "px-6 py-3 rounded-xl",
                      "bg-gradient-to-r",
                      contentData.theme.gradient,
                      "text-white font-medium",
                      "shadow-lg hover:shadow-xl",
                      "transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-white/50",
                      "cursor-pointer"
                    )}
                    aria-label={`Descubre más sobre ${selected}`}
                  >
                    <span className="text-sm tracking-wide">Descubre Más</span>
                    <ChevronDown 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" 
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Subtle Premium Glow Effect */}
            <div 
              className="absolute inset-0 rounded-2xl lg:rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${contentData.theme.glow}, transparent 70%)`
              }}
            />
          </div>

          {/* Accessibility Enhancement */}
          <div 
            id={`content-${selected}`}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            Content updated for {selected === 'instituciones' ? 'instituciones' : 'aliados'} section. 
            {contentData.title} - {contentData.subtitle}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}