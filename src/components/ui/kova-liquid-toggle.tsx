"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Building2, Users } from 'lucide-react';

interface KovaToggleProps {
  selected: 'instituciones' | 'aliados' | null;
  onSelectionChange: (selection: 'instituciones' | 'aliados') => void;
  className?: string;
}

export function KovaLiquidToggle({ 
  selected, 
  onSelectionChange, 
  className 
}: KovaToggleProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = React.useState<'instituciones' | 'aliados' | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Initialize indicator position
  useEffect(() => {
    if (!indicatorRef.current) return;
    
    // Set initial position based on selection
    const targetX = getIndicatorPosition();
    gsap.set(indicatorRef.current, { x: targetX });
  }, []);

  // Animate indicator when selection changes
  useEffect(() => {
    if (!indicatorRef.current || isAnimating) return;
    
    const targetX = getIndicatorPosition();
    setIsAnimating(true);
    
    gsap.to(indicatorRef.current, {
      x: targetX,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setIsAnimating(false)
    });
  }, [selected, hoveredOption]);

  const getIndicatorPosition = () => {
    // 400px container width, 200px indicator width (50%)
    // Left: 0px, Right: 200px, Center: 100px
    if (selected === 'instituciones') return 0;
    if (selected === 'aliados') return 200;
    if (hoveredOption === 'instituciones') return 20;
    if (hoveredOption === 'aliados') return 180;
    return 100; // Center when no selection
  };

  const getTextColor = (option: 'instituciones' | 'aliados') => {
    if (selected === option) return 'text-[#FFF9E1] font-semibold';
    return 'text-[#0d1b2a]';
  };

  const handleOptionClick = (option: 'instituciones' | 'aliados') => {
    if (isAnimating) return;
    onSelectionChange(option);
    
    // Micro-interaction: slight scale feedback
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  };

  const handleOptionHover = (option: 'instituciones' | 'aliados' | null) => {
    if (isAnimating) return;
    setHoveredOption(option);
  };

  const handleKeyDown = (event: React.KeyboardEvent, option: 'instituciones' | 'aliados') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionClick(option);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleOptionClick('instituciones');
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleOptionClick('aliados');
    }
  };

  return (
    <div 
      className={cn("relative flex justify-center items-center", className)}
      role="radiogroup"
      aria-label="Seleccionar tipo de usuario"
    >
      {/* Main Toggle Container */}
      <div className="relative w-[400px] h-[60px] bg-[#FFF9E1] rounded-full border-2 border-[#415a77] shadow-lg overflow-hidden">
        
        {/* Sliding Indicator */}
        <div 
          ref={indicatorRef}
          className="absolute top-1 left-1 w-[196px] h-[52px] bg-gradient-to-r from-[#0d1b2a] via-[#415a77] to-[#0d1b2a] rounded-full shadow-md transition-all duration-300 ease-out transform will-change-transform"
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.25))'
          }}
        />
        
        {/* Instituciones Option */}
        <button
          onClick={() => handleOptionClick('instituciones')}
          onMouseEnter={() => handleOptionHover('instituciones')}
          onMouseLeave={() => handleOptionHover(null)}
          onKeyDown={(e) => handleKeyDown(e, 'instituciones')}
          aria-pressed={selected === 'instituciones'}
          aria-label="Seleccionar opción para instituciones"
          role="radio"
          tabIndex={0}
          className={cn(
            "absolute left-0 top-0 w-[200px] h-full flex items-center justify-center gap-2 z-10 transition-all duration-200",
            "hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#415a77] focus:ring-offset-2 focus:ring-offset-[#FFF9E1] rounded-full",
            "transform-gpu will-change-transform",
            getTextColor('instituciones'),
            hoveredOption === 'instituciones' && "scale-105",
            selected === 'instituciones' && "scale-110"
          )}
        >
          <Building2 className={cn(
            "w-5 h-5 transition-all duration-200",
            hoveredOption === 'instituciones' && "scale-110",
            selected === 'instituciones' && "scale-125"
          )} />
          <span className="font-medium text-sm">Instituciones</span>
        </button>
        
        {/* Aliados Option */}
        <button
          onClick={() => handleOptionClick('aliados')}
          onMouseEnter={() => handleOptionHover('aliados')}
          onMouseLeave={() => handleOptionHover(null)}
          onKeyDown={(e) => handleKeyDown(e, 'aliados')}
          aria-pressed={selected === 'aliados'}
          aria-label="Seleccionar opción para aliados"
          role="radio"
          tabIndex={0}
          className={cn(
            "absolute right-0 top-0 w-[200px] h-full flex items-center justify-center gap-2 z-10 transition-all duration-200",
            "hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#415a77] focus:ring-offset-2 focus:ring-offset-[#FFF9E1] rounded-full",
            "transform-gpu will-change-transform",
            getTextColor('aliados'),
            hoveredOption === 'aliados' && "scale-105",
            selected === 'aliados' && "scale-110"
          )}
        >
          <Users className={cn(
            "w-5 h-5 transition-all duration-200",
            hoveredOption === 'aliados' && "scale-110",
            selected === 'aliados' && "scale-125"
          )} />
          <span className="font-medium text-sm">Aliados</span>
        </button>
      </div>
      
      {/* Dynamic glow effect */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(65,90,119,0.3) 0%, transparent 70%)',
          opacity: selected ? 1.0 : hoveredOption ? 0.7 : 0.5,
          transform: `scale(${selected ? 1.1 : hoveredOption ? 1.05 : 1})`,
          filter: `blur(${selected ? '12px' : hoveredOption ? '8px' : '6px'})`
        }}
      />
    </div>
  );
}

// Placeholder component for backward compatibility
export function KovaGooeyFilter() {
  return null;
}