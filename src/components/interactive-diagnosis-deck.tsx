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

// Diagnostic marker component
const CenterMarker = () => (
  <div 
    className="fixed w-4 h-4 bg-red-500 z-50"
    style={{
      left: '50vw',
      top: '50vh',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 0 2px white, 0 0 0 4px red'
    }}
  />
);

// Grid overlay for viewport visualization
const GridOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-40"
    style={{
      background: `
        linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '10vw 10vh',
      backgroundPosition: 'center center'
    }}
  >
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-500/30" />
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/30" />
  </div>
);

export const InteractiveDiagnosisDeck = ({
  painPoints = [
    {
      id: 1,
      title: "Experiencia Genérica",
      description: "Los empleados reciben beneficios estándar que no se adaptan a sus necesidades individuales, reduciendo su satisfacción y engagement.",
      icon: <Frown className="w-6 h-6 text-red-500" />
    },
    {
      id: 2,
      title: "Soporte Lento",
      description: "Los procesos de atención al cliente son lentos e ineficientes, generando frustración y pérdida de tiempo valioso.",
      icon: <Clock className="w-6 h-6 text-red-500" />
    },
    {
      id: 3,
      title: "Procesos Confusos",
      description: "La navegación y gestión de beneficios es compleja y poco intuitiva, dificultando el acceso a los servicios.",
      icon: <Shuffle className="w-6 h-6 text-red-500" />
    },
    {
      id: 4,
      title: "Falta de Transparencia",
      description: "Los empleados no tienen visibilidad clara de sus beneficios disponibles ni del estado de sus solicitudes.",
      icon: <Search className="w-6 h-6 text-red-500" />
    },
    {
      id: 5,
      title: "Costos Elevados",
      description: "Los gastos administrativos y operativos son altos debido a procesos manuales y sistemas desactualizados.",
      icon: <TrendingDown className="w-6 h-6 text-red-500" />
    }
  ]
}: {
  painPoints?: PainPoint[];
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Initialize the deck animation
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 100);
    
    // Debug logging (commented for production)
    // console.log('=== CENTERING DIAGNOSTICS ===');
    // console.log('Viewport:', {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   centerX: window.innerWidth / 2,
    //   centerY: window.innerHeight / 2
    // });
    
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
    const baseOffset = 60;
    const rotationBase = 6;
    
    // Use CSS centering: position from center (0,0) with offsets
    const centerX = 0;
    const centerY = 0;

    const position = {
      x: centerX + (index - Math.floor(total / 2)) * baseOffset,
      y: centerY + index * 25,
      rotate: (index - Math.floor(total / 2)) * rotationBase,
      scale: 1 - (index * 0.01),
      zIndex: total - index
    };
    
    // console.log(`Card ${index} position:`, position);
    
    return position;
  };

  const getInactiveCardPosition = (index: number, selectedIndex: number) => {
    const offset = index < selectedIndex ? -120 : 120;
    const centerX = 0;
    const centerY = 0;
    
    return {
      x: centerX + offset,
      y: centerY + 60,
      rotate: index < selectedIndex ? -20 : 20,
      scale: 0.75,
      zIndex: 1
    };
  };

  return (
    <>
      {/* Diagnostic components */}
      {showDiagnostics && (
        <>
          <CenterMarker />
          <GridOverlay />
          <div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded z-50 font-mono text-xs">
            <div>Viewport: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'loading'}</div>
            <div>Center: {typeof window !== 'undefined' ? `${window.innerWidth/2}, ${window.innerHeight/2}` : 'loading'}</div>
            <button 
              onClick={() => setShowDiagnostics(false)}
              className="mt-2 px-2 py-1 bg-red-500 rounded"
            >
              Hide Diagnostics
            </button>
          </div>
        </>
      )}
      
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
                  width: '320px',  // w-80 = 20rem = 320px
                  height: '384px', // h-96 = 24rem = 384px
                  left: 'calc(50% - 160px)',  // Half of width
                  top: 'calc(50% - 192px)'    // Half of height
                  // Using calc() instead of transform - this fixed the centering!
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
                  x: position.x,
                  y: position.y,
                  rotate: position.rotate,
                  scale: position.scale,
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
                  "w-full h-full bg-card border border-border rounded-xl shadow-lg overflow-visible",
                  "transition-shadow duration-300",
                  isSelected ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
                )}>
                  {/* Card Header */}
                  <div className="p-6 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100 text-red-600">
                          {painPoint.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
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
                          className="p-2 rounded-full hover:bg-muted transition-colors"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Warning icon - always visible for dramatic stacking effect */}
                  <div className="absolute top-4 right-4 z-20">
                    {painPoint.icon}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: 0.1 }}
                        >
                          <p className="text-muted-foreground leading-relaxed">
                            {painPoint.description}
                          </p>
                          <div className="mt-4 pt-4 border-t border-border">
                            <span className="text-sm text-muted-foreground">
                              Haz clic para cerrar
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isSelected && (
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer - only visible when not selected */}
                  {!isSelected && (
                    <div className="absolute bottom-4 left-6 right-6">
                      <div className="text-xs text-muted-foreground">
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
