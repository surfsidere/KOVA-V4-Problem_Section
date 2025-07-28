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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredOption, setHoveredOption] = React.useState<'instituciones' | 'aliados' | null>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Initialize indicator position and fade-in animation
  useEffect(() => {
    if (!indicatorRef.current || !containerRef.current) return;
    
    // Set initial position based on selection
    const targetX = getIndicatorPosition();
    gsap.set(indicatorRef.current, { x: targetX });
    
    // Smooth 2-second fade-in animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 2, 
        ease: "power3.out"
      }
    );
  }, []);

  // Animate indicator when selection changes
  useEffect(() => {
    if (!indicatorRef.current || isAnimating) return;
    
    const targetX = getIndicatorPosition();
    setIsAnimating(true);
    
    gsap.to(indicatorRef.current, {
      x: targetX,
      duration: 0.5,
      ease: "power3.inOut",
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

  const getTextStyle = (option: 'instituciones' | 'aliados') => {
    const isSelected = selected === option;
    const baseStyle = 'text-white font-medium';
    
    if (isSelected) {
      return {
        className: `${baseStyle} font-semibold`,
        style: {
          textShadow: '0 0 20px #FFF9E1, 0 0 40px #FFF9E1, 0 0 60px #FFF9E1'
        }
      };
    }
    
    return {
      className: baseStyle,
      style: {}
    };
  };
  
  const getIconStyle = (option: 'instituciones' | 'aliados') => {
    const isSelected = selected === option;
    
    if (isSelected) {
      return {
        filter: 'drop-shadow(0 0 10px #FFF9E1) drop-shadow(0 0 20px #FFF9E1)'
      };
    }
    
    return {
      background: 'linear-gradient(135deg, #FFF9E1 0%, #d4af37 50%, #FFF9E1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    };
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
      ref={containerRef}
      className={cn("relative flex justify-center items-center opacity-0", className)}
      role="radiogroup"
      aria-label="Seleccionar tipo de usuario"
    >
      {/* Main Toggle Container */}
      <div className="relative w-[400px] h-[60px] rounded-full border-2 border-[#1a1a2e] shadow-xl overflow-hidden" style={{
        background: 'linear-gradient(135deg, rgba(13,27,42,0.7) 0%, rgba(65,90,119,0.7) 50%, rgba(13,27,42,0.7) 100%)'
      }}>
        
        {/* Backside Lighting Effect */}
        <div 
          className="absolute top-0 left-0 w-[200px] h-full rounded-full transition-all duration-500 ease-out transform will-change-transform"
          style={{
            background: selected ? 'linear-gradient(135deg, rgba(255,249,225,0.3) 0%, rgba(255,249,225,0.5) 50%, rgba(255,249,225,0.3) 100%)' : 'transparent',
            filter: 'blur(8px)',
            transform: `translateX(${getIndicatorPosition()}px) scale(1.1)`,
            zIndex: 1
          }}
        />
        
        {/* Sliding Indicator */}
        <div 
          ref={indicatorRef}
          className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-[#0d1b2a] via-[#415a77] to-[#0d1b2a] rounded-full shadow-md transition-all duration-500 ease-out transform will-change-transform"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
            zIndex: 2
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
            "absolute left-0 top-0 w-[200px] h-full flex items-center justify-center gap-2 z-20 transition-all duration-200",
            "hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FFF9E1] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#020010] rounded-full",
            "transform-gpu will-change-transform",
            getTextStyle('instituciones').className,
            hoveredOption === 'instituciones' && "scale-105",
            selected === 'instituciones' && "scale-110"
          )}
        >
          <Building2 
            className={cn(
              "w-5 h-5 transition-all duration-200",
              hoveredOption === 'instituciones' && "scale-110",
              selected === 'instituciones' && "scale-125"
            )}
            style={getIconStyle('instituciones')}
          />
          <span className="text-sm" style={getTextStyle('instituciones').style}>Instituciones</span>
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
            "absolute right-0 top-0 w-[200px] h-full flex items-center justify-center gap-2 z-20 transition-all duration-200",
            "hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FFF9E1] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#020010] rounded-full",
            "transform-gpu will-change-transform",
            getTextStyle('aliados').className,
            hoveredOption === 'aliados' && "scale-105",
            selected === 'aliados' && "scale-110"
          )}
        >
          <Users 
            className={cn(
              "w-5 h-5 transition-all duration-200",
              hoveredOption === 'aliados' && "scale-110",
              selected === 'aliados' && "scale-125"
            )}
            style={getIconStyle('aliados')}
          />
          <span className="text-sm" style={getTextStyle('aliados').style}>Aliados</span>
        </button>
      </div>
      
      {/* Dynamic glow effect */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-500 pointer-events-none"
        style={{
          background: selected ? 'radial-gradient(circle, rgba(255,249,225,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(65,90,119,0.2) 0%, transparent 70%)',
          opacity: selected ? 1.0 : hoveredOption ? 0.6 : 0.3,
          transform: `scale(${selected ? 1.15 : hoveredOption ? 1.08 : 1})`,
          filter: `blur(${selected ? '20px' : hoveredOption ? '12px' : '8px'})`
        }}
      />
    </div>
  );
}

// Placeholder component for backward compatibility
export function KovaGooeyFilter() {
  return null;
}