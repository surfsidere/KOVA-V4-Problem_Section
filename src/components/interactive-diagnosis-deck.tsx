"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Clock, Shuffle, Search, TrendingDown, Frown } from "lucide-react";

interface PainPoint {
  id: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}


export const InteractiveDiagnosisDeck = ({
  painPoints = [
    {
      id: 1,
      title: "Experiencia Genérica",
      description: "Los usuarios reciben beneficios estándar que no se adaptan a sus necesidades individuales, reduciendo su satisfacción y engagement.",
      icon: <Frown className="w-6 h-6" style={{ color: '#FFF9E1' }} />
    },
    {
      id: 2,
      title: "Soporte Lento",
      description: "Los procesos de atención al cliente son lentos e ineficientes, generando frustración y pérdida de tiempo valioso.",
      icon: <Clock className="w-6 h-6" style={{ color: '#FFF9E1' }} />
    },
    {
      id: 3,
      title: "Procesos Confusos",
      description: "La navegación y gestión de beneficios es compleja y poco intuitiva, dificultando el acceso a los servicios.",
      icon: <Shuffle className="w-6 h-6" style={{ color: '#FFF9E1' }} />
    },
    {
      id: 4,
      title: "Falta de Transparencia",
      description: "Los usuarios no tienen visibilidad clara de sus beneficios disponibles ni del estado de sus solicitudes.",
      icon: <Search className="w-6 h-6" style={{ color: '#FFF9E1' }} />
    },
    {
      id: 5,
      title: "Costos Elevados",
      description: "Los gastos administrativos y operativos son altos debido a procesos manuales y sistemas desactualizados.",
      icon: <TrendingDown className="w-6 h-6" style={{ color: '#FFF9E1' }} />
    }
  ]
}: {
  painPoints?: PainPoint[];
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the deck animation
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (cardId: number) => {
    if (selectedCard === cardId) {
      setSelectedCard(null);
    } else {
      setSelectedCard(cardId);
    }
  };

  const getCardPosition = (index: number, total: number) => {
    // Responsive card positioning based on screen size
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    // Adaptive spacing based on viewport
    const baseOffset = isMobile ? 40 : isTablet ? 50 : 60;
    const verticalSpacing = isMobile ? 15 : 25;
    const rotationBase = isMobile ? 4 : 6;
    
    const centerX = 0;
    const centerY = 0;

    const position = {
      x: centerX + (index - Math.floor(total / 2)) * baseOffset,
      y: centerY + index * verticalSpacing,
      rotate: (index - Math.floor(total / 2)) * rotationBase,
      scale: 1 - (index * 0.01),
      zIndex: total - index
    };
    
    return position;
  };

  const getInactiveCardPosition = (index: number, selectedIndex: number) => {
    // Responsive inactive positioning
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const offset = index < selectedIndex ? (isMobile ? -80 : -120) : (isMobile ? 80 : 120);
    const centerX = 0;
    const centerY = 0;
    
    return {
      x: centerX + offset,
      y: centerY + (isMobile ? 40 : 60),
      rotate: index < selectedIndex ? -20 : 20,
      scale: isMobile ? 0.65 : 0.75,
      zIndex: 1
    };
  };

  return (
    <>
      
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative pointer-events-auto">
        <AnimatePresence mode="wait">
          {painPoints.map((painPoint, index) => {
            const isSelected = selectedCard === painPoint.id;
            const isAnySelected = selectedCard !== null;
            const selectedIndex = painPoints.findIndex(p => p.id === selectedCard);

            let position;
            if (isSelected) {
              position = { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 20 };
            } else if (isAnySelected) {
              position = getInactiveCardPosition(index, selectedIndex);
            } else {
              position = getCardPosition(index, painPoints.length);
            }

            return (
              <motion.div
                key={painPoint.id}
                className="absolute cursor-pointer"
                style={{
                  // Responsive card dimensions
                  width: 'clamp(280px, 85vw, 320px)',
                  height: 'clamp(320px, 45vh, 384px)',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translateX(${position.x}px) translateY(${position.y}px) rotate(${position.rotate}deg) scale(${position.scale})`,
                  zIndex: position.zIndex
                }}
                initial={{
                  x: 0,
                  y: -100,
                  rotate: 0,
                  scale: 0.8,
                  opacity: 0,
                  zIndex: painPoints.length - index
                }}
                animate={{
                  x: 0, // Position handled by CSS transform
                  y: 0, // Position handled by CSS transform
                  rotate: 0, // Rotation handled by CSS transform
                  scale: 1, // Scale handled by CSS transform
                  opacity: isInitialized ? 1 : 0,
                  zIndex: position.zIndex
                }}
                transition={{
                  duration: 0.6,
                  delay: isInitialized ? index * 0.1 : 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                whileHover={!isAnySelected ? {
                  scale: position.scale * 1.05,
                  y: position.y - 10,
                  transition: { duration: 0.2 }
                } : {}}
                onClick={() => handleCardClick(painPoint.id)}
              >
                <div className={cn(
                  "w-full h-full bg-white border border-gray-100 rounded-xl shadow-lg overflow-visible",
                  "transition-all duration-300",
                  isSelected ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                )}>
                  {/* Card Header - Responsive */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 kova-card-header-gradient kova-glow-base">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-lg kova-icon-gradient-dark kova-glow-base hover:kova-glow-hover transition-all duration-300">
                          <div className="text-[#FFF9E1] w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center">
                            {painPoint.icon}
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold leading-tight" style={{ color: 'hsl(0 0% 3.9%)' }}>
                          {painPoint.title}
                        </h3>
                      </div>
                      {isSelected && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCard(null);
                          }}
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <X className="w-4 h-4" style={{ color: 'hsl(0 0% 3.9%)' }} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Warning icon - always visible for dramatic stacking effect */}
                  <div className="absolute top-4 right-4 z-20">
                    {painPoint.icon}
                  </div>

                  {/* Card Content - Responsive */}
                  <div className="p-4 sm:p-6">
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'hsl(0 0% 3.9%)' }}>
                            {painPoint.description}
                          </p>
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                            <span className="text-xs sm:text-sm" style={{ color: '#4A4A4A' }}>
                              Haz clic para cerrar
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isSelected && (
                      <div className="space-y-2">
                        <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer - Responsive - only visible when not selected */}
                  {!isSelected && (
                    <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                      <div className="text-xs" style={{ color: '#4A4A4A' }}>
                        Haz clic para ver más
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};
